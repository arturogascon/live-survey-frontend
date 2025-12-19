import { useMutation } from "@tanstack/react-query";
import { api } from "../api/client";
import type { SignUpData } from "../types";
import type { AxiosError } from "axios";

export const useSignup = () =>
  useMutation<any, AxiosError, SignUpData>({
    mutationFn: async (data: SignUpData) => {
      const res = await api.post("/auth/signup", data);
      return res.data;
    },
  });
