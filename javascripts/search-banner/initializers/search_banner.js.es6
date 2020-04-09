import { h } from 'virtual-dom';
import { on } from 'ember-addons/ember-computed-decorators';
import DiscourseURL from 'discourse/lib/url';
import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
  name : "search_banner",
  initialize(container) {

    withPluginApi('0.8.8', (api) => {

      api.modifyClass('component:site-header', {
        @on("didInsertElement")
        initializeAlgolia() {
          this._super();
          $("body").addClass("algolia-enabled");
        }
      });

      api.createWidget('algolia', {
        tagName: 'li.algolia-holder',
        html() {
          return [
            h('form', {
              action: 'http://seaerch.asktug.com/',
              method: 'GET'
            }, [
              h('input.aa-input#search-box', {
                name: "q",
                placeholder: "Search the forum...",
                autocomplete: "off"
              })
            ])
          ];
        }
      });

      api.decorateWidget('header-icons:before', function(helper) {
        return helper.attach('algolia');
      });

    });
  }
}
