export const getIsPollVoted = (pollId: string) =>
  localStorage.getItem(`voted_${pollId}`) === "true";

export const markPollAsVoted = (pollId: string) =>
  localStorage.setItem(`voted_${pollId}`, "true");
