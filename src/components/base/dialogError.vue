<template>
  <div class="view-dialog-wrap" v-bind:class="{showDiaglog :isShowDialogErr}">
    <div class="view-dialog view-dialog-err">
      <div class="dialog__container">
        <div class="up">
          <div class="dialog-icon">
            <div></div>
          </div>
          <div class="content">{{textContent}}</div>
        </div>
        <div class="down">
          <div @click="removeDiaglogError">
            <TheBaseButton
              textContent="Đóng"
              height="36px"
              hasHoverAndActivePrimarygreen 
              :mainType="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapMutations } from "vuex";
 import TheBaseButton from "../base/BaseButton.vue"; 
export default {
  name: "dialog-err",
  components: {
    TheBaseButton,
  },
  props: ["textContent","isShowDialogErr"],
  methods:{
    removeDiaglogError()
    {
      this.$emit("RemoveDialogErr",false) 
    }
  }
};
</script>

<style >
@import "../../css/common/dialog.css";
</style>
