const TYPE_VISA_CLASSIC: object = new RegExp('^450658');
const TYPE_VISA_GOLD: object = new RegExp('^454405|453405');
const TYPE_VISA_PLATINUM: object = new RegExp('^406694');
const TYPE_VISA_EXPRESS: object = new RegExp('^485926|474634|474638');
const TYPE_VISA_DIAMOND: object = new RegExp('^420559');
const TYPE_VISA_SIGNATURE: object = new RegExp('^489469');
const TYPE_VISA_ENTERPRISE: object = new RegExp('^454476');
const TYPE_VISA_SIGNATURE_CUP: object = new RegExp('^435729');
const TYPE_VISA_GOLD_CUP: object = new RegExp('^435651');
const TYPE_VISA_HOME: object = new RegExp('^450011');
const TYPE_VISA_LA_14: object = new RegExp('^434761');
const TYPE_VISA_LA_14_GOLD: object = new RegExp('^409648');
const TYPE_VISA_LA_14_PLATINUM: object = new RegExp('^409649');
const TYPE_MC_BLACK: object = new RegExp('^520189');
const TYPE_MC_GOLD: object = new RegExp('^539168');
const TYPE_MC_PLATINUM: object = new RegExp('^539238');
const TYPE_MC_EXPRESS: object = new RegExp('^547598');
const TYPE_MC_ZAFIRO: object = new RegExp('^539814');
const TYPE_MC_CERO: object = new RegExp('^536170');

const validateTypeClassCard = (value: string, regExp: any): boolean => {
  return !!value?.toString()?.match(regExp);
};

export const cardTypeClassMapper = (id: string): string => {
  switch (true) {
    case validateTypeClassCard(id, TYPE_VISA_DIAMOND):
    case validateTypeClassCard(id, TYPE_VISA_PLATINUM):
    case validateTypeClassCard(id, TYPE_VISA_LA_14):
      return 'platinum';
    case validateTypeClassCard(id, TYPE_VISA_SIGNATURE_CUP):
    case validateTypeClassCard(id, TYPE_MC_BLACK):
    case validateTypeClassCard(id, TYPE_MC_EXPRESS):
      return 'signature-cup';
    case validateTypeClassCard(id, TYPE_VISA_EXPRESS):
    case validateTypeClassCard(id, TYPE_VISA_SIGNATURE):
      return 'express';
    case validateTypeClassCard(id, TYPE_VISA_CLASSIC):
      return 'classic';
    case validateTypeClassCard(id, TYPE_VISA_ENTERPRISE):
      return 'enterprise';
    case validateTypeClassCard(id, TYPE_VISA_GOLD_CUP):
      return 'gold-cup';
    case validateTypeClassCard(id, TYPE_VISA_HOME):
      return 'home';
    case validateTypeClassCard(id, TYPE_VISA_GOLD):
      return 'gold';
    case validateTypeClassCard(id, TYPE_VISA_LA_14_GOLD):
      return 'fourteen-gold';
    case validateTypeClassCard(id, TYPE_VISA_LA_14_PLATINUM):
      return 'fourteen-platinum';
    case validateTypeClassCard(id, TYPE_MC_GOLD):
      return 'master-gold';
    case validateTypeClassCard(id, TYPE_MC_PLATINUM):
      return 'master-platinum';
    case validateTypeClassCard(id, TYPE_MC_ZAFIRO):
      return 'zafiro';
    case validateTypeClassCard(id, TYPE_MC_CERO):
      return 'cero';
    default:
      return '';
  }
};

export const maskHtmlId = (
  id: string = '',
  size: number = 16,
  separate: number = 4,
  point: string = '•'
): string => {
  return [...id.padEnd(size, point)].reduce(
    (beforeValue, value, index) =>
      (beforeValue +=
        index === 0
          ? '<span>' + value
          : index && !(index % separate)
          ? '</span><span>' + value
          : index === size - 1
          ? value + '</span>'
          : value),
    ''
  );
};
