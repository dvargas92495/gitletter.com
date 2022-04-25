import React, { useEffect, useState } from "react";
import { Form, useActionData, useCatch, useLoaderData } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import Button from "@dvargas92495/ui/components/Button";
import TextInput from "@dvargas92495/ui/components/TextInput";
import remixAppAction from "@dvargas92495/ui/utils/remixAppAction.server";
import remixAppLoader from "@dvargas92495/ui/utils/remixAppLoader.server";
import getConvertKitBroadcasts from "~/data/getConvertKitBroadcasts.server";
import createConvertKitBroadcast from "~/data/createConvertKitBroadcast.server";
import DefaultErrorBoundary from "@dvargas92495/ui/components/DefaultErrorBoundary";
import { CatchBoundaryComponent } from "@remix-run/server-runtime/routeModules";
import Toast from "@dvargas92495/ui/components/Toast";

const UserConvertKit = () => {
  const data =
    useLoaderData<Awaited<ReturnType<typeof getConvertKitBroadcasts>>>();
  const actionData = useActionData();
  const [toastMessage, setToastMessage] = useState("");
  useEffect(() => {
    if (actionData?.success) setToastMessage("Successfully created broadcast!");
  }, [setToastMessage]);
  return (
    <>
      <div className="flex h-64">
        <Form method={"post"} className="mb-6 mr-6 w-96">
          <TextInput
            label={"Since"}
            name={"since"}
            defaultValue={data.broadcasts[0].created_at}
          />
          <Button>Create Broadcast</Button>
        </Form>
        {actionData && (
          <div className="flex-grow border-2 border-gray-500 border-opacity-50 border-dashed rounded-lg p-4">
            <h1 className="text-2xl font-bold mb-6">Response</h1>
            <pre className="p-8 bg-green-800 bg-opacity-10 text-green-900 border-green-900 border-2 rounded-sm overflow-auto">
              {JSON.stringify(actionData.data, null, 4)}
            </pre>
          </div>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-6">Latest Broadcasts</h1>
        <ul>
          {data.broadcasts.map(({ id, subject, created_at }) => (
            <li key={id}>
              {subject} ({created_at})
            </li>
          ))}
        </ul>
      </div>
      <Toast
        isOpen={!!toastMessage}
        onClose={() => setToastMessage("")}
        message={toastMessage}
      />
    </>
  );
};

export const loader: LoaderFunction = (args) => {
  return remixAppLoader(args, ({ userId }) => getConvertKitBroadcasts(userId));
};

export const action: ActionFunction = (args) => {
  return remixAppAction(args, ({ userId, data }) => {
    return createConvertKitBroadcast({
      userId,
      since: new Date(Date.parse(data.since?.[0] as string)),
    }).catch((e) => {
      if (e.response) {
        throw new Response(e.response.data, { status: e.response.status });
      } else {
        throw new Response(`Internal Server Error: ${e.message}\n${e.stack}`, {
          status: 500,
        });
      }
    });
  });
};

export const ErrorBoundary = DefaultErrorBoundary;

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caught = useCatch();
  return (
    <DefaultErrorBoundary
      error={
        new Error(
          typeof caught.data === "object"
            ? JSON.stringify(caught.data)
            : caught.data
        )
      }
    />
  );
};

export default UserConvertKit;
