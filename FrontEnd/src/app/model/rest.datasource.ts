import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { catchError, from, Observable } from "rxjs";
import { User } from "./user.model";
import { Reservation } from "./reservation.model";
import { Shop } from "./Shop.Model";
import { Bookings } from "./bookings.model";
import { Machine } from "./machine.model";

const PROTOCOL = "http";
const PORT = 5155
@Injectable()
export class RestDataSource{

    baseUrl: string;
    auth_token?: string;

    constructor(private http: HttpClient){
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    authenticate(user: string, pass: string): Observable<any> {
        return this.http.post<any>(this.baseUrl + "api/User/Authenticate", { userPhoneNumber: user, userPassword: pass })
            .pipe(catchError((error) => {
                return error.message;
            }));
    }
    //Get Users by Role
    GetUsersByRole(role:any):Observable<User[]>{
        return this.http.get<User[]>(this.baseUrl+"api/User/UserRole?UserRole="+role);
     
    }
    //Delete User
    DeleteUser(userId:number):Observable<User>{
        return this.http.delete<User>(this.baseUrl+ "api/User/UserId?uid="+userId);
    }
    //GetAllUser
    GetAllUsers():Observable<User[]>{
       
        return this.http.get<User[]>(this.baseUrl+"api/User");
    }
    UpdateUser(id: any, user: User): Observable<any> {
        let token = sessionStorage.getItem("token");
        let prodheaders = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this.http.put<any>(this.baseUrl + "api/User/UserId?uid=" + id, user, { headers: prodheaders })
            .pipe(catchError((error) => {
                return error.message;
            }));
    }
    GetUserByUserId(userId:any):Observable<any>{
        return this.http.get<any>(this.baseUrl+"api/User/UserId?uid="+userId)

    }
    GetUserForValidation(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + "api/User/Validate");
    }
    registerUser(user: User): Observable<any> {
        return this.http.post<any>(this.baseUrl + "api/User/Register", user);
    }

    //GetAllReservation
    GetAllReservation():Observable<Reservation[]>{
        return this.http.get<Reservation[]>(this.baseUrl+"api/Booking/Reservations");
    }

    GetShopByCity(shopCity:any):Observable<Shop[]>{
        return this.http.get<Shop[]>(this.baseUrl+"api/Machine/ShopByCity?city="+shopCity);
    }

    GetUserInfo(userPhoneNo: string | null): Observable<User> {
        //let token = sessionStorage.getItem("token");
        //let prodheaders = new HttpHeaders().set("Authorization", "Bearer " + token);
        console.log("reached",userPhoneNo);
        // api/User/UserPh?phoneNo=0
        return this.http.get<User>(this.baseUrl+"api/User/UserPh?phoneNo=" + userPhoneNo);
    }
    GetBookingsByUserId(userId:any):Observable<Bookings[]>{
        return this.http.get<Bookings[]>(this.baseUrl+"api/Booking/SlotBookingByUserId?id="+userId)
    }
    
    GetReservationById(reservationId:any):Observable<Reservation>{
        return this.http.get<Reservation>(this.baseUrl+"api/Booking/ReservationsById?id="+reservationId);
    }
    UpdateReservation(reservationId:any,reservation:Reservation):Observable<Reservation>{
        return this.http.put<Reservation>(this.baseUrl+"api/Booking/Reservations?id="+reservationId,reservation);
    }
    DeleteReservation(reservationId:any):Observable<Reservation>{
        return this.http.delete<Reservation>(this.baseUrl+ "api/Booking/ReservationsbyId?id="+reservationId);
    }

    GetShopByShopId(shopId:any):Observable<Shop>{
        return this.http.get<Shop>(this.baseUrl+"api/Machine/ShopId?id="+shopId);
    }
    GetBookingsByShopId(shopId:any,datetime:any):Observable<Bookings[]>{
        return this.http.get<Bookings[]>(this.baseUrl+"api/Booking/BookingsByShopId?shopId="+shopId+"&"+"bookingStartTime="+datetime);
        
    }

   

    AddSlotBooking(booking:Bookings,machineName:string):Observable<any>{
        console.log(booking,"uhswg");
       console.log(machineName,"hello",booking)
        let params = new HttpParams();
        
        params.append('machineName',machineName)
        return this.http.post<any>(this.baseUrl+"api/Booking/SlotBooking?machineName="+machineName,booking,{params:params}) 
    }
    GetAllShop():Observable<any>{
        return this.http.get<Shop[]>(this.baseUrl+"api/Machine/Shop")
    }
    AddShop(shop: Shop,id: any): Observable<any> {
        let token = sessionStorage.getItem("token");
        let prodheaders = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this.http.post<any>(this.baseUrl + "api/Machine/Shop?id="+id , shop , { headers: prodheaders });    
    }

