<template>
  <div class="container-menu">
    <div class="container-menu-title">
      <div class="container-menu-title-left">
        <span>Danh sách hàng hóa , dịch vụ </span>
        <div class="container-menu-title-left-all">
          <div class="container-menu-title-left-all-icon"></div>
          <router-link to="/Cash" class="cashHome">Tất cả danh mục</router-link>
          <BaseToastMessage
            :content="contentToastMessage"
            :type="type"
            :isShowToastMessage="isShowToastMessage"
      ></BaseToastMessage>
        </div>
      </div>
      <div class="container-menu-title-right">
        <div class="container-menu-title-right-adviser">
          <div class="container-menu-title-right-adviser-icon"></div>
          <span>Hướng dẫn</span>
        </div>
        <BaseButton
          hasHoverAndActivePrimarygreen
          isRadiusButton
          hasMarginItem
          hasBorderButton
          textContent="Tiện ích"
          class="border_button"
        >
        </BaseButton>
        <BaseButton
          hasHoverAndActivePrimarygreen
          isRadiusButton
          hasMarginItem
          hasBorderButton
          textContent="Nhóm hàng hóa , dịch vụ"
          class="border_button"
        >
        </BaseButton>
        <BaseButton
          hasHoverAndActivePrimarygreen
          isRadiusButton
          textContent="Thêm"
          @click="handleOpenForm"
        >
        </BaseButton>
      </div>
    </div>
    <div class="container-menu-overview">
      <div class="container-menu-overview-left a-col-6 border-right">
        <div class="container-menu-overview-left-icon"></div>
        <div class="container-menu-overview-left-listText">
          <div class="container-menu-overview-left-listText-number">
            <span>6</span>
          </div>
          <div class="container-menu-overview-left-listText-product">
            <span>Hàng hóa</span>
          </div>
          <div class="container-menu-overview-left-listText-status">
            <span>Sắp hết hàng</span>
          </div>
        </div>
      </div>
      <div
        class="container-menu-overview-right container-menu-overview-left a-col-6"
      >
        <div
          class="container-menu-overview-left-icon container-menu-overview-right-icon"
        ></div>
        <div class="container-menu-overview-left-listText">
          <div
            class="container-menu-overview-left-listText-number right-item right-number"
          >
            <span>50116</span>
          </div>
          <div class="container-menu-overview-left-listText-product right-item">
            <span>Hàng hóa</span>
          </div>
          <div class="container-menu-overview-left-listText-status">
            <span>hết hàng</span>
          </div>
        </div>
      </div>
      <div class="container-menu-overview-load"></div>
    </div>
    <div class="container-menu-content">
      <div class="container-menu-content-head">
        <div class="container-menu-content-head-left">
          <div class="check_all"></div>
          <div
            class="batchExecution a-margine-12px batchExecution_font"
            @click="showListBatchExecution"
          >
            <span>Thực hiện hàng loạt</span>
            <div class="batchExecution-icon"></div>
            <div
              class="listBatchExecution"
              @click="handleRemoveMulti"
              v-if="isShowListBatchExecution"
            >
              Xóa
            </div>
          </div>
          <div
            class="batchExecution batchExecution_font"
            @click="showListFilter"
          >
            <span>Lọc</span>
            <div class="batchExecution-icon"></div>
          </div>
          <div class="listfunctionFilter" v-if="isShowFunFilter">
            <div class="listfunctionFilter_listItem">
              <div class="listfunctionFilter_listItem_item a-row">
                <div class="popup-content-head-left a-margine-r-6px a-col-6">
                  <div class="m-textInputColum">
                    <label>Tính chất</label>
                  </div>
                  <BaseCombobox
                    width="100%"
                    height="32px"
                    :data="typeProduct"
                    fieldDisplay="typeProductValue"
                    fieldValue="typeProductId"
                    v-model="product.typeProduct"
                  ></BaseCombobox>
                </div>
                <div class="popup-content-head-left a-col-6">
                  <div class="m-textInputColum">
                    <label>Nhóm</label>
                  </div>
                  <BaseComboboxTb
                    :data="GroupCategory"
                    :infor="GroupCategoryInfor"
                    fieldValue="GroupCategoryId"
                    fieldDisplay="GroupCategoryName"
                    v-model="product.GroupCategory"
                    minHeight="32px"
                    width="100%"
                    :notAllowCreate="true"
                  ></BaseComboboxTb>
                </div>
              </div>
              <div class="listfunctionFilter_listItem_item a-row">
                <div class="popup-content-head-left a-margine-r-6px a-col-6">
                  <div class="m-textInputColum">
                    <label>Giảm thuế theo nghị quyết 43</label>
                  </div>
                  <BaseCombobox
                    width="100%"
                    height="32px"
                    :data="statusWarehouse"
                    fieldDisplay="statusWarehouseValue"
                    fieldValue="statusWarehouseId"
                    v-model="product.taxReduction"
                  ></BaseCombobox>
                </div>
                <div class="popup-content-head-left a-col-6">
                  <div class="m-textInputColum">
                    <label>Trạng thái</label>
                  </div>
                  <BaseCombobox
                    width="100%"
                    height="32px"
                    :data="status"
                    fieldDisplay="statusValue"
                    fieldValue="statusId"
                    v-model="product.status"
                  ></BaseCombobox>
                </div>
              </div>
              <div
                class="overlay-body-informationEmployee-bottom-footer popup-content-footer"
              >
                <div
                  class="overlay-body-informationEmployee-bottom-footer-left"
                >
                  <BaseButton
                    hasBorderButton
                    hasHoverAndActivePrimarygreen
                    textContent="Bỏ lọc"
                    :tabIndex="17"
                    @click="handleCancelFilter"
                  >
                  </BaseButton>
                </div>
                <div
                  class="overlay-body-informationEmployee-bottom-footer-right"
                >
                  <BaseButton
                    hasHoverAndActivePrimarygreen
                    textContent="Lọc"
                    :tabIndex="18"
                    @click="handleFilterProduct"
                  ></BaseButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-menu-content-head-right">
          <div class="container-menu-content-head-item">
            <BaseInput
              type="text"
              width="300px"
              height="34px"
              placeholder="Tìm theo mã , tên hàng hóa , dịch vụ"
              :search="true"
              ref="employeeFilterRef"
              relative="relative"
              @onChangeValue="onChangeValue"
              v-model="productTextSearch"
            />
          </div>
          <div
            class="a-padd-l-10px container-menu-content-head-reload"
            @click="handleReloadPage"
          ></div>
          <div class="a-padd-l-10px print-meters"></div>
          <a
            :href="linkExport"
            class="a-padd-l-10px employ__export"
            @click="handleExportDocument"
          ></a>
          <div class="a-padd-l-10px icon-setting"></div>
        </div>
      </div>
      <BaseTable
        :data="products"
        :listCols="displayFieldProduct"
        :totalColumn="totalColumn"
        :existFooter="true"
        :isShowCheckBox="true"
        fieldValue="ProductId"
        fieldValueCode="ProductCode"
        textColor="#000"
        @handleClickView="handleClickView"
        @handleClickRelica="handleClickRelica"
        @setListIdsSelected="setListIdsSelected"
        @filterColumnAction="filterColumnAction"
        @handleClickRemove="handleClickRemove"
        :listIdsSelected="listIdsSelected"
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
  <PopUpDetails
    :positionX="positionX"
    :positionY="positionY"
    @openPopUpContent="openPopUpContent"
    :textPopUpContent="textPopUpContent"
    @isCloseForm="handleCloseform"
    :isShowPopUp="isShowPopUp"
    :formMode="formMode"
    :productSelected="productSelected"
    @handleAfterSucess="handleAfterSucess"
    @handleEditSucess="handleEditSucess"
    :formDetailType="formDetailType"
  >
  </PopUpDetails>
  <PopUpContent
    @getValueOfItem="getValueOfItem"
    @isClosePopUpContent="handleClosePopUpContent"
    :isShowPopUpContent="isShowPopUpContent"
  ></PopUpContent>
  <BaseLoading :loadingShow="isloading"></BaseLoading>
  <DialogNotify
    :isShowDialogConfirm="isShowDialogNotify"
    @removeDiaglogConfirm="allowDeleteMulti"
    @cancelFunctionDelete="cancelFunctionDelete"
    :messageDialogNotifi="messageDialogNotify"
    isShowCancelButton="isShowCancelButton"
  ></DialogNotify>
  <DialogError
    :isShowDialogErr="isShowDialogErr"
    @RemoveDialogErr="diaglogError"
    :textContent="diaglogErrorMessage"
  >
  </DialogError>
  
