import { IPocketCategory } from '@modules/pockets/constants/pockets.constant';

export function pocketsMapper(category: string): IPocketCategory {
  let customCategory: IPocketCategory;
  switch (category) {
    case 'Ahorro':
      customCategory = {
        icon: 'icon-vel-rocket',
        name: 'Ahorro',
        description: 'POCKETS.CATEGORIES.SAVING_DESCRIPTION',
        category
      };
      break;
    case 'Gasto':
      customCategory = {
        icon: 'icon-vel-calendar',
        name: 'Gasto',
        description: 'POCKETS.CATEGORIES.SPENDING_DESCRIPTION',
        category
      };
      break;
  }
  return customCategory;
}
