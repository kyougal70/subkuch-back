import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  UpdateOrderAcceptDto,
  UpdateOrderStatusAndPaymentDto,
  UpdateOrderStatusDto,
} from './dto/update-order-status.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderStatus, PaymentStatus } from './schema/orders.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    let userId = 1;
    if (createOrderDto.userId) {
      userId = createOrderDto.userId;
    } else {
      const findOutMaxUserId = await this.orderModel
        .find()
        .sort({ userId: -1 })
        .limit(1);
      userId = findOutMaxUserId.length > 0 ? findOutMaxUserId[0].userId + 1 : 1;
      console.log(
        'userId',
        userId,
        findOutMaxUserId[0].userId,
        findOutMaxUserId[0]._id,
      );
    }
    const createOrder = await this.orderModel.create({
      ...createOrderDto,
      userId,
      onlinePaidAmount: 0,
      onlinePaymentStatus: PaymentStatus.notPaid,
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

  async getOrdersByUser(userId: number) {
    return this.orderModel
      .find({ userId })
      .sort({ createdAt: -1 }) // latest first
      .exec();
  }

  async updateStatus(id: string, updateOrderDto: UpdateOrderStatusDto) {
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

  async acceptOrder(id: string, updateOrderAcceptDto: UpdateOrderAcceptDto) {
    const x = await this.orderModel.findOneAndUpdate(
      { _id: id },
      { orderAcceptedBy: updateOrderAcceptDto.orderAcceptedBy },
      {
        new: true,
      },
    );
    if (!x) {
      throw new Error('Order not updated');
    }
    return x;
  }

  async updateOnlinePayment(
    id: string,
    updateOrderAcceptDto: UpdateOrderStatusAndPaymentDto,
  ) {
    const find = await this.orderModel.findOne({ _id: id }).exec();
    if (!find) {
      throw new Error('Order not found');
    }
    let status = PaymentStatus.notPaid;
    if (updateOrderAcceptDto.onlinePaidAmount === 0) {
      throw new Error('Amount cannot be zero');
    } else if (updateOrderAcceptDto.onlinePaidAmount > find.netPrice) {
      throw new Error('Amount cannot be greater than net price');
    } else if (updateOrderAcceptDto.onlinePaidAmount === find.netPrice) {
      status = PaymentStatus.paid;
    } else if (updateOrderAcceptDto.onlinePaidAmount < find.netPrice) {
      status = PaymentStatus.partiallyPaid;
    } else {
      status = PaymentStatus.notPaid;
    }
    const x = await this.orderModel.findOneAndUpdate(
      { _id: id },
      {
        onlinePaidAmount: updateOrderAcceptDto.onlinePaidAmount,
        paymentScreenShot: updateOrderAcceptDto.paymentScreenShot,
        onlinePaymentStatus: status,
      },
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
