import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

{/* <NavigationContainer ref={navigationRef}>

<Drawer.Navigator
drawerType={'back'}
drawerContent={props => <DrawerContent {...props} />}>
  <Drawer.Screen name="Home" component={PageStack} 
  />

</Drawer.Navigator>
   

</NavigationContainer> 

 navigate('Ekaum', { pageId:9927,notifId: notification.page});

*/}