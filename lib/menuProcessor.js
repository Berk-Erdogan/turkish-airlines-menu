/**
 * Group Menu Items by Category
 * @param {Array} menuItems - Menu items to be processed
 * @returns {Object} - Menu items grouped by categories
 */

export function groupMenuItemsByCategory(menuItems) {
    return menuItems.reduce((grouped, item) => {
      const category = item.category || 'Uncategorized';
      
      if (!grouped[category]) {
        grouped[category] = [];
      }
      
      grouped[category].push(item);
      return grouped;
    }, {});
  }
  
  /**
   * filter menu items by dietary features
   * @param {Array} menuItems - Will Be Filtered Menu Items
   * @param {string} dietaryFilter - Diet Filter (exp. "vegetarian", "gluten-free")
   * @returns {Array} - Filtered Menu Items
   */

  export function filterMenuItemsByDietary(menuItems, dietaryFilter) {
    if (!dietaryFilter) return menuItems;
    
    return menuItems.filter(item => {
      // If there is no dietary information, exclude from the filtering results
      if (!item.dietary || !Array.isArray(item.dietary)) return false;
      
      /// If the dietary feature matches, include the item
      return item.dietary.some(diet => 
        diet.toLowerCase().includes(dietaryFilter.toLowerCase())
      );
    });
  }
  
  /**
   * Search menu items by keyword
   * @param {Array} menuItems - Will Be Searched Menu Items
   * @param {string} keyword - Search Keyword
   * @returns {Array} - Search Results
   */

  export function searchMenuItems(menuItems, keyword) {
    if (!keyword) return menuItems;
    
    const searchTerm = keyword.toLowerCase();
    
    return menuItems.filter(item => {
      const nameMatch = item.name && item.name.toLowerCase().includes(searchTerm);
      const descMatch = item.description && item.description.toLowerCase().includes(searchTerm);
      const ingredientsMatch = item.ingredients && item.ingredients.some(ing => 
        ing.toLowerCase().includes(searchTerm)
      );
      
      return nameMatch || descMatch || ingredientsMatch;
    });
  }
  
  /**
   * Exctract dietary options from menu items
   * @param {Array} menuItems - All menu items
   * @returns {Array} - Diet Options List
   */

  export function extractDietaryOptions(menuItems) {
    const dietaryOptions = new Set();
    
    menuItems.forEach(item => {
      if (item.dietary && Array.isArray(item.dietary)) {
        item.dietary.forEach(diet => dietaryOptions.add(diet));
      }
    });
    
    return Array.from(dietaryOptions).sort();
  }
  
  /**
   * Exctract categories from menu items
   * @param {Array} menuItems - All Menu Items
   * @returns {Array} - Category List
   */

  export function extractCategories(menuItems) {
    const categories = new Set();
    
    menuItems.forEach(item => {
      if (item.category) {
        categories.add(item.category);
      } else {
        categories.add('Uncategorized');
      }
    });
    
    return Array.from(categories).sort();
  }