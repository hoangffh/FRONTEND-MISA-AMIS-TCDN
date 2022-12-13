<template>
  <div class="container">
    <div class="container-header">
      <div class="container-header-left">
        <div class="container-header-left-icon"></div>
        <select class="container-header-left-select">
          <option>CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC</option>
          <option>CÔNG TY TNHH MISA PRODUCT</option>
        </select>
      </div>
      <div class="container-header-right">
        <div class="container-header-right-bell a-padd-l-r-10px"></div>
        <div class="container-header-right-personal"></div>
        <div class="container-header-right-name">
          <span>Trần Nhật Hoàng</span>
          <div class="container-header-right-name-icon"></div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "m-container",
  components: {
},
  data() {
    return {
      companys: [
        "Công ty trách nhiệm hữu hạn một thành viên ABC",
        "Công ty MISA",
      ],
      companyDefault: "Công ty trách nhiệm hữu hạn một thành viên ABC",
    };
  },
};
</script>
<style scoped>
@import url(../../css/main.css);
</style>
