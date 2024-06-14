import { Model, Types } from 'mongoose';

export interface T_Facility {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  isDeleted: boolean;
}

export interface T_Facility_Find_Methods extends Model<T_Facility> {
  isFacitityExist(id: string): Promise<boolean>;
}
