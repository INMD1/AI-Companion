"use clinet"

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary"
import Image from "next/image";

interface ImageUploadProps {
    onChange: (src: string) => void;
    disabled?: boolean
}

export const ImageUpload = ({
    onChange,
    disabled,
} : ImageUploadProps) => {
    const [ isMounted, setIsMounted ] = useState(false);
    const [ value, setValue ] = useState("");
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return null
    }

    return(
        <div className="space-y-4 w-full flex flex-col justify-center items-center">
            <CldUploadButton
            onUpload={(result: any) => {
                setValue(result.info.secure_url);
                onChange(result.info.secure_url);
            }}
             options={{
                maxFiles: 1
             }}
             uploadPreset="feyv1mh2">
                <div className="
                p-4
                border-4
                border-dashed
                border-primary/10
                rounded-lg
                hover:opacity-75
                transiton
                flex
                flex-col
                space-y-2
                items-center
                justify-center">
                    <div className="relative h-40 w-40">
                        <Image
                            fill
                            alt="Upload"
                            src={value || "/placeholder.png"}
                            className="rounded-lg object-cover"/>
                    </div>
                </div>
            </CldUploadButton>
        </div>
    )
}