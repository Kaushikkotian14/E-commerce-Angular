import { userModel } from "./user.model";
import { productModel } from "./product.model";

export interface cartModel{
   cartId:number;
   userEmail:userModel["email"];
   product:productModel;
   status:boolean
}