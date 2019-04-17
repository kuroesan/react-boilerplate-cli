const { prompt } = require('inquirer')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')

let tplList = require(`${__dirname}/../templates`)

const question = [
  {
    type: 'list',
    name: 'boilerpalte',
    message: 'select the boilerpalte of the project:',
    choices: [
      "react-next-antd-boilerplate",
      "react-antd-boilerplate",
      "react-antd-mobile-boilerplate",
    ]
  }
]

module.exports = prompt(question).then(({ boilerpalte }) => {
  const projectName = process.argv[3]
  const gitPlace = tplList[boilerpalte]
  const spinner = ora('Downloading Boilerplate...')
  spinner.start()

  download(`${gitPlace}`, `./${projectName}`, (err) => {
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }
    spinner.stop()
    console.log(chalk.green('New project has been initialized successfully!'))
  })

})
