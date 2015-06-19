import path from "path"
import webpack from "webpack"
import { version as __VERSION__ } from "./package.json"

const config = {

  colors : true,
  progress : true,

  entry : {
    index : [
      "./src/index",
    ],
  },

  output : {
    path : path.resolve(__dirname, "dist"),
    library : "jsonp",
    libraryTarget : "umd",
    filename : "[name].js",
  },

  resolve : {
    extensions : [
      "",
      ".js",
    ],
  },

  plugins : [
    new webpack.DefinePlugin({
      __VERSION__ : `"${__VERSION__}"`,
    })
  ],

  module : {
    loaders : [
      {
        test : /\.js$/,
        loaders : [
          // the `playground` option is used for ES7 class property
          // initializers
          "babel?" + JSON.stringify({
            stage: 0,
          }),
        ],
        exclude : /node_modules/,
      },
    ],
  },
}

export default config
