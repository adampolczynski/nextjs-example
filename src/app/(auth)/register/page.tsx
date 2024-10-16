"use client";

import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { AuthFormCard, MainContainer } from "@/components";
import { request } from "@/api/request";

export default () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [info, setInfo] = useState("");
  const [error, setError] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      throw new Error("Provide credentials");
    }
    if (repeatPassword !== password) {
      throw new Error("Passwords do not match");
    }

    if (!RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(email)) {
      throw new Error("Invalid email format");
    }
  };

  const submit = async () => {
    try {
      validateInputs();
      await request("/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          repeatPassword,
        }),
      });

      setInfo("Account created, you will be redirected to log in");
      router.push("/login");
    } catch (error) {
      const e = error as Error;
      setError(e.message);
    }
  };

  useEffect(() => {
    setError("");
  }, [email, password, repeatPassword]);

  return (
    <MainContainer>
      <h2>Register page</h2>
      {info ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <h3 style={{ color: "green", marginRight: "1rem" }}>{info}</h3>
          <div className="spinner-border" role="status" />
        </div>
      ) : null}
      {error ? <h3 style={{ color: "orange" }}>{error}</h3> : null}
      <AuthFormCard>
        <Form.Control
          tabIndex={1}
          type="email"
          placeholder="Email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          style={{ marginBottom: "1rem" }}
        />
        <Form.Control
          tabIndex={2}
          type="password"
          placeholder="Password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          style={{ marginBottom: "1rem" }}
        />
        <Form.Control
          tabIndex={3}
          type="password"
          placeholder="Repeat password"
          value={repeatPassword}
          onChange={({ target: { value } }) => setRepeatPassword(value)}
          style={{ marginBottom: "1rem" }}
        />
        <Button tabIndex={4} onClick={submit}>
          Create account
        </Button>
      </AuthFormCard>
    </MainContainer>
  );
};
