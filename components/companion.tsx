import { Companioned } from "@prisma/client"
import Image from "next/image";

interface CompanionsProps {
    data: (Companioned & {
        _count: {
            message: number
        }
    })[];
}

export const Companions = ( {
    data
}: CompanionsProps) => {
    if(data.length === 0){
        return(
            <div className="pt-10 flex flex-col items-center justify-center space-y-3">
                <div className="relative w-60 h-60">
                    <Image
                        fill
                        className="grayscale"
                        alt="Empty"
                        src="/placeholder.png"/>
                </div>
            </div>
        )
    }
}