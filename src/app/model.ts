export interface Vendor {
    name: string;
    accountNumber: string;
    bankCode: string;
    description: string;
  }

export interface VendorGet {
  name: string;
  accountNumber: string;
  bankName: string;
  description: string;
}

export interface TransfersModel {
  recipient: string;
  amount: string;
}
