const AppStyles = {
  colors: {
    COLOR_PRIMARY: '#0082d5',
    COLOR_SECONDARY: '#ccebff',
    COLOR_SHADOW_RED: '#EF7371',
    COLOR_RED: '#ff0000',
    COLOR_BLUE: '#0000ff',
    COLOR_WHITE: '#ffffff',
    COLOR_BLACK: '#000000',
    COLOR_GREY: 'grey',
    COLOR_GREEN: 'green',
    COLOR_DARK_GREY:'#4d4d4d',
    COLOR_DARK_GREEN:'#004d00',
    COLOR_DARK_RED:'#990000',
    COLOR_TEXT_BLUE:'#0000ff'
  },
  fonts: {
    bold: Platform.OS === 'ios' ? 'AvenirNext-Bold' : 'Avenir Next Bold',
    demiBold:
      Platform.OS === 'ios' ? 'AvenirNext-DemiBold' : 'Avenir Next Demi Bold',
    medium: Platform.OS === 'ios' ? 'AvenirNext-Medium' : 'Avenir Next Medium',
    regular:
      Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Avenir Next Regular',
  },
};
export default AppStyles;
