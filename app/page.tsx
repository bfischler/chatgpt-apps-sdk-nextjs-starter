"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useWidgetProps,
  useMaxHeight,
  useDisplayMode,
  useRequestDisplayMode,
  useIsChatGptApp,
  DisplayMode,
} from "./hooks";
import { NoChatGPTWarning } from "@/components/NoChatGPTWarning";
import PeopleTable from "@/components/PeopleTable/PeopleTable";
import { useFindPeople } from "./hooks/useFindPeople";
import { useCallback, useState } from "react";
import { PeopleSourceInputs } from "@/components/ConfigurationSidebar/types";
import clsx from "clsx";
import ConfigurationSidebar from "@/components/ConfigurationSidebar/ConfigurationSidebar";

export default function Home() {
  const toolOutput = useWidgetProps<{
    name?: string;
    result?: { structuredContent?: { name?: string } };
  }>();
  const maxHeight = useMaxHeight() ?? undefined;
  const isChatGptApp = useIsChatGptApp();
  const chatGptDisplayMode = useDisplayMode();
  const [localDisplayMode, setLocalDisplayMode] = useState<DisplayMode>(
    isChatGptApp ? (chatGptDisplayMode ?? "inline") : "inline"
  );
  const requestDisplayMode = useRequestDisplayMode();

  const displayMode = isChatGptApp
    ? (chatGptDisplayMode ?? "inline")
    : localDisplayMode;

  const updateDisplayMode = useCallback(
    (mode: DisplayMode) => {
      if (isChatGptApp) {
        requestDisplayMode(mode);
      } else {
        setLocalDisplayMode(mode);
      }
    },
    [requestDisplayMode]
  );

  const name = toolOutput?.result?.structuredContent?.name || toolOutput?.name;
  const { data, loading } = useFindPeople();
  const [filters, setFilters] = useState<Partial<PeopleSourceInputs>>({
    company_identifier: ["openai.com"],
  });
  const [dataPoints, setDataPoints] = useState<string[]>([]);

  return (
    <div
      className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20"
      style={{
        maxHeight,
        height: displayMode === "fullscreen" ? maxHeight : undefined,
      }}
    >
      {displayMode !== "fullscreen" && (
        <button
          aria-label="Enter fullscreen"
          className="fixed top-4 right-4 z-50 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-lg ring-1 ring-slate-900/10 dark:ring-white/10 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          onClick={() => updateDisplayMode("fullscreen")}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        </button>
      )}
      <main className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        {!isChatGptApp && <NoChatGPTWarning />}
        <div className="flex">
          {displayMode === "fullscreen" && (
            <ConfigurationSidebar
              filters={filters}
              dataPoints={dataPoints}
              onChangeFilters={setFilters}
              onChangeDataPoints={setDataPoints}
            />
          )}
          <PeopleTable
            data={data}
            additionalDataPoints={dataPoints}
            loading={loading}
            className={clsx(
              displayMode === "inline" && "rounded-lg h-120 overflow-y-auto",
              displayMode === "fullscreen" && "rounded-none"
            )}
          />
        </div>
        {/* <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Welcome to the ChatGPT Apps SDK Next.js Starter
          </li>
          <li className="mb-2 tracking-[-.01em]">
            Name returned from tool call: {name ?? "..."}
          </li>
          <li className="mb-2 tracking-[-.01em]">MCP server path: /mcp</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            prefetch={false}
            href="/custom-page"
          >
            Visit another page
          </Link>
          <a
            href="https://vercel.com/templates/ai/chatgpt-app-with-next-js"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Deploy on Vercel
          </a>
        </div> */}
      </main>
    </div>
  );
}
