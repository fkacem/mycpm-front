import { ItemRealised } from "./ItemRealised";
import { PurchaseOrder } from "./PurchaseOrder";
import { WorkOrder } from "./WorkOrder";

export interface Attachment{
    id? : number;
    code? : string;
    attachmentDate? : Date;
    itemsRealised? : ItemRealised[];
    purchaseOrder?: PurchaseOrder;
    workOrder?:WorkOrder;
}
