import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { T_Booking, T_BookTime } from './booking.interface';

export const getTotalTimeInHour = (startTime: string, endTime: string) => {
  const startDate = new Date(`2000-01-01T${startTime}:00`);
  const endDate = new Date(`2000-01-01T${endTime}:00`);
  const timeDiff = endDate.getTime() - startDate.getTime();

  const hours = Math.floor(timeDiff / 3600000);
  const minutes = Math.floor((timeDiff % 3600000) / 60000);

  const timeDiffInHours = hours + minutes / 100;

  return timeDiffInHours;
};
export const hasTimeConflict = (
  assignedBooktime: T_BookTime[],
  newBookTime: Partial<T_BookTime>,
) => {
  for (const schedule of assignedBooktime) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newBookTime.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newBookTime.endTime}`);
    // 10:30 - 12:30
    // 11:30 - 1.30
    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }

  return false;
};

export const convertDate = (date: string) => {
  const ddMmYyyyRegex = /^\d{2}-\d{2}-\d{4}$/;
  const yyyyMmDdRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (ddMmYyyyRegex.test(date)) {
    const [day, month, year] = date.split('-').map(Number);
    if (month < 1 || month > 12) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid month in date');
    }

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  if (yyyyMmDdRegex.test(date)) {
    const [year, month, day] = date.split('-').map(Number);

    if (month < 1 || month > 12) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid month in date');
    }

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  throw new AppError(httpStatus.BAD_REQUEST, 'Invalid date');
};

export const findAvailableTimeSlotForBooking = (booking: T_Booking[]) => {
  const startHour = 0;
  const endHour = 24;
  const timeSlots = [];
  for (let hour = startHour; hour <= endHour - 2; hour += 2) {
    timeSlots.push({
      startTime: `${hour.toString().padStart(2, '0')}:00`,
      endTime: `${(hour + 2).toString().padStart(2, '0')}:00`,
    });
  }

  // Step 3: Filter out the time slots that overlap with existing bookings
  const availableTimeSlots = timeSlots.filter((slot) => {
    return !booking.some((booking) => {
      return (
        booking.startTime < slot.endTime && booking.endTime > slot.startTime
      );
    });
  });
  return availableTimeSlots;
};

export function getFormattedDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
