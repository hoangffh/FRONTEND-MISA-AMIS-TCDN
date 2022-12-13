<template>
  <div class="overlay" v-if="isShowPopUp">
    <div class="overlay-body">
      <div class="overlay-body-title">
        <div class="overlay-body-title-left">
          <span class="title">Thông tin nhân viên</span>
          <div class="overlay-body-title-checkbox">
            <div
              class="overlay-body-title-checkbox-user overlay-body-title-checkbox-icon"
            >
              <TheBaseCheckBox />
              <span>Là khách hàng</span>
            </div>
            <div
              class="overlay-body-title-checkbox-employee overlay-body-title-checkbox-icon"
            >
              <TheBaseCheckBox />
              <span>Là nhà cung cấp</span>
            </div>
          </div>
        </div>
        <div class="overlay-body-title-right">
          <div class="overlay-body-title-helpIcon"></div>
          <div class="overlay-body-title-exitIcon" @click="removeFormAdd"></div>
        </div>
      </div>
      <div class="overlay-body-informationEmployee">
        <div class="overlay-body-informationEmployee-top">
          <div class="overlay-body-informationEmployee-left a-col-6">
            <div class="overlay-body-informationEmployee-left-item">
              <div class="m-employee-Text a-col-5 a-padding-r-30px">
                <div class="m-textInputColum">
                  <label for="employeeCode">Mã</label>
                  <span>*</span>
                </div>
                <TheBaseInput
                  ref="EmployeeCodeRef"
                  type="text"
                  height="34px"
                  width="100%"
                  placeholder=""
                  v-model="employees.EmployeeCode"
                  :isErr="isErr('EmployeeCode')"
                  field="EmployeeCode"
                  @onChangeValue="onChangeInputValue"
                  :tabIndex="1"
                />
              </div>
              <div class="m-employee-Text a-col-7 a-padd-r-20px">
                <div class="m-textInputColum">
                  <label for="employeeCodeName">Tên</label>
                  <span>*</span>
                </div>
                <TheBaseInput
                  type="text"
                  height="34px"
                  width="100%"
                  placeholder=""
                  v-model="employees.EmployeeName"
                  ref="EmployeeNameRef"
                  :isErr="isErr('EmployeeName')"
                  field="EmployeeName"
                  @onChangeValue="onChangeInputValue"
                  :tabIndex="2"
                />
              </div>
            </div>
            <div
              class="overlay-body-informationEmployee-left-item a-padding-t-12px"
            >
              <div class="m-employee-Text a-col-12 a-padd-r-2px a-padd-t-6px">
                <div class="m-textInputColum">
                  <label for="employeeDepartment">Đơn vị</label>
                  <span>*</span>
                </div>
                <Combobox
                  :url="'https://localhost:44358/api/v1/Departments'"
                  propValue="DepartmentId"
                  propText="DepartmentName"
                  v-model="employees.DepartmentName"
                  ref="EmployeeDepartmentRef"
                  @getValue="getDepartmentId"
                  :isErr="isErr('EmployeeDepartment')"
                  field="EmployeeDepartment"
                  @onChangeValue="onChangeInputValue"
                  :tabIndex="3"
                ></Combobox>
              </div>
            </div>
            <div
              class="overlay-body-informationEmployee-left-item a-padding-t-8px a-padd-r-10px"
            >
              <div class="m-employee-Text a-col-12 a-padd-r-10px">
                <label for="employeeCode">Chức danh</label>
                <TheBaseInput
                  type="text"
                  height="34px"
                  width="100%"
                  placeholder=""
                  v-model="employees.PositionName"
                  ref="EmployeePositonNameRef"
                  :tabIndex="4"
                />
              </div>
            </div>
          </div>
          <div class="overlay-body-informationEmployee-right a-col-6">
            <div class="overlay-body-informationEmployee-left-item">
              <div class="m-employee-Text a-col-5 a-padd-l-10px a-padd-r-20px">
                <label for="employeeCode">Ngày sinh</label>
                <TheBaseInput
                  type="date"
                  height="34px"
                  width="100%"
                  placeholder=""
                  v-model="employees.DateOfBirth"
                  ref="EmployeeDateOfBirthRef"
                  :isErr="isErr('EmployeeDateOfBirth')"
                  field="EmployeeDateOfBirth"
                  @onChangeValue="onChangeInputValue"
                  :tabIndex="5"
                />
              </div>
              <div class="m-employee-Text a-col-7 a-padd-l-20px">
                <BaseRadio
                  @itemGenderSelected="itemGenderSelected"
                  :label="'Giới tính'"
                  :tabIndex="6"
                  :listItem="[
                    { display: 'Nữ', value: 0 },
                    { display: 'Nam', value: 1 },
                    { display: 'Khác', value: 2 },
                  ]"
                  v-model="employees.Gender"
                />
              </div>
            </div>
            <div
              class="overlay-body-informationEmployee-left-item a-padding-t-12px"
            >
              <div class="m-employee-Text a-col-7 a-padd-l-10px a-padd-r-10px">
                <label @mouseout="handleCancelToolTip" @mouseover="handleHoverElement($event)" style="width:fit-content"  for="employeeCode">Số CMND</label>
                <TheBaseInput
                  type="text"
                  height="34px"
                  width="100%"
                  placeholder=""
                  v-model="employees.IdentityNumber"
                  ref="EmployeeIdentityNumberRef"
                  :tabIndex="7"
                />
              </div>
              <div class="m-employee-Text a-col-5 a-padd-l-20px a-padd-r-10px">
                <label for="employeeCode">Ngày cấp</label>
                <TheBaseInput
                  type="date"
                  height="34px"
                  width="100%"
                  placeholder=""
                  v-model="employees.IdentityDate"
                  ref="IdentityDateRef"
                  :isErr="isErr('IdentityDate')"
                  field="IdentityDate"
                  @onChangeValue="onChangeInputValue"
                  :tabIndex="8"
                />
              </div>
            </div>
            <div
              class="overlay-body-informationEmployee-left-item a-padding-t-12px a-padd-r-10px"
            >
              <div class="m-employee-Text a-col-12 a-padd-l-10px">
                <label for="employeeCode">Nơi cấp</label>
                <TheBaseInput
                  type="text"
                  height="34px"
                  width="100%"
                  placeholder=""
                  v-model="employees.IdentityPlace"
                  ref="EmployeeIdentityPlaceRef"
                  :tabIndex="9"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="overlay-body-informationEmployee-bottom a-padd-r-10px">
          <div
            class="overlay-body-informationEmployee-left-item a-padding-t-12px"
          >
            <div class="m-employee-Text a-col-12">
              <label for="employeeCode">Địa chỉ</label>
              <TheBaseInput
                type="text"
                height="34px"
                width="100%"
                placeholder=""
                v-model="employees.AddressEmployee"
                ref="EmployeeAddressEmployeeRef"
                :tabIndex="10"
              />
            </div>
          </div>
          <div
            class="overlay-body-informationEmployee-left-item a-padding-t-12px"
          >
            <div class="m-employee-Text a-col-3 a-padd-r-20px">
              <label for="employeeCode">ĐT di động</label>
              <TheBaseInput
                type="text"
                height="34px"
                width="100%"
                placeholder=""
                v-model="employees.PhoneNumber"
                ref="EmployeePhoneNumberRef"
                :tabIndex="11"
              />
            </div>
            <div class="m-employee-Text a-col-3 a-padd-l-10px a-padd-r-20px">
              <label for="employeeCode">ĐT cố định</label>
              <TheBaseInput
                type="text"
                height="34px"
                width="100%"
                placeholder=""
                v-model="employees.TelephoneNumber"
                ref="EmployeeTelephoneNumberRef"
                :tabIndex="12"
              />
            </div>
            <div class="m-employee-Text a-col-3 a-padd-l-10px a-padd-r-20px">
              <label for="employeeCode">Email</label>
              <TheBaseInput
                type="email"
                height="34px"
                width="100%"
                placeholder=""
                v-model="employees.emailEmployee"
                ref="EmployeeEmailRef"
                :isErr="isErr('EmployeeEmail')"
                field="EmployeeEmail"
                @onChangeValue="onChangeInputValue"
                :tabIndex="13"
              />
            </div>
          </div>
          <div
            class="overlay-body-informationEmployee-left-item a-padding-t-12px"
          >
            <div class="m-employee-Text a-col-3 a-padd-r-20px">
              <label for="employeeCode">Tài khoản ngân hàng</label>
              <TheBaseInput
                type="text"
                height="34px"
                width="100%"
                placeholder=""
                v-model="employees.BankAccountNumber"
                ref="EmployeeBankAccountNumberRef"
                :tabIndex="14"
              />
            </div>
            <div class="m-employee-Text a-col-3 a-padd-l-10px a-padd-r-20px">
              <label for="employeeCode">Tên ngân hàng</label>
              <TheBaseInput
                type="text"
                height="34px"
                width="100%"
                placeholder=""
                margin="20px"
                v-model="employees.BankAccountName"
                ref="EmployeeBankAccountNameRef"
                :tabIndex="15"
              />
            </div>
            <div class="m-employee-Text a-col-3 a-padd-l-10px a-padd-r-20px">
              <label for="employeeCode">Chi nhánh</label>
              <TheBaseInput
                type="text"
                height="34px"
                width="100%"
                placeholder=""
                v-model="employees.BankAccountBranch"
                ref="EmployeeBankAccountBranchRef"
                :tabIndex="16"
              />
            </div>
          </div>
        </div>
        <div class="overlay-body-informationEmployee-bottom-footer">
          <div  @mouseout="handleCancelToolTip" @mouseover="handleHoverElement($event)" class="overlay-body-informationEmployee-bottom-footer-left">
            <TheBaseButton
              @click="handleCancelForm"
              hasBorderButton
              hasHoverAndActivePrimarygreen
              textContent="Hủy"
              :tabIndex="17"
              @handleKeyDown="handleCancelForm"
            >
            </TheBaseButton>
          </div>
          <div  class="overlay-body-informationEmployee-bottom-footer-right">
            <TheBaseButton 
              hasBorderButton
              hasHoverAndActivePrimarygreen
              textContent="Cất"
              hasMarginItem
              @click="handleStore"
              :tabIndex="18"
              @handleKeyDown="handleStore"
              @mouseout="handleCancelToolTip" @mouseover="handleHoverElement($event)"
            ></TheBaseButton>
            <TheBaseButton  @mouseout="handleCancelToolTip" @mouseover="handleHoverElement($event)"
              @click="handleStoreAndAdd"
              hasHoverAndActivePrimarygreen
              textContent="Cất và Thêm"
              :tabIndex="19"
              @handleKeyDown="handleStoreAndAdd"
            >
            </TheBaseButton>
          </div>
        </div>
      </div>
      <div class="overlay-body-button"></div>
    </div>
    <TheDialog
      :isShowDialogErr="isShowDialogDetails"
      @RemoveDialogErr="diaglogError"
      :textContent="popUpMessage"
    >
    </TheDialog>
    <dialogNotify
      :isShowDialogConfirm="isShowDialogConfirm"
      @removeDiaglogConfirm="diaglogConfirm"
      :messageDialogNotifi="diaglogMessage"
    ></dialogNotify>
    <dialogQuestions
      :isShowDialogQuestions="isShowDialogQuestions"
      @canCelDialogQuestion="canCelDialogQuestion"
      textContentQuestion="Dữ liệu đã bị thay đổi. Bạn có muốn cất không?"
      @closePopUp="closePopUp"
      @SaveAndClosePopUp="saveAndclosePopUp"
    ></dialogQuestions>
    <BaseTooltip
    :isShowTooltip="isShowTooltip"
    :positionX="toolTipPositionX"
    :positionY="toolTipPositionY"
    :contentTooltip="contentTooltip"
  ></BaseTooltip>
  </div>
