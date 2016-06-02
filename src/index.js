/*
* @Author: gbk <ck0123456@gmail.com>
* @Date:   2016-04-21 17:34:00
* @Last Modified by:   gbk
* @Last Modified time: 2016-06-01 10:21:14
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

  options: [
    [ '-r, --registry <registry>', 'change npm registry', 'https://registry.npm.taobao.org' ]
  ],

  action: function(plugins, options) {
    if (!plugins.length) {
      plugins = defaultPlugins;
    }

    // run npm instal
    var opts = [
      'install',
      '-g',
      '-d'
    ];
    if (options.registry) {
      opts.push('--registry=' + options.registry);
    }
    spawn('npm', opts.concat(plugins.map(function(plugin) {
      return !/^nowa\-/.test(plugin) ? 'nowa-' + plugin : plugin;
    })), {
      stdio: 'inherit',
      stderr: 'inherit'
    });
  }
};
