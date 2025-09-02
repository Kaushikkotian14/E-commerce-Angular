import { userModel } from "./user.model";
import { productModel } from "./product.model";

export interface orderModel{
   orderId:number;
   userId:number;
   orderedDate:Date;
   address:string;
   quantity:number;
   totalCost:number;
   userEmail:string;
   product:productModel;
}