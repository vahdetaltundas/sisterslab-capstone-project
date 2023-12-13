import React from 'react'
import Policy from '../ui/Policy'
import Link from 'next/link'
import { FaLinkedin,FaMedium } from "react-icons/fa6";
import { FaGithub } from 'react-icons/fa';
const Footer = () => {
  return (
    <>
    <Policy/>
    <footer className="bg-white dark:bg-gray-900 ">
  <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
    <div className="md:flex md:justify-between">
      <div className="mb-6 md:mb-0">
        <Link href="/" className="w-[7rem] h-auto">
          <img
            src="https://i.imgur.com/DciRya3.png"
            className="w-32 h-auto"
            alt="Logo"
          />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
            Follow us
          </h2>
          <ul className="text-gray-500 dark:text-gray-400 font-medium">
            <li className="mb-4">
              <Link
                href="https://github.com/vahdetaltundas"
                className="hover:underline "
              >
                Github
              </Link>
            </li>
            <li>
              <Link
                href="https://discord.gg"
                className="hover:underline"
              >
                Discord
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <div className="sm:flex sm:items-center sm:justify-between">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2023{" "}
        <Link href="/" className="hover:underline">
          Vahdet Altundaş
        </Link>
        . All Rights Reserved.
      </span>
      <div className="flex mt-4 sm:justify-center sm:mt-0">
        <Link
          href="https://www.linkedin.com/in/vahdet-altunda%C5%9F-2ab8b1234/"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
        >
          <FaLinkedin/>
          <span className="sr-only">Linkedin</span>
        </Link>
        <Link
          href="https://medium.com/@vahdetaltundas2323"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
        >
          <FaMedium/>
          
          <span className="sr-only">Medium</span>
        </Link>
        <a
          href="https://github.com/vahdetaltundas"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
        >
          <FaGithub/>
          <span className="sr-only">GitHub account</span>
        </a>
        
      </div>
    </div>
  </div>
</footer>
</>

  )
}

export default Footer