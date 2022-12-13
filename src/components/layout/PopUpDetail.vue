<template>
  <div class="overlay" v-show="isShowPopUp">
    <div class="overlay-body popUpDetail">
      <div class="popUpDetail-header">
        <div class="overlay-body-title">
          <div class="overlay-body-title-left">
            <span class="title">Thông tin vật tư hàng hóa , dịch vụ</span>
          </div>
          <div class="overlay-body-title-right">
            <div class="overlay-body-title-helpIcon"></div>
            <div
              class="overlay-body-title-exitIcon"
              @click="removeFormAdd"
            ></div>
          </div>
        </div>
        <div class="popup-header">
          <div
            class="popup-header-icon"
            :style="{
              backgroundPositionX: positionX,
              backgroundPositionY: positionY,
            }"
          ></div>
          <div class="popup-header-title">
            <p>{{ textPopUpContent }}</p>
          </div>
          <div class="popup-header-action" @click="handleOpenPopUpContent">
            <p>Thay đổi tính chất</p>
          </div>
        </div>
      </div>
      <div class="popup-content a-padding-16px">
        <div class="popup-content-head a-row">
          <div class="popup-content-head-left a-col-8">
            <div class="popup-content-head-left-item">
              <div class="m-textInputColum">
                <label>Tên</label>
                <span>*</span>
              </div>
              <BaseInput
                height="32px"
                ref="ProductNameRef"
                type="text"
                placeholder=""
                :isErr="isErr('ProductName')"
                v-model="product.ProductName"
                field="ProductName"
                textAlign="right"
                @onChangeValue="onChangeInputValue"
                :tabIndex="1"
              >
              </BaseInput>
            </div>
            <div
              class="popup-content-head-left-list_item a-row a-margine-t-4px"
            >
              <div class="popup-content-head-left-list_item-item a-col-3">
                <div class="m-textInputColum">
                  <label>Mã</label>
                  <span>*</span>
                </div>
                <BaseInput
                  height="32px"
                  ref="ProductCodeRef"
                  type="text"
                  placeholder=""
                  :isErr="isErr('ProductCode')"
                  v-model="product.ProductCode"
                  field="ProductCode"
                  :tabIndex="2"
                  @onChangeValue="onChangeInputValue"
                >
                </BaseInput>
              </div>
              <div
                class="popup-content-head-left-list_item-item a-padding-4px a-col-9"
              >
                <div class="m-textInputColum">
                  <label>Nhóm VTHH</label>
                </div>

                <BaseMultiSelect
                  :data="GroupCategory"
                  :infor="GroupCategoryInfor"
                  fieldValue="GroupCategoryId"
                  fieldDisplay="GroupCategoryName"
                  v-model="product.GroupCategoryListId"
                  minHeight="32"
                  width="100%"
                  :isDisable="isDisable"
                  :tabindex="3"
                  @handleClickAdd="handleClickAddGroupcategory"
                ></BaseMultiSelect>
              </div>
            </div>
            <div
              class="popup-content-head-left-list_item a-row a-margine-t-4px"
            >
              <div class="popup-content-head-left-list_item-item a-col-3">
                <div class="m-textInputColum">
                  <label>Đơn vị tính chính</label>
                </div>
                <BaseComboboxTB
                  ref="ProductUnitIdRef"
                  :data="Unit"
                  :infor="UnitInfor"
                  fieldValue="UnitId"
                  fieldDisplay="UnitName"
                  v-model="product.UnitId"
                  :isDisable="isDisable"
                  minHeight="32px"
                  width="100%"
                  :isErr="isErr('ProductUnitId')"
                  field="ProductUnitId"
                  @onChangeValue="onChangeInputValue"
                  @handleClikAdd="handleClikAddUnit"
                  :tabindex="5"
                ></BaseComboboxTB>
              </div>
              <div
                class="popup-content-head-left-list_item-item a-padding-4px a-col-4"
              >
                <div class="m-textInputColum">
                  <label>Giảm thuế theo NQ43</label>
                </div>
                <BaseCombobox
                  width="100%"
                  height="32px"
                  :data="taxReductionList"
                  fieldDisplay="TaxReduction"
                  fieldValue="TaxReductionId"
                  v-model="product.TaxReduction"
                  :isDisable="isDisable"
                  :tabindex="6"
                ></BaseCombobox>
              </div>
              <div class="change-attribute-search a-col-4">
                <div class="change-attribute-search-icon"></div>
                <div class="change-attribute-search-link">
                  <span>Tra cứu giảm thuế</span>
                </div>
              </div>
            </div>
          </div>
          <div class="popup-content-head-right a-col-4">
            <div class="popup-content-head-right-avatarImage">
              <div class="popup-content-head-right-avatarImage-icon"></div>
            </div>
            <div class="popup-content-head-right-listAction">
              <div class="popup-content-head-right-listAction-edit"></div>
              <div class="popup-content-head-right-listAction-item"></div>
              <div class="popup-content-head-right-listAction-remove"></div>
            </div>
          </div>
        </div>
        <div class="popup-content-middle a-row a-padding-t-8px">
          <div class="popup-content-middle-listItem a-col-12">
            <div class="popup-content-middle-listItem-item a-col-3">
              <div class="m-textInputColum">
                <label>Thời gian bảo hành</label>
              </div>
              <BaseCombobox
                width="100%"
                height="32px"
                :data="insuranceList"
                fieldDisplay="Insurance"
                fieldValue="Insurance"
                v-model="product.Insurance"
                :isDisable="isDisable"
                :tabindex="7"
              ></BaseCombobox>
            </div>
            <div
              class="popup-content-middle-listItem-item a-padding-4px a-col-3"
            >
              <div class="m-textInputColum">
                <label>Số lượng tối thiểu</label>
              </div>
              <BaseInputMoney
                :type="'text'"
                height="32px"
                :isNumber="true"
                v-model.number="product.Amount"
                :tabIndex="8"
              ></BaseInputMoney>
            </div>
            <div
              class="popup-content-middle-listItem-item a-padding-4px a-col-6"
            >
              <div class="m-textInputColum">
                <label>Nguồn gốc</label>
              </div>
              <BaseInput
                height="32px"
                type="text"
                placeholder=""
                v-model="product.Source"
                :tabIndex="9"
                >
              </BaseInput>
            </div>
          </div>
          <div class="popup-content-middle-listItem a-padding-t-8px a-col-12">
            <div class="popup-content-middle-listItem-item a-col-12">
              <div class="m-textInputColum">
                <label>Mô tả</label>
              </div>
              <BaseInput
                height="64px"
                type="text"
                placeholder=""
                v-model="product.Describes"
                :tabIndex="10"
              >
              </BaseInput>
            </div>
          </div>
          <div class="popup-content-middle-listItem a-padding-t-8px a-col-12">
            <div class="popup-content-middle-listItem-item a-col-12">
              <div class="m-textInputColum">
                <label>Diễn giải khi mua</label>
              </div>
              <BaseInput
                height="32px"
                type="text"
                placeholder=""
                v-model="product.ExplainBuy"
                :tabIndex="11"
              >
              </BaseInput>
            </div>
          </div>
          <div class="popup-content-middle-listItem a-padding-t-8px a-col-12">
            <div class="popup-content-middle-listItem-item a-col-12">
              <div class="m-textInputColum">
                <label>Diễn giải khi bán</label>
              </div>
              <BaseInput
                height="32px"
                type="text"
                placeholder=""
                v-model="product.ExplainSell"
                :tabIndex="12"
              >
              </BaseInput>
            </div>
          </div>
        </div>
        <div class="popup-content-bottom a-row a-padding-t-8px">
          <div class="popup-content-bottom-listItem">
            <div class="popup-content-bottom-listItem-item">
              <div
                @click="showImplicitInformation"
                class="popup-content-bottom-listItem-item-label"
                :class="{ Active: isShowListContent }"
              >
                <div class="popup-content-bottom-listItem-item-icon"></div>
                <div class="popup-content-bottom-listItem-item-title">
                  <span>Thông tin ngầm định</span>
                </div>
              </div>
              <div
                v-show="isShowListContent"
                class="popup-content-bottom-listItem-item-listContent"
              >
                <div
                  class="popup-content-bottom-listItem-item-listContent-content a-row"
                >
                  <div
                    class="popup-content-bottom-listItem-item-listContent-content-item a-col-3 a-margine-r-12px"
                  >
                    <div class="m-textInputColum">
                      <label>Kho ngầm định </label>
                    </div>
                    <BaseComboboxTB
                      :data="warehouse"
                      :infor="displayFieldWarehouse"
                      fieldValue="WarehouseId"
                      fieldDisplay="WarehouseCode"
                      v-model="product.WarehouseId"
                      minHeight="32px"
                      width="100%"
                      :dropDownYValue="230"
                      @handleClikAdd="handleClikAddWarehouse"
                      :tabindex="13"
                    ></BaseComboboxTB>
                  </div>
                  <div
                    class="popup-content-bottom-listItem-item-listContent-content-item a-col-3 a-margine-12px"
                  >
                    <div class="m-textInputColum">
                      <label>Tài khoản giảm giá</label>
                    </div>
                    <BaseInput
                      height="32px"
                      type="text"
                      placeholder=""
                      v-model="product.ReduceAccount"
                      :tabIndex="14"
                    >
                    </BaseInput>
                  </div>
                  <div
                    class="popup-content-bottom-listItem-item-listContent-content-item a-col-3 a-margine-12px"
                  >
                    <div class="m-textInputColum">
                      <label>Thuế suất GTGT (%)</label>
                    </div>
                    <BaseInputMoney
                      :type="'text'"
                      height="32px"
                      :isNumber="true"
                      :maxValue="100"
                      v-model.number="product.VatTax"
                      :tabIndex="15"
                    ></BaseInputMoney>
                  </div>
                  <div
                    class="popup-content-bottom-listItem-item-listContent-content-item a-col-3 a-margine-12px"
                  >
                    <div class="m-textInputColum">
                      <label>Đơn mua cố định</label>
                    </div>
                    <BaseInputMoney
                      :type="'text'"
                      height="32px"
                      :isNumber="true"
                      v-model.number="product.FixedPrice"
                      :tabIndex="16"
                    ></BaseInputMoney>
                  </div>
                </div>
                <div
                  class="popup-content-bottom-listItem-item-listContent-content a-padding-t-8px a-row"
                >
                  <div
                    class="popup-content-bottom-listItem-item-listContent-content-item a-col-3 a-margine-r-12px"
                  >
                    <div class="m-textInputColum">
                      <label>Tài khoản kho </label>
                    </div>
                    <BaseInput
                      height="32px"
                      type="text"
                      placeholder=""
                      v-model="product.WarehouseAccount"
                      :tabIndex="17"
                    >
                    </BaseInput>
                  </div>
                  <div
                    class="popup-content-bottom-listItem-item-listContent-content-item a-col-3 a-margine-12px"
                  >
                    <div class="m-textInputColum">
                      <label>Tài khoản trả lại</label>
                    </div>
                    <BaseInput
                      height="32px"
                      type="text"
                      placeholder=""
                      v-model="product.ReturnAccount"
                      :tabIndex="18"
                    >
                    </BaseInput>
                  </div>
                  <div
                    class="popup-content-bottom-listItem-item-listContent-content-item a-col-3 a-margine-12px"
                  >
                    <div class="m-textInputColum">
                      <label>Thuế suất thuế NK (%)</label>
                    </div>
                    <BaseInputMoney
                      :type="'text'"
                      height="32px"
                      :isNumber="true"
                      :maxValue="100"
                      v-model.number="product.ImportTax"
                      :tabIndex="19"
                    ></BaseInputMoney>
                  </div>
                  <div
                    class="popup-content-bottom-listItem-item-listContent-content-item a-col-3 a-margine-12px"
                  >
                    <div class="m-textInputColum">
                      <label>Đơn mua gần nhất</label>
                    </div>
                    <BaseInputMoney
                      :type="'text'"
                      height="32px"
                      :isNumber="true"
                      v-model.number="product.NearestPrice"
                      :tabIndex="20"
                    ></BaseInputMoney>
                  </div>
                </div>
                <div
                  class="popup-content-bottom-listItem-item-listContent-content a-padding-t-8px a-row"
                >
                  <div
                    class="popup-content-bottom-listItem-item-listContent-content-item a-col-3 a-margine-r-12px"
                  >
                    <div class="m-textInputColum">
                      <label>Tài khoản doanh thu </label>
                    </div>
                    <BaseInput
                      height="32px"
                      type="text"
                      placeholder=""
                      v-model="product.RevenueAccount"
                      :tabIndex="21"
                    >
                    </BaseInput>
                  </div>
                  <div
                    class="popup-content-bottom-listItem-item-listContent-content-item a-col-3 a-margine-12px"
                  >
                    <div class="m-textInputColum">
                      <label>Tài khoản chi phí</label>
                    </div>
                    <BaseInput
                      height="32px"
                      type="text"
                      placeholder=""
                      v-model="product.ExpenseAccount"
                      :tabIndex="22"
                    >
                    </BaseInput>
                  </div>
                  <div
                    class="popup-content-bottom-listItem-item-listContent-content-item a-col-3 a-margine-12px"
                  >
                    <div class="m-textInputColum">
                      <label>Thuế suất XK (%)</label>
                    </div>
                    <BaseInputMoney
                      :type="'text'"
                      height="32px"
                      :isNumber="true"
                      :maxValue="100"
                      v-model.number="product.ExportTax"
                      :tabIndex="23"
                    ></BaseInputMoney>
                  </div>
                  <div
                    class="popup-content-bottom-listItem-item-listContent-content-item a-col-3 a-margine-12px"
                  >
                    <div class="m-textInputColum">
                      <label>Đơn giá bán</label>
                    </div>
                    <BaseInputMoney
                      :type="'text'"
                      height="32px"
                      :isNumber="true"
                      v-model.number="product.Price"
                      :tabIndex="24"
                    ></BaseInputMoney>
                  </div>
                </div>
                <div
                  class="popup-content-bottom-listItem-item-listContent-content a-padding-t-8px pop-up-Item-footer"
                >
                  <div
                    class="popup-content-bottom-listItem-item-listContent-content-item a-col-3-width a-margine-r-12px"
                  >
                    <div class="m-textInputColum">
                      <label>Tài khoản chiết khấu </label>
                    </div>
                    <BaseInput
                      height="32px"
                      placeholder=""
                      v-model="product.DiscountAccount"
                      :tabIndex="25"
                    >
                    </BaseInput>
                  </div>
                  <div
                    class="popup-content-bottom-listItem-item-listContent-content-item a-col-3-width a-margine-12px"
                  >
                    <div class="m-textInputColum">
                      <label>Tỉ lệ CKMH (%)</label>
                    </div>
                    <BaseInputMoney
                      :type="'text'"
                      height="32px"
                      :isNumber="true"
                      :maxValue="100"
                      v-model.number="product.DiscountRate"
                      :tabIndex="26"
                    ></BaseInputMoney>
                  </div>
                  <div
                    class="popup-content-bottom-listItem-item-listContent-content-item a-col-3-width a-margine-12px"
                  >
                    <div class="m-textInputColum max-width">
                      <label>Nhóm HHDV chịu thuế TTĐB</label>
                    </div>
                    <BaseInput
                      height="32px"
                      placeholder=""
                      v-model="product.SupplyExciseTax"
                      :tabIndex="27"
                    >
                    </BaseInput>
                  </div>
                </div>
              </div>
            </div>
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
              :tabIndex="28"
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
              :tabIndex="29"
              @handleKeyDown="handleStore"
            ></BaseButton>
            <BaseButton
              @click="handleStoreAndAdd"
              hasHoverAndActivePrimarygreen
              textContent="Cất và Thêm"
              :tabIndex="30"
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
  <DialogNotification
    :isShowDialogConfirm="isShowDialogConfirm"
    @removeDiaglogConfirm="diaglogConfirm"
    :messageDialogNotifi="diaglogNotify"
  ></DialogNotification>
  <DialogQuestion
    :isShowDialogQuestions="isShowDialogQuestions"
    @canCelDialogQuestion="canCelDialogQuestion"
    textContentQuestion="Dữ liệu đã bị thay đổi. Bạn có muốn cất không?"
    @closePopUp="closePopUp"
    @SaveAndClosePopUp="saveAndclosePopUp"
  ></DialogQuestion>
  <GroupCategoryPopUpDetail
    :isShowPopUp="isShowPopUpGroupCategory"
    :formMode="formModeGroupCategory"
    @isRemoveForm="handleCloseGroupcategory"
    @afterEditSucess="afterInsertGroupcategorySucess"
  ></GroupCategoryPopUpDetail>
  <UnitPopUpDetail
    :isShowPopUp="isShowPopUpUnit"
    :formMode="formModeUnit"
    @isRemoveForm="handleCloseUnit"
    @afterEditSucess="afterInsertUnitSucess"
  ></UnitPopUpDetail>
  <WareHousePopUpDetail
    :isShowPopUp="isShowPopUpWarehouse"
    :formMode="formModeWarehouse"
    @isRemoveForm="handleCloseWarehouse"
    @afterEditSucess="afterInsertWarehouseSucess"
  ></WareHousePopUpDetail>
