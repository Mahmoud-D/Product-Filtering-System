import { SetStateAction } from "react";
import { QueryObserverResult } from "@tanstack/react-query";
import { QueryResult } from "@upstash/vector";
import { DebouncedFunc } from "lodash";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { TProductState } from "@/lib/validators/product-validator";
import { cn } from "@/lib/utils";

import { SORT_OPTIONS } from "@/constants";
import { TProduct } from "@/types";

import { ChevronDown } from "lucide-react";

type TProps = {
  filter: TProductState;
  setFilter: (value: SetStateAction<TProductState>) => void;
  stableDebouncedRefetch:
    | DebouncedFunc<
        () => Promise<QueryObserverResult<QueryResult<TProduct>[], Error>>
      >
    | undefined;
};
const Sort = ({ filter, setFilter, stableDebouncedRefetch }: TProps) => {
  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="group inline-flex justify-center text-lg items-center font-medium dark:text-stone-100 dark:hover:text-stone-300 text-gray-700 hover:text-gray-900 ">
          sort
          <ChevronDown className="mr-1 ml-1 h-5 w-5 flex-shrink-0  dark:text-stone-100 dark:hover:text-stone-300 text-gray-400 group-hover:text-gray-500 " />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.name}
              className={cn(
                "block w-full dark:bg-slate-900 text-sm px-4 py-2",
                {
                  "font-bold text-gray-900 bg-gray-100 dark:text-stone-100 dark:bg-slate-500 ":
                    filter.sort === option.value,
                  "text-gray-300": filter.sort !== option.value,
                }
              )}
              onClick={() => {
                setFilter((prev) => ({ ...prev, sort: option.value }));
                if (stableDebouncedRefetch) {
                  stableDebouncedRefetch();
                }
              }}
            >
              {option.name}
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Sort;
