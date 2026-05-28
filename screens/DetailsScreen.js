import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

import api from '../services/api';

export default function DetailsScreen({ route, navigation }) {
  const { movie } = route.params;

  async function deleteMovie() {
    try {
      await api.delete(`/movies/${movie.id}`);
      Alert.alert('Sucesso', 'Filme removido');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir');
    }
  }

  async function toggleFavorite() {
    try {
      await api.patch(`/movies/${movie.id}`, {
        favorito: !movie.favorito
      });

      Alert.alert(
        'Sucesso',
        movie.favorito ? 'Removido dos favoritos' : 'Adicionado aos favoritos'
      );

      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar favorito');
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>

      <Image
        source={{ uri: movie.capa }}
        style={{
          width: '100%',
          height: 300,
          borderRadius: 12,
          marginBottom: 20
        }}
      />

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
        {movie.titulo}
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 5 }}>
        Gênero: {movie.genero}
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        Ano: {movie.ano}
      </Text>

      <TouchableOpacity
        onPress={toggleFavorite}
        style={{
          backgroundColor: movie.favorito ? '#FF9800' : '#208AEF',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
          marginBottom: 10
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          {movie.favorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={deleteMovie}
        style={{
          backgroundColor: '#E53935',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          Excluir Filme
        </Text>
      </TouchableOpacity>

    </View>
  );
}