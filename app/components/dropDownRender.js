_renderList = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          borderBottomWidth: 0.75,
          width: '100%',
          alignSelf: 'center',
          borderColor: 'grey',
          height: moderateScale(50),
          paddingLeft: moderateScale(10),
          //paddingVertical:moderateScale(1),
          justifyContent: 'center',
          backgroundColor: '#b7c2b4',
        }}
        onPress={() =>
          this.state.ShowState
            ? this._onSelectState(item, index)
            : this._onSelectDistrict(item, index)
        }>
        <Text style={{color: 'black', fontSize: moderateScale(12)}}>
          {this.state.ShowState ? item.State : item}
        </Text>
      </TouchableOpacity>
    );
  };