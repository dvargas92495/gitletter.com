export { default as ErrorBoundary } from "@dvargas92495/app/components/DefaultCatchBoundary";
export { default as CatchBoundary } from "@dvargas92495/app/components/DefaultErrorBoundary";
import remixAppAction from "@dvargas92495/app/backend/remixAppAction.server";
import remixAppLoader from "@dvargas92495/app/backend/remixAppLoader.server";
import Button from "@dvargas92495/app/components/Button";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import getSourceInDigest from "~/data/getSourceInDigest.server";
import removeSourceFromDigest from "~/data/removeSourceFromDigest.server";
import { IconById } from "~/enums/sources";

const SourceInDigestPage = () => {
  const data = useLoaderData<Awaited<ReturnType<typeof getSourceInDigest>>>();
  const Icon = useMemo(() => IconById[data.provider_id], [data.provider_id]);
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4">
        <Icon />
        <div className="flex flex-col ml-8">
          <h1 className="text-2xl font-bold">{data.resource}</h1>
          <h2 className="text-lg opacity-50 italic">{data.identifier}</h2>
        </div>
      </div>
      <div className="flex-grow"></div>
      <Form method="delete">
        <Button className="bg-red-500 hover:bg-red-700 active:bg-red-900 disabled:active:bg-red-500 disabled:hover:bg-red-500">
          Delete
        </Button>
      </Form>
    </div>
  );
};

export const loader: LoaderFunction = (args) => {
  return remixAppLoader(args, getSourceInDigest);
};

export const action: ActionFunction = (args) => {
  return remixAppAction(args, ({ method, userId, params }) => {
    if (method === "DELETE") {
      return removeSourceFromDigest({ userId, params }).then(() =>
        redirect(`/user/digests/${params["uuid"]}/sources`)
      );
    } else throw new Response(`Method ${method} Not Found`, { status: 404 });
  });
};

export default SourceInDigestPage;
