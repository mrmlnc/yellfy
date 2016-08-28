<p align="right"><a href="README.md">Back to contents</a> | English version | <a href="../ru/installing.md">Русская версия</a></p>

<img src="https://cloud.githubusercontent.com/assets/7034281/17823638/3327fc26-6666-11e6-8303-4b6411882ab1.png" align="right"/>

# Installing and updating

Yellfy requires a modern version of [Node.js](http://nodejs.org/) (only v6.0.0+) and globally installed [gulp-cli](http://gulpjs.com/) and [bower](http://bower.io/).

```shell
$ npm i -g gulp-cli bower
```




<br/>
## Command-line utility

To simplify the process of deploying a new instance of the Yellfy has been developed command line utility ([yellfy-cli](https://github.com/mrmlnc/yellfy-cli)).

```shell
$ npm i -g yellfy-cli
```

You can get detailed information about the capabilities of this tool by visiting [yellfy-cli](https://github.com/mrmlnc/yellfy-cli) repository or using the command `yellfy -h`.




<br/>
## Other ways

In addition to command-line utility you can manually download the latest stable release Yellfy from [page releases section of this GitHub project](https://github.com/mrmlnc/yellfy/releases). You can also use GitHub or Git client.

```shell
$ git clone git://github.com/mrmlnc/yellfy projectName
```




<br/>
## Fixing versions of dependencies

To guarantee stable work in Yellfy used strict fixation versions of total dependency tree. In case if you want to add or update packages, you can manually update the file `npm-shrinkwrap.json` or recreate it, using the command `npm shrinkwrap --dev`.

Also you can remove the file `npm-shrinkwrap.json`,  to return to the familiar system of obtaining versions of dependencies.




<br/>
## Updating Yellfy

In accordance with the policy of versioning [semver](http://semver.org/) you can safely update the service files of Yellfy within the major version numbers. Each version is accompanied by a list of changes and instructions for updating.
