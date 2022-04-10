// import React, {useEffect} from 'react';
import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Keyboard,
  BackHandler
} from 'react-native';
import HudView from '../../components/hudView';
import MessageBox from '../../components/messageBox';
import {moderateScale} from 'react-native-size-matters';
import LabelHeader from '../../components/labelHeader';
import MapHeader from '../../components/mapHeader';
import AppStyles from '../../config/styles';
import styles from './styles';
import {Search, Checked, Unchecked} from '../../config/svg';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {LongButton} from '../../components/button';
const KEYS_TO_FILTERS = ['plate', 'chassis', 'owner', 'imeino'];
const KEYS_TO_DRIVERS = ['employeeid', 'name', 'team', 'mobile'];

let list = [];
var selectedArray = [];
let type = '';
let disable = true;

class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      filteredData: [],
      showVehicle: true,
      showDriver: false,
      showLocation: false,
      selectedIndex: 1000000,
      type: '',
      keyFilters: [],
      showList:false,
      disable:true,
      listClickedData:[]
    };
  }
  componentDidMount = () => {
    this.props.disableLoader();
    list = [];
    this.props.VehicleList.list.map(item => {
      item.selected = false;
      list.push(item);
    });
    this.props.DriversList.list.map(item => {
      item.selected = false;
      list.push(item);
    });
    {
      type == 'vh'
        ? this.setState({
            type: 'vh',
            showVehicle: true,
            showLocation: false,
            showDriver: false,
            searchTerm: '',
            filteredData: this.props.VehicleList.list,
            keyFilters: KEYS_TO_FILTERS,
          })
        : type == 'lc'
        ? this.setState({
            type: 'vh',
            showVehicle: false,
            showLocation: true,
            showDriver: false,
            searchTerm: '',
            filteredData: [],
            keyFilters: KEYS_TO_DRIVERS,
          })
        : this.setState({
            type: 'dr',
            showVehicle: false,
            showLocation: false,
            showDriver: true,
            searchTerm: '',
            filteredData: this.props.DriversList.list,
            keyFilters: KEYS_TO_DRIVERS,
          });
    }
    BackHandler.addEventListener('hardwareBackPress', () =>
    this._backHandlerPress(),
  );

}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', () =>
    this._backHandlerPress(),
  );
}

