import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { BoradsModule } from './apis/boards/BoardsModule';
import { config } from './config/config';
import { ProductsModule } from './apis/products/ProductsModule';
import { UserModule } from './apis/users/UserModule';
import { ProductCategoryModule } from './apis/productsCategories/ProductCategoryModule';
import { ProductsSalesLocationModule } from './apis/productsSalesLocations/ProductsSalesLocationModule';
import { ProductsTagsModule } from './apis/productsTags/ProductsCategoriesModule';
import { AuthModule } from './apis/auth/AuthModule';

const typeOrmModuleOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => ({
    type: 'mysql',
    host: config.MYSQL.HOST,
    port: config.MYSQL.PORT as unknown as number,
    username: config.MYSQL.USER,
    password: config.MYSQL.PASSWORD,
    database: 'boiler',
    synchronize: true,
    entities: [
      __dirname + '/**/entities/*Entity{.ts,.js}',
      __dirname + '/**/entities/*View{.ts,.js}',
    ],
    autoLoadEntities: true,
    logging: false,
    keepConnectionAlive: true,
  }),
};

@Module({
  imports: [
    AuthModule,
    UserModule,
    BoradsModule,
    ProductsModule,
    ProductCategoryModule,
    ProductsTagsModule,
    ProductsSalesLocationModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    // TypeOrmModule.forRootAsync({
    //   type: 'mysql',
    //   host: config.MYSQL.HOST,
    //   port: config.MYSQL.PORT as unknown as number,
    //   username: config.MYSQL.USER,
    //   password: config.MYSQL.PASSWORD,
    //   database: 'boiler',
    //   synchronize: true,
    //   entities: [
    //     __dirname + '/apis/**/*.entity.*',
    //     // __dirname + '/**/entities/*Entity{.ts,.js}',
    //     // __dirname + '/**/entities/*View{.ts,.js}',
    //   ],
    //   logging: false,
    // }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
  ],
})
export class AppModule {}
