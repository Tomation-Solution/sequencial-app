import { createContext, useEffect, useState } from "react";
import { ActivityIndicator, Modal, StatusBar, View } from "react-native";

export const AppContext = createContext<{
  loading: boolean;
  onLoading: () => void;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  modalContent: any;
  setModalContent: (content: any) => void;
}>({
  loading: false,
  onLoading: () => {},
  modalVisible: false,
  setModalVisible: () => {},
  modalContent: null,
  setModalContent: () => {},
});

export const AppProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<any>(
    <ActivityIndicator size={"small"} />
  );

  const onLoading = () => {
    setLoading(true);
    setModalContent(<ActivityIndicator size={"small"} />);
  };

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
        onLoading,
        modalVisible,
        setModalVisible,
        modalContent,
        setModalContent,
      }}
    >
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <StatusBar backgroundColor="rgba(0, 0 , 0, 0.7)" />
        <View
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: " rgba(0, 0 , 0, 0.7) ",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {modalContent}
        </View>
      </Modal>

      {children}
    </AppContext.Provider>
  );
};
