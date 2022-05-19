export { default as ErrorBoundary } from "@dvargas92495/app/components/DefaultCatchBoundary";
export { default as CatchBoundary } from "@dvargas92495/app/components/DefaultErrorBoundary";
import remixAppLoader from "@dvargas92495/app/backend/remixAppLoader.server";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import listSourcesInDigests from "~/data/listSourcesInDigests.server";
import { IconById } from "~/enums/sources";

const AllSourcesInDigestPage = () => {
  const data =
    useLoaderData<Awaited<ReturnType<typeof listSourcesInDigests>>>();
  return (
    <div className="border border-black rounded-lg p-4 border-opacity-25 hover:bg-gray-200 cursor-pointer box-border">
      {data.sources.map((source) => {
        const Icon = IconById[source.provider_id];
        return (
          <Link to={source.uuid} key={source.uuid} className="flex items-center">
            <Icon />
            <div className="flex flex-col ml-8">
              <h1 className="text-2xl font-bold">{source.resource}</h1>
              <h2 className="text-lg opacity-50 italic">{source.identifier}</h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export const loader: LoaderFunction = (args) => {
  return remixAppLoader(args, listSourcesInDigests);
};

export default AllSourcesInDigestPage;
