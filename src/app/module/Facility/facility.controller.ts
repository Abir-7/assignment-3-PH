import { RequestHandler } from 'express';
import { FacilityService } from './facility.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllFacility: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await FacilityService.getAllFacilityFromDB();

  return sendResponse(res, {
    success: result.length ? true : false,
    statusCode: result.length ? 200 : 404,
    message: result.length
      ? 'Facilities retrieved successfully'
      : 'No Data Found',
    data: result,
  });
});

const createFacility: RequestHandler = catchAsync(async (req, res, next) => {
  const data = req.body;
  const result = await FacilityService.createFacilityIntoDB(data);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Facility added successfully',
    data: result,
  });
});

const updateFacility: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await FacilityService.updateFacilityIntoDB(id, updatedData);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Facility updated successfully',
    data: result,
  });
});

const deleteFacility: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await FacilityService.deleteFacilityFromDB(id);
  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Facility deleted successfully',
    data: result,
  });
});

export const FacilityController = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
};
