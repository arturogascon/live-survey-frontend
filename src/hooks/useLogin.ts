import { useMutation } from "@tanstack/react-query";
import { api } from "../api/client";
import type { LoginData } from "../types";

export const useLogin = () =>
  useMutation({
    mutationFn: async (data: LoginData) => {
      const res = await api.post("/auth/login", data);
      return res.data;
    },
    onError: (err) => console.log(err),
  });
