import { useQuery } from "@tanstack/react-query";

const fetchExercises = async () => {
  const res = await fetch("http://192.168.0.245:3000/exercises");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export function useExercises() {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: fetchExercises,
    refetchOnReconnect: true,
  });
}
