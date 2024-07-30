import Link from "next/link";

function Cta() {
  return (
    <div className="mx-auto max-w-7xl pb-32 pt-10 sm:px-6 sm:pb-32 lg:px-8">
      <div className="justify-center relative isolate px-6 pt-16 sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Don’t Let Stress Control Your Life.
            <br />
            Start your free trial today.
          </h2>
          <p className="text-center mt-6 text-lg leading-8 text-gray-600">
            Sign up today and discover the difference a personalized approach to
            stress management can make.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/mentalhealth"
              className="rounded-md tracking-wide bg-indigo-600 px-6 py-3 text-sm font-semibold text-white dark:text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Try for free
            </Link>
            {/* <Link
                href="https://getwaitlist.com/waitlist/17274"
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cta;
