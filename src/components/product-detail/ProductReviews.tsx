import { Avatar, Group, Paper, Rating, Stack, Text, Title } from '@mantine/core';
import { CONTENT } from '@/constants';
import type { ProductReview } from '@/types/product';
import { formatDate } from '@utils/format.ts';

const copy = CONTENT.productDetail.reviews;

type ProductReviewsProps = {
  reviews: ProductReview[];
};

const ProductReviews = ({ reviews }: ProductReviewsProps) => (
  <Paper withBorder radius="lg" p="lg">
    <Title order={2} fz="lg" fw={700} mb="md">
      {copy.title}
    </Title>

    {!reviews.length && <Text c="dimmed">{copy.empty}</Text>}

    <Stack gap="lg">
      {reviews.map((review, index) => (
        <Group key={`${review.reviewerEmail}-${index}`} align="flex-start" wrap="nowrap">
          <Avatar name={review.reviewerName} color="initials" radius="xl" />
          <div>
            <Group gap="xs">
              <Text fw={600} fz="sm">
                {review.reviewerName}
              </Text>
              <Text c="dimmed" fz="xs">
                {formatDate(review.date)}
              </Text>
            </Group>
            <Rating value={review.rating} readOnly size="xs" my={4} />
            <Text fz="sm">{review.comment}</Text>
          </div>
        </Group>
      ))}
    </Stack>
  </Paper>
);

export default ProductReviews;
