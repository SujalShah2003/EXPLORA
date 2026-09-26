import { ActionIcon, Group, Input, NumberInput, Paper } from '@mantine/core';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { CONTENT } from '@/constants';

const copy = CONTENT.common.quantity;

type QuantityInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  disabled?: boolean;
};

const QuantityInput = ({
  value,
  onChange,
  min = 1,
  max = Infinity,
  label,
  disabled = false
}: QuantityInputProps) => {
  const clamp = (next: number) => Math.min(max, Math.max(min, next));

  return (
    <Input.Wrapper label={label}>
      <Paper withBorder radius="md" w="fit-content">
        <Group gap={0} wrap="nowrap">
          <ActionIcon
            variant="subtle"
            color="gray"
            size={36}
            radius="md"
            aria-label={copy.decrease}
            onClick={() => onChange(clamp(value - 1))}
            disabled={disabled || value <= min}
          >
            <FiMinus size={16} />
          </ActionIcon>
          <NumberInput
            variant="unstyled"
            aria-label={label ?? copy.label}
            value={value}
            onChange={next => onChange(clamp(Number(next) || min))}
            min={min}
            max={Number.isFinite(max) ? max : undefined}
            clampBehavior="strict"
            allowDecimal={false}
            allowNegative={false}
            hideControls
            disabled={disabled}
            w={48}
            styles={{ input: { textAlign: 'center', fontWeight: 600 } }}
          />
          <ActionIcon
            variant="subtle"
            color="gray"
            size={36}
            radius="md"
            aria-label={copy.increase}
            onClick={() => onChange(clamp(value + 1))}
            disabled={disabled || value >= max}
          >
            <FiPlus size={16} />
          </ActionIcon>
        </Group>
      </Paper>
    </Input.Wrapper>
  );
};

export default QuantityInput;
