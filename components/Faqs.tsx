function Faqs() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-24 sm:py-32 mx-auto max-w-screen-xl px-6 lg:px-8">
        <h2 className="mb-8  text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Frequently asked questions
        </h2>
        <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
          <div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                What is RewireMind?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                RewireMind is an AI-powered app designed to help you manage
                stress by offering personalized techniques, action plans, and
                messages just for you! By sharing your feedback, you help our AI
                learn what works best for you, making it more effective over
                time.
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                How does RewireMind personalize stress management techniques?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                RewireMind uses advanced AI algorithms to understand your
                feedback and preferences. It takes into account how you respond
                to different techniques and keeps getting better at delivering
                strategies that work for you, ensuring a super personalized
                experience!
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Who are the creators of RewireMind?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                We are individuals who have personally experienced the
                overwhelming effects of stress. Our journey through managing
                stress inspired us to develop this app, and we're here to help
                others find effective ways to cope and thrive!
              </p>
              {/* <p className="text-gray-500 dark:text-gray-400">
                Feel free to{" "}
                <a
                  href="#"
                  className="font-medium underline text-primary-600 dark:text-primary-500 hover:no-underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  contact us
                </a>{" "}
                and we'll help you out as soon as we can.
              </p> */}
            </div>
          </div>
          <div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                How much does RewireMind cost?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                RewireMind is free to get started with one free generation! This
                lets you try out the app and see how it can help you before you
                decide on a subscription. We want to make stress management
                accessible to everyone!
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                How can I provide feedback to improve the AI's recommendations?
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Absolutely! Your privacy and data security are super important
                to us. RewireMind uses top-notch encryption and security
                measures to keep your information safe. We're committed to
                protecting your personal data at all times!
              </p>
            </div>
            <div className="mb-10">
              <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Is my personal data safe with RewireMind?{" "}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Yes, your privacy and data security are our top priorities.
                RewireMind uses state-of-the-art encryption and security
                measures to protect your information. We are committed to
                maintaining the confidentiality and safety of your personal data
                at all times. Feel free to adjust these questions and answers to
                better fit the specific features and tone of your app!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faqs;
