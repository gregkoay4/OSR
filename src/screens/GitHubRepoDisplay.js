import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Dimensions, } from 'react-native';
import { GestureHandlerRootView, } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';

import { useNavigation, useRoute } from '@react-navigation/native';

const GitHubRepoDisplay = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  // =====================================================================================
  // UseEffects
  // =====================================================================================
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingLeft: 25, }}>
            <Ionicons name='chevron-back' size={20} color={'#01303f'} />
          </View>
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: '42.5%' }}>
          <Text style={{ color: '#01303f', fontSize: 18, fontWeight: 'bold' }}>
            Details
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#F4FCFF',
      },
    });
  }, []);
  // =====================================================================================
  // Functions
  // =====================================================================================
  // =====================================================================================

  return (
    <GestureHandlerRootView style={{ flex: 2, backgroundColor: '#F4FCFF', }}>
      <View style={{
        alignItems: 'center',
        // marginHorizontal: 10,
      }}>
        <TouchableOpacity
          style={{ zIndex: 2, alignSelf: 'center' }}
          onPress={() => {
            Linking.openURL(item.html_url);
          }}
        >
          <View style={{
            position: 'absolute',
            alignSelf: 'flex-end',
            marginTop: 8,
            right: 10,
            zIndex: 3,
          }}>
            <Feather name='external-link' size={25} color={'#01303f'} />
          </View>
          <View style={{
            width: Dimensions.get('screen').width - 50,
            marginBottom: 10,
            padding: 10,
            borderBottomWidth: 0.5,
            zIndex: 0,
          }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={{
                fontWeight: 'bold',
                color: '#01303f',
                paddingRight: 25,
                fontSize: 18,
              }}>
                {item.name}
              </Text>
            </View>

            <View style={{ marginTop: 5 }}>
              <Text style={{ color: '#4C4C4C', fontSize: 16, }}>
                {item.description}
              </Text>
            </View>

            <View style={{ marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', }}>
              {item.topics.map((topic, i) => {
                return (
                  <Text
                    key={i}
                    style={{
                      backgroundColor: '#01303f',
                      color: '#d4f0fc',
                      borderRadius: 15,
                      padding: 5,
                      paddingHorizontal: 10,
                      marginRight: 5,
                      marginBottom: 5,
                      fontSize: 14,
                    }}>
                    {topic}
                  </Text>
                )
              })}
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10, }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <FontAwesome name='code' size={20} color={'#4C4C4C'} />
                <Text style={{ marginLeft: 5, color: '#4C4C4C', }}>
                  {item.language || item.language !== null ? item.language : '-'}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, }}>
                <FontAwesome name='code-fork' size={20} color={'#4C4C4C'} />
                <Text style={{ marginLeft: 5, color: '#4C4C4C', }}>
                  {item.forks_count}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, }}>
                <Octicons name='issue-opened' size={20} color={'#4C4C4C'} />
                <Text style={{ marginLeft: 5, color: '#4C4C4C', }}>
                  {item.watchers_count}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 30, }}>
                <FontAwesome name='star-o' size={20} color={'#4C4C4C'} />
                <Text style={{ marginLeft: 5, color: '#4C4C4C', }}>
                  {item.stargazers_count}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default GitHubRepoDisplay;
