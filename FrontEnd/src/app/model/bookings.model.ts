export class Bookings{
    bookingId?:number 
    bookingDateTime?:Date
    bookingStartTime:Date
    bookingEndTime:Date
    reservationId?:number
    userId?:number
    shopId?:number
    machineId?:number
    bill?:number
    pin?:number

    constructor(
        
    bookingStartTime:Date,
    bookingEndTime:Date,
    bookingId?:number, 
    bookingDateTime?:Date,
    reservationId?:number,
    userId?:number,
    shopId?:number,
    machineId?:number,
    bill?:number,
    pin?:number
    ){
    this.bookingId = bookingId;
    this.bookingDateTime = bookingDateTime;
    this.bookingStartTime = bookingStartTime;
    this.bookingEndTime = bookingEndTime;
    this.reservationId = reservationId;
    this.userId = userId;
    this.shopId = shopId;
    this.machineId = machineId;
    this.bill = bill;
    this.pin = pin;
    }
}