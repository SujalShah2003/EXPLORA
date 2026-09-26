import { createTheme, MantineThemeOverride } from '@mantine/core';
import { themeColors } from '@/theme/colors.ts';

export const theme: MantineThemeOverride = createTheme({
  colors: themeColors,
  primaryColor: 'primary',
  primaryShade: { light: 6, dark: 5 }
});
