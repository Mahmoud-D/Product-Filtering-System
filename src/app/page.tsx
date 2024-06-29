"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QueryResult } from "@upstash/vector";

import axios from "axios";
import { cn } from "@/lib/utils";
import { TProductState } from "@/lib/validators/product-validator";
import { TProduct } from "@/db";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import Product from "@/components/products/Product";

import { ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  { name: "None", value: "none" },
  { name: "Low to High", value: "price-asc" },
  { name: "High to Low", value: "price-desc" },
] as const;

const COLOR_FILTERS = {
  id: "color",
  name: "Color",
  options: [
    { value: "white", label: "White" },
    { value: "beige", label: "Beige" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "purple", label: "Purple" },
  ] as const,
};

const SIZE_FILTERS = {
  id: "size",
  name: "Size",
  options: [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
  ],
} as const;

const PRICE_FILTERS = {
  id: "price",
  name: "Price",
  options: [
    { value: [0, 100], label: "Any price" },
    {
      value: [0, 20],
      label: "Under 20€",
    },
    {
      value: [0, 40],
      label: "Under 40€",
    },
    // custom option defined in JSX
  ],
} as const;

const SUBCATEGORIES = [
  { name: "T-Shirts", selected: true, href: "#" },
  { name: "Hoodies", selected: false, href: "#" },
  { name: "Sweatshirts", selected: false, href: "#" },
  { name: "Accessories", selected: false, href: "#" },
];
const DEFAULT_CUSTOM_RANGE = [0, 100] as [number, number];

export default function Home() {
  const [filter, setFilter] = useState<TProductState>({
    color: ["white", "beige", "blue", "green", "purple"],
    size: ["S", "M", "L"],
    price: { isCustom: false, range: DEFAULT_CUSTOM_RANGE },
    sort: "none",
  });

  const { data: products } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const { data } = await axios.post<QueryResult<TProduct>[]>(
        "http://localhost:3000/api/products",
        {
          filter: {
            sort: filter.sort,
          },
        }
      );

      return data;
    },
  });

  const applyArrayFilter = ({
    category,
    value,
  }: {
    category: keyof Pick<typeof filter, "color" | "size">;
    value: string;
  }) => {
    const isFilterApplied = filter[category].includes(value as never);

    if (isFilterApplied) {
      setFilter((prev) => ({
        ...prev,
        [category]: prev[category].filter((v) => v !== value),
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }));
    }
  };

  console.log(filter);
  // console.log(filter);
  // console.log(query);
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24 ">
        <h1 className=" text-4xl tracking-tight font-bold text-gray-900 ">
          High-quality cotton selection
        </h1>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 ">
              sort
              <ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 " />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.name}
                  className={cn("block w-full  text-left text-sm px-4 py-2", {
                    "font-bold text-gray-900 bg-gray-100 ":
                      filter.sort === option.value,
                    "text-gray-5  00": filter.sort !== option.value,
                  })}
                  onClick={() => {
                    setFilter((prev) => ({ ...prev, sort: option.value }));
                  }}
                >
                  {option.name}
                </button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <div className="hidden lg:block ">
            <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
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
            <Accordion type="multiple" className="animate-none">
              {/* Color filter */}
              <AccordionItem value="color">
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500 ">
                  <span className="font-medium text-gray-900">Color</span>
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
                          className="ml-3 text-sm text-gray-600 group-hover:cursor-pointer"
                        >
                          {option.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              {/* Size filter */}
              <AccordionItem value="size">
                <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500 ">
                  <span className="font-medium text-gray-900">Size</span>
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
                          className="ml-3 text-sm text-gray-600 group-hover:cursor-pointer"
                        >
                          {option.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          {/* Product grid */}
          <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
            {products
              ? products?.map((product) => (
                  <Product product={product.metadata!} key={product.id} />
                ))
              : new Array(12)
                  .fill(0)
                  .map((_, index) => <ProductSkeleton key={index} />)}
          </ul>
        </div>
      </section>
    </main>
  );
}
