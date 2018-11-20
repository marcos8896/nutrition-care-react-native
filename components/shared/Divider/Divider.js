import React from 'react';

import { View } from 'react-native';

/*
  The divider has to be within a flex container
  in order to apply the 'alignSelf' property.
*/
const Divider = ({ 
  borderColor = '#DCDCDC', 
  borderWidth = 1, 
  borderRadius = 2.5,
  alignSelf
}) => {
  
  if ( !alignSelf )
    alignSelf = 'stretch'

  return <View style={{
    borderColor: borderColor,
    borderWidth: borderWidth,
    borderRadius: borderRadius,
    alignSelf: alignSelf,
    marginTop: 3,
    marginBottom: 3,
  }}></View>
};

export default Divider;