/**
 * Returns the action steps based on service type
 * @param {string} serviceType - The type of service ('Pick up' or 'Drop off')
 * @returns {string[]} Array of action steps
 */
export const getActionSteps = (serviceType) => {
    return serviceType === 'Pick up'
        ? ['ARRIVED at location', 'LOAD the cargo', 'LOADING complete', 'DEPART']
        : ['ARRIVED at location', 'UNLOAD the cargo', 'UNLOADING complete', 'DEPART'];
};
