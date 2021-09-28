var _content = {

    title: function(title, subtitle) {
        $('.content-header h3').text(title);
        $('.content-header h3').append("<small>"+subtitle+"</small>");
    },

    header: function(html) {
        $('.content-header .actions').html(html);
    },

    render: function(data) {
        $('section.content').addClass("hide");
        $("#main-content").html(data).removeClass("hide");
    },

    loader: function(type) {
        if (!_system.isNull(type)) {
            _content.render(this.message("ops...", _system.msgCode("errorConnection"), "danger"));
        } else {
            _content.render("<div class='overlay text-center'><i class='fa fa-gear fa-3x fa-spin'></i></div>");
        }
    },

    message: function(title, message, type) {
        return "<div class='callout callout-"+type+"'><h4>"+title+"</h4><p>"+message+"</p></div>";
    }

}
