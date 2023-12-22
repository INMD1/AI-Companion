'use client'

import { Category } from "@prisma/client";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import qs  from "query-string"

interface CategoriesProps {
    data: Category[];
}

export const Categories = ({
    data
}: CategoriesProps) => {
    const router = useRouter()
    const searchParams = useSearchParams();

    const category = searchParams.get("categoryId");

    const onClick = (id: string | undefined) => {
        const query = { categoryId: id }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipNull: true });
        router.push(url)
    };

    return (
        <div className="w-full overflow-x-auto space-x-2 flex p-1">
            <button
                onClick={() => onClick(undefined)}
                className={
                    cn("flex items-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opactiy-75 transition"
                    , !category ? "bg-primary/25" : "bg-primary/10")
                }>
                Newest
            </button>
            {data.map((item) => (
                <button
                    onClick={() => onClick(item.id)}
                    key={item.id}
                    className={cn("flex items-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opactiy-75 transition"
                            , item.id === category ? "bg-primary/25" : "bg-primary/10")}>
                    {item.name}
                </button>
            ))}
        </div>
    )
}