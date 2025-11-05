import { isLoggedIn } from "@/constants/constants";
import AuthPage from "@/modules/AuthPage";
import HomePage from "@/modules/HomePage";


export default function Page() {
  return (
    <>
      {isLoggedIn ? <HomePage /> : <AuthPage />}
    </>
  )
}
