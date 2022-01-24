export class BrokerItem {
    'orderId': number;
    'docNo': string;
    'date': string;
    'customer': string;
    'gbNo': string;
    'amount': number;
    'invoiceNotesLabel': string;
    'orderStatusId': number;
    'orderStatusText': string;
    'select':boolean;
    'notes': 'string';
    'transportTypeId': number;
    'transportNumber': 'string';
    'paymentMethod': 'string';
    'paymentStatus': 'paymentStatus';
    'expenses': [
    {
      'id': number
    }
  ];
    'fileDetails': [
    {
      'fileId': number
      'docTypeId': number
    }
  ];
}





