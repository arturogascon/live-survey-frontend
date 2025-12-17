import { useEffect } from "react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

const socket = io(import.meta.env.VITE_API_URL);

export const useVoteRealTime = (pollId: string) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    socket.on("pollUpdated", (updatedPoll) => {
      queryClient.setQueryData(["poll", pollId!], updatedPoll);
    });

    return () => {
      socket.off("pollUpdated");
    };
  }, [pollId]);
};
