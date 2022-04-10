<View style={styles.rowView}>
        <View style={{flex: 2}}>
          <Text style={styles.boldText}>{props.item.owner}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 2.5}}>
            <Text
              style={[
                styles.boldText,
                {fontSize: moderateScale(12), textAlign: 'right'},
              ]}>
              {props.item.plate}
            </Text>
            <Text style={[styles.regularText, {textAlign: 'right'}]}>
              {props.item.imeino}
            </Text>
          </View>
          <TouchableOpacity
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            onPress={props.info}>
            <Info size={20} color={AppStyles.colors.COLOR_BLACK} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rowView}>
        <View
          style={{
            flexDirection: 'row',
            flex: 2,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.regularText}>{props.item.status}</Text>
            <Text style={styles.regularText}>
              {/* SeatBelt : {props.item.status[2].seatbelt} */}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              marginLeft: moderateScale(10),
              alignItems: 'center',
            }}
            onPress={props.info}>
            <Info size={20} color={AppStyles.colors.COLOR_BLACK} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={[
                styles.boldText,
                {fontSize: moderateScale(10), textAlign: 'left'},
              ]}>
              Speed : {props.item.speed} km/hr
            </Text>
          </View>

          {props.item.alarm != '' && (
            <TouchableOpacity
              style={{
                marginLeft: moderateScale(10),
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.alarmWarningText}>{props.item.alarm}</Text>
              <Info size={20} color={'red'} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {!props.item.selected ? (
        <Text
          style={[
            styles.boldText,
            {fontSize: moderateScale(12), textAlign: 'left', marginBottom: 10},
          ]}
          onPress={props.selected}
          >
          Coord : {props.item.lat}, {props.item.lang}
        </Text>
      ) : (
        <Text
          style={[
            styles.boldText,
            {fontSize: moderateScale(12), textAlign: 'left', marginBottom: 10},
          ]}
          onPress={props.selected}
          >
          Address :{props.item.address}
        </Text>
      )}
      <View style={styles.rowView}>
        <HalfButton
          Label={'Trip History'}
          backgroundColor={AppStyles.colors.COLOR_BLACK}
          textColor={AppStyles.colors.COLOR_WHITE}
          onPress={props.onTripHistoryPress}
          height={moderateScale(30)}
        />
        <HalfButton
          Label={'Previous Alarms'}
          backgroundColor={AppStyles.colors.COLOR_BLACK}
          height={moderateScale(30)}
          textColor={AppStyles.colors.COLOR_WHITE}
          onPress={props.onAlarmList}
        />
      </View>
      <View style={[styles.rowView, {marginTop: moderateScale(10)}]}>
        <HalfButton
          Label={'Guide'}
          backgroundColor={AppStyles.colors.COLOR_BLACK}
          textColor={AppStyles.colors.COLOR_WHITE}
          onPress={() => {
            //this.setState({showMap: true});
          }}
          height={moderateScale(30)}
        />
        <HalfButton
          Label={'Share Location'}
          backgroundColor={AppStyles.colors.COLOR_BLACK}
          height={moderateScale(30)}
          textColor={AppStyles.colors.COLOR_WHITE}
          onPress={props.onShare}
        />
      </View>