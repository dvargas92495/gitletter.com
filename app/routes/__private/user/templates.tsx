import { Outlet } from "@remix-run/react";
import DefaultErrorBoundary from "@dvargas92495/app/components/DefaultErrorBoundary";
import DefaultCatchBoundary from "@dvargas92495/app/components/DefaultCatchBoundary";

export const ErrorBoundary = DefaultErrorBoundary;
export const CatchBoundary = DefaultCatchBoundary;

export default Outlet;
