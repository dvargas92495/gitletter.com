import { UserProfile } from "@clerk/remix";
import React from "react";

const UserIndex = () => {
  return <UserProfile only="account" />;
};

export default UserIndex;
