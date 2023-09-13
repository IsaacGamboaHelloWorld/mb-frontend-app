export interface IRentEntities {
  specificErrorMessage: string;
  success: boolean;
  errorMessage: string;
  documentResponse: [
    {
      trnImage: [
        {
          binLength: any;
          documentType: string;
          checksum: any;
          contentType: any;
          binData: string;
        }
      ];
      dateStored: string;
      name: string;
      documentTypeId: string;
      documentId: string;
      type: string;
      keyword: any[];
      latestRevision: string;
    }
  ];
  approvalId: string;
}

export interface ICertificatePeriodRequest {
  taxYear: string;
}

export interface ICertificateGMFResponse {
  errorMessage: string;
  fileUrl: string;
  base64: string;
  name: string;
  success: boolean;
}

export interface ICertificateIncomeTaxesResponse {
  errorMessage: string;
  fileUrl: string;
  base64: string;
  name: string;
  success: boolean;
}

export interface ICertificateRACResponse {
  errorMessage: string;
  fileUrl: string;
  base64: string;
  name: string;
  success: boolean;
}
