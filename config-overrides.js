// module.exports = function override(config,env){
//     return config;
// }

const {override,fixBabelImports} = require('customize-cra');

module.exports = override(
    fixBabelImports('import',{
        libraryName:'antd-mobile',
        style:'css'
    })
)