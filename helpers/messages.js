
import colors from "colors";

const showMenu = () => {
  return new Promise( resolve => {

    console.clear();

    console.log('================================'.blue);
    console.log('        Select an option'.blue);
    console.log('================================\n'.blue);

    console.log(`${ '1.'.blue } Create a new task`);
    console.log(`${ '2.'.blue } List tasks`);
    console.log(`${ '3.'.blue } List completed tasks`);
    console.log(`${ '4.'.blue } List pending tasks`);
    console.log(`${ '5.'.blue } Complete task(s)`);
    console.log(`${ '6.'.blue } Delete a task`);
    console.log(`${ '0.'.blue } Exit\n`);

    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readLine.question('Select an option: ', ( opt ) => {;
      readLine.close()
      resolve(opt);
    })
  });
};

const pause = () => {

  return new Promise(resolve => {

    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    readLine.question('\nPress ENTER to continue\n'.green, ( opt ) => {
      readLine.close();
      resolve();
    });
  });

};

module.exports = {
  showMenu,
  pause
}