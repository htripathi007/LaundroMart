import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetshopsbycityComponent } from './getshopsbycity.component';

describe('GetshopsbycityComponent', () => {
  let component: GetshopsbycityComponent;
  let fixture: ComponentFixture<GetshopsbycityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetshopsbycityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetshopsbycityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
