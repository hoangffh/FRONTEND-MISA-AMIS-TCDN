<template>
    <div class="container-menu">
      <div class="container-menu-title">
        <div class="container-menu-title-left">
          <span>Đơn vị tính</span>
          <div class="container-menu-title-left-all">
            <div class="container-menu-title-left-all-icon"></div>
            <router-link  to="/Cash" class="cashHome">Tất cả danh mục</router-link>
          </div>
        </div>
        <div class="container-menu-title-right">
          <BaseButton
            hasHoverAndActivePrimarygreen
            textContent="Thêm"
            @click="handleOpenForm"
          >
          </BaseButton>
        </div>
      </div>
      <div class="container-menu-content">
        <div class="container-menu-content-head">
          <div class="container-menu-content-head-left">
              <BaseInput
                type="text"
                width="250px"
                height="34px"
                placeholder="Tìm theo đơn vị tính"
                :search="true"
                ref="employeeFilterRef"
                relative="relative"  
                @onChangeValue="onChangeValue"
                v-model="unitTextSearch"
              />
          </div>
          <div class="container-menu-content-head-right">
            <div
              class="a-padd-l-10px container-menu-content-head-reload"
             
            ></div>
            <div class="a-padd-l-10px print-meters"></div>
            <a
            
              class="a-padd-l-10px employ__export"
              :href="linkExport"
            @click="handleExportDocument"
            
            ></a>
            <div class="a-padd-l-10px icon-setting"></div>
          </div>
        </div>
          <BaseTable
          :data="unit"
          :listCols="displayFieldUnit"
          :existFooter="false"
          :isShowCheckBox="false"
          fieldValue="UnitId"
          fieldValueCode="UnitName"
          textColor="#000"
          @handleClickView="handleClickView"
          @handleClickRemove="handleClickRemove"
          @handleClickRelica="handleClickRelica"
          @setListIdsSelected="setListIdsSelected"
          @handleSelectRow="handleSelectRow"
      ></BaseTable>
        <div class="container-menu-footer">
          <div class="container-menu-footer-totalRecord">
            <span>Tổng số : </span>
            <span style="font-weight: bold">{{ totalRecord }} </span>
            <span> bản ghi</span>
          </div>
          <div class="container-menu-footer-totalRecord-right">
           <BaseCombobox
                  v-model="recordInPage"
                  fieldValue="value"
                  fieldDisplay="text"
                  width="200px"
                  height="32px"
                  :data="selectRecordInPage"
                  :dropDownYValue="548"
           ></BaseCombobox>
           <BasePaging
              :totalRecord="totalRecord"
              :totalPage="totalPage"
              v-model="page"
            />
          </div>
        </div>
      </div>
    </div>
    <UnitPopUp 
      :isShowPopUp="isShowPopUp"
      :formMode="formMode"
      :unitSelected="unitSelected"
      @isRemoveForm="handleCloseform"
      @afterEditSucess="afterEditSucess"
      ></UnitPopUp>
    <BaseLoading :loadingShow="isloading"></BaseLoading>
    <DialogNotify
    :isShowDialogConfirm="isShowDialogNotify"
    @removeDiaglogConfirm="allowDeleteEmoloyee"
    @cancelFunctionDelete="cancelFunctionDelete"
    :messageDialogNotifi="messageDialogNotifi"
    :isShowCancelButton="isShowCancelButton"
  ></DialogNotify>
  <DialogError
    :isShowDialogErr="isShowDialogErr"
    @RemoveDialogErr="diaglogError"
    :textContent="diaglogErrorMessage"
  >
  </DialogError>
  </template>
  <script>
  import BaseButton from "../../base/BaseButton.vue";
  import BaseInput from "../../base/BaseInput.vue"
  import BaseTable from "../../base/BaseTable.vue"
  import UnitPopUp from "./unitPopUpDetail.vue"
  import BaseCombobox from "../../base/BaseCombobox.vue"
  import BasePaging from "../../base/BasePagingControl.vue"
