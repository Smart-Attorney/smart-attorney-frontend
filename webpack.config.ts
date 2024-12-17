import { Configuration } from 'webpack';

const config: Configuration = {
  module: {
    rules: [
      {
        test: /pdf.worker.min.js$/,
        use: { loader: 'worker-loader' }
      }
    ]
  }
};

export default config;
