import { adminDb } from "@/firebaseAdmin";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  if (!process.env.CLERK_WEBHOOK_SECRET) {
    console.log("⚠️ Clerk webhook secret is not set.");
    return new NextResponse("Clerk webhook secret is not set", {
      status: 400,
    });
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  if (!id) {
    return new Response("User ID is undefined", {
      status: 400,
    });
  }

  switch (eventType) {
    case "user.created": {
      try {
        // Check if the user already exists in the database
        const userDoc = await adminDb.collection("users").doc(id).get();

        if (userDoc.exists) {
          console.log(`User with ID ${id} already exists in the database.`);
        } else {
          // If user does not exist, create a new user document
          await adminDb.collection("users").doc(id).set({
            hasActiveMembership: false,
            numOfGenerations: 0,
          });
          console.log(`User with ID ${id} successfully added to the database.`);
        }
      } catch (error) {
        console.error("Error adding user to Firebase:", error);
        return new Response("Error adding user to Firebase", {
          status: 500,
        });
      }
      break;
    }
    default:
      console.log(`Unhandled event type ${eventType}`);
  }

  return NextResponse.json({ message: "Webhook received", status: 200 });
}
