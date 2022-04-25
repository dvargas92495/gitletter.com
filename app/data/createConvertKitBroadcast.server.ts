import axios from "axios";
import React from "react";
import ReactDOMServer from "react-dom/server";
// import RoamJSDigest from "~/templates/RoamJSDigest";

const commits = ({
  since,
  token,
  username,
}: {
  since: Date;
  token: string;
  username: string;
}) => {
  const opts = {
    headers: {
      Accept: "application/vnd.github.inertia-preview+json",
      Authorization: `Basic ${Buffer.from(`${username}:${token}`).toString(
        "base64"
      )}`,
    },
  };
  const getRepos = (page: number): Promise<string[]> =>
    axios
      .get<{ name: string }[]>(
        `https://api.github.com/users/${username}/repos?page=${page}`,
        opts
      )
      .then((r) => r.data.map((d) => d.name))
      .then((r) =>
        r.length ? getRepos(page + 1).then((rr) => [...r, ...rr]) : []
      );
  return getRepos(1)
    .then((repos) => repos.filter((r) => /^roam/.test(r)))
    .then((repos) => {
      const getCommits = (
        repo: string,
        page: number
      ): Promise<
        { message: string; repo: string; date: Date; url: string }[]
      > =>
        axios
          .get<
            {
              commit: { message: string; committer: { date: number } };
              html_url: string;
            }[]
          >(
            `https://api.github.com/repos/${username}/${repo}/commits?page=${page}&since=${since.toISOString()}`,
            opts
          )
          .then((r) =>
            r.data.map((d) => ({
              message: d.commit.message,
              repo,
              date: new Date(d.commit.committer.date),
              url: d.html_url,
            }))
          )
          .then((r) =>
            r.length
              ? getCommits(repo, page + 1).then((rr) => [...r, ...rr])
              : []
          )
          .catch((e) => {
            console.log("Getting", page, "commits for repo", repo, "failed");
            console.log(e.response ? e.response.data : e);
            return [];
          });
      return Promise.all(repos.map((repo) => getCommits(repo, 1))).then((res) =>
        res
          .flatMap((c) => c)
          .sort(({ date: a }, { date: b }) => a.valueOf() - b.valueOf())
      );
    });
};

const createConvertKitBroadcast = ({
  userId,
  since,
}: {
  userId: string;
  since: Date;
}) => {
  const date = new Date();
  return import("@clerk/clerk-sdk-node")
    .then((c) => c.users.getUser(userId))
    .then((u) => {
      const githubProvider = u.externalAccounts.find(
        (ea) => ea.provider === "oauth_github"
      );
      if (!githubProvider) {
        throw new Error(`User must connect their account to GitHub`);
      }
      return axios
        .get<{ token: string }[]>(
          `https://api.clerk.dev/v1/users/${userId}/oauth_access_tokens/oauth_github`,
          {
            headers: { Authorization: `Bearer ${process.env.CLERK_API_KEY}` },
          }
        )
        .catch((e) => {
          throw new Error(
            `Failed to fetch oauth access tokens for user ${userId}: ${e.response?.data}`
          );
        })
        .then((r) => {
          const { username } = githubProvider;

          const convertKit = u.publicMetadata.ConvertKit as {
            apiSecret: string;
          };
          return commits({
            since,
            token: r.data[0]?.token,
            username: username || "",
          }).then((data) =>
            ReactDOMServer.renderToStaticMarkup(
              React.createElement('div', { data, date }) // TODO replace with template
            )
          )
          .then((content) =>
            axios.post("https://api.convertkit.com/v3/broadcasts", {
              api_secret: convertKit.apiSecret,
              description: `Broadcast automatically generated at ${date.toLocaleString()}`,
              subject: "FILL OUT SUBJECT",
              content,
            }).then(r => r.data)
          );
        });
    })
    .then((data) => ({ success: true, data }));
};

export default createConvertKitBroadcast;
