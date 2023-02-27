import React, {useContext} from 'react';
import AuthContext from '../../Contexts/AuthContext/auth';
import {View, Button, Text, StyleSheet} from 'react-native';

export default () => {
  const {signOut, user} = useContext(AuthContext);
    return (
      <View style={{...styles.container}} >
        <Text>{user.displayName}</Text>
        <Button title={'signOut'} onPress={signOut}/>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444444',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
