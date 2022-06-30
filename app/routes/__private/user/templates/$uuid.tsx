export { default as ErrorBoundary } from "@dvargas92495/app/components/DefaultErrorBoundary";
export { default as CatchBoundary } from "@dvargas92495/app/components/DefaultCatchBoundary";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import remixAppLoader from "@dvargas92495/app/backend/remixAppLoader.server";
import remixAppAction from "@dvargas92495/app/backend/remixAppAction.server";
import getTemplateByUuid from "~/data/getTemplateByUuid.server";
import Button from "@dvargas92495/app/components/Button";
import deleteTemplateByUuid from "~/data/deleteTemplateByUuid.server";

type TemplateData = Awaited<ReturnType<typeof getTemplateByUuid>>;

const SingleTempate = () => {
  const data = useLoaderData<TemplateData>();
  return (
    <div className="flex flex-col h-full gap-8">
      <h2>{data.description}</h2>
      <div className="flex-grow">
        <pre>{data.content}</pre>
      </div>
      <p>
        Created on <i>{data.createdDate}</i>.
      </p>
      <p>
        Last edited on{" "}
        <i>{data.editedDate}</i>.
      </p>
      <div className="flex items-center gap-8">
        <Form method="delete">
          <Button>Delete</Button>
        </Form>
      </div>
    </div>
  );
};

const Title = (data: TemplateData) => {
  return <>{data?.name}</>;
};

export const handle = {
  Title,
};

export const action: ActionFunction = (args) => {
  return remixAppAction(args, {
    DELETE: (args) =>
      deleteTemplateByUuid(args).then(() => redirect(`/user/templates`)),
  });
};

export const loader: LoaderFunction = (args) => {
  return remixAppLoader(args, getTemplateByUuid);
};

export default SingleTempate;
