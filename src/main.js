import { getTasks } from "./api/tasks.js";
import { renderTaskList } from "./components/taskList.js";
import { initRouter } from "./routes/routes.js";
import './styles/index.css';

async function init() {
  try {
    const tasks = await getTasks();
    renderTaskList(tasks);
  } catch (err) {
    console.error(err);
  }
}

initRouter();