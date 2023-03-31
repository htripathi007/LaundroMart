import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerregistrationComponent } from './ownerregistration.component';

describe('OwnerregistrationComponent', () => {
  let component: OwnerregistrationComponent;
  let fixture: ComponentFixture<OwnerregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerregistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
