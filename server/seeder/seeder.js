import { user } from "../DB/config.js";
import { mongodb } from "../DB/config.js";

mongodb();

const array = [
  {
    name: "Srinivas",
    password: "Srinivas@123",
    city: "Hyderbad",
    DOB: new Date("2000-02-20"),
  },
  {
    name: "Kiran",
    password: "Kiran@123",
    city: "Hyderbad",
    DOB: new Date("2001-02-20"),
  },
  {
    name: "Raj",
    password: "raj@123",
    city: "Hyderbad",
    DOB: new Date("2002-02-20"),
  },
];

const createUser = async () => {
  try {
    await user.deleteMany({});
    await user.insertMany(array);
    console.log("inserted");
  } catch (err) {
    console.log(err);
  }
};

createUser();
