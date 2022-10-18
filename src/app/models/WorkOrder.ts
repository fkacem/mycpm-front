import { Attachment } from "./Attachment";
import { DefinitiveOrder } from "./DefinitiveOrder";
import { PurchaseOrder } from "./PurchaseOrder";

export interface WorkOrder{

    id? : number;

    code? : string;
    orderDate? : Date;
    startDate? : Date;
    limit? : number;
    amount? : number;

    purchaseOrder? : PurchaseOrder;
    definitiveOrders?: DefinitiveOrder[];
    attachments? : Attachment[];
}