<?php
// Array de URLs
$urls = [
    "https://ffmembros.online/api.php?total_users",
    "https://ffmembros1.online/api.php?total_users",
    "https://extremeemulator.site/api.php?total_users",
    "https://painelpkdo.site/api.php?total_users",
    "https://apksvision.online/api.php?total_users"
];

// Função para fazer requisição HTTP GET
function getTotalUsers($url) {
    $response = file_get_contents($url);
    if ($response === FALSE) {
        return 0; // Em caso de falha na requisição
    }
    
    $data = json_decode($response, true);
    return isset($data['total_users']) ? (int)$data['total_users'] : 0;
}

// Variável para somar o total de usuários
$totalUsers = 0;

// Loop através de todas as URLs
foreach ($urls as $url) {
    $totalUsers += getTotalUsers($url);
}

// Retorna o total somado
echo "Total de usuários: " . $totalUsers;
?>
