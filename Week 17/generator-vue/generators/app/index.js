var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  async initPackage() {
    let answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      },
    ]);

    const pkgJson = {
      "name": answers.name,
      "version": "1.0.0",
      "description": "",
      "main": "./main.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
    };
    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    this.npmInstall(["vue"], { 'save-dev': false });
    this.npmInstall(["webpack", "webpack-cli", "copy-webpack-plugin", "vue-loader", "css-loader", "vue-template-compiler"], { 'save-dev': true});
    this.answers = answers
  }

  initTemplate() {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      { title: this.answers.name }
    );
    this.fs.copyTpl(
      this.templatePath('HelloWorld.vue'),
      this.destinationPath('src/HelloWorld.vue'),
      {}
    );
    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('main.js'),
      {}
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js'),
      {}
    );
  }
};