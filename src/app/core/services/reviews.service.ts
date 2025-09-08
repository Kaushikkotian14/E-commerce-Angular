import { Injectable } from '@angular/core';
import { userModel } from '../models/user.model';
import { reviewModel } from '../models/product-reviews.model';
import { Product } from '../../core/services/product.service';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Reviews {
  public currentUser: userModel = JSON.parse(localStorage.getItem('currentUser') || '{}')
  public productService = Inject(Product);
  public getReviews(): reviewModel[] {
    return JSON.parse(localStorage.getItem('reviews') || '[]')
  }

  public addReviews(productId: number, reviewText: string) {
    const reviews = this.getReviews();
    const review: reviewModel = {
      reviewId: Math.floor(Math.random() * 100000),
      userId: this.currentUser.userId,
      username: this.currentUser.username,
      productId: productId,
      reviewDate: new Date(),
      review: reviewText
    };
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }

  public deleteReview(id: number) {
    const reviews = this.getReviews();
    if (confirm("Are you sure you want to remove")) {
      const index = reviews.findIndex(data => data.reviewId == id);
      reviews.splice(index, 1);
      localStorage.setItem('reviews', JSON.stringify(reviews))
    }
  }
}

