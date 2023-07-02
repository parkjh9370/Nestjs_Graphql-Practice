import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsTagsModule])],
  controllers: [],
  providers: [],
})
export class ProductsTagsModule {}
