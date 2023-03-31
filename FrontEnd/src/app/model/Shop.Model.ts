export class Shop{
    shopId?:number
    shopName?:string
    shopCity?:string
    shopArea?:string
    shopPinCode?:number
    shopStartTime?:Date
    shopEndTime?:Date
    shopWorkingStatus?:boolean
    userId?:number

    constructor(
    shopId?:number,
    shopName?:string,
    shopCity?:string,
    shopArea?:string,
    shopPinCode?:number,
    shopStartTime?:Date,
    shopEndTime?:Date,
    shopWorkingStatus?:boolean,
    userId?:number,
    ){
    this.shopId =shopId
    this.shopName = shopName
    this.shopCity = shopCity
    this.shopArea = shopArea
    this.shopPinCode = shopPinCode
    this.shopStartTime = shopStartTime
    this.shopEndTime = shopEndTime
    this.shopWorkingStatus = shopWorkingStatus
    this.userId = userId

    }
}

