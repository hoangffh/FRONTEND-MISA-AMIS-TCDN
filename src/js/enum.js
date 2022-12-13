export default {
    MiSaEnum :{
        //Enum của keyCode
        keyCode :{
            s : 83 ,
            esc:27,
            F9 : 120,
            F8 :119,
            F2 :113,
            insert : 45 ,
            delete : 46,
            enter : 13
        },
        //mã lỗi trả về từ api
        errorCode :{
            dublicateEmployee : 400 ,
            erorStatus : 500
        },
        formMode :{
            Insert:1 ,
            Update : 2
        },
        TaxReduction :{
            All : 6 ,
            NotDetermined : 1 ,
            NotReduction:2,
            Reduction:3
        },
        TypeProduct:{
            All : 6 ,
            Goods : 1 ,
            Service : 2 ,
            RawMaterial:3 ,
            FinishedProduct:4,
            Tool:5
        },
        StatusWarehouse :{
            All : 6 ,
            Still_Exist : 1 ,
            Out_Of:2 ,
            Not_Exist:3
        },
        Status :{
            ALl:6,
            IsUsing : 1 ,
            IsNotUsing : 2
        }
        
    }
}