import { Router } from 'express';
import { FacilityController } from './facility.controller';
import { auth } from '../../Middleware/auth';
import validationMiddleware from '../../Middleware/validationMiddleware';
import {
  facilityZodValidationSchema,
  updateFacilityZodValidationSchema,
} from './facility.validation';

const router = Router();

router.get('/', FacilityController.getAllFacility);

router.post(
  '/',
  auth('admin'),
  validationMiddleware(facilityZodValidationSchema),
  FacilityController.createFacility,
);

router.put(
  '/:id',
  auth('admin'),
  validationMiddleware(updateFacilityZodValidationSchema),
  FacilityController.updateFacility,
);
router.delete('/:id', auth('admin'), FacilityController.deleteFacility);

export const FacilityRouter = router;
