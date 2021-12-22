const moment = require('moment')

module.exports = {
    formatDate: function (date, format){
        return moment(date).format(format)
    },
    /**
     * takes in string and length logic cuts 
     * it to specified length and adds ellipses
     * @param {*} str 
     * @param {*} len 
     * @returns 
     */
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
          let new_str = str + ' '
          new_str = str.substr(0, len)
          new_str = str.substr(0, new_str.lastIndexOf(' '))
          new_str = new_str.length > 0 ? new_str : str.substr(0, len)
          return new_str + '...'
        }
        return str
      },
    /**
     * take input and replaces tags using 
     * regex, replace '' with nothing
     * @param {*} input 
     * @returns 
     */  
      stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')
      },
      /**
       * if storyu and loggedu id are same and if floating add edit icon or wrap icon
       * @param {*} storyUser 
       * @param {*} loggedUser 
       * @param {*} storyId 
       * @param {*} floating 
       * @returns 
       */
      editIcon: function (storyUser, loggedUser, storyId, floating = true) {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
          if (floating) {
            return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
          } else {
            return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
          }
        } else {
          return ''
        }
      },
      select: function (selected, options) {
        return options
          .fn(this)
          .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
          )
          .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
          )
      },
}