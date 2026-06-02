import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';

import api from '../services/api';

const CAMPOS = [
  { key: 'titulo', placeholder: 'Título',     keyboard: 'default' },
  { key: 'genero', placeholder: 'Gênero',      keyboard: 'default' },
  { key: 'ano',    placeholder: 'Ano',          keyboard: 'numeric'  },
  { key: 'capa',   placeholder: 'URL da capa',  keyboard: 'default' },
];

function urlValida(url) {
  return url.startsWith('http://') || url.startsWith('https://');
}

export default function AddMovieScreen({ navigation }) {
  const [form, setForm] = useState({ titulo: '', genero: '', ano: '', capa: '' });

  function setField(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function saveMovie() {
    if (Object.values(form).some(v => !v)) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (!urlValida(form.capa)) {
      Alert.alert('Erro', 'URL da capa inválida');
      return;
    }

    try {
      await api.post('/movies', { ...form, favorito: false });
      setForm({ titulo: '', genero: '', ano: '', capa: '' });
      Alert.alert('Sucesso', 'Filme adicionado');
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar');
    }
  }

  return (
    <View style={styles.container}>
      {CAMPOS.map(({ key, placeholder, keyboard }) => (
        <TextInput
          key={key}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={form[key]}
          onChangeText={(v) => setField(key, v)}
          keyboardType={keyboard}
          style={styles.input}
        />
      ))}

      <TouchableOpacity style={styles.btn} onPress={saveMovie}>
        <Text style={styles.btnText}>Salvar Filme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: '#208AEF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});