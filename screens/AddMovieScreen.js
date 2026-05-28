import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';

import api from '../services/api';

export default function AddMovieScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [genero, setGenero] = useState('');
  const [ano, setAno] = useState('');
  const [capa, setCapa] = useState('');

  async function saveMovie() {
    if (!titulo || !genero || !ano || !capa) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      await api.post('/movies', {
        titulo,
        genero,
        ano,
        capa,
        favorito: false
      });

      setTitulo('');
      setGenero('');
      setAno('');
      setCapa('');

      Alert.alert('Sucesso', 'Filme adicionado');

      navigation.goBack();

    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível salvar');
    }
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        marginTop: 40,
        backgroundColor: '#fff'
      }}
    >

      <TextInput
        placeholder="Título"
        placeholderTextColor="#222"
        value={titulo}
        onChangeText={setTitulo}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 12,
          marginBottom: 15,
          borderRadius: 10
        }}
      />

      <TextInput
        placeholder="Gênero"
        placeholderTextColor="#222"
        value={genero}
        onChangeText={setGenero}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 12,
          marginBottom: 15,
          borderRadius: 10
        }}
      />

      <TextInput
        placeholder="Ano"
        placeholderTextColor="#444"
        value={ano}
        onChangeText={setAno}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 12,
          marginBottom: 15,
          borderRadius: 10
        }}
      />

      <TextInput
        placeholder="URL da capa"
        placeholderTextColor="#444"
        value={capa}
        onChangeText={setCapa}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 12,
          marginBottom: 20,
          borderRadius: 10
        }}
      />

      <TouchableOpacity
        onPress={saveMovie}
        style={{
          backgroundColor: '#208AEF',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            
            color: '#000000',
            fontSize: 16,
            fontWeight: 'bold'
          }}
        >
          Salvar Filme
        </Text>
      </TouchableOpacity>

    </View>
  );
}