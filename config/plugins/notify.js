/**
 * ## grunt-notify
 * Automatic desktop notifications
 *
 */

module.exports = {

  options: {
    title: 'Raptorius Web Kit'
  },

  run: {
    options: {
      message: 'Raptorius is ready!'
    }
  },

  build: {
    options: {
      message: 'Build is ready!'
    }
  }

};
