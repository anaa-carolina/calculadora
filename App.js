import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [mensagem, setMensagem] = useState('');

  const calcularIMC = () => {
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));
    if (!pesoNum || !alturaNum) {
      setMensagem('Por favor, insira valores válidos.');
      setImc(null);
      return;
    }
    const imcCalculado = pesoNum / (alturaNum * alturaNum);
    setImc(imcCalculado.toFixed(2));
    if (imcCalculado < 18.5) {
      setMensagem('Abaixo do peso');
    } else if (imcCalculado < 25) {
      setMensagem('Peso normal');
    } else if (imcCalculado < 30) {
      setMensagem('Sobrepeso');
    } else {
      setMensagem('Obeso');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Calculadora de IMC</Text>
        <Text style={styles.paragraph}>O IMC (Índice de Massa Corporal) é uma fórmula utilizada para avaliar se uma pessoa tem um peso saudável em relação à sua altura. A fórmula para calcular o IMC é simples: IMC = peso (kg) / altura² (m).</Text>
        <Text>Para valores quebrados, utilize ponto</Text>
      
        <TextInput
          style={styles.input}
          placeholder="Peso(kg)"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />

        <TextInput
          style={styles.input}
          placeholder="Altura(m)"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />

        <TouchableOpacity style={styles.button} onPress={calcularIMC}>
          <Text style={styles.buttonText}>Calcular IMC</Text>
        </TouchableOpacity>

        {imc && (
          <View style={styles.result}>
            <Text>Seu IMC: {imc}</Text>
            <Text>{mensagem}</Text>
          </View>
        )}
        {mensagem && !imc && (
          <Text style={styles.error}>{mensagem}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // opcional
  },
  container: {
    padding: 24,
    backgroundColor: '#b494f1ff',
    width: 600, // largura fixa
    borderRadius: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 24,
    textAlign: 'center',
  },

  paragraph: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#00000088',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 13,
  },

  button: {
    backgroundColor: '#721584a2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  result: {
    margin: 24,
    alignItems: 'center',
  },
  
  error: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});