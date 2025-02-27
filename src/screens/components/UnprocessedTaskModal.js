/* eslint-disable react-native/no-inline-styles */


import React from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import {
    setUnprocessedTask,
    submitUnprocessedTask,
    clearUnprocessedTaskData,
} from '../../store/deliverySlice';

const UnprocessedTaskModal = ({ visible, onClose, incompleteRoutes }) => {
    const dispatch = useDispatch();
    const unprocessedTaskData = useSelector(state => state.deliveries.unprocessedTaskData);

    const handleAttachment = () => {
        launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (response) => {
            if (!response.didCancel && !response.errorCode) {
                dispatch(setUnprocessedTask({
                    ...unprocessedTaskData,
                    attachment: response.assets[0].uri,
                }));
            }
        });
    };

    const handleUnattach = () => {
        dispatch(setUnprocessedTask({
            ...unprocessedTaskData,
            attachment: null,
        }));
    };

    const handleReasonChange = (text) => {
        dispatch(setUnprocessedTask({
            ...unprocessedTaskData,
            reason: text,
        }));
    };

    const handleSubmit = () => {
        dispatch(submitUnprocessedTask({
            deliveryId: unprocessedTaskData.deliveryId,
            reason: unprocessedTaskData.reason,
            attachment: unprocessedTaskData.attachment,
        }));
        dispatch(clearUnprocessedTaskData());
        onClose();
    };

    const maxCharacters = 200;
    const reason = unprocessedTaskData?.reason || '';
    const attachment = unprocessedTaskData?.attachment || null;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.modalTitle}>Unprocessed Task</Text>
                    </View>

                    {incompleteRoutes && incompleteRoutes.length > 0 ? (
                        incompleteRoutes.map((route, index) => (
                            <Text key={route.index} style={styles.routeItem}>
                                {index + 1}. <Text style={styles.place}> {route.place}</Text> <Text style={styles.serviceType}>{route.serviceType}</Text>
                            </Text>

                        ))
                    ) : (
                        <Text style={styles.modalText}>No routes are unprocessed.</Text>
                    )}

                    <Text style={styles.characterCount}>
                        {reason.length} / {maxCharacters} characters
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Note"
                        placeholderTextColor="#A6A6A6"
                        value={reason}
                        onChangeText={handleReasonChange}
                        maxLength={maxCharacters}
                        multiline
                    />

                    {!attachment && (
                        <TouchableOpacity
                            style={styles.attachmentContainer}
                            onPress={handleAttachment}
                        >
                            <Icon name="paperclip" size={24} color="#1ABDD4" />
                            <Text style={styles.attachmentText}>Add an attachment</Text>
                        </TouchableOpacity>
                    )}

                    {attachment && (
                        <View style={styles.imageWrapper}>
                            <Image source={{ uri: attachment }} style={styles.attachedImage} />
                            <TouchableOpacity
                                style={styles.unattachButton}
                                onPress={handleUnattach}
                            >
                                <Icon name="close-circle" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalOverlay: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontFamily: 'LexendDeca-SemiBold',
        color: '#FF6565',
    },
    storeTitle: {
        fontSize: 15,
        color: 'black',
        fontFamily: 'LexendDeca-SemiBold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
        width: '100%',
        height: 80,

    },
    infoRow: {
        flexDirection: 'row',
        marginTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    details: {
        fontSize: 10,
        color: '#A6A6A6',
        marginLeft: 5,
        flex: 1,
    },
    characterCount: {
        fontSize: 10,
        color: '#A6A6A6',
        textAlign: 'right',
        fontFamily: 'Karla-Bold',
    },
    attachmentButton: {
        height: 90,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        marginBottom: 10,
    },
    attachButton: {
        backgroundColor: '#1ABDD4',
        marginTop: 10,
    },
    attachmentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        marginBottom: 16,
    },
    attachmentText: {
        color: '#1ABDD4',
        marginLeft: 8,
        fontSize: 14,
        fontFamily: 'LexendDeca-Regular',
    },
    imageWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    attachedImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
    },
    unattachButton: {
        position: 'absolute',
        top: -12,
        right: -12,
        backgroundColor: '#FF3B30',
        borderRadius: 20,
        padding: 4,
        elevation: 3,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#E5E5E5',
    },
    submitButton: {
        backgroundColor: '#1ABDD4',
    },
    buttonText: {
        color: 'white',
        fontFamily: 'LexendDeca-Medium',
        fontSize: 14,
    },
    routeItem: {
        fontFamily: 'Karla-SemiBold',
        paddingBottom: 3,
    },
    serviceType: {
        fontFamily: 'Karla-Medium',
        fontSize: 10,
        color: '#A6A6A6',
    },


});
export default UnprocessedTaskModal;
