/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Query, Param, Put, Delete, Patch, Request, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto/create-appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface FindAllAppointmentsQuery {
  page?: number;
  limit?: number;
  status?: string;
}

interface IUserPayload {
  id: string; // Lấy từ token payload
  // các trường khác nếu có
}

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: FindAllAppointmentsQuery) {
    return this.appointmentsService.findAll(query);
  }

  // Lấy lịch hẹn của chính user (dựa vào id trong token)
  @UseGuards(JwtAuthGuard)
  @Get('my')
  async findMy(@Request() req: { user: IUserPayload }) {
    const userId = req.user?.id;
    return this.appointmentsService.findMyAppointments(userId);
  }

  // Khi tạo lịch hẹn, gắn luôn userId vào (nếu đăng nhập)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createDto: CreateAppointmentDto, @Request() req: { user: IUserPayload }) {
    return this.appointmentsService.create({
      ...createDto,
      userId: req.user?.id
    });
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
