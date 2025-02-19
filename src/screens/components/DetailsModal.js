import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DetailsModal = ({ visible, item, onClose }) => {
    if (!item) { return null; }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{item.store}</Text>

                    <Text style={styles.modalText}>Date: {item.date}</Text>
                    <Text style={styles.modalText}>Location: {item.location}</Text>
                    <Text style={styles.modalText}>Time: {item.time}</Text>
                    <Text style={styles.modalText}>Routes: {item.routes}</Text>
                    <Text style={styles.modalText}>Body Number: {item.bodyNumber}</Text>
                    <Text style={styles.modalText}>Driver: {item.driver}</Text>
                    <Text style={styles.modalText}>Plate Number: {item.plateNumber}</Text>




                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 5,
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: '#1882A1',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default DetailsModal;
