import { View, StyleSheet } from "react-native";
import Header from "../components/Header/Header";
import MapCustom from "../components/MapCustom/MapCustom";
import { useSelector } from "react-redux";
import { useLines } from "../redux/sliceLines/sliceLines";
import { useEffect, useState } from "react";
import { addBus } from "../redux/sliceBuses/sliceBuses";
import { Bus } from "../types/BusType";
import { useSettings } from "../redux/sliceSettings/sliceSettings";
import { useQueryBuses } from "../hooks/useQueryBuses";
import { useDispatch } from "react-redux";
import HeaderManual from "../components/Header/HeaderManual";
import { usePositions } from "../redux/slicePositions/slicePositions";
import LottieViewBus from "../components/LottieViewBus";
import WatchVideo from "src/components/WatchVideo";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const busLines = useSelector(useLines);
  const settings = useSelector(useSettings);
  const positions = useSelector(usePositions);

  const [countFetch, setCountFetch] = useState(0);
  const [busesOnMap, setBusesOnMap] = useState();
  const [enabledBattery, setEnabledBattery] = useState(true);

  console.log("busesLines: ", busLines);

  const { data, isPaused, isFetching, refetch } = useQueryBuses(
    busLines,
    settings.isEnabledAutomate,
    setCountFetch,
    positions,
    enabledBattery
  );

  console.log("HomeScreen rendered");
  useEffect(() => {
    if (data && !isPaused) {
      data?.data?.buses?.map((bus: Bus) => {
        dispatch(addBus(bus));
      });
    }

    if (countFetch == 6) {
      setEnabledBattery(false);
    }
  }, [data]);

  if (positions.length == 0) return <LottieViewBus />;

  return (
    <View style={styles.container}>
      {settings.isEnabledAutomate ? (
        <Header
          busLines={busLines}
          count={countFetch}
          isFetching={isFetching}
          busesOnMap={busesOnMap}
          enabledBattery={enabledBattery}
          setEnabledBattery={setEnabledBattery}
          setCount={setCountFetch}
          refetch={refetch}
        />
      ) : (
        <HeaderManual
          count={countFetch}
          location={positions}
          busLines={busLines}
          busesOnMap={busesOnMap}
          enabledBattery={enabledBattery}
          setEnabledBattery={setEnabledBattery}
          setCountFetch={setCountFetch}
        />
      )}
      <MapCustom setBusesOnMap={setBusesOnMap} location={positions} />
      {/* <WatchVideo /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
