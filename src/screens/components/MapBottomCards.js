//FAILED: TO be deleted


import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    PanResponder,
    Dimensions,
} from 'react-native';


const places = [
    {
        id: 1,
        name: 'Central Park Café',
        rating: 4.5,
        address: '123 Park Avenue, New York',
        description: 'A cozy café located in the heart of Central Park. Known for its artisanal coffee and freshly baked pastries.',
        hours: '7:00 AM - 8:00 PM',
        phone: '+1 (555) 123-4567',
    },
    {
        id: 2,
        name: 'The Urban Gallery',
        rating: 4.8,
        address: '456 Art Street, New York',
        description: 'Contemporary art gallery featuring works from emerging local artists. Regular exhibitions and events.',
        hours: '10:00 AM - 6:00 PM',
        phone: '+1 (555) 987-6543',
    },
    {
        id: 3,
        name: 'Riverside Restaurant',
        rating: 4.3,
        address: '789 River Road, New York',
        description: 'Fine dining with a spectacular view of the river. Specializes in seafood and local cuisine.',
        hours: '11:30 AM - 10:00 PM',
        phone: '+1 (555) 246-8135',
    },
];

const CARD_HEIGHT = 150;
const EXPANDED_HEIGHT = 400;
const SCREEN_WIDTH = Dimensions.get('window').width;

const MapBottomCards = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const translateX = useRef(new Animated.Value(0)).current;
    const heightAnim = useRef(new Animated.Value(CARD_HEIGHT)).current;
    const lastGesture = useRef('none');

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, { dx, dy }) => {
                const isHorizontal = Math.abs(dx) > Math.abs(dy);
                lastGesture.current = isHorizontal ? 'horizontal' : 'vertical';
                return true;
            },
            onPanResponderGrant: () => {
                if (lastGesture.current === 'horizontal') {
                    translateX.setOffset(translateX.__getValue());
                    translateX.setValue(0);
                }
            },
            onPanResponderMove: (_, { dx, dy }) => {
                if (lastGesture.current === 'horizontal') {
                    // Handle horizontal swipe
                    if ((currentIndex === 0 && dx > 0) ||
                        (currentIndex === places.length - 1 && dx < 0)) {
                        translateX.setValue(dx * 0.2); // Reduced movement at edges
                    } else {
                        translateX.setValue(dx);
                    }
                } else {
                    // Handle vertical expansion
                    if (!isExpanded && dy < 0) {
                        Animated.timing(heightAnim, {
                            toValue: EXPANDED_HEIGHT,
                            duration: 0,
                            useNativeDriver: false,
                        }).start();
                    } else if (isExpanded && dy > 0) {
                        Animated.timing(heightAnim, {
                            toValue: CARD_HEIGHT,
                            duration: 0,
                            useNativeDriver: false,
                        }).start();
                    }
                }
            },
            onPanResponderRelease: (_, { dx, dy, vx }) => {
                if (lastGesture.current === 'horizontal') {
                    translateX.flattenOffset();
                    const velocity = Math.abs(vx);

                    if (Math.abs(dx) > SCREEN_WIDTH * 0.2 || velocity > 0.5) {
                        const shouldSwipeLeft = dx < 0;

                        if (shouldSwipeLeft && currentIndex < places.length - 1) {
                            Animated.spring(translateX, {
                                toValue: -SCREEN_WIDTH,
                                velocity: vx,
                                useNativeDriver: true,
                            }).start(() => {
                                setCurrentIndex(currentIndex + 1);
                                translateX.setValue(0);
                            });
                        } else if (!shouldSwipeLeft && currentIndex > 0) {
                            Animated.spring(translateX, {
                                toValue: SCREEN_WIDTH,
                                velocity: vx,
                                useNativeDriver: true,
                            }).start(() => {
                                setCurrentIndex(currentIndex - 1);
                                translateX.setValue(0);
                            });
                        } else {
                            Animated.spring(translateX, {
                                toValue: 0,
                                useNativeDriver: true,
                            }).start();
                        }
                    } else {
                        Animated.spring(translateX, {
                            toValue: 0,
                            useNativeDriver: true,
                        }).start();
                    }
                } else {
                    // Handle vertical gesture completion
                    const shouldExpand = !isExpanded && dy < -50;
                    const shouldCollapse = isExpanded && dy > 50;

                    if (shouldExpand || shouldCollapse) {
                        setIsExpanded(!isExpanded);
                    }

                    Animated.spring(heightAnim, {
                        toValue: shouldExpand ? EXPANDED_HEIGHT : CARD_HEIGHT,
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;

    const renderCard = (place) => {
        return (
            <View style={styles.cardContent}>
                <View style={styles.handle} />
                <Text style={styles.name}>{place.name}</Text>
                <Text style={styles.rating}>★ {place.rating}</Text>
                <Text style={styles.address}>{place.address}</Text>

                {isExpanded && (
                    <View style={styles.expandedContent}>
                        <Text style={styles.description}>{place.description}</Text>
                        <Text style={styles.hours}>Hours: {place.hours}</Text>
                        <Text style={styles.phone}>Phone: {place.phone}</Text>
                    </View>
                )}
            </View>
        );
    };

    const animatedStyle = {
        height: heightAnim,
        transform: [{ translateX }],
    };

    return (
        <Animated.View
            style={[styles.container, animatedStyle]}
            {...panResponder.panHandlers}
        >
            {renderCard(places[currentIndex])}
            <View style={styles.pagination}>
                {places.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            currentIndex === index && styles.paginationDotActive,
                        ]}
                    />
                ))}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: '#DDD',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 15,
    },
    cardContent: {
        flex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    rating: {
        fontSize: 16,
        color: '#FFA500',
        marginBottom: 8,
    },
    address: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    expandedContent: {
        marginTop: 20,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
    },
    hours: {
        fontSize: 16,
        marginBottom: 8,
    },
    phone: {
        fontSize: 16,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#C4C4C4',
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: '#000',
    },
});

export default MapBottomCards;
