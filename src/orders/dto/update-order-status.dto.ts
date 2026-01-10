import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderStatus } from '../schema/orders.schema';

export class UpdateOrderStatusDto {
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;
}

export class UpdateOrderAcceptDto {
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  orderAcceptedBy: string;
}

export class UpdateOrderStatusAndPaymentDto {
  @IsString()
  @IsNotEmpty()
  paymentScreenShot: string;
  @IsNumber()
  @IsNotEmpty()
  onlinePaidAmount: number;
}
