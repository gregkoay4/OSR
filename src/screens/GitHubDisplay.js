import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, ActivityIndicator, Linking, Dimensions } from 'react-native';
import axios from 'axios';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const GitHubData = (navigation) => {
  const [Repos, setRepos] = useState([]);
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
    const token = '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';

    if (loading) {
      return
    };

    setLoading(true);

    axios
      .get('https://api.github.com/orgs/react-native-community/repos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          per_page: perPage,
        },
      })
      .then((response) => {
        const newItems = response.data;

        // If newItems is empty, it means there are no more items to load
        if (newItems.length === 0) {
          setLoading(false);
          return;
        }

        const newVisibleRepos = [...Repos, ...newItems];
        setRepos(newVisibleRepos);
        setPage(page + 1);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data from GitHub:', error);
        setLoading(false);
      });
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

    setConstantCheck(endIndex, () => {
      if (constantCheck !== endIndex) {
        setLoading(true);
  
        if (endIndex <= Repos.length) {
          const newVisibleRepos = [...Repos, ...Repos.slice(startIndex, endIndex)];
          setRepos(newVisibleRepos);
          setPage(nextPage);
        }
  
        setLoading(false);
      }
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ zIndex: 2 }}
      onPress={() => {
        Linking.openURL(item.html_url);
      }}
    >
      <View style={{
        position: 'absolute',
        alignSelf: 'flex-end',
        top: 20,
        right: 20,
        zIndex: 3,
      }}>
        <MaterialIcons name='public' size={25} />
      </View>
      <View style={{
        width: 350,
        // height: 200,
        margin: 10,
        backgroundColor: '#A4C3D2',
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
            paddingRight: 25,
          }}>
            {item.name}
          </Text>
        </View>

        <View style={{ marginTop: 5 }}>
          <Text>
            {item.description}
          </Text>
        </View>

        <View style={{ marginTop: item.topics.length > 0 ? 5 : 0, flexDirection: 'row', flexWrap: 'wrap', }}>
          {item.topics.map((topic, i) => {
            return (
              <Text
                key={i}
                style={{
                  backgroundColor: '#78A2CC',
                  // color: 'white',
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
            <FontAwesome name='code' size={20} />
            <Text style={{ marginLeft: 5 }}>
              {item.language}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, width: '20%' }}>
            <FontAwesome name='code-fork' size={20} />
            <Text style={{ marginLeft: 5 }}>
              {item.forks_count}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, width: '20%' }}>
            <Octicons name='issue-opened' size={20} />
            <Text style={{ marginLeft: 5 }}>
              {item.open_issues_count}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, width: '20%' }}>
            <FontAwesome name='star-o' size={20} />
            <Text style={{ marginLeft: 5 }}>
              {item.stargazers_count}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // =====================================================================================

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#BFD4DB' }}>
      <View style={{
        alignItems: 'center',
        marginHorizontal: 10,
      }}>
        <Text style={{
          marginTop: 15,
          fontSize: 50,
          fontWeight: 'bold'
        }}>O.S.R</Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',

          borderWidth: 1,
          borderRadius: 10,
          marginTop: 10,
        }}>
          <TextInput
            style={{
              width: '75%',
              paddingLeft: 15,
            }}
            placeholder="Search repositories/description"
            onChangeText={(text) => {
              setSearchText(text);
            }}
            value={searchText}
          />
          <View style={{
            marginLeft: 5,
            padding: 10,
          }}>
            <Ionicons name='search' size={30} />
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
            style={{
              // backgroundColor: 'red',
              // width: 100,
              // height: 100,
              // margin: 10,
              marginTop: 20,
              height: '70%'
            }}
            // numColumns={2}
            data={Repos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
          />
          :
          <FlatList
            style={{
              // backgroundColor: 'red',
              // width: 100,
              // height: 100,
              // margin: 10,
              marginTop: 20,
              height: '70%'
            }}
            // numColumns={2}
            data={Repos.filter((repo) => {
              if (searchText !== '') {
                const searchLowerCase = searchText.toLowerCase();

                if (repo.name.toLowerCase().includes(searchLowerCase) || repo.description.toLowerCase().includes(searchLowerCase)) {
                  return true;
                }
                else {
                  return false;
                }
              }
            })}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.1}
          />
        }
        {loading && <ActivityIndicator size="large" />}
      </View>
    </GestureHandlerRootView>
  );
};

export default GitHubData;
