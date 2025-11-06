import AuthForm from "@/components/form/auth-form";
import { SiAwssecretsmanager } from "react-icons/si";

export default function AuthPage() {
  return (
    <div className="flex min-h-screen content-center justify-center">
      <div className="flex max-sm:flex-col p-8 gap-20 max-sm:gap-2 lg:max-w-9/12">
        <div className="flex-1 content-center gap-6">
          <div className="flex gap-6">
            <div className="content-center">
              <SiAwssecretsmanager size={100} />
            </div>
            <div className="text-start space-y-4">
              <h1 className="text-5xl">Secret Page App</h1>
              <div className="space-y-2">
                <h1 className="text-2xl">Secure Your Digital World</h1>
                <p className="font-normal">
                  Your private space, simplified.
                  Manage your secret pages and user
                  accounts with the highest level
                  of security and ease of use.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 content-center self-center">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
