import { T_Facility } from './facility.interface';
import { Facility } from './facility.model';

const getAllFacilityFromDB = async () => {
  const result = await Facility.find({ isDeleted: false });
  return result;
};

const createFacilityIntoDB = async (data: T_Facility) => {
  const result = await Facility.create(data);
  return result;
};

const updateFacilityIntoDB = async (id: string, data: Partial<T_Facility>) => {
  const result = await Facility.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  // console.log(result, 'test');
  return result;
};

const deleteFacilityFromDB = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  //console.log(result, 'test');
  return result;
};

export const FacilityService = {
  createFacilityIntoDB,
  updateFacilityIntoDB,
  deleteFacilityFromDB,
  getAllFacilityFromDB,
};
