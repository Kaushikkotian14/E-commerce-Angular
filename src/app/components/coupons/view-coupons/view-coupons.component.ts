import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { CouponsDialog } from '../coupons-dialog/coupons-dialog.component';
import { CouponsService } from '../../../core/services/coupons.service';
import { AuthService } from '../../../core/services/auth-service.service';
import { userModel } from '../../../core/models/user.model';
import { couponModel } from '../../../core/models/coupon.model';
import { couponMappingModel } from '../../../core/models/coupon-mapping.model';
import { MatMenuModule } from '@angular/material/menu';
import { productModel } from '../../../core/models/product.model';

@Component({
  selector: 'app-view-coupons',
  imports: [MatCardModule, MatIcon, CurrencyPipe, MatButtonModule, MatDialogModule,MatMenuModule],
  templateUrl: './view-coupons.component.html',
  styleUrl: './view-coupons.component.scss'
})

export class ViewCoupons implements OnInit{
    public currentUser: userModel = JSON.parse(localStorage.getItem('currentUser') || '{}')
    public coupons:couponModel[]=[]
    public products:productModel[]=[]
    public couponMappings!:couponMappingModel[]
  constructor(private dialog: MatDialog,private couponsService:CouponsService, private authService:AuthService){}

  ngOnInit(): void {
    this.getCupons()
  }

    public getCupons() {
    this.authService.login(this.currentUser)
    this.coupons = this.couponsService.getCoupons();
  }

  public openCouponDialog(){
  const dialogRef = this.dialog.open(CouponsDialog, {
          width: '400px',
        });
        dialogRef.afterClosed().subscribe(result => { 
          this.getCupons();
        });
      }
  
      public deleteCoupon(id:number){
        this.couponsService.deleteCoupon(id)
        this.getCupons()
      }

  }

