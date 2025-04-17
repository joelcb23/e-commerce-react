import file from "fs";

const data = JSON.parse(file.readFileSync("./src/data/data.json", "utf-8"));
const inserts = [];
data.map(({ name, description, price, stock, img, category, sellerId }) => {
  inserts.push(
    `INSERT INTO Product(name, description, price, stock, img, category, sellerId) VALUES('${name}', '${description}', ${price}, ${stock}, '${img}', '${category}', ${sellerId});`
  );
});

file.writeFileSync("./db/inserts.sql", inserts.join("\n"), "utf-8");
