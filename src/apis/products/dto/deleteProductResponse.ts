import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class deleteProductResponse {
  @Field(() => Boolean)
  isDeleted: boolean;
}
