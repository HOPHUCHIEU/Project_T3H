/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Appointment,
  AppointmentDocument,
  AppointmentStatus,
} from './schemas/appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, userId: string) {
    const appointment = new this.appointmentModel({
      ...createAppointmentDto,
      userId: new Types.ObjectId(userId),
      status: AppointmentStatus.PENDING,
    });
    return await appointment.save();
  }

  async findAll() {
    return await this.appointmentModel.find().populate('userId', 'name email');
  }

  async findByUserId(userId: string) {
    return await this.appointmentModel
      .find({ userId: new Types.ObjectId(userId) })
      .populate('userId', 'name email');
  }

  async updateStatus(id: string, status: AppointmentStatus) {
    const appointment = await this.appointmentModel.findById(id);
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    appointment.status = status;
    return await appointment.save();
  }

  async delete(id: string) {
    const result = await this.appointmentModel.deleteOne({ _id: new Types.ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Appointment not found');
    }
    return { message: 'Appointment deleted successfully' };
  }
}
