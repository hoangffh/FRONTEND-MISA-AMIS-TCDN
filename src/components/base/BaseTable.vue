<template>
  <div class="base__table__wrap">
    <div class="employ__table">
      <table :style="{ color: textColor }">
        <thead>
          <tr class="table__row__header">
            <th class="table__check__box" v-if="isShowCheckBox">
              <div class="row__check-box__align">
                <BaseCheckBox
                  ref="toggleCheckAll"
                  @click="handleCheckAllMulti('all')"
                  :stateCheckAll="stateCheckAll"
                ></BaseCheckBox>
              </div>
            </th>
            <th
              v-for="(col, index) in listCols"
              :key="index"
              v-show="(col.isShow = true)"
              class="t_table_head"
            >
              <div
                class="table_th_title"
                :title="col.display"
                :style="{
                  textAlign: `${col.align}`,
                  width: `${col.width}px`,
                }"
              >
                <div class="t_table_head_name">{{ col.display }}</div>
                <div
                  class="ms-icon-header-option"
                  @click="handleClickMoreFilter($event,col)"
                ></div>
              </div>
            </th>

            <th>CHỨC NĂNG</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in data"
            :key="item[fieldValue]"
            @click="handleClickRow(item[fieldValue])"
            @dblclick="this.$emit('handleClickView', item[fieldValue])"
          >
            <td v-if="isShowCheckBox" >
              <div class="row__check-box__align">
                <BaseCheckBox
                  @click="handleCheckAllMulti(item[fieldValue])"
                  :stateCheckAll="stateCheckAll"
                  @dblclick="
                      (e) => {
                        e.stopPropagation();
                      }
                    "
                ></BaseCheckBox>
              </div>
            </td>
            <td
              v-for="(col, index) in listCols"
              :key="index"
              v-show="(col.isShow = true)"
            >
              <div
                :style="{ textAlign: `${col.align}` }"
                :title="item[col.name]"
              >
                {{
                  col.typeOfValue == "money" // ? handleDate(item[col.name])
                    ? handleMoney(item[col.name])
                    : item[col.name]
                }}
              </div>
            </td>

            <td>
              <div class="row__func txt-center" style="min-width: 80px">
                <span @click="$emit('handleClickView', item[fieldValue])"
                  >Sửa</span
                >
                <div class="row__func__box" @click.prevent="() => {}">
                  <div
                    :class="['icon__wrap', { active: id == item[fieldValue] }]"
                    @blur="handleBlurMoreFunc"
                    @click="
                      handleClickMoreFunc(
                        $event,
                        item[fieldValue],
                        item[fieldValueCode]
                      )
                    "
                    @dblclick="
                      (e) => {
                        e.stopPropagation();
                      }
                    "
                  >
                    <div class="icon" @click.prevent="() => {}"></div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot v-show="existFooter">
          <tr>
            <th :style="{ width: `38px` }"></th>
            <th
              v-for="(col, index) in listCols"
              :key="index"
              :style="{ width: `${col.minWidth}` }"
              v-show="col.isShow == true"
            >
              <div
                v-if="index == 0"
                :style="{ textAlign: `center`, color: '#111111' }"
              >
                Tổng
              </div>
              <div
                v-else-if="col.getTotal"
                :style="{
                  textAlign: `${col.align}`,
                  color: '#111111',
                }"
              >
                {{ handleSum(col) }}
              </div>
            </th>
            <th></th>
          </tr>
        </tfoot>
      </table>
      <div class="no__content" v-show="data.length < 1">not output</div>
    </div>
  </div>
  <div
    class="drop__box__func"
    v-show="isShowFuncDrop"
    :style="{ top: `${dropBoxY}px`, left: `${dropBoxX}px` }"
  >
    <div class="drop__box">
      <div
        v-show="!notAllowUpdate"
        class="drop__box__item"
        @click="handleClickUpdate"
      >
        Sửa
      </div>
      <div
        v-show="!notAllowDelete"
        class="drop__box__item"
        @click="handleClickRemove"
      >
        Xoá
      </div>
      <div
        v-show="!notAllowReplica"
        class="drop__box__item"
        @click="handleClickRelica"
      >
        Nhân bản
      </div>
    </div>
  </div>
  <div
    class="drop__box__func_Filter"
    v-show="isShowFuncFilter"
    :style="{ top: `${dropBoxFilterY}px`, left: `${dropBoxFilterX}px` }"
    ref="drop_box_filter"
  >
    <div class="drop__box__func_Filter_listItem">
      <div class="drop__box__func_Filter_listItem_item">
        <div class="drop__box__func_Filter_listItem_item_icon"></div>
        <span>Cố định cột này</span>
      </div>
      <div class="drop__box__func_Filter_listItem_item item_list_two">
        <div class="drop__box__func_Filter_listItem_item_left">
          <span>Lọc {{textFilterColumName}}</span>
        </div>
        <BaseDropdown
          :isTextChange="true"
          propKey="key"
          propValue="value"
          v-model:value="filterPopupTemp"
          :items="filterCondition"
          :isShowContent="isShowContent"
          @onClick="handleShowContent"
        ></BaseDropdown>
      </div>
      <div class="drop__box__func_Filter_listItem_item_input">
        <BaseInput
          height="32px"
          type="text"
          placeholder="Nhập giá trị lọc"
          v-model="valueFilterPopup"
        ></BaseInput>
      </div>
      <div class="drop__box__func_Filter_listItem_item">
        <BaseButton
          hasBorderButton
          hasHoverAndActivePrimarygreen
          textContent="Bỏ lọc"
        >
        </BaseButton>
        <div @click = handleClickFilter()>
          <BaseButton hasHoverAndActivePrimarygreen textContent="Lọc"
        >
        </BaseButton>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import FormatData from "../../js/formatData/formatData";
