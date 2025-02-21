/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Animated,
    Alert,
} from 'react-native';
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
import {
    selectSliderState,
    setSteps,
    setCurrentRouteIndex,
    setCurrentStep,
    resetSlider,
    setIsRouteActive,
} from '../store/sliderSlice';
import SwipeButton from 'rn-swipe-button';
import { updateRailColor } from '../store/sliderSlice';

const ProcessScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const deliveryItem = useSelector(selectCurrentDelivery);
    const expandedSections = useSelector(selectExpandedSections);
    const completedSteps = useSelector(selectCompletedSteps);
    const actionStatus = useSelector(selectActionStatus);
    const { currentStep, currentRouteIndex, steps, railColor, isRouteActive } = useSelector(selectSliderState);
    const [isSwipeButtonVisible, setIsSwipeButtonVisible] = useState(false);

    useEffect(() => {
        return () => {
            dispatch(resetProcessState());
            dispatch(resetSlider());
        };
    }, [dispatch]);

    const handleToggleSection = (index) => {
        if (isRouteActive) {
            // Show an alert if a route is already active
            Alert.alert(
                'Route In Progress',
                'Please complete the current route before starting a new one.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
            return; // Prevent expanding the new section
        }

        dispatch(toggleSection(index));
        dispatch(setCurrentRouteIndex(index));

        const serviceType = deliveryItem.nextRoute[index].serviceType;
        const newSteps = getActionSteps(serviceType);
        dispatch(setSteps(newSteps));
        dispatch(setCurrentStep(newSteps[0]));

        let color;
        if (serviceType === 'Pick up') {
            color = '#1ABDD4';
        } else if (serviceType === 'SDrop off') {
            color = '#FEB267';
        } else {
            color = '#D3D3D3';
        }
        dispatch(updateRailColor(color));

        // Set isRouteActive to true when a new route is started
        dispatch(setIsRouteActive(true));

        Animated.timing(animatedHeights[index], {
            toValue: expandedSections[index] ? 0 : 1,
            duration: 450,
            useNativeDriver: false,
        }).start();

        setIsSwipeButtonVisible(true);
    };

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

    const animatedHeights = useRef(
        deliveryItem?.nextRoute?.map(() => new Animated.Value(0)) || []
    ).current;

    const getActionSteps = (serviceType) => {
        return serviceType === 'Pick up'
            ? ['ARRIVED at location', 'LOAD the cargo', 'LOADING complete', 'DEPART']
            : ['ARRIVED at location', 'UNLOAD the cargo', 'UNLOADING complete', 'DEPART'];
    };

    const onSwipeComplete = () => {
        if (currentRouteIndex !== null) {
            const currentStepIndex = steps.findIndex(step => step === currentStep);
            const nextStepIndex = currentStepIndex + 1;

            if (nextStepIndex < steps.length) {
                dispatch(
                    completeActionStep({
                        routeIndex: currentRouteIndex,
                        stepIndex: currentStepIndex,
                    })
                );

                dispatch(setCurrentStep(steps[nextStepIndex]));

                if (nextStepIndex === steps.length) {
                    dispatch(
                        updateActionStatus({
                            routeIndex: currentRouteIndex,
                            status: 'completed',
                        })
                    );
                    setIsSwipeButtonVisible(false);
                    dispatch(setIsRouteActive(false)); // Set isRouteActive to false when all steps are completed
                }
            } else {
                console.log('All steps completed!');
                setIsSwipeButtonVisible(false);
                dispatch(
                    updateActionStatus({
                        routeIndex: currentRouteIndex,
                        status: 'completed',
                    })
                );
            }
        }
        return true;
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
        <View style={styles.mainContainer}>
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
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, justifyContent: 'flex-start' }}>
                            <MaterialCommunityIcons name="map-marker" size={18} color="#666" />
                            <Text style={{ marginLeft: 6, fontSize: 12, fontFamily: 'Karla-Regular', color: '#666' }}>
                                {deliveryItem.location}
                            </Text>
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
                                disabled={isRouteActive}
                            >
                                <View style={styles.routeHeader}>
                                    <View style={styles.numberCircle}>
                                        <Text style={styles.numberText}>{String(index + 1)}</Text>
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
                                    <View>
                                        <View>
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
                                    </View>
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
            {isSwipeButtonVisible && currentRouteIndex !== null && steps.length > 0 && (
                <View style={styles.swipeButtonContainer}>
                    <SwipeButton
                        disabled={false}
                        swipeSuccessThreshold={70}
                        height={55}
                        width={350}
                        title={String(currentStep)}
                        titleColor="white"
                        onSwipeSuccess={() => onSwipeComplete()}
                        shouldResetAfterSuccess="true"
                        resetAfterSuccessAnimDelay={300}
                        railBackgroundColor={railColor}
                        railFillBackgroundColor={railColor}
                        railFillBorderColor={railColor}
                        thumbIconBackgroundColor="#ffff"
                    />
                </View>
            )}
        </View >
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
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
    },
    timeLabel: {
        fontSize: 10,
        fontFamily: 'Karla-Regular',
        color: '#666',
        marginRight: 4,
    },
    timeText: {
        fontSize: 12,
        fontFamily: 'Karla-Medium',
        color: '#333',
    },
    routeDetails: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    actionText: {
        marginLeft: 8,
        fontSize: 14,
        fontFamily: 'Karla-Regular',
        color: '#333',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    spacer: {
        width: 20,
    },
    sliderContainer: {
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    currentStepText: {
        fontSize: 16,
        fontFamily: 'Karla-Bold',
        marginBottom: 8,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    stepIndicators: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
    },
    stepDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    swipeButtonContainer: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
    },
});

export default ProcessScreen;
