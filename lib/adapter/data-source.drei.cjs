
var typeorm = require("typeorm")
const DSConfig = require('./dataSourceConfig.cjs/index.js')
// console.log(DSConfig)
var DataSource = new typeorm.DataSource(DSConfig)

const connexion = async () => {
  try {    
    console.log("MDS init complete in drei!");
    const MazDataSource = await DataSource.initialize();
    return MazDataSource;
  } catch (err) {
    console.error("Error during Data Source initialization", err);
    return null;
  }
};
const MazDataSource = connexion()
module.exports = {MazDataSource}