import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedataService {

  constructor() { }

  public shop?:any
  public subject = new Subject<any>();    
  public shopSource = new BehaviorSubject(this.shop);

  currentshop = this.shopSource.asObservable();
  changeShop(_shop:any){
    this.shopSource.next(_shop);

  }

  public toggle?:boolean
  public toggleSource = new BehaviorSubject(this.toggle);

  currentToggle = this.toggleSource.asObservable();
  changeToggle(_toggle:boolean){
    this.toggleSource.next(_toggle);
  }

  
}
