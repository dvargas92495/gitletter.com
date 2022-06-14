import Button from "@dvargas92495/app/components/Button";
import Textarea from "@dvargas92495/app/components/Textarea";
import TextInput from "@dvargas92495/app/components/TextInput";
import { useState } from "react";
import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import remixAppAction from "@dvargas92495/app/backend/remixAppAction.server";
import createTemplate from "~/data/createTemplate.server";
import sanitizeHtml from "sanitize-html";
import CodeInput from "@dvargas92495/app/components/CodeInput";
import codemirrorStyles from "@dvargas92495/codemirror/lib/codemirror.css";
export { default as CatchBoundary } from "@dvargas92495/app/components/DefaultCatchBoundary";
export { default as ErrorBoundary } from "@dvargas92495/app/components/DefaultErrorBoundary";
import { NotFoundResponse } from "@dvargas92495/app/backend/responses.server";

// https://github.com/remix-run/remix/issues/185
const NewTemplatePage = () => {
  const [html, setHtml] = useState("");
  return (
    <div className="flex items-stretch h-full">
      <Form className="flex-grow flex flex-col w-1/2" method={"post"}>
        <div className="flex-grow flex flex-col">
          <TextInput label={"Name"} name={"name"} />
          <Textarea label={"Description"} name={"description"} />
          <CodeInput
            language="html"
            label="Content"
            name={"content"}
            className="flex-grow"
            onChange={setHtml}
          />
        </div>
        <Button>Create</Button>
      </Form>
      <div className="flex-grow p-8 w-1/2">
        <div
          className="border border-black h-full"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
        ></div>
      </div>
    </div>
  );
};

export const action: ActionFunction = (args) => {
  return remixAppAction(args, ({ method, userId, data }) => {
    if (method === "POST")
      return createTemplate({ userId, data }).then((id) =>
        redirect(`/user/templates/${id}`)
      );
    else throw new NotFoundResponse(`Unknown method ${method} not found`);
  });
};

export function links() {
  return [{ rel: "stylesheet", href: codemirrorStyles }];
}

export default NewTemplatePage;
