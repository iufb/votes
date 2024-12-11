import { customFetch } from ".";
import { ParticipantType } from "../types";
export const LoginRequst = (data: { username: string; password: string }) => {
  return customFetch(
    {
      method: "POST",
      path: "api-token-auth/",
      body: { json: data },
    },
    false,
  );
};
export const AddParticipantRequest = (data: {
  full_name: string;
  place_of_study: string;
  teacher_full_name: string;
  teacher_phone: string;
}) => {
  return customFetch({
    path: "add-participant/",
    method: "POST",
    body: { json: data },
  });
};
export const AddScoreRequest = (data: {
  stage: string;
  score: string;
  participant_id: number;
  juri_id: number;
  criterion_id: number;
}) => {
  return customFetch({
    path: "set-score/",
    method: "POST",
    body: { json: data },
  });
};
export const GetParticipantsRequest = () => {
  return customFetch({
    method: "GET",
    path: "participants",
  });
};
export const UpdateParticipantsRequest = (data: Partial<ParticipantType>) => {
  return customFetch({
    method: "PATCH",
    path: `participants/${data.id}/`,
    body: { json: data },
  });
};
export const GetCount = () => {
  return customFetch({
    method: "GET",
    path: "count",
  });
};
export const SetCount = async (count: string) => {
  const counts = await GetCount();
  if (counts.length > 0) {
    return customFetch({
      method: "PATCH",
      path: `count/1/`,
      body: { json: { count } },
    });
  } else {
    return customFetch({
      method: "POST",
      path: "count/",
      body: { json: { count } },
    });
  }
};

export const GetCriteriousesRequest = (stage: string) => {
  return customFetch({
    method: "GET",
    path: `get-criterios`,
    query: { stage },
  });
};
export const GetUserInfoRequest = () => {
  return customFetch({ method: "GET", path: "get-user-info" });
};
export const GetParticipantsScore = (stage: string) => {
  return customFetch({
    method: "GET",
    path: "participants_scores",
    query: { stage },
  });
};
export const GetFinalScore = () => {
  return customFetch({
    method: "GET",
    path: "participants_scores",
  });
};
