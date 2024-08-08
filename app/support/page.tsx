"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { db, firebaseAuth } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { CircleCheck } from "lucide-react";
import { useUser, useAuth } from "@clerk/nextjs";
import { signInWithCustomToken } from "firebase/auth";

function Support() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const { user } = useUser();
  const { getToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const token = await getToken({ template: "integration_firebase" });
      if (token) {
        await signInWithCustomToken(firebaseAuth, token || "");

        const docRef = await addDoc(collection(db, "contactRequests"), {
          subject,
          message,
          userEmail: user.emailAddresses[0].emailAddress,
          userId: user.id,
          timestamp: serverTimestamp(),
        });

        console.log("Document written with ID: ", docRef.id);
        setShowSuccess(true);
        setSubject("");
        setMessage("");

        setTimeout(() => {
          setShowSuccess(false);
        }, 5000); // Hide success message after 5 seconds
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <p className="mb-8 lg:mb-16 text-lg leading-8 text-gray-500 text-center">
          Got a technical issue? Want to send feedback about a beta feature?
          Need details about stress management? Let us know.
        </p>
        <div>
          <Label>Subject</Label>
          <Input
            className="mt-2"
            placeholder="Let us know how we can help you"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Your message</Label>
          <Textarea
            placeholder="Feature requests..."
            className="h-52 mt-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white dark:text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit Request
          </Button>
        </div>
      </form>
      {showSuccess && (
        <div
          className="flex shadow-lg fixed bottom-4 right-3 items-center space-x-2 p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <CircleCheck className="w-6 h-6 text-green-800" />
          <p className="font-medium">
            Success! Feel free to resubmit a new request.
          </p>
        </div>
      )}
    </div>
  );
}

export default Support;
