require('less/toast.less');
var $ = require('jquery')
function Toast (msg, time) {
  this.msg = msg
  this.dismissTime = time || 1000
  this.createToast()
  this.showToast()
}

Toast.prototype = {
  createToast: function() {
    var tpl = '<div class="toast">' + this.msg + '</div>'
    this.$toast = $(tpl)
    $('body').append(this.$toast)
  },
  showToast: function() {
    var self = this
    this.$toast.fadeIn(300, function() {
      setTimeout(function() {
        self.$toast.fadeOut(300, function() {
          self.$toast.remove()
        })
      }, self.dismissTime)
    })
  }
}

function ToastMsg(msg, time) {
  return new Toast(msg, time)
}
window.Toast = ToastMsg
module.exports.Toast = ToastMsg
