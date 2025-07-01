/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Query, Param, Put, Delete, Patch, Request, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto/create-appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Định nghĩa kiểu cho query
interface FindAllAppointmentsQuery {
  page?: number;
  limit?: number;
  status?: string;
}

// Định nghĩa kiểu cho user payload từ request
interface IUserPayload {
  userId: string;
  phone: string;
  // ... (tuỳ JWT payload)
}

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: FindAllAppointmentsQuery) {
    return this.appointmentsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async findMy(@Request() req: { user: IUserPayload }) {
    const customerPhone = req.user?.phone;
    return this.appointmentsService.findMyAppointments(customerPhone);
  }

  @Post()
  async create(@Body() createDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(id, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  async changeStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.appointmentsService.update(id, { status });
  }
}
