export interface CompanyInfo {
  contactName: string;
  company: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  address5: string;
  address6: string;
  address7: string;
  address8: string;
  comment: string;
}

export interface ParcelData {
  Type: string;
  Courier: string;
  Description: string;
  Date: string;
  RealDateTime: string;
  Name: string;
  Franchise: string;
  Status: string;
  StatusDescription: string;
  CompanyInfo: CompanyInfo;
  UploadDate: string;
  Signature: string;
  ParcelConnectAgent: string | null; // Assuming this can be any type or null
}
