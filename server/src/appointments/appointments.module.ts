/* eslint-disable prettier/prettier */
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { AppointmentsController } from './appointments.controller';
// import { AppointmentsService } from './appointments.service';
// import { Appointment, AppointmentSchema } from './schemas/appointment.schema';
// import { JwtModule } from '@nestjs/jwt';

// @Module({
//   imports: [
//     MongooseModule.forFeature([
//       { name: Appointment.name, schema: AppointmentSchema }
//     ]),
//     JwtModule.register({   // Thêm dòng này
//       secret: process.env.JWT_SECRET || '12bae8f0587264aff2e5de5d1153931172dea10358ab1092292a78e6a94142bb',
//       signOptions: { expiresIn: '7d' },
//     }),
//   ],
//   controllers: [AppointmentsController],
//   providers: [AppointmentsService],
//   exports: [AppointmentsService],
// })
// export class AppointmentsModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './schemas/appointment.schema';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }]),
    AuthModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
