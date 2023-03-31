import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnermachinedetailComponent } from './ownermachinedetail.component';

describe('OwnermachinedetailComponent', () => {
  let component: OwnermachinedetailComponent;
  let fixture: ComponentFixture<OwnermachinedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnermachinedetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnermachinedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
