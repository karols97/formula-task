import { useQuery } from "@tanstack/react-query";

export type Tag = {
  name: string;
  category: string;
  id: string;
  value: number | string;
};

export const useTags = () => {
  const url = "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete";
  const getTags = async (): Promise<Tag[]> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      return json as Tag[];
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch tags");
    }
  };

  return useQuery({
    queryKey: ["tags"],
    queryFn: () => {
      return getTags();
    },
  });
};
