export { default as ErrorBoundary } from "@dvargas92495/app/components/DefaultCatchBoundary";
export { default as CatchBoundary } from "@dvargas92495/app/components/DefaultErrorBoundary";
import remixAppAction from "@dvargas92495/app/backend/remixAppAction.server";
import remixAppLoader from "@dvargas92495/app/backend/remixAppLoader.server";
import Button from "@dvargas92495/app/components/Button";
import TextInput from "@dvargas92495/app/components/TextInput";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import addSourceToDigest from "~/data/addSourceToDigest.server";

const NewSourceInDigestPage = () => {
  const data = useLoaderData<Awaited<ReturnType<typeof listExternalSources>>>();
  return (
    <Form method={"post"}>
      <select name={"provider"}>
        {data.accounts.map((a) => (
          <option id={a.id} key={a.id}>
            <img
              src={a.icon}
              width={16}
              height={16}
              className={"rounded-full"}
            />{" "}
            <span>{a.name}</span>
          </option>
        ))}
      </select>
      <TextInput name={"resource"} label={"Resource"} />
      <TextInput name={"identifier"} label={"Identifier"} />
      <Button>Add</Button>
    </Form>
  );
};

const listExternalSources = ({ userId }: { userId: string }) =>
  import("@clerk/clerk-sdk-node")
    .then((clerk) => clerk.users.getUser(userId))
    .then((user) => {
      const accounts = user.externalAccounts.map((m) => ({
        icon: m.picture || "",
        id: m.provider || "",
        name: (m.provider || "").replace(/^oauth_/, ""),
      }));
      return {
        accounts,
      };
    });

export const loader: LoaderFunction = (args) => {
  return remixAppLoader(args, listExternalSources);
};

export const action: ActionFunction = (args) => {
  return remixAppAction(args, ({ method, userId, data, params }) => {
    if (method === "POST")
      return addSourceToDigest({ userId, data, params }).then(() =>
        redirect(`/user/digests/${params["uuid"]}/sources`)
      );
    else throw new Response(`Method ${method} Not Found`, { status: 404 });
  });
};

export default NewSourceInDigestPage;
