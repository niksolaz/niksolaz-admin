var _menu = {

    data: null,
    result: null,
    menuDivId: "#nav-menu",

    init: function() {
        this.data = _dataMenu[_config.admin.role];
        this.compose();
    },

    compose: function() {
        this.result = "<ul class='sidebar-menu'>";
        var tempContainer = "";
        for (var i = 0; i<this.data.length; i++) {
            var node = this.data[i];
            if (node['container'] != tempContainer) {
                tempContainer = node['container'];
                this.result += '<li class="header">'+_system.label(tempContainer)+'</li>';
            }
            this.result += '\n\
                <li class="'+(this.hasNodes(node) ? "treeview" : "")+'">\n\
                    <a href="#" action="'+node['action']+'">\n\
                        <i class="'+node['icon']+'"></i> <span>'+_system.label(node['label'])+'</span>\n\
                        <span class="pull-right-container">\n\
                          '+(this.hasNodes(node) ? '<i class="fa fa-angle-down pull-right">' : "")+'</i>\n\
                        </span>\n\
                    </a>\n\
                    '+(this.hasNodes(node) ? this.nodes(node['nodes']) : "")+'\n\
                </li>\n\
            ';
        }
        this.result += "</ul>";
        $(this.menuDivId).html(this.result);
    },

    nodes: function(nodes) {
        var htmlReturn = "<ul class='treeview-menu'>";
        for (var i = 0; i < nodes.length; i++) {
            htmlReturn += '<li><a href="#" action="'+nodes[i]['action']+'"><i class="'+nodes[i]['icon']+'"></i> '+_system.label(nodes[i]['label'])+'</a></li>';
        }
        htmlReturn += "</ul>";
        return htmlReturn;
    },

    hasNodes: function(node) {
        return (node['nodes'] !== undefined && node['nodes'].length > 0 ? true : false);
    }

}
