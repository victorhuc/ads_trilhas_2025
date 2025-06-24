function calculateSum(a, b) {
  // Erro intencional: b pode ser undefined, causando uma operação inválida
  return a + b.value; // Isso causará um TypeError se 'b' não for um objeto com a propriedade 'value'
}

console.log('Início do script de debug.');

const num1 = 10;
const num2 = { value: 5 }; // Ou simplesmente 'const num2 = 5;' para não causar erro,
                          // mas o exemplo é para demonstrar como o erro apareceria.

let result;
try {
  result = calculateSum(num1, num2);
  console.log('A soma é:', result);
} catch (error) {
  console.error('Ocorreu um erro durante o cálculo:', error.message);
  // Você pode colocar um breakpoint aqui para inspecionar o erro
}


console.log('Fim do script de debug.');

