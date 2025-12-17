import { useMutation } from "@tanstack/react-query";
import { api } from "../api/client";
import type { SignUpData } from "../types";

export const useSignup = () =>
  useMutation({
    mutationFn: async (data: SignUpData) => {
      const res = await api.post("/auth/signup", data);
      return res.data;
    },
  });