import BaseCheckBox from "../../components/base/BaseCheckBox.vue";
import BaseInput from "../../components/base/BaseInput.vue";
import BaseButton from "./BaseButton.vue";
import BaseDropdown from "./BaseDropdown.vue";
export default {
  name: "base-table",
  components: {
    BaseCheckBox,
    BaseInput,
    BaseButton,
    BaseDropdown,
  },
  props: [
    //là 1 mảng object, vd: [{id: 'abc', name: 'hoang'},{...}]
    "data",

    //là danh sách các cột cần hiển thị, vd: [{key: 'id', display: 'mã', width: '100', align: , type: text || date}, {key: 'name', display: 'ten', width: '100', align: 'left'}]
    "listCols",

    //là trường để phân biệt từng dòng(thường để là id)
    "fieldValue",
    "fieldValueCode",

    //
    "textColor",
    "isShowCheckBox",

    "listIdsSelected",

    //có dòng tổng không (boolean)
    "existFooter",

    //
    "notAllowReplica",
    "notAllowUpdate",
    "notAllowDelete",
    "totalColumn",
  ],
  data() {
    return {
      textFilterColumName :"",
      valueFilterPopup: "",
      //column lọc hiện tại
      columnSelected: "",
      //Id để show box func
      filterPopupTemp: "",
      keyCondition : null ,
      isShowFuncDrop: false,
      isShowFuncFilter: false,
      isShowContent:false ,

      id: null,
      code: null,
      idFocus: null,
      selectAll: false,

      dropBoxX: 0,
      dropBoxY: 0,
      dropBoxFilterY: 0,
      dropBoxFilterX: 0,
      //
      sumTotalMoney: 0,
      stateCheckAll: false,
      filterCondition: [
        {
          key: 1,
          value: "(Trống)",
        },
        {
          key: 2,
          value: "(Không trống)",
        },
        {
          key: 3,
          value: "Bằng",
        },
        {
          key: 4,
          value: "Khác",
        },
        {
          key: 5,
          value: "Chứa",
        },
        {
          key: 6,
          value: "Bắt đầu với",
        },
        {
          key: 7,
          value: "Kết thúc với",
        },
      ],
    };
  },
  emits: [
    "handleClickView",
    "handleClickUpdate",
    "handleClickRemove",
    "handleClickRelica",
    "setListIdsSelected",
  ],

  computed: {
    //Tính toán tổng tiền trên 1 row

    handleSum() {
      let me = this
      return (col) => {
        if(col.typeOfValue == 'money') {
          return FormatData.formatMoney(me.totalColumn[col.name])
        } else {
          return me.totalColumn[col.name];
        }
      }
    },

    handleMoneyInTable() {
      return (item) => {
        let totalCash = 0;
        totalCash = item.QuantityStock;
        // if (item.Accountings) {
        //   let listAccountings = JSON.parse(item.Accountings);
        //   totalCash = listAccountings.reduce((total, item) => {
        //     return total + item.Money;
        //   }, 0);
        // }
        //format lại tiền
        return FormatData.formatMoney(totalCash);
      };
    },
    handleMoney() {
      return (total) => FormatData.formatMoney(total);
    },
    //format lại tổng tiền
    handleSumTotalMoney() {
      
      return (total) => FormatData.formatMoney(total);
    },
    //format date
    handleDate() {
      return (dateString) => {
        return FormatData.formatDateFrom_DateTimePicker_to_YYMMDDDD(
          new Date(dateString)
        );
      };
    },
  },
  // updated()
  // {
  //   if(this.statusCheckbox == true)
  //   this.$refs.toggleCheckAll.isChecked = false;
  // },
  mounted() {
    window.addEventListener('mousedown', this.focusOutSideFilter);
  },
  unmounted() {
    window.removeEventListener('mouseup', this.focusOutSideFilter);
  },
  watch: {
    //add sự kiện click outside khi box chức năng đang được hiển thị
    isShowFuncDrop(value) {
      if (value) {
        document.addEventListener("click", this.focusOutSide);
      } else {
        document.removeEventListener("click", this.focusOutSide);
        this.id = null;
      }
    },

    filterPopupTemp(value)
    {
      this.keyCondition = value
    },
    data(value) {
      this.selectAll = false;
      let res = 0;
      if ((value, this.existFooter)) {
        res = this.data.reduce((total, item) => {
          let a = 0;
          if (item.QuantityStock) {
           console.log(item.QuantityStock)
          }
          return total + a;
        }, 0);
      }
      this.sumTotalMoney = res;
    },
  },
  methods: {
    handleClickFilter() {
      this.$emit("filterColumnAction", this.columnSelected, this.valueFilterPopup,this.keyCondition)
    },
    handleShowContent()
    {
      this.isShowContent = !this.isShowContent
    },
    handleSelectRow(id) {
      this.$emit("handleSelectRow", id);
    },
    handleCheckAllMulti(id) {
     
      if (id == "all") {
        this.stateCheckAll = !this.stateCheckAll;
        //if bỏ chọn tất cả
        if (!this.stateCheckAll) {
          this.$emit("setListIdsSelected", []);
          //else => chọn tất cả => thêm tất cả id vào list chọn
        } else {
          let listNow = [];
          this.data.forEach((item) => {
            listNow.push(item[this.fieldValue]);
          });
          this.$emit("setListIdsSelected", listNow);
        }
        //khi click vào 1 dòng
      } else {
        //Nếu đang chọn thì bỏ chọn, thoát khỏi trạng thái chọn tất cả
        if (this.listIdsSelected.includes(id)) {
          this.$refs.toggleCheckAll.isChecked = false;
          let listNow = this.listIdsSelected.filter((idItem) => {
            return idItem != id;
          });
          this.$emit("setListIdsSelected", listNow);
          //Nếu chưa chọn => push vào list
        } else {
          this.$emit("setListIdsSelected", [...this.listIdsSelected, id]);
          //Nếu độ dài list = tổng employee đang hiển thị => kích hoạt trạng thái chọn tất cả
          if (this.listIdsSelected.length == this.data.length) {
            this.$refs.toggleCheckAll.isChecked = true;
          }
        }
      }
    },
    focusOutSide(e) {
      if (
        !e.target.classList.contains("icon__wrap") &&
        !e.target.classList.contains("icon")
      ) {
        this.isShowFuncDrop = false;
        // this.isShowFuncFilter = false
      }
    },

      focusOutSideFilter(e)
      {
        const isClick = this.$refs.drop_box_filter.contains(e.target);
            
            if(!isClick){
              this.isShowFuncFilter = false
            }
      },
     
    //emit..setListIdsSelected(listId)
    handleClickUpdate() {
      this.$emit("handleClickUpdate", this.id);
    },
    handleClickRemove() {
      this.$emit("handleClickRemove", this.id, this.code);
    },
    handleClickRelica() {
      this.$emit("handleClickRelica", this.id);
    },
    handleBlurMoreFunc() {},
    //Khi click drop box thao tác với 1 row => set vị trí hiển thị và hiển thị lên màn hình
    handleClickMoreFunc(e, id, code) {
      if (!this.isShowFuncDrop || id != this.id) {
        this.isShowFuncDrop = true;
        this.id = id;
        this.code = code;
        this.dropBoxX = e.clientX - 100;
        this.dropBoxY = e.clientY + 15;
      } else {
        this.isShowFuncDrop = false;
      }
    },
    handleClickMoreFilter(e,col) {
     this.textFilterColumName = col.display
     this.columnSelected = col.name
      if (!this.isShowFuncFilter ||col.name!=this.columnSelected ) {
        this.isShowFuncFilter = true;
        this.dropBoxFilterX = e.clientX - 300;
        this.dropBoxFilterY = e.clientY + 22;
      } else {
        this.isShowFuncFilter = false;
      }
    },
    handleClickRow(id) {
      this.idFocus = id;
    },
  
    
    handleClickLinkOnRow(id) {
      this.$emit("handleClickView", id);
    },
  },
};
</script>

