<template>
    <div fieldName="Gender" value="1" class="misa-radio-group-wrapper">
        <div class="misa-label-field">{{label}}</div>
        <div class="misa-radio-group">
            <div v-for="(item,index) in listItem" 
                :key="index" 
                :class="{'misa-radio-item':true, 'misa-radio-item-selected':item.value == radioSelected}"
                @click="handleClickItem(item)"
                @keyup="e => handleKeyup(e,item)"
                :tabindex="tabIndex"
            >
                <div class="misa-radio-item-out">
                    <div class="misa-radio-item-in"></div>
                </div>
                <div class="misa-radio-display">{{item.display}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            itemSelected:this.listItem[0]
        }
    },
    props:{
        listItem:{
            type:Array,
            required:true,
        },
        tabIndex:Number,
        label:{
            type:String,
            required:true,
        },
        modelValue: {type: Number}
        // genderSelected
    },
    computed: {
        radioSelected() {
            return this.modelValue
        }
    },
    watch: {
        modelValue(value) {
            console.log(value)
        }
    },
    methods:{
        handleKeyup(e,item){
            if(e.key == 'Enter')
                this.itemSelected = item
            },
            handleClickItem(item)
            {
                this.itemSelected = item
                // console.log(this.itemSelected.value)
                this.$emit("itemGenderSelected",this.itemSelected.value)
            }
    }
}
</script>

<style scoped>

.misa-radio-group{
    display:flex
}

.misa-radio-item{
    display:flex;
    align-items:center;
    cursor: pointer;
    margin-right: 16px;
}

.misa-radio-item:last-child{
    margin-right: 0;

}

.misa-radio-item-selected .misa-radio-item-out{
    border-color:#35bf22;
}

.misa-radio-group,.misa-label-field
{
    padding-bottom: 13px;
}
.misa-label-field
{
    font-weight: bold;
}

.misa-radio-item-out{
    width: 18px;
    height: 18px;
    border-radius:50%;
    border:1px solid #8d9096;
    box-sizing: border-box;
    display:flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
}

.misa-radio-item-selected .misa-radio-item-in{
    width: 10px;
    height: 10px;
    background-color: #35bf22;
    border-radius:50%;
}

</style>