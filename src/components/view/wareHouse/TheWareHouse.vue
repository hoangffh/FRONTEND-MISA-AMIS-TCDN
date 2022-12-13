<template>
  <div class="container-menu">
    <div class="container-menu-title">
      <div class="container-menu-title-left">
        <span>Kho</span>
        <div class="container-menu-title-left-all">
          <div class="container-menu-title-left-all-icon"></div>
          <router-link to="/Cash" class="cashHome">Tất cả danh mục</router-link>
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
            placeholder="Tìm theo mã kho , tên kho"
            :search="true"
            @onChangeValue="onChangeValue"
            relative="relative"
            v-model="warehouseTextSearch"
          />
        </div>
        <div class="container-menu-content-head-right">
          <div class="a-padd-l-10px container-menu-content-head-reload" @click="handleLoadData"></div>
          <div class="a-padd-l-10px print-meters"></div>
          <a class="a-padd-l-10px employ__export"  
            :href="linkExport"
            @click="handleExportDocument"
          ></a>
          <div class="a-padd-l-10px icon-setting"></div>
        </div>
      </div>
      <BaseTable
        :data="warehouses"
        :listCols="displayFieldWarehouse"
        :existFooter="false"
        :isShowCheckBox="false"
        fieldValue="WarehouseId"
        fieldValueCode="WarehouseCode"
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
  <WarehousePopUp 
    :isShowPopUp="isShowPopUp"
    :formMode="formMode"
    :warehouseSelected="warehouseSelected"
    @isRemoveForm="handleCloseform"
    @aftetInsertSucess="aftetInsertSucess"
    @afterEditSucess="afterEditSucess"
    ></WarehousePopUp>
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
import BaseInput from "../../base/BaseInput.vue";
import BaseTable from "../../base/BaseTable.vue";
import BaseCombobox from "../../base/BaseCombobox.vue";
import BasePaging from "../../base/BasePagingControl.vue";
import axios from "axios";
import WarehousePopUp from "./wareHousePopUpDetail.vue";
import BaseLoading from "../../view/loading.vue"
import DialogNotify from "../../view/dialogNotification.vue"
import DialogError from "../../base/dialogError.vue"
import Resources from "../../../js/resources"
export default {
  name: "m-product",
  components: {
    BaseButton,
    BaseInput,
    BaseTable,
    WarehousePopUp,
    BaseCombobox,
    BasePaging,
    BaseLoading,
    DialogNotify,
    DialogError
  },
  data() {
    return {
      warehouseSelected:{},
      formMode : null ,
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
      warehouses: [],
      warehouseTextSearch:"" ,
      isShowPopUp: false,
      listReferenceId:[],
      displayFieldWarehouse: [
        {
          display: Resources.MiSaResource.Warehouse.WarehouseCodeTable,
          name: "WarehouseCode",
          width: "150",
          align: "left",
        },
        {
          display: Resources.MiSaResource.Warehouse.WarehouseNameTable,
          name: "WarehouseName",
          width: "150",
          align: "left",
        },
        {
          display: Resources.MiSaResource.Warehouse.WarehousePlaceTable,
          name: "WarehousePlace",
          width: "150",
          align: "left",
        },
        {
          display: Resources.MiSaResource.Warehouse.WarehouseStatusTable,
          name: "UsingStatus",
          width: "150",
          align: "left",
        },
        {
          display: Resources.MiSaResource.Warehouse.WarehouseBranchTable,
          name: "WarehouseBranch",
          width: "150",
          align: "left",
        },
      ],
      isloading:false,
      isShowDialogNotify:false,
      messageDialogNotifi:null,
      isShowCancelButton : true,
      warehouseIdDelete : null,
      warehouseCodeDelete : null ,
      isShowDialogErr:false,
      diaglogErrorMessage:null,
      linkExport:null
      
    };
  },
  watch: {
    recordInPage(value) {
      this.totalPage = Math.ceil(this.totalRecord / value);
      this.onPageChange();
    },
    page(value) {
      console.log(value);
      this.onPageChange()
    },
  },
  methods: {
    handleExportDocument()
    {
      this.linkExport ="https://localhost:44358/api/v1/Warehouse/export"
    },
    handleLoadData()
    {
      this.loadData()
    },
    diaglogError()
    {
      this.isShowDialogErr = false
    },
 
  handleClickRemove(id,code)
  {
      this.warehouseIdDelete = id 
      this.warehouseCodeDelete = code
      this.isShowDialogNotify = true;
      this.messageDialogNotifi = `Bạn có thực sự muốn xóa Kho <${code}> không ?`;
  },
    /*
   Hàm xử lý xóa nhân viên được chọn thỏa mãn
    Author : Trần Nhật Hoàng (2/10/2022)
    */
   async allowDeleteEmoloyee() {
      const me = this;
      await  me.getReferenceId(me.warehouseIdDelete)
      if(me.listReferenceId.length !=0)
      {
              me.isShowDialogNotify = false;
              me.isShowDialogErr = true ;
              me.diaglogErrorMessage = `Vật tư hàng hóa <${me.warehouseCodeDelete}> đã có phát sinh. Bạn phải xóa các phát sinh liên quan trước khi xóa vật tư hàng hóa`
              me.isloading = false;
      }
      else{
        me.apiDeleteMethod(me.warehouseIdDelete);
      }
    },
      /*
      Api kiểm tra mã phát sinh
      Author : Trần Nhật Hoàng (2/10/2022)
    */
     async getReferenceId(id)
     {
      const me = this;
      try {
        await axios
          .get(`https://localhost:44358/api/v1/Warehouse/referenceId?referenceId=${id}`)
          .then(function (res) {
            me.listReferenceId = res.data
          })
          .catch(function (res) {
            console.log(res)     
          });
      } catch (error) {
        console.log(error);
      }
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
          .delete(`https://localhost:44358/api/v1/Warehouse/${id}`)
          .then(function () {
            me.cancelFunctionDelete();
            // me.showToastMessage(me.resource.MiSaResource.MessageToast.MessageToastDeleteSucess.VI,"success")
            me.loadData()
          })
          .catch(function (res) {
           console.log(res)
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
          .get(`https://localhost:44358/api/v1/Warehouse/${id}`)
          .then(function (res) {
            _this.warehouseSelected = res.data;
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
    aftetInsertSucess() {
      this.loadData()
    },
    afterEditSucess()
    {
      this.loadData()
    },
    handleOpenForm()
    {
      this.formMode = 1
      this.isShowPopUp = true
    },
    handleCloseform()
    {
      this.isShowPopUp = false
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
            `https://localhost:44358/api/v1/Warehouse/paging?pageSize=10&pageNumber=1&textSearch=${
              value || ""
            }`
          )
          .then(function (res) {
            _this.warehouses = res.data.warehouses;
            _this.totalRecord = res.data.total;
            _this.totalPage = Math.ceil(_this.totalRecord / _this.recordInPage);
            _this.isloading = false
          })
          .catch(function (res) {
            console.log(res);
          });

        //coding evethings
      }, 1000);
    },
    async loadData() {
      //Gọi api thực hiện lấy dữ liệu
      const _this = this;
      try {
        _this.isloading = true
        await axios
          .get(
            "https://localhost:44358/api/v1/Warehouse/paging?pageSize=10&pageNumber=1"
          )
          .then(function (res) {
            _this.isloading = false
            _this.warehouses = res.data.warehouses;
            _this.totalRecord = res.data.total;
            _this.totalPage = Math.ceil(_this.totalRecord / _this.recordInPage);
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
          `https://localhost:44358/api/v1/Warehouse/paging?pageSize=${_this.recordInPage}&pageNumber=${_this.page}&textSearch=${_this.warehouseTextSearch}`
        )
        .then(function (res) {
          _this.warehouses = res.data.warehouses;
          _this.isloading = false
        })
        .catch(function (res) {
          console.log(res);
        });
    },
  },
  created() {
    //Load dữ liệu từ database vào table
    this.loadData();
  },
};
</script>
