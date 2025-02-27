
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MaterialButtonModal = ({ children }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleButtonPress = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity style={styles.floatingButton} onPress={handleButtonPress}>
                <Icon name="hammer-wrench" size={30} color="#ffffff" />
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Materials List</Text>
                        <Text style={styles.modalText}>Insert Materials here</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: '#1ABDD4',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        zIndex: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        width: '80%',
        maxWidth: 400,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#ddd',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MaterialButtonModal;
