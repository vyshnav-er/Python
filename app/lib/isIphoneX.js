
import { Dimensions, Platform } from 'react-native';

export default function isIphoneX () {
    let dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 812 || dimen.width === 812||dimen.height === 896 || dimen.width === 896)
    );
}

export function ifIphoneX (iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    } else {
        return regularStyle;
    }
}
