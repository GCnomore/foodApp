import React from "react";
import { useLocation } from "react-router-dom";

// Cutom hook to fetch search query from url
export function useQuery(): URLSearchParams {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
