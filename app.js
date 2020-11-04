//global variables and required libraries

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
//output creates the file in the appropriate directory
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
//requires pre-built htmlRenderer
const render = require("./lib/htmlRenderer");

// variables to create objects for each team member type 
const teamMembers = [];
const arrayId = [];

function teamMenu() {
    function  createTeam(){
       
       //inquirer prompt creates relevant function based on user's selected team member type
        inquirer.prompt([
            {
                type:"list",
                name: "teamChoice",
                message:"Which type of team member would you like to add?",
                choices:[
                    "Engineer",
                    "Intern",
                    "I do not want any more employees. Show me my team!"
                ]
            }
        ]).then(chosen =>
            {
                switch(chosen.teamChoice){
                    case "Engineer":
                        createEngineer();
                        break;
                    case "Intern":
                        createIntern();
                        break;
                    default:
                        buildTeam();
                }
    });
  // provides prompt to user for manager info
    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the name of your manager?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid name for your manager."
                }
            },
            {
                type: "input",
                name: "managerID",
                message: "What is your manager's ID?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid manager ID"
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email address?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid email address"
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your manager's office phone number?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid phone number"
                }
            }
        ]) .then(answers => {
            const manager = newManager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
            teamMembers.push(manager)
            arrayId.push(answers.managerID)
        })
    }

    //creates prompts for user to enter information if user desires to add engineer to team
    function createEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid name"
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your engineer's ID?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid ID"
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email address?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid email"
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's Github?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid Github"
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
            teamMembers.push(engineer)
            arrayId.push(answers.engineerId)
            
        })
    }

    //creates prompts for user to enter information if user desires to add intern to team
    function createIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid name"
                }
            },
            {
                type: "input",
                name: "internID",
                message: "What is your intern's ID?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid ID"
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email address?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid email address"
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What school does your intern attend?",
                validate: answer => {
                    if(answer !== "") {
                        return true
                    }

                    return "Please enter a valid school"
                }
            }
        ]).then(answers => {
            const inter = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
            teamMembers.push(intern)
            arrayId.push(answers.internId)
            // run a function here that creates the entire "team" prompting you to create another employee
        })
    }

    function buildTeam() {
        // creates html document and writes team members to file
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
      }
}
teamMenu()