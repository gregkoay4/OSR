import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { fetchRepositories } from '../api/githubAPI';

const GitHubDisplay = () => {
  const navigation = useNavigation();
  const [Repos, setRepos] = useState([]);
  const [loadedRepos, setLoadedRepos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  // =====================================================================================
  // UseEffects
  // =====================================================================================

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingLeft: 25, }}>
          <Ionicons name='chevron-back' size={20} color={'#F4FCFF'} />
        </View>
      ),
      headerTitle: () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingLeft: '42.5%' }}>
          <Text style={{ color: '#01303f', fontSize: 18, fontWeight: 'bold' }}>
            Home
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#F4FCFF',
      },
    });
  }, []);

  useEffect(() => {
    if (searchText === '') {
      setLoading(true);
      fetchRepositories()
        .then((data) => {
          setRepos(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data from GitHub:', error);
          setLoading(false);
        });
    }
  }, [searchText]);

  useEffect(() => {
    setLoadedRepos(Repos.slice(0, page * perPage));
  }, [Repos, page]);

  // =====================================================================================
  // Functions
  // =====================================================================================

  const showMoreData = () => {
    if (!loading && hasMore) {
      setLoading(true);
      if (page * perPage >= Repos.length) {
        setHasMore(false);
      }
      setPage(page + 1);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (

    <TouchableOpacity
      style={{ zIndex: 2, alignSelf: 'center' }}
      onPress={() => {
        navigation.navigate('githubrepo', { item });
      }}
    >
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

        <View style={{ marginTop: 5, marginBottom: 8 }}>
          <Text style={{ color: '#4C4C4C', fontSize: 13, }}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // =====================================================================================

  return (
    <View style={{ flex: 2, backgroundColor: '#F4FCFF', }}>
      <View style={{
        alignItems: 'center',
      }}>
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
          <View style={{
            marginRight: 5,
            padding: 10,
          }}>
            <Ionicons name='search' size={20} color={'#01303f'} />
          </View>
          <TextInput
            style={{
              width: '80%',
              paddingLeft: 10,
              color: 'black',
            }}
            placeholder="Search repositories/description"
            placeholderTextColor={'#C5C5C5'}
            onChangeText={(text) => {
              setSearchText(text);
            }}
            value={searchText}
          />
        </View>

        {Repos && Repos.length > 0 ?
          (searchText === '' ?
            <FlatList
              showsVerticalScrollIndicator={true}
              style={{
                marginTop: 20,
                marginBottom: 10,
                height: '85%',
              }}
              data={loadedRepos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              onEndReached={showMoreData}
              onEndReachedThreshold={0.1}
            />
            :
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{
                marginTop: 20,
                height: '90%',
              }}
              data={Repos.filter((allrepo) => {
                if (searchText !== '') {
                  const searchLowerCase = searchText.toLowerCase();

                  if (allrepo.name.toLowerCase().includes(searchLowerCase) || allrepo.description.toLowerCase().includes(searchLowerCase)) {
                    return true;
                  } else {
                    return false;
                  }
                }
              })}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
          )
          :
          <View style={{ alignSelf: 'center', justifyContent: 'center', marginTop: Dimensions.get('screen').height - (Dimensions.get('screen').height * 0.65) }}>
            <Text style={{
              color: '#8FABB4',
              fontSize: 14,
            }}>
              No repositories found
            </Text>
          </View>
        }
        {loading &&
          <View style={{
            position: 'absolute',
            marginTop: Dimensions.get('screen').height - (Dimensions.get('screen').height * 0.6),
            backgroundColor: '#F4FCFF',
            borderRadius: 100,
            padding: 10,

            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 3.22,
            elevation: 5,
          }}>
            <ActivityIndicator size="large" color='#01303f' />
          </View>
        }
      </View>
    </View>
  );
};

export default GitHubDisplay;
