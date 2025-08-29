import { userModel } from "./user.model";
import { productModel } from "./product.model";

export interface orderModel{
   orderId:number;
   orderedDate:Date;
   userEmail:userModel["email"];
   product:productModel;
}