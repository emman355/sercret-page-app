import AuthForm from "@/components/form/auth-form";
import Typography from "@/components/typography";
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
              <Typography variant="h1" className="text-5xl font-semibold">Secret Page App</Typography>
              <div className="space-y-2">
                <Typography variant="subtitle" className="font-semibold">Secure Your Digital World</Typography>
                <Typography variant="body" className="font-normal">
                  Your private space, simplified.
                  Manage your secret pages and user
                  accounts with the highest level
                  of security and ease of use.
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 content-center self-center w-full">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
