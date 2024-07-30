"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { db } from "@/firebase"; // Adjust the path as necessary
import {
  FieldValue,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { CircleCheck } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const ContactPage = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "contactRequests"), {
        subject,
        message,
        userEmail: user?.emailAddresses,
        userId: user?.id, // assuming you have the user ID in the session
        timestamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      // Show success message
      setShowSuccess(true);
      // Optionally, reset the form
      setSubject("");
      setMessage("");
      // Hide success message after a delay
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000); // 5 seconds
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
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
};

export default ContactPage;
