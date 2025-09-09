import { getTasks } from "./api/tasks.js";
import { renderTaskList } from "./components/taskList.js";

async function init() {
  try {
    const tasks = await getTasks();
    renderTaskList(tasks);
  } catch (err) {
    console.error(err);
  }
}

init();