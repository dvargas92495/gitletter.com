import Button from "@dvargas92495/app/components/Button";
import Textarea from "@dvargas92495/app/components/Textarea";
import TextInput from "@dvargas92495/app/components/TextInput";
import { Controlled as CodeMirror } from "@dvargas92495/react-codemirror2";
import "@dvargas92495/codemirror/mode/xml/xml";
import { useState } from "react";
import type { ActionFunction } from "@remix-run/node";
import remixAppAction from "@dvargas92495/app/backend/remixAppAction.server";
import createTemplate from "~/data/createTemplate.server";
import sanitizeHtml from "sanitize-html";
import codemirrorStyles from "@dvargas92495/codemirror/lib/codemirror.css";

const HTMLCodeInput = ({
  defaultValue = "",
  name,
  className = "",
  labelClassName = "",
  label = "",
  onChange,
}: {
  name?: string;
  defaultValue?: string;
  className?: string;
  labelClassName?: string;
  label?: string;
  onChange?: (s: string) => void;
}) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className={`mb-6 ${className}`}>
      <label
        htmlFor={name}
        className={`block mb-2 text-sm font-medium text-gray-900 ${labelClassName}`}
      >
        {label}
      </label>
      <input name={name} value={value} type={"hidden"} />
      <CodeMirror
        value={value}
        options={{
          mode: { name: "xml", htmlMode: true },
          lineNumbers: true,
          lineWrapping: true,
        }}
        onBeforeChange={(_, __, v) => {
          setValue(v);
          onChange?.(v);
        }}
        className={'border border-black border-opacity-50'}
      />
    </div>
  );
};

const NewTemplatePage = () => {
  const [html, setHtml] = useState("");
  return (
    <div className="flex items-stretch h-full">
      <form className="flex-grow flex flex-col w-1/2">
        <div className="flex-grow flex flex-col">
          <TextInput label={"Name"} name={"name"} />
          <Textarea label={"Description"} name={"description"} />
          <HTMLCodeInput
            label="Content"
            name={"content"}
            className="flex-grow"
            onChange={setHtml}
          />
        </div>
        <Button>Create</Button>
      </form>
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
  return remixAppAction(args, createTemplate);
};

export function links() {
  return [{ rel: "stylesheet", href: codemirrorStyles }];
}

export default NewTemplatePage;
