import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingwindowComponent } from './bookingwindow.component';

describe('BookingwindowComponent', () => {
  let component: BookingwindowComponent;
  let fixture: ComponentFixture<BookingwindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingwindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
