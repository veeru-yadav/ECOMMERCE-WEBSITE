// src/pages/FilterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductFilters } from '../context/ProductFilterContext'; // custom context you'll create
import BackButton from '../components/BackButton';

const FilterPage = () => {
    const navigate = useNavigate();
    const { setFilters } = useProductFilters();

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [sort, setSort] = useState('');

    const toggleCategory = (cat) => {
        setCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
        );
    };

    const handleApply = () => {
        setFilters({ categories, subcategories, sort });
        navigate('/products'); // go back to product page
    };

    return (
        <div className="container py-4" style={{ zIndex: 9999 }}>
            <div className='d-flex justify-content-between'>
                <h2 className="mb-4">Apply Filters</h2>
                <BackButton className="float-end" />
            </div>

            <h5>Category</h5>
            {['Men', 'Women', 'Kids'].map((cat) => (
                <div key={cat} className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={categories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        id={cat}
                    />
                    <label className="form-check-label" htmlFor={cat}>
                        {cat}
                    </label>
                </div>
            ))}

            <hr />
            <h5>Sort By</h5>
            <select className="form-select mb-4" onChange={(e) => setSort(e.target.value)}>
                <option value="">None</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Newest First">Newest First</option>
            </select>

            <div className='d-flex justify-content-between'>
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    Cancel
                </button>
                <button className="btn btn-primary me-2" onClick={handleApply}>
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FilterPage;
