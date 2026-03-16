import prismaClient from "../../prisma";
import { RemoveProductRequest } from "../../models/interfaces/product/RemoveProductRequest";

class RemoveProductService {
  async execute({ product_id }: RemoveProductRequest) {
    if (!product_id) {
      throw new Error("Id do produto não foi enviado!");
    }

    const removeProduct = await prismaClient.product.delete({
      where: {
        id: product_id,
      },
    });

    return removeProduct;
  }
}

export { RemoveProductService };
