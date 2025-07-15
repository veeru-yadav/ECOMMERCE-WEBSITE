// src/context/ProductFilterContext.jsx
import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const ProductFilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    categories: [],
    subcategories: [],
    sort: '',
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useProductFilters = () => useContext(FilterContext);
