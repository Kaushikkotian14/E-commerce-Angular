import { userModel } from "./user.model";
import { productModel } from "./product.model";

export interface cartModel{
   cartId:number;
   userId:number;
   userEmail?:userModel["email"];
   quantity:number;
   totalCost:number;
   product:productModel;
}