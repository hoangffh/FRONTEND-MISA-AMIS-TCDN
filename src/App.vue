<template>
  <TheSideBar></TheSideBar>
  <TheContainer></TheContainer>
</template>

<scrip>
import TheContainer from "./components/layout/TheContainer.vue"
import TheSideBar from "./components/layout/TheSideBar.vue";
export default {
  name: "App",
  components: {
    TheSideBar,
    TheContainer,
},
};
</scrip

<style>
@import url(./css/main.css);
</style>
