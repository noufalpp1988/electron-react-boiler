const { TaskModel } = require('../models/model');

exports.createTask = async (req, res) => {
  try {
    const taskData = await req.body;

    await TaskModel.create(taskData)
      .then((createdTask) => {
        if (!createdTask) {
          res.status(404).json({
            success: false,
            message: 'Task creation failed',
            error: 'Unable get created task',
          });
        }
        return res.status(201).json({
          success: true,
          createdTask,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          error: error.message,
        });
      });
  } catch (ex) {
    res.status(500).json({
      success: false,
      message: `Internal server error:${ex}`,
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    TaskModel.find()
      .then((allTasks) => {
        return res.status(200).json({
          success: true,
          allTasks,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          message: 'Cant fined ',
          error,
        });
      });
  } catch (ex) {
    res.status(500).json({
      success: false,
      message: `Internal server error:${ex}`,
      error: ex.message,
    });
  }
};
