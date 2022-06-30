import React from "react";
import Landing, {
  Showcase,
  Splash,
} from "@dvargas92495/app/components/Landing";

const Home: React.FC = () => (
  <Landing>
    <Splash
      title={"Turn Your Git Commits Into A Newsletter Digest"}
      subtitle={
        "Use GitLetter to automatically turn your work into digestable newsletters for your users."
      }
      isWaitlist
    />
    <Showcase
      header="You could connect GitLetter to any of the following outputs!"
      showCards={[
        {
          title: "ConvertKit",
          description: "Coming Soon...",
        },
        {
          title: "GitLetter",
          description: "Coming Soon...",
        },
      ]}
    />
  </Landing>
);

export const handle = Landing.handle;

export default Home;
