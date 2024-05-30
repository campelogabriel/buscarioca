import { useQuery } from "@tanstack/react-query";
import getBuses from "../utils/getBuses";

export const useQueryBuses = (
  busLines,
  enabled,
  setCountFetch,
  location,
  enabledBattery
) => {
  const { data, fetchStatus, isPaused, isFetching, refetch } = useQuery({
    refetchInterval: 1000 * 20,
    queryKey: ["buses"],
    queryFn: () => {
      setCountFetch((n) => n + 1);
      return getBuses(busLines, location);
    },
    enabled: busLines.length > 0 && enabled && enabledBattery,
    networkMode: "online",
    refetchOnReconnect: true,
  });

  return { data, fetchStatus, isPaused, isFetching, refetch };
};
