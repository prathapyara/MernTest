import express from "express";
import { user } from "../DB/config.js";

export const getUser = async (req, res) => {
  try {
    const userr = await user.find({});
    res
      .status(200)
      .json({ users: userr, message: "fetched user successfully" });
  } catch (err) {
    res.status(400).json({ message: "unable to fetch the users" });
    console.log("error in fetching the user info");
  }
};

export const udpateUser = async (req, res) => {
  const { updatedUser } = req.body;
  console.log(updatedUser);
  console.log(req.params.id);
  await user.updateOne({ _id: req.params.id }, updatedUser);
  const userr = await user.find({});
  res.status(200).json({ users: userr, message: "updated user successfully" });
};
