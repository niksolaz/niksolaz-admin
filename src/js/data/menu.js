var _dataMenu = {
    "UserSuperAdmin": [{}],
    "UserAdmin": [

        {
            "label": "Dashboard",
            "action": "_dashboard.render()",
            "icon": "fa fa-dashboard",
            "container": "Products",
            "nodes": []
        },
        {
            "label": "Product",
            "action": "#",
            "icon": "fa fa-handshake-o",
            "container": "Products",
            "nodes": [
                {
                    "label": "Accettati",
                    "action": "_section.grid('products','status','live')",
                    "icon": "fa fa-table"
                },
                {
                    "label": "In Creazione",
                    "action": "_section.grid('products','status','created')",
                    "icon": "fa fa-table"
                }
            ]
        },
        {
            "label": "Transactions",
            "action": "#",
            "icon": "fa fa-money",
            "container": "Projects",
            "nodes": [{
                    "label": "All",
                    "action": "_section.grid('transactions')",
                    "icon": "fa fa-table"
                }
            ]
        },
        {
            "label": "Users",
            "action": "#",
            "icon": "fa fa-id-card-o",
            "container": "Administration",
            "nodes": [{
                    "label": "Tutti",
                    "action": "_section.grid('users','is_active',true)",
                    "icon": "fa fa-table"
                },
                {
                    "label": "Amministratori",
                    "action": "_section.grid('users','is_admin',true)",
                    "icon": "fa fa-table"
                }
            ]
        },
        {
            "label": "Configurations",
            "action": "#",
            "icon": "fa fa-cog",
            "container": "Administration",
            "nodes": [{
                    "label": "Website Config",
                    "action": "_section.config('configs')",
                    "icon": "fa fa-table"
                },
                {
                    "label": "Languages",
                    "action": "_section.grid('languages')",
                    "icon": "fa fa-table"
                },
                {
                    "label": "Forms",
                    "action": "_section.grid('forms')",
                    "icon": "fa fa-table"
                },
                {
                    "label": "Email transazionali",
                    "action": "_section.grid('mails')",
                    "icon": "fa fa-table"
                },
                {
                    "label": "Label di sistema",
                    "action": "_section.grid('labels')",
                    "icon": "fa fa-table"
                }
            ]
        },
        {
            "label": "Sections",
            "action": "_section.sections()",
            "icon": "fa fa-sitemap",
            "container": "Content website",
            "nodes": []
        },
        {
            "label": "Articles",
            "action": "_section.grid('articles')",
            "icon": "fa fa-newspaper-o",
            "container": "Content website",
            "nodes": []
        },
    ]
}