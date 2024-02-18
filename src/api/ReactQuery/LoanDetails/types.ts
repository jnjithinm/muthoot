import { ApiResponse, BaseModule } from '..';

type vechileType = {
  id: number;
  category: string;
};

export type vechileTypeRequest = {
  manufacturer: string;
}

export type vechileTypeResponse = vechileType[] | null;

type manufactureType = {
  id: number;
  manufacture: string;
};

export type manufactureRequest = {
  vechileType: string;
}

export type manufactureResponse = manufactureType[] | null;

type modelType = {
  id: number;
  assetId: string;
  assetCode: string;
  model: string;
  modelCode: string;
  price: number;
  manufacture: string;
  category: string;
};

export type modelRequest = {
  vechileType: string;
  vechileManufacturer: string;
}

export type modelResponse = modelType[] | null;




export type DealerTypeDto = {
  id: number;
  dealerName: string;
  dealerCode: string;
  dealerAndBranch: string;
};

export type delarResponse = {
  error: boolean;
  dealerTypeDto: DealerTypeDto[];
} | null

export type delarRequest = {
  appId: string;
}


export type subDealerTypeDto = {
  id: number;
  subDealername: string;
  subDealerCode: string;
};

export type subDelarResponse = {
  error: boolean;
  subDealerTypeDto: subDealerTypeDto[];
} | null

export type subDelarRequest = {
  dealerCode: string;
  applicantType?: string;
}

type branchType = {
  id: number;
  branchId: number;
  branchName: string;
  branchCode: string;
  city: string;
  cityCode: string;
  state: string;
  stateCode: string;
  stateId: string;
  brnachNameCode: string;
};

export type branchRequest = {
  appId: string;
}

export type branchResponse = branchType[] | null;

type franchiseType = {
  franchiseId: string;
  code: string;
};

export type franchiseResponse = franchiseType[] | null;



export type getSchemeDetailsRequest = {
  schemeCode: string;
  appId: string;
  schemeName: string;
  applicantType?: string;
}

export type getSchemeDetailsResponse = {
  id: number;
  schemeCode: string;
  schemeName: string;
  sourcing: string;
  manufacturer: string;
  rateOfInterest: number;
  netYield: string;
  dealerIncentive: string;
  advanceEmi: number;
  serviceCharge: string;
  state: string;
  dealer: string;
  ltv: string;
  minMarginAmount: string,
  maxLoanAmount: string ,
} | null;

type getAllschemeDetails = {
  schemeCode: string;
  schemeName: string;
};

export type getAllSchemeDetailsRequest = {
  appId: string;
  vechicleType: string;
  vechicleModel: string;
  manufacturer: string;
  applicantType: string;
};

export type getAllSchemeDetailsResponse = getAllschemeDetails[] | null;



export type getRoadtaxResponse = {
  id: number;
  zone: string;
  state: string;
  roadTax: string;
  registration: string;
  scooter: string;
  motorCycle: string;
  mopeds: string;
  roadTaxCalculated: string;
  accessories: string;
  exShowRoomPrice: string;
  dob: string
} | null;


type getTenureDetails = {
  id: number;
  schemeCode: string;
  schemeName: string;
  tenure: string;
  roi: number;
  dealerIncentive: string;
  pliAmount: string;

};

export type getTenureResponse = getTenureDetails[] | null;

export type emiRequest = {
  loanAmount: number,
  tenureInMonths: number,
  flatRate: number,
  appId: string;
  applicantType?: string;
  schemeCode: string;
  schemeName: string;
}

export type emiResponse = {
  appId: null | string;
  loanAmount: null | number;
  loanDisbursementDate: null | string; // You can use a specific date format here
  firstDueDate: null | string; // You can use a specific date format here
  tenureInMonths: null | number;
  flatRate: null | number;
  emiAdvance: null | number;
  emiAmount: number;
  bpiPeriodInDays: number;
  serviceCharges: string,
  documentationCharges: string;
  bpi: null | number;
  emiWithBpi: number;
  repaymentMode: string;
  companyProofId: string;
  vintageProof: string;
  error: boolean;
} | null;


export type pliRequest = {
  applicantId: string;
  loanAmount: string;
  tenure: string;
}

export type pliResponse = {
  applicantId: string;
  dateOfBirth: string;
  tenure: string;
  loanAmount: string;
  insurer: string;
  premium: number;
  statusMessage: string;
}| null;

export type setDearshipDetailsResponse = {

} | null;

export type setDearshipDetailsRequest = {
  appId: string;
  sourcedBy: string;
  dealerName: string;
  dealerCode: any;
  subDealerCode: string;
  subDealerName: string;
  franchiseSourcedBy: string;
  branchName: string;
  branchCode: string;
  employeeCode: string;
  accountConductsSatisfatcory: string;
  isExistingCustomerFranchise: boolean;
  applicantType?: string;
  isUpdatedBy: string;
  dealerAndBranch: string;
} | null

