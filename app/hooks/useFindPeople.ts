import {
  FindPeopleResult,
  OPENAI_FIND_PEOPLE_RESULT,
} from "@/components/PeopleTable/data";
import { useEffect, useState } from "react";

const LIMIT = 10;

interface UseFindPeopleReturn {
  loading: boolean;
  data: FindPeopleResult | null;
}

export const useFindPeople = (): UseFindPeopleReturn => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const limitedData: FindPeopleResult = {
    ...OPENAI_FIND_PEOPLE_RESULT,
    result: {
      ...OPENAI_FIND_PEOPLE_RESULT.result,
      people: OPENAI_FIND_PEOPLE_RESULT.result.people.slice(0, LIMIT),
    },
  };

  return {
    loading,
    data: loading ? null : limitedData,
  };
};
