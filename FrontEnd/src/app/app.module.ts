import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { LoginComponent } from './account/login/login.component';
// import { OwnerregistrationComponent } from './account/ownerregistration/ownerregistration.component';
// import { UserregistrationComponent } from './account/userregistration/userregistration.component';
import { AccountModule } from './account/account/account.module';

import { SidebarModule } from 'ng-sidebar';
import { ModelModule } from './model/model.module';
import { AdminModule } from './admin/admin/admin.module';

import { FormsModule } from '@angular/forms';
import { MachineLockComponent } from './machine-lock/machine-lock/machine-lock.component';
import { OwnerModule } from './owner/owner/owner.module';
import { ClientModule } from './client/client/client.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MachineLockComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountModule,
    SidebarModule.forRoot(),    
    ClientModule,
    AdminModule,
    FormsModule,
    OwnerModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
