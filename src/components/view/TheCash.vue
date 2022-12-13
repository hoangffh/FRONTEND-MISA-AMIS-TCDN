<template>
   <div class="container-body">
    <div class="container-body-item">
        <div class="container-body-item-header">
            <div class="container-body-item-header-title">
                <span>Nghiệp vụ kho</span>
            </div>
        </div>
        <div class="container-body-item-content">
                <img  src="../../assets/img/qt_Kho.10b11e5a.9f18b2a8.svg">
        </div>
        <div class="container-body-item-footer">
            <div class="container-body-item-footer-listItem ">
                <router-link to="/WareHouse" class="container-body-item-footer-listItem-item a-col-5">
                    <div class="container-body-item-footer-listItem-item-icon cash">

                    </div>
                    <div class="container-body-item-footer-listItem-item-title">
                        <span>Kho</span>
                    </div>
                </router-link>
                <router-link to="/Hang-hoa" class="container-body-item-footer-listItem-item a-col-5">
                    <div class="container-body-item-footer-listItem-item-icon inventoryItem">

                    </div>
                    <div class="container-body-item-footer-listItem-item-title">
                        <span>Vật tư hàng hóa</span>
                    </div>
                </router-link>
                <router-link to="/Unit" class="container-body-item-footer-listItem-item a-col-5">
                    <div class="container-body-item-footer-listItem-item-icon unit">

                    </div>
                    <div class="container-body-item-footer-listItem-item-title">
                        <span>Đơn vị tính</span>
                    </div>
                </router-link>
                <router-link to="/TheInventoryItemCategory" class="container-body-item-footer-listItem-item a-col-5">
                    <div class="container-body-item-footer-listItem-item-icon DIInventoryItemCategory">

                    </div>
                    <div class="container-body-item-footer-listItem-item-title">
                        <span>Nhóm vật tư , hàng hóa ,dịch vụ</span>
                    </div>
                </router-link>
                <div class="container-body-item-footer-listItem-item a-col-5">
                    <div class="container-body-item-footer-listItem-item-icon setting">

                    </div>
                    <div class="container-body-item-footer-listItem-item-title">
                        <span>Tùy chọn</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="report ">
        <div class="list_page-title container-body-item-header">
          Báo cáo
        </div>
        <div class="list-page-content">
          <ul>
            <li>Sổ chi tiết vật tư hàng hóa</li>
            <li>Tổng hợp tồn kho</li>
            <li>Báo cáo đối chiếu kho và sổ cái</li>
            <li>Báo cáo tiến độ sản xuất</li>
            <li>Báo cáo tồn theo chứng từ nhập chưa chuyển kho</li>
          </ul>
        </div>
        <div class="list-page-footer">
          Tất cả báo cáo
        </div>
      </div>
   </div>
</template>
<style>
@import url(../../css/main.css);

.container-body
{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 44px);

}
.container-body-item
{
    border-radius: 3px;
    height: 452px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    width: 692px;
}
.container-body-item-header
{
    height: 40px;
    font-weight: bold;
    text-transform: uppercase;
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 40px;
    box-sizing: border-box;
}
.container-body-item-content
{
    height: 350px;
    width: 100%;
}
.container-body-item-footer-listItem
{
    display: flex;
    align-items: center;
}
.container-body-item-footer-listItem-item-title
{
    text-decoration: none;
    color: #000;
}
.container-body-item-footer-listItem-item-icon.cash
{
    background: url(../../assets/img/Sprites.64af8f61.svg) no-repeat -1266px -202px;
	width: 20px;
	height: 20px;
}
.container-body-item-footer-listItem-item-icon.inventoryItem
{
    background: url(../../assets/img/Sprites.64af8f61.svg) no-repeat -1152px -200px;
    width: 22px;
	height: 22px;
}
.container-body-item-footer-listItem-item-icon.unit
{
    background: url(../../assets/img/Sprites.64af8f61.svg) no-repeat -872px -256px;
    width: 22px;
	height: 22px;
}
.container-body-item-footer-listItem-item-icon.DIInventoryItemCategory
{
    background: url(../../assets/img/Sprites.64af8f61.svg) no-repeat -1040px -200px;
    width: 22px;
	height: 22px;
}
.container-body-item-footer-listItem-item-icon.setting
{
    background: url(../../assets/img/Sprites.64af8f61.svg) no-repeat -648px -200px;
    width: 22px;
	height: 22px;
}
.container-body-item-footer-listItem-item
{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px solid #ccc;
    text-align: center;
    height: 60px;
    text-decoration: none;
    
}
.container-body-item-footer-listItem-item:hover
{
    box-shadow: 0 3px 6px rgb(0 0 0 / 25%);
    cursor: pointer;
}
.report
{
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left: 12px;
    height: 452px;
    border-radius: 3px;
    background-color: #fff;
}
.report .list-page-content ul{
    padding: 0 16px;
    border-bottom: 1px solid #e5e5e5;
}
.list-page-content ul li 
{
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px 0;
    border-bottom: 1px solid #e5e5e5;
    height: 50px;
}
.report .list-page-content ul li::before{
    content: "\2022";
    color: #646464;
    font-size: 24px;
    margin-right: 12px;
  }
  .report .list-page-content ul li:last-child{
    border-bottom: none;
  }
  .report .list-page-content ul{
    padding: 0 16px;
    border-bottom: 1px solid #e5e5e5;
  }
  .report .list-page-footer{
    cursor: pointer;
    height: 44px;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    color: #0075c0;
  }
</style>