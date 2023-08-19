import { AdminInterface } from 'interfaces/admin';
import { CronJobInterface } from 'interfaces/cron-job';
import { InvitationInterface } from 'interfaces/invitation';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  admin?: AdminInterface[];
  cron_job?: CronJobInterface[];
  invitation?: InvitationInterface[];
  user?: UserInterface;
  _count?: {
    admin?: number;
    cron_job?: number;
    invitation?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
