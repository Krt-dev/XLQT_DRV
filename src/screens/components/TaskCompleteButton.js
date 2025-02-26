import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectCurrentDelivery,
    markDeliveryAsComplete,
    selectCompletedSteps,
    setUnprocessedTask,
} from '../../store/deliverySlice';
import { getActionSteps } from '../../utils/deliveryUtils';
import UnprocessedTaskModal from './UnprocessedTaskModal';

const TaskCompleteButton = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [incompleteRoutes, setIncompleteRoutes] = useState([]);
    const deliveryItem = useSelector(selectCurrentDelivery);
    const completedStepsState = useSelector(selectCompletedSteps);
    const dispatch = useDispatch();

    const areAllRoutesCompleted = () => {
        if (!deliveryItem || !deliveryItem.nextRoute || deliveryItem.nextRoute.length === 0) {
            console.log('No routes to complete or invalid delivery item');
            return false;
        }

        const incomplete = [];

        for (let routeIndex = 0; routeIndex < deliveryItem.nextRoute.length; routeIndex++) {
            const route = deliveryItem.nextRoute[routeIndex];
            if (!route) { continue; }

            const routeSteps = getActionSteps(route.serviceType);
            let isRouteComplete = true;

            for (let stepIndex = 0; stepIndex < routeSteps.length; stepIndex++) {
                const isStepComplete =
                    completedStepsState[routeIndex] &&
                    completedStepsState[routeIndex][stepIndex] === true;

                if (!isStepComplete) {
                    isRouteComplete = false;
                    break;
                }
            }

            if (!isRouteComplete) {
                incomplete.push({
                    index: routeIndex,
                    name: route.name || `Route ${routeIndex + 1}`,
                    serviceType: route.serviceType || 'Unknown',
                });
            }
        }

        setIncompleteRoutes(incomplete);
        return incomplete.length === 0;
    };

    const handleTaskComplete = () => {
        if (!deliveryItem || deliveryItem.status === 'Completed') {
            console.log('Delivery already completed or invalid');
            return;
        }

        const allComplete = areAllRoutesCompleted();
        console.log('Are all routes completed?', allComplete);

        if (allComplete) {
            Alert.alert(
                'Complete Delivery',
                'Are you sure you want to mark this delivery as complete?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Complete',
                        onPress: () => {
                            try {
                                if (deliveryItem && deliveryItem.id) {
                                    dispatch(markDeliveryAsComplete(deliveryItem.id));
                                    console.log('Delivery completed with ID:', deliveryItem.id);
                                    Alert.alert('Success', 'Delivery marked as complete!');
                                }
                            } catch (error) {
                                console.error('Error marking delivery complete:', error);
                                Alert.alert('Error', 'Could not complete the delivery. Please try again.');
                            }
                        },
                    },
                ]
            );
        } else {
            dispatch(setUnprocessedTask({ deliveryId: deliveryItem.id }));
            setModalVisible(true);
        }
    };

    const isButtonDisabled = !deliveryItem || deliveryItem.status === 'Completed';

    return (
        <>
            <TouchableOpacity
                style={[
                    styles.button,
                    isButtonDisabled && styles.disabledButton,
                ]}
                onPress={handleTaskComplete}
                disabled={isButtonDisabled}
            >
                <Text style={styles.buttonText}>
                    {deliveryItem?.status === 'Completed' ? 'Task Completed' : 'Mark Complete'}
                </Text>
            </TouchableOpacity>

            <UnprocessedTaskModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />

        </>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#00C27B',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#CCCCCC',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Karla-Bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
    },
    routeItem: {
        fontSize: 15,
        marginVertical: 3,
        textAlign: 'left',
        alignSelf: 'stretch',
        paddingLeft: 10,
    },
    modalButton: {
        backgroundColor: '#00C27B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 15,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Karla-Bold',
    },
});

export default TaskCompleteButton;
