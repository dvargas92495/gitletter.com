import remixAppLoader from "@dvargas92495/app/backend/remixAppLoader.server";
import DefaultCatchBoundary from "@dvargas92495/app/components/DefaultCatchBoundary";
import DefaultErrorBoundary from "@dvargas92495/app/components/DefaultErrorBoundary";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import getDigest from "~/data/getDigest.server";

type DigestData = Awaited<ReturnType<typeof getDigest>>;

const Title = (data: DigestData) => {
  return <>{data?.name}</>;
};

const DigestDetailPage = () => {
  const data = useLoaderData<DigestData>();
  return (
    <div>
      <h2>{data.description}</h2>
    </div>
  );
};

export const loader: LoaderFunction = (args) => {
  return remixAppLoader(args, getDigest);
};

export const handle = {
  Title,
};

export const ErrorBoundary = DefaultErrorBoundary;
export const CatchBoundary = DefaultCatchBoundary;

export default DigestDetailPage;
