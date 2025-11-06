import { z } from "zod";

export enum StartFromJobsEnum {
  ClayTableOfCompanies = "ClayTableOfCompanies",
  CsvOfCompanies = "CsvOfCompanies",
}
export enum StartFromPeopleEnum {
  ClayTableOfCompanies = "query",
  CsvOfCompanies = "CsvOfCompanies",
  ExternalListFromUrl = "url",
}
export enum StartFromCompaniesEnum {
  LOOKALIKES = "company_identifier",
  DESCRIPTION = "semantic_description",
}

// 2500 is the max from Golden Leads
export const MAX_IMPORT_FROM_EXTERNAL_LIST = 2500;

export const COMPANY_SIZE_DISPLAY_VALUES = z.enum([
  "Self-employed",
  "2-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1,000 employees",
  "1,001-5,000 employees",
  "5,001-10,000 employees",
  "10,001+ employees",
]);
export type CompanySizeDisplayValues = z.infer<
  typeof COMPANY_SIZE_DISPLAY_VALUES
>;

export const CPJType = z.enum(["companies", "people", "jobs"]);
export type CPJType = z.infer<typeof CPJType>;

const VALID_COMPANY_SIZES_FOR_PEOPLE_SOURCE = z.enum([
  "1",
  "2-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1,000",
  "1,001-5,000",
  "5,001-10,000",
  "10,001+",
]);
export type CompanySizeForPeopleSource = z.infer<
  typeof VALID_COMPANY_SIZES_FOR_PEOPLE_SOURCE
>;

export const VALID_COMPANY_SIZES_FOR_COMPANY_SOURCE = z.enum([
  "1",
  "2",
  "10",
  "50",
  "200",
  "500",
  "1000",
  "5000",
  "10000",
]);
export type CompanySizeForCompanySource = z.infer<
  typeof VALID_COMPANY_SIZES_FOR_COMPANY_SOURCE
>;

const BaseInputs = z.object({
  name: z.string().nullish(),
});

const JobTitleInputs = z.object({
  job_title_exclude_keywords: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Search for one or more comma-separated keywords that shouldn't be in the person's job title. E.g 'Vice, Junior'"
    ),
  job_title_keywords: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Search for one or more comma-separated keywords in the person's job title. E.g 'Founder, Vice President'"
    ),
});

const PostingDateInputs = z.object({
  min_num_days_since_posted: z.number().min(0).nullish(),
  max_num_days_since_posted: z.number().min(0).nullish(),
});

const JobDescriptionInputs = z.object({
  job_description_keywords: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Search for one or more comma-separated keywords in the person's experience description. E.g 'success, management'"
    ),
});

// Inputs for include and exclude fields
export enum IdentifierMappingTypesEnum {
  TABLE = "table",
  CSV = "csv",
  LIST = "list",
}

const IdentifierMappingTable = z.object({
  source_type: z.literal(IdentifierMappingTypesEnum.TABLE),
  table_id: z.string(),
  table_view_id: z.string(),
  table_field_id: z.string(),
  bitmap_name: z.string().nullish(),
});

const IdentifierMappingCsv = z.object({
  source_type: z.literal(IdentifierMappingTypesEnum.CSV),
  import_job_id: z.string(),
  file_name: z.string(),
  key: z.string(),
  field_index: z.number().int(),
  field_name: z.string().nullish(),
  has_header: z.boolean().nullish(),
  delimiter: z.string().nullish(),
  bitmap_name: z.string().nullish(),
});

const IdentifierMappingList = z.object({
  source_type: z.literal(IdentifierMappingTypesEnum.LIST),
  identifiers: z.array(z.string()).min(1),
  bitmap_name: z.string().nullish(),
  migrated_mixed_identifiers: z.boolean().nullish(),
});

export const IdentifierMapping = z.discriminatedUnion("source_type", [
  IdentifierMappingCsv,
  IdentifierMappingList,
  IdentifierMappingTable,
]);

export type IdentifierMappingType = z.infer<typeof IdentifierMapping>;

const PlanLimitInput = (planLimit: number) =>
  z.object({
    limit: z
      .number()
      .min(1)
      .max(planLimit, {
        message: `Your current plan provides up to ${planLimit.toLocaleString()} per search.`,
      })
      .nullish(),
  });

