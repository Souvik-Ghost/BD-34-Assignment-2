let express = require('express');
let app = express();
let cors = require('cors');
app.use(cors());
let port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

//1
function newTaskToList(tasks, newTask) {
  tasks.push(newTask);
  return tasks;
}
app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let newTask = { taskId: taskId, text: text, priority: priority }
  let result = newTaskToList(tasks, newTask);
  res.send(result);
})
//tasks/add?taskId=4&text=Review%20code&priority=1

//2
function currentTaskList(tasks){
  return tasks;
}
app.get('/tasks', (req, res) => {
  let result = currentTaskList(tasks);
  res.send(result);
});
//tasks

//3
function tasksAscendingOrder(task1, task2) {
  return  task1.priority - task2.priority;
}
app.get('/tasks/sort-by-priority', (req, res) => {
  let result = tasks.slice();
  result.sort(tasksAscendingOrder);
  res.json(result)
});
//tasks/sort-by-priority

//4
function tasksUpdatePriority(tasks, taskId, priority){
  for(let i=0; i<tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}
app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = tasksUpdatePriority(tasks, taskId, priority);
  res.json(result);
});
//tasks/edit-priority?taskId=1&priority=1

//5
function updateTextOfTask(tasks, taskId, text) {
  for(let i=0; i<tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}
app.get ('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = updateTextOfTask(tasks, taskId, text);
  res.json(result);
});
//tasks/edit-text?taskId=3&text=Update+documentation

//6
function removeTask(tasks, taskId) {
  return tasks.taskId !== taskId;
}
app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = tasks.filter(tasks => removeTask(tasks, taskId));
  tasks = result;
  res.json(result);
});
//tasks/delete?taskId=2

//7
function tasksFilterByPriority(tasks, priority) {
  return tasks.priority === priority;
}
app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter(tasks => tasksFilterByPriority(tasks, priority));
  res.json(result);
});
//tasks/filter-by-priority?priority=1