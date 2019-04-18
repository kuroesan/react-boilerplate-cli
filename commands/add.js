const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)

let tplList = require(`${__dirname}/../templates`)

const question = [
  {
    type: 'input',
    name: 'name',
    message: 'Set the custom name of the boilerplate:',
    validate(val) {
      if (tplList[val]) {
        return 'Boilerplate is existed!'
      } else if (val === '') {
        return 'Name is required!'
      } else {
        return true
      }
    }
  },
  {
    type: 'list',
    name: 'repository',
    message: 'Select the Repository:',
    choices: [
      "github",
      "gitlab",
      "bitbucket",
    ]
  },
  {
    type: 'input',
    name: 'place',
    message: 'Owner/name of the boilerplate:',
    validate(val) {
      if (val !== '') {
        return true
      }
      return 'Owner/name is required!'
    }
  }
]

module.exports = prompt(question).then(({ name, repository, place }) => {
  tplList[name] = `${repository}:${place}`

  writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplList), 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
    listTable(tplList, 'New boilerplate has been added successfully!')
  })
})
