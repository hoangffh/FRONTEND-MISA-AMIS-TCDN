<template>
  <TheSideBar></TheSideBar>
  <TheContainer></TheContainer>
</template>

<script>
import TheContainer from "./components/layout/TheContainer.vue"
import TheSideBar from "./components/layout/TheSideBar.vue";
export default {
  name: "App",
  components: {
    TheSideBar,
    TheContainer,
},
};
</script>

<style>
@import url(./css/main.css);
</style>
