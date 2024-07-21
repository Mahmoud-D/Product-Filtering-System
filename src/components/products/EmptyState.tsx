import { XCircle } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="relative col-span-full h-80 bg-gray-50 w-full p-12 flex flex-col items-center justify-center">
      <XCircle className="h-10 w-10 text-red-500" />
      <h3 className="font-bold my-2 text-stone-900  text-3xl capitalize ">
        No products found
      </h3>
      <p className="text-zinc-500 text-sm  capitalize ">
        No search results match your query. Please adjust your search and try
        again.
      </p>
    </div>
  );
};

export default EmptyState;
