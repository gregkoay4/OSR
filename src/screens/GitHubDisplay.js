import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, ActivityIndicator, Linking, Dimensions, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import osr_title from '../assests/image/osr_title.png'
import osr_title_filled from '../assests/image/osr_title_filled.png'

const GitHubData = (navigation) => {
  const [Repos, setRepos] = useState([]);
  const [AllRepos, setAllRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const flatListRef = useRef();
  const { height: containerHeight } = Dimensions.get('window');
  const [constantCheck, setConstantCheck] = useState(0);

  // =====================================================================================
  // UseEffects
  // =====================================================================================

  useEffect(() => {
    const fetchData = async () => {
      if (loading) {
        return;
      }

      setLoading(true);

      const token = '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';
      const apiUrl = 'https://api.github.com/orgs/react-native-community/repos';
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          per_page: perPage,
        },
      };

      try {
        // Send the first request to get data without parameters
        const responseWithoutParams = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Send the second request to get paginated data
        const responseWithParams = await axios.get(apiUrl, config);

        const allRepos = responseWithoutParams.data;
        const newItems = responseWithParams.data;

        setAllRepos(allRepos);

        if (newItems.length === 0) {
          setLoading(false);
          return;
        }

        const newVisibleRepos = [...Repos, ...newItems];
        setRepos(newVisibleRepos);
        setPage(page + 1);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from GitHub:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);


  // =====================================================================================
  // Functions
  // =====================================================================================

  const loadMoreData = () => {
    if (loading) {
      return;
    }

    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * perPage;
    const endIndex = Math.min(nextPage * perPage, Repos.length);

    setConstantCheck(endIndex)
    if (constantCheck !== endIndex) {
      setLoading(true);

      if (endIndex <= Repos.length) {
        const newVisibleRepos = [...Repos, ...Repos.slice(startIndex, endIndex)];
        setRepos(newVisibleRepos);
        setPage(nextPage);
      }

      setLoading(false);
    };
  };

  const renderItem = ({ item }) => (

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
        <MaterialIcons name='public' size={25} color={'#01303f'} />
      </View>
      <View style={{
        width: Dimensions.get('screen').width - 50,
        // height: 200,
        marginBottom: 10,
        backgroundColor: '#89d6fb',
        padding: 10,

        borderRadius: 15,

        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 3.22,
        elevation: 5,
        zIndex: 0,
      }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={{
            fontWeight: 'bold',
            color: '#01303f',
            paddingRight: 25,
          }}>
            {item.name}
          </Text>
        </View>

        <View style={{ marginTop: 5 }}>
          <Text style={{ color: '#4C4C4C', }}>
            {item.description}
          </Text>
        </View>

        <View style={{ marginTop: 5, flexDirection: 'row', flexWrap: 'wrap', }}>
          {item.topics.map((topic, i) => {
            return (
              <Text
                key={i}
                style={{
                  backgroundColor: '#02a9f7',
                  color: '#d4f0fc',
                  borderRadius: 15,
                  padding: 5,
                  paddingHorizontal: 10,
                  marginRight: 5,
                  marginBottom: 5,
                }}>
                {topic}
              </Text>
            )
          })}
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: '30%' }}>
            <FontAwesome name='code' size={20} color={'#4C4C4C'} />
            <Text style={{ marginLeft: 5, color: '#4C4C4C', }}>
              {item.language || item.language !== null ? item.language : '-'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, width: '20%' }}>
            <FontAwesome name='code-fork' size={20} color={'#4C4C4C'} />
            <Text style={{ marginLeft: 5, color: '#4C4C4C', }}>
              {item.forks_count}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, width: '20%' }}>
            <Octicons name='issue-opened' size={20} color={'#4C4C4C'} />
            <Text style={{ marginLeft: 5, color: '#4C4C4C', }}>
              {item.open_issues_count}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, width: '20%' }}>
            <FontAwesome name='star-o' size={20} color={'#4C4C4C'} />
            <Text style={{ marginLeft: 5, color: '#4C4C4C', }}>
              {item.stargazers_count}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // =====================================================================================

  return (
    <GestureHandlerRootView style={{ flex: 2, backgroundColor: '#F4FCFF', }}>
      <View style={{
        alignItems: 'center',
        // marginHorizontal: 10,
      }}>
        {/* <Text style={{
          marginTop: 15,
          fontSize: 50,
          fontWeight: 'bold'
        }}>O.S.R</Text> */}
        <Image
          style={{
            // width: Dimensions.get('screen').width /2,
            height: 100,
            backgroundColor: '#89D6FB'
          }}
          // resizeMethod='scale'
          resizeMode='contain'
          source={osr_title_filled}
        />
        <View style={{
          flexDirection: 'row',
          width: Dimensions.get('screen').width - 50,
          alignItems: 'center',
          backgroundColor: 'white',

          borderRadius: 10,
          marginTop: 10,

          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 3.22,
          elevation: 5,
        }}>
          <TextInput
            style={{
              width: '85%',
              paddingLeft: 15,
              color: 'black',
            }}
            placeholder="Search repositories/description"
            placeholderTextColor={'#C5C5C5'}
            onChangeText={(text) => {
              setSearchText(text);
            }}
            value={searchText}
          />
          <View style={{
            marginLeft: 5,
            padding: 10,
          }}>
            <Ionicons name='search' size={30} color={'#01303f'} />
          </View>
        </View>

        {/* {
          loading &&
          <ActivityIndicator
            size="large"
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignContent: 'center',

              top: '50%'
            }}
          />
        } */}
        {searchText == '' ?
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              // width: Dimensions.get('screen').width - 50,
              marginTop: 20,
              marginBottom: 10,
              height: '70%',
            }}
            data={Repos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
          />
          :
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              marginTop: 20,
              height: '70%'
            }}
            data={AllRepos.filter((allrepo) => {
              if (searchText !== '') {
                const searchLowerCase = searchText.toLowerCase();

                if (allrepo.name.toLowerCase().includes(searchLowerCase) || allrepo.description.toLowerCase().includes(searchLowerCase)) {
                  return true;
                }
                else {
                  return false;
                }
              }
            })}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          // onEndReached={loadMoreData}
          // onEndReachedThreshold={0.1}
          />
        }
        {loading && <ActivityIndicator size="large" />}
      </View>
    </GestureHandlerRootView>
  );
};

export default GitHubData;
