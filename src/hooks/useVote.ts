import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";
import { markPollAsVoted } from "../utils/voteStorage";
import type { AxiosError } from "axios";

export const useVote = (pollId: string) => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, string>({
    mutationFn: async (optionId: string) => {
      const res = await api.post(`/polls/${pollId}/vote/${optionId}`);

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poll", pollId] });
      markPollAsVoted(pollId);
    },
  });
};
