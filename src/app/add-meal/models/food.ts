export const Nutrient_Ids = {
  Energy: 1008,
  Protein: 1003,
  Carbs: 1005,
  Fat: 1004,
  Fiber: 1079,
  Sodium: 1093,
};

export interface IFood {
  fdcID: number;
  description: string;
  brandName: string;
  servingSize: number;
  servingUnit: string;
  packageWeight: string;
  ingredients: string;
  nutritions: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sodium: number;
  };
}