export type getDearshipDetailsResponse = {
  id: number;
  appId: string;
  sourcedBy: string;
  dealerName: string;
  dealerCode: string;
  subDealerCode: string;
  subDealerName: string;
  franchiseSourcedBy: string;
  branchName: string;
  branchCode: string;
  employeeCode: string;
  accountConductsSatisfatcory: string;
  isExistingCustomerFranchise: boolean;
  dealerAndBranch: string;
} | null

export type setLoanDetailsRequest = {
  appId: string;
  applicantType?: string;
  updatedBy?: string;
  schemeName: string;
  schemeId: string;
  loanAmountRequested: number;
  tenure: number;
  roi: number;
  ltv: number;
  maxLoanAmount: number;
  noOfAdvanceEmi: number;
  emiAmount: number;
  minAndMaxTenure: number;
  margin: number;
  isCli: boolean;
  isCliAddLoan: boolean;
  cliAmount:number;
  isPli: boolean;
  isPliAddLoan: boolean;
  pliAmount:number;
  finalLoanAmount: number;
  unsignedSanctionLetter: string;
  signSanctionLetter: string;
  remarks: string;
  manufacturer: string;
  vehicleType: string;
  vehicleModel: string;
  assetCode: string;
  exShowRoomPrice: number;
  roadTax: number;
  insurance: number;
  registrationCharges: number;
  accessories: number;
  ltvAmount: number;
  approvedLoanAmount: number;
  on_road_price: number;
  downPayment: number;
  addOnCharges: number;
  repaymentMode: string;
  companyProofId: string;
  vintageProof: string;
  serviceCharges: number,
  documentationCharges: number;
} | null

export type setLoanDetailsResponse = {

} | null


export type getLoanDetailsResponse = {
  id: number;
  appId: string;
  schemeName: string;
  schemeId: string;
  loanAmountRequested: number;
  tenure: number;
  roi: number;
  ltv: number;
  maxLoanAmount: number;
  noOfAdvanceEmi: number;
  emiAmount: number;
  minAndMaxTenure: number;
  margin: number;
  isCli: boolean;
  isCliAddLoan: boolean;
  cliAmount:number;
  isPli: boolean;
  isPliAddLoan: boolean;
  pliAmount:number;
  finalLoanAmount: number;
  unsignedSanctionLetter: string;
  signSanctionLetter: string;
  remarks: string;
  manufacturer: string;
  vehicleType: string;
  vehicleModel: string;
  assetCode: string;
  exShowRoomPrice: number;
  roadTax: number;
  insurance: number;
  registrationCharges: number;
  accessories: number;
  ltvAmount: number;
  approvedLoanAmount: number;
  on_road_price: number;
  downPayment: number;
  addOnCharges: number;
  serviceCharges: string,
  documentationCharges: string;
} | null;

export type getInsuranceCapResponse = {
  id: number;
  vechileType: string;
  insuranceAmnt: number;
  maxCapAmnt: number;
  accessories: boolean;
} | null; 

export type VehicalType = BaseModule & {
  GetVehicalType: (vechileTypeRequest: string) => Promise<ApiResponse<vechileTypeResponse>>;
  GetFranchise: () => Promise<ApiResponse<franchiseResponse>>;
  GetManufacturer: () => Promise<ApiResponse<manufactureResponse>>;
  GetModel: (modelRequest: string) => Promise<ApiResponse<modelResponse>>;
  GetDelar: (delarRequest: string) => Promise<ApiResponse<delarResponse>>;
  GetAllSchemeDetails: (request: getAllSchemeDetailsRequest) => Promise<ApiResponse<getAllSchemeDetailsResponse>>;
  GetRoadTax: (getRoadTaxRequest: string) => Promise<ApiResponse<getRoadtaxResponse>>;
  GetTenure: (getTenureRequest: string) => Promise<ApiResponse<getTenureResponse>>;
  GetDearshipDetails: (getDearshipDetailsRequest: string) => Promise<ApiResponse<getDearshipDetailsResponse>>;
  GetLoanDetails: (getLoanDetailsRequest: string) => Promise<ApiResponse<getLoanDetailsResponse>>;
  GetSubDelar: (
    request: subDelarRequest,
  ) => Promise<ApiResponse<subDelarResponse>>;
  GetBranch: (
    branchRequest: string,
  ) => Promise<ApiResponse<branchResponse>>;
  GetSchemeDetails: (
    request: getSchemeDetailsRequest,
  ) => Promise<ApiResponse<getSchemeDetailsResponse>>;
  GetEMIValue: (
    request: emiRequest,
  ) => Promise<ApiResponse<emiResponse>>;
  GetPLIValue: (
    request: pliRequest,
  ) => Promise<ApiResponse<pliResponse>>;
  SetDearshipDetails: (
    request: setDearshipDetailsRequest,
  ) => Promise<ApiResponse<setDearshipDetailsResponse>>;
  SetLoanDetails: (
    request: setLoanDetailsRequest,
  ) => Promise<ApiResponse<setLoanDetailsResponse>>;
  GetInsuranceCap: (request: string) => Promise<ApiResponse<getInsuranceCapResponse>>;

};
