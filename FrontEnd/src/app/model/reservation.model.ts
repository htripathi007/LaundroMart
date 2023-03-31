export class Reservation{
    public reservationId?:number;
    public reservationType?:string;
    public machineCycleTime?:number;
    public charges?:number;
    
    constructor(reservationId?:number, reservationType?:string,
         machineCycleTime?:number,
         charges?:number) {
       
        this.reservationId=reservationId;
        this.reservationType=reservationType;
        this.machineCycleTime=machineCycleTime;
        this.charges=charges;

    }

   

}