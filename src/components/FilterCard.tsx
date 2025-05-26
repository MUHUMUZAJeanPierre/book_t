
const FilterCard = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
      <div className="p-4 border-t border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-3">Filter by Category</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <button
                className={`w-full text-left px-3 py-2 rounded-md transition text-gray-400 hover:text-white hover:bg-gray-700 ${
                  selectedCategory === category ? "bg-gray-800 text-white" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  
export default FilterCard;