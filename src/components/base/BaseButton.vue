<template>

  <button class="m-button" :class="[
    { 'button_hasHoverPrimary-green': hasHoverAndActivePrimarygreen },
    { 'button__hasBorder': hasBorderButton },
    { 'button__margin': hasMarginItem },
    { 'border_radius': isRadiusButton },
  ]" :tabindex="tabIndex" @keydown="handleKeyDownBtn">
    <div class="m-button-content">{{ textContent }}</div>
    <div class="base-button-action" v-if="action">
      <div></div>
    </div>
  </button>



</template>
<script>
export default {
  props: {
    action: Boolean,
    textContent: String,
    backgroundColor: {
      type: String,
      default: "rgb(1, 143, 1)",
    },
    hasHoverAndActivePrimarygreen: {
      type: Boolean,
      default: false,
    },
    hasBorderButton: {
      type: Boolean,
      default: false
    },
    hasMarginItem: {
      type: Boolean,
      default: false
    },
    isRadiusButton: {
      type: Boolean,
      default: false
    },
    tabIndex: {
      type: Number
    }
  },
  computed: {
    // Button có hover và active không?
    hasHoverAndActivePrimarygreenFunction() {
      return this.hasHoverAndActivePrimarygreen;
    },
    //Buton cancel 
    hasBorderButtonfunction() {
      return this.hasBorderButton;
    },
    //Buton có margin không
    hasMarginItemfunction() {
      return this.hasMarginItem
    },
    isRadius() {
      return this.isRadiusButton
    }
  },
  methods: {
    handleKeyDownBtn(e) {
      if (e.keyCode == 13) {
        this.$emit("handleKeyDown");
      }
    },
  },
};
</script>
<style>
.m-button {
  height: 34px;
  padding: 0 16px;
  background-color: v-bind(backgroundColor);
  color: #fff;
  border-radius: 4px;
  min-width: 60px;
  cursor: pointer;
  text-align: center;
  outline: none;
  border: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button_hasHoverPrimary-green {
  background-color: v-bind(backgroundColor);
}

.button_hasHoverPrimary-green:hover {
  background-color: rgb(3, 184, 3);
}

.button__hasBorder {
 border: 1px solid #8d9096;
  color: #111;
  background-color: transparent;
}

.button__hasBorder.button_hasHoverPrimary-green:hover {
  background-color: #ccc;
}

.button__margin {
  margin: 0 12px 0 0;
}

.border_radius {
  border-radius: 20px;
}

.base-button-action {
  position: absolute;
  right: 0;
}

.base-button-action>div {
  background: url(http://localhost:8080/img/Sprites.64af8f61.2ff7618a.svg) no-repeat -564px -365px;
  width: 8px;
  height: 5px;
}
</style>
