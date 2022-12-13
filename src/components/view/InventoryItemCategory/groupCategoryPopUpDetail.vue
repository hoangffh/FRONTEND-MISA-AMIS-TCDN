<template>
  <div class="overlay" v-if="isShowPopUp">
    <div class="overlay-body warehouse_popup">
      <div class="overlay-body-title">
        <div class="overlay-body-title-left">
          <span class="title">Thêm nhóm vật tư hàng hóa , dịch vụ</span>
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
              ref="GroupCategoryCodeRef"
              type="text"
              placeholder=""
              v-model="groupCategoryList.GroupCategoryCode"
              :isErr="isErr('GroupCategoryCode')"
              field="GroupCategoryCode"
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
              height="32px"
              ref="GroupCategoryNameRef"
              type="text"
              placeholder=""
              v-model="groupCategoryList.GroupCategoryName"
              :isErr="isErr('GroupCategoryName')"
              field="GroupCategoryName"
              @onChangeValue="onChangeInputValue"
              :tabIndex="2"
            />
          </div>
        </div>
        <div class="popup-content-head warehouse_popup_content a-row">
          <div class="popup-content-middle-listItem-item a-col-12">
            <div class="m-textInputColum">
              <label>Thuộc</label>
            </div>
            <BaseComboboxTB
                  :data="groupCategory"
                  :infor="groupCategoryInfor"
                  fieldValue="GroupCategoryId"
                  fieldDisplay="GroupCategoryName"
                  v-model="groupCategoryList.ParentId"
                  :isDisable="isDisable"
                  minHeight="32px"
                  width="100%"
                  :notAllowCreate="true"
                ></BaseComboboxTB>
          </div>
        </div>
        <div
          class="overlay-body-informationEmployee-bottom-footer popup-content-footer"
        >
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
import BaseComboboxTB from "../../base/BaseComboboxTB.vue";
import Resource from "../../../js/resources"
// import BaseLoading from "../../view/loading.vue"
import axios from "axios";
export default {
  name: "m-popup",
  components: {
    BaseButton,
    BaseInput,
    DialogError,
    DialogQuestion,
    DialogNotify,
    BaseComboboxTB,
  },
  props: ["isShowPopUp", "groupCategorySelected", "formMode"],
  watch: {
   async isShowPopUp(newValue) {
      if (newValue) {
        if (this.formMode == 1) {
          this.$nextTick(() => {
            this.$refs.GroupCategoryCodeRef.$el.children[0].focus();
          });
          this.groupCategoryOldValue = {...this.groupCategoryList}
        }
      }
    },
     /*
    lấy dữ liệu api khi click vào một hàng trong table và render lên Pop Up
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    groupCategorySelected: function (value) {
      if (value) { 
        this.groupCategoryList.ParentId = null
        this.groupCategoryList = value;
        this.groupCategoryGuId = value.GroupCategoryId;
        //khi gán 1 object hay 1 arr vào 1 biến => thì bản chất là 2 biến này cùng giữ 1 địa chỉ của object => thay đổi 1 thì 2 cái thay đổi
        //[...] => ... nghĩa là rải các phần tử bên trong ra,
        //Ví dụ [1, 2, 3, 4] thì ... sẽ tương đương 1, 2, 3, 4 => kết hợp [] sẽ thành [1, 2, 3, 4]
        //nó khác với gán thẳng giá trị là nó sẽ tạo ra 1 obj mới rồi mới gián => thay đổi 1 cái thì cái kia không thay đổi
        this.groupCategoryOldValue = {...value};
      }
    },
  },
  data() {
    return {
      groupCategoryList: {
  
      },
      groupCategory:[],
      groupCategoryInfor:[
      {
          display: Resource.MiSaResource.GroupCategory.GroupCategoryCodeTable,
          name: "GroupCategoryCode",
          isInputDisplay: false,
          width: "220px",
        },
        {
          display: "Tên nhóm vật tư hàng hóa , dịch vụ",
          name: "GroupCategoryName",
          isInputDisplay: true,
          width: "220px",
        },
      ],
      validateObj: [],
      isShowDialogErr:false,
      isShowDialogConfirm:false,
      isShowDialogQuestions:false,
      diaglogErrorMessage:"",
      diaglogNotify:"",
      groupCategoryNewValue : {} ,
      groupCategoryOldValue : {},
      isCallApiSucess : false,
      groupCategoryGuId:null

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
    handleAfterEdit()
    {
      this.$emit("afterEditSucess");
    },
    async postApiGroupCategory() {
      try {
        let me = this;
        await axios
          .post("https://localhost:44358/api/v1/GroupCategory", me.groupCategoryList)
          .then(function () {
            //Khi button ở trạng thái cất
            me.isCallApiSucess = true;
            me.handleAfterEdit();
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
      this.groupCategoryNewValue = this.groupCategoryList;
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
         await me.postApiGroupCategory();
         if(me.isCallApiSucess)
         {
            me.handleClearValue()
         }
        } else if (me.formMode == 2) {
          //Cất và thêm ở trạng thái sửa nhân viên
         await me.putApiGroupCategory(me.groupCategoryGuId);
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
        await  me.postApiGroupCategory();
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
         await me.putApiGroupCategory(me.groupCategoryGuId);
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
          await   me.postApiGroupCategory();
          if(me.isCallApiSucess)
          {
            //đóng Pop up
            me.closePopUp();
          }
        } else if (me.formMode == 2) {
          //Nếu cất ở trạng thái sửa nhân viên
        await me.putApiGroupCategory(me.groupCategoryGuId);
          if(me.isCallApiSucess)
          {
            me.closePopUp();
          }

        }
      } else {
        me.handleShowErrorValidate();
      }
    },
    async getGroupCategory() {
      //Gọi api thực hiện lấy dữ liệu
      const _this = this;
      try {
        await axios
          .get(
            "https://localhost:44358/api/v1/GroupCategory"
          )
          .then(function (res) {
            _this.groupCategory= res.data
          })
          .catch(function () {
            alert("Có lỗi, vui lòng liên hệ MISA để được trợ giúp !")
          });
      } catch (error) {
        console.log(error);
      }
    },
    /*
      Api thực hiện sửa nhân viên
      Author : Trần Nhật Hoàng (2/10/2022)
    */
    async putApiGroupCategory(id) {
      try {
        const me = this
        //Api sửa nhân viên
        await axios
          .put(
            `https://localhost:44358/api/v1/GroupCategory/${id}`,
            me.groupCategoryList
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
      this.groupCategoryList = {};
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
      let GroupCategoryCode = this.groupCategoryList.GroupCategoryCode;
      let GroupCategoryname = this.groupCategoryList.GroupCategoryName;
      let isValidate = true;
      // let warehouseDesc = this.warehouse.warehouseDesc;

      this.validateObj = [];
      //Kiểm tra mã nhân viên
      if (!GroupCategoryCode) {
        //Kiêm tra mã nhân viên không được để trống
        this.validateObj.push({
          text: "Mã nhóm vật tư , hàng hóa không được để trống",
          key: "GroupCategoryCode",
        });
        isValidate = false;
      }

      //Nếu mã nhân viên hơp lệ bắt đầu kiểm tra tên nhân viên
      // Kiểm tra tên nhân viên
      if (!GroupCategoryname) {
        this.validateObj.push({
          text: "Tên nhóm vật tư , hàng hóa không được để trống",
          key: "GroupCategoryName",
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
        JSON.stringify(me.groupCategoryOldValue) ===
        JSON.stringify(me.groupCategoryNewValue)
      ) {
        isComparation = true;
      } else isComparation = false;

      return isComparation;
    },
  },
  created() {
    //Load dữ liệu từ database vào table
    this.getGroupCategory();
  },
};
</script>
<style scoped>
.overlay {
  align-items: center;
  justify-content: center;
}
.warehouse_popup {
  width: 600px;
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
