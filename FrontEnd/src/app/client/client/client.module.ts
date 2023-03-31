import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SidebarModule } from 'ng-sidebar';
import { ClientsidebarComponent } from '../clientsidebar/clientsidebar.component';
import { GetshopsbycityComponent } from '../getshopsbycity/getshopsbycity.component';
import { BookingsbyidComponent } from '../bookingsbyid/bookingsbyid.component';
import { BookingwindowComponent } from '../bookingwindow/bookingwindow.component';
import { ClientbookingsComponent } from '../clientbookings/clientbookings.component';
import { NgxPaginationModule} from 'ngx-pagination'
import { FormsModule } from '@angular/forms';
import { ClientprofileComponent } from '../clientprofile/clientprofile.component';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';




@NgModule({
  declarations: [
    ClientsidebarComponent, 
    GetshopsbycityComponent, 
    BookingsbyidComponent, 
    BookingwindowComponent, 
    ClientbookingsComponent,
  ClientprofileComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SidebarModule.forRoot(),
    NgxPaginationModule,FormsModule,DateTimePickerModule
   
  ]
})
export class ClientModule { }
