import remixAppLoader from "@dvargas92495/app/backend/remixAppLoader.server";
import DefaultCatchBoundary from "@dvargas92495/app/components/DefaultCatchBoundary";
import DefaultErrorBoundary from "@dvargas92495/app/components/DefaultErrorBoundary";
import type { LoaderFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useMatches } from "@remix-run/react";
import React from "react";
import getDigest from "~/data/getDigest.server";

type DigestData = Awaited<ReturnType<typeof getDigest>>;

const Title = (data: DigestData) => {
  return <>{data?.name}</>;
};

const Tab = ({ children, to }: React.PropsWithChildren<{ to: string }>) => {
  const matches = useMatches();
  const current = matches[5].pathname;
  const root = matches[4].pathname;
  const active = `${root}/${to}` === current;
  return (
    <Link
      to={to}
      className={`rounded-lg border border-sky-600 text-sky-600 hover:bg-sky-100 cursor-pointer active:bg-sky-200 py-2 px-4 ${
        active ? "bg-sky-200" : "bg-none"
      }`}
    >
      {children}
    </Link>
  );
};

const DigestDetailPage = () => {
  const data = useLoaderData<DigestData>();
  return (
    <div className="h-full">
      <p className="mb-8">{data.description}</p>
      <div className="flex gap-4 items-center mb-4">
        <Tab to={""}>Settings</Tab>
        <Tab to={"sources"}>Sources</Tab>
        <Tab to={"templates"}>Templates</Tab>
        <Tab to={"outputs"}>Outputs</Tab>
      </div>
      <div className="rounded-3xl shadow-lg p-8 max-h-[440px] h-full max-w-xl bg-gray-100">
        <Outlet />
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
