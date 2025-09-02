import fs from "fs";

const data = JSON.parse(fs.readFileSync("./src/data/data.json", "utf-8"));
const inserts = data.map(
  ({ name, description, price, stock, img, categoryId, sellerId, discount }) =>
    [
      `INSERT INTO Product( name, description, price, stock, img,  sellerId, discount) VALUES('${name}', '${description}', ${price}, ${stock}, '${img}', ${sellerId}, ${discount});`,
      `SET @last_product_id = LAST_INSERT_ID();`,
      `INSERT INTO ProductCategory (productId, categoryId) VALUES (@last_product_id, ${categoryId});`,
    ].join("\n")
);

fs.writeFileSync("./sql/inserts_products.sql", inserts.join("\n\n"), "utf-8");
