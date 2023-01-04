const Todo = require("../models/todoModel");
const mongoose = require("mongoose");
const { off } = require("../models/todoModel");

// get todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get todo
const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todo" });
  }

  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: "No such todo" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create todo
const createTodo = async (req, res) => {
  const { title, date } = req.body;

  try {
    const todo = await Todo.create({ title, date });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todo" });
  }

  try {
    const todo = await Todo.findByIdAndDelete({ _id: id });

    if (!todo) {
      return res.status(404).json({ error: "No such todo" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update todo
const updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todo" });
  }

  try {
    const todo = await Todo.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!todo) {
      return res.status(404).json({ error: "No such todo" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo,
};
