import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineLockComponent } from './machine-lock.component';

describe('MachineLockComponent', () => {
  let component: MachineLockComponent;
  let fixture: ComponentFixture<MachineLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineLockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
