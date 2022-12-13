<template>
  <div class="overlay" v-if="isShowPopUp">
    <div class="overlay-body warehouse_popup">
      <div class="overlay-body-title">
        <div class="overlay-body-title-left">
          <span class="title">Thêm kho</span>
        </div>
        <div class="overlay-body-title-right">
          <div class="overlay-body-title-helpIcon"></div>
          <div class="overlay-body-title-exitIcon" @click="removeFormAdd"></div>
        </div>
      </div>
      <div class="popup-content">
        <div class="popup-content-head warehouse_popup_content a-row">
          <div class="popup-content-head-left a-margine-r-12px a-col-4">
            <div class="m-textInputColum">
              <label>Mã</label>
              <span>*</span>
            </div>
            <BaseInput
              height="32px"
              ref="WarehouseCodeRef"
              type="text"
              placeholder=""
              v-model="warehouseList.WarehouseCode"
              :isErr="isErr('WarehouseCode')"
              field="WarehouseCode"
              @onChangeValue="onChangeInputValue"
              :tabIndex="1"
            />
          </div>
          <div class="popup-content-head-left a-col-8">
            <div class="m-textInputColum">
              <label>Tên</label>
              <span>*</span>
            </div>
            <BaseInput
              ref="WarehouseNameRef"
              height="32px"
              type="text"
              placeholder=""
              v-model="warehouseList.WarehouseName"
              :isErr="isErr('WarehouseName')"
              field="WarehouseName"
              @onChangeValue="onChangeInputValue"
              :tabIndex="2"
            />
          </div>
        </div>
        <div class="popup-content-head warehouse_popup_content a-row">
          <div class="popup-content-middle-listItem-item a-col-12">
            <div class="m-textInputColum">
              <label>Địa chỉ</label>
            </div>
            <BaseInput
              height="55px"
              type="text"
              placeholder=""
              v-model="warehouseList.WarehousePlace"
              :tabIndex="3"
            />
          </div>
        </div>
        <div class="overlay-body-informationEmployee-bottom-footer popup-content-footer">
          <div class="overlay-body-informationEmployee-bottom-footer-left">
            <BaseButton
              @click="handleCancelForm"
              hasBorderButton
              hasHoverAndActivePrimarygreen
              textContent="Hủy"
              :tabIndex="17"
              @handleKeyDown="handleCancelForm"
            >
            </BaseButton>
          </div>
          <div class="overlay-body-informationEmployee-bottom-footer-right">
            <BaseButton
              hasBorderButton
              hasHoverAndActivePrimarygreen
              textContent="Cất"
              hasMarginItem
              @click="handleStore"
              :tabIndex="18"
              @handleKeyDown="handleStore"
            
            ></BaseButton>
            <BaseButton
             
              @click="handleStoreAndAdd"
              hasHoverAndActivePrimarygreen
              textContent="Cất và Thêm"
              :tabIndex="19"
              @handleKeyDown="handleStoreAndAdd"
            >
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DialogError
    :isShowDialogErr="isShowDialogErr"
    @RemoveDialogErr="diaglogError"
    :textContent="diaglogErrorMessage"
  >
  </DialogError>
  <DialogNotify
    :isShowDialogConfirm="isShowDialogConfirm"
    @removeDiaglogConfirm="diaglogConfirm"
    :messageDialogNotifi="diaglogNotify"
  ></DialogNotify>
  <DialogQuestion
    :isShowDialogQuestions="isShowDialogQuestions"
    @canCelDialogQuestion="canCelDialogQuestion"
    textContentQuestion="Dữ liệu đã bị thay đổi. Bạn có muốn cất không?"
    @closePopUp="closePopUp"
    @SaveAndClosePopUp="saveAndclosePopUp"
  ></DialogQuestion>
