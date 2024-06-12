import { View, Text, SafeAreaView, TouchableOpacity, Image, Dimensions, useColorScheme } from 'react-native'
import React from 'react'
import { Tabs, router, useLocalSearchParams } from 'expo-router'
import SearchBar from '../../components/store/SearchBar'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AboutScreen from '../../components/store/AboutScreen'
import ProductsScreen from '../../components/store/ProductsScreen'

const Tab = createMaterialTopTabNavigator();

const Store = () => {
    const { store, source, productName, merchantName, ecoRating, userRating } = useLocalSearchParams();
    
      
    const generateLeaves = () => {
      const arr = [];
        let remainderEcoRating = 5
        for (let i = 0; i < ecoRating; i++) {
            arr.push(
                <Image source={require('../../assets/images/general/leaf-green-large.png')}/>
            );
            remainderEcoRating -= 1;

        }
        for (let i = 0; i < remainderEcoRating; i++) {
            arr.push(
                <Image source={require('../../assets/images/general/leaf-grey.png')}/>
            );

        }
        return arr;
    }

    const generateStars = () => {
      const arr = [];
        let remainderUserRating = 5
        for (let n = 0; n < userRating; n++) {
            arr.push(
                <Image key={n} source={require('../../assets/images/store-page/star-yellow.png')}/>
            );
            remainderUserRating -= 1;

        }
        for (let i = 0; i < remainderUserRating; i++) {
            arr.push(
                <Image key={i} source={require('../../assets/images/store-page/star-grey.png')}/>
            );

        }
        return arr;
    }
    
    return (
      <SafeAreaView className='h-full w-full bg-white'>
          <View className='flex-column  max-h-30 pt-14 bg-[#A9CBAC]'>
            <View className='flex-row items-center ml-4'>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => router.back()}
                className='ml-2'
              >
                <Image source={require('../../assets/images/general/back.png')} className='w-[24px] h-[24px]' />
              </TouchableOpacity>
              <SearchBar/>
            </View>
              
            {/* Header */}
            <View className='flex-row ml-8 my-5 '>
              <Image 
                source={require('../../assets/images/product-description/store-profile.png')} 
              />
              <View className='flex-column justify-center ml-3'>
                <Text className='font-psemibold text-[18px]'>{merchantName}</Text>
                <View className='flex-row items-center'>
                  {generateLeaves()}
                  <Text className='text-white'>  {ecoRating}  </Text>
                  {generateStars()}
                  <Text className='text-white'> {userRating}</Text>
                </View>
              </View>
            </View>           
          </View>

          {/* Top navigation */}
        
          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle:{fontFamily: 'Poppins-SemiBold'}, 
              tabBarIndicatorStyle: {backgroundColor: 'green', height:4}
            }}
            
            initialLayout={{width: Dimensions.get('window').width}}
          >
            <Tab.Screen name="About">
              {() => <AboutScreen ecoRating={ecoRating} />}
            </Tab.Screen>
            <Tab.Screen name="Products">
              {() => <ProductsScreen merchantName={merchantName} />}
            </Tab.Screen>
          </Tab.Navigator>
          
        
        
      </SafeAreaView>
    )
}

export default Store