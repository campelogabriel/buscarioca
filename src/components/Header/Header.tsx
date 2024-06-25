import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons, Feather, Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addLines } from "../../redux/sliceLines/sliceLines";
import BlockRender from "./AnimationHeader/BlockRender";
import batteries from "../../utils/battery";
import { Dimensions } from "react-native";
import Input from "./Input";
import lines from "../../utils/lines.json";
import { useSelector } from "react-redux";
import { useSettings } from "../../redux/sliceSettings/sliceSettings";

function Header({
  count,
  busLines,
  isFetching,
  busesOnMap,
  enabledBattery,
  setEnabledBattery,
  setCount,
}) {
  const [line, setLine] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false);
  const [images, setImages] = useState(batteries);
  const settings = useSelector(useSettings);

  const refInput = useRef<any>();
  const dispatch = useDispatch();

  function handleSubmitBusLine() {
    if (!line || line == "" || !enabledBattery) {
      refInput.current.blur?.();
      Keyboard.dismiss();
      return;
    }
    if (line.includes(",")) {
      line.split(",").map((a) => {
        dispatch(addLines(a.trim()));
      });
      Keyboard.dismiss();
      setIsFocus(false);
      return;
    }
    dispatch(addLines(line));
    setIsFocus(false);
    Keyboard.dismiss();
  }

  return (
    <View
      style={{
        ...styles.container,
        top: Dimensions.get("screen").height * 0.03,
        marginHorizontal: isFocus ? 40 : "",
      }}
    >
      <View
        style={{
          ...styles.batteryHeader,
          backgroundColor:
            settings.mapStyles == "night" ? "#111111e4" : "#ffff",
          borderColor: settings.mapStyles == "night" ? "#444" : "#ccc",
          display: isFocus ? "none" : "flex",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setCount(0);
            setEnabledBattery(true);
          }}
        >
          <Image
            style={{
              resizeMode: "center",
              height: 30,
              width: 40,
            }}
            source={images[count > 6 ? 6 : count]}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...styles.header,
          backgroundColor:
            settings.mapStyles == "night" ? "#111111e4" : "#ffff",
          borderColor: settings.mapStyles == "night" ? "#444" : "#ccc",
          paddingHorizontal: 30,
          marginRight: isFocus ? 30 : 0,
          gap: 40,
          width: isFocus ? "100%" : "220",
        }}
      >
        <TouchableOpacity
          style={{ display: isFocus ? "flex" : "none" }}
          onPress={() => {
            refInput.current.blur?.();
            Keyboard.dismiss();
          }}
        >
          <Ionicons
            name="close"
            size={24}
            color={settings.mapStyles == "night" ? "#ccc" : "#555"}
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
        <>
          {busLines.length == 0 || !enabledBattery ? (
            <MaterialIcons
              name="satellite-alt"
              size={24}
              style={{ display: isFocus ? "none" : "flex" }}
              color={`${
                busLines.length > 0 && enabledBattery
                  ? settings.mapStyles == "night"
                    ? "#b6b5b5"
                    : "#444"
                  : "#aaaaaa73"
              }`}
            />
          ) : (
            <ActivityIndicator
              style={{ display: isFocus ? "none" : "flex" }}
              color={settings.mapStyles == "night" ? "#fff" : "#008800"}
            />
          )}
        </>
        <Feather
          onPress={() => {
            handleSubmitBusLine();
          }}
          style={{
            display: isFocus ? "flex" : "none",
          }}
          name="search"
          size={20}
          color="#777"
        />
        {/* TOASTER */}
        {busLines.length > 0 && (
          <BlockRender
            count={count}
            busesOnMap={busesOnMap}
            isFetching={isFetching}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    position: "absolute",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    elevation: 5,
  },

  batteryHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    elevation: 5,
  },
  header: {
    zIndex: 9,
    height: 55,
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 20,
    position: "relative",
    elevation: 5,
  },
});

export default Header;
