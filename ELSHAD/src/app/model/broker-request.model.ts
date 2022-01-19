export interface BrokerRequestItem {
  expenses:        Expense[];
  transportNo:     string;
  transportTypeId: number;
  notes:           string;
  documentTypes:   DocumentType[];
  documents:       fileDetails[];
  transportTypes:  TransportType[];
  docNo:           string;
  customerName:    string;
  date:            string;
  totalCost:       number;
  orderStatus?:    number;
}

export interface DocumentType {
  documentTypeId: number;
  name:           string;
}

export interface fileDetails {
  documentTypeId: number;
  uri:            string;
  fileId:         number;
}

export interface Expense {
  id:         number;
  isSelected: boolean;
  text:       string;
}

export interface TransportType {
  id:   number;
  text: string;
}


