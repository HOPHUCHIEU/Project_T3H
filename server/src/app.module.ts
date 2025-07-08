/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AuthModule } from './auth/auth.module';
import { MenusModule } from './menu/menus.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/userAuth'),
    AppointmentsModule,
    UsersModule,
    AuthModule,
    MenusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
