import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env) => {
  const paths = {
    output: path.resolve(__dirname, 'dist'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    src: path.resolve(__dirname, 'src'),
  }

  const isDev = env.mode === 'development';
  // const isProd = env.mode === 'production';

  const devserv = {
    port: 3000,
    open: true,
    historyApiFallback: true,
    hot: true
  }

  const module = {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }

  const config = {
    mode: isDev ? 'development' : 'production',
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].js',
      clean: true
    },
    module,
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
    devServer: isDev ? devserv : undefined,
  }

  return config;
}