<template>
  <div class="container-menu">
    <div class="container-menu-title">
      <span>Nhân viên</span>
      <BaseToastMessage
        :content="contentToastMessage"
        :type="type"
        :isShowToastMessage="isShowToastMessage"
      ></BaseToastMessage>
      <TheBaseButton
        @click="handleClickAdd"
        hasHoverAndActivePrimarygreen
        textContent="Thêm mới nhân viên"
      >
      </TheBaseButton>
    </div>
    <div class="container-menu-content">
      <div class="container-menu-content-head">
        <div class="container-menu-content-head-left">
          <div class="batchExecution" @click="showListBatchExecution">
            <span>Thực hiện hàng loạt</span>
            <div class="batchExecution-icon"></div>
            <div
              class="listBatchExecution"
              @click="removeAllEmployee"
              v-if="isShowListBatchExecution"
            >
              Xóa
            </div>
          </div>
        </div>
        <div class="container-menu-content-head-right">
          <div class="container-menu-content-head-item">
            <TheBaseInput
              type="text"
              width="200px"
              height="34px"
              placeholder="Tìm theo mã , tên nhân viên"
              :search="true"
              ref="employeeFilterRef"
              relative="relative"
              @keyup.enter="filterEmployee"
              @onChangeValue="onChangeValue"
              v-model="employeeFilter"
            />
          </div>
          <div
            class="container-menu-content-head-reload"
            @click="handleReloadPage"
          ></div>
          <a
            :href="linkExport"
            class="employ__export"
            @click="handleExportDocument"
          ></a>
        </div>
      </div>
      <div class="employ__table__wrap">
        <div class="employ__table" >
          <table>
            <thead>
              <tr class="table__row__header">
                <th class="table__check__box">
                  <BaseCheckBox
                    ref="toggleCheckAll"
                    @click="handleCheckAllMulti"
                    :stateCheckAll="stateCheckAll"
                  ></BaseCheckBox>
                </th>
                <th>
                  <div class="employeeCode txt-left" style="min-width: 120px">
                    MÃ NHÂN VIÊN
                  </div>
                </th>
                <th>
                  <div class="fullName txt-left" style="min-width: 140px">
                    TÊN NHÂN VIÊN
                  </div>
                </th>
                <th>
                  <div class="genderName txt-left" style="min-width: 100px">
                    GIỚI TÍNH
                  </div>
                </th>
                <th>
                  <div class="dateOfBirth txt-center">NGÀY SINH</div>
                </th>
                <th>
                  <div class="txt-left">SỐ CMND</div>
                </th>
                <th>
                  <div class="txt-left" style="min-width: 120px">CHỨC DANH</div>
                </th>
                <th>
                  <div class="txt-left" style="min-width: 145px">
                    TÊN ĐƠN VỊ
                  </div>
                </th>
                <th>
                  <div class="txt-left">SỐ TÀI KHOẢN</div>
                </th>
                <th>
                  <div class="txt-left" style="min-width: 120px">
                    TÊN NGÂN HÀNG
                  </div>
                </th>
                <th>
                  <div class="txt-left" style="min-width: 140px">
                    CHI NHÁNH NGÂN HÀNG
                  </div>
                </th>
                <th>CHỨC NĂNG</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="employee in employees"
                :key="employee.EmployeeId"
                @dblclick="handledblClickRow(employee.EmployeeId)"
              >
                <td>
                  <div class="row__check-box__align">
                    <BaseCheckBox
                      @click="handleSelectRow(employee.EmployeeId)"
                      :stateCheckAll="stateCheckAll"
                    >
                    </BaseCheckBox>
                  </div>
                </td>
                <td>
                  {{ employee.EmployeeCode }}
                </td>
                <td>
                  {{ employee.EmployeeName }}
                </td>
                <td>
                  {{ employee.GenderName }}
                </td>
                <td>
                  <div class="aligin-center">
                    {{ formatDate(employee.DateOfBirth) || "" }}
                  </div>
                </td>
                <td>
                  {{ employee.IdentityNumber }}
                </td>
                <td>
                  {{ employee.PositionName }}
                </td>
                <td>
                  {{ employee.DepartmentName }}
                </td>
                <td>
                  {{ employee.BankAccountNumber }}
                </td>
                <td>
                  {{ employee.BankAccountName }}
                </td>
                <td>
                  {{ employee.IdentityPlace }}
                </td>
                <td>
                  <div class="row__func">
                    <span @click="handleEditEmployee(employee.EmployeeId)"
                      >Sửa</span
                    >
                    <div class="row__func__box">
                      <div
                        :class="['icon__wrap']"
                        @click="
                          showListfunction(
                            $event,
                            employee.EmployeeId,
                            employee.EmployeeCode
                          )
                        "
                      >
                        <div class="icon"></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="container-menu-footer">
        <div class="container-menu-footer-totalRecord">
          <span>Tổng số : </span>
          <span style="font-weight : bold">{{totalRecord}} </span>
          <span> bản ghi</span>
        </div>
        <div class="container-menu-footer-totalRecord-right">
          <TheBaseSelect
            width="160px"
            height="28px"
            item-text="text"
            :items="selectRecordInPage"
            :itemDefault="recordInPage"
            return-object
            @selectedItem="selectItemPagging"
          ></TheBaseSelect>
          <BasePaging
            :total-pages="totalPage"
            :total="totalRecord"
            :pageSize="perPage"
            :currentPage="currentPage"
            @pagechanged="onPageChange"
          >
          </BasePaging>
        </div>
      </div>
    </div>
  </div>
  <PopUpOver
    :positionX="positonX"
    :positionY="positionY"
    :isShowList_Function="isShowList_Function"
    @deleteEmployee="deleteEmployee"
    @duplicateEmployee="duplicateEmployee"
  ></PopUpOver>
  <TheOverlayVue
    :isShowPopUp="isShowPopUpDetails"
    @isRemoveForm="clickAddform"
    :employeeSelected="employeeSelected"
    @aftetInsertSucess="aftetInsertSucess"
    :formMode="formMode"
    @afterEditSucess="afterEditSucess"
  ></TheOverlayVue>
  <TheLoading :loadingShow="loadingOpen"></TheLoading>
  <!-- <dialogQuestions :isShowDialogQuestions="isShowDialogQuestions" textContentQuestion="textContentQuestion"></dialogQuestions> -->
  <dialogNotify
    :isShowDialogConfirm="isShowDialogConfirm"
    @removeDiaglogConfirm="allowDeleteEmoloyee"
    @cancelFunctionDelete="cancelFunctionDelete"
    :messageDialogNotifi="messageDialogNotifi"
    isShowCancelButton="isShowCancelButton"
  ></dialogNotify>
  <BaseTooltip
    :isShowTooltip="isShowTooltip"
    :positionX="toolTipPositionX"
    :positionY="toolTipPositionY"
    :contentTooltip="contentTooltip"
  ></BaseTooltip>
