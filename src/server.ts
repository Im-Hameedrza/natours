import { app, port } from './app.js';

// Listen
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
