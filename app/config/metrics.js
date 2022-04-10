
import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');
const { width1, height2 } = Dimensions.get('screen');

const metrics = {
    SCREEN_WIDTH: width < height ? width : height,
    SCREEN_HEIGHT: width < height ? height : width,
    NAV_BAR_HEIGHT: Platform.OS === 'ios' ? 54 : 66
};

export default metrics;
