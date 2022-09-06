export interface BrokerRequestItem {
  expenses: Expense[];
  transportNo: string;
  brFreightAmount:any;
  transportTypeId: number;
  brPaymentTypeId:number;
  brCustomsBorderOfficeId:number;
  brCustomsOfficeId:number;
  notes: string;
  documentTypes: DocumentType[];
  documents: fileDetails[];
  transportTypes: TransportType[];
  brPaymentTypes: BrPaymentTypes[];
  brCustomsBorderOffice:BrCustomsBorderOffice[];
  brCustomsOffice:BrCustomsOffice[];
  brPincode:string;
  brWarehouse:string;
  customPointId:number;
  destinationId:number;
  docNo: string;
  customerName: string;
  date: Date;
  totalCost: number;
  orderStatus?: number;
}

export interface DocumentType {
  documentTypeId: number;
  name: string;
}

export interface fileDetails {
  documentTypeId: number;
  uri: string;
  fileId: number;
  name?: string;
}

export interface Expense {
  id: number;
  isSelected: boolean;
  text: string;
}

export interface TransportType {
  id: number;
  text: string;
}
export interface CustomBorderPoint {
  id: number;
  text: string;
}
export interface DestinationCustomPoint {
  id: number;
  text: string;
}
export interface BrPaymentTypes {
  id: number;
  text: string;
}
export interface BrCustomsBorderOffice {
  id: number;
  text: string;
}
export interface BrCustomsOffice {
  id: number;
  text: string;
}
