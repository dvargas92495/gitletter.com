import Switch from "@dvargas92495/app/components/Switch";
export {default as ErrorBoundary} from "@dvargas92495/app/components/DefaultErrorBoundary";
export  {default as CatchBoundary} from "@dvargas92495/app/components/DefaultCatchBoundary";
import { useUser } from "@clerk/remix";
import SOURCES from "~/enums/sources";

const SourcesPage = () => {
  const { user } = useUser();
  const accounts = new Set(
    (user?.verifiedExternalAccounts || []).map((e) => `oauth_${e.provider}`)
  );
  return (
    <div className="rounded-2xl shadow-lg p-8 max-h-96 h-full max-w-2xl bg-gray-100">
      <p className="mb-4">
        Click any of the switches below to integrate the account as a Source
      </p>
      <div className="grid-cols-3 grid gap-4">
        {SOURCES.map((source) => (
          <div
            className="pl-3 border border-gray-200 rounded-md flex items-center gap-4 hover:bg-gray-300 shadow-sm cursor-pointer pt-6"
            key={source.id}
            onClick={() =>
              user &&
              user
                .createExternalAccount({
                  strategy: source.id,
                  redirect_url: `${window.location.origin}/user/sources`,
                })
                .then(
                  (ea) =>
                    ea.verification?.externalVerificationRedirectURL &&
                    window.location.assign(
                      ea.verification.externalVerificationRedirectURL
                    )
                )
            }
          >
            <Switch
              defaultChecked={accounts.has(source.id)}
              label={
                <span className="inline-flex gap-4 items-center">
                  <source.Icon />{" "}
                  <span className="inline-block">{source.service}</span>
                </span>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourcesPage;
