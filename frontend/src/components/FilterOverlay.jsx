import React, { useState } from 'react';

const FilterOverlay = ({ onClose, onApply }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [sortType, setSortType] = useState('');

  const categories = ['Men', 'Women', 'Kids'];
  const subcategories = ['Topwear', 'Bottomwear', 'Innerwear'];
  const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Newest First'];

  const handleCheckboxChange = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const handleApply = () => {
    onApply({
      categories: selectedCategories,
      subcategories: selectedSubcategories,
      sort: sortType,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white p-6 overflow-y-auto shadow-lg">
      <h2 className="text-xl font-bold mb-4">Filter Products</h2>

      <div className="mb-4">
        <h4 className="font-semibold">Categories</h4>
        {categories.map(category => (
          <label key={category} className="block">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCheckboxChange(category, selectedCategories, setSelectedCategories)}
              className="mr-2"
            />
            {category}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="font-semibold">Subcategories</h4>
        {subcategories.map(sub => (
          <label key={sub} className="block">
            <input
              type="checkbox"
              checked={selectedSubcategories.includes(sub)}
              onChange={() => handleCheckboxChange(sub, selectedSubcategories, setSelectedSubcategories)}
              className="mr-2"
            />
            {sub}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h4 className="font-semibold">Sort By</h4>
        {sortOptions.map(option => (
          <label key={option} className="block">
            <input
              type="radio"
              name="sort"
              checked={sortType === option}
              onChange={() => setSortType(option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>

      <button
        onClick={handleApply}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterOverlay;
