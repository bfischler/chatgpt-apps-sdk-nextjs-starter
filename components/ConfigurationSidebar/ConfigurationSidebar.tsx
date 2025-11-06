import { Text } from "@/glaze-components/text";
import {
  ConfigurationSection,
  ConfigurationSectionBody,
  ConfigurationSectionHeader,
} from "./ConfigurationSection";
import { PeopleSourceInputs } from "./types";
import { DataPointCard } from "./DataPointCard";
import useFormattedPeopleFilters from "@/app/hooks/useFormattedPeopleFilters";

const SUPPORTED_DATA_POINTS = [
  "Email",
  "Phone Number",
  "Determine AI Industry Expertise",
];

interface ConfigurationSidebarProps {
  filters: Partial<PeopleSourceInputs>;
  dataPoints: string[];
  onChangeFilters: (filters: Partial<PeopleSourceInputs>) => void;
  onChangeDataPoints: (dataPoints: string[]) => void;
}

const ConfigurationSidebar = ({
  filters,
  dataPoints,
  onChangeDataPoints,
}: ConfigurationSidebarProps) => {
  const formattedFilters = useFormattedPeopleFilters(filters);

  const onToggleDataPoint = (dataPoint: string) => {
    if (dataPoints.includes(dataPoint)) {
      onChangeDataPoints(dataPoints.filter((dp) => dp !== dataPoint));
    } else {
      onChangeDataPoints([...dataPoints, dataPoint]);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-96 border-y border-l p-4 border-border-tertiary">
      <div className="flex flex-col gap-2">
        <Text size="sm" weight="medium">
          How To Use Clay
        </Text>
        <div className="flex flex-col">
          <Text size="sm" variant="secondary" weight="normal">
            1. Chat to update search filters below
          </Text>
          <Text size="sm" variant="secondary" weight="normal">
            2. Click on a suggested data point below
          </Text>
          <Text size="sm" variant="secondary" weight="normal">
            3. Chat to come up with a unique data point below
          </Text>
        </div>
      </div>
      <ConfigurationSection>
        <ConfigurationSectionHeader
          title="Current Filters"
          count={formattedFilters.size}
        />
        <ConfigurationSectionBody>
          <div className="flex flex-col gap-2">
            {Array.from(formattedFilters.entries()).map(([key, value]) => (
              <Text key={key} size="xs">
                {key}: {value}
              </Text>
            ))}
          </div>
        </ConfigurationSectionBody>
      </ConfigurationSection>
      <ConfigurationSection>
        <ConfigurationSectionHeader title="Data Points" />
        <ConfigurationSectionBody>
          <div className="flex flex-wrap gap-2">
            {SUPPORTED_DATA_POINTS.map((dataPoint) => (
              <DataPointCard
                key={dataPoint}
                dataPoint={dataPoint}
                selected={dataPoints.includes(dataPoint)}
                onSelect={() => onToggleDataPoint(dataPoint)}
              />
            ))}
          </div>
        </ConfigurationSectionBody>
      </ConfigurationSection>
    </div>
  );
};

export default ConfigurationSidebar;
