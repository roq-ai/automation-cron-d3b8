import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface CronJobInterface {
  id?: string;
  task_name: string;
  frequency: string;
  timing: string;
  parameters?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface CronJobGetQueryInterface extends GetQueryInterface {
  id?: string;
  task_name?: string;
  frequency?: string;
  timing?: string;
  parameters?: string;
  organization_id?: string;
}
