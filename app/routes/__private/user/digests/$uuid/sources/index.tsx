export { default as ErrorBoundary } from "@dvargas92495/app/components/DefaultCatchBoundary";
export { default as CatchBoundary } from "@dvargas92495/app/components/DefaultErrorBoundary";
import remixAppLoader from "@dvargas92495/app/backend/remixAppLoader.server";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import listSourcesInDigests from "~/data/listSourcesInDigests.server";

const AllSourcesInDigestPage = () => {
  const data =
    useLoaderData<Awaited<ReturnType<typeof listSourcesInDigests>>>();
  return (
    <div>
      {data.sources.map((source) => (
        <Link to={source.uuid} key={source.uuid}>
          {source.provider_id} | {source.resource} | {source.identifier}
        </Link>
      ))}
    </div>
  );
};

export const loader: LoaderFunction = (args) => {
  return remixAppLoader(args, listSourcesInDigests);
};

export default AllSourcesInDigestPage;
