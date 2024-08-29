"use client";

import React from "react";
import useSubscription from "@/hooks/useSubscription";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { createCheckoutSession } from "@/actions/createCheckoutSession";
import { createStripePortal } from "@/actions/createStripePortal";
import getStripe from "@/lib/stripe-js";
import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter plan",
    id: null,
    href: "#",
    priceMonthly: null,
    description: "Explore core features at no cost",
    features: [
      "3 Personalized Destressing Techniques",
      "3 Personalized Action Plans",
      "Try AI Functionality",
    ],
  },
  {
    name: "Pro plan",
    id: "Pro",
    href: "#",
    priceMonthly: "$5",
    description: "Limited time early access discount",
    features: [
      "Unlimited Personalized Destressing Techniques",
      "Unlimited Personalized Action Plans",
      "Full Functionality",
      "24-hour, Dedicated Support Response Time",
    ],
  },
];

export type UserDetails = {
  email: string;
  name: string;
};

function Pricing() {
  const { user } = useUser();
  const router = useRouter();
  const { hasActiveMembership, loading } = useSubscription();
  const [isPending, startTransition] = useTransition();

  const handleUpgrade = () => {
    if (!user) return;

    const userDetails: UserDetails = {
      email: user.primaryEmailAddress?.toString()!,
      name: user.fullName!,
    };

    startTransition(async () => {
      const stripe = await getStripe();

      if (hasActiveMembership) {
        // create stripe portal...
        const stripePortalUrl = await createStripePortal();
        return router.push(stripePortalUrl);
      }

      const sessionId = await createCheckoutSession(userDetails);

      await stripe?.redirectToCheckout({
        sessionId,
      });
    });
  };

  return (
    <div className="isolate overflow-hidden bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            The right price for you, whoever you are
          </p>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-lg leading-8 text-white/60">
            Choose an affordable plan that's packed with the best features for
            providing personalized destressing techniques, action plans, and
            helping you through your hardest times.
          </p>
          <svg
            viewBox="0 0 1208 1024"
            className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
          >
            <ellipse
              cx={604}
              cy={512}
              fill="url(#radial-gradient-pricing)"
              rx={604}
              ry={512}
            />
            <defs>
              <radialGradient id="radial-gradient-pricing">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flow-root bg-white pb-24 sm:pb-32">
        <div className="-mt-80 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 max-w-lg lg:max-w-4xl mx-auto gap-10">
            {tiers.map((tier, index) => (
              <div
                key={tier.id}
                className={`flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10 ${
                  index === 1 ? "border-2 border-indigo-600" : "" // Add purple border to the second card
                }`}
              >
                <div>
                  <h3
                    id={tier.id + tier.name}
                    className={`text-base font-semibold leading-2 ${
                      index === 1 ? "text-indigo-600" : ""
                    } `}
                  >
                    {tier.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-x-2">
                    {tier.priceMonthly ? (
                      <>
                        <span className="line-through text-xl font-semibold leading-7 text-gray-600">
                          $12
                        </span>
                        <span className="text-5xl font-bold tracking-tight text-gray-900">
                          {tier.priceMonthly}
                        </span>
                        <span className="text-md font-bold tracking-tight text-gray-600">
                          /month
                        </span>
                      </>
                    ) : (
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        Free
                      </span>
                    )}
                  </div>
                  <p className="mt-6 text-base leading-6 text-gray-600">
                    {tier.description}
                  </p>
                  <ul
                    role="list"
                    className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
                  >
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                          className="h-6 w-5 flex-none text-indigo-600"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                {index === 1 ? (
                  <Button
                    className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80"
                    disabled={loading || isPending}
                    onClick={handleUpgrade}
                  >
                    {isPending || loading
                      ? "Loading..."
                      : hasActiveMembership
                      ? "Manage Plan"
                      : "Upgrade to Pro"}
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
