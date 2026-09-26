import { Alert, Button } from '@mantine/core';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import { CONTENT } from '@/constants';

const { errorTitle, errorMessage, retry } = CONTENT.home.categories;

type CategoriesErrorProps = {
  onRetry: () => void;
  retrying?: boolean;
};

const CategoriesError = ({ onRetry, retrying = false }: CategoriesErrorProps) => (
  <Alert
    variant="light"
    color="red"
    radius="lg"
    title={errorTitle}
    icon={<FiAlertCircle />}
  >
    {errorMessage}
    <Button
      mt="md"
      size="xs"
      variant="light"
      color="red"
      leftSection={<FiRefreshCw />}
      loading={retrying}
      onClick={onRetry}
      display="block"
    >
      {retry}
    </Button>
  </Alert>
);

export default CategoriesError;
