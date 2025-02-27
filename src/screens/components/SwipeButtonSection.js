import React from 'react';
import { View, StyleSheet } from 'react-native';
import SwipeButton from 'rn-swipe-button';

const SwipeButtonSection = ({ currentStep, railColor, onSwipeComplete }) => {
    return (
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
    );
};

const styles = StyleSheet.create({
    swipeButtonContainer: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
    },
});

export default SwipeButtonSection;
