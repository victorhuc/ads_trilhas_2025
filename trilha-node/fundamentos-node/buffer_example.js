const originalString = 'Hello, Node.js Buffers!';

console.log('String original:', originalString);

// 1. Criar um Buffer a partir de uma string (UTF-8 é o padrão)
const bufferFromString = Buffer.from(originalString);

console.log('Buffer criado a partir da string (bytes):', bufferFromString);
// O output será uma representação hexadecimal dos bytes, ex: <Buffer 48 65 6c 6c 6f ...>

// 2. Converter o Buffer de volta para uma string (UTF-8)
const stringFromBuffer = bufferFromString.toString('utf8');

console.log('String convertida de volta do Buffer:', stringFromBuffer);

// Exemplo com codificação diferente (base64)
const base64String = 'SGVsbG8sIE5vZGUuanMgQnVmZmVycyE='; // Equivalente a 'Hello, Node.js Buffers!' em base64
const bufferFromBase64 = Buffer.from(base64String, 'base64');
console.log('Buffer criado de uma string Base64:', bufferFromBase64);
console.log('String decodificada de Base64:', bufferFromBase64.toString('utf8'));