class FormatData {
  static formatDateFrom_DateTimePicker_to_YYMMDDDD(date) {
    if (date) {
      const tzOffset = date.getTimezoneOffset() * 60 * 1000;
      let dae = new Date(date - tzOffset).toISOString().split("T")[0];
      dae = dae.split(/\D/g);
      return [dae[2], dae[1], dae[0]].join("/");
    } else {
      return "";
    }
  }
  static formatMoney(money) {
    if (money) {
      let intPart = Math.trunc(money); 
      const floatPart = Number((money - intPart).toFixed(10));
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
    else return '';
    
   
  }
}

export default FormatData;
