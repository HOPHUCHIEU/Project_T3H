/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>,
  ) {}

  // Thêm userId khi tạo lịch (nếu có)
  async create(createAppointmentDto: CreateAppointmentDto & { userId?: string }): Promise<Appointment> {
    const created = new this.appointmentModel(createAppointmentDto);
    return created.save();
  }

  async findAll({ page = 1, limit = 10, status = '' }) {
    const filter = status ? { status } : {};
    const skip = (page - 1) * limit;
    const data = await this.appointmentModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await this.appointmentModel.countDocuments(filter);
    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string) {
    const appt = await this.appointmentModel.findById(id);
    if (!appt) throw new NotFoundException('Appointment not found');
    return appt;
  }

  // Filter lịch theo userId (chuẩn)
  async findMyAppointments(userId: string) {
    return this.appointmentModel.find({ userId }).sort({ createdAt: -1 });
  }

  async update(id: string, updateDto: UpdateAppointmentDto) {
    const updated = await this.appointmentModel.findByIdAndUpdate(id, updateDto, { new: true });
    if (!updated) throw new NotFoundException('Appointment not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.appointmentModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Appointment not found');
    return deleted;
  }
}
