import React from "react";
import getMeta from "@dvargas92495/app/utils/getMeta";
import PrivacyPolicy from "@dvargas92495/app/components/PrivacyPolicy";

const PrivacyPolicyPage: React.FunctionComponent = () => (
  <PrivacyPolicy name={"Gitletter"} domain={"gitletter.com"} />
);

export const Head = getMeta({ title: "Privacy Policy" });

export default PrivacyPolicyPage;
