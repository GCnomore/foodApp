export {};

// import React, { SetStateAction } from "react";
// import { useState } from "react";

// interface SearchQuery {
//   name?: string;
//   ingredients?: string[];
//   filter?: {};
//   sortBy?: {};
// }

// export const Search = React.createContext<SearchQuery>({});
// export const SearchUpdate = React.createContext<any>(null);

// export const SearchContextProvider: React.FC = ({ children }) => {
//   const [searchData, setSearchData] = useState<SearchQuery>({});
//   const updateSearch = (update: SearchQuery) => {
//     setSearchData(update);
//   };

//   return (
//     <Search.Provider value={searchData}>
//       <SearchUpdate.Provider value={updateSearch}>
//         {children}
//       </SearchUpdate.Provider>
//     </Search.Provider>
//   );
// };
