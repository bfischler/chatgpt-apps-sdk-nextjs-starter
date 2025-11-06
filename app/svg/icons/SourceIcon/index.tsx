import { SourceIcon } from "@/shared/source-icons";
import ClaySource from "./clay";
import OpenAI from "./openai";

export const sourceIcons: Record<SourceIcon, React.FC> = {
  ClaySource,
  OpenAI,
};
