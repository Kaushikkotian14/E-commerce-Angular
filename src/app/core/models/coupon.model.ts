export interface couponModel{
    couponId:number;
    couponCode:string;
    discount:number;
    maxAmount:number;
    minQuantityCost:number;
    status?:string;
}