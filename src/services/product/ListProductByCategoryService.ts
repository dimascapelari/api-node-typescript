import prismaClient from "../../prisma";
import { ListProductByCategoryIdRequest } from "../../models/interfaces/product";

class ListProductByCategoryService {
  async execute({ category_id }: ListProductByCategoryIdRequest) {
    const findProductByCategoryId = await prismaClient.product.findMany({
      where: {
        category_id: category_id,
      },
    });

    return findProductByCategoryId;
  }
}

export { ListProductByCategoryService };
