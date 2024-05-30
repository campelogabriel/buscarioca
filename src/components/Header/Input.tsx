import { useEffect } from "react";
import { Keyboard, TextInput } from "react-native";

function Input({
  line,
  setLine,
  setIsFocus,
  handleSubmitBusLine,
  isFocus,
  refInput,
  isNight,
}) {
  const keyboardDidHideCallback = () => {
    refInput.current.blur?.();
    setIsFocus(false);
    setLine("");
  };

  useEffect(() => {
    const keyboardDidHideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHideCallback
    );

    return () => {
      keyboardDidHideSubscription?.remove();
    };
  }, []);

  return (
    <TextInput
      ref={refInput}
      onFocus={() => setIsFocus(true)}
      autoCapitalize={"characters"}
      placeholder="Digite a Linha"
      placeholderTextColor={isNight ? "#aaa" : "#666"}
      returnKeyType="done"
      maxLength={13}
      value={line}
      onChangeText={(text) => {
        setLine(text);
      }}
      style={{
        color: isNight ? "#fff" : "#0e997d",
        textDecorationLine: "none",
        backgroundColor: isNight ? "#11111144" : "#fff",
        textAlign: "center",
      }}
      onSubmitEditing={() => {
        setIsFocus(false);
        handleSubmitBusLine();
      }}
    />
  );
}

export default Input;
