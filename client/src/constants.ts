export interface DietFilters {
  name: string;
  selected: boolean;
}

export const DIET_FILTERS: DietFilters[] = [
  {
    name: "Vegitarian",
    selected: false,
  },
  {
    name: "Gluten Free",
    selected: false,
  },
  {
    name: "Dairy Free",
    selected: false,
  },
];
