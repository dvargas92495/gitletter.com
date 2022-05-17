export { default as ErrorBoundary } from "@dvargas92495/app/components/DefaultCatchBoundary";
export { default as CatchBoundary } from "@dvargas92495/app/components/DefaultErrorBoundary";
import { Link, Outlet } from "@remix-run/react";

const DigestSources = () => {
  return (
    <>
      <h2 className="text-lg font-bold mb-8 flex items-center justify-between">
        <span>Sources</span>
        <Link
          to={"new"}
          className={
            "rounded-lg border-sky-500 border text-sky-500 hover:bg-sky-100 action:bg-sky-200 cursor-pointer px-4 py-2"
          }
        >
          + New
        </Link>
      </h2>
      <div>
          <Outlet />
      </div>
    </>
  );
};

export default DigestSources;
