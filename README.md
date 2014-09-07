![Raptorius Web Kit](https://cloud.githubusercontent.com/assets/7034281/4174853/30e93230-35ae-11e4-90de-5a0685079f5d.png)


# Raptorius Web Kit

Raptorius Web Kit is a convenient and functional template for your new web application. The main task Raptorius is automatic Assembly project, tracking file changes and a nice starter set of resources. In addition Raptorius includes tools to check your code for compliance with modern standards.

## Features

* Template for web application.
* Built-in server for testing.
* Sync browsers (BrowserSync).
* Validation of files.
* Support for CSS preprocessor Less.
* Automatic placement of browser prefixes.
* Sorting CSS properties.
* Minify and concatenate resources.

> **Attention!**
> 
> RWK involves the full use of CSS preprocessor Less.
> 
> If necessary, `.css` files can be used through the directory `styles/vendor/`. Using this approach means that the files cascading style sheets will not be checked for errors and warnings, properties will not be sorted and automatically hyphenate prefixes browsers does not work.
> 
> You must understand that there are no obstacles to use `.less` files `.css` files, i.e. without the use of features of the CSS preprocessor Less.

## Browser Support

Initially, Raptorius Web Kit supports prefixes for the following browser versions:

* Chrome 30 and more
* FF 30 and more
* Opera 21 and more
* Safari 7 and more
* IE9, IE10, IE11, IE Mobile 10
* iOS Safari 7 and more
* Android Chrome 4.2 and more
* BlackBerry 10 and more

You can easily add supported browsers by changing the variable `vendor_prefix` in file `Gruntfile.js`.

## Documentation & Installation

Go to the [Wiki page](https://github.com/mrmlnc/raptorius-web-kit/wiki) - there you'll find the answers to all your questions.

## History

For detailed changelog, check [Releases](https://github.com/mrmlnc/raptorius-web-kit/releases).

## License

MIT. 
The full text can be found in the file `Gruntfile.js`.

## License FAQ

Brief information about the license can be found [here](https://github.com/mrmlnc/raptorius-web-kit/wiki/License-FAQ).
