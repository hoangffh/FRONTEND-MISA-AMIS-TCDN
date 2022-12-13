
export default {
    MiSaResource : {
        //Tên
        AccountName : {
            name : "Trần Nhật Hoàng"
        },
        //Lỗi khi validate trả về
        ErrorValidate:{
            employeeCodeNotEmpty:{
                VI :"Mã nhân viên không được  để trống"
            },
            employeeCodeLength:{
                VI :"Mã nhân viên không vượt quá 20 kí tự"
            },
            employeeCodeInvalid:{
                VI :"Mã nhân viên không đúng định dạng"
            },
            employeeCodeIsDuplicated:{
                VI:"Mã nhân viên đã tồn tại"
            },
            employeeNameNotEmpty :{
                VI : "Tên nhân viên không được để trống"
            },
            employeeNameInvalid :{
                VI :"Tên nhân viên không đúng định dạng"
            },
            employeeDepartmentName :{
                VI :"Tên phòng ban không được phép để trống"
            },
            employeeDateOfBirth:{
                VI:"Ngày sinh không đươc lớn hơn ngày hiện tại"
            },
            employeeIdentityDate:{
                VI:"Ngày cấp không  đươc lớn hơn ngày hiện tại"
            },
            employeeEmail:{
                VI :"Email phải đúng định dạng"
            } ,
            groupCategoryCodeNotEmplty : "Mã nhóm vật tư , hàng hóa không được để trống",
            groupCategoryNameNotEmplty : "Tên nhóm vật tư , hàng hóa không được để trống",
            warehouseCodeNotEmpty : "Mã kho không được để trống",
            warehouseNameNotEmpty : "Tên kho không được để trống",
            unitNameNotEmpty : "Đơn vị tính không được để trống",
            productCodeNotEmpty :"Mã hàng hóa , vật tư không được để trống",
            productNameNotEmpty :"Tên hàng hóa , vật tư không được để trống"
        },
        //Các thông báo của dialog
        MessageDialog:{
            diaglogNotifyConfirmDeleteAll:{
                VI :"Bạn có chắc muốn xoá những nhân viên này ?"
            },
            diaglogNotifyQuestion :{
                VI :"Vui lòng chọn mã nhân viên cần xóa !"
            },
            diaglogNotifyConfirmDelete:{
                VI :"Bạn có thực sự muốn xóa Nhân viên"
            }
        },
        //Các thông báo của toast message
        MessageToast :{
            MessageToastInsertSucess :{
                VI:"Thêm mới thành công"
            },
            MessageToastInsertError :{
                VI:"Thêm mới thất bại"
            },
            MessageToastEditSucess :{
                VI:"Sửa thành công"
            },
            MessageToastEditEror :{
                VI:"Sửa thất bại"
            },
            MessageToastDeleteSucess :{
                VI:"Xóa thành công"
            },
            MessageToastDeleteError :{
                VI:"Xóa thất bại"
            }
        },
        GroupCategory :{
            GroupCategoryCodeTable : "Mã nhóm vật tư hàng hóa , dịch vụ",
            GroupCategoryNameTable :"Tên nhóm vật tư hàng hóa , dịch vụ",
            GroupCategoryStatusTable :"Trạng thái"
        },
        Warehouse : {
            WarehouseCodeTable : "Mã kho" ,
            WarehouseNameTable : "Tên kho" ,
            WarehousePlaceTable :"Địa chỉ",
            WarehouseStatusTable : "Trạng thái",
            WarehouseBranchTable :"Chi nhánh",
            WarehouseStatusALl:"Tất cả",
            WarehouseStatusStill_Exist :"Còn tồn",
            WarehouseStatus_OutOf :"Sắp hết hàng",
            WarehouseStatus_Not_Exist :"Hết hàng"
        },
        Unit:{
            UnitNameTable :"Đơn vị tính",
            UnitDescribeTable :"Mô tả",
            UnitStatusTable :"Trạng thái",

        },
        Product :{
            ProductCodeTable :"Mã",
            ProductNameTable:"Tên",
            ProductTaxReductionTable :"Giảm thuế theo nq 43",
            ProductTypeTable :"Tính chất",
            Product_GroupCategoryCodeTable :"Nhóm VTHH",
            Product_UnitNameTable : "Tên đơn vị",
            ProductInsuranceTable :"Thời hạn bảo hành",
            ProductAmountTable :"Số lượng tồn tối thiểu" ,
            QuantityStockTable:"Số lượng tồn" ,
            ExistentialValueTable :"Giá trị tồn",
            SourceTable:"Nguồn gốc",
            DescribesTable:"Mô tả",
            DiscountRateTable :"Tỉ lệ CK khi mua hàng",
            FixedPriceTable :"Đơn giá mua cố định",
            NearestPriceTable:"Đơn giá mua gần nhất",
            PriceTable:"Đơn giá bán",
            ProductStatus :"Trạng thái",
            ProductStatusAll :"Tất cả",
            ProductStatusIsUsing  :"Đang sử dụng",
            ProductStatusIsNotUsing :"Ngùng sử dụng",
            ProductTypeAll :"Tất cả" ,
            ProductTypeGoods :"Hàng hóa",
            ProductTypeService :"Dịch vụ",
            ProductTypeFinishedProduct:"Thành phẩm",
            ProductTypeTool :"Công cụ dụng cụ",
            ProductTypeRawMaterial:"Nguyên vật liệu",
            ProductInsuranceOneMonth : "1 tháng" ,
            ProductInsuranceTwoMonth :"2 tháng",
            ProductInsuranceThreeMonth :"3 tháng",
            ProductInsuranceSixMonth :"6 tháng",
            ProductInsuranceNineMonth :"9 tháng",
            ProductInsuranceOneYear :"1 năm",
            ProductInsuranceTwoYear :"2 năm",
            ProductInsuranceThreeYear :"3 năm",
            ProductInsuranceSixYear :"6 năm" ,
            ProductInsuranceNineYear :"9 năm",
            ProductInsuranceTwelveYear:"12 năm" ,
            ProductNotDetermined :"Chưa xác định",
            ProductNotReduction :"Không giảm thuế",
            ProductReduction :"Có giảm thuế"
        }
    }
}
