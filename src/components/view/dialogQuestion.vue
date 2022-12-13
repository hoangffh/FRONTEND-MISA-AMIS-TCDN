<template>
  <div class="view-dialog-wrap" v-bind:class="{showDiaglog :isShowDialogQuestions}">
    <div class="view-dialog view-dialog-question">
      <div class="dialog__container">
        <div class="up">
          <div class="dialog-icon">
            <div></div>
          </div>
          <div class="content"> {{textContentQuestion}}  </div>
        </div>
        <div class="down">
          <div >
            <BaseButton
            textContent="Huỷ"
              height="36px"
              ref="btnCancel"
              hasBorderButton hasHoverAndActivePrimarygreen
              @click="CanCelDialogQuestion"
            />
          </div>
          <div class="right">
            <div class="btn-1" >
              <BaseButton
              textContent="Không"
                height="36px"
                hasBorderButton hasHoverAndActivePrimarygreen
                @click="ClosePopUp"
              />
            </div>
            <div class="btn-2" @click="SaveAndClosePopUp">
              <BaseButton
              textContent="Có"
                height="36px"
                :mainType="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../base/BaseButton.vue";
export default {
  name: "dialog-question",
  components: {
    BaseButton,
  },
  props: ["isShowDialogQuestions","textContentQuestion"],

  methods: {
    CanCelDialogQuestion()
    {
      this.$emit('CanCelDialogQuestion',false)
    },
    ClosePopUp()
    {
      this.$emit('ClosePopUp',false)
    },
    SaveAndClosePopUp()
    {
      this.$emit('SaveAndClosePopUp',false)
    }
  }
}

</script>

<style >
@import "../../css/common/dialog.css";
</style>
