import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import EstiloMapa from "../../utils/mapStyle";
import { useEffect, useReducer, useRef, useState } from "react";
import ModalBus from "./ModalBus";
import MarkerCustom from "./MarkerCustom";

import { useSelector } from "react-redux";
import { useBuses } from "../../redux/sliceBuses/sliceBuses";
import { useSettings } from "../../redux/sliceSettings/sliceSettings";
import { Bus } from "../../types/BusType";
import CustomTabBar from "../CustomTabBar/CustomTabBar";
import { useRoute } from "@react-navigation/native";
import CalloutView from "./CalloutView";
import { useLines } from "src/redux/sliceLines/sliceLines";
import BusMarkerBtn from "./BusMarkerBtn";

const initialState: String[] = [];

function reducer(state, action) {
  switch (action.type) {
    case "toggle":
      if (state.includes(action.payload))
        return state.filter((line: string) => line !== action.payload);
      else return [...state, action.payload];
    default:
  }
}

function MapCustom({ location, setBusesOnMap }) {
  const [modalInfoBus, setModalInfoBus] = useState<Bus>();
  const [modal, setModal] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const settings = useSelector(useSettings);

  const [state, dispatch] = useReducer(reducer, initialState);

  const route = useRoute();
  const markerSelect = useRef();
  const buses = useSelector(useBuses);
  const lines = useSelector(useLines);

  //@ts-ignore
  const markerUser = useRef<Marker>();
  //@ts-ignore
  const mapRef = useRef<MapView | null>();
  //@ts-ignore
  const markerBusArray = useRef<string[]>([]);
  //@ts-ignore

  useEffect(
    () => {
      setBusesOnMap(
        [
          //@ts-ignore
          ...mapRef?.current?.props.children[1].filter(
            (bus) => bus !== undefined
          ),
        ].length
      );
    },
    //@ts-ignore
    [mapRef.current?.props.children[1]]
  );

  useEffect(() => {
    //@ts-ignore
    mapRef.current.props.children[1] = mapRef.current.props.children[1]
      .filter((bus) => bus != undefined)
      .filter((a) => lines.includes(a.props.bus.linha));
  }, [lines]);

  useEffect(() => {
    mapRef.current?.animateToRegion({
      latitude: location[0],
      longitude: location[1],
      latitudeDelta: 0.006,
      longitudeDelta: 0.006,
    });
  }, [location]);
  return (
    <>
      <BusMarkerBtn
        setIsActive={setIsActive}
        isActive={isActive}
        lines={lines}
        markerBuses={mapRef}
        dispatch={dispatch}
        state={state}
      />
      <MapView
        onMarkerPress={() => setIsActive(false)}
        onPress={() => {
          setModal(false);
          markerSelect.current = undefined;
          setIsActive(false);
        }}
        ref={(el) => (mapRef.current = el)}
        maxZoomLevel={17}
        onMapLoaded={() => {
          markerUser.current.showCallout();
        }}
        provider={PROVIDER_GOOGLE}
        key={process.env.EXPO_PUBLIC_KEY_GOOGLE_MAPS}
        zoomEnabled={markerSelect.current ? false : true}
        rotateEnabled={false}
        pitchEnabled={false}
        showsBuildings={false}
        toolbarEnabled={false}
        initialRegion={{
          latitude: location.at(0),
          longitude: location.at(1),
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        }}
        style={styles.map}
        customMapStyle={EstiloMapa[settings.mapStyles]}
      >
        {/* User Position */}
        <Marker
          ref={(el) => (markerUser.current = el)}
          anchor={{ x: 0.5, y: 0.5 }}
          coordinate={{
            latitude: location.at(0),
            longitude: location.at(1),
          }}
        >
          <CalloutView />
        </Marker>
        {/* Buses Position */}
        {buses.map((bus: Bus) => {
          //@ts-ignore
          if (bus?.count <= 1 || bus.count == undefined) return;

          if (state.includes(bus.linha)) return;

          return (
            <MarkerCustom
              mapRef={mapRef}
              markerBusArray={markerBusArray}
              index={bus.ordem}
              key={bus.ordem}
              bus={bus}
              coords={{ latitude: bus.latitude, longitude: bus.longitude }}
              setModal={setModal}
              setModalInfoBus={setModalInfoBus}
              root={bus.root}
              markerSelect={markerSelect}
            />
          );
        })}
      </MapView>

      {/* Modal */}
      {modal && (
        <>
          <ModalBus
            modalInfoBus={modalInfoBus}
            setModal={setModal}
            markerSelect={markerSelect}
            markerBusArray={markerBusArray}
            isNight={settings.mapStyles == "night"}
          />
        </>
      )}
      {!modal && (
        <CustomTabBar
          isNight={settings.mapStyles == "night"}
          routeName={route.name}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapCustom;
