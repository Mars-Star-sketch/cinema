import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';

import api from '../services/api';

export default function DetailsScreen({ route, navigation }) {
  const { movie } = route.params;

  async function deleteMovie() {
    try {
      await api.delete(`/movies/${movie.id}`);
      Alert.alert('Sucesso', 'Filme removido');
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível excluir');
    }
  }

  async function toggleFavorite() {
    try {
      await api.patch(`/movies/${movie.id}`, { favorito: !movie.favorito });
      Alert.alert(
        'Sucesso',
        movie.favorito ? 'Removido dos favoritos' : 'Adicionado aos favoritos'
      );
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar favorito');
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.capa }} style={styles.capa} />

      <Text style={styles.titulo}>{movie.titulo}</Text>
      <Text style={styles.info}>Gênero: {movie.genero}</Text>
      <Text style={styles.info}>Ano: {movie.ano}</Text>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: movie.favorito ? '#FF9800' : '#208AEF' }]}
        onPress={toggleFavorite}
      >
        <Text style={styles.btnText}>
          {movie.favorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#E53935' }]}
        onPress={deleteMovie}
      >
        <Text style={styles.btnText}>Excluir Filme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  capa: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  btn: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});