</template>
<script>
import resource from"../../js/resources.js"
import enums from"../../js/enum"
import TheBaseButton from "../base/BaseButton.vue";
import TheBaseInput from "../base/BaseInput.vue";
import TheOverlayVue from "../layout/TheOverlay.vue";
import TheLoading from "./loading.vue";
import TheBaseSelect from "../base/BaseSelect.vue";
import PopUpOver from "../view/PopUpOver.vue";
import BaseCheckBox from "../base/BaseCheckBox.vue";
import dialogNotify from "../view/dialogNotification.vue";
import BasePaging from "../base/BasePaging.vue";
import BaseToastMessage from "../base/BaseToastMessage.vue";
import BaseTooltip from "../base/BaseTooltip.vue";
import axios from "axios";
export default {
  name: "m-employee",
  components: {
    TheBaseButton,
    TheBaseInput,
    TheOverlayVue,
    TheLoading,
    TheBaseSelect,
    PopUpOver,
    dialogNotify,
    BaseCheckBox,
    BasePaging,
    BaseToastMessage,
    BaseTooltip,
  },
  data() {
    return {
      //Biến lưu trữ trạng thấi của toast message
      type:"",
      //Biến lưu nội dung của tooltip
      contentTooltip: "",
      //Biến lưu vị trí của tooltip khi hover
      toolTipPositionX: 0,
      toolTipPositionY: 0,
      //Biến cho phép ẩn  hiện tooltip
      isShowTooltip: false,
      //Biến cho phép ẩn  hiện toast message
      isShowToastMessage: false,
      // Biến lưu trữ text của toast message
      contentToastMessage:"",
      //list phân trang : tổng số bản ghi / page size
      totalPage: "",
      //page size
      perPage: 20,
      //giá trị page hiện tại : page number
      currentPage: 1,
      //Biến lưu trữ xuất excel
      linkExport: null,
      //Biến xử lý text của DialogNotifi
      messageDialogNotifi: null,
      //Biến hiển thị diaglog eror
      isShowDialogConfirm: false,
      //Biễn xử lý nut hủy bên trong dialog
      isShowCancelButton: true,
      //Biến xử lý text bên trong dialog question
      textContentQuestion: null,
      //Biến xử lý ẩn hiện list xóa nhiều
      isShowListBatchExecution: false,
      //Biến xử lý chọn một nhân viên để xóa
      employeeSelected: {},
      //Biến ẩn  hiện dialog question
      isShowDialogQuestions: false,
      //Biến xử lý ẩn hiện chức năng của table : nhân bản , xóa , ngưng sử dụng
      isShowList_Function: false,
      //Biến xử lý thời gian nhập text vào ô input tìm kiếm
      myTimeOut: null,
      //Biến xử lý khi nào ở trạng thái thêm mới và sửa
      formMode: null,
      //Biến xử lý form pop up detalis
      isShowPopUpDetails: false,
      //Biến lưu trữ thông tin nhân viên render vào trong table
      employees: null,
      //Biên chứa dữ liệu phân trang
      selectRecordInPage: [
        { text: "20 bản ghi trên 1 trang", value: "20" },
        { text: "40 bản ghi trên 1 trang", value: "40" },
        { text: "60 bản ghi trên 1 trang", value: "60" },
        { text: "80 bản ghi trên 1 trang", value: "80" },
      ],
      //lựa chọn paging hiện tại
      recordInPage: {
        text: "20 bản ghi trên 1 trang",
        value: "20",
      },
      // loading
      loadingOpen: false,
      //vị trí hiện list chức năng table
      positonX: 0,
      positionY: 0,
      //Biến lưu trữ id nhân viên cần delete
      employeeIdDelete: null,
      //Biến lưu trữ ma nhân viên cần delete
      employeeCodeDelete: null,
      //Biến lưu trữ tổng số bản ghi
      totalRecord: 0,
      //Biễn lưu trữ list id nhân viên cần xóa nhiều
      listEmployeeSelected: [],
      //biến hiên thị trang thái check box xóa nhiều
      stateCheckAll: false,
      //Biến xử lý khi nào ở trạng thái xóa một và xóa nhiều
      formModeDelte: null,
      //Biến lưu dữ liệu nhập từ ô tìm kiếm
      employeeFilter: "",
      //Biến lưu object resources
      resource:null,
      //Biến lưu object enum
      enums:null
    };
  },
  methods: {
    /*
    Hàm xử lý phím tắt
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleShortKey(e) {
      let me = this;
      if (e.ctrlKey) {
        switch (e.keyCode) {
          //sửa nhân viên
          case this.enums.MiSaEnum.keyCode.F2:
            e.preventDefault();
            me.handledblClickRow();
            break;
        }
      } else {
        switch (e.keyCode) {
          //Thêm nhân viên
          case this.enums.MiSaEnum.keyCode.insert:
            e.preventDefault();
            me.handleClickAdd();
            break;
          //Xóa nhân viên
          case this.enums.MiSaEnum.keyCode.delete:
            e.preventDefault();
            me.deleteEmployee();
            break;
        }
      }
    },
    /*
    Xử lý lấy ra list Id khi thực hiện hành động xóa nhiều
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleCheckAllMulti() {
      this.stateCheckAll = !this.stateCheckAll;
      if (this.stateCheckAll == true) {
        this.listEmployeeSelected = [];
        this.listEmployeeSelected = this.employees;
        this.listEmployeeSelected = this.listEmployeeSelected.map(function (
          value
        ) {
          return value.EmployeeId;
        });
        // this.allowDeleteEmoloyee()
      } else {
        this.listEmployeeSelected = [];
      }
    },
    /*
      Thực hiện phân trang dữ liệu
      Author : Trần Nhật Hoàng (2/10/2022)
    */
    onPageChange(page) {
      const me = this;
      me.currentPage = page;
      // me.totalPage =Math.ceil(me.totalRecord / me.perPage)
      me.loadingOpen = true;
      axios
        .get(
          `https://localhost:44358/api/v1/Employees/paging?pageSize=${me.perPage}&pageNumber=${me.currentPage}&textSearch=${me.employeeFilter}`
        )
        .then(function (res) {
          me.employees = res.data.employees;
          me.loadingOpen = false;
        })
        .catch(function (res) {
          console.log(res);
        });
    },
    /*
      Thực hiện xuất khẩu ra excel
       Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleExportDocument() {
      this.linkExport = "https://localhost:44358/api/v1/Employees/export";
    },
    //Hàm xử lý reload page
    ActionReloadPage() {
      window.location.reload();
    },
    //Xử lý sự kiện reload lại trang
    handleReloadPage() {
      this.ActionReloadPage();
    },
    /*
      Api xử lý xóa nhiều nhân viên
      Author : Trần Nhật Hoàng (2/10/2022)
    */
    async apiDeleteAllEmployee() {
      try {
        const me = this;
        me.loadingOpen = true;
        await axios
          .put(
            `https://localhost:44358/api/v1/Employees/multi`,
            me.listEmployeeSelected
          )
          .then(function (res) {
              me.cancelFunctionDelete();
              me.loadingOpen = false;
            if(me.listEmployeeSelected.length == res.data)
            {
              me.listEmployeeSelected = []
              me.showToastMessage(me.resource.MiSaResource.MessageToast.MessageToastDeleteSucess.VI,"success")
              me.loadData();
            }
            else{
              me.showToastMessage(me.resource.MiSaResource.MessageToast.MessageToastDeleteError.VI,"error")
            }

           
          })
          .catch(function (res) {
            me.loadingOpen = false;
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /*
    Xử lý trạng thái xóa nhân viên : 1 hoặc nhiều nhân viên
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    removeAllEmployee() {
      //Api ở trạng thái cho phép xóa nhiều
      this.formModeDelte = 2;
      if (this.listEmployeeSelected.length > 0) {
        this.isShowDialogConfirm = true;
        this.messageDialogNotifi = this.resource.MiSaResource.MessageDialog.diaglogNotifyConfirmDeleteAll.VI;
        // this.apiDeleteAllEmployee()
      } else {
        this.isShowDialogConfirm = true;
        this.messageDialogNotifi = this.resource.MiSaResource.MessageDialog.diaglogNotifyQuestion.VI;
      }
    },
    /*
    Hàm show chưc năng xóa nhiều
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    showListBatchExecution() {
      //toggle list chức năng xóa nhiều
      this.isShowListBatchExecution = !this.isShowListBatchExecution;
    },
    /*
    Hàm xử lý dblclick vào thôgn tin nhân viên trong bảng
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleSelectRow(id) {
      //Kiêm tra và push id cần xóa vào list nhân viên cần xóa nhiều
      if (this.listEmployeeSelected.includes(id)) {
        this.listEmployeeSelected = this.listEmployeeSelected.filter(
          (i) => i != id
        );
      } else {
        this.listEmployeeSelected.push(id);
      }
      if (this.listEmployeeSelected.length == this.employees.length) {
        this.$refs.toggleCheckAll.isChecked = true;
      } else this.$refs.toggleCheckAll.isChecked = false;
    },
    /*
    Hàm xử lý toast message
    Author : Trần Nhật Hoàng (2/10/2022)
    */
   showToastMessage(content,typeStatus)
   {
   
    this.isShowToastMessage = true
    this.contentToastMessage = content
    this.type = typeStatus
    setTimeout(() => {
      this.isShowToastMessage = false
    }, 2000);
   },
    /*
    Hàm xử lý sau khi thêm mới thành công
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    aftetInsertSucess(employee) {
      if (employee) {
        this.employees.unshift(employee);
        this.employees.pop();
        this.showToastMessage(this.resource.MiSaResource.MessageToast.MessageToastInsertSucess.VI,"success")
        this.loadData();
      }
    },
     /*
    Hàm xử lý sau khi sửa thành công
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    afterEditSucess()
    {
      this.showToastMessage(this.resource.MiSaResource.MessageToast.MessageToastEditSucess.VI,"success")
      this.loadData();
    },
    //Hành đọng click vàon nút hủy trong dialog
    cancelFunctionDelete() {
      this.isShowDialogConfirm = false;
      this.isShowList_Function = false;
    },
     /*
   Hàm xử lý xóa nhân viên được chọn thỏa mãn
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    allowDeleteEmoloyee() {
      const me = this;
      //Api ở trang thái cho phép xóa môt nhân viên được chọn
      if (me.formModeDelte == 1) {
        me.apiDeleteMethod(me.employeeIdDelete);
      } else {
        //Api ở trang thái cho phép xóa nhiều nhân viên được chọn
        me.apiDeleteAllEmployee();
      }
    },
     /*
    Hàm hiên thi dialog xác nhân xóa
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    deleteEmployee() {
      this.formModeDelte = 1;
      this.isShowDialogConfirm = true;
      this.messageDialogNotifi = `Bạn có thực sự muốn xóa Nhân viên <${this.employeeCodeDelete}> không ?`;
      // this.isShowList_Function = value
    },
    /*
   Hàm hiển thị các chức năng trong table
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    showListfunction(e, employeeId, employeeCode) {
      //Thực hiên lấy giá trị cho id nhân viên cần xóa
      this.employeeIdDelete = employeeId;
      //Thực hiên lấy giá trị cho mã nhân viên cần xóa
      this.employeeCodeDelete = employeeCode;
      this.positonX = e.clientX;
      this.positionY = e.clientY;
      this.isShowList_Function = !this.isShowList_Function;
    },
    /*
      Api xóa môt nhân viên
      Author : Trần Nhật Hoàng (2/10/2022)
    */
    async apiDeleteMethod(employeeId) {
      const me = this;
      try {
        me.loadingOpen = true;
        await axios
          .delete(`https://localhost:44358/api/v1/Employees/${employeeId}`)
          .then(function () {
            me.cancelFunctionDelete();
            me.showToastMessage(me.resource.MiSaResource.MessageToast.MessageToastDeleteSucess.VI,"success")
            me.loadData();
          })
          .catch(function (res) {
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },
    //hàm xử lý hiển thị list chức năng của tale
    HandleDeleteEmployee(value) {
      console.log(value);
      this.isShowList_Function = false;
    },
    /*
      Hàm xử lý khi input filter thay đổi giá trị
      Author : Trần Nhật Hoàng (2/10/2022)
    */
    onChangeValue(value) {
      let me = this;
      //Mục đích sử dụng time out để k call api liên tục khi input thay đổi
      //Chỉ khi dừng gõ 1000ms thì mới call api
      if (me.myTimeOut) {
        clearTimeout(me.myTimeOut);
      }
      me.myTimeOut = setTimeout(() => {
        //call api

        console.log(value);
        this.loadingOpen = true;
        axios
          .get(
            `https://localhost:44358/api/v1/Employees/paging?pageSize=20&pageNumber=1&textSearch=${
              value || ""
            }`
          )
          .then(function (res) {
            me.employees = res.data.employees;
            me.totalRecord = res.data.total;
            me.currentPage = 1;
            me.perPage = Math.ceil(
              me.totalRecord / Number(me.recordInPage.value) || 1
            );
            me.loadingOpen = false;
          })
          .catch(function (res) {
            console.log(res);
          });

        //coding evethings
      }, 1000);
    },
    /*
    Api phân trang khi click vào dữ liệu phần trang
     Author : Trần Nhật Hoàng (2/10/2022)
    */
    selectItemPagging(item) {
      let me = this;
      me.recordInPage = item;
      me.perPage = item.value;
      me.totalPage = Math.ceil(me.totalRecord / me.perPage);
      me.currentPage = 1;
      if (item) {
        me.loadingOpen = true;
        axios
          .get(
            `https://localhost:44358/api/v1/Employees/paging?pageSize=${me.perPage}&pageNumber=${me.currentPage}&textSearch=${me.employeeFilter}`
          )
          .then(function (res) {
            me.employees = res.data.employees;
            me.loadingOpen = false;
          })
          .catch(function (res) {
            console.log(res);
          });
      }
    },
    //Hiển thị Pop up detail
    handleClickAdd() {
      //đang ở trạng thái thêm mới
      this.formMode = 1;
      //Hiên thị pop up thêm mới
      this.clickAddform(true);
    },
    /*
    Ham xử xử nhân bản nhân viên
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    duplicateEmployee() {
      //đang ở trạng thái thêm mới
      this.handledblClickRow(this.employeeIdDelete);
      this.formMode = 1;
      this.isShowList_Function = false
    },
    //Xử lý lấy value trạng thái Pop Up
    clickAddform(value) {
      this.isShowPopUpDetails = value;
    },
    /*
    Hàm xử lý hiển thị ngày tháng nhân viên lên table
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    formatDate(inputDate) {
      if (inputDate) {
        var date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
          // Months use 0 index.
          return (
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear()
          );
        }
      }
    },
    /*
    Hàm xử lý hành động click vào nút sửa nhân vien
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleEditEmployee(employeeId) {
      this.handledblClickRow(employeeId);
    },
    /*
    APi lấy ra nhân viên theo id khi thưc hiện hành động
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async handledblClickRow(employeeId) {
      const _this = this;
      try {
        _this.formMode = 2;
        //call api lấy thông tin chi tiết nhân viên
        await axios
          .get(`https://localhost:44358/api/v1/Employees/${employeeId}`)
          .then(function (res) {
            _this.employeeSelected = res.data;
          })
          .catch(function (res) {
            console.log(res);
          });
        _this.clickAddform(true);
      } catch (error) {
        console.log(error);
      }
    },
    /*
      Xử lý render dữ liệu vào table
      Author : Trần Nhật Hoàng (2/10/2022)
    */
    async loadData() {
      //Gọi api thực hiện lấy dữ liệu
      const _this = this;
      window.addEventListener("keydown", _this.handleShortKey);
      try {
        _this.loadingOpen = true;
        await axios
          .get(
            "https://localhost:44358/api/v1/Employees/paging?pageSize=20&pageNumber=1"
          )
          .then(function (res) {
            _this.employees = res.data.employees;
            _this.totalRecord = res.data.total;
            _this.totalPage = Math.ceil(_this.totalRecord / _this.perPage);
            _this.loadingOpen = false;
          })
          .catch(function () {
            alert("Có lỗi, vui lòng liên hệ MISA để được trợ giúp !");
            _this.loadingOpen = false;
          });
      } catch (error) {
        console.log(error);
      }
    },
    /*
   Hàm xử lý tìm kiếm nhân viên
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    filterEmployee() {
      //Xử lý câll api tìm kiếm nhân viên
      const _this = this;
      try {
        _this.loadingOpen = true;
        axios
          .get(
            `https://localhost:44358/api/v1/Employees/paging?pageSize=10&pageNumber=1&textSearch=${_this.employeeFilter}`
          )
          .then(function (res) {
            _this.employees = res.data.employees;
            _this.totalRecord = res.data.total;
            _this.loadingOpen = false;
          })
          .catch(function (res) {
            // if(res.response.status == 500)
            // {

            // }
            console.log(res)
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    //Load dữ liệu từ database vào table
    this.loadData();
    //Biến lưu object resources
    this.resource = resource
    ////Biến lưu object enum
    this.enums = enums
  },
  // mounted(){
  //   this.loadData()
  // },
};
</script>
<style>
@import url(../../css/main.css);

</style>
