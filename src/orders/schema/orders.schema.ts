import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum OrderStatus {
  pending = 'pending',
  delivered = 'delivered',
  cancelled = 'cancelled',
  preparing = 'preparing',
  ready = 'ready',
  outForDelivery = 'outForDelivery',
  returned = 'returned',
  cancelledByCustomer = 'cancelledByCustomer',
  cancelledByRestaurant = 'cancelledByRestaurant',
}

export class OrderItems {
  @Prop({ type: String, required: true })
  productId: string;
  @Prop({ type: String, required: true })
  productName: string;
  @Prop({ type: String, required: true })
  productImage: string;
  @Prop({ type: String, required: true })
  productDescription: string;
  @Prop({ type: String, required: true })
  productCategory: string;
  @Prop({ type: Number, required: true })
  qty: number;
  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: Number, required: true })
  totalPrice: number;
}

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop([{ type: OrderItems, required: true }])
  items: OrderItems[];
  @Prop({ type: Number, required: true })
  netPrice: number;
  @Prop({ type: String, required: true })
  customerName: string;
  @Prop({ type: String, required: true })
  phone: string;
  @Prop({ type: String, required: true })
  address: string;
  @Prop({ type: String, enum: OrderStatus, required: true })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
