/*
* @Author: gbk <ck0123456@gmail.com>
* @Date:   2016-04-21 17:34:00
* @Last Modified by:   gbk
* @Last Modified time: 2016-06-23 21:08:37
*/

'use strict';

var path = require('path');

var co = require('co');
var npminstall = require('npminstall');

var pkg = require('../package.json');

// default plugin list
var defaultPlugins = [
  'init',
  'build',
  'lib',
  'server'
];

// plugin defination
module.exports = {

  command: 'install [plugins...]',

  description: pkg.description,

  options: [
    [ '-r, --registry <registry>', 'change npm registry' ]
  ],

  action: function(plugins, options) {
    if (!plugins.length) {
      plugins = defaultPlugins;
    }

    // npminstall config
    var config = {
      root: process.cwd(),
      pkgs: plugins.map(function(plugin) {
        return {
          name: !/^nowa\-/.test(plugin) ? 'nowa-' + plugin : plugin,
          version: 'latest'
        };
      })
    };
    console.log('Installing ' + config.pkgs.map(function(pkg) {
      return pkg.name;
    }).join(' ') + ' ...');

    // change registry
    if (options.registry) {
      config.registry = options.registry;

      // force build fsevent locally
      if (process.platform === 'darwin') {
        process.env.npm_config_fse_binary_host_mirror = 'http://127.0.0.1';
      }
    }

    // set peer install dir
    var npmPrefix = path.join(this.parent._moduleDirs[1], '..');
    config.targetDir = npmPrefix;
    config.binDir = process.platform === 'win32' ? npmPrefix : path.join(npmPrefix, '..', 'bin');

    // run npm install
    co(function*() {
      yield npminstall(config);
    }).catch(function(err) {
      console.log(err.stack)
    });
  }
};