const monthSchema = z
  .string()
  .regex(/^\d{4}-(?<temp1>0[1-9]|1[0-2])$/, {
    message: "Invalid month format. Use YYYY-MM.",
  })
  .or(z.literal(""));

// People Source Inputs, Company Source Inputs, and Jobs Source Inputs are also used in the natural language
// to filters generator in AI Onboarding; these rely heavily on the zod schema (types & descriptions) to be
// accurate and specific.
export const PeopleSourceInputs = z.object({
  // Start from
  start_from_method: z
    .nativeEnum(StartFromPeopleEnum)
    .default(StartFromPeopleEnum.CsvOfCompanies),
  company_identifier: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Company LinkedIn URL, Company Domain, Sales Navigator URL, or Sales Navigator Company ID. Use Company LinkedIn URL for highest accuracy. E.g. 'https://www.linkedin.com/company/clay-run' or clay.com"
    ),
  company_record_id: z.array(z.string()).nullish().default([]),
  company_table_field_id: z.string().nullish(),
  company_table_id: z.string().nullish().default(""),
  company_table_view_id: z.string().nullish(),

  // People exclusion configuration and bitmap
  exclude_entities_configuration: z
    .array(IdentifierMapping)
    .max(3)
    .optional()
    .default([]),
  exclude_entities_bitmap: z.string().nullish(),
  previous_entities_bitmap: z.string().nullish(),

  // Must include legacy bitmap field to support legacy sources -- otherwise, the wizard
  // will *not* submit the previous bitmap as part of a source edit, breaking the source
  exclude_entity_bitmap: z.string().nullish(),

  // Languages
  languages: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Search for one or more comma-separated languages spoken by the person"
    ),
  // Certs
  certification_keywords: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Search for one or more comma-separated keywords in the profile's certifications"
    ),
  // Education
  school_names: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Search for one or more comma-separated schools that were attended by the person"
    ),
  // Profile
  names: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Search for one or more comma-separated names. Can be first name, last name, or both"
    ),
  profile_keywords: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Search for one or more comma-separated keywords across the whole profile"
    ),
  headline_keywords: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Search for one or more comma-separated keywords in the profile headline"
    ),
  about_keywords: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Search for one or more comma-separated keywords in the profile about section"
    ),
  connection_count: z
    .number()
    .min(0)
    .nullish()
    .describe("The minimum number of connections that the person has"),
  max_connection_count: z
    .number()
    .min(0)
    .nullish()
    .describe("The maximum number of connections that the person has"),
  follower_count: z
    .number()
    .min(0)
    .nullish()
    .describe("The minimum number of followers that the person has"),
  max_follower_count: z
    .number()
    .min(0)
    .nullish()
    .describe("The maximum number of followers that the person has"),
  // Experience
  current_role_min_months_since_start_date: z
    .number()
    .min(0)
    .nullish()
    .describe(
      "The minimum number of months since the start date of the current role"
    ),
  current_role_max_months_since_start_date: z
    .number()
    .min(0)
    .nullish()
    .describe(
      "The maximum number of months since the start date of the current role"
    ),
  experience_count: z
    .number()
    .min(0)
    .nullish()
    .describe("The minimum number of experiences that the person has"),
  max_experience_count: z
    .number()
    .min(0)
    .nullish()
    .describe("The maximum number of experiences that the person has"),

  include_past_experiences: z
    .boolean()
    .default(false)
    .describe("Toggle to include past experiences in the company"),
  // Exclude
  exclude_people_identifiers_mixed: z.array(z.string()).optional().default([]),
  // Job title
  job_title_exact_keyword_match: z
    .boolean()
    .default(false)
    .describe(
      "Toggle to require an exact keyword match in the job title search"
    ),
  job_functions: z
    .array(z.string())
    .optional()
    .default([])
    .describe("Include job functions"),
  job_title_seniority_levels: z
    .array(z.string())
    .optional()
    .default([])
    .describe("Search for one or more levels in the person's job title."),
  // Location
  locations: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Search for one or more comma-separated locations. A location can be a city or a country. E.g. 'Berlin', 'United States'"
    ),
  locations_exclude: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Exclude one or more comma-separated locations. A location can be a city or a country. E.g. 'Berlin', 'United States'"
    ),
  location_cities_exclude: z
    .array(z.string())
    .optional()
    .default([])
    .describe("Exclude one or more cities"),
  location_cities_include: z
    .array(z.string())
    .optional()
    .default([])
    .describe("Include one or more cities"),
  location_countries_exclude: z
    .array(z.string())
    .optional()
    .default([])
    .describe("Exclude one or more countries"),
  location_countries_include: z
    .array(z.string())
    .optional()
    .default([])
    .describe("Include one or more countries"),
  location_regions_exclude: z
    .array(z.string())
    .optional()
    .default([])
    .describe("Exclude one or more regions"),
  location_regions_include: z
    .array(z.string())
    .optional()
    .default([])
    .describe("Include one or more regions"),
  search_raw_location: z.boolean().optional().default(false),
  location_states_exclude: z
    .array(z.string())
    .optional()
    .default([])
    .describe("Exclude states, provinces, or municipalities"),
  location_states_include: z
    .array(z.string())
    .optional()
    .default([])
    .describe("Include states, provinces, or municipalities"),
  // Company
  company_sizes: z
    .array(VALID_COMPANY_SIZES_FOR_PEOPLE_SOURCE)
    .optional()
    .default([])
    .describe("Search for one or more company sizes. e.g 11-50, 51-200"),
  company_industries_exclude: z
    .array(z.string())
    .optional()
    .default([])
    .describe("Exclude one or more industries"),
  company_industries_include: z
    .array(z.string())
    .optional()
    .default([])
    .describe("Include one or more industries"),
  company_description_keywords_exclude: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Exclude one or more comma-separated keywords in the company's description. E.g 'remote, beginners'"
    ),
  company_description_keywords: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Search for one or more comma-separated keywords in the company's description. E.g 'trusted, experts'"
    ),
  // Limit
  limit: z
    .number()
    .min(1)
    .nullish()
    .describe(
      "Limit number of results returned. Defaults to 10000. Maximum 10000"
    ),
  limit_per_company: z
    .number()
    .min(1)
    .max(100)
    .nullish()
    .describe("Limit number of results returned per company"),
  role_range_start_month: monthSchema
    .nullish()
    .describe("Match experiences that ended on or after this month"),
  role_range_end_month: monthSchema
    .nullish()
    .describe("Match experiences that started on or before this month"),
  ...BaseInputs.shape,
  ...JobTitleInputs.shape,
  ...JobDescriptionInputs.shape,
});

