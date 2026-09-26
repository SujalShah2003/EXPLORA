import { DefaultMantineColor, MantineColorsTuple } from '@mantine/core';

export const themeColors: Partial<
  Record<DefaultMantineColor, MantineColorsTuple>
> = {
  primary: [
    '#f0eeff',
    '#dfdbff',
    '#bdb4ff',
    '#9a8bff',
    '#7c68fb',
    '#6a52f8',
    '#5b43f0',
    '#4b34d6',
    '#3f2cb5',
    '#332591'
  ],
  // Ratings, deals and "new" badges.
  accent: [
    '#fff8e1',
    '#ffefc2',
    '#ffdf85',
    '#ffcd45',
    '#ffbe1a',
    '#fcb300',
    '#e8a200',
    '#c98a00',
    '#a36f00',
    '#7d5500'
  ]
};
