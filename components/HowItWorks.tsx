import { AudioLines, PencilLine, Sparkles } from "lucide-react";

const features = [
  {
    name: "Understand.",
    description:
      "Our AI coach starts with getting to know about what’s stressing you out. The more you share, the more it helps so this is your place to vent and know you are on the path to feeling better.",
    icon: Sparkles,
  },
  {
    name: "Personalize.",
    description:
      "Based on your situation, our AI Stress Coach crafts a unique plan just for you, featuring exercises and specific steps you can take to mitigate your stress.",
    icon: PencilLine,
  },
  {
    name: "Feedback.",
    description:
      "Our AI Stress Coach learns from your experiences to continually refine and enhance your personalized plan, ensuring you get the best support on your path to well-being.",
    icon: AudioLines,
  },
];

function HowItWorks() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center ">
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How it works
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover how our AI Stress Coach can help you manage and reduce
            stress with a personalized approach. Follow these simple steps to
            start your journey towards a calmer, happier you.
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl mt-10 grid-cols-1 gap-x-16 sm:gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <dl
              key={feature.name}
              className="mt-20 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none"
            >
              <div className="relative">
                <feature.icon
                  className="h-20 w-20 text-indigo-600 mb-16 mx-auto"
                  aria-hidden="true"
                />
                <dt className="mb-4 font-semibold text-gray-900">
                  {feature.name}
                </dt>
                <dd>{feature.description}</dd>
              </div>
            </dl>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
