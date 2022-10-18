import { Organization } from "./Organization";
import { Profession } from "./Profession";
import { PurchaseOrder } from "./PurchaseOrder";

export interface Market{

  id? : number;
  name? : string;
  code? : string;
  budget? : string;
  type? : string;
  unit? : string;
  amount? : number;
  limit? : number;
  profession?: Profession;
  organization?: Organization;
  purchaseOrders?: PurchaseOrder[];
}
