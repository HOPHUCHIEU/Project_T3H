/* eslint-disable prettier/prettier */
import {
  IsDateString,
  IsNumber,
  IsString,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString()
  date: string;

  @IsString()
  time: string;

  @IsNumber()
  @Min(1)
  numberOfPeople: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
