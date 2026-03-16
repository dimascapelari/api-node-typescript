import { Router, Request, Response } from "express";
import multer from "multer";
import uploaderConfig from "./config/multer";
import { CreteUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { RemoveUserController } from "./controllers/user/RemoveUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { EditCategoryController } from "./controllers/category/EditCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { RemoveCategoryController } from "./controllers/category/RemoveCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { EditProductController } from "./controllers/product/EditProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";
import { ListProductsController } from "./controllers/product/ListProductsController";
import { RemoveProductController } from "./controllers/product/RemoveProductController";

const router = Router();
const upload = multer(uploaderConfig.upload("./tmp"));

router.get("/test", (request: Request, response: Response) => {
  return response.json({ ok: true });
});

// User Routes
router.post("/user", new CreteUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.delete("/user/remove", new RemoveUserController().handle);

// Category Routes
router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle,
);
router.put(
  "/category/edit",
  isAuthenticated,
  new EditCategoryController().handle,
);
router.get(
  "/category/all",
  isAuthenticated,
  new ListCategoryController().handle,
);
router.delete(
  "/category/remove",
  isAuthenticated,
  new RemoveCategoryController().handle,
);

// Products Routes

// Criar Produto
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle,
);

// Editar Produto
router.put(
  "/product/edit",
  isAuthenticated,
  upload.single("file"),
  new EditProductController().handle,
);

// Buscar Produto pelo category_id
router.get(
  "/product",
  isAuthenticated,
  new ListProductByCategoryController().handle,
);

// Listar todos os produtos
router.get("/products", isAuthenticated, new ListProductsController().handle);

// Deletar produto
router.delete(
  "/product/remove",
  isAuthenticated,
  new RemoveProductController().handle,
);

export { router };
