import {useEffect, useState} from 'react';

interface LoanCalculatorProps {
  loanAmount: number;
  assetCost: number;
  tenure: number;
}

interface LoanCalculatorResult {
  ltv: number;
  gst: number;
  netDisbAmount: number;
  marginMoney: number;
  Downpayment: number;
  EMI: number;
}

const useLoanCalculator = ({
  loanAmount,
  assetCost,
  tenure,
}: LoanCalculatorProps): LoanCalculatorResult => {
  const [gst, setGst] = useState<number>(0);
  const [netDisbAmount, setNetDisbAmount] = useState<number>(0);
  const [marginMoney, setMarginMoney] = useState<number>(0);
  const [Downpayment, setDownpayment] = useState<number>(0);
  const [EMI, setEmi] = useState<number>(0);
  const [ltv, setLTV] = useState<number>(0);

  const calculateValues = (): void => {
    const calculatedPf = (loanAmount * 0.05) / 1.18;
    const calculatedLTV = (loanAmount * 9) / 10;
    setLTV(calculatedLTV);
    const calculatedGst = loanAmount * 0.05 - calculatedPf;
    setGst(calculatedGst);

    const calculatedNetDisbAmount = loanAmount - calculatedPf - calculatedGst;
    setNetDisbAmount(calculatedNetDisbAmount);

    const calculatedMarginMoney = assetCost - loanAmount;
    setMarginMoney(calculatedMarginMoney);

    const calculatedDownpayment = calculatedMarginMoney + calculatedPf;
    setDownpayment(calculatedDownpayment);

    const monthlyInterestRate = 0.18 / 12;
    const numberOfPayments = tenure * 12;
    const emiAmount =
      (loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    setEmi(emiAmount);
  };

  useEffect(() => {
    calculateValues();
  }, [loanAmount, assetCost, tenure]);

  return {
    ltv,
    gst,
    netDisbAmount,
    marginMoney,
    Downpayment,
    EMI,
  };
};

export default useLoanCalculator;
