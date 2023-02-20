
import { v4 as uuid } from 'uuid';

class Task {

  id = '';
  desc = '';
  completed = null;

  constructor( desc ) {

    this.id = uuid();
    this.desc = desc;
    this.completed = null;

  }
}

export default Task;
