import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/glaze-components/table";
import { CPJ_PEOPLE_HEADER_FIELDS } from "./constants";
import Link from "next/link";
import PeoplePreviewTable from "./PeoplePreviewTable";
import { FindPeopleResult } from "./data";
import { useDisplayMode } from "@/app/hooks";

interface PeopleTableProps {
  data: FindPeopleResult | null;
  additionalDataPoints: string[];
  loading: boolean;
  className?: string;
}

const PeopleTable = ({
  data,
  additionalDataPoints,
  loading,
  className,
}: PeopleTableProps) => {
  const displayMode = useDisplayMode();

  if (loading) {
    return <PeoplePreviewTable />;
  }

  return (
    <Table grid overflowX={displayMode === "fullscreen"} className={className}>
      <TableHead>
        <TableRow>
          <TableHeader
            sortable={false}
            className="text-center"
            width={displayMode === "fullscreen" ? 40 : undefined}
          ></TableHeader>
          {CPJ_PEOPLE_HEADER_FIELDS.map((field) => (
            <TableHeader
              key={field.id}
              sortable={false}
              width={displayMode === "fullscreen" ? field.width : undefined}
            >
              {field.name}
            </TableHeader>
          ))}
          {additionalDataPoints.map((dataPoint) => (
            <TableHeader
              key={dataPoint}
              sortable={false}
              width={displayMode === "fullscreen" ? 100 : undefined}
            >
              {dataPoint}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.result.people.map((row, index) => (
          <TableRow
            key={row.name}
            onClick={() => console.log("Clicked row:", row)}
            className="cursor-pointer"
          >
            <TableCell
              width={displayMode === "fullscreen" ? 40 : undefined}
              className="text-center"
            >
              {index + 1}
            </TableCell>
            {CPJ_PEOPLE_HEADER_FIELDS.map((field) => (
              <TableCell
                key={field.id}
                width={displayMode === "fullscreen" ? field.width : undefined}
              >
                {field.type === "url" ? (
                  row[field.id as keyof typeof row] ? (
                    <Link
                      href={row[field.id as keyof typeof row] as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Profile
                    </Link>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )
                ) : (
                  row[field.id as keyof typeof row]
                )}
              </TableCell>
            ))}
            {additionalDataPoints.map((dataPoint) => (
              <TableCell
                key={dataPoint}
                width={displayMode === "fullscreen" ? 100 : undefined}
              ></TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PeopleTable;
