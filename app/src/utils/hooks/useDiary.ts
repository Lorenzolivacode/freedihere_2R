import { useLazyQuery } from "@apollo/client/react";
import { GET_DIARY_BY_DATE, GET_DIARIES_BY_PERIOD } from "../../gql_crud/diary/queries";
import type { IDiaryUser } from "../../types/diary.types";

// Hook per recuperare il diary di un giorno o un periodo
export function useDiary() {
  const [fetchDiaryByDate, { loading: loadingDay, data: dataDay }] =
    useLazyQuery<{ getDiaryByDate: IDiaryUser | null }>(GET_DIARY_BY_DATE);

  const [fetchDiariesByPeriod, { loading: loadingPeriod, data: dataPeriod }] =
    useLazyQuery<{ getDiariesByPeriod: IDiaryUser[] }>(GET_DIARIES_BY_PERIOD);

  const getDiaryByDate = (userId: string, date: string) => {
    fetchDiaryByDate({ variables: { userId, date } });
  };

  const getDiariesByPeriod = (userId: string, from: string, to: string) => {
    fetchDiariesByPeriod({ variables: { userId, from, to } });
  };

  return {
    diary: dataDay?.getDiaryByDate ?? null,
    diaries: dataPeriod?.getDiariesByPeriod ?? [],
    loadingDay,
    loadingPeriod,
    getDiaryByDate,
    getDiariesByPeriod,
  };
}
