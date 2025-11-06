import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/glaze-components/table";
import { CPJ_PEOPLE_HEADER_FIELDS } from "./constants";
import { SkeletonText } from "@/glaze-components/skeleton";

const PeoplePreviewTable = () => {
  return (
    <Table
      grid
      border
      className="rounded-lg border-[0.5px] border-border-tertiary"
    >
      <TableHead>
        <TableRow>
          <TableHeader sortable={false}></TableHeader>
          {CPJ_PEOPLE_HEADER_FIELDS.map((field) => (
            <TableHeader key={field.id} sortable={false}>
              {field.name}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell width={30} />
            {CPJ_PEOPLE_HEADER_FIELDS.map((field) => (
              <TableCell key={field.id} width={field.width}>
                <SkeletonText size="md" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PeoplePreviewTable;
