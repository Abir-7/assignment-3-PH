import { Types } from 'mongoose';

export interface T_Booking {
  facility: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  isBooked: T_BookedStatus;
  payableAmount: number;
}

export type T_BookTime = {
  _id: Types.ObjectId;
  startTime: string;
  endTime: string;
};

export type T_BookedStatus = 'confirmed' | 'unconfirmed' | 'canceled';
