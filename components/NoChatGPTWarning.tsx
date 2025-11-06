export const NoChatGPTWarning = () => {
  return (
    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-3 w-full">
      <div className="flex items-center gap-3">
        <svg
          className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
            clipRule="evenodd"
          />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
            This app relies on data from a ChatGPT session.
          </p>
          <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
            No{" "}
            <a
              href="https://developers.openai.com/apps-sdk/reference"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline font-mono bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded"
            >
              window.openai
            </a>{" "}
            property detected
          </p>
        </div>
      </div>
    </div>
  );
};
