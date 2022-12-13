<template>
  <div class="base-input" :style="{ width: width, height: height }">
    <input
      class="custom-input"
      ref="tagInput"
      :type="type"
      v-model="valueHeader"
      :placeholder="placeholder"
      :tabindex="tabIndex"
      @input="handleInput"
      @blur="handleCheckEmailPhone"
      :class="{ 'is-number': isNumber }"
    />
  </div>
</template>

<script>
import { ref, toRefs, watch } from "vue";
export default {
  props: [
    "modelValue",
    "maxLength",
    "placeholder",
    "type",
    "focus",
    "tabIndex",
    "isNumber",
    "maxValue",
    "width",
    "height",
  ],
  emits: ["update:modelValue"],
  setup(props, context) {
    const tagInput = ref(null);

    /**
     * focus: có focus khi mounted
     * required: có bắt buộc hay k
     * isEmail: Là email hay k
     * isPhone: là sdt hay k
     * maxLength: độ dài max là value
     * modelValue: v-model
     * isNumber: là số hay k
     */
    const {  maxLength, modelValue, isNumber, maxValue } = toRefs(props);

    const valueHeader = ref("");
    watch(modelValue, (newValue) => {
      if (isNumber.value) {
        valueHeader.value = Comma(newValue);
      } else {
        valueHeader.value = newValue;
      }
    });

    

    /**
     * hàm xử lý nhập input và validate
     * Trần Nhật Hoàng - 15.09.2022
     */
    function handleInput(event) {
      if (maxLength.value && !isNumber.value) {
        if (event.target.value.length <= maxLength.value) {
          updateValue(event.target.value);
        } else {
          valueHeader.value = modelValue.value;
        }
      } else if (isNumber.value) {
        const number = CommaToNumber(event.target.value);
        if (checkNumber(number) || number === "") {
          if (event.data === "." || event.data === ",") {
            valueHeader.value = Comma(modelValue.value) + ",";
          } else {
            updateValue(number);
          }
        } else {
          valueHeader.value = Comma(modelValue.value);
        }
      } else {
        updateValue(event.target.value);
      }
    }

    function updateValue(value) {
      if (maxValue.value) {
        if (Number(value) <= maxValue.value) {
          context.emit("update:modelValue", value);
        } else {
          valueHeader.value = Comma(modelValue.value);
        }
      } else {
        context.emit("update:modelValue", value);
      }
    }

    /**
     * Hàm xử lý table với những cột cần thêm dấu phẩy vào đơn vị tiền tệ
     * @param {Số cần format} number
     * Trần Nhật Hoàng - 15.09.2022
     */
    function Comma(number) {
      if (number) {
        let intPart = Math.trunc(number);
        const floatPart = Number((number - intPart).toFixed(10));
        intPart = "" + intPart;
        if (intPart.length > 3) {
          var mod = intPart.length % 3;
          var output = mod > 0 ? intPart.substring(0, mod) : "";
          for (let i = 0; i < Math.floor(intPart.length / 3); i++) {
            if (mod == 0 && i == 0)
              output += intPart.substring(mod + 3 * i, mod + 3 * i + 3);
            else
              output += "." + intPart.substring(mod + 3 * i, mod + 3 * i + 3);
          }
          return floatPart !== 0
            ? output + "," + (floatPart + "").slice(2)
            : output;
        } else
          return floatPart !== 0
            ? intPart + "," + (floatPart + "").slice(2)
            : intPart;
      } else if (number === 0 || number === "0") {
        return 0;
      } else return "";
    }

    function CommaToNumber(number) {
      const ToNumber = number.replace(/\./g, "").replace(/,/g, ".");
      return ToNumber ? ToNumber : "";
    }

    function checkNumber(n) {
      return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    }
    return {
      tagInput,
      valueHeader,

      handleInput,
    };
  },
};
</script>

<style scoped>
.base-input {
  position: relative;
  box-sizing: border-box;
}
.base-input > input::placeholder {
  font-style: italic;
}
.custom-input {
  border: 1px solid #babec5;
  border-radius: 2px;
  height: 100%;
  outline: none;
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  /* text-indent: 10px; */
  padding: 0 10px;
  text-overflow: ellipsis;
  word-wrap: break-word;
}

input:focus {
  border: 1px solid green;
}
.is-number {
  text-align: right;
}
</style>
