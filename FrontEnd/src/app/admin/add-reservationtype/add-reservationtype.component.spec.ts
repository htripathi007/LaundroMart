import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReservationtypeComponent } from './add-reservationtype.component';

describe('AddReservationtypeComponent', () => {
  let component: AddReservationtypeComponent;
  let fixture: ComponentFixture<AddReservationtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReservationtypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReservationtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
