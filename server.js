const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Página inicial, respondendo com "ok"
app.get('/', (req, res) => {
    res.send("ok");
});

// Endpoint de callback USSD
app.post('/ussd', (req, res) => {
  const {
    sessionId,
    serviceCode,
    phoneNumber,
    text
  } = req.body;

  console.log("data: ", req.body)

  let response = '';

  if (text === '') {
    // Menu inicial
    response = `CON Welcome to USSD Service\n1. Option 1\n2. Option 2`;
  } else if (text === '1') {
    // Resposta para opção 1
    response = 'CON You selected Option 1';
  } else if (text === '2') {
    // Resposta para opção 2
    response = 'CON You selected Option 2';
  } else {
    // Caso a opção não seja válida
    response = 'END Invalid selection';
  }

  // Envia a resposta para o cliente
  res.set('Content-Type', 'text/plain');
  res.send(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`USSD server running on port ${PORT}`);
});
