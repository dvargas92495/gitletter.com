import Button from "@dvargas92495/app/components/Button";
import TextInput from "@dvargas92495/app/components/TextInput";
import { Form } from "@remix-run/react";
import { ActionFunction, redirect } from "@remix-run/node";
import remixAppAction from "@dvargas92495/app/backend/remixAppAction.server";
import createDigest from "../../../../data/createDigest.server";

const NewDigestPage = () => {
  return (
    <Form method="post" className="max-w-xl">
      <TextInput label={"Name"} name={"name"} />
      <TextInput label={"Description"} name={"description"} />
      <Button>Submit</Button>
    </Form>
  );
};

export const action: ActionFunction = (args) => {
  return remixAppAction(args, createDigest).then(({ uuid }) =>
    redirect(`/user/digests/${uuid}`)
  );
};

export default NewDigestPage;
