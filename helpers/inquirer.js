
import colors from 'colors';
import inquirer from 'inquirer';


const inquireMenu = async() => {

  const questions = {

    type: 'list',
    name: 'opt',
    message: 'Select an option:'.red,
    choices: [
      {
        name: `${ '1.'.cyan } Create a new task`,
        value: '1'
      },
      {
        name: `${ '2.'.cyan } List tasks`,
        value: '2'
      },
      {
        name: `${ '3.'.cyan } List completed tasks`,
        value: '3'
      },
      {
        name: `${ '4.'.cyan } List pending tasks`,
        value: '4'
      },
      {
        name: `${ '5.'.cyan } Complete task(s)`,
        value: '5'
      },
      {
        name: `${ '6.'.cyan } Delete a task`,
        value: '6'
      },
      {
        name: `${ '7.'.cyan } Exit\n`,
        value: '0'
      }]
  };

  console.clear();

  console.log('================================'.grey);
  console.log('           TO DO LIST'.grey);
  console.log('================================\n'.grey);

  const { opt } = await inquirer.prompt(questions);

  return opt;

}


const pause = async() => {

  const questions = {
    type: 'input',
    name: 'pause',
    message: 'Press ENTER to continue'.green
  };

  console.log('\n');
  await inquirer.prompt(questions);

  return;
}

const readInput = async( message ) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,

      validate( value ) {
        if( value.length === 0 ) {
          return 'Please, Enter a value';
        }
        return true;
      }
    } 
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
}

const taskToDelete = async( tasks = [] ) => {

  let final = 0;

  const choices = tasks.map( ( task, i ) => {

    const idx = `${i + 1}.`.green;
    final = i + 1;

    return {
      value: task.id,
      name: `${ idx } ${ task.desc }`
    }
  });

  choices.push({
    value: 'Cancel',
    name: `${ final + 1 }.`.green + ' Cancel'.red
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices
    }
  ]

  console.clear();
  const { id } = await inquirer.prompt(questions);
  return id;
}

const confirm = async(message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
}

const showCheckList = async( tasks = [] ) => {

  const choices = tasks.map( ( task, i ) => {

    const idx = `${i + 1}`.green;

    return {
      value: task.id,
      name: `${ idx } ${ task.desc }`,
      checked: ( task.completed ) ? true : false
    }
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select completed task(s):',
      choices
    }
  ]

  console.clear();
  const { ids } = await inquirer.prompt(question);
  return ids;
}


export {
  inquireMenu,
  pause,
  readInput,
  taskToDelete,
  confirm,
  showCheckList
}