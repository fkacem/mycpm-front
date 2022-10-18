import { DefinitiveOrder } from "./DefinitiveOrder";
import { ItemRealised } from "./ItemRealised";
import { ItemUsed } from "./ItemUsed";
import { Type } from "./Type";

export interface Item{

  id? : number;
  name? : string;
  code? : string;
  item_class? : string;

  type? : Type;
  itemsUsed?: ItemUsed[];
  definitiveOrders?: DefinitiveOrder[];
  itemsRealised?: ItemRealised[];

}
