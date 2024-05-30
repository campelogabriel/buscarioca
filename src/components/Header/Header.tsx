import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addLines } from "../../redux/sliceLines/sliceLines";
import BlockRender from "./AnimationHeader/BlockRender";
import batteries from "../../utils/battery";
import { Dimensions } from "react-native";
import Input from "./Input";
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
  refetch,
}) {
  const [line, setLine] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false);
  const [images, setImages] = useState(batteries);
  const settings = useSelector(useSettings);

  const refInput = useRef<any>();

  const dispatch = useDispatch();
  function handleSubmitBusLine() {
    if (!enabledBattery) {
      setLine("");
      return;
    }
    if (!line || line == "") return;
    dispatch(addLines(line));
    // setLine("");
    refetch();
  }

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
            setCount(0);
            setEnabledBattery(true);
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
        </View>
      </View>
      {/* TOASTER */}
      {busLines.length > 0 && (
        <BlockRender
          count={count}
          busesOnMap={busesOnMap}
          isFetching={isFetching}
        />
      )}
    </View>
  );
}

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
    paddingVertical: 10,
    alignItems: "center",
    elevation: 12,
    borderWidth: 1,
    borderRadius: 9,
  },
});

export default Header;
