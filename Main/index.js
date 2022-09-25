const Employee = require('../src/Employee')
const Role = require('../src/Manager')



const inquirer = require('inquirer')
const fs = require('fs')

 async function promptUser() {
    await inquirer.prompt([
        {
            type: 'input',
            name: "managerName",
            message: 'What is the name of the team manager?',
        },
        {
            type: 'input',
            name: "managerId",
            message: "What is the team manager's ID?",
        },
        {
            type: 'input',
            name: "managerEmail",
            message: "What is the team manager's email?",
        },
        {
            type: 'number',
            name: "managerOffice",
            message: "What is the team manager's office number?"
        }
    ]).then((answers) => fs.writeFileSync('index.html', initialHTML(answers)))

}

async function menu() {
    
    await inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do now?',
            choices: ['Add engineer', 'Add intern', 'Assemble team']
        }
    ])
        .then(async (answers) => {
            console.log('answers')
            let newAnswers = answers.menu
            switch (newAnswers) {
                case 'Add engineer': {
                    await createEngineer()
                    break
                }
                case 'Add intern': {
                    await createIntern()
                    break
                }
                case 'Assemble team': {
                    fs.appendFile('index.html', finishHTML(), (err) => {
                        if(err) {
                            console.log(err)
                        }
                    })
                    break
                }
            }
        })

}

const initialHTML = ({managerName, managerId, managerEmail, managerOffice}) =>
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./Main/normalize.css">
        <link rel="stylesheet" href="./Main/skeleton.css">
        <title>Team Assembly</title>
    </head>
    <body>
        <div>
            <div class="three columns" id="box">
                <h1>${managerName}</h1>
                <h2>Manager</h2>
                <ul>
                    <li>ID: ${managerId}</li>
                    <li>Email: ${managerEmail}</li>
                    <li>Office Number: ${managerOffice}</li>
                </ul>
             </div>`

const engineerHTML = ({engineerName, engineerId, engineerEmail, engineerGithub}) => 
    `<div class="three columns" id="box">
        <h1>${engineerName}</h1>
        <h2>Engineer</h2>
        <ul>
            <li>${engineerId}</li>
            <li>${engineerEmail}</li>
            <li>${engineerGithub}</li>
        </ul>
    </div>`

const internHTML = ({internName, internId, internEmail, internGithub}) => 
    `<div class="three columns" id="box">
        <h1>${internName}</h1>
        <h2>Intern</h2>
        <ul>
            <li>ID: ${internId}</li>
            <li>Email: ${internEmail}</li>
            <li>GitHub: ${internGithub}</li>
        </ul>
    </div>`

const finishHTML = () => 
    `</div>
    </body>
    </html>`


async function createEngineer() {
    await inquirer.prompt([
        {
            type: 'input',
            name: "engineerName",
            message: "What is the engineer?",
        },
        {
            type: 'input',
            name: "engineerId",
            message: "What is the engineer's ID?",
        },
        {
            type: 'input',
            name: "engineerEmail",
            message: "What is the engineer's email?",
        },
        {
            type: 'input',
            name: "engineerGithub",
            message: "What is the engineer's GitHub username?"
        }
    ])
        .then((answers) => {
            console.log(answers)
            fs.appendFile('index.html', engineerHTML(answers), (err) => {
                if (err) {
                    console.log(err)
                }
            }) 
            return;
        })
        menu()
}
    
async function createIntern() {
    await inquirer.prompt([
        {
            type: 'input',
            name: "internName",
            message: 'What is the intern?',
        },
        {
            type: 'input',
            name: "internId",
            message: "What is the intern's ID?",
        },
        {
            type: 'input',
            name: "internEmail",
            message: "What is the intern's email?",
        },
        {
            type: 'input',
            name: "internGithub",
            message: "What is the intern's GitHub username?"
        }
    ])
        .then((answers) => {
            fs.appendFile('index.html', internHTML(answers), (err) => {
                if (err) {
                    console.log(err)
                }
            })
        })
        menu()
    }

async function init() {
    await promptUser()
        .then(() => console.log('Started building HTML file...'))
        .catch((err) => console.error(err))
    await menu()
}

init()
