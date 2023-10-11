import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons'

const GitHubData = (navigation) => {
    const [repositories, setRepositories] = useState([]);

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

    const renderItem = ({ item }) => (
        <TouchableOpacity>
            <View style={{
                width: 150,
                height: 200,
                margin: 10,
                backgroundColor: '#A4C3D2',
                padding: 10,
            }}>
                <Text>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#78A2CC' }}>
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
                        placeholder="Search repositories"
                    />
                    <TouchableOpacity
                        style={{
                            marginLeft: 5,
                            padding: 10,
                        }}
                        onPress={() => {
                            handleSearch
                        }}
                    >
                        <View>
                            <Ionicons name='search' size={30} />
                        </View>
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={{
                        // backgroundColor: 'red',
                        // width: 100,
                        // height: 100,
                        margin: 10,
                        marginTop: 20,
                        height: '70%'
                    }}
                    numColumns={2}
                    data={repositories}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>
        </GestureHandlerRootView>
    );
};

export default GitHubData;
