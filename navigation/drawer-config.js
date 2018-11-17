import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Platform } from 'react-native';

import stackConfig from './shared-stack-config';

const drawerStackConfing = { 
  navigationOptions: ( props ) => {
    
    return {
      ...stackConfig.navigationOptions,
      headerLeft: ({ tintColor }) => (
        <TouchableOpacity onPress={props.navigation.toggleDrawer}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-md-menu' : 'md-menu'}
            size={26}
            style={{ color: tintColor, paddingLeft: 14, }}
          />
        </TouchableOpacity>
      )
    }

  }
};

export default drawerStackConfing;