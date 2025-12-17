import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signupMutation = useSignup();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    signupMutation.mutate(form, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      },
    });
  };

  return (
    <div className="form-container">
      {signupMutation.isError && <p>{"Error al registrarte"}</p>}
      <form onSubmit={handleSubmit}>
        <h2>Registro</h2>

        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
          autoComplete="off"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <button
          type="submit"
          disabled={!form.email || !form.name || !form.password}
        >
          {signupMutation.isPending ? "Enviando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
