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

@Component({
  selector: 'app-view-coupons',
  imports: [MatCardModule, MatIcon, CurrencyPipe, MatButtonModule, MatDialogModule],
  templateUrl: './view-coupons.component.html',
  styleUrl: './view-coupons.component.scss'
})

export class ViewCoupons implements OnInit{
    public currentUser: userModel = JSON.parse(localStorage.getItem('currentUser') || '{}')
    public coupons:couponModel[]=[]

  constructor(private dialog: MatDialog,private couponsService:CouponsService, private authService:AuthService){}

  ngOnInit(): void {
    this.getCupons()
  }

    public getCupons() {
    this.authService.login(this.currentUser)
    this.coupons = this.couponsService.getCoupons();
    console.log(this.coupons)
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

