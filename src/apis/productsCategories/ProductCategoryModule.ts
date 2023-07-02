import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productCategoryEntity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  controllers: [],
  providers: [],
})
export class ProductCategoryModule {}
