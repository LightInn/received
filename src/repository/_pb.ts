import PocketBase from "pocketbase";

function pocketbaseClientInit(): PocketBase {
  const token = process.env.POCKETBASE_TOKEN ?? "";

  const pb = new PocketBase("https://pocketbase-received.lightin.io");

  pb.authStore.save(token, null);

  return pb;
}

export default pocketbaseClientInit;
