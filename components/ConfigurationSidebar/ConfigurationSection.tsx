import { Text } from "@/glaze-components/text";

interface ConfigurationSectionProps {
  children: React.ReactNode;
}
export const ConfigurationSection = ({
  children,
}: ConfigurationSectionProps) => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden border border-border-tertiary">
      {children}
    </div>
  );
};

interface ConfigurationSectionHeaderProps {
  title: string;
  count?: number;
}

export const ConfigurationSectionHeader = ({
  title,
  count,
}: ConfigurationSectionHeaderProps) => {
  console.log("BRETT count", count);
  return (
    <div className="flex border-b border-border-tertiary p-4 gap-2 items-center">
      <Text size="sm" weight="semibold">
        {title}
      </Text>
      {!!count && count > 0 && (
        <Text size="sm" variant="tertiary" weight="normal">
          ({count})
        </Text>
      )}
    </div>
  );
};

interface ConfigurationSectionBodyProps {
  children: React.ReactNode;
}

export const ConfigurationSectionBody = ({
  children,
}: ConfigurationSectionBodyProps) => {
  return <div className="flex flex-col items-start p-4 gap-2">{children}</div>;
};
