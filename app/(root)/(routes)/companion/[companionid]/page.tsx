import prismadb from "@/lib/prismadb";
import { CompanionFrorm } from "./components/companion-form";

interface CompanionIdPageProps {
    params: {
        companionId: string
    };
};

const companionId = async ({
    params
}: CompanionIdPageProps) => {

    const companion = await prismadb.companioned.findFirst({
        where: {
            id: params.companionId,
        }
    });

    const categories = await prismadb.category.findMany();
    return (
        <CompanionFrorm initialData={companion} categories={categories}/>
    )
};

export default companionId;