/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { toggleSection } from '../../store/deliverySlice';
import ActionStepsList from './ActionStepsList';
import { getActionSteps } from '../../utils/deliveryUtils';

const RouteItem = ({
    route,
    index,
    expandedSections,
    animatedHeights,
    handleToggleSection,
    handleCompleteStep,
    isStepCompleted,
    isRouteActive,
    hasSwipedOnce,
    completedSteps,
}) => {
    const isRouteCompleted = () => {
        const routeSteps = getActionSteps(route.serviceType);
        if (!completedSteps[index] || !routeSteps.length) { return false; }

        return routeSteps.every((_, stepIndex) => completedSteps[index][stepIndex] === true);
    };

    const isSectionExpanded = expandedSections[index];

    const numberCircleBackgroundColor = isRouteCompleted() ?
        '#00C27B' :
        isSectionExpanded ?
            '#2980b9' :
            '#72D6E4';
    return (
        <View key={index} style={styles.routeContainer}>
            <TouchableOpacity
                onPress={() => handleToggleSection(index)}
                style={styles.routeCard}
                disabled={isRouteActive && hasSwipedOnce}
            >
                <View style={styles.routeHeader}>
                    <View style={[
                        styles.numberCircle,
                        { backgroundColor: numberCircleBackgroundColor },
                    ]}>
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
                <ActionStepsList
                    steps={getActionSteps(route.serviceType)}
                    routeIndex={index}
                    handleCompleteStep={handleCompleteStep}
                    isStepCompleted={isStepCompleted}
                    completedSteps={completedSteps}
                />
            </Animated.View>
            <View style={styles.line} />
        </View>
    );
};

const styles = StyleSheet.create({
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
    closeButton: {
        padding: 4,
    },
    chevron: {
        marginLeft: 4,
    },
    line: {
        borderBottomColor: '#A6A6A6',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '100%',
    },
});

export default RouteItem;
