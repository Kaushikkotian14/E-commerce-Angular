import { reviewModel } from "./product-reviews.model";
export interface productModel{
    productId:number;
    productName:string;
    img:string[];
    description:string;
    category:string;
    cost:number;
    quantity:number;
    productReview?:reviewModel[]
}
