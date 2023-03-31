import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientbookingsComponent } from './clientbookings.component';

describe('ClientbookingsComponent', () => {
  let component: ClientbookingsComponent;
  let fixture: ComponentFixture<ClientbookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientbookingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
