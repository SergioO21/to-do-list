
import { inquireMenu,
        pause,
        readInput,
        taskToDelete,
        confirm,
        showCheckList
} from './helpers/inquirer.js';
import { saveFile, readFile } from './helpers/saveFile.js';
import Tasks from './models/tasks.js';
import colors from 'colors';

const main = async () => {

  let opt = '';
  const tasks = new Tasks();
  const tasksDB = readFile();

  if ( tasksDB ) {
    tasks.uploadTasks( tasksDB );
  }

  do {

    console.clear();
    opt = await inquireMenu();

    switch (opt) {

      case '1':
        const desc = await readInput('Description:');
        tasks.createTask( desc );
      break;

      case '2':
        tasks.showTasks();
      break;

      case '3':
        tasks.completedTasks();
      break;

      case '4':
        tasks.completedTasks(false);
      break;

      case '5':
        const ids = await showCheckList( tasks.getList );
        tasks.toggleCompleted( ids );
      break;

      case '6':
        const id = await taskToDelete( tasks.getList );
        
        if ( id !== 'Cancel') {
          const toDelete = await confirm('Are you sure you want to delete this task?');
        
          if ( toDelete ) {
            tasks.deleteTask( id );
            console.log( '\nTask deleted successfully!'.green );
          }
        }

      break;

    }

    saveFile( tasks.getList );

    opt !== '0'
      ? await pause()
      : console.log('See you later! :D'.green)

  } while( opt !== '0');

}

main();