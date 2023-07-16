import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleslocation } from './entities/productsSalesLocation';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSaleslocation])],
  controllers: [],
  providers: [],
})
export class ProductsSalesLocationModule {}
