import { CreateProductInput } from '../dto/CreateProudctInput';
import { UpdateProductInput } from '../dto/UpdateProductInput';

export interface IProductServiceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductsServiceFindOne {
  productId: string;
}

export interface IProductServiceUpdate {
  productId: string;
  updateProductInput: UpdateProductInput;
}

export interface IProductServiceDelete {
  productId: string;
}
