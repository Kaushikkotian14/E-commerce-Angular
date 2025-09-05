import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import {  MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-product-categories',
  imports: [MatCardModule,MatCardModule,MatButtonModule,MatGridListModule,MatDialogModule,RouterLink],
  templateUrl: './product-categories.component.html',
  styleUrl: './product-categories.component.scss'
})
export class ProductCategories {

}
