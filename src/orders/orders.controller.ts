import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  UpdateOrderAcceptDto,
  UpdateOrderStatusAndPaymentDto,
  UpdateOrderStatusDto,
} from './dto/update-order-status.dto';
import { ConfigService } from '@nestjs/config';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Get('cancelOrder/:id')
  cancelOrder(@Param('id') id: string) {
    return this.ordersService.cancelOrder(id);
  }

  @Get('my-orders/:userId')
  getMyOrders(@Param('userId') userId: string) {
    console.log(userId, 'userId in controller orders');
    return this.ordersService.getOrdersByUser(+userId);
  }

  @Patch('updateStatus/:id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderStatusDto,
  ) {
    if (
      updateOrderDto.password !==
      this.configService.get<string>('ADMIN_PASSWORD')
    )
      throw new Error('Invalid password');
    return this.ordersService.updateStatus(id, updateOrderDto);
  }

  @Patch('acceptOrder/:id')
  acceptOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderAcceptDto,
  ) {
    console.log(updateOrderDto);
    if (
      updateOrderDto.password !==
      this.configService.get<string>('ADMIN_PASSWORD')
    )
      throw new Error('Invalid password');
    return this.ordersService.acceptOrder(id, updateOrderDto);
  }

  @Patch('updateOnlinePayment/:id')
  updateOnlinePayment(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderStatusAndPaymentDto,
  ) {
    return this.ordersService.updateOnlinePayment(id, updateOrderDto);
  }
}
