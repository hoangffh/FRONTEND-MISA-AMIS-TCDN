<template>
    <div class="overlay" v-if="isShowPopUpContent">
      <div class="overlay-body popUpDetail">
        <div class="popUpDetail-header">
          <div class="overlay-body-title">
            <div class="overlay-body-title-left">
              <span class="title">Chọn tính chất hàng hóa , dịch vụ</span>
            </div>
            <div class="overlay-body-title-right">
              <div class="overlay-body-title-helpIcon"></div>
              <div class="overlay-body-title-exitIcon" @click="removeFormAdd"></div>
            </div>
          </div>
        </div>
        <div class="popUpContent-listItem">
            <div class="popUpContent-listItem-item"
            v-for="(item, index) in listItem" @click="handleGetProductItem(item.name,index)"
            :key="index"
            >
                <div class="popUpContent-listItem-item-icon"
                :style="{
                backgroundPositionX: item['x'],
                backgroundPositionY: item['y'],
            }"
                >

                </div>
                <div class="popUpContent-listItem-item-listTitle">
                    <div class="popUpContent-listItem-item-listTitle-title">
                        <span>{{ item["name"] }}</span>
                    </div>
                    <div class="popUpContent-listItem-item-listTitle-content">
                        <span>{{ item["content"] }}</span>
                    </div>
                </div>
            </div>
           
        </div>
      </div>
      
    </div>
  </template>
  <script>
//   import BaseInput from "../base/BaseInput.vue";
//   import BaseButton from "../base/BaseButton.vue";
//   import BaseComboboxTB from "../base/BaseComboboxTB.vue";
//   import BaseSelect from "../base/BaseSelect.vue";
  export default {
    name: "m-popup",
    components: {
    //   BaseInput,
    //   BaseButton,
    //   BaseComboboxTB,
    //   BaseSelect,
    },
    props: ["isShowPopUpContent"],
    data() {
      return {
        isShowListContent: false,
        selectRecordInPage: [
          { text: "1 tháng", value: "20" },
          { text: "2 tháng", value: "40" },
          { text: "3 tháng", value: "60" },
        ],
        //lựa chọn paging hiện tại
        recordInPage: {},
        listItem: [
        {
          name: "Hàng hóa",
          content:"Sản phẩm  bạn mua và bán lại cho khách hàng",
          x: "-31px",
          y: "-631px",
        },
        {
          name: "Dịch vụ",
          content:"Dịch vụ mà bạn cung cấp cho khách hàng",
          x: "-264px",
          y: "-631px",
        },
        {
          name: "Nguyên vật liệu",
          content:"Nguyên liệu đầu vào dùng cho hoạt động sản xuất, xây dựng, cung cấp dịch vụ",
          x: "-960px",
          y: "-631px",
        },
        {
          name: "Thành phẩm",
          content:"Là sản phẩm đầu ra của quá trình sản xuất",
          x: "-148px",
          y: "-631px",
        },
        {
          name: "Công cụ dụng cụ",
          content:"Công cụ dụng cụ mua về nhập kho chưa đưa vào sử dụng",
          x: "-1078px",
          y: "-631px",
        },
    
    ]
      };
    },
    methods: {
      selectItemPagging(item) {
        this.recordInPage = item;
      },
      showImplicitInformation() {
        this.isShowListContent = !this.isShowListContent;
      },
      removeFormAdd()
      {
        this.$emit("isClosePopUpContent", false);
      },
      handleGetProductItem(name,index)
      {
        this.$emit("getValueOfItem",name,index)
      }

    },
  };
  </script>
  <style scoped>
  .overlay {
    display: flex;
  }
  
  .popUpDetail {
    overflow: auto;
    height: 100%;
    width: 800px;
  }
  .popUpDetail-header
  {
    border: none;
  }
  .overlay-body-title-left .title
  {
    font-size: 22px;
    color: #111;
    font-weight: 700;
  }
  .popUpContent-listItem
  {
    align-items: center;
    flex-direction: column;
  }
  .popUpContent-listItem-item
  {
    display: flex;
    align-items: center;
    padding: 16px 20px;
    cursor: pointer;
    border-top:  1px solid #cccc;
  }
  .popUpContent-listItem-item:last-child
  {
    border-bottom: 1px solid #cccc;
  }
  .popUpContent-listItem-item-icon
  {
    background: url(../../assets/img/Sprites.64af8f61.svg) no-repeat ;
    width: 85px;
    height: 85px;
    min-width: 85px;
    min-height: 85px;
  }

.popUpContent-listItem-item-listTitle
{
    display: flex;
    flex-direction: column;
}
.popUpContent-listItem-item-listTitle
{
    padding-left: 16px;
}
.popUpContent-listItem-item-listTitle-title
{
    padding-bottom: 8px;
}
.popUpContent-listItem-item-listTitle-title span{
    font-weight: bold;
}
  </style>
  