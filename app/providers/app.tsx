import { createContext, useEffect, useState } from "react";
import { Modal } from "react-native";

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
  const [loading, setLoading] = useState(true);
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
      <Modal
        visible={modalVisible}
        animationType="slide"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />

      {children}
    </AppContext.Provider>
  );
};
