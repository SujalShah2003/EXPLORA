import { useComputedColorScheme } from '@mantine/core';
import { Toaster } from 'sonner';

const AppToaster = () => {
  const colorScheme = useComputedColorScheme('light');

  return (
    <Toaster
      theme={colorScheme}
      position="bottom-right"
      closeButton
      offset={24}
      toastOptions={{ style: { fontFamily: 'inherit' } }}
    />
  );
};

export default AppToaster;