_backHandlerPress() {
  this.props.navigation.goBack();
  return true;
}
  _goback = () => {
    this.props.navigation.goBack();
  };
  searchUpdated(term) {
    this.setState({searchTerm: term});
  }
  _selectList = (item,index) => {

    if(this.state.type=='vh'){
    item.selected = !item.selected;
    this.setState({disable:true});
    list.map(items => {
      if (items.selected) {
        this.setState({disable:false})
      }
      // else{
      //   disable=true;
      // }
    });}
    else{
      
      this.setState({
        showList: true,        
        selectedIndex: index,
        disable:false,
        listClickedData: item,        
      });
      
      
    }
    
    
    this.setState({});
  };
  _VehicleListRender = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.renderContainer}
        activeOpacity={0.8}
        onPress={() => {
          this._selectList(item,index);
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {this.state.type == 'vh'?item.selected ? <Checked size={20} /> : <Unchecked size={20} />
        :this.state.selectedIndex==index?  <Checked size={20} /> : <Unchecked size={20} />
        }
        </View>
        <View style={{flex: 4}}>
          {this.state.type == 'vh' ? (
            <>
              <Text style={styles.boldText}>Plate Number : {item.plate}</Text>
              <Text style={styles.regularText}>
                Chassis No : {item.chassis}
              </Text>
              <Text style={styles.regularText}>GPSID : {item.imeino}</Text>
            </>
          ) : this.state.type == 'dr' ? (
            <>
              <Text style={styles.boldText}>Driver Name : {item.name}</Text>
              <Text style={styles.regularText}>
                Driver Number : {item.mobile}
              </Text>
              <Text style={styles.regularText}>EmpID : {item.employeeid}</Text>
            </>
          ) : (
            <></>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  drawer = () => {
    this.props.navigation.openDrawer();
  };
  _submit = () => {
   
    let state = this.state;
    Keyboard.dismiss();
    this.props.EnableLoader();
    selectedArray = [];
    list.map((item, index) => {
      if (item.selected) {
        this.state.showVehicle
          ? selectedArray.push({imeino: item.imeino, selected: true})
          : this.state.showDriver
          ? selectedArray.push({imeino: item.id, selected: true})
          : selectedArray.push({imeino: item.imeino, selected: true});
      }
    });
    let names = '';
    names = selectedArray.map(function(item){
      if (item.selected){
        return item['imeino'];
      }
    });
    //this.props.getVehicleList(this.props.Login.resp.accessToken);
    const data =
    this.state.type=='vh'?
    {
       token: this.props.Login.resp.accessToken,
      imeino: names.toString(),
      type: this.state.type,
    }
    :{
      token: this.props.Login.resp.accessToken,
      rfid: this.state.listClickedData.rfid,
     
      type: this.state.type,
    };
  this.state.type=='vh'?
    this.props._getvehicleDetails(data, () =>
      this.props.navigation.navigate('Home',{searchScreen:'TEST'},{type:this.state.type}),this.props.Login.region
    )
    :
    this.props._getdriverDetails(data, () =>
      this.props.navigation.navigate('Home',{searchScreen:'TEST'},{type:this.state.type}),this.props.Login.region
    )
  };
  render() {
    let filteredData = this.state.filteredData;
    type = this.props.route.params.type;

    if (this.state.searchTerm.length > 0) {
      filteredData = list.filter(
        createFilter(this.state.searchTerm, this.state.keyFilters),
      );
    }
    
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={AppStyles.colors.COLOR_PRIMARY}
          barStyle="light-content"
        />
        <LabelHeader
          Label={'GTRACKIT'}
          onPress={() => {
            this._goback();
          }}
        />
        <MapHeader
          showDrawer={'no'}
          showVehicle={this.state.showVehicle}
          showLocation={this.state.showLocation}
          showDriver={this.state.showDriver}
          closePopUp={() => {
            this.closePopUp();
          }}
          vehicleOnPress={() => {
            list = [];
            this.props.VehicleList.list.map(item => {
              item.selected = false;
              list.push(item);
            });
            this.props.DriversList.list.map(item => {
              item.selected = false;
              // list.push(item);
            });
            this.setState({
              showVehicle: true,
              showLocation: false,
              showDriver: false,
              type: 'vh',
              searchTerm: '',
              filteredData: this.props.VehicleList.list,
              keyFilters: KEYS_TO_FILTERS,
              selectedIndex:1000000,
              disable:true
            });
          }}
          locationOnPress={() => {
            list = [];
            this.props.VehicleList.list.map(item => {
              item.selected = false;
              list.push(item);
            });
            this.props.DriversList.list.map(item => {
              item.selected = false;
              list.push(item);
            });
            this.setState({
              showVehicle: false,
              showLocation: true,
              showDriver: false,
              type: 'lc',
              searchTerm: '',
              filteredData: [],
              keyFilters: KEYS_TO_DRIVERS,
            });
          }}
          driverOnPress={() => {
            list = [];
            this.props.VehicleList.list.map(item => {
              item.selected = false;
              //  list.push(item);
            });
            this.props.DriversList.list.map(item => {
              item.selected = false;
              list.push(item);
            });
            this.setState({
              showVehicle: false,
              showLocation: false,
              showDriver: true,
              type: 'dr',
              searchTerm: '',
              filteredData: this.props.DriversList.list,
              keyFilters: KEYS_TO_DRIVERS,
            });
          }}
        />
        {this.props.MessageBox.isMessagebox && (
          <MessageBox
            message={'No data found'}
            Label={'OK'}
            onPress={() => {
              this.props._disableMessageBox();
            }}
          />
        )}
          {this.props.MessageBox.isInternalMessageBox && (
          <MessageBox
            message={'Internal Error'}
            Label={'OK'}
            onPress={() => {
              this.props._disableInternalMessageBox();
            }}
          />
        )}
        {this.props.Loading.isLoading && <HudView    onPress={() => {
                this.props.disableLoader();
              }}/>}
        <View
          style={{
            height: moderateScale(45),
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(10),
          }}>
          <SearchInput
            onChangeText={term => {
              this.searchUpdated(term);
            }}
            style={{
              height: '65%',
              width: '100%',
              padding: moderateScale(0),
              paddingLeft: moderateScale(10),
              borderRadius: moderateScale(3),
              borderBottomColor: AppStyles.colors.COLOR_WHITE,
              borderBottomWidth: moderateScale(0.75),
              fontSize: moderateScale(12),
              color: AppStyles.colors.COLOR_WHITE,
              fontFamily: 'Roboto-Regular',
            }}
            selectionColor={AppStyles.colors.COLOR_WHITE}
            placeholder={
              this.state.type == 'vh' || this.state.showVehicle
                ? 'Search with plate number or gps id or  chassis number'
                : type == 'lc' || this.state.showLocation
                ? 'Search '
                : 'Search with driver name, Emp ID or RFID'
            }
            placeholderTextColor={AppStyles.colors.COLOR_WHITE}
            multiline={false}
          />

          <Search
            size={moderateScale(20)}
            color={AppStyles.colors.COLOR_WHITE}
          />
        </View>

        <View style={styles.contentContainer}>
          {filteredData.length != 0 ? (
            <FlatList
              data={filteredData}
              renderItem={(item, index) => this._VehicleListRender(item, index)}
              extraData={this.state}
              keyboardShouldPersistTaps={'always'}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text
              style={{
                fontSize: moderateScale(16),
                color: 'grey',
                textAlign: 'center',
                marginHorizontal: moderateScale(7),
              }}>
              {this.state.type == 'vh' || this.state.showVehicle
                ? 'No Vehicle Listed'
                : type == 'lc' || this.state.showLocation
                ? 'Coming soon'
                : 'No Drivers Listed'}
            </Text>
          )}
        </View>
        <View
          style={{
            paddingHorizontal: moderateScale(20),
            paddingBottom: moderateScale(10),
            backgroundColor: 'white',
          }}>
          <LongButton
            disabled={this.state.disable}
            color={AppStyles.colors.COLOR_BLACK}
            height={moderateScale(45)}
            Label={'Submit'}
            onPress={() => {
              this._submit();
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default SearchView;