export type PeopleSourceInputs = z.infer<typeof PeopleSourceInputs>;
export const PeopleSourceInputsWithParams = ({
  planLimit,
}: {
  planLimit: number;
}) =>
  z.object({
    ...PeopleSourceInputs.shape,
    ...PlanLimitInput(planLimit).shape,
  });

export const JobsSourceInputs = z.object({
  // Exclude
  exclude_job_identifiers: z.array(z.string()).optional().default([]),
  // Start from
  // --> The API doesn't care about this field but RHF cares that we have it
  startFrom: z.nativeEnum(StartFromJobsEnum),
  company_identifier: z.array(z.string()).optional().default([]),
  company_record_id: z.array(z.string()).nullish().default([]),
  company_table_field_id: z.string().nullish(),
  company_table_id: z.string().nullish().default(""),
  company_table_view_id: z.string().nullish(),
  // Location
  locations: z.array(z.string()).optional().default([]),
  locations_exclude: z.array(z.string()).optional().default([]),
  // Limit
  limit: z.number().min(1).nullish(),
  limit_per_company: z.number().min(1).max(100).nullish(),
  // Employment
  employment_type: z.array(z.string()).optional().default([]),
  // Recruiter
  has_recruiter: z.boolean().default(false),
  ...BaseInputs.shape,
  ...JobTitleInputs.shape,
  ...PostingDateInputs.shape,
  ...JobDescriptionInputs.shape,
});

export type JobsSourceInputs = z.infer<typeof JobsSourceInputs>;
export type JobsSourceInputKeys = keyof JobsSourceInputs;
export const JobsSourceInputsWithParams = ({
  planLimit,
}: {
  planLimit: number;
}) =>
  z.object({
    ...JobsSourceInputs.shape,
    ...PlanLimitInput(planLimit).shape,
  });

