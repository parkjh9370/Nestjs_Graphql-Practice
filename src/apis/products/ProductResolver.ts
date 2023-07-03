import { Args, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/CreateProudctInput';
import { Product } from './entities/ProductEntity';
import { ProductService } from './ProductService';
import { Query } from '@nestjs/graphql';
import { UpdateProductInput } from './dto/UpdateProductInput';
import { deleteProductResponse } from './dto/deleteProductResponse';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService, //
  ) {}

  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => Product)
  fetchProuduct(
    @Args('proudctId') productId: string, //
  ): Promise<Product> {
    return this.productService.findOne({ productId });
  }

  @Mutation(() => Product)
  createPrdouct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => deleteProductResponse)
  async deleteProduct(
    @Args('productId') productId: string, //
  ): Promise<deleteProductResponse> {
    return this.productService.delete({ productId });
  }
}
