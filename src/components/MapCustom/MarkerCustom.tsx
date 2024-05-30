import { useEffect, useRef, useState } from "react";
import { View, Animated, Text } from "react-native";
import { Callout, Marker } from "react-native-maps";
import busColor from "../../utils/busColor";
import { Position } from "../../types/PositionType";

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
  const [imgBusN, setImgBusN] = useState(busColor);

  // const imgBus = require("../../../assets/busImage-3.png");
  const imgBus = require("../../../assets/4A86E8.png");

  // onibus icone
  // let path = "v".concat(bus.backgroundColor);
  // const img = busColor[path];

  // @ts-ignore
  const marker = useRef<MarkerAnimated | null>();
  if (!marker) return;

  useEffect(() => {
    setRootBus(root);
  }, [root]);

  useEffect(() => {
    setNewCoordsBus(coords);
    //@ts-ignore
    // marker?.current?.animateMarkerToCoordinate(coords, 500);
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
  }, [newCoordsBus]); //removido markerSelect

  if (!newCoordsBus && !rootBus) return;

  if (!newCoordsBus) return;

  return (
    <>
      <MarkerAnimated
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
        icon={imgBusN[`v${bus.backgroundColor}`]}
        tracksViewChanges={false}
        calloutAnchor={{ x: 0.5, y: -0.2 }}
        onPress={() => {
          setModal(true);
          setModalInfoBus(bus);
          markerSelect.current = bus.ordem;
        }}
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
