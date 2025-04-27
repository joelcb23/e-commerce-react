import file from "fs";

const data = JSON.parse(file.readFileSync("./src/data/data.json", "utf-8"));
const inserts = [];
data.map(({ name, description, price, stock, img, categoryId, sellerId }) => {
  inserts.push(
    `INSERT INTO Product( name, description, price, stock, img,  sellerId) VALUES('${name}', '${description}', ${price}, ${stock}, '${img}', ${sellerId});
    SET @last_product_id = LAST_INSERT_ID();
    INSERT INTO ProductCategory (productId, categoryId)
    VALUES (@last_product_id, ${categoryId});
    `
  );
});

file.writeFileSync("./db/inserts.sql", inserts.join("\n"), "utf-8");
