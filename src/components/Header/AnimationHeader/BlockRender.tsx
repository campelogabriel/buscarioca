import AnimatedBusUpdating from "./AnimatedBusUpdating";
import AnimatedBusUpdated from "./AnimatedBusUpdated";

function BlockRender({ isFetching, busesOnMap, count }) {
  return (
    <>
      {isFetching ? (
        <AnimatedBusUpdating />
      ) : (
        <AnimatedBusUpdated busesOnMap={busesOnMap} />
      )}
    </>
  );
}

export default BlockRender;
