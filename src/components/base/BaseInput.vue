<template>
  <div class="base-input" :style="{ width: width, height: height,position : relative }">
    <input class="custom-input"
      ref="base_input"
      :class="['input', { input_search: search }, isErr ?'m-input-error' : '',{'is-number' : isNumber}]"
      :placeholder="placeholder"
      :type="type"
      v-model="inputValue"
      :tabindex = "tabIndex"
      @input="updateInput"
      
    />
    <div class="base-input-search" v-if="search">
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "base-input",
  props: [
    "type",
    "width",
    "height",
    "placeholder",
    "search",
    "field",
    "autofocus",
    "tabIndex",
    "relative",
    "modelValue",
    "isErr",
    "isNumber"
  ],

  data(){
    return {
      inputValue : "" ,
    }
  },
  watch: {
    modelValue(value) {
      this.inputValue = value;
      if(this.isNumber)
      {
        this.inputValue = this.Comma(value)
      }
      

    },
    isFocus(value) {
      let me = this
      console.log(value, me)
    },
    isErr(value) {
      console.log(value)
    },
    inputValue(value) {
      this.$emit("update:modelValue", value);
    },
  },
  methods: {
    updateInput(event) {
      console.log(event.target.value)
      // this.$emit('update:modelValue', this.in)
      if(this.isNumber)
      {
        const number = this.CommaToNumber(event.target.value);
        if(this.checkNumber(number) || number === ''){
          if(event.data === '.' || event.data === ','){
            this.inputValue = this.Comma(this.inputValue) + ',';
          }
          else{
            this.$emit("update:modelValue", number);
          }
        }
        else{
          this.inputValue = this.Comma(this.modelValue.valued);
        }
      }
      this.$emit('onChangeValue', this.inputValue, this.field)
    },
    // function checkNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

    checkNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0)},
     /**
     * Hàm xử lý table với những cột cần thêm dấu phẩy vào đơn vị tiền tệ
     * @param {Số cần format} number 
     * Khắc Tiềm - 15.09.2022
     */
      Comma(number) {
      if(number){
        let intPart = Math.trunc(number); 
        const floatPart = Number((number - intPart).toFixed(10));
        intPart = "" + intPart;
        if (intPart.length > 3) {
          var mod = intPart.length % 3;
          var output = mod > 0 ? intPart.substring(0, mod) : "";
          for (let i = 0; i < Math.floor(intPart.length / 3); i++) {
            if (mod == 0 && i == 0)
              output += intPart.substring(mod + 3 * i, mod + 3 * i + 3);
            else output += "." + intPart.substring(mod + 3 * i, mod + 3 * i + 3);
          }
          return floatPart !== 0 ? output + ',' + (floatPart + '').slice( 2 ) : output;
        } else return floatPart !== 0 ? intPart + ',' + (floatPart + '').slice( 2 ) : intPart;
      }
      else if(number === 0 || number === '0'){
        return 0;
      }
      else return '';
    },

   CommaToNumber(number){
      const ToNumber = number.replace(/\./g,'').replace(/,/g, '.');
      return ToNumber ? ToNumber : '';
    }
  },
  
  mounted() {
    if (this.modelValue) {
      this.inputValue = this.modelValue;
    }
  },

  }
</script>

<style scoped>
.base-input
{
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
.base-input-search {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.base-input-search > div {
  background: url('../../assets/img/Sprites.64af8f61.svg') no-repeat -1041px -89px;
  width: 22px;
	height: 22px;
}
.m-input-error
{
   border-color: #FF4747;
 
}
.is-number
{
  text-align: right;
}
</style>
