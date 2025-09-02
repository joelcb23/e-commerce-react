const admin = {
  name: "admin",
  email: "admin@email.com",
  password: "admin1234",
  role: "ADMIN",
};
const sellers = [
  {
    name: "seller1",
    email: "seller1@email.com",
    password: "seller1_1234",
    role: "SELLER",
  },
  {
    name: "seller2",
    email: "seller2@email.com",
    password: "seller2_1234",
    role: "SELLER",
  },
  {
    name: "seller3",
    email: "seller3@email.com",
    password: "seller3_1234",
    role: "SELLER",
  },
  {
    name: "seller4",
    email: "seller4@email.com",
    password: "seller4_1234",
    role: "SELLER",
  },
  {
    name: "seller5",
    email: "seller5@email.com",
    password: "seller5_1234",
    role: "SELLER",
  },
  {
    name: "seller6",
    email: "seller6@email.com",
    password: "seller6_1234",
    role: "SELLER",
  },
  {
    name: "seller7",
    email: "seller7@email.com",
    password: "seller7_1234",
    role: "SELLER",
  },
  {
    name: "seller8",
    email: "seller8@email.com",
    password: "seller8_1234",
    role: "SELLER",
  },
  {
    name: "seller9",
    email: "seller9@email.com",
    password: "seller9_1234",
    role: "SELLER",
  },
  {
    name: "seller10",
    email: "seller10@email.com",
    password: "seller10_1234",
    role: "SELLER",
  },
];

const users = [
  {
    name: "user1",
    email: "user1@email.com",
    password: "user1_1234",
    role: "USER",
  },
  {
    name: "user2",
    email: "user2@email.com",
    password: "user2_1234",
    role: "USER",
  },
  {
    name: "user3",
    email: "user3@email.com",
    password: "user3_1234",
    role: "USER",
  },
  {
    name: "user4",
    email: "user4@email.com",
    password: "user4_1234",
    role: "USER",
  },
  {
    name: "user5",
    email: "user5@email.com",
    password: "user5_1234",
    role: "USER",
  },
];

const allUsers = [admin, ...sellers, ...users];

for (let i = 0; i < allUsers.length; i++) {
  const data = JSON.stringify(allUsers[i], null, 2);
  console.log(data);
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  };
  await fetch("http://localhost:4000/api/auth/register", options)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}
