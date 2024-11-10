import path from 'path';

export default {
  entry: './src/components/chat-widget.jsx',  // Path to your component file
  output: {
    filename: 'chatbox-widget-test.js',  // Bundled widget file name
    path: path.resolve(process.cwd(), 'dist'), // Output folder (ensure it's accessible to web)
    library: 'ChatWidget',  // Global variable for your widget
    libraryTarget: 'umd',  // Makes it compatible with different module systems
  },
  
  mode: 'production',  // Change to 'production' for production build
  externals: {
    react: 'React',        // Exclude React from being bundled
    'react-dom': 'ReactDOM' // Exclude ReactDOM from being bundled
  },
  module: {
    rules: [
      {
        test: /\.css$/,  // Handle CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,  // Handle JS/JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'], // Babel preset for React
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Resolve JS and JSX extensions
  },
};
