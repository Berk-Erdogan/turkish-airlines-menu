import { useState } from 'react';

export default function MenuCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  
  // Color Grades for Dietary Tags
  const dietaryTagColors = {
    'vegetarian': 'bg-green-100 text-green-800',
    'vegan': 'bg-green-100 text-green-800',
    'halal': 'bg-blue-100 text-blue-800',
    'gluten-free': 'bg-yellow-100 text-yellow-800',
    'dairy-free': 'bg-orange-100 text-orange-800',
    'nut-free': 'bg-purple-100 text-purple-800',
    'low-carb': 'bg-indigo-100 text-indigo-800',
    'high-protein': 'bg-red-100 text-red-800',
    'kosher': 'bg-blue-100 text-blue-800',
    'default': 'bg-gray-100 text-gray-800'
  };
  
  // Color Selection for Dietary Tag
  const getDietaryTagColor = (tag) => {
    const normalizedTag = tag.toLowerCase();
    
    // Check all keys and return color class if there is a match
    for (const [key, value] of Object.entries(dietaryTagColors)) {
      if (normalizedTag.includes(key)) {
        return value;
      }
    }
    
    // Return default color if no match
    return dietaryTagColors.default;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        
        {item.description && (
          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
        )}
        
        {/* Diet Tags */}
        {item.dietary && item.dietary.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.dietary.map((diet, index) => (
              <span 
                key={index} 
                className={`text-xs px-2 py-1 rounded-full ${getDietaryTagColor(diet)}`}
              >
                {diet}
              </span>
            ))}
          </div>
        )}
        
        {/* Show/Hide Details Button */}
        {(item.ingredients && item.ingredients.length > 0) && (
          <button
            className="mt-2 text-xs text-red-600 hover:text-red-800 flex items-center"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Hide Items' : 'Show Items'}
            <svg 
              className={`h-4 w-4 ml-1 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M19 9l-7 7-7-7" 
              />
            </svg>
          </button>
        )}
        
        {/* Expanded Details */}
        {expanded && item.ingredients && (
          <div className="mt-2 text-sm text-gray-600">
            <h4 className="font-medium text-gray-700">Items:</h4>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              {item.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}