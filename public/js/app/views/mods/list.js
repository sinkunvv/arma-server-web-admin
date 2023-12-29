var $ = require('jquery')
var _ = require('underscore')
var Marionette = require('marionette')
var BootstrapModal = require('backbone.bootstrap-modal')

var ListItemView = require('app/views/mods/list_item')
var DownloadFormView = require('app/views/mods/download/form')
var SearchFormView = require('app/views/mods/search/form')
var tpl = require('tpl/mods/list.html')

var template = _.template(tpl)

module.exports = Marionette.CompositeView.extend({
  childView: ListItemView,
  childViewContainer: 'tbody',
  template: template,

  events: {
    'click #download': 'download',
    'click #refresh': 'refresh',
    'click #search': 'search'
  },

  download: function (event) {
    event.preventDefault()
    var view = new DownloadFormView({ mods: this.collection })
    var modal = new BootstrapModal({
      content: view,
      animate: true,
      cancelText: 'Close',
      okText: 'Download'
    })
    view.modal = modal
    modal.open()
  },

  refresh: function (event) {
    event.preventDefault()
    $.ajax({
      url: '/api/mods/refresh',
      type: 'POST',
      success: function (resp) {

      },
      error: function (resp) {

      }
    })
  },

  search: function (event) {
    event.preventDefault()
    var view = new SearchFormView({ mods: this.collection })
    var modal = new BootstrapModal({
      content: view,
      animate: true,
      cancelText: 'Close',
      okText: 'Search'
    })
    view.modal = modal
    modal.open()
  }
})
