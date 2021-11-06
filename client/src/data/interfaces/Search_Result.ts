export interface SearchResultInterface {
  id: number;
  image: string;
  imageType: string;
  likes: number;
  missedIngredientCount: number;
  missedIngredients: any[];
  title: string;
  usedIngredientCount: number;
  usedIngredients: Object[];
}
