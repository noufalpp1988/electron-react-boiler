const Task = require('./model');

exports.createTask = async (req, res) => {
  try {
    const taskData = await req.body;

    await Task.create(taskData)
      .then((createdTask) => {
        if (!createdTask) {
          res.status(404).json({
            success: false,
            message: 'Task creation failed',
            error: 'Unable get created task',
          });
        }
        console.log(req.body);
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
      message: 'Internal server error',
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    Task.find()
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