import BaseLoading from "../../view/loading.vue"
import DialogNotify from "../../view/dialogNotification.vue"
import DialogError from "../../base/dialogError.vue"
import Resources from "../../../js/resources"
  import axios from "axios";
  export default {
    name: "m-product",
    components: {
      BaseButton,
      BaseInput,
      BaseTable,
      UnitPopUp,
      BaseCombobox,
      BasePaging,
      BaseLoading,
      DialogNotify,
      DialogError
    },
    data(){
      return{
        isShowPopUp : false ,
        isloading : false ,
        isShowDialogNotify:false,
        messageDialogNotifi:null ,
        isShowDialogErr: false,
        diaglogErrorMessage : null,
        isShowCancelButton:true ,
        unit:[],
        unitIdDelete : null,
        unitCodeDelete : null ,
        displayFieldUnit:[
        {
          display:Resources.MiSaResource.Unit.UnitNameTable,
          name: "UnitName",
          width:"100",
          align:"left",
        },
        {
          display:Resources.MiSaResource.Unit.UnitDescribeTable,
          name: "UnitDescribe",
          width:"350",
          align:"left",
        },
        {
          display:Resources.MiSaResource.Unit.UnitStatusTable,
          name: "UsingStatus",
          width:"150",
          align:"left",
        },
        ],
        selectRecordInPage: [
          { text: "10 bản ghi trên 1 trang", value: 10 },
          { text: "20 bản ghi trên 1 trang", value: 20 },
          { text: "50 bản ghi trên 1 trang", value: 50 },
          { text: "100 bản ghi trên 1 trang", value: 100 },
    ],
      recordInPage: 10,
      page: 1,
      totalRecord: 200,
      totalPage: 10,
        formMode:null,
        unitSelected:{},
        unitTextSearch:"" ,
        linkExport:null
      }
    },
    watch:{
      recordInPage(value)
      {
        this.totalPage = Math.ceil(this.totalRecord / value);
        this.onPageChange()
      },
      page(value)
      {
        console.log(value)
        this.onPageChange()
      }
    },
    methods : {
      handleExportDocument()
      {
        this.linkExport = "https://localhost:44358/api/v1/Unit/export"
      },
      diaglogError()
    {
      this.isShowDialogErr = false
    },
 
  handleClickRemove(id,code)
  {
      this.unitIdDelete = id 
      this.unitCodeDelete = code
      this.isShowDialogNotify = true;
      this.messageDialogNotifi = `Bạn có thực sự muốn xóa đơn vị tính <${code}> không ?`;
  },
    /*
   Hàm xử lý xóa nhân viên được chọn thỏa mãn
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    allowDeleteEmoloyee() {
      const me = this;
      //Api ở trang thái cho phép xóa môt nhân viên được chọn
        me.apiDeleteMethod(me.unitIdDelete);
   
    },
     /*
      Api xóa môt nhân viên
      Author : Trần Nhật Hoàng (2/10/2022)
    */
    async apiDeleteMethod(id) {
      const me = this;
      try {
        me.isloading = true;
        await axios
          .delete(`https://localhost:44358/api/v1/Unit/${id}`)
          .then(function () {
            me.cancelFunctionDelete();
            // me.showToastMessage(me.resource.MiSaResource.MessageToast.MessageToastDeleteSucess.VI,"success")
            me.loadData();
          })
          .catch(function (res) {
            if(res.response.status == 500)
            {
              me.isShowDialogNotify = false;
              me.isShowDialogErr = true ;
              me.diaglogErrorMessage = `Vật tư hàng hóa <${me.unitCodeDelete}> đã có phát sinh. Bạn phải xóa các phát sinh liên quan trước khi xóa vật tư hàng hóa`
              me.isloading = false;
            }
            
          });
      } catch (error) {
        console.log(error);
      }
    },
    cancelFunctionDelete() {
      this.isShowDialogNotify = false;
    },
  
   async handleClickView(id)
    {
      const _this = this;
      try {
        _this.formMode = 2;
        _this.isloading = true
        //call api lấy thông tin chi tiết nhân viên
        await axios
          .get(`https://localhost:44358/api/v1/Unit/${id}`)
          .then(function (res) {
            _this.unitSelected = res.data;
            _this.isloading = false
          })
          .catch(function (res) {
            console.log(res);
          });
          _this.isShowPopUp = true
      } catch (error) {
        console.log(error);
      }
    },
    /*
    Hàm xử lý sau khi thêm mới thành công
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    afterEditSucess()
    {
      this.loadData()
    },
    handleCloseform()
    {
      this.isShowPopUp = false
    },
    handleOpenForm()
    {
      this.formMode = 1
      this.isShowPopUp = true
    },
    async loadData() {
      //Gọi api thực hiện lấy dữ liệu
      const _this = this;
      try {
        _this.isloading = true
        await axios
          .get(
            "https://localhost:44358/api/v1/Unit/paging?pageSize=10&pageNumber=1"
          )
          .then(function (res) {
           _this.unit = res.data.warehouses
           _this.totalRecord = res.data.total
           _this.totalPage = Math.ceil(_this.totalRecord / _this.recordInPage);
           _this.isloading = false
          })
          .catch(function () {
            alert("Có lỗi, vui lòng liên hệ MISA để được trợ giúp !");
            _this.isloading = false
          });
      } catch (error) {
        console.log(error);
      }
    },
  async onPageChange() {
      const _this = this;
      _this.isloading = true
      await axios
        
        .get(
          `https://localhost:44358/api/v1/Unit/paging?pageSize=${_this.recordInPage}&pageNumber=${_this.page}&textSearch=${_this.unitTextSearch}`
        )
        .then(function (res) {
          _this.unit = res.data.warehouses;
          _this.isloading = false
        })
        .catch(function (res) {
          console.log(res);
        });
    },
    onChangeValue(value)
    {
      value = value.trim()
      let _this = this;
      //Mục đích sử dụng time out để k call api liên tục khi input thay đổi
      //Chỉ khi dừng gõ 1000ms thì mới call api
      if (_this.myTimeOut) {
        clearTimeout(_this.myTimeOut);
      }
      _this.myTimeOut = setTimeout(() => {
        _this.isloading = true
        //call api
        axios
          .get(
            `https://localhost:44358/api/v1/Unit/paging?pageSize=10&pageNumber=1&textSearch=${
              value || ""
            }`
          )
          .then(function (res) {
            _this.unit = res.data.warehouses;
            _this.unit = res.data.warehouses
           _this.totalRecord = res.data.total
           _this.totalPage = Math.ceil(_this.totalRecord / _this.recordInPage);
            _this.isloading = false
          })
          .catch(function (res) {
            console.log(res);
          });

        //coding evethings
      }, 1000);
    },
  },
  created() {
    //Load dữ liệu từ database vào table
    this.loadData();
  },
  }
  </script>