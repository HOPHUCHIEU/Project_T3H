/* eslint-disable prettier/prettier */
export class CreateMenuDto {
  name: string;
  description?: string;
  image?: string;
  price: number;
  rating?: number;
  isSpecial?: boolean;
}
