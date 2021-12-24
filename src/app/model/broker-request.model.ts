// export interface BrokerRequestItem {
//   notes:           string;
//   orderStatusId:   number;
//   transportTypeId: number;
//   transportNumber: string;
//   expenses:        Expense[];
//   fileDetails:     FileDetail[];
// }

// export interface Expense {
//   id: number;
// }

// export interface FileDetail {
//   fileId:    number;
//   docTypeId: number;
// }
export interface BrokerRequestItem {
    expenses:        Expense[];
    transportNo:     string;
    transportTypeId: number;
    notes:           string;
    documentTypes:   DocumentType[];
    documents:       Document[];
    transportTypes:  TransportType[];
    docNo:           string;
    customerName:    string;
    date:            string;
    totalCost:       number;
}

export interface DocumentType {
    documentTypeId: number;
    name:           string;
}

export interface Document {
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


