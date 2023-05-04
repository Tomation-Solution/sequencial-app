import { createContext, useEffect, useState } from "react";
import { Modal, View } from "react-native";

export const AppContext = createContext<{
  loading: boolean;
  setLoading: (authenticated: boolean) => void;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}>({
  loading: false,
  setLoading: () => {},
  modalVisible: false,
  setModalVisible: () => {},
});

export const AppProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (loading) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [loading]);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        modalVisible,
        setModalVisible,
      }}
    >
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: " rgba(0, 0 , 0, 0.7) ",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* {children} */}
        </View>
      </Modal>

      {children}
    </AppContext.Provider>
  );
};
