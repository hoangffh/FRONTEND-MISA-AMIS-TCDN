<template>
<!-- :id="idTooltip" -->
        <div v-if="isShowTooltip" class="tooltip"
        :style="{ top: positionY + 'px', left: positionX + 'px' }"
        > 
           <span>{{contentTooltip}}</span>
        </div>
</template>

<script>
    export default {
        props: {
            contentTooltip:{
                type: String,
                default: ""
            },
            isShowTooltip:{
                type:Boolean
            },
            positionX:{
                type:Number
            },
            positionY:{
                type:Number
            }

        },
        computed:{
        //Vị trí chiều ngang hiển thị
        TooltipX(){
            return this.positionX
        },
        //Vị chí chiều doc
        TooltipY()
        {
            return this.positionY + 100
        },
    },

        
    }
   
</script>

<style scoped>
.tooltip {
    box-sizing: border-box;
    max-width: 80px;
    background-color: #424857;
    max-height: 24px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    position: absolute;
    color: #fff;
    bottom: 0;
    animation: tootipGrow ease 0.1s;
    z-index: 10;
    justify-content: center;
    left: 0;
    transform: translate(-50%,100%);
}
.tooltip span
{
    font-size: 10px;
}
@keyframes tootipGrow {
    from{
        opacity: 0;
        transform:scale(0);
    }to{
        opacity: 1;
        transform:scale(1);
    }
    
}

/* .tooltip::before {
    position: absolute;
    top: 16px;
    left: -16px;
    content: "";
    border: 8px solid;
    border-color: transparent #424857 transparent transparent;
} */
</style>