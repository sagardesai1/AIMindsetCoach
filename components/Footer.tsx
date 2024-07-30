import Image from "next/image";
import React from "react";
// import LogoImage from "@/images/logos/logo-image.png";
import { AspectRatio } from "./ui/aspect-ratio";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 antialiased pt-14">
      <div className="p-4 py-6 mx-auto max-w-full md:p-8 lg:p-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 mx-auto max-w-md">
            <Link
              href="/"
              className="flex items-center mb-5 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <div className="flex items-center w-7 h-7">
                <AspectRatio
                  ratio={16 / 9}
                  className="flex items-center justify-center"
                >
                  {/* <Image priority src={LogoImage} alt="HackWellness"></Image> */}
                </AspectRatio>
              </div>
            </Link>
            <span className="block text-sm  text-gray-500 dark:text-gray-400">
              Wellness Hacks from your favorite biohackers.
            </span>
            <ul className="flex mt-5 space-x-8">
              <li>
                <a
                  href="https://www.instagram.com/thewellnesspundit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 32 32"
                    className="w-6 h-6"
                    fill="currentColor"
                  >
                    <path d="M10.202,2.098c-1.49,.07-2.507,.308-3.396,.657-.92,.359-1.7,.84-2.477,1.619-.776,.779-1.254,1.56-1.61,2.481-.345,.891-.578,1.909-.644,3.4-.066,1.49-.08,1.97-.073,5.771s.024,4.278,.096,5.772c.071,1.489,.308,2.506,.657,3.396,.359,.92,.84,1.7,1.619,2.477,.779,.776,1.559,1.253,2.483,1.61,.89,.344,1.909,.579,3.399,.644,1.49,.065,1.97,.08,5.771,.073,3.801-.007,4.279-.024,5.773-.095s2.505-.309,3.395-.657c.92-.36,1.701-.84,2.477-1.62s1.254-1.561,1.609-2.483c.345-.89,.579-1.909,.644-3.398,.065-1.494,.081-1.971,.073-5.773s-.024-4.278-.095-5.771-.308-2.507-.657-3.397c-.36-.92-.84-1.7-1.619-2.477s-1.561-1.254-2.483-1.609c-.891-.345-1.909-.58-3.399-.644s-1.97-.081-5.772-.074-4.278,.024-5.771,.096m.164,25.309c-1.365-.059-2.106-.286-2.6-.476-.654-.252-1.12-.557-1.612-1.044s-.795-.955-1.05-1.608c-.192-.494-.423-1.234-.487-2.599-.069-1.475-.084-1.918-.092-5.656s.006-4.18,.071-5.656c.058-1.364,.286-2.106,.476-2.6,.252-.655,.556-1.12,1.044-1.612s.955-.795,1.608-1.05c.493-.193,1.234-.422,2.598-.487,1.476-.07,1.919-.084,5.656-.092,3.737-.008,4.181,.006,5.658,.071,1.364,.059,2.106,.285,2.599,.476,.654,.252,1.12,.555,1.612,1.044s.795,.954,1.051,1.609c.193,.492,.422,1.232,.486,2.597,.07,1.476,.086,1.919,.093,5.656,.007,3.737-.006,4.181-.071,5.656-.06,1.365-.286,2.106-.476,2.601-.252,.654-.556,1.12-1.045,1.612s-.955,.795-1.608,1.05c-.493,.192-1.234,.422-2.597,.487-1.476,.069-1.919,.084-5.657,.092s-4.18-.007-5.656-.071M21.779,8.517c.002,.928,.755,1.679,1.683,1.677s1.679-.755,1.677-1.683c-.002-.928-.755-1.679-1.683-1.677,0,0,0,0,0,0-.928,.002-1.678,.755-1.677,1.683m-12.967,7.496c.008,3.97,3.232,7.182,7.202,7.174s7.183-3.232,7.176-7.202c-.008-3.97-3.233-7.183-7.203-7.175s-7.182,3.233-7.174,7.203m2.522-.005c-.005-2.577,2.08-4.671,4.658-4.676,2.577-.005,4.671,2.08,4.676,4.658,.005,2.577-2.08,4.671-4.658,4.676-2.577,.005-4.671-2.079-4.676-4.656h0"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/WUtC8Rxq"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M26.413,6.536c-1.971-.902-4.052-1.543-6.189-1.904-.292,.523-.557,1.061-.793,1.612-2.277-.343-4.592-.343-6.869,0-.236-.551-.5-1.089-.793-1.612-2.139,.365-4.221,1.006-6.194,1.909C1.658,12.336,.596,17.987,1.127,23.558h0c2.294,1.695,4.861,2.984,7.591,3.811,.615-.827,1.158-1.704,1.626-2.622-.888-.332-1.744-.741-2.56-1.222,.215-.156,.425-.316,.628-.472,4.806,2.26,10.37,2.26,15.177,0,.205,.168,.415,.328,.628,.472-.817,.483-1.676,.892-2.565,1.225,.467,.918,1.011,1.794,1.626,2.619,2.732-.824,5.301-2.112,7.596-3.808h0c.623-6.461-1.064-12.06-4.46-17.025Zm-15.396,13.596c-1.479,0-2.702-1.343-2.702-2.994s1.18-3.006,2.697-3.006,2.73,1.354,2.704,3.006-1.192,2.994-2.699,2.994Zm9.967,0c-1.482,0-2.699-1.343-2.699-2.994s1.18-3.006,2.699-3.006,2.723,1.354,2.697,3.006-1.189,2.994-2.697,2.994Z"></path>
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UCoal6QZpH-xp6oEkRa0eTsQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white dark:text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 32 32"
                    className="w-6 h-6"
                    fill="currentColor"
                  >
                    <path d="M31.331,8.248c-.368-1.386-1.452-2.477-2.829-2.848-2.496-.673-12.502-.673-12.502-.673,0,0-10.007,0-12.502,.673-1.377,.37-2.461,1.462-2.829,2.848-.669,2.512-.669,7.752-.669,7.752,0,0,0,5.241,.669,7.752,.368,1.386,1.452,2.477,2.829,2.847,2.496,.673,12.502,.673,12.502,.673,0,0,10.007,0,12.502-.673,1.377-.37,2.461-1.462,2.829-2.847,.669-2.512,.669-7.752,.669-7.752,0,0,0-5.24-.669-7.752ZM12.727,20.758V11.242l8.364,4.758-8.364,4.758Z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Company
            </h2>
            <ul className="text-gray-500 dark:text-gray-400">
              {/* <li className="mb-4">
                <a href="#" className=" hover:underline">
                  About
                </a>
              </li> */}
              <li className="mb-4">
                <a href="/andrew-huberman" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Support
            </h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <a
                  href="https://discord.gg/WUtC8Rxq"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="hover:underline"
                >
                  Discord Server
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://www.youtube.com/channel/UCoal6QZpH-xp6oEkRa0eTsQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Youtube
                </a>
              </li>
              <li className="mb-4">
                <a
                  href="https://www.instagram.com/thewellnesspundit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Instagram
                </a>
              </li>
              {/* <li className="mb-4">
                <a href="#" target="_blank" className="hover:underline">
                  Contact Us
                </a>
              </li> */}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Legal
            </h2>
            <ul className="text-gray-500 dark:text-gray-400">
              {/* <li className="mb-4">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li> */}
              <li className="mb-4">
                <Link href="/legal/disclaimer" className="hover:underline">
                  Disclaimer
                </Link>
              </li>
              {/* <li className="mb-4">
                <a href="#" className="hover:underline">
                  Terms
                </a>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="my-6 border-gray-200 border-b sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 dark:text-gray-400">
          © 2024{" "}
          <a href="/" className="hover:underline">
            HackWellness
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
