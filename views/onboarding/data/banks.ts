export type BankOption = {
  value: string;
  label: string;
};

export const BANKS_OPTIONS: BankOption[] = [
  // --- Commercial banks registered in Thailand ---
  { value: "BBL",   label: "Bangkok Bank (BBL)" },
  { value: "KBank", label: "Kasikornbank (KBank)" },
  { value: "SCB",   label: "Siam Commercial Bank (SCB)" },
  { value: "KTB",   label: "Krungthai Bank (KTB)" },
  { value: "BAY",   label: "Bank of Ayudhya (Krungsri) (BAY)" },
  { value: "TTB",   label: "TMBThanachart Bank (TTB)" },
  { value: "KKP",   label: "Kiatnakin Phatra Bank (KKP)" },
  { value: "TISCO", label: "TISCO Bank (TISCO)" },
  { value: "LHBank",label: "Land & Houses Bank (LHBank)" },
  { value: "CIMBT", label: "CIMB Thai Bank (CIMBT)" },
  { value: "UOBT",  label: "United Overseas Bank (Thai) (UOBT)" },
  { value: "SCBT",  label: "Standard Chartered Bank (Thai) (SCBT)" },
  { value: "ICBCT", label: "ICBC (Thai) (ICBCT)" },
  { value: "TCRB",  label: "Thai Credit Bank (TCRB)" }, // formerly Thai Credit Retail Bank; renamed Sep 1, 2023

  // --- State-owned Specialized Financial Institutions (SFIs) ---
  { value: "GSB",   label: "Government Savings Bank (GSB)" },
  { value: "BAAC",  label: "Bank for Agriculture and Agricultural Cooperatives (BAAC)" },
  { value: "GHB",   label: "Government Housing Bank (GHB)" },
  { value: "EXIM",  label: "Export–Import Bank of Thailand (EXIM Thailand)" },
  { value: "SME",   label: "SME Development Bank of Thailand (SME Bank)" },
  { value: "IBank", label: "Islamic Bank of Thailand (iBank)" }
];