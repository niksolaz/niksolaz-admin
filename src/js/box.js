var _box = {

    lastRender: null,

    create: function(title, content) {

        this.lastRender = '\n\
        <div class="row">\n\
          <div class="col-xs-12">\n\
            <div class="box">\n\
              <!--<div class="box-header">\n\
                <h3 class="box-title">'+title+'</h3>\n\
              </div>-->\n\
              <div class="box-body">\n\
                '+content+'\n\
              </div>\n\
            </div>\n\
          </div>\n\
        </div>\n\
        ';

        return this.lastRender;
    },

}
