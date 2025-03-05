const { Sequelize, DataTypes } = require('sequelize');
const mysql2 = require("mysql2")


const sequelize = new Sequelize(
  "mysql://root:SunLwCQmEMDOsjfNdLLmWYETMVVFfjpP@crossover.proxy.rlwy.net:54684/railway",
  {
    define: {
      timestamps: false
    }
  }
);


async function Mysql(){
  const connection = await mysql2.createPool({
    uri: "mysql://root:SunLwCQmEMDOsjfNdLLmWYETMVVFfjpP@crossover.proxy.rlwy.net:54684/railway"
  })

  const pool = await connection.promise()

  return pool
}

module.exports = { sequelize, Mysql }