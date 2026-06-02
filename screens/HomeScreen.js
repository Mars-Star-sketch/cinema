import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import api from '../services/api';
import MovieCard from '../components/MovieCard';

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);

  useFocusEffect(
    useCallback(() => {
      api.get('/movies')
        .then(res => setMovies(res.data))
        .catch(console.log);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🎬 CineLog</Text>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#208AEF', marginBottom: 12 }]}
        onPress={() => navigation.navigate('Add')}
      >
        <Text style={styles.btnText}>Adicionar Filme</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#FF9800', marginBottom: 20 }]}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.btnText}>Ver Favoritos</Text>
      </TouchableOpacity>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text>Nenhum filme cadastrado.</Text>}
        renderItem={({ item }) => (
          <MovieCard
            item={item}
            onPress={() => navigation.navigate('Details', { movie: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 40,
    backgroundColor: '#f1f3f6',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111',
  },
  btn: {
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});