import remixAppLoader from "@dvargas92495/app/backend/remixAppLoader.server";
import Button from "@dvargas92495/app/components/Button";
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
    <div className="h-full">
      <p className="mb-8">{data.description}</p>
      <div className="rounded-3xl shadow-lg p-8 max-h-96 h-full max-w-xl bg-gray-100">
        <h2 className="text-lg font-bold mb-8 flex items-center justify-between">
          <span>Sources</span>
          <Button>+ New</Button>
        </h2>
      </div>
      <div className="rounded-3xl shadow-lg p-8 max-h-96 h-full max-w-xl">
        <h2 className="text-lg font-bold mb-8 flex items-center justify-between">
          <span>Templates</span>
          <Button>+ New</Button>
        </h2>
      </div>
      <div className="rounded-3xl shadow-lg p-8 max-h-96 h-full max-w-xl">
        <h2 className="text-lg font-bold mb-8 flex items-center justify-between">
          <span>Outputs</span>
          <Button>+ New</Button>
        </h2>
      </div>
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
