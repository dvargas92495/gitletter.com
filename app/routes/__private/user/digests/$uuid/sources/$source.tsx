export { default as ErrorBoundary } from "@dvargas92495/app/components/DefaultCatchBoundary";
export { default as CatchBoundary } from "@dvargas92495/app/components/DefaultErrorBoundary";
import remixAppLoader from "@dvargas92495/app/backend/remixAppLoader.server";
import type { LoaderFunction } from "@remix-run/node";

const SourceInDigestPage = () => {
  return <div></div>;
};

export const loader: LoaderFunction = (args) => {
  return remixAppLoader(args)
};

export default SourceInDigestPage;
