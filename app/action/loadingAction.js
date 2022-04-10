import * as types from './types';


export function enableLoader () {
    return {
        type: types.ENABLE_LOADER
    };
}

export function disableLoader (success) {
    return {
        type: types.DISABLE_LOADER,
        success
    };
}

export function disableMessagebox () {
    return {
        type: types.MESSAGEBOX_DISABLE
    };
}

export function enableMessagebox (success) {
    return {
        type: types.MESSAGEBOX_ENABLE,
        success
    };
}
export function disableInternalErrorMessagebox () {
    return {
        type: types.INTERNALERROR_MESSAGEBOX_DISABLE
    };
}

export function enableInternalErrorMessagebox (success) {
    return {
        type: types.INTERNALERROR_MESSAGEBOX_ENABLE,
        success
    };
}

export function resetSuccessLoading () {
    return {
        type: types.RESET_SUCCESS_LOADING
    };
}

export function isKeyboard (isKeyboard) {
    return {
        type: types.IS_KEYBOARD,
        isKeyboard
    };
}