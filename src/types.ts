export type LoginData = { email: string; password: string };

export type SignUpData = { name: string } & LoginData;

export type Option = {
  _id: string;
  text: string;
  votes: number;
};

export type PollData = {
  question: string;
  options: Array<string>;
};

export type Poll = {
  _id: string;
  question: string;
  totalVotes: number;
  options: Option[];
  isActive: boolean;
  createdAt: string;
};
