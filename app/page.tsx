import { isLoggedIn } from "@/constants/constants";
import AuthPage from "@/modules/auth-page";
import HomePage from "@/modules/home-page";


export default function Page() {
  return (
    <>
      {isLoggedIn ? <HomePage /> : <AuthPage />}
    </>
  )
}
