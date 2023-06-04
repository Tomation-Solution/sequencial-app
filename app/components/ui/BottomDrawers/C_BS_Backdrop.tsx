import React, { useCallback, useContext, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import themeContext from "../../../config/theme/themeContext";
import { scale } from "react-native-size-matters";

const { height } = Dimensions.get("screen");

const C_BS_Backdrop = ({
  onPress,
  show,
  children,
}: {
  onPress: () => void;
  show: number;
  children?: React.ReactNode;
}) => {
  const theme = useContext(themeContext);
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  // callbacks
  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log("handleSheetChanges", index);
      if (index === 0) {
        onPress();
      }
    },
    [show]
  );

  //   const open = useCallback(() => {
  //     bottomSheetRef.current?.expand();
  //   }, []);

  // renders
  // const renderBackdrop = useCallback(
  //   (props: any) => (
  //     <BottomSheetBackdrop
  //       {...props}
  //       disappearsOnIndex={0}
  //       appearsOnIndex={1}
  //     />
  //   ),
  //   []
  // );
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container]}>
        <BottomSheet
          ref={bottomSheetRef}
          index={show}
          snapPoints={snapPoints}
          // backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>{children}</View>
        </BottomSheet>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(24),
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height,
    zIndex: 999,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: scale(5),
  },
});

export default C_BS_Backdrop;
