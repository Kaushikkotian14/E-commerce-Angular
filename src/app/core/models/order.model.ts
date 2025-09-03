import { cartModel } from "./cart.model";
import { productModel } from "./product.model";

export interface orderModel{
   orderId:number;
   userId:number;
   orderedDate:Date;
   address:string;
   quantity?:number;
   totalCost:number;
   userEmail:string;
   cart?:cartModel[];
   product?:productModel;
}