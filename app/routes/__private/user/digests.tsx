import React from "react";
import type { LoaderFunction } from "@remix-run/node";
import remixAppLoader from "@dvargas92495/app/backend/remixAppLoader.server";
import listDigestsByUser from "../../../data/listDigestsByUser.server";
import Table from "@dvargas92495/app/components/Table";
import DefaultErrorBoundary from "@dvargas92495/app/components/DefaultErrorBoundary";
import DefaultCatchBoundary from "@dvargas92495/app/components/DefaultCatchBoundary";

const UserDigests = () => {
  return (
    <>
      <Table />
    </>
  );
};

export const loader: LoaderFunction = (args) => {
  return remixAppLoader(args, listDigestsByUser);
};

export const ErrorBoundary = DefaultErrorBoundary;
export const CatchBoundary = DefaultCatchBoundary;

export default UserDigests;
