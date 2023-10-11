import React from 'react';
import { View, Text } from 'react-native';

const RepoDetailScreen = ({ route }) => {
  const { repository } = route.params;

  return (
    <View>
      <Text>Name: {repository.name}</Text>
      <Text>Description: {repository.description}</Text>
      <Text>Stars: {repository.stars}</Text>
      <Text>Forks: {repository.forks}</Text>
      <Text>Watchers: {repository.watchers}</Text>
      <Text>Language: {repository.language}</Text>
    </View>
  );
};

export default RepoDetailScreen;