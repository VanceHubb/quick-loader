const fs = require('fs');
const path = require('path');

function quickLoader(source, map) { 
    const basename = path.relative(__dirname,this.resourcePath).replace(/.css$/, '').replace(/\\|\//g, '-').replace(/\./g, '');
    if (map) {
        this.emitFile(path.join('partials', basename + '.css'), source.toString() + "/*# sourceMappingURL=" + basename + ".map */");
        this.emitFile(path.join('partials', basename + '.map'), JSON.stringify(map));
    } else {
        this.emitFile(path.join('partials', basename + '.css'), source);
    }
    return JSON.stringify(new Date());
}

module.exports = quickLoader;