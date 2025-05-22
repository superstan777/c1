export const fetchExercises = async () => {
  const response = await fetch("http://localhost:3000/api/exercises/today");
  if (!response.ok) throw new Error("Failed to fetch exercises");
  return response.json();
};
