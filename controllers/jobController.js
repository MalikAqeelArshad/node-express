import Job from '../models/job.js';
import allJobs from '../api/jobs.js';

const errorHandler = (req, res, next) => {
  const error = new Error(`A job with the id of ${req.params.id} was not found`);
  error.status = 404; return next(error);
};

// @desc   Get all jobs
// @route  GET /api/jobs
export const getJobs = async (req, res, next) => {
  const skip = parseInt(req.query.skip) || 0;
  const take = parseInt(req.query.take) || 0;
  // const find = {uuid: {$in: ['admin', req.query.user]}};
  const jobs = await Job(req).find({}).skip(skip).limit(take);
  res.status(200).json(jobs);
};

// @desc    Get single job
// @route   GET /api/jobs/:id
export const getJob = async (req, res, next) => {
  // const job = await Job(req).findOne({id: req.params.id, uuid: req.query.user});
  try {
    const job = await Job(req).findOne({_id: req.params.id});
    res.status(200).json(job);
  } catch (e) {
    console.log('getJob', e.message);
    errorHandler(req, res, next);
  }
};

// @desc    Create new job
// @route   POST /api/jobs
export const createJob = async (req, res, next) => {
  const newJob = req.body;
  if (!newJob.title) {
    const error = new Error(`Title field is required.`);
    error.status = 400; return next(error);
  }

  const job = await Job(req).create(newJob);
  res.status(201).json(newJob);
};

// @desc    Update job
// @route   PUT /api/jobs/:id
export const updateJob = async (req, res, next) => {
  const job = await Job(req).updateOne({_id: req.params.id}, req.body);
  if (!job.acknowledged) errorHandler(req, res, next);

  res.status(200).json(job);
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
export const deleteJob = async (req, res, next) => {
  const response = await Job(req).deleteOne({_id: req.params.id});
  if (!response.acknowledged) errorHandler(req, res, next);
  
  res.status(200).json(response);
};

// @desc    Create many new jobs from json file
// @route   GET /api/jobs/create/many/:db
export const createManyJob = async (req, res, next) => {
  const dbName = req.params.db;
  if (!allJobs[dbName]) return res.send('Database name is invalid.');
  req.headers['x-database'] = dbName;
  await Job(req).insertMany(allJobs[dbName]);
  res.status(201).json(allJobs[dbName]);
};