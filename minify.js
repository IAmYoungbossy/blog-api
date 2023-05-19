const fs = require("fs");
const path = require("path");
const UglifyJS = require("uglify-js");

// Function to recursively minify JavaScript files
function minifyFiles(dirPath) {
  // Read the contents of the directory
  const files = fs.readdirSync(dirPath);

  // Iterate through each file
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);

    // Check if the file is a directory
    if (fs.statSync(filePath).isDirectory()) {
      // If it's a directory, recursively minify files within it
      minifyFiles(filePath);
    } else if (path.extname(filePath) === ".js") {
      // If it's a JavaScript file, read its contents
      const fileContent = fs.readFileSync(filePath, "utf8");

      // Minify and shorten variable names in the JavaScript code
      const minifiedOutput = UglifyJS.minify(fileContent, {
        mangle: {
          toplevel: true,
        },
      });

      // Write the minified code back to the file
      fs.writeFileSync(filePath, minifiedOutput.code, "utf8");

      console.log(`JavaScript file minified: ${filePath}`);
    }
  });
}

// Start minifying files from the /dist folder
const distFolderPath = path.join(__dirname, "dist"); // Replace with your dist folder path
minifyFiles(distFolderPath);
console.log("All JavaScript files in dist folder are minified.");
