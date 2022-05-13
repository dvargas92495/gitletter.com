import { UserProfile } from "@clerk/remix";
import DefaultCatchBoundary from "@dvargas92495/app/components/DefaultCatchBoundary";
import DefaultErrorBoundary from "@dvargas92495/app/components/DefaultErrorBoundary";

const UserIndex = () => {
  return <UserProfile only="account" />;
};

export const ErrorBoundary = DefaultErrorBoundary;
export const CatchBoundary = DefaultCatchBoundary;

export default UserIndex;
