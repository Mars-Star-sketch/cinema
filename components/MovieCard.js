import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function MovieCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.capa }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.titulo}>
          {item.titulo} {item.favorito ? '⭐' : ''}
        </Text>
        <Text style={styles.genero}>{item.genero}</Text>
        <Text style={styles.ano}>{item.ano}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 22,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    
  },
  info: {
    padding: 14,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
  },
  genero: {
    fontSize: 16,
    marginTop: 5,
    color: '#555',
  },
  ano: {
    fontSize: 15,
    marginTop: 3,
    color: '#777',
  },
});