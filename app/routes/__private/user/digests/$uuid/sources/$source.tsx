export { default as ErrorBoundary } from "@dvargas92495/app/components/DefaultCatchBoundary";
export { default as CatchBoundary } from "@dvargas92495/app/components/DefaultErrorBoundary";
import remixAppLoader from "@dvargas92495/app/backend/remixAppLoader.server";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import getSourceInDigest from "~/data/getSourceInDigest.server";

const SourceInDigestPage = () => {
  const data = useLoaderData<Awaited<ReturnType<typeof getSourceInDigest>>>();
  return (
    <div>
      {data.provider_id} | {data.resource} | {data.identifier}
    </div>
  );
};

export const loader: LoaderFunction = (args) => {
  return remixAppLoader(args, getSourceInDigest);
};

export default SourceInDigestPage;
