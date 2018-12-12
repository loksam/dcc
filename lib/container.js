
const inquirer = require('inquirer');
const exec = require('child_process').exec;

module.exports = function () {
  var container = [];

  exec("docker ps -a --format '{{.ID}}\t{{.Image}}:{{.Names}}\t{{.Command}}'", (err, stdout, stderr) => {
    if (!err) {
      var lines = stdout.toString().split('\n');
      lines.pop();
      container.push(new inquirer.Separator(' ----------- Docker container ----------- '));
      lines.forEach(function (c) {
        container.push({ 'name': c });
      });

      inquirer.prompt([
        {
          type: "checkbox",
          message: "Select delete docker container",
          name: "container",
          choices: container
        }
      ]).then(answers => {

        answers.container.forEach(function (c) {
          var i = c.split('\t');
          var id = i[0];
          exec("docker container rm -f " + id, (err, stdout, stderr) => {
            if (!err) {
              console.log(stdout);
            }
          });
        });
      });
    }
  });

};
