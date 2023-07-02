import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/ProductEntity';
import {
  IProductServiceCreate,
  IProductsServiceFindOne,
} from './interfaces/ProductServiceInterface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductServiceCreate): Promise<Product> {
    const result = this.productRepository.save({
      ...createProductInput,
    });

    return result;
  }
}
