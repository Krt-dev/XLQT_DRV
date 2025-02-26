import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ActionStepsList = ({ steps, routeIndex, handleCompleteStep, isStepCompleted, completedSteps }) => {
    return (
        <>
            {steps.map((step, stepIndex) => (
                <TouchableOpacity
                    key={stepIndex}
                    style={styles.actionRow}
                    onPress={() => handleCompleteStep(routeIndex, stepIndex)}
                    disabled={stepIndex > 0 && !completedSteps[routeIndex]?.[stepIndex - 1]}
                >
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons
                            name={isStepCompleted(routeIndex, stepIndex)
                                ? 'checkbox-marked-circle'
                                : 'checkbox-blank-circle'}
                            size={16}
                            color={isStepCompleted(routeIndex, stepIndex)
                                ? '#67FE87'
                                : '#FEB267'}
                        />
                    </View>
                    <Text style={styles.actionText}>{step}</Text>
                </TouchableOpacity>
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    iconContainer: {
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionText: {
        marginLeft: 8,
        fontSize: 16,
        fontFamily: 'Karla-Regular',
        color: '#333',
    },
});

export default ActionStepsList;
