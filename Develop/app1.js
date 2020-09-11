const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const myEmployees = [];

// array of objects with prompt questions

function createEmployee() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What type of employee is this?",
            choices: [
              'Intern',
              'Manager',
              'Engineer'
            ]
          }
        ]).then(function (answers) {
            console.log(answers);
            if (answers.role === 'Intern') {
                newIntern();
            } else if (answers.role === 'Manager') {
                newManager();
            } else if (answers.role === 'Engineer') {
                newEngineer();
            } else {
                renderHtml();
            }
        });

    function newIntern() {
        inquirer.prompt([
        {
            type: "string",
            name: "name",
            message: "What is the employee's name?",
        },
        {
            type: "string",
            name: "id",
            message: "What is the employee's ID number?",
        },
        {
            type: "string",
            name: "email",
            message: "What is the employee's email address?",
        },
        {
            type: "string",
            name: "school",
            message: "What school does this intern attend?"
        }
        ]).then (function(answers) {
            console.log(answers)
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            myEmployees.push(intern);
            otherEmployees();
        });
    }
    function newManager() {
        inquirer.prompt([
            {
                type: "string",
                name: "name",
                message: "What is the employee's name?",
              },
              {
                type: "string",
                name: "id",
                message: "What is the employee's ID number?",
              },
              {
                type: "string",
                name: "email",
                message: "What is the employee's email address?",
              },
      {
        type: "string",
        name: "officeNumber",
        message: "What is this manager's office number?"
      }
    ]).then (function(answers) {
        console.log(answers);
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        myEmployees.push(manager);
        otherEmployees();
    });
}

    function newEngineer() {
        inquirer.prompt([
            {
                type: "string",
                name: "name",
                message: "What is the employee's name?",
              },
              {
                type: "string",
                name: "id",
                message: "What is the employee's ID number?",
              },
              {
                type: "string",
                name: "email",
                message: "What is the employee's email address?",
              },
      {
        type: "string",
        name: "github",
        message: "What is this engineer's GitHub username?"
      }
    ]).then(function(answers) {
        console.log(answers);
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        myEmployees.push(engineer);
        otherEmployees()
    });
}
    // function otherEmployees() {
    //     inquirer.prompt([
    //   {
    //     type: "list",
    //     name: "moreEmployees",
    //     message: "Are there other employees to be added?",
    //     choices: [
    //         'Yes',
    //         'No'
    //       ]
    //   }
    function otherEmployees() {
                inquirer.prompt([
              {
                type: "confirm",
                name: "moreEmployees",
                message: "Are there other employees to be added?",
                default: true
              }
            ]).then(function(answers) {
                console.log(answers);
                if (answers.moreEmployees) {
                    createEmployee()
                } else {
                    renderHtml();
                }
            });
    }
// ]).then(function(answers) {
//         console.log(answers);
//         if (answers==="Yes") {
//             createEmployee();
//         } else {
//             renderHtml();
//         }
//     });

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

const renderHtml = () => {
      render(myEmployees);
      fs.writeFile(outputPath, render(myEmployees), (error, file) => {
          if (error) {
        console.error("Something went wrong")
      }
          });
}
}

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

createEmployee();