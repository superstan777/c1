import { useQuery } from "@tanstack/react-query";

const fetchExercises = async () => {
  const res = await fetch("https://your.api/exercises");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json(); // or transform if needed
};

export function useExercises() {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: fetchExercises,
    refetchOnMount: false,
    refetchOnWindowFocus: false, // React Native: irrelevant
    refetchOnReconnect: true,
  });
}
