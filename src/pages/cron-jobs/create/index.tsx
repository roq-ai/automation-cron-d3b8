import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createCronJob } from 'apiSdk/cron-jobs';
import { cronJobValidationSchema } from 'validationSchema/cron-jobs';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { CronJobInterface } from 'interfaces/cron-job';

function CronJobCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CronJobInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCronJob(values);
      resetForm();
      router.push('/cron-jobs');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CronJobInterface>({
    initialValues: {
      task_name: '',
      frequency: '',
      timing: '',
      parameters: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: cronJobValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Cron Jobs',
              link: '/cron-jobs',
            },
            {
              label: 'Create Cron Job',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Cron Job
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.task_name}
            label={'Task Name'}
            props={{
              name: 'task_name',
              placeholder: 'Task Name',
              value: formik.values?.task_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.frequency}
            label={'Frequency'}
            props={{
              name: 'frequency',
              placeholder: 'Frequency',
              value: formik.values?.frequency,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.timing}
            label={'Timing'}
            props={{
              name: 'timing',
              placeholder: 'Timing',
              value: formik.values?.timing,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.parameters}
            label={'Parameters'}
            props={{
              name: 'parameters',
              placeholder: 'Parameters',
              value: formik.values?.parameters,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/cron-jobs')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'cron_job',
    operation: AccessOperationEnum.CREATE,
  }),
)(CronJobCreatePage);
