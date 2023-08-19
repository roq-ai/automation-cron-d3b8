const mapping: Record<string, string> = {
  admins: 'admin',
  'cron-jobs': 'cron_job',
  invitations: 'invitation',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
