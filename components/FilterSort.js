import { useState } from 'react';

export default function FilterSort({ onFilterChange, onSortChange, totalCount }) {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  const handlePriceChange = (type, value) => {
    const newRange = { ...priceRange, [type]: value };
    setPriceRange(newRange);
    onFilterChange({
      priceRange: newRange,
      searchTerm
    });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange(value);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    onFilterChange({
      priceRange,
      searchTerm: value
    });
  };

  const clearFilters = () => {
    setPriceRange({ min: '', max: '' });
    setSearchTerm('');
    setSortBy('newest');
    onFilterChange({ priceRange: { min: '', max: '' }, searchTerm: '' });
    onSortChange('newest');
  };

  return (
    <div className="filter-sort-container">
      <div className="filter-header">
        <h3>Filter & Sort ({totalCount} NFTs)</h3>
        <button onClick={clearFilters} className="clear-filters-btn">
          Clear All
        </button>
      </div>
      
      <div className="filters-grid">
        {/* Search */}
        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Price Range */}
        <div className="filter-group">
          <label>Price Range (ETH)</label>
          <div className="price-inputs">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="price-input"
              step="0.001"
              min="0"
            />
            <span className="price-separator">to</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="price-input"
              step="0.001"
              min="0"
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="filter-group">
          <label>Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest Listed</option>
            <option value="oldest">Oldest Listed</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
}