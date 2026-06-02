import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import api from '../services/api';
import MovieCard from '../components/MovieCard';

export default function FavoritesScreen({ navigation }) {
  const [movies, setMovies] = useState([]);

  useFocusEffect(
    useCallback(() => {
      api.get('/movies')
        .then(res => setMovies(res.data.filter(m => m.favorito)))
        .catch(console.log);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Favoritos</Text>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>Nenhum filme favoritado.</Text>}
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
    padding: 10,
    marginTop: 40,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});