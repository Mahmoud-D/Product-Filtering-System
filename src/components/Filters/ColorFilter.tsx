import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { COLOR_FILTERS } from "@/constants";
import { TProductState } from "@/lib/validators/product-validator";

type TProps = {
  filter: TProductState;
  applyArrayFilter: ({
    category,
    value,
  }: {
    category: keyof Pick<TProductState, "color" | "size">;
    value: string;
  }) => void;
};
const ColorFilter = ({ applyArrayFilter, filter }: TProps) => {
  return (
    <AccordionItem value="color">
      <AccordionTrigger className="py-3 text-sm dark:text-stone-100 text-gray-400 hover:text-gray-500 ">
        <span className="font-medium dark:text-stone-100 text-gray-900">
          Color
        </span>
      </AccordionTrigger>
      <AccordionContent className=" pt-6 animate-none">
        <ul className="space-y-4">
          {COLOR_FILTERS.options.map((option, optionIdx) => (
            <li
              key={option.value}
              className="flex items-center group cursor-pointer"
            >
              <input
                type="checkbox"
                id={`color-${optionIdx}`}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 group-hover:cursor-pointer focus:ring-indigo-500"
                onChange={() => {
                  applyArrayFilter({
                    category: "color",
                    value: option.value,
                  });
                }}
                checked={filter.color.includes(option.value)}
              />
              <label
                htmlFor={`color-${optionIdx}`}
                className="mx-3 text-sm dark:text-stone-100 text-gray-600 group-hover:cursor-pointer"
              >
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ColorFilter;
