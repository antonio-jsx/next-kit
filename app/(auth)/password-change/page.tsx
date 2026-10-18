import type { Metadata } from "next";
import { PasswordChange } from "../_components/password-change";

export const metadata: Metadata = {
  title: "Cambiar contraseña",
};

export default function Change() {
  return <PasswordChange />;
}
