<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite requisições de qualquer origem (CORS)

// Configurações do banco de dados
$servername = "localhost";
$username = "root"; 
$password = "";     
$dbname = "meu_banco"; 

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["message" => "Falha na conexão com o banco de dados: " . $conn->connect_error]);
    exit();
}

// Endpoint GET /produtos
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT id, nome, preco, descricao FROM produtos";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $produtos = [];
        while($row = $result->fetch_assoc()) {
            $produtos[] = $row;
        }
        echo json_encode($produtos);
    } else {
        echo json_encode([]); // Retorna array vazio se não houver produtos
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["message" => "Método não permitido."]);
}

$conn->close();
?>