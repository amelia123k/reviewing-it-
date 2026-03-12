import React, { useState } from 'react';
import { X, Phone, Star as StarIcon, Search } from 'lucide-react';
import './Searchpanel.css';

const SearchPanel = ({ vendors, onSelectVendor, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredVendors = vendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="searchpanel-overlay" onClick={onClose}>
      <div className="searchpanel-popup" onClick={(e) => e.stopPropagation()}>
        <div className="searchpanel-header">
          <h3>Search Vendor</h3>
          <button className="searchpanel-closeBtn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="searchpanel-search">
          <div className="searchpanel-input-group">
            <Search className="searchpanel-icon" size={18} />
            <input
              type="text"
              className="searchpanel-input"
              placeholder="Search by name, phone, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        
        <div className="searchpanel-results">
          {filteredVendors.length === 0 ? (
            <div className="searchpanel-empty">
              <div className="searchpanel-empty-icon"></div>
              <h3>No vendors found</h3>
              <p>Try adjusting your search terms</p>
            </div>
          ) : (
            filteredVendors.map((vendor) => (
              <div 
                key={vendor.id} 
                className="searchpanel-resultItem"
                onClick={() => onSelectVendor(vendor)}
              >
                <div className="searchpanel-resultIcon">
                  <div className="searchpanel-avatar" style={{ background: vendor.color }}>
                    {vendor.name[0]}
                  </div>
                </div>
                <div className="searchpanel-resultDetails">
                  <div className="searchpanel-resultName">{vendor.name}</div>
                  <div className="searchpanel-resultMeta">
                    <span className="searchpanel-resultNumber">{vendor.number}</span>
                    <span className="searchpanel-resultCategory">{vendor.category}</span>
                  </div>
                  <div className="searchpanel-resultRating">
                    <StarIcon size={14} fill="#10b981" color="#10b981" />
                    <span>{vendor.rating}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;