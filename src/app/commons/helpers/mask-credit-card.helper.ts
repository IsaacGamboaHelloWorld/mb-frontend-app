export const spaceCreditCardHelper = (value: string = ''): string => {
  if (!!value && value !== '') {
    if (value.length <= 8) {
      return value?.toString()?.replace(/([0-9]{4})([0-9*])/, '$1 $2');
    } else if (value.length >= 9 && value.length <= 13) {
      return value
        ?.toString()
        .replace(/([0-9]{4})([0-9]{4})([0-9*])/, '$1 $2 $3');
    } else {
      return value
        ?.toString()
        ?.replace(/([0-9]{4})([0-9]{4})([0-9]{4})([0-9*])/, '$1 $2 $3 $4');
    }
  } else {
    return '';
  }
};

export const maskCreditCardHelper = (value: string): string => {
  if (!!value) {
    let cardId = '';
    const id = value?.toString()?.match(/(.{3,4})$/);
    if (!!id) {
      const length2change = value?.indexOf(id[0]);
      const returnData = value.slice(0, length2change);
      cardId = returnData?.replace(/[0-9]/g, '•');
      return cardId + id[0];
    }
    return value;
  }
  return value;
};
