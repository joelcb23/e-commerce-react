import file from "fs";

const data = JSON.parse(file.readFileSync("./src/data/data.json", "utf-8"));
const inserts = [];
data.map(({ name, price, stock, img, category, sellerId }) => {
  inserts.push(
    `INSERT INTO Product(name, price, stock, img, category, sellerId) VALUES('${name}', ${price}, ${stock}, '${img}', '${category}', ${sellerId});`
  );
});

file.writeFileSync("./db/inserts.sql", inserts.join("\n"), "utf-8");
