<template>
    <div class="toast" v-if="isShowToastMessage">
      <div  class="toastmessage toastActive" :class="{
          'toastmessage--info': isInformation,
          'toastmessage--error': isError,
          'toastmessage--warning': isWarning,
          'toastmessage--success': isSuccess,
    }">
      <div class="toast__left">
        <div :class="{ 
          'icon--information': isInformation,
          'icon--error': isError,
          'icon--warning': isWarning,
          'icon--success': isSuccess,
          }"></div>
      </div>
      <div class="toast__mid">{{ content }}</div>
      <div class="toast__right">
          <div class="icon--close"></div>
      </div>
    </div>
    </div>
  </template>
  <script>
  export default {
    props: {
      content: {
        type: String,
        default: "Status message",
      },
      width: {
        type: String,
        default: () => "200px",
      },
      // xác định kiểu toast (màu)
      type: {
        type: String,
        required: true,
        // chỉ được chuyền cac giá trị ['information','error','warning','success']
        validator(type) {
          return ["information", "error", "warning", "success"].includes(type);
        },
      },
      isShowToastMessage:Boolean
    },
    computed: {
      /**
       * Kiểm tra trạng thái của toast message
       * AUTHOR: ANDT (19/07/2022)
       */
      isInformation() {
        return this.type === "information";
      },
      isWarning() {
        return this.type === "warning";
      },
      isError() {
        return this.type === "error";
      },
      isSuccess() {
        return this.type === "success";
      },
    },
  };
  </script>
  <style>
  .toastmessage {
    top: 45px;
    left: 45%;
    position: fixed;
    display: flex;
    align-items: center;
    /* max-width: 160px; */
    height: 40px;
    border-radius: 4px;
    color: #fff;
    min-width:200px;
    /* animation: slideInLeft ease 0.7s, fadeOut linear 1s 3s forwards; */
}
.toastmessage.toastActive
{
  animation: slideInLeft ease 0.7s, fadeOut linear 1s 3s forwards;
}
@keyframes slideInLeft {
    from {
        transform: translateY(calc(-60px));
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
}

@keyframes fadeOut {
    from {
        transform: translateY(0px);
    }
    to {
        opacity: 0;
        transform: translateY(calc(-60px));
    }
}

.toastmessage--success {
    background-color: #31B491;
}

.toastmessage--warning {
    background-color: #F07D42;
}

.toastmessage--info {
    background-color: #4262F0;
}

.toastmessage--error {
    background-color: #EC4141;
}

.toast__left {
    padding: 0 16px;
    font-size: 16px;
}

.toast__mid {
    flex: 1;
}

.toast__right {
    padding: 0 12px 0 16px;
    font-size: 16px;
}
  
  .toast__mid{
      font-size: 13px;
  }
  .toast {
      position: fixed;
      left: 50%;
      z-index: 10;
  }
  
.icon--information {
    background: url('../../assets/img/icon_collection.svg') no-repeat -368px -144px;
    width: 16px;
    height: 16px;
}

.icon--warning {
    background: url('../../assets/img/icon_collection.svg') no-repeat -368px -128px;
    width: 16px;
    height: 16px;
}

.icon--success {
    background: url('../../assets/img/icon_collection.svg') no-repeat -144px -16px;
    width: 16px;
    height: 16px;
}

.icon--error {
    background: url('../../assets/img/icon_collection.svg') no-repeat -384px -128px;
    width: 16px;
    height: 16px;
}

.icon--close {
    background: url('../../assets/img/icon_collection.svg') no-repeat -323px -476px;
    width: 10px;
    height: 10px;
    cursor: pointer;
}

  </style>