import Task from "../models/Task";

export const renderTasks = async (req, res) => {
  //res.send("<h1>hellowordl</h1>");
  //const tasks = await Task.find();
  const tasks = await Task.find().lean(); //lean() convierte el BSON a JSON
  //console.log(tasks);
  res.render("index", { tasks: tasks }); //mando arreglo a index.hbs
};

export const createTask = async (req, res) => {
  try {
    const task = Task(req.body);
    await task.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }

  //const taskSaved =
  //console.log(taskSaved);

  //console.log(task);
  //res.send("saved");
};

export const renderTaskEdit = async (req, res) => {
  //console.log(req.params.id);

  try {
    const task = await Task.findById(req.params.id).lean();
    res.render("edit", { task }); //mando JSON
  } catch (error) {
    console.log(error.message);
  }
};

export const editTask = async (req, res) => {
  //console.log(req.body);

  const { id } = req.params;

  await Task.findByIdAndUpdate(id, req.body);

  res.redirect("/");
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  await Task.findByIdAndDelete(id);

  res.redirect("/");
};

export const taskToggleDone = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  task.done = !task.done;
  await task.save();

  res.redirect("/");
};
