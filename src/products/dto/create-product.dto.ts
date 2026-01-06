import {
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
  @IsEnum(ProductCategory)
  @IsNotEmpty()
  category: ProductCategory;
  @IsBoolean()
  @IsNotEmpty()
  isAvailable: boolean;
  @IsEnum(ProductStatus)
  @IsNotEmpty()
  status: ProductStatus;
}
