<template>
  <div class="view-loading" v-if="loadingShow">
    <div :class="['view-loading-icon', { rotate: loadingShow }]"></div>
  </div>
</template>

<script>
export default {
  name: "view-loading",
  props:{
    loadingShow:{
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.view-loading {
  z-index: 1000;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(71, 71, 71, 0.3);
}
.view-loading-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  background: url("../../assets/img/Sprites.64af8f61.svg") no-repeat -1546px -254px;
  width: 20px;
  height: 20px;
}

@keyframes rotateLoading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.view-loading-icon.rotate {
  animation: rotateLoading 1s linear infinite;
}
</style>
