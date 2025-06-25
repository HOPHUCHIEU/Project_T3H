/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { AppointmentStatus } from './schemas/appointment.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../users/guards/roles.guard';
import { Roles } from '../users/decorators/roles.decorator';

interface UserRequest extends Request {
  user: { _id: string; role: string };
}

@Controller('appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @Roles('user')
  create(@Body() createAppointmentDto: CreateAppointmentDto, @Request() req: UserRequest) {
  return this.appointmentsService.create(createAppointmentDto, req.user._id); // req.user.id đúng là _id của user
}


  @Get()
  @Roles('admin')
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get('my-appointments')
  @Roles('user')
  findMyAppointments(@Request() req: UserRequest) {
    return this.appointmentsService.findByUserId(req.user._id);
  }

  @Put(':id/confirm')
  @Roles('admin')
  confirm(@Param('id') id: string) {
    return this.appointmentsService.updateStatus(id, AppointmentStatus.CONFIRMED);
  }

  @Put(':id/cancel')
  @Roles('admin', 'user')
  cancel(@Param('id') id: string) {
    return this.appointmentsService.updateStatus(id, AppointmentStatus.CANCELLED);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string) {
    return this.appointmentsService.delete(id);
  }
}
