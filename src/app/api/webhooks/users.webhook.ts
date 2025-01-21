import { createUser } from "@/repository/users.repository";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function usersWebhook(evt: WebhookEvent) {
  if (evt.type !== "user.created") return;

  console.log("userId:", evt.data.id);

  const new_user = await createUser({
    clerk_id: evt.data.id,
    email: evt.data.email_addresses[0].email_address,
    id: evt.data.id,
    nsfw: true,
    onboarded: false,
    username: evt.data.first_name ?? "",
  });
  console.log("New user created with ID:", new_user);
}
