import type { Metadata } from "next";
import { PasswordReset } from "../_components/password-reset";

export const metadata: Metadata = {
  title: "Restablecer contraseña",
};

export default function Reset() {
  return <PasswordReset />;
}
