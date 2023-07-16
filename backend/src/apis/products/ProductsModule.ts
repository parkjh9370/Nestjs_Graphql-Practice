import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/ProductEntity';
import { ProductResolver } from './ProductResolver';
import { ProductService } from './ProductService';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
    ]),
  ],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductsModule {}
