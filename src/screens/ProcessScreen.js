import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Animated,
    Alert,
} from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
    selectCurrentDelivery,
    selectExpandedSections,
    selectCompletedSteps,
    // selectActionStatus,
    toggleSection,
    completeActionStep,
    updateActionStatus,
    resetProcessState,
    setIsDeliveryStarting,
} from '../store/deliverySlice';
import {
    selectSliderState,
    setSteps,
    setCurrentRouteIndex,
    setCurrentStep,
    resetSlider,
    setIsRouteActive,
    setIsSwipeButtonVisible,
    setHasSwipedOnce,
    updateRailColor,
} from '../store/sliderSlice';
import { showMessage } from 'react-native-flash-message';
import RouteItem from './components/RouteItem';
import SwipeButtonSection from './components/SwipeButtonSection';
import { getActionSteps } from '../utils/deliveryUtils';
import SectionSeparator from './components/SectionSeparator';
import DeliveryInfo from './components/DeliveryInfo';

const ProcessScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const deliveryItem = useSelector(selectCurrentDelivery);
    const expandedSections = useSelector(selectExpandedSections);
    const completedSteps = useSelector(selectCompletedSteps);
    // const actionStatus = useSelector(selectActionStatus);
    const isDeliveryStarting = useSelector((state) => state.deliveries.isDeliveryStarting);
    const { currentStep, currentRouteIndex, steps, railColor, isRouteActive, isSwipeButtonVisible, hasSwipedOnce } = useSelector(selectSliderState);

    useEffect(() => {
        if (!deliveryItem && !isDeliveryStarting) {
            navigation.goBack();
        }
    }, [deliveryItem, isDeliveryStarting, navigation]);

    useEffect(() => {
        return () => {
            dispatch(resetProcessState());
            dispatch(resetSlider());
        };
    }, [dispatch]);

    const animatedHeights = useRef(
        deliveryItem?.nextRoute?.map(() => new Animated.Value(0)) || []
    ).current;

    const handleToggleSection = (index) => {
        if (isRouteActive && hasSwipedOnce) {
            Alert.alert(
                'Route In Progress',
                'Please complete the current route before starting a new one.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
            return;
        }

        if (!expandedSections[index]) {
            dispatch(setIsDeliveryStarting(true));
        }

        if (expandedSections[index]) {
            dispatch(setIsSwipeButtonVisible(false));
        } else {
            dispatch(setIsSwipeButtonVisible(true));
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
        } else if (serviceType === 'Drop off') {
            color = '#FEB267';
        } else {
            color = '#D3D3D3';
        }
        dispatch(updateRailColor(color));

        dispatch(setIsRouteActive(true));
        dispatch(setHasSwipedOnce(false));

        Animated.timing(animatedHeights[index], {
            toValue: expandedSections[index] ? 0 : 1,
            duration: 450,
            useNativeDriver: false,
        }).start();

        dispatch(setIsSwipeButtonVisible(true));
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

    const onSwipeComplete = () => {
        if (currentRouteIndex !== null) {
            const currentStepIndex = steps.findIndex(step => step === currentStep);

            if (currentStepIndex === -1) {
                console.error('ERROR: currentStep not found in steps array!');
                return true;
            }

            const nextStepIndex = currentStepIndex + 1;

            console.log('onSwipeComplete called');
            console.log({ currentStepIndex, nextStepIndex, steps, currentRouteIndex });
            console.log('Current step:', currentStep);

            if (nextStepIndex < steps.length) {
                console.log('Not the last step');

                dispatch(
                    completeActionStep({
                        routeIndex: currentRouteIndex,
                        stepIndex: currentStepIndex,
                    })
                );
                console.log(`Dispatched completeActionStep for routeIndex: ${currentRouteIndex}, stepIndex: ${currentStepIndex}`);

                dispatch(setCurrentStep(steps[nextStepIndex]));
                console.log('Set next step to:', steps[nextStepIndex]);

                // Show flash message
                showMessage({
                    message: 'Step Completed!',
                    description: `You have completed ${steps[currentStepIndex]}`,
                    type: 'success',
                    duration: 3000,
                    floating: true,
                });

                dispatch(setHasSwipedOnce(true));

            } else {
                console.log('All tasks completed');
                showMessage({
                    message: 'All tasks completed!',
                    description: 'You have completed this task',
                    type: 'success',
                    duration: 3000,
                    floating: true,
                });

                dispatch(
                    completeActionStep({
                        routeIndex: currentRouteIndex,
                        stepIndex: currentStepIndex,
                    })
                );
                console.log(`Dispatched completeActionStep for LAST STEP - routeIndex: ${currentRouteIndex}, stepIndex: ${currentStepIndex}`);

                dispatch(
                    updateActionStatus({
                        routeIndex: currentRouteIndex,
                        status: 'completed',
                    })
                );
                console.log('Dispatched updateActionStatus');
                dispatch(setIsSwipeButtonVisible(false));
                console.log('Dispatched setIsSwipeButtonVisible(false)');
                dispatch(setIsRouteActive(false));
                console.log('Dispatched setIsRouteActive(false)');
                dispatch(setHasSwipedOnce(false));
                console.log('Dispatched setHasSwipedOnce(false)');
                dispatch(setIsDeliveryStarting(false));
            }
        }
        return true;
    };

    const isStepCompleted = (routeIndex, stepIndex) => {
        return completedSteps[routeIndex]?.[stepIndex] === true;
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

                    <DeliveryInfo deliveryItem={deliveryItem} />

                    <SectionSeparator title="Routes" />

                    {deliveryItem.nextRoute?.map((route, index) => (
                        <RouteItem
                            key={index}
                            route={route}
                            index={index}
                            expandedSections={expandedSections}
                            animatedHeights={animatedHeights}
                            handleToggleSection={handleToggleSection}
                            handleCompleteStep={handleCompleteStep}
                            isStepCompleted={isStepCompleted}
                            isRouteActive={isRouteActive}
                            hasSwipedOnce={hasSwipedOnce}
                            completedSteps={completedSteps}
                        />
                    ))}

                    <SectionSeparator title="End of Trip" />
                </View>
            </ScrollView>

            {isSwipeButtonVisible && currentRouteIndex !== null && steps.length > 0 && (
                <SwipeButtonSection
                    currentStep={currentStep}
                    railColor={railColor}
                    onSwipeComplete={onSwipeComplete}
                />
            )}
        </View>
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
});

export default ProcessScreen;
