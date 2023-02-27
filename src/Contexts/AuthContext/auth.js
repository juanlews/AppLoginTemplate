import React, {createContext, useState, useEffect} from 'react';
import Api from '../../Modules/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({signed: false, user:{}, signIn: ()=>{}});
export const AuthProvider = ({children})=>{
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function loadStorageData(){
      const authData = await AsyncStorage.getItem('@MYAPPNAME:auth');
      await new Promise(resolve => setTimeout(resolve, 2000));
      if(authData){
        setUser(JSON.parse(authData))
      }
      setLoading(false);
    };
    loadStorageData();
  },[]);
  const saveUser = async (response) => {
    const {valid, user} = response.data;
    const username = user.username;
    const displayName = user.displayName;
    if (valid === false) {
      Alert.alert('Acesso negado', 'Confira usuário e senha', alertConfig);
      return;
    }

    const authUser = response.data.user;
    setUser(response.data.user);
    await AsyncStorage.setItem(
      '@MYAPPNAME:auth',
      JSON.stringify({
        displayName,
        username,
        ...(authUser.authToken ? {authToken: authUser.authToken} : {}),
      }),
    );
  };

  const signIn = async(userData, password)=>{
    const response = await Api.login(userData.email, password);
    await saveUser(response);
  }
  const signOut = ()=>{
    AsyncStorage.clear().then(()=>{
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider value={{signed: !!user, user, signIn: signIn, signOut: signOut, loading: loading}}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthContext
