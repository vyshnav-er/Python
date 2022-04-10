import { NavigationActions } from '@react-navigation/compat';
//import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator (navigatorRef) {
    _navigator = navigatorRef;
}

function navigate (routeName, params) {
    
        NavigationActions.navigate({
            routeName,
            params
        })
    
}

function goBack (key) {
    _navigator.dispatch(
        NavigationActions.back({
            key: key
        })
    );
}

export default {
    navigate,
    goBack,
    setTopLevelNavigator
};
