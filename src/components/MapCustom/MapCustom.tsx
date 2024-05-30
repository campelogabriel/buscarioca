import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import EstiloMapa from "../../utils/mapStyle";
import { useEffect, useRef, useState } from "react";
import ModalBus from "./ModalBus";
import MarkerCustom from "./MarkerCustom";

import userIconX from "../../../assets/icon-user.png";

import { useSelector } from "react-redux";
import { useBuses } from "../../redux/sliceBuses/sliceBuses";
import { useSettings } from "../../redux/sliceSettings/sliceSettings";
import { Bus } from "../../types/BusType";
import CustomTabBar from "../CustomTabBar/CustomTabBar";
import { useRoute } from "@react-navigation/native";

function MapCustom({ location, setBusesOnMap }) {
  const [modalInfoBus, setModalInfoBus] = useState<Bus>();
  const [modal, setModal] = useState(false);
  const settings = useSelector(useSettings);

  const userIcon = require("../../../assets/icon-user.png");
  const route = useRoute();

  console.log("map Rendered");

  const markerSelect = useRef();
  const buses = useSelector(useBuses);

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
          ...mapRef.current?.props.children[1].filter(
            (bus) => bus !== undefined
          ),
        ].length
      );
    },
    //@ts-ignore
    [mapRef.current?.props.children[1]]
  );
  useEffect(() => {
    mapRef.current?.animateToRegion({
      latitude: location[0],
      longitude: location[1],
      latitudeDelta: 0.006,
      longitudeDelta: 0.006,
    });
  }, [location]);

  // useEffect(() => {
  //   if (markerSelect.current) {
  //     //@ts-ignore
  //     // console.log(mapRef.current?.props.children[1][4].props?.index);
  //     //@ts-ignore
  //     const x = mapRef.current?.props?.children[1].find(
  //       (marker) => marker?.props?.index == markerSelect.current
  //     );
  //     // console.log("Marker Selected: ", x);
  //     x.showCallout();
  //   }
  // }, [buses]);

  return (
    <>
      <MapView
        onPress={() => {
          setModal(false);
          markerSelect.current = undefined;
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
          icon={require("../../../assets/icon-user.png")}
        >
          <Callout tooltip>
            <View style={styles.userIcon}>
              <Text style={{ color: "#eee" }}>Você</Text>
            </View>
          </Callout>
        </Marker>

        {/* Buses Position */}
        {buses.map((bus: Bus) => {
          //@ts-ignore
          if (bus?.count <= 1 || bus.count == undefined) return;

          let latitude;
          let longitude;
          latitude = Number(bus.latitude.replace(",", "."));
          longitude = Number(bus.longitude.replace(",", "."));

          return (
            <MarkerCustom
              mapRef={mapRef}
              markerBusArray={markerBusArray}
              index={bus.ordem}
              key={bus.ordem}
              bus={bus}
              coords={{ latitude, longitude }}
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
  userIcon: {
    marginBottom: 10,
    marginVertical: 12,
    backgroundColor: "#0e997d",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default MapCustom;
