import React, {useContext} from 'react';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import AuthContext from '../Contexts/AuthContext/auth'
import {View, ActivityIndicator} from 'react-native';

export default () => {
  const {signed, loading} = useContext(AuthContext);
  if (loading){
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size='large' color='FFFFFF'/>
      </View>
    );
  }
  return signed ?  <AppRoutes /> : <AuthRoutes />

};
