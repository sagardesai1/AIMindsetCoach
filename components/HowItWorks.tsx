import { AudioLines, PencilLine, Sparkles } from "lucide-react";

const features = [
  {
    name: "Understand.",
    description:
      "Our AI coach starts with getting to know about what’s stressing you out. The more you share, the more it helps.",
    icon: Sparkles,
  },
  {
    name: "Personalize.",
    description:
      "Based on your situation, our AI Coach crafts a unique plan just for you, featuring exercises and specific steps you can take to mitigate your stress.",
    icon: PencilLine,
  },
  {
    name: "Proven Techniques.",
    description:
      "Our exercises are based on scientifically-backed methods to reduce stress and anxiety, ranging from meditation and journaling to affirmations and cognitive behavioral therapy.",
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
            Discover how our AI Coach can help you manage and reduce stress with
            a personalized approach.
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl mt-5 lg:mt-10 grid-cols-1 gap-x-16 sm:gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <dl
              key={feature.name}
              className="mt-20 max-w-lg mx-auto space-y-8 text-base leading-7 text-gray-600 lg:max-w-none"
            >
              <div className="relative">
                <feature.icon
                  className="h-20 w-20 text-indigo-600 mb-8 lg:mb-16 mx-auto"
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