    UpdateShop(id: any, shop: Shop): Observable<Shop> {
        let token = sessionStorage.getItem("token");
        let prodheaders = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this.http.put<Shop>(this.baseUrl + "api/Machine/Shop?id=" + id, shop, { headers: prodheaders });
    }

    DeleteShop(id: any): Observable<Shop> {
        let token = sessionStorage.getItem("token");
        let prodheaders = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this.http.delete<Shop>(this.baseUrl + "api/Machine/Shop?id=" + id, { headers: prodheaders });

    }
    GetShopsByUserId(id :any): Observable<Shop[]> {
        let token = sessionStorage.getItem("token");
        let prodheaders = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this.http.get<Shop[]>(this.baseUrl + "api/Machine/ShopByUserId?id="+ id, { headers: prodheaders });
    }
    GetAllShops(): Observable<Shop[]> {
        let token = sessionStorage.getItem("token");
        let prodheaders = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this.http.get<Shop[]>(this.baseUrl + "api/Machine/Shop", { headers: prodheaders });
    }
    GetMachinesByUserId(id :any): Observable<Machine[]> {
        let token = sessionStorage.getItem("token");
        let prodheaders = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this.http.get<Machine[]>(this.baseUrl + "api/Machine/MachineByUserId?id=" + id, { headers: prodheaders });
    }
    GetAllMachines(): Observable<Machine[]> {
        let token = sessionStorage.getItem("token");
        let prodheaders = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this.http.get<Machine[]>(this.baseUrl + "api/Machine/Machine", { headers: prodheaders });
    }
    GetMachinesByShopId(id :any): Observable<Machine[]> {
        let token = sessionStorage.getItem("token");
        let prodheaders = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this.http.get<Machine[]>(this.baseUrl + "api/Machine/MachineByShopId?id=" + id, { headers: prodheaders });
    }
    GetMachineByMachineId(id:any):Observable<Machine>{
        let token = sessionStorage.getItem("token");
        let prodheaders = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this.http.get<Machine>(this.baseUrl + "api/Machine/MachineId?machineId="+id, { headers: prodheaders });
    }

    AddMachine(machine:Machine ): Observable<any> {
        let token = sessionStorage.getItem("token");
        let prodheaders = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this.http.post<any>(this.baseUrl + "api/Machine/Machine",machine, { headers: prodheaders });    
    }
    UpdateMachine(id: any, machine: Machine): Observable<Machine> {
        let token = sessionStorage.getItem("token");
        let prodheaders = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this.http.put<Machine>(this.baseUrl + "api/Machine/Machine?id=" + id, machine, { headers: prodheaders });

    }

    DeleteMachine(id: any): Observable<Machine> {
        let token = sessionStorage.getItem("token");
        let prodheaders = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this.http.delete<Machine>(this.baseUrl + "api/Machine/Machine?id=" + id, { headers: prodheaders });

    }
    AddReservation(reservation:Reservation):Observable<any>{
        return this.http.post<any>(this.baseUrl+"api/Booking/Reservations",reservation)
        .pipe(catchError((error)=>{
        return error.error;
        }
        ));
    }
    GetAllBookings(): Observable<Bookings[]> {
        let token = sessionStorage.getItem("token");
        let prodheaders = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this.http.get<Bookings[]>(this.baseUrl + "api/Booking/SlotBooking", { headers: prodheaders });      
    }
    UnlockMachine(machineName: string, pin: number): Observable<boolean> {
        let params = new HttpParams()
        params.append("machineName", machineName)
        params.append("pin", pin)
        // console.log(machineName, pin, "Anand")
        return this.http.post<boolean>(this.baseUrl + "api/Machine/Unlock?machineName=" + machineName + "&" + "pin=" + pin, { params: params });
    }
    DeleteSlotBooking(id:any):Observable<any>{ 

        return this.http.delete<any>(this.baseUrl+"api/Booking/SlotBookingById?id="+id) 

    } 

    DeleteSlotBookingByMachineId(id:any):Observable<any>{ 

        return this.http.delete<any>(this.baseUrl+"api/Booking/SlotBookingByMachineId?id="+id) 

    } 

    DeleteSlotBookingByShopId(id:any):Observable<any>{ 

        return this.http.delete<any>(this.baseUrl+"api/Booking/SlotBookingByShopId?id="+id) 

    } 

 
}   