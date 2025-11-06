interface Field {
  name: string;
  id: string;
  type: "text" | "url";
  width: number;
}

export const CPJ_PEOPLE_HEADER_FIELDS: Field[] = [
  {
    name: "Name",
    id: "name",
    type: "text",
    width: 150,
  },
  {
    name: "Company Name",
    id: "latest_experience_company",
    type: "text",
    width: 150,
  },
  {
    name: "Job Title",
    id: "latest_experience_title",
    type: "text",
    width: 150,
  },
  {
    name: "Location",
    id: "location_name",
    type: "text",
    width: 150,
  },
  {
    name: "LinkedIn URL",
    id: "url",
    type: "url",
    width: 150,
  },
];
