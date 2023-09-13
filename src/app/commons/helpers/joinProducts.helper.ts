import { ICardOther } from '@modules/home/entities/otherProducts.entities';

export function joinProducts(products: object): any[] {
  const allProducts = [];

  !!products &&
    Object.keys(products).forEach((product) =>
      allProducts.push.apply(allProducts, products[product])
    );

  return allProducts;
}

export function joinOtherProducts(products: object): ICardOther[] {
  const allProducts = [];

  if (!!products) {
    Object.keys(products).forEach((product) => {
      const newProducts = products[product].map((data, index) => ({
        first: index === 0,
        total: products[product]?.length,
        information: data
      }));
      return allProducts.push.apply(allProducts, newProducts);
    });
  } else {
    return allProducts;
  }

  return allProducts;
}
