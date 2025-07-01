/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ required: true })
  date: string; // YYYY-MM-DD

  @Prop({ required: true })
  time: string; // HH:mm

  @Prop({ required: true })
  guests: number; // số khách

  @Prop({ default: '' })
  note: string; // ghi chú

  @Prop({ default: 'pending', enum: ['pending', 'approved', 'cancelled', 'completed'] })
  status: string; // trạng thái lịch hẹn

  @Prop({ required: true, type: String })
  customerName: string;

  @Prop({ required: true, type: String })
  customerPhone: string;

  @Prop({ type: String })
  customerEmail: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
