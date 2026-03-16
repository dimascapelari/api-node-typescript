import prismaClient from "../../../prisma";

class ListCategoryService {
  async execute() {
    // Buscar todas as categorias

    // findMany -> busca todos os dados que estão dentro dessa tabela
    const categories = await prismaClient.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return categories;
  }
}

export { ListCategoryService };
