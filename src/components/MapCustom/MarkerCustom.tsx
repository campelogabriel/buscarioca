import { useEffect, useRef, useState } from "react";
import { Animated, Image } from "react-native";
import { Marker } from "react-native-maps";
import { Position } from "../../types/PositionType";
import BusMarker from "../../../assets/markerBus.svg";

const MarkerAnimated = Animated.createAnimatedComponent(Marker);

function MarkerCustom({
  markerBusArray,
  coords,
  setModal,
  bus,
  setModalInfoBus,
  index,
  root = 0,
  mapRef,
  markerSelect,
}) {
  const [newCoordsBus, setNewCoordsBus] = useState<Position | null>();
  const [rootBus, setRootBus] = useState<number>();
  const imgBus = require("../../../assets/markerBus.png");

  // @ts-ignore
  const marker = useRef<MarkerAnimated | null>();
  if (!marker) return;

  useEffect(() => {
    setRootBus(root);
  }, [root]);

  useEffect(() => {
    setNewCoordsBus(coords);
  }, [coords]);

  useEffect(() => {
    if (markerSelect.current == bus.ordem) {
      mapRef.current.animateToRegion(
        {
          latitude: newCoordsBus?.latitude,
          longitude: newCoordsBus?.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.001,
        },
        500
      );
      setModal(true);
      setModalInfoBus(bus);
      marker.current.showCallout();
    }
  }, [newCoordsBus]);

  if (!newCoordsBus && !rootBus) return;
  if (!newCoordsBus) return;

  return (
    <>
      <MarkerAnimated
        style={{ zIndex: markerSelect.current == bus.ordem ? 1 : 0 }}
        ref={(el) => {
          marker.current = el;
          markerBusArray.current[index] = el;
        }}
        key={index}
        anchor={{ x: 0.5, y: 0.5 }}
        rotation={rootBus}
        coordinate={{
          latitude: newCoordsBus.latitude,
          longitude: newCoordsBus.longitude,
        }}
        tracksViewChanges={false}
        calloutAnchor={{ x: 0.5, y: -0.2 }}
        onPress={() => {
          setModal(true);
          setModalInfoBus(bus);
          markerSelect.current = bus.ordem;
        }}
        icon={require("../../../assets/markerBus.png")}
      />
    </>
  );
}

export default MarkerCustom;

{
  /* <Callout tooltip>
          <View
            style={{
              backgroundColor: `#${bus.backgroundColor}`,
              padding: 4,
              borderRadius: 6,
              borderWidth: 2,
              borderColor: "#000",
            }}
          >
            <Text style={{ color: `#${bus.textColor}`, fontWeight: "bold" }}>
              {bus.linha}
            </Text>
          </View>
        </Callout> */
}
