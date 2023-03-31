import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopmachinedetailComponent } from './shopmachinedetail.component';

describe('ShopmachinedetailComponent', () => {
  let component: ShopmachinedetailComponent;
  let fixture: ComponentFixture<ShopmachinedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopmachinedetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopmachinedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
