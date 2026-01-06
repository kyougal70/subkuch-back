import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from '../schema/orders.schema';

export class UpdateOrderDto {
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;
}
