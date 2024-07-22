import { SetStateAction } from "react";
import { QueryObserverResult } from "@tanstack/react-query";
import { QueryResult } from "@upstash/vector";
import { DebouncedFunc } from "lodash";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Slider } from "../ui/slider";

import { cn } from "@/lib/utils";
import { TProductState } from "@/lib/validators/product-validator";

import { TProduct } from "@/types";
import { DEFAULT_CUSTOM_RANGE, PRICE_FILTERS } from "@/constants";

type TProps = {
  filter: TProductState;
  setFilter: (value: SetStateAction<TProductState>) => void;
  stableDebouncedRefetch:
    | DebouncedFunc<
        () => Promise<QueryObserverResult<QueryResult<TProduct>[], Error>>
      >
    | undefined;
};
const PriceFilter = ({ filter, setFilter, stableDebouncedRefetch }: TProps) => {
  const minPrice = Math.min(filter.price.range[0], filter.price.range[1]);
  const maxPrice = Math.max(filter.price.range[0], filter.price.range[1]);
  return (
    <AccordionItem value="price">
      <AccordionTrigger className="py-3 text-sm dark:text-stone-100 dark:hover:text-stone-200  text-gray-400 hover:text-gray-500 ">
        <span className="font-medium dark:text-stone-100 text-gray-900">
          Price
        </span>
      </AccordionTrigger>
      <AccordionContent className=" pt-6 animate-none">
        <ul className="space-y-4">
          {PRICE_FILTERS.options.map((option, optionIdx) => (
            <li
              key={option.label}
              className="flex items-center group cursor-pointer"
            >
              <input
                type="radio"
                id={`price-${optionIdx}`}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 group-hover:cursor-pointer focus:ring-indigo-500"
                onChange={() => {
                  setFilter((prev) => ({
                    ...prev,
                    price: {
                      isCustom: false,
                      range: [...option.value],
                    },
                  }));
                  if (stableDebouncedRefetch) {
                    stableDebouncedRefetch();
                  }
                }}
                checked={
                  !filter.price.isCustom &&
                  filter.price.range[0] === option.value[0] &&
                  filter.price.range[1] === option.value[1]
                }
              />
              <label
                htmlFor={`price-${optionIdx}`}
                className="mx-3 text-sm dark:text-stone-100 text-gray-600 group-hover:cursor-pointer"
              >
                {option.label}
              </label>
            </li>
          ))}
          <li className="flex justify-center flex-col group cursor-pointer">
            <div>
              <input
                type="radio"
                id={`price-${PRICE_FILTERS.options.length}`}
                onChange={() => {
                  setFilter((prev) => ({
                    ...prev,
                    price: {
                      isCustom: true,
                      range: [0, 100],
                    },
                  }));
                  if (stableDebouncedRefetch) {
                    stableDebouncedRefetch();
                  }
                }}
                checked={filter.price.isCustom}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor={`price-${PRICE_FILTERS.options.length}`}
                className="mx-3 text-sm cursor-pointer dark:text-stone-100 text-gray-600"
              >
                Custom
              </label>
            </div>

            <div className="flex justify-between mt-2 mb-2 items-center ">
              <p className="font-medium">Price</p>
              <div>
                {filter.price.isCustom
                  ? minPrice.toFixed(0)
                  : filter.price.range[0].toFixed(0)}
                $ -
                {filter.price.isCustom
                  ? maxPrice.toFixed(0)
                  : filter.price.range[1].toFixed(0)}
                $
              </div>
            </div>
            <Slider
              className={cn({
                "opacity-50": !filter.price.isCustom,
              })}
              min={DEFAULT_CUSTOM_RANGE[0]}
              max={DEFAULT_CUSTOM_RANGE[1]}
              defaultValue={DEFAULT_CUSTOM_RANGE}
              step={5}
              value={
                filter.price.isCustom
                  ? filter.price.range
                  : DEFAULT_CUSTOM_RANGE
              }
              disabled={!filter.price.isCustom}
              onValueChange={(range) => {
                const [minValue, maxValue] = range;
                setFilter((prev) => ({
                  ...prev,
                  price: {
                    ...prev.price,
                    range: [minValue, maxValue],
                  },
                }));
                if (stableDebouncedRefetch) {
                  stableDebouncedRefetch();
                }
              }}
            />
          </li>
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default PriceFilter;
