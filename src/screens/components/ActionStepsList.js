import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
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
                    <MaterialCommunityIcons
                        name={isStepCompleted(routeIndex, stepIndex)
                            ? 'checkbox-marked-circle'
                            : 'checkbox-blank-circle'}
                        size={12}
                        color={isStepCompleted(routeIndex, stepIndex)
                            ? '#67FE87'
                            : '#FEB267'}
                    />
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
        paddingVertical: 8,
    },
    actionText: {
        marginLeft: 8,
        fontSize: 14,
        fontFamily: 'Karla-Regular',
        color: '#333',
    },
});

export default ActionStepsList;
