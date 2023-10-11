import React, { useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRepositories, searchRepositories } from '../actions/RepoActions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons'

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const repositories = useSelector((state) => state.repositories.items);

  useEffect(() => {
    dispatch(fetchRepositories());
  }, [dispatch]);

  const loadMore = () => {
    // Implement pagination here
  };

  const handleSearch = (text) => {
    dispatch(searchRepositories(text));
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
      {/* Render other repository information */}
      <Button
        title="View Details"
        onPress={() => navigation.navigate('RepositoryDetail', { repository: item })}
      />
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#78A2CC' }}>
      <View style={{
        alignItems: 'center'
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
          marginTop: 10,
        }}>
          <TextInput
            style={{
              width: '75%',
              borderWidth: 1,
            }}
            placeholder="Search repositories"
          />
          <TouchableOpacity
            style={{
              marginLeft: 5,
              // backgroundColor: 'blue',
              padding: 10,

              borderRadius: 20,
            }}
            onPress={() => {
              handleSearch
            }}
          >
            <View>
              <Ionicons name='search' size={30}/>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{ 
            backgroundColor: 'red', 
            width: 100, 
            height: 100,
            margin: 10,
           }}
          data={repositories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
