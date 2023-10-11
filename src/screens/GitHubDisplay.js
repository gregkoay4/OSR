import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

const GitHubData = (navigation) => {
  const [repositories, setRepositories] = useState([]);
  const [visibleRepos, setVisibleRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

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

        const newVisibleRepos = [...visibleRepos, ...newItems];
        setVisibleRepos(newVisibleRepos);
        setPage(page + 1);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data from GitHub:', error);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    const token = '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';

    axios
      .get('https://api.github.com/orgs/react-native-community/repos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setRepositories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data from GitHub:', error);
      });
  }, []);

  useEffect(() => {
    console.log('repositories', repositories)
  })

  const loadMoreData = () => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);

    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * perPage;
    const endIndex = nextPage * perPage;

    if (endIndex <= data.length) {
      const newVisibleRepos = [...visibleRepos, ...data.slice(startIndex, endIndex)];
      setVisibleRepos(newVisibleRepos);
      setPage(nextPage);
    }

    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={{
        position: 'absolute',
        alignSelf: 'flex-end',
        top: 20,
        right: 20,
        zIndex: 2,
      }}>
        <Text style={{
          borderWidth: 1,
          borderRadius: 15,
          paddingHorizontal: 10,
          marginLeft: 5,
        }}>
          {item.visibility}
        </Text>
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
        zIndex: 1,
      }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{
            fontWeight: 'bold'
          }}>
            {item.name}
          </Text>
        </View>

        <View style={{ marginTop: 5, flexDirection: 'row', flexWrap: 'wrap', }}>
          {item.topics.map((topic, i) => {
            return (
              <>
                <Text style={{
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
              </>
            )
          })}
        </View>

        <View style={{ marginTop: item.topics.length > 0 ? 5 : 0, height: 50 }}>
          <Text>
            {item.description}
          </Text>
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
            data={visibleRepos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.1}
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
            data={visibleRepos.filter((repo) => {
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
      </View>
    </GestureHandlerRootView>
  );
};

export default GitHubData;
