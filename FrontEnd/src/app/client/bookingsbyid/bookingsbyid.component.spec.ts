import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsbyidComponent } from './bookingsbyid.component';

describe('BookingsbyidComponent', () => {
  let component: BookingsbyidComponent;
  let fixture: ComponentFixture<BookingsbyidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingsbyidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
