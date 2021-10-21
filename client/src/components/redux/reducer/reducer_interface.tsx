export interface HomeState {
  searchBy: string;
  search: null | string;
  ingredients: string[] | null;
  foodTrivia: null | string;
  showFilter: boolean;
  exclude: string[] | null;
  checked: {
    name: string;
    checked: boolean;
  }[];
}
