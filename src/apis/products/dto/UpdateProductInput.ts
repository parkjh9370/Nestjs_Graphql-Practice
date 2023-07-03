import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './CreateProudctInput';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}
