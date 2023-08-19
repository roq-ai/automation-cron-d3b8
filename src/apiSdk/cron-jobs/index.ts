import axios from 'axios';
import queryString from 'query-string';
import { CronJobInterface, CronJobGetQueryInterface } from 'interfaces/cron-job';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCronJobs = async (query?: CronJobGetQueryInterface): Promise<PaginatedInterface<CronJobInterface>> => {
  const response = await axios.get('/api/cron-jobs', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCronJob = async (cronJob: CronJobInterface) => {
  const response = await axios.post('/api/cron-jobs', cronJob);
  return response.data;
};

export const updateCronJobById = async (id: string, cronJob: CronJobInterface) => {
  const response = await axios.put(`/api/cron-jobs/${id}`, cronJob);
  return response.data;
};

export const getCronJobById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/cron-jobs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCronJobById = async (id: string) => {
  const response = await axios.delete(`/api/cron-jobs/${id}`);
  return response.data;
};
