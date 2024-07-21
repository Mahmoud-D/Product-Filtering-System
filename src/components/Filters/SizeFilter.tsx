import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { SIZE_FILTERS } from "@/constants";
import { TProductState } from "@/lib/validators/product-validator";

type TProps = {
  applyArrayFilter: ({
    category,
    value,
  }: {
    category: keyof Pick<TProductState, "color" | "size">;
    value: string;
  }) => void;
  filter: TProductState;
};
const SizeFilter = ({ applyArrayFilter, filter }: TProps) => {
  return (
    <AccordionItem value="size">
      <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500 ">
        <span className="font-medium dark:text-stone-100 text-gray-900">
          Size
        </span>
      </AccordionTrigger>

      <AccordionContent className=" pt-6 animate-none">
        <ul className="space-y-4">
          {SIZE_FILTERS.options.map((option, optionIdx) => (
            <li
              key={option.value}
              className="flex items-center group cursor-pointer"
            >
              <input
                type="checkbox"
                id={`size-${optionIdx}`}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 group-hover:cursor-pointer focus:ring-indigo-500"
                onChange={() => {
                  applyArrayFilter({
                    category: "size",
                    value: option.value,
                  });
                }}
                checked={filter.size.includes(option.value)}
              />

              <label
                htmlFor={`size-${optionIdx}`}
                className="ml-3 text-sm dark:text-stone-100 text-gray-600 group-hover:cursor-pointer"
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

export default SizeFilter;
