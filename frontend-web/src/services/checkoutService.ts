export const checkoutService = {
  calculateShipping: async (zipCode: string) => {
    return {
      standard: 0,
      express: 15.0,
      overnight: 29.99,
    };
  },
};
