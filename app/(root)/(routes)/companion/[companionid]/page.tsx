import prismadb from "@/lib/prismadb";

interface CompanionIdPageProps {
    params: {
        companionId: string
    };
};

const companionId = async ({
    params
}: CompanionIdPageProps) => {

    const companion = await prismadb.companion.findUnique({
        where: {
            id: params.companionId
        }
    })

    const categories = await prismadb.category.findMany();
    return (
        <CompanionFrorm initialData={companion} categories={categories}/>
    )
};

export default companionId;