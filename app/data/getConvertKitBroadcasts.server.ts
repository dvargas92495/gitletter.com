import axios from "axios";

type Broadcasts = { id: string; created_at: string; subject: string }[];

const listBroadcasts = (
  apiSecret: string,
  page?: number
): Promise<Broadcasts> =>
  axios
    .get<{
      broadcasts: Broadcasts;
    }>(
      `https://api.convertkit.com/v3/broadcasts?api_secret=${apiSecret}${
        page ? `&page=${page}` : ""
      }`
    )
    .then((r) =>
      r.data.broadcasts.length < 50
        ? r.data.broadcasts.reverse()
        : listBroadcasts(apiSecret, (page || 1) + 1).then((b) =>
            b.concat(r.data.broadcasts.reverse())
          )
    );

const getConvertKitBroadcasts = (userId: string) =>
  import("@clerk/clerk-sdk-node")
    .then((c) => c.users.getUser(userId))
    .then((c) => {
      const convertKit = c.publicMetadata.ConvertKit as { apiSecret: string };
      if (!convertKit?.apiSecret) return { broadcasts: [] };
      return listBroadcasts(convertKit.apiSecret).then((broadcasts) => ({
        broadcasts,
      }));
    });

export default getConvertKitBroadcasts;