</template>

<script>
import resource from"../../js/resources.js";
import enums from"../../js/enum.js";
import TheBaseButton from "../base/BaseButton.vue";
import TheBaseInput from "../base/BaseInput.vue";
import TheBaseCheckBox from "../base/BaseCheckBox.vue";
import TheDialog from "../base/dialogError.vue";
import Combobox from "../base/BaseCombobox.vue";
import dialogNotify from "../view/dialogNotification.vue";
import dialogQuestions from "../view/dialogQuestion.vue";
import BaseRadio from "../base/BaseRadioButton.vue";
import BaseTooltip from "../base/BaseTooltip.vue";
import axios from "axios";
export default {
  name: "m-overlay",
  props: ["isShowPopUp", "employeeSelected", "formMode"],
  watch: {
    /*
    lấy dữ liệu api khi click vào một hàng trong table và render lên Pop Up
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    employeeSelected: function (value) {
      if (value) {
        //format lại dữ liệu datetime khi render
        value.DateOfBirth = this.formatDate(value.DateOfBirth);
        value.IdentityDate = this.formatDate(value.IdentityDate);
        //lấy employeeId
        this.employeeGuId = value.EmployeeId;
        //gán lại dũ liệu vào employeess
        this.employees = value;
        //khi gán 1 object hay 1 arr vào 1 biến => thì bản chất là 2 biến này cùng giữ 1 địa chỉ của object => thay đổi 1 thì 2 cái thay đổi
        //[...] => ... nghĩa là rải các phần tử bên trong ra,
        //Ví dụ [1, 2, 3, 4] thì ... sẽ tương đương 1, 2, 3, 4 => kết hợp [] sẽ thành [1, 2, 3, 4]
        //nó khác với gán thẳng giá trị là nó sẽ tạo ra 1 obj mới rồi mới gián => thay đổi 1 cái thì cái kia không thay đổi
        this.employeeOldValue = {...value};
      }
    },
    /*
      Api lấy max nhân viên lớn nhất và binding vào ô employeeCode
      Author : Trần Nhật Hoàng (2/10/2022)
    */
    async isShowPopUp(newValue) {
      if (newValue) {
        window.addEventListener("keydown", this.handleShortKey);
        //Nếu như đang ở chế độ thêm mới
        if (this.formMode == 1) {
          //call api lấy mã nhân viên mới
          this.employees.EmployeeCode = await this.getNewEmployeeCode();
          //focus vào mã nhân viên
          this.$refs.EmployeeCodeRef.$el.children[0].focus();
        }
      } else {
        window.removeEventListener("keydown", this.handleMouseDown);
      }
    },
  },
  data() {
    return {
      contentTooltip: "",
      toolTipPositionX: 0,
      toolTipPositionY: 0,
      isShowTooltip: false,
      //Biễn hiên thị diaglog
      isShowDialogDetails: false,
      isShowDialogConfirm: false,
      //Biến hiên thị dialog queston
      isShowDialogQuestions: false,
      // textContentQuestion:"Dữ liệu đã bị thay đổi.Bạn có muốn cất không?" ,
      //Biến  lưu trữ các trường trong employees
      employees: {
        EmployeeCode: null,
        EmployeeName: null,
        DepartmentName: null,
        DepartmentId: null,
        PositionName: null,
        DateOfBirth: null,
        IdentityNumber: null,
        IdentityDate: null,
        IdentityPlace: null,
        AddressEmployee: null,
        PhoneNumber: null,
        TelephoneNumber: null,
        emailEmployee: null,
        BankAccountNumber: null,
        BankAccountName: null,
        BankAccountBranch: null,
        Gender: null,
      },
      //Biễn lưu trữ text trong dialog
      popUpMessage: "",
      //mảng luư trữ validate dữ liệu
      validateObj: [],
      diaglogMessage: "",
      btnMode: null,
      employeeGuId: null,
      //biến lữu object employee khi chưa có sự thay đổi
      employeeOldValue: null,
      //biến lữu object employee khi  có sự thay đổi
      employeeNewValue: null,
      //biến xác nhân call api có thành công hay không
      isCallApiSucess : false,
      //Biến lưu object resources
      resource : null,
      //Biến lưu object enum
      enum: null
    };
  },
  computed: {
    /*
    Hàm xử lý trạng thái lỗi của input
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    isErr() {
      let me = this;
      let validateObj = me.validateObj;
      return (key) => {
        return validateObj.find((item) => item.key == key);
      };
    },
  },

  components: {
    TheBaseButton,
    TheBaseInput,
    TheBaseCheckBox,
    TheDialog,
    Combobox,
    dialogNotify,
    dialogQuestions,
    BaseRadio,
    BaseTooltip
  },
  created()
  {
    //object lưu trữ file resource
    this.resource = resource
    //object lưu trữ file enum
    this.enum = enums

  },
  methods: {
      /*
    Hàm xử lý tooltip khi hover vao element 
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleHoverElement(e) {
      this.isShowTooltip = true;
      this.contentTooltip = e.path[0].innerText;
      this.toolTipPositionX = e.clientX;
      this.toolTipPositionY = e.clientY;
    },
    handleCancelToolTip() {
      this.isShowTooltip = false;
    },
    /*
    Hàm xử lý phím tắt 
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleShortKey(e) {
      let me = this;
      if (e.ctrlKey) {
        switch (e.keyCode) {
          case me.enum.MiSaEnum.keyCode.F8 :{
            me.handleStore();
            break
          }
          case me.enum.MiSaEnum.keyCode.s:
            e.preventDefault();
            if (e.shiftKey) {
              //Thực hiện cất và thêm dữ liệu
              me.handleStoreAndAdd();
            } else {
              //Thực hiện cất dữ liệu
              me.handleStore();
            }
            break;
          case me.enum.MiSaEnum.keyCode.F9:
            e.preventDefault();
            me.handleCancelForm();
            break;

          default:
            break;
        }
      } else {
        switch (e.keyCode) {
          case me.enum.MiSaEnum.keyCode.esc:
            e.preventDefault();
            //Thực hiên hành động nút X
            me.removeFormAdd();
            break;
        }
      }
    },

    /*
    Hàm xử lý radio giới tính
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    itemGenderSelected(itemGender) {
      this.employees.Gender = itemGender;
      console.log(this.employees.Gender);
    },
    /*
    Hàm kiểm tra trạng thái validate của ô input
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    onChangeInputValue(value, field) {
      let me = this;
      me.validateObj = me.validateObj.filter((item) => item.key != field);
    },
    /*
    Hàm lưu thông tin nhân viên thêm mới thành công
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleAfterSucess(employee) {
      this.$emit("aftetInsertSucess", employee);
    },
     /*
    Hàm lưu thông tin nhân viên thêm sửa thành công
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleAfterEdit()
    {
      this.$emit("afterEditSucess")
    },
     /*
    Hàm clear giá trị object thành object rỗng
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleClearValue()
    {
      this.employees = {};
      this.validateObj = [];
    },
    /*
      Api thêm mới nhân viên
      Author : Trần Nhật Hoàng (2/10/2022)
    */
   
    async postApiEmployee() {
      try {
        let me = this;
        await axios
          .post("https://localhost:44358/api/v1/Employees", me.employees)
          .then(function () {
            //Khi button ở trạng thái cất
              me.isCallApiSucess = true          
              me.handleAfterSucess(me.employees);
          })
          .catch(function (res) {
            me.isCallApiSucess = false
            //thực hiện check mã nhân viên bị trùng
           if(res.response.status == me.enum.MiSaEnum.errorCode.dublicateEmployee)
            {
              const field = res.response.data.ex.errlst[0].field;
              const mess = res.response.data.ex.errlst[0].mess;
              me.validateObj.unshift({
                text: mess,
                key: field,
              });
              me.diaglogMessage = me.validateObj[0].text;
              me.isShowDialogConfirm = true;
            }
          });
      } catch (error) {
        console.log(error);
      }
    },

    /*
      Api thực hiện sửa nhân viên
      Author : Trần Nhật Hoàng (2/10/2022)
    */
    async putApiEmploye(EmployeeId) {
      try {
        let me = this;
        //format date lại thành kiểu null
        if (!me.employees.DateOfBirth) {
          me.employees.DateOfBirth = null;
        }
        if (!me.employees.IdentityDate) {
          me.employees.IdentityDate = null;
        }
        //Api sửa nhân viên
        await axios
          .put(
            `https://localhost:44358/api/v1/Employees/${EmployeeId}`,
            me.employees
          )
          .then(function () {
            //button ở trạng thái cất
              me.isCallApiSucess = true
              me.handleAfterEdit();
          })
          .catch(function (res) {
            console.log(res)
            me.isCallApiSucess = false
            //check mã trùng nhân viên
            if(res.response.status == me.enum.MiSaEnum.errorCode.dublicateEmployee )
            {
              const field = res.response.data.ex.errlst[0].field;
              const mess = res.response.data.ex.errlst[0].mess;
              me.validateObj.unshift({
                text: mess,
                key: field,
              });
              me.diaglogMessage = me.validateObj[0].text;
              me.isShowDialogConfirm = true;
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    /*
    Hàm xử lý cất nhân viên
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async handleStore() {
      let me = this;
      //Xử lý validate dữ liệu nhập từ ô input
      if (me.validateValue()) {
        if (me.formMode == 1) {
          //Nếu cât ở trạng thái thêm nhân viên
          await me.postApiEmployee();
          //call api thành công
          if(me.isCallApiSucess)
          {
            //đóng Pop up
            me.closePopUp();
          }
        } else if (me.formMode == 2) {
          //Nếu cất ở trạng thái sửa nhân viên
        await me.putApiEmploye(me.employeeGuId);
          if(me.isCallApiSucess)
          {
            me.closePopUp();
          }

        }
      } else {
       me.handleShowErrorValidate()
      }
    },
    /*
    Hàm xử lý cất và thêm nhân viên
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async handleStoreAndAdd() {
      let me = this;
      me.btnMode = 2;
      //xử lý validate nhân viên
      if (me.validateValue()) {
        //Cất và thêm ở trang thái thêm nhân viên
        if (me.formMode == 1) {
         await me.postApiEmployee();
         if(me.isCallApiSucess)
         {
            me.handleClearValue()
            me.employees.EmployeeCode = await this.getNewEmployeeCode();
         }
        } else if (me.formMode == 2) {
          //Cất và thêm ở trạng thái sửa nhân viên
         await me.putApiEmploye(me.employeeGuId);
          if(me.isCallApiSucess)
          {
              me.handleClearValue()
              me.employees.EmployeeCode = await this.getNewEmployeeCode();
          }
        }
      } else {
        me.handleShowErrorValidate()
      }
    },
    /*
    Hàm lưu dữ liệu vả đóng PopUpp
    Author : Trần Nhật Hoàng (2/10/2022)
    */
  async  saveAndclosePopUp() {
      let me = this;
      if (me.validateValue()) {
        if (me.formMode == 1) {
          //trạng thái thêm nhân viên
        await  me.postApiEmployee();
          me.canCelDialogQuestion();
          //api ở trạng thái call thành công
          if(me.isCallApiSucess)
          {
            me.$emit("isRemoveForm", false);
            me.handleClearValue()
          }
        } else {
          //trạng thái sửa nhân viên
         await me.putApiEmploye(me.employeeGuId);
          me.canCelDialogQuestion();
          if(me.isCallApiSucess)
          {
            me.$emit("isRemoveForm", false);
            me.handleClearValue()
          }
        }
       
      } else {
        //trạng thái validate không thành công
        me.canCelDialogQuestion();
        me.handleShowErrorValidate()
      }
    },
     /*
    Hàm show thông tin bị lỗi nhập từ ô input
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleShowErrorValidate()
    {
        this.validateObj = [...this.validateObj];
        this.popUpMessage = this.validateObj[0].text;
        this.isShowDialogDetails = true;
    },
    /*
    Hủy dialog question
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    canCelDialogQuestion() {
      this.isShowDialogQuestions = false;
    },
    /*
    Hủy dialog và đóng Pop UpUp
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    closePopUp() {
      this.handleClearValue()
      this.canCelDialogQuestion();
      this.$emit("isRemoveForm", false);
    },
    /*
    Hàm xử lý đóng form dữ liệu
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    removeFormAdd() {
      this.employeeNewValue = this.employees;
      //kiểm tra 2 object old và new value xem có thay đổi gì không
      if (!this.checkComparisonEmployee()) {
        //hiển thị dialog question
        this.isShowDialogQuestions = true;
        if (this.isShowDialogQuestions) {
          //đónh dialog question
          this.canCelDialogQuestion;
          //đóng pop up
          this.closePopUp;
          //thực hiện cất dữ liệu
          this.saveAndclosePopUp;
        }
      } else {
        //đóng pop up
        this.closePopUp();
      }
    },
    handleCancelForm() {
      this.closePopUp();
    },
    /*
    Hàm xử lý comnbobox
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    getDepartmentId(value, text) {
      this.employees.DepartmentId = value;
      this.employees.DepartmentName = text;
    },
    /*
    Hàm xử lý validate dữ liệu từ ô input
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    validateValue() {
      //Biên xử lý dữ liệu khi nhập vào ô input
      let employeeCode = this.employees.EmployeeCode;
      let employeeName = this.employees.EmployeeName;
      let EmployeeDepartmentName = this.employees.DepartmentName;
      let employeeEmail = this.employees.emailEmployee;
      let employeeDateOfBirth = this.employees.DateOfBirth;
      let identityDate = this.employees.IdentityDate;
      let isValidate = true;

      this.validateObj = [];
      //Kiểm tra mã nhân viên
      if (!employeeCode) {
        //Kiêm tra mã nhân viên không được để trống
        this.validateObj.push({
          text: this.resource.MiSaResource.ErrorValidate.employeeCodeNotEmpty.VI,
          key: "EmployeeCode",
        });
        isValidate = false;
      } else if (employeeCode.length > 20) {
        this.validateObj.push({
          text: this.resource.MiSaResource.ErrorValidate.employeeCodeLength.VI,
          key: "EmployeeCode",
        });
        isValidate = false;
      } else {
        //Kiêm tra định dạng mã nhân viên không được để trống
        const regex = /^((\bNV))\d[0-9]+$/;
        if (!regex.test(employeeCode)) {
          this.validateObj.push({
            text: this.resource.MiSaResource.ErrorValidate.employeeCodeInvalid.VI,
            key: "EmployeeCode",
          });
          isValidate = false;
        }
      }
      //Nếu mã nhân viên hơp lệ bắt đầu kiểm tra tên nhân viên
      // Kiểm tra tên nhân viên
      if (!employeeName) {
        this.validateObj.push({
          text: this.resource.MiSaResource.ErrorValidate.employeeNameNotEmpty.VI,
          key: "EmployeeName",
        });
        isValidate = false;
      } else {
        const nameRegex = /[0-9.-]/;
        if (nameRegex.test(employeeName)) {
          this.validateObj.push({
            text: this.resource.MiSaResource.ErrorValidate.employeeNameInvalid.VI,
            key: "EmployeeName",
          });
          isValidate = false;
        }
      }

      //Kiểm tra tên phòng ban
      if (!EmployeeDepartmentName) {
        this.validateObj.push({
          text: this.resource.MiSaResource.ErrorValidate.employeeDepartmentName.VI,
          key: "EmployeeDepartment",
        });
        isValidate = false;
        // this.diaglogError(true);
      }

      //Kiêm tra ngày sinh không được lớn hơn ngày hiện tại
      if (employeeDateOfBirth) {
        var dateOfBirth = new Date(employeeDateOfBirth);
        if (dateOfBirth > new Date()) {
          this.validateObj.push({
            text: this.resource.MiSaResource.ErrorValidate.employeeDateOfBirth.VI,
            key: "EmployeeDateOfBirth",
          });
          isValidate = false;
        }
      }
      //Kiêm tra ngày cấp không được lớn hơn ngày hiện tại
      if (identityDate) {
        var identityDateEmployee = new Date(identityDate);
        if (identityDateEmployee > new Date()) {
          this.validateObj.push({
            text: this.resource.MiSaResource.ErrorValidate.employeeIdentityDate.VI,
            key: "IdentityDate",
          });
          isValidate = false;
        }
      }

      //Kiêm tra định dạng email
      if (employeeEmail) {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        if (!emailRegex.test(employeeEmail)) {
          this.validateObj.push({
            text: this.resource.MiSaResource.ErrorValidate.employeeEmail.VI,
            key: "EmployeeEmail",
          });
          isValidate = false;
        }
      }
      return isValidate;
    },
    /*
    Xủ lý Api lấy ra mã nhân viên lớn nhất 
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async getNewEmployeeCode() {
      let respon = await axios.get(
        "https://localhost:44358/api/v1/Employees/newcode"
      );
      return respon.data;
    },
    /*
    Hàm xử lý focus vào ô input bị lỗi
    Author : Trần Nhật Hoàng (2/10/2022)
    */

    /*
    Hàm xử lý các dialog thông báo
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    diaglogError(value) {
      let me = this;
      this.isShowDialogDetails = value;
      this.allowFocus = true;
      me.$refs[me.validateObj[0].key + "Ref"].$el.children[0].focus();
    },
    diaglogConfirm(value) {
      let me = this;
      me.isShowDialogConfirm = value;
      me.allowFocus = true;
      me.$refs[me.validateObj[0].key + "Ref"].$el.children[0].focus();
    },
    /*
    Hàm xử lý ngày tháng nhân viên
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    formatDate(inputDate) {
      if (inputDate) {
        let date = new Date(inputDate);
        let newdate = date.getDate();
        newdate = newdate < 10 ? `0${newdate}` : newdate;
        let month = date.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        let year = date.getFullYear();
        return `${year}-${month}-${newdate}`;
      } else {
        return "";
      }
    },
    /*
    Hàm so sánh trang thái thay đổi của Pop up khi click vào nút X
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    checkComparisonEmployee() {
      let isComparation = false;
      const me = this;
      if (
        JSON.stringify(this.employeeOldValue) ===
        JSON.stringify(me.employeeNewValue)
      ) {
        isComparation = true;
      } else isComparation = false;

      return isComparation;
    },
  },
};
</script>
<style scoped>
@import url(../../css/main.css);

label {
  margin-bottom: 4px;
}

.a-padd-r-2px {
  padding-right: 2px;
}

.m-textInputColum {
  margin-bottom: 4px;
}

.m-textInputColum span {
  color: red;
  margin-left: 2px;
}
</style>
