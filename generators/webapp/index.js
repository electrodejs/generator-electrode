'use strict';
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });
  },

  writing: function () {
    const isHapi = this.config.get('serverType') === 'hapijs';
    this.fs.copyTpl(
      this.templatePath('server'),
      this.destinationPath(this.options.generateInto, 'server'),
      {isHapi},
      {},
      {
        globOptions: { ignore: [ isHapi ? '**/server/plugins/webapp/express-middleware.js' : '**/server/plugins/webapp/hapi-plugin.js' ] }
      }
    );
  }
});
