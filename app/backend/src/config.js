export const config = {
  port: process.env.PORT || 3001,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'observex_password',
    database: process.env.DB_NAME || 'observex',
  },
  errorRate: parseFloat(process.env.ERROR_RATE || '0.2'),
};
