import { EmailValidator } from "@angular/forms";


export class User{
    public userId?:number;
    public userRole?:string;
    public userFirstName?:string;
    public userLastName?:string;
    public userEmail?:string;
    public userPhoneNumber?: number;
    public userPassword?:string;
    public userConfirmPassword?:string;
    public userAddress?:string;
    public userCity?:string;
    public userState?:string;
    public userPinCode?:number;
    public approveStatus?:boolean
    
    
    constructor(userId?:number,userRole?:string,userFirstName?:string,userLastName?:string,userEmail?:string,
        userPhoneNumber?: number,userPassword?:string,userAddress?:string,userCity?:string,userState?:string,userPinCode?:number,approveStatus?:boolean, userConfirmPassword?:string){
            this.userId = userId;
            this.userRole = userRole;
            this.userFirstName = userFirstName;
            this.userLastName = userLastName;
            this.userEmail = userEmail;
            this.userPhoneNumber = userPhoneNumber;
            this.userPassword = userPassword;
            this.userConfirmPassword=userConfirmPassword
            this.userAddress = userAddress;
            this.userCity = userCity;
            this.userState = userState;
            this.userPinCode = userPinCode;
             this.approveStatus=approveStatus
        }

}