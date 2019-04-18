const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)

let tplList = require(`${__dirname}/../templates`)

const question = [
  {
    type: 'list',
    name: 'name',
    message: 'Which boilerplate you want to delete:',
    choices: Object.keys(tplList)
  },

]

module.exports = prompt(question).then(({ name }) => {
  delete tplList[name]

  writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplList), 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
    listTable(tplList, 'Boilerplate has been deleted successfully!')
  })
})
