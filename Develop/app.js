const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Empty array of employees

const myEmployees = [];

// function to create employee

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

//function if employee is intern

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
//function if employee is manager

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

//function if employee is engineer

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

//function to check for more employees

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

//function to render html

const renderHtml = () => {
        render(myEmployees);
        fs.writeFile(outputPath, render(myEmployees), (error, file) => {
            if (error) {
          console.error("Something went wrong!")
          }
      });
   }
}

// call function to create employee

createEmployee();