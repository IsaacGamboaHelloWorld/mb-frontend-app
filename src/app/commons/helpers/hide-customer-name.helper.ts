export function HideCustomerName(name, hideNumber) {
  const firstValue = name.split(' ')[0];
  const secondValue = name.split(' ')[1];
  const dimension = firstValue.length;

  const firstValueCut = firstValue.slice(0, dimension - hideNumber);
  const firstValueTrans = firstValue
    .slice(dimension - hideNumber)
    .replace(/[^.]/g, '*');

  const finalValue = firstValueCut + firstValueTrans + ' ' + secondValue;
  return finalValue;
}
