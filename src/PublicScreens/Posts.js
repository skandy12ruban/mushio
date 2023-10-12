import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../Components/Header'

const Posts = () => {
  return (
    <SafeAreaView style={{alignSelf:'center',width:'100%'}}>
    <Header backIcon={true} name1={'Posts'}/>
{/* <Loader loading={loading}></Loader> */}
 
</SafeAreaView>
  )
}

export default Posts