import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsDialog } from './coupons-dialog';

describe('CouponsDialog', () => {
  let component: CouponsDialog;
  let fixture: ComponentFixture<CouponsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
