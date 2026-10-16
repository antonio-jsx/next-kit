import type { Metadata } from "next";
import { SignUp } from "../_components/sign-up";

export const metadata: Metadata = {
  title: "Crear cuenta",
};

export default function Registro() {
  return <SignUp />;
}
