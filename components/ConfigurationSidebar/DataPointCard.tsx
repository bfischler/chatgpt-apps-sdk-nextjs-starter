import Icon from "@/glaze-components/icon";
import { Text } from "@/glaze-components/text";
import { Button } from "@headlessui/react";
import { CheckIcon, PlusIcon, XIcon } from "@phosphor-icons/react";
import clsx from "clsx";

interface DataPointCardProps {
  dataPoint: string;
  selected: boolean;
  onSelect: () => void;
}

export const DataPointCard = ({
  dataPoint,
  selected,
  onSelect,
}: DataPointCardProps) => {
  return (
    <Button
      className={clsx(
        "flex rounded-xl border border-border-tertiary p-2 cursor-pointer items-center gap-2",
        selected
          ? "bg-[rgba(2,133,255,0.04)] !cursor-default"
          : "hover:bg-bg-secondary"
      )}
      onClick={selected ? undefined : onSelect}
    >
      <Text size="xs" weight="normal">
        {dataPoint}
      </Text>
      {selected ? (
        <Icon size="sm" variant="tertiary" type={CheckIcon} />
      ) : (
        <Icon size="sm" variant="tertiary" type={PlusIcon} />
      )}
    </Button>
  );
};
