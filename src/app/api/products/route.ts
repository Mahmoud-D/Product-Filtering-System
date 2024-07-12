import { NextRequest } from "next/server";
import { db } from "@/db";
import { productFilterValidator } from "@/lib/validators/product-validator";

class Filter {
  private filters: Map<string, string[]> = new Map();
  hasFilter() {
    return this.filters.size > 0;
  }

  add(key: string, operator: string, value: string | number) {
    const filter = this.filters.get(key) || [];
    filter.push(
      `${key} ${operator} ${typeof value === "number" ? value : `"${value}"`}`
    );
    this.filters.set(key, filter);
  }
  addRaw(key: string, rawFilter: string) {
    this.filters.set(key, [rawFilter]);
  }

  get() {
    const parts: string[] = [];

    this.filters.forEach((filter) => {
      const groupedValues = filter.join(" OR ");
      parts.push(`(${groupedValues})`);
    });

    return parts.join(" AND ");
  }
}

export const AVG_PRODUCT_PRICE = 25;
export const MAX_PRODUCT_PRICE = 50;
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { color, size, price, sort } = productFilterValidator.parse(
      body.filter
    );
    const filter = new Filter();
    color.forEach((color) => filter.add("color", "=", color));
    size.forEach((size) => filter.add("size", "=", size));

    filter.addRaw("price", `price >= ${price[0]} AND price <= ${price[1]}`);

    const products = await db.query({
      topK: 12,
      vector: [
        0,
        0,
        sort === "none"
          ? AVG_PRODUCT_PRICE
          : sort === "price-asc"
          ? 0
          : MAX_PRODUCT_PRICE,
      ],
      includeMetadata: true,
      filter: filter.hasFilter() ? filter.get() : undefined,
    });
    return new Response(JSON.stringify(products));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
