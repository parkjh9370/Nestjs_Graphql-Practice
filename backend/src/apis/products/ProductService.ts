import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/ProductEntity';
import {
  IProductServiceCreate,
  IProductServiceDelete,
  IProductServiceUpdate,
  IProductsServiceFindOne,
} from './interfaces/ProductServiceInterface';
import { deleteProductResponse } from './dto/deleteProductResponse';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    console.log(dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'));

    return this.productRepository.find({
      where: { deletedAt: '0000-00-00 00:00:00' },
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productRepository.findOne({
      where: { id: productId, deletedAt: '0000-00-00 00:00:00' },
    });
  }

  create({ createProductInput }: IProductServiceCreate): Promise<Product> {
    const result = this.productRepository.save({
      ...createProductInput,
    });

    return result;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductServiceUpdate): Promise<Product> {
    const product = await this.findOne({ productId });

    const result = this.productRepository.save({
      ...product,
      ...updateProductInput,
    });
    return result;
  }

  async delete({
    productId,
  }: IProductServiceDelete): Promise<deleteProductResponse> {
    this.productRepository.update(
      { id: productId },
      { deletedAt: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') },
    );

    return { isDeleted: true };
  }
}
