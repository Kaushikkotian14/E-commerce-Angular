import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCoupons } from './view-coupons';

describe('ViewCoupons', () => {
  let component: ViewCoupons;
  let fixture: ComponentFixture<ViewCoupons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCoupons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCoupons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
