import { getMillisecondsUntilMidnight } from "@/utils/getSecondsUntilMidnight";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: getMillisecondsUntilMidnight(), // Use the seconds to set staleTime
      gcTime: 1000 * 60 * 60, // 1 hour for garbage collection
      retry: 5,
    },
  },
});