<style lang="scss">
@import "../../css/common/baseTable.scss";

.table_th_title {
  display: flex;
  justify-content: space-between;
}
.ms-icon-header-option {
  background: url("../../assets/img/Sprites.d78db031.svg") no-repeat;
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  background-position: -1687px -564px;
  visibility: hidden;
}
.table_th_title:hover .ms-icon-header-option {
  visibility: visible;
}
.drop__box__func_Filter {
  position: fixed;
  z-index: 1;
  padding: 22px 17px;
  border: 1px solid #babec5;
  background: #fff;
  min-width: 350px;
  max-width: 350px;
  width: -moz-fit-content;
  width: fit-content;
  font-weight: 400;
  font-size: 13px;
  border-radius: 2px;
  box-shadow: 3px 3px 6px #ddd;
}
.drop__box__func_Filter_listItem_item {
  display: flex;
  align-items: center;
}
.drop__box__func_Filter_listItem_item:first-child {
  padding-bottom: 14px;
  border-bottom: 1px solid #ebedf0;
}
.drop__box__func_Filter_listItem_item:first-child span {
  margin-left: 6px;
}
.drop__box__func_Filter_listItem_item_icon {
  background: url("../../assets/img/Sprites.d78db031.svg") no-repeat -1726px -560px;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
}
.item_list_two {
  justify-content: space-between;
  font-weight: 600;
  cursor: pointer;
}
.drop__box__func_Filter_listItem_item_right {
  display: flex;
  align-items: center;
}
.drop__box__func_Filter_listItem_item_right span {
  white-space: nowrap;
  font-family: Notosans Bold;
  margin-right: 4px;
  line-height: 36px;
  color: #0075c0 !important;
}
.drop__box__func_Filter_listItem_item_right_icon {
  background: url("../../assets/img/Sprites.d78db031.svg") no-repeat -178px -362px;
  width: 12px;
  height: 12px;
  min-width: 12px;
  min-height: 12px;
}
.drop__box__func_Filter_listItem_item_input {
  margin-top: 8px;
}
.drop__box__func_Filter_listItem_item:last-child {
  justify-content: space-between;
  margin-top: 16px;
}
</style>
