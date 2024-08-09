import { Schema } from 'mongoose';
import Database from '../connection.js';

const JobSchema = new Schema({
  id: String,
  title: String,
  type: String,
  description: String,
  location: String,
  salary: String,
  company: {
    name: String,
    description: String,
    contactEmail: String,
    contactPhone: String,
  },
  uuid: {
    type: String,
    // required: true
  }
});

const Job = (req) => {
  const db = req.headers['x-database'];
  const connected = Database(db);
  return connected.model('Job', JobSchema);
}

export default Job;