</template>
<script>
import BaseButton from "../base/BaseButton.vue";
import BaseInput from "../base/BaseInput.vue";
import PopUpDetails from "../layout/PopUpDetail.vue";
import PopUpContent from "../layout/PopUpContent.vue";
import BaseTable from "../base/BaseTable.vue";
import BaseCombobox from "../base/BaseCombobox.vue";
import BaseComboboxTb from "../../components/base/BaseComboboxTB.vue";
import BasePaging from "../base/BasePagingControl.vue";
import BaseLoading from "../view/loading.vue";
import DialogNotify from "../view/dialogNotification.vue";
import DialogError from "../../components/base/dialogError.vue";
import Resources from "../../js/resources";
import Enum from "../../js/enum";
import BaseToastMessage from "../base/BaseToastMessage.vue";
import axios from "axios";
export default {
  name: "m-product",
  components: {
    BaseButton,
    BaseInput,
    PopUpDetails,
    PopUpContent,
    BaseTable,
    BaseCombobox,
    BasePaging,
    BaseLoading,
    BaseComboboxTb,
    DialogNotify,
    DialogError,
    BaseToastMessage
  },
  data() {
    return {
      //Biên lưu tổng của các cột trả về từ backend
      totalColumn: {},

       //Biến lưu trữ trạng thấi của toast message
       type:"",
       //Biến cho phép ẩn  hiện toast message
       isShowToastMessage: false,
      // Biến lưu trữ text của toast message
      contentToastMessage:"",
      //type của popup detail (thành phẩm, hàng hóa, ..)
      formDetailType: 1,
      //biến xử lý text trong diaglog error
      diaglogErrorMessage: false,
      //biến xử lý show diaglog error
      isShowDialogErr: false,
      //biến xem có nút cancel trong dialog  không
      isShowCancelButton: true,
      //biến xử lý text trong diaglog notify
      messageDialogNotify: null,
      //biến xử lý show diaglog notify
      isShowDialogNotify: false,
      //biến xử lý show chức năng xóa nhiều
      isShowListBatchExecution: false,
      //mảng chứa id xóa nhiều
      listIdsSelected: [],
      //mảng chứa nhóm vât tư hàng hóa
      GroupCategory: [],
      //mảng hiển thị data nhóm vật tư hàng hóa
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
      //object chứa dữ liệu input product
      product: {},
      //mảng chứa dữ liệu lọc loại vât tư ,hàng hóa
      typeProduct: [
        {
          typeProductId: Enum.MiSaEnum.TypeProduct.All,
          typeProductValue: Resources.MiSaResource.Product.ProductTypeAll,
        },
        {
          typeProductId: Enum.MiSaEnum.TypeProduct.Goods,
          typeProductValue: Resources.MiSaResource.Product.ProductTypeGoods,
        },
        {
          typeProductId: Enum.MiSaEnum.TypeProduct.FinishedProduct,
          typeProductValue:
            Resources.MiSaResource.Product.ProductTypeFinishedProduct,
        },
        {
          typeProductId: Enum.MiSaEnum.TypeProduct.Service,
          typeProductValue: Resources.MiSaResource.Product.ProductTypeService,
        },
        {
          typeProductId: Enum.MiSaEnum.TypeProduct.RawMaterial,
          typeProductValue:
            Resources.MiSaResource.Product.ProductTypeRawMaterial,
        },
        {
          typeProductId: Enum.MiSaEnum.TypeProduct.Tool,
          typeProductValue: Resources.MiSaResource.Product.ProductTypeTool,
        },
      ],
      //mảng chứa dữ liệu lọc trạng thái kho
      statusWarehouse: [
        {
          statusWarehouseId: Enum.MiSaEnum.TaxReduction.All,
          statusWarehouseValue:
            Resources.MiSaResource.Product.ProductStatusAll,
        },
        {
          statusWarehouseId: Enum.MiSaEnum.TaxReduction.NotDetermined,
          statusWarehouseValue:
            Resources.MiSaResource.Product.ProductNotDetermined,
        },
        {
          statusWarehouseId: Enum.MiSaEnum.TaxReduction.NotReduction,
          statusWarehouseValue:
            Resources.MiSaResource.Product.ProductNotReduction,
        },
        {
          statusWarehouseId: Enum.MiSaEnum.TaxReduction.Reduction,
          statusWarehouseValue:
            Resources.MiSaResource.Product.ProductReduction,
        },
      ],
      //mảng chứa dữ liệu lọc trạng thái produc : đang sử dụng , ngừng sử dụng
      status: [
        {
          statusId: Enum.MiSaEnum.Status.ALl,
          statusValue: Resources.MiSaResource.Product.ProductStatusAll,
        },
        {
          statusId: Enum.MiSaEnum.Status.IsUsing,
          statusValue: Resources.MiSaResource.Product.ProductStatusIsUsing,
        },
        {
          statusId: Enum.MiSaEnum.Status.IsNotUsing,
          statusValue: Resources.MiSaResource.Product.ProductStatusIsNotUsing,
        },
      ],
      //mảng chứa dữ liệu lọc gủi lên backend để xử lý
      arrayFilter: [],
      //số bản ghi người dùng muốn chọn : 10 20 30
      recordInPage: 10,
      //Số trang hiện tại
      page: 1,
      //tổng số bản ghi
      totalRecord: 200,
      //dữ liêu phân trang hiển thị lên ngườu dùng chọn
      totalPage: 10,
      //biến xử lý show pop up
      isShowPopUp: false,
      //biến xử lý show pop up content
      isShowPopUpContent: false,
      //biến xử lý text pop up content
      textPopUpContent: "",
      //biến xử lý vị trí icon
      positionX: "",
      positionY: "",
      //biến xử lý data biding lên table
      products: [],
      //biến xử lý tìm kiếm
      productTextSearch: "",
      //trạng thái loading
      isloading: false,
      //trạng thái formode : thêm sửa
      formMode: null,
      //object chứa data xem chi tiết
      productSelected: {},
      //biến xử lý show chức năng lọc
      isShowFunFilter: false,
      //dữ liệu biding lên combobox bản ghi
      selectRecordInPage: [
        { text: "10 bản ghi trên 1 trang", value: 10 },
        { text: "20 bản ghi trên 1 trang", value: 20 },
        { text: "50 bản ghi trên 1 trang", value: 50 },
        { text: "100 bản ghi trên 1 trang", value: 100 },
      ],
      linkExport: null,
      //mảng chứa các trường dữ liệu biding lên cột trên table
      displayFieldProduct: [
        {
          display: Resources.MiSaResource.Product.ProductCodeTable,
          name: "ProductCode",
          width: "120",
          align: "left",
          dataType: "string",
          tableKey: "product",
        },
        {
          display: Resources.MiSaResource.Product.ProductNameTable,
          name: "ProductName",
          width: "150",
          align: "left",
          dataType: "string",
          tableKey: "product",
        },
        {
          display: Resources.MiSaResource.Product.ProductTaxReductionTable,
          name: "TaxReductionValue",
          width: "200",
          align: "left",
          dataType: "number",
          tableKey: "product",
        },
        {
          display: Resources.MiSaResource.Product.ProductTypeTable,
          name: "TypeProductValue",
          width: "150",
          align: "left",
          dataType: "number",
          tableKey: "product",
        },
        {
          display:
          Resources.MiSaResource.Product.Product_GroupCategoryCodeTable,
          name: "GroupCategoryCode",
          width: "150",
          align: "left",
          dataType: "string",
          tableKey: "GroupCategory",
        },
        {
          display: Resources.MiSaResource.Product.Product_UnitNameTable,
          name: "UnitName",
          width: "150",
          align: "left",
          dataType: "string",
          tableKey: "Unit",
        },
        {
          display: Resources.MiSaResource.Product.ProductInsuranceTable,
          name: "Insurance",
          width: "150",
          align: "left",
          dataType: "number",
          tableKey: "product",
        },
        {
          display: Resources.MiSaResource.Product.ProductAmountTable,
          name: "Amount",
          width: "200",
          align: "right",
          typeOfValue: "money",
          dataType: "number",
          tableKey: "product",
        },
        {
          display: Resources.MiSaResource.Product.QuantityStockTable,
          name: "QuantityStock",
          typeOfValue: "money",
          width: "150",
          align: "right",
          getTotal: true,
          dataType: "number",
          tableKey: "product",
        },
        {
          display: Resources.MiSaResource.Product.ExistentialValueTable,
          name: "ExistentialValue",
          width: "150",
          align: "right",
          getTotal: true,
          dataType: "number",
          tableKey: "product",
        },
        {
          display: Resources.MiSaResource.Product.SourceTable,
          name: "Source",
          width: "150",
          align: "left",
          dataType: "string",
          tableKey: "product",
        },
        {
          display: Resources.MiSaResource.Product.DescribesTable,
          name: "Describes",
          width: "150",
          align: "left",
          dataType: "string",
          tableKey: "product",
        },
        {
          display: Resources.MiSaResource.Warehouse.WarehouseCodeTable,
          name: "WarehouseCode",
          width: "150",
          align: "left",
          tableKey: "Warehouse",
        },
        {
          display: Resources.MiSaResource.Product.DiscountRateTable,
          name: "DiscountRate",
          typeOfValue: "money",
          width: "200",
          align: "right",
          dataType: "number",
          tableKey: "product",
        },
        {
          display: Resources.MiSaResource.Product.FixedPriceTable,
          name: "FixedPrice",
          typeOfValue: "money",
          width: "200",
          align: "right",
          dataType: "number",
          tableKey: "product",
        },
        {
          display: Resources.MiSaResource.Product.NearestPriceTable,
          name: "NearestPrice",
          typeOfValue: "money",
          width: "200",
          align: "right",
          dataType: "number",
          tableKey: "product",
        },
        {
          display: Resources.MiSaResource.Product.PriceTable,
          name: "Price",
          typeOfValue: "money",
          width: "150",
          align: "right",
          dataType: "number",
          tableKey: "product",
        },
        {
          display: Resources.MiSaResource.Product.ProductStatus,
          name: "UsingStatus",
          width: "150",
          align: "left",
          dataType: "number",
          tableKey: "product",
        },
      ],
      //biến lấy mã vât tư xóa
      productCodeDelete: null,
      //biến lấy id vật tư xóa
      productIdDelete: null,
      //trạng thái xóa 1 hay nhiều
      formModeDelete: null,

    };
  },
  watch: {
    //Theo dõi sự thay đổi khi click vào combobox phân trang
    recordInPage(value) {
      this.totalPage = Math.ceil(this.totalRecord / value);
      this.onPageChange();
    },
    //Theo dõi sự thay đổi khi click vào dữ liệu phân trang
    page(value) {
      console.log(value);
      this.onPageChange();
    },
  },
  methods: {
    /*
      Thực hiện xuất khẩu ra excel
       Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleReloadPage()
    {
      this.loadData()
    },
    /*
      Thực hiện xuất khẩu ra excel
       Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleExportDocument() {
      this.linkExport = "https://localhost:44358/api/v1/Product/export";
    },
    /*
    Hàm xử lý xóa 1 product được chọn
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleClickRemove(id, code) {
      this.formModeDelete = 1;
      this.productIdDelete = id;
      this.productCodeDelete = code;
      this.isShowDialogNotify = true;
      this.messageDialogNotify = `Bạn có thực sự muốn xóa hàng hóa , vật tư <${code}> không ?`;
    },
    /*
   api xóa một vât tư ,hàng hóa
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async apiDeleteOne(id) {
      const me = this;
      try {
        me.isloading = true;
        await axios
          .delete(`https://localhost:44358/api/v1/Product/${id}`)
          .then(function () {
            me.isloading = false;
            me.products = me.products.filter((item) => {
              return item.ProductId != id;
            });
            if(me.products.length == 0 )
              me.loadData()
            else
              me.onPageChange()
            me.showToastMessage(Resources.MiSaResource.MessageToast.MessageToastDeleteSucess.VI,"success")
          
          })
          .catch(function (res) {
            me.isloading = false;
            console.log(res);
            // if(res.response.status == 500)
            // {
            //   me.isShowDialogNotify = false;
            //   me.isShowDialogErr = true ;
            //   me.diaglogErrorMessage = `Vật tư hàng hóa <${me.unitCodeDelete}> đã có phát sinh. Bạn phải xóa các phát sinh liên quan trước khi xóa vật tư hàng hóa`
            //   me.isloading = false;
            // }
          });
      } catch (error) {
        console.log(error);
      }
    },
    /*
    Hàm xử lý nhân bản product được chọn
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleClickRelica(id) {
      this.handleClickView(id);
      this.formMode = 1;
    },
    /*
    Hàm xử lý khi thêm và sửa thành công
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleAfterSucess() {
      this.showToastMessage(Resources.MiSaResource.MessageToast.MessageToastInsertSucess.VI,"success")
      this.loadData();
    },
    handleEditSucess()
    {
      this.showToastMessage(Resources.MiSaResource.MessageToast.MessageToastEditSucess.VI,"success")
      this.loadData();
    },

    /*
    Hàm xử lý loc sản phẩm theo cộtcột
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    filterColumnAction(key, value, keyCondition) {
      try {
        this.arrayFilter = this.arrayFilter.filter((item) => {
          return item.Key != key;
        });
        //Lấy ra column đang được chọn lọc
        let currColumn = this.displayFieldProduct.find(
          (item) => item.name == key
        );
        //Nếu find được column thì lấy dataType của column đó, không thì mặc định là string
        let currDataType = currColumn ? currColumn.dataType : "string";
        let tableKey = currColumn ? currColumn.tableKey : "product";
        let TypeOfFilter = "=";
        switch (keyCondition) {
          case 1:
            TypeOfFilter = "null";
            break;
          case 2:
            TypeOfFilter = "notNull";
            break;
          case 3:
            TypeOfFilter = "=";
            break;
          case 4:
            TypeOfFilter = "difference";
            break;
          case 5:
            TypeOfFilter = "contains";
            break;
          case 6:
            TypeOfFilter = "start";
            break;
          case 7:
            TypeOfFilter = "end";
            break;
          default:
            break;
        }
        this.arrayFilter.push({
          Key: key,
          TypeOfFilter,
          Value: value,
          DataType: currDataType,
          TableKey: tableKey,
        });
        this.onPageChange();
      } catch (error) {
        console.log(error);
      }

      //Sau khi thêm xong vào array => call api lọc truyền mảng vào body
    },
    /*
    Hàm xử lý cho phép xóa vật tư hàng hóa được chọn
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    allowDeleteMulti() {
      const me = this;
      if (this.formModeDelete == 1) {
        me.cancelFunctionDelete();
        me.apiDeleteOne(this.productIdDelete);
      } else me.apiDeleteMulti();
    },
    /*
      Api xử lý xóa nhiều nhân viên
      Author : Trần Nhật Hoàng (2/10/2022)
    */
    async apiDeleteMulti() {
      try {
        const me = this;
        me.isloading = true;
        await axios
          .put(
            `https://localhost:44358/api/v1/Product/multi`,
            me.listIdsSelected
          )
          .then(function (res) {
            me.cancelFunctionDelete();
            me.isloading = false;
            if (me.listIdsSelected.length == res.data) {
              me.products = me.products.filter((item)=>
              {
                return !me.listIdsSelected.includes(item.ProductId)
              })
              if(me.products.length == 0) 
                me.loadData();
              else 
                me.onPageChange()
             
              me.listIdsSelected = [];
              me.showToastMessage(Resources.MiSaResource.MessageToast.MessageToastDeleteSucess.VI,"success")
              // me.showToastMessage(me.resource.MiSaResource.MessageToast.MessageToastDeleteSucess.VI,"success")
             
            }
            else{
              me.showToastMessage(Resources.MiSaResource.MessageToast.MessageToastDeleteError.VI,"error")
            }
          })
          .catch(function (res) {
            me.isloading = false;
            console.log(res);
          });
      } catch (error) {
        console.log(error);
      }
    },
    /*
    Hàm xử lý khi click vào nút cancel chức năng delete
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    cancelFunctionDelete() {
      this.isShowDialogNotify = false;
    },
    /*
    Hàm xử lý thông báo chắc chắn muốn xóah hay không
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleRemoveMulti() {
      this.formModeDelete = 2;
      this.isShowDialogNotify = true;
      this.messageDialogNotify =
        "Bạn có chắc muốn xóa những hàng hóa , vật tư này ?";
    },
    /*
    Hàm show chức năng xóa nhiều
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    showListBatchExecution() {
      if (this.listIdsSelected.length > 1) {
        this.isShowListBatchExecution = !this.isShowListBatchExecution;
      } else {
        this.isShowListBatchExecution = false;
      }
    },
    /*
    Hàm nhận listId khi chọn chức năng xóa nhiều truyền từ base table
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    setListIdsSelected(listId) {
      this.listIdsSelected = listId;
    },
    /*
    Hàm xóa 
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleCheckValueAll() {
      for (var i = 0; i < this.arrayFilter.length; i++) {
        if (this.arrayFilter[i].Value === 6) {
          this.arrayFilter.splice(i, 1);
          i--;
        }
      }
    },
    /*
    Hàm xử lý chức năng bỏ lọc
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleCancelFilter() {
      this.product = {};
      this.productTextSearch = "";
      this.arrayFilter = [];
      this.isShowFunFilter = false;
      this.loadData();
    },
    showListFilter() {
      this.isShowFunFilter = !this.isShowFunFilter;
    },
    /*
    Hàm xử lý chức năng lọc
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async handleFilterProduct() {
      try {
        let typeProduct = this.product.typeProduct;
        let statusProduct = this.product.status;
        let groupCategory = this.product.GroupCategory;
        let taxReduction = this.product.taxReduction;
        if (typeProduct) {
          this.arrayFilter = this.arrayFilter.filter((item) => {
          return item.Key != 'TypeProduct';
          })
          this.arrayFilter.push({
            Key: "TypeProduct",
            Value: typeProduct,
            TypeOfFilter: "=",
            DataType: "number",
            TableKey: "",
          });
        }

        if (statusProduct) {
          this.arrayFilter = this.arrayFilter.filter((item) => {
          return item.Key != 'Status';
          })
          this.arrayFilter.push({
            Key: "Status",
            Value: statusProduct,
            TypeOfFilter: "=",
            DataType: "number",
            TableKey: "Product",
          });
        }

        if (taxReduction) {
          this.arrayFilter = this.arrayFilter.filter((item) => {
          return item.Key != 'TaxReduction';
          })
          this.arrayFilter.push({
            Key: "TaxReduction",
            Value: taxReduction,
            TypeOfFilter: "=",
            DataType: "number",
            TableKey: "Product",
          });
        }

        if(groupCategory)
        {
          this.arrayFilter = this.arrayFilter.filter((item) => {
          return item.Key != 'GroupCategoryId';
          })
          this.arrayFilter.push({
            Key: "GroupCategoryId",
            Value: groupCategory,
            TypeOfFilter: "=",
            DataType: "string",
            TableKey: "GroupCategory",
          });
        }
        this.handleCheckValueAll();
        this.isShowFunFilter = false;
        await this.onPageChange();
      } catch (error) {
        console.log(error);
      }
    },
    /*
    Hàm xử lý lấy data tù bảng nhóm vât tư hàng hóa
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
    Hàm xử lý tìm kiếm
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    onChangeValue(value) {
      value = value.trim();
      let _this = this;
      //Mục đích sử dụng time out để k call api liên tục khi input thay đổi
      //Chỉ khi dừng gõ 1000ms thì mới call api
      if (_this.myTimeOut) {
        clearTimeout(_this.myTimeOut);
      }
      _this.myTimeOut = setTimeout(() => {
        _this.isloading = true;
        //call api
        axios
          .post(
            `https://localhost:44358/api/v1/Product/paging?pageSize=10&pageNumber=1&textSearch=${
              value || ""
            }`,
            _this.arrayFilter
          )
          .then(function (res) {
            _this.products = res.data.res.product;
            _this.totalRecord = res.data.res.totalRecord;
            _this.totalPage = Math.ceil(_this.totalRecord / _this.recordInPage);
            _this.page = 1
            _this.isloading = false;
          })
          .catch(function (res) {
            console.log(res);
          });

        //coding evethings
      }, 1000);
    },
    handleOpenForm() {
      this.isShowPopUpContent = true;
      this.formMode = 1;
    },
    handleCloseform() {
      this.isShowPopUp = false;
    },
    handleClosePopUpContent() {
      this.isShowPopUpContent = false;
    },
    /*
    Hàm xử lý lấy loại vât tư hàng hóa khi thêm mới 
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    getValueOfItem(content, index) {
      this.isShowPopUp = true;
      this.textPopUpContent = content;
      this.isShowPopUpContent = false;
      this.formDetailType = index + 1;
      this.productSelected.TypeProduct = index + 1;
      if (index == 0) {
        this.positionX = -32 + "px";
        this.positionY = -748 + "px";
      } else if (index == 1) {
        this.positionX = -170 + "px";
        this.positionY = -748 + "px";
      } else if (index == 2) {
        this.positionX = -597 + "px";
        this.positionY = -748 + "px";
      } else if (index == 3) {
        this.positionX = -101 + "px";
        this.positionY = -748 + "px";
      } else {
        this.positionX = -678 + "px";
        this.positionY = -748 + "px";
      }
    },
    openPopUpContent() {
      this.getValueOfItem();
      this.isShowPopUpContent = true;
      this.isShowPopUp = false;
    },

    /*
    Hàm xử lý lấy loại vât tư hàng hóa
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    handleBidingTypeProduct(value) {
      this.formDetailType = value;
      if (value == 1) {
        this.positionX = -32 + "px";
        this.positionY = -748 + "px";
        this.textPopUpContent = Resources.MiSaResource.Product.ProductTypeGoods;
      } else if (value == 2) {
        this.positionX = -170 + "px";
        this.positionY = -748 + "px";
        this.textPopUpContent =
          Resources.MiSaResource.Product.ProductTypeService;
      } else if (value == 3) {
        this.positionX = -597 + "px";
        this.positionY = -748 + "px";
        this.textPopUpContent =
          Resources.MiSaResource.Product.ProductTypeRawMaterial;
      } else if (value == 4) {
        this.positionX = -101 + "px";
        this.positionY = -748 + "px";
        this.textPopUpContent =
          Resources.MiSaResource.Product.ProductTypeFinishedProduct;
      } else {
        this.positionX = -678 + "px";
        this.positionY = -748 + "px";
        this.textPopUpContent = Resources.MiSaResource.Product.ProductTypeTool;
      }
    },
    /*
    Hàm xử lý dblclick vào môt vât tư hàng hóa
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async handleClickView(id) {
      const _this = this;
      try {
        _this.formMode = 2;
        _this.isloading = true;
        //call api lấy thông tin chi tiết nhân viên
        await axios
          .get(`https://localhost:44358/api/v1/Product/${id}`)
          .then(function (res) {
            _this.productSelected = res.data;
            _this.handleBidingTypeProduct(_this.productSelected.TypeProduct);
            _this.isloading = false;
          })
          .catch(function (res) {
            console.log(res);
          });
        _this.isShowPopUp = true;
      } catch (error) {
        console.log(error);
      }
    },
    /*
    Hàm xử lý phân trang , tìm kiếm và lọc
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async onPageChange() {
      const _this = this;
      _this.isloading = true;
      await axios
        .post(
          `https://localhost:44358/api/v1/Product/paging?pageSize=${_this.recordInPage}&pageNumber=${_this.page}&textSearch=${_this.productTextSearch}`,
          _this.arrayFilter
        )
        .then(function (res) {
          _this.products = res.data.res.product;
          _this.totalRecord = res.data.res.totalRecord;
          _this.totalPage = Math.ceil(_this.totalRecord / _this.recordInPage);
          _this.totalColumn = res.data.res.totalColum
          _this.isloading = false;
        })
        .catch(function (res) {
          console.log(res);
        });
    },
    /*
    Hàm xử lý lấy data tù bảng product
    Author : Trần Nhật Hoàng (2/10/2022)
    */
    async loadData() {
      //Gọi api thực hiện lấy dữ liệu
      const _this = this;
      try {
        _this.isloading = true;
        await axios
          .post(
            `https://localhost:44358/api/v1/Product/paging?pageSize=10&pageNumber=1`,
            _this.arrayFilter
          )
          .then(function (res) {
            _this.products = res.data.res.product;
            _this.totalRecord = res.data.res.totalRecord;
            _this.totalPage = Math.ceil(_this.totalRecord / _this.recordInPage);
            _this.page = 1;
            _this.isloading = false;
            _this.totalColumn = res.data.res.totalColum
          })
          .catch(function () {
            alert("Có lỗi, vui lòng liên hệ MISA để được trợ giúp !");
            _this.isloading = false;
          });
      } catch (error) {
        console.log(error);
      }
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
  },
  created() {
    this.loadData();
    this.getGroupCategory();
  },
};
</script>
<style scoped>
.border_button {
  border: 2px solid #3b3c3f;
  font-family: Notosans Bold;
}
.container-menu-content {
  height: calc(100vh - 265px);
}
.listfunctionFilter {
  width: 520px;
  height: 230px;
  background: #fff;
  border-radius: 2px;
  border: 1px solid #babec5;
  position: absolute;
  top: 55px;
  transform: translateX(-35%);
  z-index: 10;
  box-sizing: border-box;
}
.filterAction {
  position: relative;
}
.listfunctionFilter_listItem {
  display: flex;
  flex-direction: column;
  padding: 16px 20px 20px;
}
.m-textInputColum label {
  font-family: Notosans Bold;
}
.listfunctionFilter_listItem_item {
  padding-top: 10px;
}
</style>
