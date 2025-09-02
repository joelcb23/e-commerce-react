// THIS FILE IS TO GENERATE FAKE DATA FOR THE DATABASE

import file from "fs";

// This is the data that will be used to generate the products
// The data is an array of objects, each object represents a product
const discounts = [0, 10, 15, 25];
const products = [
  {
    name: "Wireless Mouse Gamer 100DPI",
    categoryId: 1,
    img: "https://img.freepik.com/psd-gratuitas/icone-de-mouse-para-jogos-de-computador-sem-fio-ilustracao-isolada-de-renderizacao-3d_439185-12646.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: "Teclado Mecánico Redragon K552",
    categoryId: 1,
    img: "https://png.pngtree.com/png-vector/20250322/ourlarge/pngtree-3d-keyboard-icon-isolated-on-a-background-png-image_15845247.png",
  },
  {
    name: "Hard Disk 1TB Seagate Barracuda",
    categoryId: 2,
    img: "https://cdn.pixabay.com/photo/2013/03/02/02/40/backup-89186_960_720.jpg",
  },
  {
    name: "Headset Gamer Bass Cloud Alpha",
    categoryId: 3,
    img: "https://img.freepik.com/free-psd/stylish-gray-white-headphones-music-audio-device_632498-46115.jpg?w=360",
  },
  {
    name: "Webcam Full HD 1080p 12MP",
    categoryId: 4,
    img: "https://png.pngtree.com/png-vector/20250528/ourlarge/pngtree-digital-camera-with-professional-lens-for-photography-and-pictures-png-image_16400499.png",
  },
  {
    name: 'Monitor 24" Full HD IPS 144Hz',
    categoryId: 5,
    img: "https://img.freepik.com/psd-gratis/pantalla-television-moderna-aislada_23-2151430372.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: 'Smart TV" 32 LED',
    categoryId: 6,
    img: "https://img.freepik.com/free-psd/stunning-mountain-landscape-displayed-modern-smart-tv_191095-80909.jpg",
  },
  {
    name: 'Tablet 12.9" 512GB',
    categoryId: 7,
    img: "https://img.freepik.com/vector-premium/pantalla-tv-negra-realista-basica_153074-20.jpg?semt=ais_hybrid&w=740",
  },
  {
    name: 'Smartphone High Game 6.1" 128GB',
    categoryId: 8,
    img: "https://img.freepik.com/vector-gratis/vista-frontal-iphone-16-pro-max-desierto-maqueta-titanio-pantalla-negra-aislada-vector-blanco_90220-3054.jpg?semt=ais_hybrid&w=740",
  },
  {
    name: 'Laptop 15.6" Ryzen 5 512GB SSD 16GB RAM',
    categoryId: 9,
    img: "https://img.freepik.com/psd-premium/abra-vista-superior-computadora-portatil-pantalla-colorida-aislada-render-3d-fondo-transparente_118047-19427.jpg",
  },
];

const data = [];
const description =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente iste nulla veritatis inventore rerum aperiam nihil iure necessitatibus facere! Tempore, quaerat. Consequuntur eius maiores amet sapiente rem dolore distinctio natus facilis adipisci, ea voluptatibus aliquam nam neque laborum, quod temporibus iusto. Nam atque nisi molestias distinctio similique autem ut repudiandae error magni ipsam. Blanditiis, distinctio cupiditate dolor obcaecati sint corporis! Quaerat veritatis, voluptate iure eligendi sit, numquam tenetur suscipit consequatur ab animi, cumque rem! Repellat aliquam cumque necessitatibus voluptatum! Eos.";

// This function will create a product based on the price
// It will return a product object with the same name and description as the one in the products array
const getPrice = (price) => {
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
  let product = getPrice(price);

  const newProduct = {
    id: i + 1,
    name: product.name,
    description,
    price,
    stock,
    discount: discounts[Math.floor(Math.random() * discounts.length)],
    img: product.img,
    categoryId: product.categoryId,
    sellerId: Math.floor(Math.random() * (11 - 2 + 1)) + 2,
    createdAt: new Date(),
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
