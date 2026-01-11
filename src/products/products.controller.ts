import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductCategory, ProductStatus } from './schema/product.schema';
import { ConfigService } from '@nestjs/config';

import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    if (
      createProductDto.password !==
      this.configService.get<string>('ADMIN_PASSWORD')
    )
      throw new Error('Invalid password');
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Param('name') name: string,
    @Param('category') category: ProductCategory,
    @Param('isAvailable') isAvailable: boolean,
    @Param('status') status: ProductStatus,
  ) {
    console.log('findAll Products');
    return this.productsService.findAll(name, category, isAvailable, status);
  }

  @Get('test')
  test() {
    console.log('test start');
    return true;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    fetch('https://subkuch-back.onrender.com/products/test').then((res) => {
      res.json();
      console.log('test complete');
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    console.log('update Products');
    if (
      updateProductDto.password !==
      this.configService.get<string>('ADMIN_PASSWORD')
    )
      throw new Error('Invalid password');
    return this.productsService.update(id, updateProductDto);
  }
}
