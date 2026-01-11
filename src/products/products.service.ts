import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Product,
  ProductCategory,
  ProductDocument,
  ProductStatus,
} from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const productCreate = await this.productModel.create({
      ...createProductDto,
    });
    if (!productCreate) {
      throw new Error('Product not created');
    }
    return true;
  }

  findAll(
    name: string,
    category: ProductCategory,
    isAvailable: boolean,
    status: ProductStatus,
  ) {
    const query = {};
    if (name) {
      query['name'] = { $regex: name, $options: 'i' };
    }
    if (category) {
      query['category'] = { $in: [category] };
    }
    if (isAvailable) {
      query['isAvailable'] = isAvailable;
    }
    if (status) {
      query['status'] = status;
    }
    return this.productModel.find(query).exec();
  }

  findOne(id: string) {
    return this.productModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    const x = await this.productModel.findOneAndUpdate(
      { _id: id },
      updateProductDto,
      {
        new: true,
      },
    );
    if (!x) {
      throw new Error('Product not updated');
    }
    return x;
  }
}
