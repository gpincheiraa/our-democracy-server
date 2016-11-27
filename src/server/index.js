import config from '../config/env/index';
import app from '../config/express';

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port} (${config.env})`);
});

export default app;
