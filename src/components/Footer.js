import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 w-full">
      <div className="mx-auto max-w-screen-xl p-4 py-6 lg:py-8">
        <hr className="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-lg text-black dark:text-gray-400 sm:text-center">
            The Night Manager
          </span>
          <div className="flex mt-4 sm:mt-0 sm:justify-center">
            <a
              href="#"
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 mx-2 w-10 h-10"
            >
              <img
                src="https://img.icons8.com/?size=64&id=msQ6HdxpqUmi&format=png"
                alt="Facebook"
                className="w-full h-full"
              />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 mx-2 w-10 h-10"
            >
              <img
                src="https://img.icons8.com/?size=64&id=119026&format=png"
                alt="Instagram"
                className="w-full h-full"
              />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
