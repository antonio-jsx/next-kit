import type { Metadata } from "next";
import { SignIn } from "../_components/sign-in";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function Login() {
  return <SignIn />;
}
