import { Alert, Button } from '@mantine/core';
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

type SectionErrorProps = {
  title: string;
  message: string;
  retryLabel: string;
  onRetry: () => void;
  retrying?: boolean;
};

const SectionError = ({
  title,
  message,
  retryLabel,
  onRetry,
  retrying = false
}: SectionErrorProps) => (
  <Alert variant="light" color="red" radius="lg" title={title} icon={<FiAlertCircle />}>
    {message}
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
      {retryLabel}
    </Button>
  </Alert>
);

export default SectionError;
