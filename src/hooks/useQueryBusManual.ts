import { useQuery } from "@tanstack/react-query";
import getBuses from "../utils/getBuses";

const useQueryBusManual = (busLines, location, setCountFetch) => {
  const { data, fetchStatus, isPaused, refetch } = useQuery({
    queryKey: ["busesManual"],
    queryFn: () => {
      setCountFetch((n) => n + 1);
      return getBuses(busLines, location);
    },
    enabled: false,
    networkMode: "online",
    refetchOnReconnect: true,
  });

  return { data, fetchStatus, isPaused, refetch };
};

export default useQueryBusManual;
