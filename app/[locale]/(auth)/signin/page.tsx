import AuthLayout from "@/views/auth/components/AuthLayout";
import { AUTH_TYPES } from "@/views/auth/types/auth.enum";

export default function SigninPage() {
  return <AuthLayout type={AUTH_TYPES.SIGNIN} />;
}
