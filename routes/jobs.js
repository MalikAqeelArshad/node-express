import { Router } from 'express';
const router = Router();
import {
  getJob,
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  createManyJob,
} from '../controllers/jobController.js';

// Get all jobs
router.get('/', getJobs);

// Get single job
router.get('/:id', getJob);

// Create new job
router.post('/', createJob);

// Update Job
router.put('/:id', updateJob);

// Delete Job
router.delete('/:id', deleteJob);

// Create many new Job
router.get('/create/many/:db', createManyJob);

export default router;
