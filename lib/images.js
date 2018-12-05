
const inquirer = require('inquirer');
const exec = require('child_process').exec;

module.exports = function () {
  var images = [];

  exec("docker images --format '{{.ID}}\t{{.Repository}}:{{.Tag}}\t{{.Size}}'", (err, stdout, stderr) => {
    if (!err) {
      var lines = stdout.toString().split('\n');
      lines.shift();
      lines.pop();
      images.push(new inquirer.Separator(' ----------- Docker images ----------- '));
      lines.forEach(function (image) {
        images.push({ 'name': image });
      });

      inquirer.prompt([
        {
          type: "checkbox",
          message: "Select delete docker images",
          name: "images",
          choices: images
        }
      ]).then(answers => {

        answers.images.forEach(function (image) {
          var i = image.split('\t');
          var id = i[0];
          exec("docker rmi -f " + id, (err, stdout, stderr) => {
            if (!err) {
              console.log(stdout);
            }
          });
        });
      });
    }
  });

};
