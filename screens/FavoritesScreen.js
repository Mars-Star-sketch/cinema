import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

export default function FavoritesScreen({ navigation }) {
  const [movies, setMovies] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  async function loadFavorites() {
    try {
      const res = await api.get('/movies');

      const favorites = res.data.filter(movie => movie.favorito);

      setMovies(favorites);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        marginTop: 40,
        backgroundColor: '#fff'
      }}
    >

      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20
        }}
      >
        Favoritos
      </Text>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text>Nenhum filme favoritado.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', { movie: item })
            }
            style={{
              marginBottom: 20,
              backgroundColor: '#f5f5f5',
              borderRadius: 12,
              overflow: 'hidden'
            }}
          >

            <Image
              source={{ uri: item.capa }}
              style={{
                width: '100%',
                height: 200
              }}
            />

            <View style={{ padding: 10 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold'
                }}
              >
                {item.titulo}
              </Text>

              <Text>{item.genero}</Text>
            </View>

          </TouchableOpacity>
        )}
      />

    </View>
  );
}