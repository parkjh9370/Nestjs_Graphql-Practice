import { CreateProductInput } from '../dto/CreateProudctInput';

export interface IProductServiceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductsServiceFindOne {
  productId: string;
}
