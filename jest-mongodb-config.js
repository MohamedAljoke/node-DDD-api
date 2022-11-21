module.exports = {
  mongodbMemoryServer: {
    version: 'latest',
  },
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest',
    },
    binary: {
      version: '4.4.18',
      skipMD5: true,
    },
    autoStart: false,
  },
};
