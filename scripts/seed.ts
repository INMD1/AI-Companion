const { PrismaClient } = require("@prisma/client")

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                {name : "Famous People"},
                {name : "Mouvies & TV"},
                {name : "Musicians"},
                {name : "Games"},
                {name : "Animals"},
                {name : "Philosophy"},
                {name : "Scientists"}
            ]
        })
    } catch (error) {
        console.log("Error categories",  error)
    } finally {
        await db.$disconnect();
    }
}

main();