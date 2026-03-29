const logger = {
  info: (msg) => {
    console.log(`[INFO] [${new Date().toISOString()}]: ${msg}`);
  },

  error: (msg) => {
    console.error(`[ERROR]: ${msg}`);
  }
};

module.exports = logger;