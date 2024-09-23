import file from "fs";
const data = [];
for (let i = 0; i < 100; i++) {
  const price = parseFloat((Math.random() * 3000 + 1).toFixed(2));
  const stock = Math.floor(Math.random() * 100 + 1);
  let name;
  let img;
  let category;

  if (price < 200) {
    name = "Clothes";
    img =
      "https://www.glam.com/img/gallery/tips-for-styling-a-clothing-rack-for-the-perfect-aesthetic/l-intro-1678394165.jpg";
    category = "Clothing";
  } else if (price < 350) {
    name = "Book";
    img =
      "https://st3.depositphotos.com/1634884/16569/i/450/depositphotos_165698988-stock-photo-best-seller-book.jpg";
    category = "Productivity";
  } else if (price < 500) {
    name = "Home Theater";
    img = "https://hifimart.com/wp-content/uploads/iStock-177100713.jpg";
    category = "Furniture";
  } else if (price < 850) {
    name = "TV";
    img =
      "https://images.samsung.com/is/image/samsung/it_UE32ES6800QXZT_001_Front?$L2-Thumbnail$";
    category = "Furniture";
  } else if (price < 1200) {
    name = "Mobile";
    img =
      "https://s3b.cashify.in/gpro/uploads/2022/07/07020311/Best-Mobile-Phones-In-The-World.jpg";
    category = "Electronics";
  } else if (price < 1750) {
    name = "Tablet";
    img =
      "https://www.popsci.com/wp-content/uploads/2023/03/14/best-tablets-for-college-students-main.jpg";
    category = "Electronics";
  } else if (price < 2000) {
    name = "Laptop";
    img =
      "https://static3.srcdn.com/wordpress/wp-content/uploads/2020/09/l1-1.jpg";
    category = "Electronics";
  } else {
    name = "Motorcycle";
    img =
      "http://images5.fanpop.com/image/photos/26500000/DUCATI-1198S-motorcycles-26543532-1600-1200.jpg";
    category = "Vehicle";
  }

  const product = {
    id: i + 1,
    name: `${name} ${i % 6}`,
    price,
    stock,
    img,
    category,
    sellerId: Math.floor(Math.random() * 4 + 2),
  };
  data.push(product);
}

// console.log(data);
file.writeFileSync(
  "./src/data/data.json",
  JSON.stringify(data, null, 2),
  "utf-8"
);
