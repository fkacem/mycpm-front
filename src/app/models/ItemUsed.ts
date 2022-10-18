import { Item } from "./Item";
import { PurchaseOrder } from "./PurchaseOrder";

export interface ItemUsed{

  id? : number;
  quantity? : number;
  price? : number;
  item? : Item;

}
