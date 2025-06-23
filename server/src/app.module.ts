import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/userAuth'),
    JwtModule.register({
      secret:
        process.env.JWT_SECRET ||
        '12bae8f0587264aff2e5de5d1153931172dea10358ab1092292a78e6a94142bb',
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule,
    AppointmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
