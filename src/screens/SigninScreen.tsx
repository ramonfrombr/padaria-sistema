import {
  FormGroup,
  Button,
  Heading,
  Alert,
} from "@aprendaagora/simple-react-component-library";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const SigninScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signin, currentUser } = useAuth();

  const handleLogin = async () => {
    try {
      console.log("Login");
      setError("");
      await signin(email, password);
    } catch {
      console.log("Login falhou");
      setEmail("");
      setPassword("");
      setError("Failed to login.");
    }
  };
  return (
    <div className="mx-auto mt-5 w-[600px] border bg-slate-200 p-5">
      <Heading text="Login" className="mb-10" />
      {error && (
        <Alert closeButton={true} className="mb-5" type="danger" text={error} />
      )}
      <FormGroup
        value={email}
        onChange={(e: string) => setEmail(e)}
        label="Email"
        name="email"
        type="email"
      />

      <FormGroup
        value={password}
        onChange={(e: string) => setPassword(e)}
        label="Password"
        name="password"
        type="password"
        className="mb-2"
      />

      <Button text="Login" className="mt-5 p-2" onClick={handleLogin} />
    </div>
  );
};

export default SigninScreen;
