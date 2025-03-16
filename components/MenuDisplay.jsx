import { useState, useMemo } from 'react';
import MenuCard from './MenuCard';
import { 
  groupMenuItemsByCategory, 
  filterMenuItemsByDietary,
  extractDietaryOptions
} from '@/lib/menuProcessor';

export default function MenuDisplay({ menuItems }) {
  const [activeDietaryFilter, setActiveDietaryFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Menu Items categorize by category
  const groupedItems = useMemo(() => {
    return groupMenuItemsByCategory(menuItems);
  }, [menuItems]);
  
  // Extract all categories
  const categories = useMemo(() => {
    return Object.keys(groupedItems).sort();
  }, [groupedItems]);
  
  // Extract all dietary options
  const dietaryOptions = useMemo(() => {
    return extractDietaryOptions(menuItems);
  }, [menuItems]);
  
  // Active menu items to be displayed with active filtering and categorization
  const displayedItems = useMemo(() => {
    // List first by dietary option
    const filteredItems = activeDietaryFilter
      ? filterMenuItemsByDietary(menuItems, activeDietaryFilter)
      : menuItems;
    
    // Filter by category
    if (activeCategory === 'all') {
      return filteredItems;
    } else {
      return filteredItems.filter(item => item.category === activeCategory);
    }
  }, [menuItems, activeDietaryFilter, activeCategory]);
  
  // Categorize displayed items
  const displayedGroupedItems = useMemo(() => {
    return groupMenuItemsByCategory(displayedItems);
  }, [displayedItems]);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Menu Options</h2>
      
      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Category Filters */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 text-sm rounded-full 
                ${activeCategory === 'all' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              All
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 text-sm rounded-full 
                  ${activeCategory === category 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Dietery Filters */}
        {dietaryOptions.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Diet Options</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveDietaryFilter('')}
                className={`px-3 py-1 text-sm rounded-full 
                  ${activeDietaryFilter === '' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                All
              </button>
              
              {dietaryOptions.map(option => (
                <button
                  key={option}
                  onClick={() => setActiveDietaryFilter(option)}
                  className={`px-3 py-1 text-sm rounded-full 
                    ${activeDietaryFilter === option 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Number of Result */}
      <p className="text-sm text-gray-600 mb-4">
        {displayedItems.length} Item Found
      </p>
      
      {/* List of Menu Items */}
      {Object.entries(displayedGroupedItems).length === 0 ? (
        <div className="text-center py-6 bg-gray-100 rounded-lg">
          <p className="text-gray-600">No menu items found matching the selected filters.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(displayedGroupedItems).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{category}</h3>
              <div className="grid grid-cols-1 gap-4">
                {items.map((item, index) => (
                  <MenuCard key={index} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}