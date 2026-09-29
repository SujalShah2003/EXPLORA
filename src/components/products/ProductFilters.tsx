import { useEffect, useState } from 'react';
import {
  Button,
  CloseButton,
  Grid,
  Group,
  Paper,
  Select,
  Switch,
  TextInput,
  Title
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { FiRotateCcw, FiSearch } from 'react-icons/fi';
import { CONTENT } from '@/constants';
import { useGetCategoryListQuery } from '@services/category.service.ts';
import { formatSlug } from '@utils/format.ts';
import type { ProductFilters as Filters } from '../../hooks/useProductFilters';

const { filters: copy } = CONTENT.products;

const SEARCH_DEBOUNCE_MS = 400;

type ProductFiltersProps = {
  values: Filters;
  isFiltered: boolean;
  onChange: (patch: Partial<Filters>, options?: { replace?: boolean }) => void;
  onReset: () => void;
};

const ProductFilters = ({
  values,
  isFiltered,
  onChange,
  onReset
}: ProductFiltersProps) => {
  const [search, setSearch] = useState(values.q);
  const [debouncedSearch] = useDebouncedValue(search, SEARCH_DEBOUNCE_MS);
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoryListQuery();

  useEffect(() => {
    if (debouncedSearch !== values.q)
      onChange({ q: debouncedSearch }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Keep the input in sync when the URL changes from outside (back button, links).
  useEffect(() => {
    if (values.q !== debouncedSearch) setSearch(values.q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.q]);

  const handleReset = () => {
    setSearch('');
    onReset();
  };

  const categoryOptions = categories.map(slug => ({
    value: slug,
    label: formatSlug(slug)
  }));

  return (
    <Paper withBorder radius="lg" p="lg" mb="xl">
      <Group justify="space-between" mb="md">
        <Title order={3} fz="lg" fw={700}>
          {copy.title}
        </Title>
        <Group gap="md">
          <Switch
            label={copy.latest.label}
            checked={values.latest}
            onChange={event =>
              onChange({ latest: event.currentTarget.checked })
            }
          />
          <Button
            variant="subtle"
            size="xs"
            leftSection={<FiRotateCcw size={14} />}
            onClick={handleReset}
            disabled={!isFiltered && !search}
          >
            {copy.reset}
          </Button>
        </Group>
      </Group>

      <Grid gap="md">
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <TextInput
            label={copy.search.label}
            placeholder={copy.search.placeholder}
            value={search}
            onChange={event => setSearch(event.currentTarget.value)}
            leftSection={<FiSearch size={16} />}
            rightSection={
              search ? (
                <CloseButton
                  size="sm"
                  aria-label={copy.search.clearAriaLabel}
                  onClick={() => setSearch('')}
                />
              ) : null
            }
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 4, lg: 2 }}>
          <Select
            label={copy.category.label}
            placeholder={copy.category.placeholder}
            data={categoryOptions}
            value={values.category || null}
            onChange={value => onChange({ category: value ?? '' })}
            disabled={categoriesLoading}
            searchable
            clearable
            checkIconPosition="right"
            nothingFoundMessage={CONTENT.home.categories.empty}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 4, lg: 2 }}>
          <Select
            label={copy.sortBy.label}
            placeholder={copy.sortBy.placeholder}
            data={copy.sortBy.options}
            value={values.sortBy || null}
            onChange={value => onChange({ sortBy: value ?? '' })}
            clearable
            checkIconPosition="right"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 4, lg: 2 }}>
          <Select
            label={copy.order.label}
            data={copy.order.options}
            value={values.order}
            onChange={value =>
              value && onChange({ order: value as Filters['order'] })
            }
            disabled={!values.sortBy}
            allowDeselect={false}
            checkIconPosition="right"
          />
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default ProductFilters;
