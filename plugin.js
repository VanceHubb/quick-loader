const fs = require('fs');
const path = require('path');

function QuickPlugin() {}

// quick reference:
// .assets - emitted files
// .modules - input and info regarding how to handle it
// .chunks - output
//        .modules -  modules included in the chunk
//        .files   -  filenames

QuickPlugin.prototype.apply = (compiler, call) => {
    compiler.plugin('this-compilation', (compilation) => {
        console.log('start compiling: ' + compilation.options.entry);
    });

    compiler.plugin('emit', (compilation, callback) => {

        const cssPaths = Object.keys(compilation.assets)
            .filter((cssPath) => path.extname(cssPath) === ".css");
        const index = cssPaths.map((cssPath) => `@import './${cssPath}';\n`).join('');
        const indexFileName = compilation.outputOptions.filename.replace(/.js$/, '.css');

        delete compilation.assets[compilation.outputOptions.filename];
        compilation.assets[indexFileName] = {
            source: () => index,
            size: () => index.length
        }
        callback();
    });

    compiler.plugin('done', (stats) => {
        console.log('finish compiling: ' + stats.compilation.options.entry);
    });
}

module.exports = QuickPlugin;