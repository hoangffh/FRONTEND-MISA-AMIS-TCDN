<template>
  <div class="view-dialog-wrap" v-bind:class="{showDiaglog :isShowDialogConfirm}">
    <div class="view-dialog view-dialog-notify">
      <div class="dialog__container">
        <div class="up">
          <div class="dialog-icon">
            <div></div>
          </div>
          <div class="content">{{ messageDialogNotifi }}</div>
        </div>
        <div class="down">
          <div @click="removeDiaglogConfirm">
            <BaseButton
              textContent="Đồng ý"
              height="36px"
              hasHoverAndActivePrimarygreen 
              :mainType="true"
            />
          </div>
          <div v-if="isShowCancelButton" @click="cancelFunctionDelete">
            <BaseButton
              textContent="không"
              height="36px"
              hasBorderButton hasHoverAndActivePrimarygreen
              :mainType="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../base/BaseButton.vue";
export default {
  name: "dialog-notifi",
  components: {
    BaseButton,
  },
  props: ["messageDialogNotifi","isShowDialogConfirm" ,"isShowCancelButton"],
  methods:{
    //Button đồng ý
    removeDiaglogConfirm()
    {
      this.$emit("removeDiaglogConfirm",false)
    },
    //Button hủy 
    cancelFunctionDelete()
    {
      this.$emit("cancelFunctionDelete")
    }
  }
  
  
};
</script>

<style>
@import url(../../css/common/dialog.css)
</style>
