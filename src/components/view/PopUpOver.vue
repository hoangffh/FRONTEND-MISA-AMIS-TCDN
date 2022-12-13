<template>
    <div :class="['list__func']" 
    v-if="isShowList_Function"
    :style="{ top: popUpY + 'px', left:  popUpX + 'px' }"
    >
        <div @click="duplicateEmployee" class="list__func__item">Nhân bản</div>
        <div @click="deleteEmployee" class="list__func__item">Xoá</div>
        <div class="list__func__item">Ngừng sử dụng</div>
    </div>
</template>
<script>
export default {
    name:"popUpOver",
    props:["positionX","positionY","isShowList_Function"],
    computed:{
        //Vị trí chiều ngang hiển thị
        popUpX(){
            return this.positionX - 115
        },
        //Vị chí chiều doc
        popUpY()
        {
            return this.positionY + 10
        },
    },
    methods:{
      //
      deleteEmployee()
      {
        this.$emit("deleteEmployee",false)
      },
      duplicateEmployee()
      {
        this.$emit("duplicateEmployee")
      }
    }
}
</script>
<style scoped>
 
 .list__func {
    z-index: 1;
    background-color: white;
    position: absolute;
    border: 1px solid #c7c7c7;
    box-shadow: 0 0 4px rgb(139, 139, 139);
    width: 120px;
    overflow: hidden;
  }
  .list__func__item {
    font-weight: 400;
    width: 120px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 4px 8px;
  }
  .list__func__item:hover {
    background-color: rgb(231, 231, 231);
    color: rgb(3, 182, 3);
  }
 .list__func .show {
    display: block;
  }
</style>