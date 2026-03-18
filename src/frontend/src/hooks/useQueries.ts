import { useQuery } from "@tanstack/react-query";
import type { Feature, MenuItem, RestaurantInfo } from "../backend.d";
import { useActor } from "./useActor";

export function useRestaurantInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<RestaurantInfo>({
    queryKey: ["restaurantInfo"],
    queryFn: async () => {
      if (!actor) {
        return {
          name: "Gulf Restro",
          tagline: "Where the vibe is always right.",
          address: "Gulf Restro, Marine Drive Area, Your City",
          hours: "Mon–Sun: 11am–2am",
        };
      }
      return actor.getRestaurantInfo();
    },
    enabled: !isFetching,
  });
}

export function useMenuItems() {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMenuItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeatures() {
  const { actor, isFetching } = useActor();
  return useQuery<Feature[]>({
    queryKey: ["features"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeatures();
    },
    enabled: !!actor && !isFetching,
  });
}
