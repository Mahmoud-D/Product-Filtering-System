import { SUBCATEGORIES } from "@/constants";

const SubCategories = () => {
  return (
    <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium dark:text-stone-100 text-gray-900">
      {SUBCATEGORIES.map((category) => (
        <li key={category.name}>
          <button
            disabled={!category.selected}
            className="disabled:cursor-not-allowed disabled:opacity-60"
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SubCategories;
