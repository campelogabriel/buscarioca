import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addLines } from "../../redux/sliceLines/sliceLines";
import { useIsFetching } from "@tanstack/react-query";
import BlockRender from "./AnimationHeader/BlockRender";
import useQueryBusManual from "../../hooks/useQueryBusManual";
import { Bus } from "../../types/BusType";
import { addBus } from "../../redux/sliceBuses/sliceBuses";
import batteries from "../../utils/battery";
import NoBattery from "./AnimationHeader/NoBattery";
import Input from "./Input";
import { useSelector } from "react-redux";
import { useSettings } from "../../redux/sliceSettings/sliceSettings";

function HeaderManual({
  count,
  busLines,
  location,
  busesOnMap,
  enabledBattery,
  setEnabledBattery,
  setCountFetch,
}) {
  const [line, setLine] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [images, setImages] = useState(batteries);
  const settings = useSelector(useSettings);
  const isFetching = useIsFetching();
  const dispatch = useDispatch();

  const refInput = useRef<any>();

  function handleSubmitBusLine() {
    if (!enabledBattery) {
      setLine("");
      return;
    }
    if (!line || line == "") return;

    dispatch(addLines(line));
    setLine("");
    refetch();
  }

  const { data, refetch, isPaused } = useQueryBusManual(
    busLines,
    location,
    setCountFetch
  );

  useEffect(() => {
    if (data && !isPaused) {
      data?.data?.buses?.map((bus: Bus) => dispatch(addBus(bus)));
      console.log("Onibus Encontrados: ", data?.data?.buses.length);
    }

    if (count == 6) {
      setIsEnabled(false);
      setEnabledBattery(false);
    }
  }, [data]);

  return (
    <View
      style={{
        ...styles.container,
        top: Dimensions.get("screen").height * 0.03,
      }}
    >
      <View
        style={{
          ...styles.header,
          backgroundColor:
            settings.mapStyles == "night" ? "#111111e4" : "#ffff",
          borderColor: settings.mapStyles == "night" ? "#444" : "#ccc",
          justifyContent: isFocus ? "center" : "flex-start",
          paddingHorizontal: !isFocus ? 30 : 0,
          gap: !isFocus ? 40 : 0,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setCountFetch(0);
            setIsEnabled(true);
          }}
        >
          <Image
            style={{
              resizeMode: "center",
              height: 30,
              width: 40,
              display: isFocus ? "none" : "flex",
            }}
            source={images[count > 6 ? 6 : count]}
          />
        </TouchableOpacity>
        <Input
          isNight={settings.mapStyles == "night" ? true : false}
          refInput={refInput}
          isFocus={isFocus}
          line={line}
          setLine={setLine}
          setIsFocus={setIsFocus}
          handleSubmitBusLine={handleSubmitBusLine}
        />
        <View>
          {!isFetching ? (
            <MaterialIcons
              onPress={() => busLines.length > 0 && isEnabled && refetch()}
              name="satellite-alt"
              size={24}
              style={{ display: isFocus ? "none" : "flex" }}
              color={`${
                busLines.length > 0 && isEnabled
                  ? settings.mapStyles == "night"
                    ? "#ccc"
                    : "#555"
                  : "#aaaaaa73"
              }`}
            />
          ) : (
            <ActivityIndicator
              style={{ display: isFocus ? "none" : "flex" }}
              color={settings.mapStyles == "night" ? "#fff" : "#008800"}
            />
          )}
        </View>
      </View>

      {/* TOASTER */}
      <BlockRender
        count={count}
        busesOnMap={busesOnMap}
        isFetching={isFetching}
      />
    </View>
  );
}

export default HeaderManual;

const styles = StyleSheet.create({
  container: {
    zIndex: 9,
    position: "absolute",
    alignItems: "center",
    gap: 8,
  },
  header: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 12,
    gap: 40,
    borderWidth: 1,
    borderRadius: 9,
  },
});
