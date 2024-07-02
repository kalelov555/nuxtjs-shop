export const countDiscountPrice = async (price: number, discount: number) => {
  let discountedPrice = price * (1 - discount / 100);
  return {
    oldPrice: `${Math.round(price)
      .toLocaleString("en-US")
      .replace(/,/g, " ")} ₸`,
    discountedPrice: `${Math.round(discountedPrice)
      .toLocaleString("en-US")
      .replace(/,/g, " ")} ₸`,
  };
};