</template>
<script>
import BaseButton from "../../base/BaseButton.vue";
import BaseInput from "../../base/BaseInput.vue";
import DialogError from "../../base/dialogError.vue";
import DialogQuestion from "../../view/dialogQuestion.vue";
import DialogNotify from "../../view/dialogNotification.vue";
// import BaseLoading from "../../view/loading.vue"
import Resources from "../../../js/resources"
import axios from "axios";
export default {
  name: "m-popup",
  components: {
    BaseButton,
    BaseInput,
    DialogError,
    DialogQuestion,
    DialogNotify,
    // BaseLoading
  },
  props: ["isShowPopUp", "warehouseSelected", "formMode"],
  watch: {
   async isShowPopUp(newValue) {
      if (newValue) {
        if (this.formMode == 1) {
          this.$nextTick(() => {
            this.$refs.WarehouseCodeRef.$el.children[0].focus();
          });
          this.warehouseOldValue = {...this.warehouseList}
        }
      }
    },
     /*
    lấy dữ liệu api khi click vào một hàng trong table và render lên Pop Up
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    warehouseSelected: function (value) {
      if (value) { 
       
       this.warehouseList = value;
        this.warehouseGuId = value.WarehouseId;
        //khi gán 1 object hay 1 arr vào 1 biến => thì bản chất là 2 biến này cùng giữ 1 địa chỉ của object => thay đổi 1 thì 2 cái thay đổi
        //[...] => ... nghĩa là rải các phần tử bên trong ra,
        //Ví dụ [1, 2, 3, 4] thì ... sẽ tương đương 1, 2, 3, 4 => kết hợp [] sẽ thành [1, 2, 3, 4]
        //nó khác với gán thẳng giá trị là nó sẽ tạo ra 1 obj mới rồi mới gián => thay đổi 1 cái thì cái kia không thay đổi
        this.warehouseOldValue = {...value};
      }
    },
  },
  data() {
    return {
      warehouseList: {
        WarehouseCode : null,
        WarehouseName : null,
        WarehousePlace : null
      },
      validateObj: [],
      isShowDialogErr:false,
      isShowDialogConfirm:false,
      isShowDialogQuestions:false,
      diaglogErrorMessage:"",
      diaglogNotify:"",
      warehouseNewValue : {} ,
      warehouseOldValue : {},
      isCallApiSucess : false,
      warehouseGuId:null

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
 
  methods: {
    handleCancelForm() {
      this.closePopUp();
    },
    /*
      Api thêm mới nhân viên
      Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleAfterSucess(warehouse)
    {
      this.$emit("aftetInsertSucess", warehouse);
    },
    handleAfterEdit()
    {
      this.$emit("afterEditSucess");
    },
    async postApiWarehouse() {
      try {
        let me = this;
        await axios
          .post("https://localhost:44358/api/v1/Warehouse", me.warehouseList)
          .then(function () {
            //Khi button ở trạng thái cất
            me.isCallApiSucess = true;
            me.handleAfterSucess(me.warehouseList);
          })
          .catch(function (res) {
            me.isCallApiSucess = false;
            //thực hiện check mã nhân viên bị trùng
            if (res.response.status == 400) {
              const field = res.response.data.ex.errlst[0].field;
              const mess = res.response.data.ex.errlst[0].mess;
              me.validateObj.unshift({
                text: mess,
                key: field,
              });
              me.diaglogNotify = me.validateObj[0].text;
              me.isShowDialogConfirm = true;
            }
          });
      } catch (error) {
        console.log(error);
      }
    },

    onChangeInputValue(value, field) {
      let me = this;
      me.validateObj = me.validateObj.filter((item) => item.key != field);
    },
    removeFormAdd() {
      this.warehouseNewValue = this.warehouseList;
      //kiểm tra 2 object old và new value xem có thay đổi gì không
      if (!this.checkComparisonWarehouse()) {
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
    /*
    Hàm xử lý cất và thêm nhân viên
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async handleStoreAndAdd() {
      let me = this;
      //xử lý validate nhân viên
      if (me.validateValue()) {
        //Cất và thêm ở trang thái thêm nhân viên
        if (me.formMode == 1) {
         await me.postApiWarehouse();
         if(me.isCallApiSucess)
         {
            me.handleClearValue()
         }
        } else if (me.formMode == 2) {
          //Cất và thêm ở trạng thái sửa nhân viên
         await me.putApiWarehouse(me.warehouseGuId);
          if(me.isCallApiSucess)
          {
              me.handleClearValue()
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
        await  me.postApiWarehouse();
          me.canCelDialogQuestion();
          //api ở trạng thái call thành công
          if(me.isCallApiSucess)
          {
            me.$emit("isRemoveForm", false);
            me.handleClearValue()
          }
        } 
        else {
          //trạng thái sửa nhân viên
         await me.putApiWarehouse(me.warehouseGuId);
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
   async handleStore() {
      let me = this;
      //Xử lý validate dữ liệu nhập từ ô input
      if (me.validateValue()) {
        if (me.formMode == 1) {
          await   me.postApiWarehouse();
          if(me.isCallApiSucess)
          {
            //đóng Pop up
            me.closePopUp();
          }
        } else if (me.formMode == 2) {
          //Nếu cất ở trạng thái sửa nhân viên
        await me.putApiWarehouse(me.warehouseGuId);
          if(me.isCallApiSucess)
          {
            me.closePopUp();
          }

        }
      } else {
        me.handleShowErrorValidate();
      }
    },
    /*
      Api thực hiện sửa nhân viên
      Author : Trần Nhật Hoàng (2/10/2022)
    */
    async putApiWarehouse(WarehouseId) {
      try {
        const me = this
        //Api sửa nhân viên
        await axios
          .put(
            `https://localhost:44358/api/v1/Warehouse/${WarehouseId}`,
            me.warehouseList
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
            if(res.response.status == 400)
            {
              const field = res.response.data.ex.errlst[0].field;
              const mess = res.response.data.ex.errlst[0].mess;
              me.validateObj.unshift({
                text: mess,
                key: field,
              });
              me.diaglogNotify = me.validateObj[0].text;
              me.isShowDialogConfirm = true;
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    handleShowErrorValidate() {
      this.validateObj = [...this.validateObj];
      this.diaglogErrorMessage = this.validateObj[0].text
      this.isShowDialogErr = true
    },
     /*
    Hàm clear giá trị object thành object rỗng
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleClearValue()
    {
      this.warehouseList = {};
      this.validateObj = [];
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
    
    validateValue() {
      //Biên xử lý dữ liệu khi nhập vào ô input
      let warehouseCode = this.warehouseList.WarehouseCode;
      let warehouseName = this.warehouseList.WarehouseName;
      let isValidate = true;
      // let warehouseDesc = this.warehouse.warehouseDesc;

      this.validateObj = [];
      //Kiểm tra mã nhân viên
      if (!warehouseCode) {
        //Kiêm tra mã nhân viên không được để trống
        this.validateObj.push({
          text: Resources.MiSaResource.ErrorValidate.warehouseCodeNotEmpty,
          key: "WarehouseCode",
        });
        isValidate = false;
      }

      //Nếu mã nhân viên hơp lệ bắt đầu kiểm tra tên nhân viên
      // Kiểm tra tên nhân viên
      if (!warehouseName) {
        this.validateObj.push({
          text: Resources.MiSaResource.ErrorValidate.warehouseNameNotEmpty,
          key: "WarehouseName",
        });
        isValidate = false;
      }

      return isValidate;
    },
    diaglogError(value) {
      let me = this;
      this.isShowDialogErr = value;
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
    Hàm so sánh trang thái thay đổi của Pop up khi click vào nút X
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    checkComparisonWarehouse() {
      let isComparation = false;
      const me = this;
      if (
        JSON.stringify(me.warehouseOldValue) ===
        JSON.stringify(me.warehouseNewValue)
      ) {
        isComparation = true;
      } else isComparation = false;

      return isComparation;
    },
  },
};
</script>
<style scoped>
.overlay {
  align-items: center;
  justify-content: center;
}
.warehouse_popup {
  width: 500px;
  height: 335px;
  border-radius: 2px;
  transition: all 0.2s;
}
.overlay-body-title {
  align-items: initial;
}
.overlay-body-title-left {
  padding: 20px 32px;
}
.overlay-body-title-left .title {
  font-size: 24px;
  font-weight: 600;
  color: #212121;
}
.overlay-body-title-right {
  padding: 12px;
}
.popup-content {
  display: flex;
  flex-direction: column;
  padding: 0 32px 20px;
}
.warehouse_popup_content {
  border: none;
}
.warehouse_popup_content:nth-last-child(2) {
  padding-bottom: 32px;
  border-bottom: 1px solid #ccc;
}
.popup-content-footer {
  padding-bottom: 0px;
}
</style>
