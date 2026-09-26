import { useState } from 'react';
import { Group, Image, Paper, Stack, UnstyledButton } from '@mantine/core';
import { CONTENT } from '@/constants';

const copy = CONTENT.productDetail;

type ProductGalleryProps = {
  title: string;
  images: string[];
};

const ProductGallery = ({ title, images }: ProductGalleryProps) => {
  const [active, setActive] = useState(0);
  const altFor = (index: number) =>
    copy.galleryImageAlt.replace('{title}', title).replace('{index}', String(index + 1));

  return (
    <Stack gap="md">
      <Paper
        withBorder
        radius="lg"
        p="xl"
        bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))"
      >
        <Image src={images[active]} alt={altFor(active)} h={{ base: 280, md: 420 }} fit="contain" />
      </Paper>

      {images.length > 1 && (
        <Group gap="sm">
          {images.map((src, index) => (
            <UnstyledButton
              key={src}
              onClick={() => setActive(index)}
              aria-label={copy.galleryThumbAriaLabel.replace('{index}', String(index + 1))}
              aria-pressed={index === active}
            >
              <Paper
                withBorder
                radius="md"
                p={6}
                bd={
                  index === active
                    ? '2px solid var(--mantine-primary-color-filled)'
                    : undefined
                }
              >
                <Image src={src} alt="" w={64} h={64} fit="contain" />
              </Paper>
            </UnstyledButton>
          ))}
        </Group>
      )}
    </Stack>
  );
};

export default ProductGallery;
