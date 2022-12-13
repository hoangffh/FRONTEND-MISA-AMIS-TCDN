<template>
  <div :class="['sidebar', { hide: !isShowSide }]">
    <div class="sidebar_header">
      <div class="more">
      </div>
      <div class="logo-box">
        
      </div>
    </div>
    <div  class="sidebar_list_wrap">
      <router-link :to ="item.link"
        class="sidebar_list_item"
        v-for="(item, index) in listItem"
        :key="index"
      >
        <div class="icon-box">
          <div
            class="icon"
            :style="{
              width: item['width'],
              height: item['height'],
              backgroundPositionX: item['x'],
              backgroundPositionY: item['y'],
            }"
          >
      
        </div>
        </div>
        <span>{{ item["name"] }}</span>
        <div class="tooltip show-tooltip "> 
           <span>{{item["name"]}}</span>
        </div>
      </router-link>

    </div>
  </div>
</template>
<script>
// import Tooltip from "../base/BaseTooltip.vue";
export default {

  name: "c-sidebar",
  data() {
    return {
      isShowSide: true,
      listItem: [
        {
         link : "/Tong-quan",
          name: "Tổng quan",
          width: "18px",
          height: "20px",
          x: "-33px",
          y: "-1587px",
        },
        {
          link : "/Hang-hoa",
          name: "Tiền mặt",
          width: "14px",
          height: "18px",
          x: "-78px",
          y: "-1588px",
        },
        {
          link : "/Cash",
          name: "Tiền gửi",
          width: "16px",
          height: "16px",
          x: "-121px",
          y: "-1590px",
        },
        {
          link : "/Cash",
          name: "Mua hàng",
          width: "16px",
          height: "18px",
          x: "-165px",
          y: "-1589px",
        },
        {
          link : "/Cash",
          name: "Bán hàng",
          width: "20px",
          height: "18px",
          x: "-206px",
          y: "-1588px",
        },
        {
          link : "/Cash",
          name: "Quản lý hoá đơn",
          width: "14px",
          height: "17px",
          x: "-254px",
          y: "-1589px",
        },
        {
          link : "/Cash",
          name: "Kho",
          width: "18px",
          height: "17px",
          x: "-294px",
          y: "-1589px",
        },
        {
         link : "/Cash",
          name: "Công cụ dụng cụ",
          width: "18px",
          height: "17px",
          x: "-339px",
          y: "-1590px",
        },
        {
         link : "/Cash",
          name: "Tài sản cố định",
          width: "17px",
          height: "18px",
          x: "-382px",
          y: "-1589px",
        },
        {
         link : "/Cash",
          name: "Thuế",
          width: "16px",
          height: "16px",
          x: "-427px",
          y: "-1591px",
        },
        {
         link : "/Cash",
          name: "Giá thành",
          width: "17px",
          height: "17px",
          x: "-471px",
          y: "-1590px",
        },
        {
         link : "/Cash",
          name: "Tổng hợp",
          width: "15px",
          height: "16px",
          x: "-514px",
          y: "-1590px",
        },
        {
         link : "/Cash",
          name: "Ngân sách",
          width: "16px",
          height: "16px",
          x: "-427px",
          y: "-1664px",
        },
        {
         link : "/Cash",
          name: "Báo cáo",
          width: "14px",
          height: "13px",
          x: "-552px",
          y: "-1593px",
        },
        {
          link : "/Cash",
          name: "Phân tích tài chính",
          width: "17px",
          height: "14px",
          x: "-251px",
          y: "-1667px",
        },
      ],
    };
  },
  components:{
   
  }
};
</script>

<style>
@import url(../../css/main.css);
.tooltip {
    box-sizing: border-box;
    min-width: 64px;
    background-color: #424857;
    min-height: 24px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    position: absolute;
    color: #fff;
    bottom: 0;
    right: -2px;
    display: none;
    animation: tootipGrow ease 0.1s;
    transform: translateY(100%);
    z-index: 10;
    justify-content: center;
    padding: 0 10px;
}
.tooltip span
{
    font-size: 10px;
}
@keyframes tootipGrow {
    from{
        opacity: 0;
        transform:scale(0);
    }to{
        opacity: 1;
        transform:scale(1);
    }
    
}
</style>