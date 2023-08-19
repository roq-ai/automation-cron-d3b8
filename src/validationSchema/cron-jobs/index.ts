import * as yup from 'yup';

export const cronJobValidationSchema = yup.object().shape({
  task_name: yup.string().required(),
  frequency: yup.string().required(),
  timing: yup.string().required(),
  parameters: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
