import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum ProductCategory {
  general = 'general',
  dessert = 'dessert',
  drinks = 'drinks',
  snack = 'snack',
  bread = 'bread',
  other = 'other',
  nonVeg = 'nonVeg',
}

export enum ProductStatus {
  active = 'active',
  inactive = 'inactive',
}

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: String, required: true })
  image: string;
  @Prop({ type: String, required: true })
  description: string;
  @Prop({ type: String, enum: ProductCategory, required: true })
  category: ProductCategory;
  @Prop({ type: Boolean, required: true })
  isAvailable: boolean;
  @Prop({ type: String, enum: ProductStatus, required: true })
  status: ProductStatus;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
