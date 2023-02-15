import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';

// Definiowanie typów dla obiektu Request i Response
type ExpressRequest = Request & {
  body: {
    message: string;
  };
};

// Tworzenie połączenia z bazą danych
createConnection()
  .then(() => {
    console.log('Połączono z bazą danych!');
  })
  .catch((error) => {
    console.error('Błąd połączenia z bazą danych:', error);
  });

// Konfiguracja aplikacji Express.js
const app = express();
app.use(express.json());

// Obsługa żądania HTTP GET na główną stronę
app.get('/', (req: Request, res: Response) => {
  res.send('Witaj w mojej aplikacji!');
});

// Obsługa żądania HTTP POST na adres /message
app.post('/message', (req: ExpressRequest, res: Response) => {
  const message = req.body.message;
  console.log('Otrzymano wiadomość:', message);
  res.send('Otrzymano wiadomość: ' + message);
});

// Startowanie serwera na porcie 3000
app.listen(3000, () => {
  console.log('Serwer działa na porcie 3000');
});