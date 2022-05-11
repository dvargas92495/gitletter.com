import React from "react";
import getMeta from "@dvargas92495/app/utils/getMeta";
import UserDashboard from "@dvargas92495/app/components/UserDashboard";

const TABS = [
  "digests",
  "sources",
  "templates",
  "outputs",
  "broadcasts",
  "billing",
];

const UserPage: React.FunctionComponent = () => {
  return <UserDashboard tabs={TABS} title={"GitLetter"} />;
};

export const meta = getMeta({
  title: "user",
});

export default UserPage;
