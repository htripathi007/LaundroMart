export class Machine{
    machineId?:number
    machineName:string
    serialNumber?:number
    machineCapacity?:number
    workingStatus?:boolean
    lockStatus?:boolean
    shopId?:number
    userId?:number

    constructor(machineName:string,machineId?:number,
        
        serialNumber?:number,
        machineCapacity?:number,
        workingStatus?:boolean,
        lockStatus?:boolean,
        shopId?:number,
        userId?:number){
            this.machineId = machineId;
            this.machineName = machineName;
            this.serialNumber = serialNumber;
            this.machineCapacity = machineCapacity;
            this.workingStatus = workingStatus;
            this.lockStatus = lockStatus;
            this.shopId = shopId;
            this.userId=userId;
        }

}