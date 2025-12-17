import type { Poll } from "../types";
import { api } from "./client";

export const getPolls = async (): Promise<Poll[]> => {
  const res = await api.get("/polls");
  return res.data;
};

export const getPollById = async (id: string): Promise<Poll> => {
  const res = await api.get(`/polls/${id}`);
  return res.data;
};
