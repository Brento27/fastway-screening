export type FranchiseInfo = {
  FranchiseCode: string;
  FranchiseName: string;
  Phone: string;
  Fax: string;
  Add1: string;
  Add2: string;
  Add3: string;
  Add4: string;
  EmailAddress: string;
};

export function printFranchiseInfo(info: FranchiseInfo) {
  console.log(`Franchise: ${info.FranchiseName} (${info.FranchiseCode})`);
  console.log(`Address: ${info.Add1}, ${info.Add2}`);
  if (info.Add3) console.log(info.Add3);
  if (info.Add4) console.log(info.Add4);
  console.log(`Contact: Phone - ${info.Phone}, Fax - ${info.Fax}`);
  console.log(`Email: ${info.EmailAddress}`);
}
