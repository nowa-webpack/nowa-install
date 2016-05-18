/*
* @Author: gbk <ck0123456@gmail.com>
* @Date:   2016-04-21 17:34:00
* @Last Modified by:   gbk
* @Last Modified time: 2016-05-18 11:19:04
*/

'use strict';

var fs = require('fs');
var spawn = require('child_process').spawn;

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

  action: function(plugins) {
    if (!plugins.length) {
      plugins = defaultPlugins;
    }

    // run npm instal
    spawn('npm', [
      'install',
      '-g',
      '-d'
    ].concat(plugins.map(function(plugin) {
      return 'nowa-' + plugin;
    })), {
      stdio: 'inherit',
      stderr: 'inherit'
    });
  }
};
