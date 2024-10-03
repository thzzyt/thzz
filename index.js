const https = require('https');

// URLs das APIs
const urls = [
    "https://ffmembros.online/api.php?total_users",
    "https://ffmembros1.online/api.php?total_users",
    "https://extremeemulator.site/api.php?total_users",
    "https://painelpkdo.site/api.php?total_users",
    "https://apksvision.online/api.php?total_users"
];

// Função para fazer a requisição HTTP GET
function getTotalUsers(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            // A cada chunk recebido
            res.on('data', (chunk) => {
                data += chunk;
            });

            // Ao final da resposta
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve(parseInt(json.total_users) || 0); // Se falhar, retorna 0
                } catch (error) {
                    resolve(0); // Caso o JSON seja inválido
                }
            });
        }).on('error', (err) => {
            resolve(0); // Em caso de erro, retorna 0
        });
    });
}

// Função principal para somar os total_users de todas as URLs
async function sumTotalUsers() {
    let totalUsers = 0;

    // Faz a requisição para cada URL e soma os resultados
    for (const url of urls) {
        const users = await getTotalUsers(url);
        totalUsers += users;
    }

    console.log("Total de usuários:", totalUsers);
}

// Chama a função principal
sumTotalUsers();
