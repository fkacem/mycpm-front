import { Attachment } from "./Attachment";
import { ItemUsed } from "./ItemUsed";
import { Market } from "./Market";
import { WorkOrder } from "./WorkOrder";

export interface PurchaseOrder{

    id? : number;

    code? : String;
    amount? : number;
    limit? : number;
    startDate? : Date;
    itemsUsed?:ItemUsed;
    workOrders?:WorkOrder[];
    market?:Market;
    attachment?:Attachment[];
}
