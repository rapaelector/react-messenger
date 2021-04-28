/**
 * Manage connections to/from Browser's Local Storage
 *
 * This file have relation with src/store/configureStore.js
 * Because we have to tell the store the way that we handle state
 */

/**
 * Load state to Browser's local storage
 * @returns {*}
 */
 export const loadState = () => {

    try {
        //Try to get the state from local storage
        const state = localStorage.getItem('state');
        //parse state from string to object
        const serializeState = JSON.parse(state);
        let preLoadedState = {auth: {}, form: {}};

        //Test if there is saved state for auth reducer
        if (serializeState && serializeState.auth) {
            preLoadedState.auth = serializeState.auth;
        }

        return preLoadedState;
    } catch (err) {
        return undefined;
    }

};

/**
 * Save state to Browser's local storage
 * @param state
 */
export const saveState = (state) => {
    try {
        //Serialize the current state
        const serializeState = JSON.stringify(state);
        //Try to save in local storage
        localStorage.setItem('state', serializeState);
    } catch (err) {
    }
};