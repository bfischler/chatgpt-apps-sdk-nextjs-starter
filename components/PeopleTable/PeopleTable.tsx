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
import { useEffect, useState } from "react";
import PeoplePreviewTable from "./PeoplePreviewTable";
import { FindPeopleResult } from "./data";
import clsx from "clsx";

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
  if (loading) {
    return <PeoplePreviewTable />;
  }

  return (
    <Table
      grid
      border
      className={clsx("border-[0.5px] border-border-tertiary", className)}
    >
      <TableHead>
        <TableRow>
          <TableHeader sortable={false} className="text-center"></TableHeader>
          {CPJ_PEOPLE_HEADER_FIELDS.map((field) => (
            <TableHeader key={field.id} sortable={false}>
              {field.name}
            </TableHeader>
          ))}
          {additionalDataPoints.map((dataPoint) => (
            <TableHeader key={dataPoint} sortable={false}>
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
            <TableCell width={40} className="text-center">
              {index + 1}
            </TableCell>
            {CPJ_PEOPLE_HEADER_FIELDS.map((field) => (
              <TableCell key={field.id} width={field.width}>
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
              <TableCell key={dataPoint} width={100}></TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PeopleTable;
