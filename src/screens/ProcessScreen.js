/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
    selectCurrentDelivery,
    selectExpandedSections,
    selectCompletedSteps,
    selectActionStatus,
    toggleSection,
    completeActionStep,
    updateActionStatus,
    resetProcessState,
} from '../store/deliverySlice';

const ProcessScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const deliveryItem = useSelector(selectCurrentDelivery);
    const expandedSections = useSelector(selectExpandedSections);
    const completedSteps = useSelector(selectCompletedSteps);
    const actionStatus = useSelector(selectActionStatus);

    useEffect(() => {
        return () => {
            dispatch(resetProcessState());
        };
    }, [dispatch]);

    const handleToggleSection = (index) => {
        dispatch(toggleSection(index));

        Animated.timing(animatedHeights[index], {
            toValue: expandedSections[index] ? 0 : 1,
            duration: 450,
            useNativeDriver: false,
        }).start();
    };

    const animatedHeights = useRef(
        deliveryItem?.nextRoute?.map(() => new Animated.Value(0)) || []
    ).current;

    const handleCompleteStep = (routeIndex, stepIndex) => {
        dispatch(completeActionStep({ routeIndex, stepIndex }));

        const routeSteps = getActionSteps(deliveryItem.nextRoute[routeIndex].serviceType);
        const allStepsCompleted = routeSteps.every((_, idx) =>
            completedSteps[routeIndex]?.[idx]
        );

        if (allStepsCompleted) {
            dispatch(updateActionStatus({
                routeIndex,
                status: 'completed',
            }));
        }
    };

    const getActionSteps = (serviceType) => {
        return serviceType === 'Pick up'
            ? ['ARRIVED at location', 'LOAD the cargo', 'LOADING complete']
            : ['ARRIVED at location', 'UNLOAD the cargo', 'UNLOADING complete'];
    };

    if (!deliveryItem) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>No delivery selected.</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>{deliveryItem.store}</Text>

                <View style={styles.infoBlock}>
                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="calendar" size={18} color="#666" />
                        <Text style={styles.infoText}>{deliveryItem.date}</Text>

                        <View style={styles.spacer} />

                        <MaterialCommunityIcons name="clock-outline" size={18} color="#666" />
                        <Text style={styles.infoText}>{deliveryItem.time}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <MaterialCommunityIcons name="map-marker" size={18} color="#666" />
                        <Text style={styles.infoText}>{deliveryItem.location}</Text>
                        <View style={styles.spacer} />
                    </View>
                </View>
                <View style={styles.routesSeparator}>
                    <View style={styles.separator} />
                    <Text style={styles.sectionTitle}>Routes</Text>
                    <View style={styles.separator} />
                </View>
                {deliveryItem.nextRoute?.map((route, index) => (
                    <View key={index} style={styles.routeContainer}>
                        <TouchableOpacity
                            onPress={() => handleToggleSection(index)}
                            style={styles.routeCard}
                        >
                            <View style={styles.routeHeader}>
                                <View style={styles.numberCircle}>
                                    <Text style={styles.numberText}>{index + 1}</Text>
                                </View>

                                <View style={styles.routeInfo}>
                                    <View style={styles.serviceTypeContainer}>
                                        <Text style={styles.serviceType}>{route.serviceType}</Text>
                                    </View>

                                    <Text style={styles.routePlace}>{route.place}</Text>

                                    <View style={styles.timeInfo}>
                                        <View style={styles.timeRow}>
                                            <MaterialCommunityIcons name="clock-outline" size={12} color="#666" />
                                            <Text style={styles.timeLabel}>Arrival:</Text>
                                            <Text style={styles.timeText}>{route.expectedTimeArrival}</Text>
                                        </View>

                                        <View style={styles.timeRow}>
                                            <MaterialCommunityIcons name="clock-outline" size={12} color="#666" />
                                            <Text style={styles.timeLabel}>Departure:</Text>
                                            <Text style={styles.timeText}>{route.expectedTimeDeparture}</Text>
                                        </View>
                                    </View>
                                </View>

                                {expandedSections[index] ? (
                                    <TouchableOpacity
                                        onPress={() => toggleSection(index)}
                                        style={styles.closeButton}
                                    >
                                        <MaterialCommunityIcons
                                            name="close-circle"
                                            size={24}
                                            color="#ff4444"
                                            style={styles.chevron}
                                        />
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                        </TouchableOpacity>
                        {/* {expandedSections[index] && ( */}
                        <Animated.View
                            style={[
                                styles.routeDetails,
                                {
                                    opacity: animatedHeights[index],
                                    maxHeight: animatedHeights[index].interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 600],
                                    }),
                                    overflow: 'hidden',
                                },
                            ]}
                        >
                            {getActionSteps(route.serviceType).map((step, stepIndex) => (
                                <TouchableOpacity
                                    key={stepIndex}
                                    style={styles.actionRow}
                                    onPress={() => handleCompleteStep(index, stepIndex)}
                                    disabled={stepIndex > 0 && !completedSteps[index]?.[stepIndex - 1]}
                                >
                                    <MaterialCommunityIcons
                                        name={completedSteps[index]?.[stepIndex]
                                            ? 'checkbox-marked-circle'
                                            : 'checkbox-blank-circle'}
                                        size={12}
                                        color={completedSteps[index]?.[stepIndex]
                                            ? '#67FE87'
                                            : '#FEB267'}
                                    />
                                    <Text style={styles.actionText}>{step}</Text>
                                </TouchableOpacity>
                            ))}
                        </Animated.View>
                    </View>
                ))}
                <View style={styles.routesSeparator}>
                    <View style={styles.separator} />
                    <Text style={styles.sectionTitle}>End of Trip</Text>
                    <View style={styles.separator} />
                </View>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontFamily: 'LexendDeca-SemiBold',
        color: '#333',
        marginBottom: 16,
    },
    infoBlock: {
        marginBottom: 24,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        justifyContent: 'space-between',
    },
    infoText: {
        marginLeft: 6,
        fontSize: 12,
        fontFamily: 'Karla-Regular',
        color: '#666',
    },
    routesSeparator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Karla-Medium',
        color: '#333',
        marginHorizontal: 12,
    },
    routeContainer: {
        marginBottom: 3,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderColor: '#eee',
    },
    routeCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
    },
    routeHeader: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'flex-start',
    },
    numberCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#72D6E4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    numberText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'LexendDeca-SemiBold',
    },
    routeInfo: {
        flex: 1,
    },
    serviceTypeContainer: {
        marginBottom: 8,
    },
    serviceType: {
        fontSize: 14,
        color: '#72D6E4',
        fontFamily: 'Karla-Bold',
        textTransform: 'uppercase',
    },
    routePlace: {
        fontSize: 18,
        fontFamily: 'Karla-SemiBold',
        color: '#333',
    },
    timeInfo: {
        backgroundColor: '#ffffff',
        padding: 7,
        borderRadius: 8,
        borderColor: '#eee',
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
    },
    timeLabel: {
        fontSize: 12,
        fontFamily: 'Karla-Bold',
        color: '#666',
        marginLeft: 8,
        marginRight: 3,
    },
    timeText: {
        fontSize: 12,
        fontFamily: 'Karla-Regular',
        color: '#333',
    },
    chevron: {
        marginLeft: 8,
        marginTop: 8,
    },
    routeDetails: {
        padding: 16,
        paddingTop: 0,
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        marginLeft: 60,
    },
    actionText: {
        marginLeft: 12,
        fontSize: 16,
        fontFamily: 'Karla-Regular',
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#ffffff',
    },
    errorText: {
        fontSize: 16,
        color: '#ff6b6b',
        marginBottom: 16,
        textAlign: 'center',
    },
    backButton: {
        backgroundColor: '#72D6E4',
        padding: 12,
        borderRadius: 8,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Karla-Medium',
    },
    spacer: {
        flex: 1,
    },

});
export default ProcessScreen;
