import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formattedDate = (date: Date) => {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export async function getSession() {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    // If there's an error, log it and return null to indicate no active session
    console.error("Error while fetching session:", error);
    return null;
  }
}