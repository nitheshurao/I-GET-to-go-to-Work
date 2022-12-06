import express from 'express'
import { createJob, deleteJob, showStats, updateJob, getAllJob } from '../controller/jobController.js';
const router = express.Router()


router.route('/').post(createJob).get(getAllJob);
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)

export default router


