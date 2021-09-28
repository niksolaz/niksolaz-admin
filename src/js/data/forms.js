var _dataForms = {

    "configs": {

        "title": {
            "create": "Add Config",
            "edit": "Edit Config"
        },
        "fields": [{
                "Main": [{
                        "id": "name",
                        "label": "System name",
                        "type": "varchar",
                        "length": 50,
                        "mandatory": true,
                    },
                    {
                        "id": "website",
                        "label": "Url website",
                        "type": "varchar",
                        "length": 50,
                        "mandatory": true,
                    },
                    {
                        "id": "email_admin",
                        "label": "Admin Email",
                        "type": "varchar",
                        "length": 100,
                        "mandatory": true,
                    },
                    {
                        "id": "logo",
                        "label": "Logo",
                        "type": "image",
                        "length": null,
                        "mandatory": true,
                    },
                    {
                        "img:IT": [{
                            "id": "copyright-it",
                            "label": "Copyright",
                            "type": "varchar",
                            "length": 50,
                            "mandatory": false,
                        }, {
                            "id": "address-it",
                            "label": "Address",
                            "type": "html",
                            "length": null,
                            "mandatory": false,
                        }],
                        "img:EN": [{
                            "id": "copyright-en",
                            "label": "Copyright",
                            "type": "varchar",
                            "length": 50,
                            "mandatory": false,
                        }, {
                            "id": "footer-en",
                            "label": "Footer description",
                            "type": "html",
                            "length": null,
                            "mandatory": false,
                        }],
                    }
                ]
            }, {
                "Mail Template": [{
                        "id": "mail-sender",
                        "label": "Sender",
                        "type": "varchar",
                        "mandatory": false,
                    },
                    {
                        "id": "mail-template",
                        "label": "Template HTML",
                        "type": "html",
                        "mandatory": false,
                    },
                ]
            }, {
                "Banner Template": [{
                        "id": "banner-title",
                        "label": "Titolo del banner",
                        "type": "text",
                        "length": 255,
                        "mandatory": false,
                    },
                    {
                        "id": "banner-link",
                        "label": "Testo link del banner",
                        "type": "varchar",
                        "width": 50,
                        "length": 255,
                        "mandatory": false,
                    },
                    {
                        "id": "banner-url",
                        "label": "URL del banner",
                        "type": "varchar",
                        "width": 50,
                        "length": 255,
                        "mandatory": false,
                    },
                    {
                        "id": "banner-visible",
                        "label": "Banner visibile in Homepage",
                        "type": "check",
                        "mandatory": false,
                    }
                ]
            }, {
                "Meta Tags": [{
                    "img:IT": [{
                            "id": "meta-title-it",
                            "label": "META Title",
                            "type": "varchar",
                            "length": 255,
                            "mandatory": false,
                        },
                        {
                            "id": "meta-description-it",
                            "label": "META Description",
                            "type": "text",
                            "mandatory": false,
                        },
                        {
                            "id": "meta-image-it",
                            "label": "Share image",
                            "type": "image",
                            "mandatory": false,
                        }
                    ],
                    "img:EN": [{
                            "id": "meta-title-en",
                            "label": "META Title",
                            "type": "varchar",
                            "length": 255,
                            "mandatory": false,
                        },
                        {
                            "id": "meta-description-en",
                            "label": "META Description",
                            "type": "text",
                            "mandatory": false,
                        },
                        {
                            "id": "meta-image-en",
                            "label": "Share image",
                            "type": "image",
                            "mandatory": false,
                        }
                    ],
                }]
            },
            {
                "Termini e Condizioni": [{
                        "id": "terms-date",
                        "label": "Data ultima modifica",
                        "type": "date",
                        "length": 255,
                        "mandatory": false,
                    },
                    {
                        "img:IT": [{
                            "id": "terms-description",
                            "label": "Termini e Condizioni da accettare",
                            "type": "html",
                            "length": 255,
                            "mandatory": false,
                        }],
                        "img:EN": [{
                            "id": "terms-description_en",
                            "label": "Termini e Condizioni da accettare",
                            "type": "html",
                            "length": 255,
                            "mandatory": false,
                        }],
                    }
                ]
            }
        ]

    },

    "communications": {

        "title": {
            "create": "Add Communication",
            "edit": "Edit Communication"
        },
        "fields": [{
                "id": "sender_id",
                "label": "Inviato da",
                "type": "varchar",
                "width": 33,
                "length": null,
                "mandatory": true
            },
            {
                "id": "email",
                "label": "Email",
                "type": "varchar",
                "width": 33,
                "mandatory": true,
            },
            {
                "id": "name",
                "label": "Nominativo",
                "type": "varchar",
                "width": 33,
                "mandatory": true,
            },
            {
                "id": "users_id",
                "label": "Ricevuto da",
                "type": "varchar",
                "width": 33,
                "length": null,
                "mandatory": true
            },
            {
                "id": "type",
                "label": "Tipo Comunicazione",
                "type": "select",
                "length": null,
                "width": 33,
                "mandatory": true,
                "values": [{
                        "value": "qea",
                        "label": "Q&A"
                    },
                    {
                        "value": "team",
                        "label": "TEAM"
                    },
                ]
            },
            {
                "id": "projects_id",
                "label": "Progetto",
                "type": "select_static",
                "length": null,
                "width": 33,
                "mandatory": true,
                "services": {
                    "get": "projects",
                    "id": null,
                    "label": "title-it"
                }
            },
            {
                "id": "title",
                "label": "Title",
                "type": "varchar",
                "length": 255,
                "mandatory": true,
            },
            {
                "id": "request",
                "label": "Messaggio",
                "type": "text",
                "mandatory": true,
            },
            {
                "id": "communications_id",
                "label": "ID comunicazione di replica",
                "type": "varchar",
                "length": 50,
                "mandatory": false,
            },
            {
                "id": "avatar",
                "label": "Immagine sender",
                "type": "image",
                "mandatory": false,
            },
            {
                "id": "is_active",
                "label": "Visibile online",
                "type": "check",
                "mandatory": false,
                "width": 100,
            },
        ]

    },

    "users": {

        "title": {
            "create": "Add User",
            "edit": "Edit User"
        },
        "fields": [{
                "Main": [{
                        "id": "email",
                        "label": "E-mail",
                        "type": "mail",
                        "length": 50,
                        "width": 50,
                        "mandatory": false,
                    },
                    {
                        "id": "password",
                        "label": "New Password",
                        "type": "password",
                        "length": 50,
                        "width": 50,
                        "mandatory": false,
                    },
                    {
                        "id": "firstname",
                        "label": "Name",
                        "type": "varchar",
                        "width": 50,
                        "length": 50,
                        "mandatory": false,
                    },
                    {
                        "id": "lastname",
                        "label": "Surname",
                        "type": "varchar",
                        "width": 50,
                        "length": 50,
                        "mandatory": false,
                    },
                    {
                        "id": "is_active",
                        "label": "Active",
                        "type": "check",
                        "length": null,
                        "mandatory": false,
                    },
                    {
                        "id": "is_admin",
                        "label": "Admin",
                        "type": "check",
                        "length": null,
                        "mandatory": false,
                    }
                ]
            }
        ]
    },
    "disactives": {

        "title": {
            "create": "Add Disactive",
            "edit": "Edit Disactive"
        },
        "fields": [{
            "Main": [{
                "id": "description",
                "label": "Motivo della disattivazione",
                "type": "text",
                "width": 100,
                "length": 100,
                "mandatory": false,
            }, {
                "id": "name",
                "label": "Nominativo",
                "type": "varchar",
                "width": 50,
                "length": 50,
                "mandatory": false,
            }, {
                "id": "email",
                "label": "Email",
                "type": "mail",
                "width": 50,
                "length": 50,
                "mandatory": false,
            }]
        }]
    },

    "languages": {

        "title": {
            "create": "Add Language",
            "edit": "Edit Language"
        },
        "fields": [{
                "id": "code",
                "label": "Language Code",
                "type": "varchar",
                "length": 2,
                "key": true,
                "mandatory": true,
            },
            {
                "id": "language",
                "label": "Language",
                "type": "varchar",
                "length": 20,
                "mandatory": true,
            },
            {
                "id": "is_active",
                "label": "Active",
                "type": "check",
                "length": null,
                "mandatory": false,
            },
        ]

    },

    "labels": {

        "title": {
            "create": "Add Label",
            "edit": "Edit Label"
        },
        "fields": [{
                "id": "label",
                "label": "Template label",
                "type": "varchar",
                "length": 1000,
                "mandatory": true,
            },
            {
                "img:IT": [{
                    "id": "language-it",
                    "label": "Label",
                    "type": "varchar",
                    "length": 1000,
                    "mandatory": false,
                }],
                "img:EN": [{
                    "id": "language-en",
                    "label": "Label",
                    "type": "varchar",
                    "length": 1000,
                    "mandatory": false,
                }],
            }
        ]

    },

    "mails": {

        "title": {
            "create": "Add Email",
            "edit": "Edit Email"
        },
        "fields": [{
                "id": "code",
                "label": "Code Message",
                "type": "varchar",
                "length": 50,
                "key": true,
                "mandatory": true,
            },
            {
                "img:IT": [{
                        "id": "title-it",
                        "label": "Title",
                        "type": "varchar",
                        "length": 100,
                        "mandatory": true,
                    },
                    {
                        "id": "message-it",
                        "label": "Message",
                        "type": "html",
                        "mandatory": true,
                    }
                ],
                "img:EN": [{
                        "id": "title-en",
                        "label": "Title",
                        "type": "varchar",
                        "length": 100,
                        "mandatory": false,
                    },
                    {
                        "id": "message-en",
                        "label": "Message",
                        "type": "html",
                        "mandatory": false,
                    }
                ],
            }

        ]
    },

    "messages": {

        "title": {
            "create": "Add Message",
            "edit": "Edit Message"
        },
        "fields": [{
            "Main": [{
                    "id": "code",
                    "label": "Code Message",
                    "type": "varchar",
                    "length": 50,
                    "key": true,
                    "mandatory": true,
                },
                {
                    "img:IT": [{
                            "id": "title-it",
                            "label": "Title",
                            "type": "varchar",
                            "length": 255,
                            "mandatory": true,
                        },
                        {
                            "id": "message-it",
                            "label": "Description",
                            "type": "html",
                            "length": null,
                            "mandatory": true,
                        }
                    ],
                    "img:EN": [{
                            "id": "title-en",
                            "label": "Title",
                            "type": "varchar",
                            "length": 255,
                            "mandatory": false,
                        },
                        {
                            "id": "message-en",
                            "label": "Description",
                            "type": "html",
                            "length": null,
                            "mandatory": false,
                        }
                    ],
                }
            ],
        }, {
            "Redirect": [{
                    "id": "redirect_url",
                    "label": "Redirect Url",
                    "type": "varchar",
                    "length": 255,
                    "mandatory": false,
                },
                {
                    "id": "redirect_after",
                    "label": "Redirect After",
                    "type": "select",
                    "length": null,
                    "mandatory": false,
                    "values": [{
                            "value": "0",
                            "label": "Immediately"
                        },
                        {
                            "value": "5",
                            "label": "After 5 seconds"
                        },
                        {
                            "value": "10",
                            "label": "After 10 seconds"
                        },
                        {
                            "value": "30",
                            "label": "After 30 seconds"
                        },
                    ]
                },
            ]
        }]

    },

    "sections": {

        "title": {
            "create": "Add Section",
            "edit": "Edit Section"
        },
        "fields": [{
            "Main": [{
                "id": "section",
                "label": "Section",
                "type": "varchar",
                "length": 50,
                "width": 50,
                "mandatory": true,
            }, {
                "id": "sections_id",
                "label": "Children of",
                "type": "select",
                "length": null,
                "mandatory": true,
                "width": 50,
                "services": {
                    "get": "sections",
                    "id": null,
                    "label": "section"
                }
            }, {
                "id": "order_id",
                "label": "Order id",
                "type": "hidden",
                "length": null,
                "mandatory": false,
            }, {
                "id": "description",
                "label": "Description",
                "type": "html",
                "length": null,
                "mandatory": false,
            }, {
                "id": "url_target",
                "label": "Url target",
                "type": "select",
                "mandatory": false,
                "values": [{
                        "value": "_blank",
                        "label": "_blank"
                    },
                    {
                        "value": "_self",
                        "label": "_self"
                    },
                    {
                        "value": "_parent",
                        "label": "_parent"
                    },
                    {
                        "value": "_top",
                        "label": "_top"
                    },
                ]
            }, {
                "id": "url_redirect",
                "label": "Url redirect",
                "type": "varchar",
                "length": 255,
                "mandatory": false,
            }, {
                "id": "is_reserved",
                "label": "Reserved",
                "type": "check",
                "length": null,
                "mandatory": false,
                "width": 25,
            }, {
                "id": "is_hidden",
                "label": "Hide on menu",
                "type": "check",
                "length": null,
                "mandatory": false,
                "width": 25,
            }, {
                "id": "is_articles",
                "label": "Attiva articoli allegati",
                "type": "check",
                "length": null,
                "mandatory": false,
                "width": 25,
            }, {
                "id": "is_active",
                "label": "Active",
                "type": "check",
                "length": null,
                "mandatory": false,
                "width": 25,
            }]
        }, {
            "Links": [{
                "id": "links",
                "label": "Links",
                "type": "collection",
                "length": 10,
                "mandatory": false,
                "fields": [{
                        "id": "url",
                        "label": "Link url",
                        "type": "varchar",
                        "width": 50,
                        "length": 255,
                        "mandatory": false,
                    },
                    {
                        "id": "label",
                        "label": "Link label",
                        "type": "varchar",
                        "width": 50,
                        "length": 50,
                        "mandatory": false,
                    },
                ]
            }]
        }, {
            "Anchors": [{
                "id": "anchors",
                "label": "Anchors",
                "type": "collection",
                "length": 10,
                "mandatory": false,
                "fields": [{
                    "id": "id",
                    "label": "Id",
                    "type": "varchar",
                    "width": 100,
                    "length": 50,
                    "mandatory": false,
                }, {
                    "id": "description",
                    "label": "Description",
                    "type": "html",
                    "width": 100,
                    "length": null,
                    "mandatory": false
                }, {
                    "id": "is_visible",
                    "label": "Visible",
                    "type": "check",
                    "width": 50,
                    "length": null,
                    "mandatory": false,
                }]
            }]
        }, {
            "Attachments": [{
                "id": "attachments",
                "label": "Attachments",
                "type": "collection",
                "length": 10,
                "mandatory": false,
                "fields": [{
                        "id": "file",
                        "label": "File",
                        "type": "file",
                        "width": 50,
                        "length": null,
                        "mandatory": false,
                    },
                    {
                        "id": "label",
                        "label": "File label",
                        "type": "varchar",
                        "width": 50,
                        "length": 50,
                        "mandatory": false,
                    },
                ]
            }]
        }, {
            "Images": [{
                "id": "gallery",
                "label": "Images",
                "type": "collection",
                "length": 10,
                "mandatory": false,
                "fields": [{
                    "id": "id",
                    "label": "Id",
                    "type": "varchar",
                    "width": 50,
                    "length": 50,
                    "mandatory": false,
                }, {
                    "id": "image",
                    "label": "Image",
                    "type": "image",
                    "width": 50,
                    "length": null,
                    "mandatory": false,
                }]
            }],
        }, {
            "Form": [{
                "id": "forms_id",
                "label": "Attach Form",
                "type": "select",
                "length": null,
                "mandatory": false,
                "services": {
                    "get": "forms",
                    "id": null,
                    "label": "title"
                }
            }]
        }, {
            "Labels": [{
                "id": "labels",
                "label": "Labels",
                "type": "collection",
                "length": 100,
                "mandatory": false,
                "fields": [{
                        "id": "id",
                        "label": "Id",
                        "type": "varchar",
                        "width": 50,
                        "length": null,
                        "mandatory": false,
                    },
                    {
                        "id": "label",
                        "label": "Label",
                        "type": "text",
                        "width": 50,
                        "mandatory": false,
                    }
                ]
            }],
        }, {
            "Meta Tags": [{
                    "id": "meta-title",
                    "label": "META Title",
                    "type": "varchar",
                    "length": 255,
                    "mandatory": false,
                },
                {
                    "id": "meta-description",
                    "label": "META Description",
                    "type": "text",
                    "mandatory": false,
                },
                {
                    "id": "meta-image",
                    "label": "Share image",
                    "type": "image",
                    "mandatory": false,
                },
                {
                    "id": "url_rewrite",
                    "label": "Url rewrite",
                    "type": "varchar",
                    "length": 255,
                    "mandatory": false,
                }
            ]
        }]
    },

    "articles": {

        "title": {
            "create": "Add Article",
            "edit": "Edit Article"
        },
        "fields": [{
                "Main": [{
                        "id": "title",
                        "label": "Title",
                        "type": "varchar",
                        "width": 33,
                        "length": 255,
                        "mandatory": true,
                    },
                    {
                        "id": "sections_id",
                        "label": "Section",
                        "type": "select",
                        "width": 33,
                        "length": null,
                        "mandatory": true,
                        "services": {
                            "get": "sections",
                            "id": "sections_articles",
                            "label": "section"
                        }
                    },
                    {
                        "id": "date",
                        "label": "Date",
                        "type": "date",
                        "width": 33,
                        "length": null,
                        "mandatory": true,
                    },
                    {
                        "id": "image",
                        "label": "Image",
                        "type": "image",
                        "length": null,
                        "mandatory": false,
                    },
                    {
                        "id": "abstract",
                        "label": "Short description",
                        "type": "text",
                        "length": null,
                        "mandatory": false,
                    },
                    {
                        "id": "is_active",
                        "label": "Active",
                        "type": "check",
                        "length": null,
                        "mandatory": false,
                    }
                ]
            }, {
                "Links": [{
                    "id": "links",
                    "label": "Links",
                    "type": "collection",
                    "length": 10,
                    "mandatory": false,
                    "fields": [{
                            "id": "url",
                            "label": "Link url",
                            "type": "varchar",
                            "width": 50,
                            "length": 255,
                            "mandatory": false,
                        },
                        {
                            "id": "label",
                            "label": "Link label",
                            "type": "varchar",
                            "width": 50,
                            "length": 50,
                            "mandatory": false,
                        },
                    ]
                }]
            },
        ]
    },

    "products": {

        "title": {
            "create": "Add Product",
            "edit": "Edit Product"
        },
        "fields": [{
                "Main": [{
                        "img:IT": [{
                            "id": "title-it",
                            "label": "Title",
                            "type": "varchar",
                            "length": 40,
                            "mandatory": true,
                        }],
                        "img:EN": [{
                            "id": "title-en",
                            "label": "Title",
                            "type": "varchar",
                            "length": 40,
                            "mandatory": false,
                        }],
                    },
                    {
                        "id": "category",
                        "label": "Category",
                        "type": "select",
                        "width": 50,
                        "length": null,
                        "mandatory": false,
                        "values": [{
                                "value": "essenziali",
                                "label": "Gli essenziali"
                            },
                            {
                                "value": "consigliati",
                                "label": "I consigliati"
                            }
                        ]
                    },
                    {
                        "id": "subcategory",
                        "label": "Sotto Categoria",
                        "type": "select",
                        "width": 50,
                        "length": null,
                        "mandatory": false,
                        "values": [{
                            "value": "test_1",
                            "label": "test uno"
                        },
                        {
                            "value": "test_2",
                            "label": "test due"
                        }]
                    },
                    {
                        "id": "users_id",
                        "label": "User ID",
                        "type": "varchar",
                        "width": 100,
                        "length": null,
                        "mandatory": true
                    },
                    {
                        "id": "status",
                        "label": "Product status",
                        "type": "select",
                        "width": 50,
                        "length": null,
                        "mandatory": true,
                        "values": [{
                                "value": "created",
                                "label": "CREATED"
                            },
                            {
                                "value": "live",
                                "label": "LIVE"
                            },
                            {
                                "value": "rejected",
                                "label": "REFUSED"
                            },
                        ]
                    },
                    {
                        "id": "type",
                        "label": "Products type",
                        "type": "select",
                        "width": 50,
                        "length": null,
                        "mandatory": true,
                        "values": [
                            {
                                "value": "type_1",
                                "label": "tipo 1"
                            },
                            {
                                "value": "type_2",
                                "label": "tipo 2"
                            },
                        ]
                    },
                    {
                        "id": "address",
                        "label": "Indirizzo",
                        "type": "varchar",
                        "width": 33,
                        "length": 50,
                        "mandatory": false,
                    },
                    {
                        "id": "lat",
                        "label": "Latitudine",
                        "type": "varchar",
                        "width": 33,
                        "length": 50,
                        "mandatory": false,
                    },
                    {
                        "id": "lng",
                        "label": "Longitudine",
                        "type": "varchar",
                        "width": 33,
                        "length": 50,
                        "mandatory": false,
                    },
                    {
                        "id": "country",
                        "label": "Country",
                        "type": "varchar",
                        "width": 33,
                        "length": 50,
                        "mandatory": false,
                    },
                    {
                        "id": "location",
                        "label": "Location",
                        "type": "varchar",
                        "width": 33,
                        "length": 50,
                        "mandatory": false,
                    },
                    {
                        "id": "url_rewrite",
                        "label": "Url rewrite",
                        "type": "varchar",
                        "width": 33,
                        "length": 255,
                        "mandatory": false,
                    },
                    {
                        "id": "is_visible",
                        "label": "Visibile",
                        "type": "check",
                        "mandatory": false,
                    }
                ]
            }, {
                "Descriptions": [{
                        "img:IT": [{
                                "id": "abstract-it",
                                "label": "Short description",
                                "type": "varchar",
                                "length": 255,
                                "mandatory": false,
                            },
                            {
                                "id": "description-it",
                                "label": "Descrizione",
                                "type": "html",
                                "length": null,
                                "mandatory": false,
                            }
                        ],
                        "img:EN": [{
                                "id": "abstract-en",
                                "label": "Short description",
                                "type": "varchar",
                                "length": 255,
                                "mandatory": false,
                            },
                            {
                                "id": "description-en",
                                "label": "Descrizione",
                                "type": "html",
                                "length": null,
                                "mandatory": false,
                            }
                        ],
                    },
                    {
                        "id": "image-principal",
                        "label": "Main image",
                        "type": "image",
                        "width": 100,
                        "length": null,
                        "mandatory": false,
                    },
                    {
                        "id": "social-google_id",
                        "label": "ID Google Analytics",
                        "type": "varchar",
                        "length": 255,
                        "width": 50,
                        "mandatory": false,
                    }
                ]
            }
        ]
    },

    "transactions": {

        "title": {
            "create": "Add Transaction",
            "edit": "Edit Transaction"
        },
        "fields": [{
                "Main": [{
                        "id": "products_id",
                        "label": "Produtto ID",
                        "type": "varchar",
                        "width": 50,
                        "length": null,
                        "mandatory": true,
                    },
                    {
                        "id": "product-title",
                        "label": "Titolo Progetto",
                        "type": "varchar",
                        "length": 255,
                        "width": 50,
                        "mandatory": false
                    },
                    {
                        "id": "users_id",
                        "label": "User ID",
                        "type": "varchar",
                        "width": 50,
                        "length": null,
                        "mandatory": false
                    },
                    {
                        "id": "user-email",
                        "label": "Email",
                        "type": "varchar",
                        "length": 100,
                        "width": 50,
                        "mandatory": false,
                    },

                    {
                        "id": "user-firstname",
                        "label": "Name",
                        "type": "varchar",
                        "length": 50,
                        "width": 33,
                        "mandatory": false,
                    },
                    {
                        "id": "user-lastname",
                        "label": "Surname",
                        "type": "varchar",
                        "length": 50,
                        "width": 33,
                        "mandatory": false,
                    },
                    {
                        "id": "amount",
                        "label": "Amount",
                        "type": "euro",
                        "width": 50,
                        "length": null,
                        "mandatory": true,
                    },
                    {
                        "id": "currency",
                        "label": "Currency",
                        "type": "select",
                        "width": 50,
                        "mandatory": true,
                        "values": [{
                            "value": "eur",
                            "label": "EURO"
                        }, ]
                    },
                    {
                        "id": "payment_method",
                        "label": "Method payment",
                        "type": "select",
                        "length": null,
                        "width": 50,
                        "mandatory": true,
                        "values": [{
                                "value": "credit_card",
                                "label": "Credit Card"
                            },
                            {
                                "value": "bank",
                                "label": "Bank"
                            },
                            {
                                "value": "offline",
                                "label": "Offline"
                            },
                        ]
                    },
                    {
                        "id": "payment_status",
                        "label": "Status payment",
                        "type": "select",
                        "length": null,
                        "width": 50,
                        "mandatory": true,
                        "values": [{
                                "value": "pending",
                                "label": "Pending"
                            },
                            {
                                "value": "confirmed",
                                "label": "Confirmed"
                            },
                            {
                                "value": "failed",
                                "label": "Failed"
                            },
                        ]
                    }
                ],
            }
        ]

    },
    "forms": {

        "title": {
            "create": "Add Form",
            "edit": "Edit form"
        },
        "fields": [{
            "Main": [{
                "id": "title",
                "label": "Title",
                "type": "varchar",
                "width": 50,
                "length": 50,
                "mandatory": true,
            }, {
                "id": "label",
                "label": "Button label",
                "type": "varchar",
                "width": 50,
                "length": 50,
                "mandatory": true,
            }, {
                "id": "email",
                "label": "Email administrator",
                "type": "mail",
                "width": 100,
                "length": 50,
                "mandatory": true,
            }, {
                "id": "is_active",
                "label": "Active",
                "type": "check",
                "length": null,
                "mandatory": false,
            }]
        }, {
            "Fields": [{
                "id": "fields",
                "label": "fields",
                "type": "collection",
                "length": 10,
                "mandatory": false,
                "fields": [{
                        "id": "label",
                        "label": "Label",
                        "type": "varchar",
                        "width": 25,
                        "length": 30,
                        "mandatory": false,
                    },
                    {
                        "id": "type",
                        "label": "Field type",
                        "type": "select",
                        "width": 25,
                        "length": null,
                        "mandatory": false,
                        "values": [{
                                "value": "string",
                                "label": "STRING"
                            },
                            {
                                "value": "number",
                                "label": "NUMBER"
                            },
                            {
                                "value": "select",
                                "label": "SELECT"
                            },
                            {
                                "value": "text",
                                "label": "TEXT"
                            },
                            {
                                "value": "email",
                                "label": "EMAIL"
                            },
                            {
                                "value": "phone",
                                "label": "PHONE"
                            },
                            {
                                "value": "check",
                                "label": "CHECK"
                            },
                        ]
                    },
                    {
                        "id": "init",
                        "label": "Initial value",
                        "type": "varchar",
                        "width": 25,
                        "length": 500,
                        "mandatory": false,
                    },
                    {
                        "id": "mandatory",
                        "label": "Mandatory",
                        "type": "check",
                        "width": 25,
                        "length": null,
                        "mandatory": false,
                    }
                ]
            }]
        }]
    }

}