export const CompanySourceInputs = z.object({
  types: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Search for one or more company types. E.g Public Company, Non Profit"
    ),
  // Location
  country_names: z
    .array(z.string())
    .optional()
    .default([])
    .describe("Search for one or more countries."),
  country_names_exclude: z
    .array(z.string())
    .optional()
    .default([])
    .describe("Exclude one or more countries."),
  // Company
  sizes: z
    .array(VALID_COMPANY_SIZES_FOR_COMPANY_SOURCE)
    .optional()
    .default([])
    .describe(
      "Search for one or more reported company sizes. E.g 11-50, 51-200"
    ),
  funding_amounts: z
    .array(z.string())
    .optional()
    .default([])
    .describe("Search for one or more funding amount ranges. E.g $1M - $5M"),
  annual_revenues: z
    .array(z.string())
    .optional()
    .default([])
    .describe("Search for one or more annual revenue ranges. E.g $1M - $5M"),
  industries: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Search for one or more industries in the company's description. E.g 'Utilities, Manufacturing'"
    ),
  industries_exclude: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Exclude one or more industries in the company's description. E.g 'Utilities, Manufacturing'"
    ),
  description_keywords_exclude: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Exclude one or more keywords in the company's description. E.g 'remote, beginners'"
    ),
  description_keywords: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Search for one or more keywords in the company's description. E.g 'trusted, experts'"
    ),
  minimum_follower_count: z
    .number()
    .min(0)
    .nullish()
    .describe("Search for companies with at least this many followers"),
  minimum_member_count: z
    .number()
    .min(0)
    .nullish()
    .describe(
      "Search for companies with at least this many associated members"
    ),
  maximum_member_count: z
    .number()
    .min(0)
    .nullish()
    .describe("Search for companies with at most this many associated members"),
  locations: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Search for one or more comma-separated locations. A location can be a city or a state. E.g. 'Berlin', 'Texas'"
    ),
  locations_exclude: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Exclude one or more comma-separated locations. A location can be a city or a state. E.g. 'Berlin', 'Texas'"
    ),
  // Start from
  [StartFromCompaniesEnum.DESCRIPTION]: z
    .string()
    .optional()
    .describe("Help rank results based on company description"),
  [StartFromCompaniesEnum.LOOKALIKES]: z
    .array(z.string())
    .optional()
    .default([])
    .describe(
      "Comma-separated List of Company LinkedIn URLs or Company Domains E.g. 'seamless.com, doordash.com'"
    ), // company_identifier
  // --> The API doesn't care about this field but RHF cares that we have it
  startFromCompanyType: z.nativeEnum(StartFromCompaniesEnum),
  // Exclude
  exclude_company_identifiers_mixed: z.array(z.string()).optional().default([]),
  // The configuration for the companies excluded via roaring bitmap
  exclude_entities_configuration: z
    .array(IdentifierMapping)
    .max(3)
    .optional()
    .default([]),
  exclude_entities_bitmap: z.string().nullish(),
  previous_entities_bitmap: z.string().nullish(),
  // Derived datapoints
  derived_industries: z.array(z.string()).optional().default([]),
  derived_subindustries: z.array(z.string()).optional().default([]),
  derived_subindustries_exclude: z.array(z.string()).optional().default([]),
  derived_revenue_streams: z.array(z.string()).optional().default([]),
  derived_business_types: z.array(z.string()).optional().default([]),
  // Limit
  limit: z
    .number()
    .min(1)
    .nullish()
    .describe(
      "Limit number of results returned. Defaults to 10000. Maximum 10000"
    ),
  // CRM
  tableId: z.string().nullish(),
  domainFieldId: z.string().nullish(),
  // KNN search params
  useRadialKnn: z.boolean().default(false),
  radialKnnMinScore: z.number().min(0).max(5).nullish(),
  ...BaseInputs.shape,
});

export type CompanySourceInputs = z.infer<typeof CompanySourceInputs>;

export const CompanySourceInputsWithParams = ({
  planLimit,
}: {
  planLimit: number;
}) =>
  z.object({
    ...CompanySourceInputs.shape,
    ...PlanLimitInput(planLimit).shape,
  });

export const csvToArray = z.string().transform((val) => val.split(","));

export const INPUT_KEYS_TO_EXCLUDE_FROM_TEMPLATE_DATA = ["company_identifier"];
