import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { ModelModule } from 'src/app/model/model.module';
import { FormsModule } from '@angular/forms';
import { OwnerregistrationComponent } from '../ownerregistration/ownerregistration.component';
import { UserregistrationComponent } from '../userregistration/userregistration.component';




@NgModule({
  declarations: [LoginComponent,OwnerregistrationComponent,UserregistrationComponent],
  imports: [
    CommonModule,AppRoutingModule,ModelModule,FormsModule
  ]
})
export class AccountModule { }
