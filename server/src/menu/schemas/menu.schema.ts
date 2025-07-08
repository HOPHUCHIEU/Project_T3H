/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Menu extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  image?: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  rating?: number;

  @Prop({ default: false })
  isSpecial?: boolean;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
