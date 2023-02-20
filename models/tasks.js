import Task from "./task.js";
import colors from "colors";

class Tasks {

  _list = {};

  get getList() {

    const list = [];
    Object.keys(this._list).forEach( key => list.push(this._list[key]));

    return list;
  }

  constructor() {
    this._list = {};
  }

  deleteTask( id = '' ) {
    if ( this._list[id] ) {
      delete this._list[id];
    } 
  }

  uploadTasks(tasks = []) {
    tasks.forEach(task => { this._list[task.id] = task });
  }


  createTask( desc = '' ) {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  showTasks() {

    console.log();
    this.getList.forEach( (task, idx) => {

      const index = `${idx + 1}.`.green;
      const { desc, completed } = task;
      const status = ( completed )
                      ? 'Completed'.green
                      : 'Pending'.red

      console.log(`${ index } ${desc} ${'<>'.cyan} ${status}`);
    });
  }

  completedTasks( completed = true ) {

    let tasks = [];
    let idx = 1;

    console.log();

    this.getList.forEach( task => {

      if ( (task.completed && completed) || (!task.completed && !completed) ) {

        const index = `${idx}.`.green;
        const { desc } = task;
        const status = ( completed )
                      ? `Completed :: ${task.completed}`.green
                      : 'Pending'.red

        console.log(`${ index } ${desc} ${'<>'.cyan} ${status}`);
        idx++;
      }
    });
  }

  toggleCompleted( ids = [] ) {

    this.getList.forEach( task => {

      if ( ids.includes(task.id) ) {
        if ( !task.completed ) {
          task.completed = new Date().toISOString();
        }
      } else {
        this._list[task.id].completed = null;
      }

    });
  }

}

export default Tasks;