</template>
<script>
import BaseInput from "../base/BaseInput.vue";
import BaseButton from "../base/BaseButton.vue";
import BaseComboboxTB from "../base/BaseComboboxTB.vue";
import BaseMultiSelect from "../base/BaseMultiSelectTB.vue";
import BaseCombobox from "../base/BaseCombobox.vue";
import DialogError from "../base/dialogError.vue";
import DialogNotification from "../view/dialogNotification.vue";
import DialogQuestion from "../view/dialogQuestion.vue";
import Resources from "../../js/resources";
import Enum from "../../js/enum";
import BaseInputMoney from "../base/BaseInputMoney.vue";
import GroupCategoryPopUpDetail from "../view/InventoryItemCategory/groupCategoryPopUpDetail.vue";
import UnitPopUpDetail from "../view/unit/unitPopUpDetail.vue";
import WareHousePopUpDetail from "../view/wareHouse/wareHousePopUpDetail.vue";
import axios from "axios";
export default {
  name: "m-popup",
  components: {
    BaseInput,
    BaseButton,
    BaseComboboxTB,
    BaseMultiSelect,
    BaseCombobox,
    DialogError,
    DialogNotification,
    DialogQuestion,
    BaseInputMoney,
    GroupCategoryPopUpDetail,
    UnitPopUpDetail,
    WareHousePopUpDetail,
  },
  props: [
    "formDetailType",
    "isShowPopUp",
    "textPopUpContent",
    "positionX",
    "positionY",
    "formMode",
    "productSelected",
  ],
  data() {
    return {
      //biến hiển thị form chi tiết kho
      isShowPopUpWarehouse: false,
      //biến hiển thị trạng thái kho : thêm , sửa
      formModeWarehouse: null,
      //biến hiển thị form chi tiết đơn vị tính
      isShowPopUpUnit: false,
      //biến hiển thị trạng thái đơn vị tính : thêm , sửa
      formModeUnit: null,
      //biến hiển thị trạng thái nhóm vât tư hàng hóa
      formModeGroupCategory: null,
      //biến hiển thị form chi tiết nhóm vât tư hàng hóa
      isShowPopUpGroupCategory: false,
      //biến lưu trư dữ liệu chưa thay đổi vật tư hang hóa
      productOldValue: null,
      //biến lưu trư dữ liệu đã thay đổi vật tư hang hóa
      productNewValue: null,
      //biến show dialog error
      isShowDialogErr: false,
      //biến lưu text dialog error
      diaglogErrorMessage: "",
      //biến show dialog confirm
      isShowDialogConfirm: false,
      //biến lưu text dialog notify
      diaglogNotify: "",
      //biến show dialog question
      isShowDialogQuestions: false,
      isDisable: false,
      //biến show thông tin ngầm định
      isShowListContent: false,
      //biến show combobox phâm trang
      selectRecordInPage: [
        { text: "1 tháng", value: "20" },
        { text: "2 tháng", value: "40" },
        { text: "3 tháng", value: "60" },
      ],
      //lựa chọn paging hiện tại
      recordInPage: {},
      //biến lưu data lấy từ api nhóm vật tư hàng hóa
      GroupCategory: [],
      //biến lưu data lấy từ api đơn vị tính
      Unit: [],
      //mảng hiển thị lên base multi select
      GroupCategoryInfor: [
        {
          display: Resources.MiSaResource.GroupCategory.GroupCategoryCodeTable,
          name: "GroupCategoryCode",
          isInputDisplay: false,
          width: "250px",
        },
        {
          display: Resources.MiSaResource.GroupCategory.GroupCategoryNameTable,
          name: "GroupCategoryName",
          isInputDisplay: true,
          width: "250px",
        },
      ],
      //mảng hiển thị lên combobox đơn vị tính
      UnitInfor: [
        {
          display: Resources.MiSaResource.Unit.UnitNameTable,
          name: "UnitName",
          isInputDisplay: false,
          width: "100px",
        },
      ],
      //mảng combobox thời gian bảo hành
      insuranceList: [
        {
          Insurance: Resources.MiSaResource.Product.ProductInsuranceOneMonth,
        },
        {
          Insurance: Resources.MiSaResource.Product.ProductInsuranceTwoMonth,
        },
        {
          Insurance: Resources.MiSaResource.Product.ProductInsuranceThreeMonth,
        },
        {
          Insurance: Resources.MiSaResource.Product.ProductInsuranceSixMonth,
        },
        {
          Insurance: Resources.MiSaResource.Product.ProductInsuranceNineMonth,
        },
        {
          Insurance: Resources.MiSaResource.Product.ProductInsuranceOneYear,
        },
        {
          Insurance: Resources.MiSaResource.Product.ProductInsuranceTwoYear,
        },
        {
          Insurance: Resources.MiSaResource.Product.ProductInsuranceThreeYear,
        },
        {
          Insurance: Resources.MiSaResource.Product.ProductInsuranceSixYear,
        },
        {
          Insurance: Resources.MiSaResource.Product.ProductInsuranceNineYear,
        },
        {
          Insurance: Resources.MiSaResource.Product.ProductInsuranceTwelveYear,
        },
      ],
      //mảng hiển thị lên combox giảm thuế
      taxReductionList: [
        {
          TaxReductionId: Enum.MiSaEnum.TaxReduction.NotDetermined,
          TaxReduction: Resources.MiSaResource.Product.ProductNotDetermined,
        },
        {
          TaxReductionId: Enum.MiSaEnum.TaxReduction.NotReduction,
          TaxReduction: Resources.MiSaResource.Product.ProductNotReduction,
        },
        {
          TaxReductionId: Enum.MiSaEnum.TaxReduction.Reduction,
          TaxReduction: Resources.MiSaResource.Product.ProductReduction,
        },
      ],
      //mảng chứa data lấy từ api kho
      warehouse: [],
      //mảng hiển thị lên combox kho
      displayFieldWarehouse: [
        {
          display: Resources.MiSaResource.Warehouse.WarehouseCodeTable,
          name: "WarehouseCode",
          width: "150",
        },
        {
          display: Resources.MiSaResource.Warehouse.WarehouseNameTable,
          name: "WarehouseName",
          width: "150",
        },
      ],
      //obect chứa các trường dữ liệu nhập từ ô input
      product: {},
      //mảng chứa các object validate dữ liệu
      validateObj: [],
      //biến chứa id của vật tư hàng hóa
      productGuId: null,
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
  watch: {
    /*
   Theo dõi trạng thái hiển thị pop up
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async isShowPopUp(newValue) {
      if (newValue) {
        window.addEventListener("keydown", this.handleShortKey);
        if (this.formMode == 1) {
          this.product.ProductCode = await this.getNewProduct();
          this.$nextTick(() => {
            this.$refs.ProductNameRef.$el.children[0].focus();
          });
          this.productOldValue = { ...this.product };
        }
      }else{
        window.removeEventListener("keydown", this.handleMouseDown);
      }
    },
    /*
   Theo dõi trạng thái hiển thị xem chi tiết lên pop up
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    productSelected: function (value) {
      if (value) {
        this.product = value;
        this.productGuId = value.ProductId;

        if (this.product.GroupCategoryListId) {
          this.product.GroupCategoryListId =
            this.product.GroupCategoryListId.split(",");
        }
        this.productOldValue = { ...value };
      }
    },
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
          case Enum.MiSaEnum.keyCode.F8 :{
            me.handleStore();
            break
          }
          case Enum.MiSaEnum.keyCode.s:
            e.preventDefault();
            if (e.shiftKey) {
              //Thực hiện cất và thêm dữ liệu
              me.handleStoreAndAdd();
            } else {
              //Thực hiện cất dữ liệu
              me.handleStore();
            }
            break;
          case Enum.MiSaEnum.keyCode.F9:
            e.preventDefault();
            me.handleCancelForm();
            break;

          default:
            break;
        }
      } else {
        switch (e.keyCode) {
          case Enum.MiSaEnum.keyCode.esc:
            e.preventDefault();
            //Thực hiên hành động nút X
            me.removeFormAdd();
            break;
        }
      }
    },
 /*
    Hàm xử thêm mới nhanh kho  
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleClikAddWarehouse() {
      this.formModeWarehouse = 1;
      this.isShowPopUpWarehouse = true;
    },
    //đóng form kho
    handleCloseWarehouse() {
      this.isShowPopUpWarehouse = false;
    },
    /*
    Hàm xử thêm mới nhanh đơn vị  
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleClikAddUnit() {
      this.formModeUnit = 1;
      this.isShowPopUpUnit = true;
    },
    //đóng form đơn vị tính
    handleCloseUnit() {
      this.isShowPopUpUnit = false;
    },
    //đóng form nhóm vật tư hàng hóa
    handleCloseGroupcategory() {
      this.isShowPopUpGroupCategory = false;
    },
    /*
    Hàm xử thêm mới nhanh nhóm vật tư hàng hóa  
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleClickAddGroupcategory() {
      this.formModeGroupCategory = 1;
      this.isShowPopUpGroupCategory = true;
    },
    /*
    Hàm so sánh trang thái thay đổi của Pop up khi click vào nút X
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    checkComparisonEmployee() {
      let isComparation = false;
      const me = this;
      if (
        JSON.stringify(this.productOldValue) ===
        JSON.stringify(me.productNewValue)
      ) {
        isComparation = true;
      } else isComparation = false;

      return isComparation;
    },
    //hàm emit sang product khi thêm vả sưa thành công
    handleAfterSucess() {
      this.$emit("handleAfterSucess");
    },
    handleEditSucess()
    {
      this.$emit("handleEditSucess");
    },
    /*
      Api thêm mới vật tư hàng hóa
      Author : Trần Nhật Hoàng (2/10/2022)
    */

    async postApiProduct() {
      try {
        let me = this;
        await axios
          .post("https://localhost:44358/api/v1/Product/Insert", me.product)
          .then(function () {
            //Khi button ở trạng thái cất
            me.isCallApiSucess = true;
            me.handleAfterSucess();
          })
          .catch(function (res) {
            me.isCallApiSucess = false;
            //thực hiện check mã product bị trùng
            if (res.response.status == 400) {
              const field = res.response.data.ex.errlst[0].field;
              const mess = res.response.data.ex.errlst[0].mess;
              me.validateObj.unshift({
                text: mess,
                key: field,
              });
              me.diaglogErrorMessage = me.validateObj[0].text;
              me.isShowDialogErr = true;
            }
          });
      } catch (error) {
        console.log(error);
      }
    },

    /*
      Api thực hiện sửa môt vật tư hàng hóa
      Author : Trần Nhật Hoàng (2/10/2022)
    */
    async putApiProduct(productId) {
      try {
        const me = this;
        //Api sửa nhân viên
        await axios
          .put(
            `https://localhost:44358/api/v1/Product/${productId}`,
            me.product
          )
          .then(function () {
            //button ở trạng thái cất
            me.isCallApiSucess = true;
            me.handleEditSucess();
          })
          .catch(function (res) {
            me.isCallApiSucess = false;
            //check mã trùng nhân viên
            if (res.response.status == 400) {
              const field = res.response.data.ex.errlst[0].field;
              const mess = res.response.data.ex.errlst[0].mess;
              me.validateObj.unshift({
                text: mess,
                key: field,
              });
              me.diaglogErrorMessage = me.validateObj[0].text;
              me.isShowDialogErr = true;
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    /*
    Xủ lý Api lấy ra mã product lớn nhất 
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async getNewProduct() {
      let respon = await axios.get(
        "https://localhost:44358/api/v1/Product/newcode"
      );
      return respon.data;
    },
    /*
    hàm kiểm tra giá trị key của object validate có trùng với prop field truyền vào hay không
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    onChangeInputValue(value, field) {
      let me = this;
      me.validateObj = me.validateObj.filter((item) => item.key != field);
    },
    selectItemPagging(item) {
      this.recordInPage = item;
    },
    showImplicitInformation() {
      this.isShowListContent = !this.isShowListContent;
    },
    /*
   hàm xử lý khi click vào nút x
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    removeFormAdd() {
      this.productNewValue = this.product;
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
    handleOpenPopUpContent() {
      this.$emit("openPopUpContent");
    },

    /*
   hàm get data api Unit
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async getUnit() {
      //Gọi api thực hiện lấy dữ liệu
      const _this = this;
      try {
        await axios
          .get("https://localhost:44358/api/v1/Unit")
          .then(function (res) {
            _this.Unit = res.data;
          })
          .catch(function () {
            alert("Có lỗi, vui lòng liên hệ MISA để được trợ giúp !");
          });
      } catch (error) {
        console.log(error);
      }
    },
    /*
   hàm get data api kho
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async loadWarehouseData() {
      //Gọi api thực hiện lấy dữ liệu
      const _this = this;
      try {
        await axios
          .get("https://localhost:44358/api/v1/Warehouse")
          .then(function (res) {
            _this.warehouse = res.data;
          })
          .catch(function () {
            alert("Có lỗi, vui lòng liên hệ MISA để được trợ giúp !");
          });
      } catch (error) {
        console.log(error);
      }
    },
    /*
   hàm get data api nhóm vật tư hàng hóa
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async getGroupCategory() {
      //Gọi api thực hiện lấy dữ liệu
      const _this = this;
      try {
        await axios
          .get("https://localhost:44358/api/v1/GroupCategory")
          .then(function (res) {
            _this.GroupCategory = res.data;
          })
          .catch(function () {
            alert("Có lỗi, vui lòng liên hệ MISA để được trợ giúp !");
          });
      } catch (error) {
        console.log(error);
      }
    },
    /*
   hàm xử lý nút cất
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async handleStore() {
      this.product.TypeProduct = this.formDetailType;
      let me = this;
      // Xử lý validate dữ liệu nhập từ ô input
      if (me.validateValue()) {
        if (me.formMode == 1) {
          await me.postApiProduct();
          if (me.isCallApiSucess) {
            //đóng Pop up
            me.closePopUp();
          }
        } else if (me.formMode == 2) {
          //Nếu cất ở trạng thái sửa nhân viên
          await me.putApiProduct(me.productGuId);
          if (me.isCallApiSucess) {
            me.closePopUp();
          }
        }
      } else {
        me.handleShowErrorValidate();
      }
    },
    /*
   hàm xử lý sự kiện cất và thêm
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async handleStoreAndAdd() {
      let me = this;
      //xử lý validate nhân viên
      if (me.validateValue()) {
        //Cất và thêm ở trang thái thêm nhân viên
        if (me.formMode == 1) {
          await me.postApiProduct();
          if (me.isCallApiSucess) {
            me.handleClearValue();
            me.product.ProductCode = await this.getNewProduct();
          }
        } else if (me.formMode == 2) {
          //Cất và thêm ở trạng thái sửa nhân viên
          await me.putApiProduct(me.productGuId);
          if (me.isCallApiSucess) {
            me.handleClearValue();
            me.product.ProductCode = await this.getNewProduct();
          }
        }
      } else {
        me.handleShowErrorValidate();
      }
    },
    /*
   hàm xử lý sự kiện đóng và cât
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async saveAndclosePopUp() {
      let me = this;
      if (me.validateValue()) {
        if (me.formMode == 1) {
          //trạng thái thêm nhân viên
          await me.postApiProduct();
          me.canCelDialogQuestion();
          //api ở trạng thái call thành công
          if (me.isCallApiSucess) {
            me.$emit("isCloseForm", false);
            me.handleClearValue();
          }
        } else {
          //trạng thái sửa nhân viên
          await me.putApiProduct(me.productGuId);
          me.canCelDialogQuestion();
          if (me.isCallApiSucess) {
            me.$emit("isCloseForm", false);
            me.handleClearValue();
          }
        }
      } else {
        //trạng thái validate không thành công
        me.canCelDialogQuestion();
        me.handleShowErrorValidate();
      }
    },
    /*
   hàm xử lý show trạng thái lỗi
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleShowErrorValidate() {
      this.validateObj = [...this.validateObj];
      this.diaglogErrorMessage = this.validateObj[0].text;
      this.isShowDialogErr = true;
    },
    /*
    Hàm clear giá trị object thành object rỗng
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleClearValue() {
      this.product = {};
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
      this.handleClearValue();
      this.canCelDialogQuestion();
      this.$emit("isCloseForm", false);
    },
    /*
   hàm xử lý validate
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    validateValue() {
      //Biên xử lý dữ liệu khi nhập vào ô input
      let productCode = this.product.ProductCode;
      let productName = this.product.ProductName;
      let productUnit = this.product.UnitId;
      let isValidate = true;
      // let warehouseDesc = this.warehouse.warehouseDesc;

      this.validateObj = [];
      //Kiểm tra mã nhân viên
      if (!productName) {
        //Kiêm tra mã nhân viên không được để trống
        this.validateObj.push({
          text: Resources.MiSaResource.ErrorValidate.productNameNotEmpty,
          key: "ProductName",
        });
        isValidate = false;
      }

      //Nếu mã nhân viên hơp lệ bắt đầu kiểm tra tên nhân viên
      // Kiểm tra tên nhân viên
      if (!productCode) {
        this.validateObj.push({
          text: Resources.MiSaResource.ErrorValidate.productCodeNotEmpty,
          key: "ProductCode",
        });
        isValidate = false;
      }

      if (!productUnit) {
        this.validateObj.push({
          text: Resources.MiSaResource.ErrorValidate.unitNameNotEmpty,
          key: "ProductUnitId",
        });
        isValidate = false;
      }

      return isValidate;
    },
    /*
   hàm xử focus vào input trạng thái lỗi
    Author : Trần Nhật Hoàng (2/10/2022)
    */
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
   hàm xử lý đóng pop up
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleCancelForm() {
      this.closePopUp();
    },
    /*
   hàm xử lý sau khi insert nhanh thành công và biding lên multi select
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    afterInsertGroupcategorySucess() {
      this.getGroupCategory();
    },
    /*
   hàm xử lý sau khi insert nhanh thành công và biding lên combobox
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    afterInsertUnitSucess() {
      this.getUnit();
    },
    /*
   hàm xử lý sau khi insert nhanh thành công và biding lên cobobox
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    afterInsertWarehouseSucess() {
      this.loadWarehouseData();
    },
  },
  created() {
    this.getUnit();
    this.loadWarehouseData();
    this.getGroupCategory();
  },
};
</script>
<style>
.overlay {
  display: flex;
}

.popUpDetail {
  overflow: auto;
  height: 100%;
  width: 800px;
}

.popup-header-action {
  cursor: pointer;
}

.m-textInputColum {
  margin-bottom: 4px;
  font-weight: 700;
  font-size: 12px;
}

.m-textInputColum span {
  color: red;
  margin-left: 2px;
}
.pop-up-Item-footer {
  display: flex;
}
.a-col-3-width {
  width: 168.6px;
}
.popup-content-footer {
  padding-bottom: 20px;
  /* position: fixed;
  bottom: 0;2tfuu
  width: 768px;
  background-color: #fff; */
}
.max-width {
  width: 165px;
}
</style>
