import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class OrderItemsDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
  @IsString()
  @IsNotEmpty()
  productName: string;
  @IsString()
  @IsNotEmpty()
  productImage: string;
  @IsString()
  @IsNotEmpty()
  productDescription: string;
  @IsString()
  @IsNotEmpty()
  productCategory: string;
  @IsNumber()
  @IsNotEmpty()
  qty: number;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}

export class CreateOrderDto {
  @IsArray()
  @IsObject({ each: true })
  items: OrderItemsDto[];
  @IsNumber()
  @IsNotEmpty()
  netPrice: number;
  @IsString()
  @IsNotEmpty()
  customerName: string;
  @IsString()
  @IsNotEmpty()
  phone: string;
  @IsString()
  @IsNotEmpty()
  address: string;
}
