const buildProcessEnv = () => {
  process.env.PORT = 4000;
  process.env.NODE_ENV = 'development';
  process.env.DB_DIALECT = 'mysql';
  // ENV setting for a docker container DB
  process.env.DB_HOST = 'database';
  // ENV setting for a localhost DB
  // process.env.DB_HOST = 'localhost';
  // process.env.DB_PORT = 5433;
};

module.exports = buildProcessEnv;