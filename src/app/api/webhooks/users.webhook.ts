import {createUser} from "@/repository/users.repository";
import {WebhookEvent} from "@clerk/nextjs/server";


export async function usersWebhook(evt: WebhookEvent) {

    if (evt.type !== "user.created") return;


    console.log("userId:", evt.data.id);

    const new_user = await createUser({
        id: evt.data.id,
        username: evt.data.first_name ?? "",
        email: evt.data.email_addresses[0].email_address,
        clerk_id: evt.data.id,
        avatarUrl: evt.data.image_url,
        onboarded: false
    })
    console.log("New user created with ID:", new_user);


}