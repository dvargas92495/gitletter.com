import type { LoaderFunction } from "@remix-run/node";
import remixAppLoader from "@dvargas92495/app/backend/remixAppLoader.server";
import listDigestsByUser from "../../../../data/listDigestsByUser.server";
import Table from "@dvargas92495/app/components/Table";
import DefaultErrorBoundary from "@dvargas92495/app/components/DefaultErrorBoundary";
import DefaultCatchBoundary from "@dvargas92495/app/components/DefaultCatchBoundary";
import { Link } from "@remix-run/react";

const UserDigests = () => {
  return (
    <div className="max-w-3xl flex flex-col h-full">
      <div className="flex-grow mb-2 mt-8">
        <Table />
      </div>
      <div className="justify-start flex w-full mb-8">
        <Link
          to={"/user/digests/new"}
          className={
            "border rounded-md px-4 py-2 border-sky-400 text-sky-400 cursor-pointer hover:bg-sky-50 active:hover:bg-sky-100"
          }
        >
          + New
        </Link>
      </div>
    </div>
  );
};

export const loader: LoaderFunction = (args) => {
  return remixAppLoader(args, listDigestsByUser);
};

export const ErrorBoundary = DefaultErrorBoundary;
export const CatchBoundary = DefaultCatchBoundary;

export default UserDigests;
