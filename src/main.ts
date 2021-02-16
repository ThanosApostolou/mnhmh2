const express = require('express');
import { Request, Response } from 'express';
import path from 'path';

const app = express();

const { PORT = 3000 } = process.env;
app.use(express.static(__dirname + '/public'));
app.get('/api', (req: Request, res: Response) => {
  res.send({
    message: 'hello worldddds',
  });
});
app.get('*', (req: Request,res: Response) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.listen(PORT, () => {
  console.log('server started at http://localhost:'+PORT);
});