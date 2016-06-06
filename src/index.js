/*
* @Author: gbk <ck0123456@gmail.com>
* @Date:   2016-04-21 17:34:00
* @Last Modified by:   gbk
* @Last Modified time: 2016-06-06 12:41:38
*/

'use strict';

var path = require('path');
var execSync = require('child_process').execSync;

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

    var config = {
      registry: options.registry || 'https://registry.npm.taobao.org',
      pkgs: plugins.map(function(plugin) {
        return {
          name: !/^nowa\-/.test(plugin) ? 'nowa-' + plugin : plugin,
          version: 'latest'
        };
      })
    };
    var npmPrefix = execSync('npm config get prefix').toString().trim();
    if (process.platform === 'win32') {
      config.targetDir = npmPrefix;
      config.binDir = npmPrefix;
    } else {
      config.targetDir = path.join(npmPrefix, 'lib');
      config.binDir = path.join(npmPrefix, 'bin');
    }

    npminstall(config);
  }
};
