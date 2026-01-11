import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ProductCategory, ProductStatus } from '../schema/product.schema';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsString()
  @IsNotEmpty()
  image: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsArray()
  @IsEnum(ProductCategory, { each: true })
  @IsNotEmpty()
  category: [ProductCategory];
  @IsBoolean()
  @IsNotEmpty()
  isAvailable: boolean;
  @IsEnum(ProductStatus)
  @IsNotEmpty()
  status: ProductStatus;
}
