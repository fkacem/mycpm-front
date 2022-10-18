import { Item } from "./Item";
import { WorkOrder } from "./WorkOrder";

export interface DefinitiveOrder{

    id? : number;

    quantity? : string;
    
    workOrder? : WorkOrder;
    item? : Item;
    

}