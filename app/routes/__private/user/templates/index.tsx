import remixAppLoader from "@dvargas92495/app/backend/remixAppLoader.server";
import Button from "@dvargas92495/app/components/Button";
export { default as ErrorBoundary } from "@dvargas92495/app/components/DefaultErrorBoundary";
export { default as CatchBoundary } from "@dvargas92495/app/components/DefaultCatchBoundary";
import type { LoaderFunction } from "@remix-run/node";
import listTemplatesByUser from "~/data/listTemplatesByUser.server";
import { Link, useLoaderData } from "@remix-run/react";

const TemplatesPage = () => {
  const data = useLoaderData<Awaited<ReturnType<typeof listTemplatesByUser>>>();
  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-3 max-w-5xl flex-grow overflow-auto gap-4">
        {data.templates.map((t) => (
          <div
            key={t.uuid}
            className="rounded-2xl shadow-lg p-8 max-h-96 h-full bg-gray-100 flex flex-col gap-2"
          >
            {/* <img
              className="max-h-20 h-full rounded-t-2xl mb-4"
              src={`/images/templates/${t.uuid}.png`}
            /> */}
            <Link to={t.uuid} className="font-bold text-2xl cursor-pointer">
              {t.name}
            </Link>
            <p className="font-medium text-base opacity-75 flex-grow">
              {t.description}
            </p>
            <p className="flex justify-right">
              <span className="opacity-50 text-xs">
                Last edited: {new Date(t.editedDate).toLocaleString()}
              </span>
            </p>
          </div>
        ))}
      </div>
      <Link to={"new"} className={"my-8"}>
        <Button>+ New</Button>
      </Link>
    </div>
  );
};

export const loader: LoaderFunction = (args) => {
  return remixAppLoader(args, listTemplatesByUser);
};

export default TemplatesPage;
