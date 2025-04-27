// THIS FILE IS TO GENERATE FAKE DATA FOR THE DATABASE

import file from "fs";

// This is the data that will be used to generate the products
// The data is an array of objects, each object represents a product
const products = [
  {
    name: "Mouse Inalámbrico Logitech M185",
    categoryId: 2,
    img: "https://cdn.pixabay.com/photo/2016/11/01/17/11/cp-1788949_960_720.jpg",
  },
  {
    name: "Teclado Mecánico Redragon K552",
    categoryId: 2,
    img: "https://cdn.pixabay.com/photo/2022/08/14/16/39/keyboard-7386244_960_720.jpg",
  },
  {
    name: "Disco Duro Externo 1TB Seagate",
    categoryId: 4,
    img: "https://cdn.pixabay.com/photo/2013/03/02/02/40/backup-89186_960_720.jpg",
  },
  {
    name: "Auriculares Sony WH-CH520",
    categoryId: 5,
    img: "https://cdn.pixabay.com/photo/2022/06/21/21/15/audio-7276511_960_720.jpg",
  },
  {
    name: "Cámara Web Logitech C920",
    categoryId: 6,
    img: "https://img.freepik.com/premium-photo/web-camera-attached-monitor-equipment-video_120587-13216.jpg",
  },
  {
    name: 'Monitor LG 24" Full HD',
    categoryId: 7,
    img: "https://cdn.pixabay.com/photo/2016/11/29/06/18/home-office-1867761_960_720.jpg",
  },
  {
    name: 'Smart TV" 32 LED',
    categoryId: 1,
    img: "https://cdn.pixabay.com/photo/2015/02/07/20/58/tv-627876_960_720.jpg",
  },
  {
    name: "Tablet Samsung Galaxy Tab A8",
    categoryId: 9,
    img: "https://cdn.pixabay.com/photo/2017/01/03/12/54/workplace-1949404_960_720.jpg",
  },
  {
    name: "Smartphone Xiaomi Redmi Note 13",
    categoryId: 10,
    img: "https://cdn.pixabay.com/photo/2015/10/17/19/49/iphone-6s-993199_960_720.jpg",
  },
  {
    name: 'Laptop HP 15.6" Ryzen 5',
    categoryId: 11,
    img: "https://cdn.pixabay.com/photo/2016/06/08/10/35/laptop-1443559_960_720.jpg",
  },
];

const data = [];
const description =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente iste nulla veritatis inventore rerum aperiam nihil iure necessitatibus facere! Tempore, quaerat. Consequuntur eius maiores amet sapiente rem dolore distinctio natus facilis adipisci, ea voluptatibus aliquam nam neque laborum, quod temporibus iusto. Nam atque nisi molestias distinctio similique autem ut repudiandae error magni ipsam. Blanditiis, distinctio cupiditate dolor obcaecati sint corporis! Quaerat veritatis, voluptate iure eligendi sit, numquam tenetur suscipit consequatur ab animi, cumque rem! Repellat aliquam cumque necessitatibus voluptatum! Eos.";

// This function will create a product based on the price
// It will return a product object with the same name and description as the one in the products array
const createProduct = (price) => {
  if (price < 15) {
    return products[0];
  } else if (price < 45) {
    return products[1];
  } else if (price < 50) {
    return products[2];
  } else if (price < 60) {
    return products[3];
  } else if (price < 70) {
    return products[4];
  } else if (price < 130) {
    return products[5];
  } else if (price < 180) {
    return products[6];
  } else if (price < 210) {
    return products[7];
  } else if (price < 220) {
    return products[8];
  } else {
    return products[9];
  }
};

// This loop will create 100 products with random prices and stock
// The price will be between 1 and 250
// The stock will be between 1 and 100
for (let i = 0; i < 100; i++) {
  const price = parseFloat((Math.random() * 250 + 1).toFixed(2));
  const stock = Math.floor(Math.random() * 100 + 1);
  let product = createProduct(price);

  const newProduct = {
    id: i + 1,
    name: product.name,
    description,
    price,
    stock,
    img: product.img,
    categoryId: product.categoryId,
    sellerId: Math.floor(Math.random() * (9 - 2 + 1)) + 2,
  };
  data.push(newProduct);
}

// This will create a file called data.json in the src/data folder
// The file will contain the data array in JSON format
file.writeFileSync(
  "./src/data/data.json",
  JSON.stringify(data, null, 2),
  "utf-8"
);
