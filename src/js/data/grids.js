var _dataGrids = {

    "users": {
        "title": "Users",
        "header": [
            "Name",
            "Surname",
            "E-mail",
            "Created at",
            "Active",
            "Admin"
        ],
        "action": {
            "create": true,
            "edit": true,
            "delete": true
        },
        "fields": [{
                "field": "firstname",
                "type": "varchar"
            },
            {
                "field": "lastname",
                "type": "varchar"
            },
            {
                "field": "email",
                "type": "varchar"
            },
            {
                "field": "created_at",
                "type": "date"
            },
            {
                "field": "is_active",
                "type": "check"
            },
            {
                "field": "is_admin",
                "type": "check"
            }
        ]
    },

    "logs/actions": {
        "title": "Log",
        "header": [
            "Name",
            "Surname",
            "E-mail",
            "Method",
            "Action",
            "Description",
            "Date",
            "Time",
        ],
        "action": {
            "create": false,
            "edit": false,
            "delete": true
        },
        "fields": [{
                "field": "user-firstname",
                "type": "varchar"
            },
            {
                "field": "user-lastname",
                "type": "varchar"
            },
            {
                "field": "user-email",
                "type": "email"
            },
            {
                "field": "method",
                "type": "varchar"
            },
            {
                "field": "action",
                "type": "varchar"
            },
            {
                "field": "description",
                "type": "varchar"
            },
            {
                "field": "created_at",
                "type": "date"
            },
            {
                "field": "created_at",
                "type": "time"
            },
        ]
    },

    "products": {
        "title": "Products",
        "header": [
            "Product",
            "Category",
            "Subcategory",
            "Status",
            "Is Visible"
        ],
        "action": {
            "create": true,
            "edit": true,
            "delete": true,
        },
        "fields": [{
                "field": "title-it",
                "type": "varchar"
            },
            {
                "field": "category",
                "type": "varchar"
            },
            {
                "field": "subcategory",
                "type": "varchar"
            },
            {
                "field": "status",
                "type": "varchar"
            },
            {
                "field": "is_visible",
                "type": "check"
            }
        ]
    },

    "transactions": {
        "title": "Transactions",
        "header": [
            "Name",
            "Surname",
            "Email",
            "Product",
            "Amount"
        ],
        "action": {
            "create": true,
            "edit": true,
            "delete": true
        },
        "fields": [{
                "field": "user-firstname",
                "type": "varchar"
            },
            {
                "field": "user-lastname",
                "type": "varchar"
            },
            {
                "field": "user-email",
                "type": "varchar"
            },
            {
                "field": "product-title",
                "type": "varchar"
            },
            {
                "field": "amount",
                "type": "number"
            }
        ]
    },
    "sections": {
        "title": "Sections",
        "header": [
            "Section",
            "Reserved",
            "Active",
        ],
        "action": {
            "create": true,
            "edit": true,
            "delete": true
        },
        "fields": [{
                "field": "section",
                "type": "varchar"
            },
            {
                "field": "is_reserved",
                "type": "check"
            },
            {
                "field": "is_active",
                "type": "check"
            },
        ]
    },

    "articles": {
        "title": "Articles",
        "header": [
            "Title",
            "Date",
            "Section",
            "Active",
            "Aggiornato il",
        ],
        "action": {
            "create": true,
            "edit": true,
            "delete": true,
            "custom": {
                "preview": {
                    "label": "Preview Online",
                    "action": "preview",
                    "icon": "eye",
                    "color": "#f39c12"
                }
            }
        },
        "fields": [{
                "field": "title",
                "type": "varchar"
            },
            {
                "field": "date",
                "type": "date"
            },
            {
                "field": "sections_id",
                "type": "select",
                "services": {
                    "get": "sections",
                    "label": "section"
                }
            },
            {
                "field": "is_active",
                "type": "check"
            },
            {
                "field": "updated_at",
                "type": "datetime"
            },
        ]
    },
    "labels": {
        "title": "Labels",
        "header": [
            "Label",
            "Traduzione",
        ],
        "action": {
            "create": true,
            "edit": true,
            "delete": true
        },
        "fields": [{
            "field": "label",
            "type": "varchar"
        }, {
            "field": "language-en",
            "type": "varchar"
        }, ]
    },

    "mails": {
        "title": "Mails",
        "header": [
            "Code",
            "Title",
        ],
        "action": {
            "create": true,
            "edit": true,
            "delete": true
        },
        "fields": [{
                "field": "code",
                "type": "varchar"
            },
            {
                "field": "title-it",
                "type": "varchar"
            }
        ]
    },

    "languages": {
        "title": "Languages",
        "header": [
            "Code",
            "Language",
            "Active",
        ],
        "action": {
            "create": true,
            "edit": true,
            "delete": true
        },
        "fields": [{
                "field": "code",
                "type": "varchar"
            },
            {
                "field": "language",
                "type": "varchar"
            },
            {
                "field": "is_active",
                "type": "check",
            },
        ]
    },
    "disactives": {
        "title": "Disactives",
        "header": [
            "Name",
            "Email",
            "Date",
        ],
        "action": {
            "create": false,
            "edit": true,
            "delete": true
        },
        "fields": [{
                "field": "name",
                "type": "varchar"
            },
            {
                "field": "email",
                "type": "email",
            },
            {
                "field": "created_at",
                "type": "date",
            },
        ]
    },

    "forms": {
        "title": "Forms",
        "header": [
            "Form",
            "Email Admin",
            "Active",
        ],
        "action": {
            "create": true,
            "edit": true,
            "delete": true
        },
        "fields": [{
                "field": "title",
                "type": "varchar"
            },
            {
                "field": "email",
                "type": "email"
            },
            {
                "field": "is_active",
                "type": "check"
            },
        ]
    },

}