const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

// Função para salvar as mensagens em um arquivo de texto
function saveMessage(message) {
    const data = `${message.from}: ${message.body}\n`;
    fs.appendFile('messages.txt', data, (err) => {
        if (err) throw err;
        console.log('Message saved!');
    });
}


client.on('message_create', message => {
    // Verifica se a mensagem não é um comando '!ping'
    if (message.body !== '!ping') {
        saveMessage(message); // Salva a mensagem
    } else {
        client.sendMessage(message.from, 'pong'); // Responde com "pong"
    }
});

client.initialize();
