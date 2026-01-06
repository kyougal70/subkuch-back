import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderStatus } from './schema/orders.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const createOrder = await this.orderModel.create({
      ...createOrderDto,
      status: OrderStatus.pending,
    });
    if (!createOrder) {
      throw new Error('Order not placed');
    }
    return createOrder;
  }

  async findAll() {
    return await this.orderModel.find().exec();
  }

  findOne(id: string) {
    return this.orderModel.findOne({ _id: id }).exec();
  }

  async cancelOrder(id: string) {
    const x = await this.orderModel.findOneAndUpdate(
      { _id: id },
      { status: OrderStatus.cancelledByCustomer },
      {
        new: true,
      },
    );
    if (!x) {
      throw new Error('Order not cancelled try again or contact us by phone');
    }
    return true;
  }

  async updateStatus(id: string, updateOrderDto: UpdateOrderDto) {
    const x = await this.orderModel.findOneAndUpdate(
      { _id: id },
      { status: updateOrderDto.status },
      {
        new: true,
      },
    );
    if (!x) {
      throw new Error('Order not updated');
    }
    return x;
  }
}
