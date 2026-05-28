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

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadMovies();
    }, [])
  );

  async function loadMovies() {
    try {
      const res = await api.get('/movies');
      setMovies(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 15,
        marginTop: 40,
        backgroundColor: '#f1f3f6'
      }}
    >

      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginBottom: 20,
          color: '#111'
        }}
      >
        🎬 CineLog
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Add')}
        style={{
          backgroundColor: '#208AEF',
          padding: 15,
          borderRadius: 14,
          alignItems: 'center',
          marginBottom: 12
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16
          }}
        >
          Adicionar Filme
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Favorites')}
        style={{
          backgroundColor: '#FF9800',
          padding: 15,
          borderRadius: 14,
          alignItems: 'center',
          marginBottom: 20
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16
          }}
        >
          Ver Favoritos
        </Text>
      </TouchableOpacity>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text>Nenhum filme cadastrado.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', { movie: item })
            }
            style={{
              marginBottom: 22,
              backgroundColor: '#fff',
              borderRadius: 16,
              overflow: 'hidden',

              elevation: 4,

              shadowColor: '#000',
              shadowOpacity: 0.12,
              shadowRadius: 8,
              shadowOffset: {
                width: 0,
                height: 4
              }
            }}
          >

            <Image
              source={{ uri: item.capa }}
              style={{
                width: '100%',
                height: 240,
                resizeMode: 'cover'
              }}
            />

            <View style={{ padding: 14 }}>

              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: '#111'
                }}
              >
                {item.titulo} {item.favorito ? '⭐' : ''}
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  marginTop: 5,
                  color: '#555'
                }}
              >
                {item.genero}
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  marginTop: 3,
                  color: '#777'
                }}
              >
                {item.ano}
              </Text>

            </View>

          </TouchableOpacity>
        )}
      />

    </View>
  );
}