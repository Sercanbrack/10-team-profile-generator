const Employee = require('./lib/Employee')
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const inquirer = require('inquirer')
const fs = require('fs')

 async function promptUser() {
    await inquirer.prompt([
        {
            type: 'input',
            name: "name",
            message: "'What is the team manager's name?",
        },
        {
            type: 'input',
            name: "id",
            message: "What is the team manager's ID?",
        },
        {
            type: 'input',
            name: "email",
            message: "What is the team manager's email?",
        },
        {
            type: 'number',
            name: "office",
            message: "What is the team manager's office number?"
        }
    ]).then((answers) => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.office)
        fs.writeFileSync('./dist/index.html', initialHTML(manager), (err) => {
            console.log(err)
        })
    })

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
                    fs.appendFile('./dist/index.html', finishHTML(), (err) => {
                        if(err) {
                            console.log(err)
                        }
                    })
                    console.log('Team successfully assembled! Please check the dist folder for your newly generated team profile.')
                    break
                }
            }
        })

}

const initialHTML = (manager) =>
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./normalize.css">
        <link rel="stylesheet" href="./skeleton.css">
        <title>Team Assembly</title>
    </head>
    <body>
        <div>
            <div class="three columns" id="box">
                <h1>${manager.name}</h1>
                <h2>Manager</h2>
                <ul>
                    <li>ID: ${manager.id}</li>
                    <li>Email: ${manager.email}</li>
                    <li>Office Number: ${manager.office}</li>
                </ul>
             </div>`

const engineerHTML = (engineer) => 
    `
    <div class="three columns" id="box">
        <h1>${engineer.name}</h1>
        <h2>Engineer</h2>
        <ul>
            <li>ID: ${engineer.id}</li>
            <li>Email: ${engineer.email}</li>
            <li>GitHub Username: ${engineer.github}</li>
        </ul>
    </div>`

const internHTML = (intern) => 
    `
    <div class="three columns" id="box">
        <h1>${intern.name}</h1>
        <h2>Intern</h2>
        <ul>
            <li>ID: ${intern.id}</li>
            <li>Email: ${intern.email}</li>
            <li>Studying at: ${intern.school}</li>
        </ul>
    </div>`

const finishHTML = () => 
    `
    </div>
    </body>
    </html>`


async function createEngineer() {
    await inquirer.prompt([
        {
            type: 'input',
            name: "name",
            message: "What is the engineer's name?",
        },
        {
            type: 'input',
            name: "id",
            message: "What is the engineer's ID?",
        },
        {
            type: 'input',
            name: "email",
            message: "What is the engineer's email?",
        },
        {
            type: 'input',
            name: "github",
            message: "What is the engineer's GitHub username?"
        }
    ])
        .then((answers) => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
            fs.appendFile('./dist/index.html', engineerHTML(engineer), (err) => {
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
            name: "name",
            message: "'What is the intern's name?",
        },
        {
            type: 'input',
            name: "id",
            message: "What is the intern's ID?",
        },
        {
            type: 'input',
            name: "email",
            message: "What is the intern's email?",
        },
        {
            type: 'input',
            name: "school",
            message: "What school or university is the intern studying at?"
        }
    ])
        .then((answers) => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
            fs.appendFile('./dist/index.html', internHTML(answers), (err) => {
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
