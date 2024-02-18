export const RemovePrefixes = (value: string) =>
  String(value.replace(/,/g, '').replace(/₹/g, ''));

export const ConvertToPrefixedAmount = (value: string) => {
  value = value.replace(/,/g, '').replace(/₹/g, '');

  if (!isNaN(Number(value))) {
    value = Number(value).toLocaleString('en-IN');
  }
  //   ₹
  const prefixedValue = `${value}`;

  return prefixedValue;
};

export const ConvertToPrefixedAmountWithRupee = (value: string) => {
  value = value.replace(/,/g, '').replace(/₹/g, '');

  if (!isNaN(Number(value))) {
    value = Number(value).toLocaleString('en-IN');
  }
  //   ₹
  const prefixedValue = `₹\b${value}`;

  return prefixedValue;
};

export const ConvertToPrefixedAadharNumber = (value: string) => {
  const formattedValue = value.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
  const prefixedValue =
    formattedValue.length === 4 || formattedValue.length === 8
      ? `${formattedValue} `
      : formattedValue;

  return prefixedValue;
};

export const RemoveAadharPrefix = (value: string) => {
  value = value.replace(' ', '');

  return value;
};
