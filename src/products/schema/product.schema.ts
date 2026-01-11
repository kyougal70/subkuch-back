import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum ProductCategory1 {
  general = 'general',
  dessert = 'dessert',
  drinks = 'drinks',
  snack = 'snack',
  bread = 'bread',
  other = 'other',
  nonVeg = 'nonVeg',
}

export enum ProductCategory {
  // General
  general = 'general',
  other = 'other',

  // Meals & Fast Food
  fastFood = 'fastFood',
  streetFood = 'streetFood',
  meal = 'meal',
  thali = 'thali',
  combo = 'combo',

  // Snacks
  snack = 'snack',
  chaat = 'chaat',
  fries = 'fries',

  // Bakery & Breads
  bread = 'bread',
  bakery = 'bakery',
  cake = 'cake',
  pastry = 'pastry',

  // Desserts & Sweets
  dessert = 'dessert',
  sweets = 'sweets',
  iceCream = 'iceCream',

  // Drinks & Beverages
  drinks = 'drinks',
  coldDrink = 'coldDrink',
  juice = 'juice',
  shake = 'shake',
  tea = 'tea',
  coffee = 'coffee',

  // Veg / Non-Veg
  veg = 'veg',
  nonVeg = 'nonVeg',
  egg = 'egg',

  // Regional / Cuisine-based
  northIndian = 'northIndian',
  southIndian = 'southIndian',
  chinese = 'chinese',
  italian = 'italian',
  continental = 'continental',

  // Healthy
  healthy = 'healthy',
  salad = 'salad',
  fruits = 'fruits',
  vegetables = 'vegetables',

  // Specials
  breakfast = 'breakfast',
  lunch = 'lunch',
  dinner = 'dinner',
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
  @Prop([{ type: String, enum: ProductCategory, required: true }])
  category: ProductCategory[];
  @Prop({ type: Boolean, required: true })
  isAvailable: boolean;
  @Prop({ type: String, enum: ProductStatus, required: true })
  status: ProductStatus;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
