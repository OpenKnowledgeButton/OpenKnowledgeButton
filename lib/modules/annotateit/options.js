this.options.annotateit.settings = [
    {
        "group": i18n.get("annotateit", "login"),
        "name": "username",
        "type": "text",
        "label": i18n.get("annotateit", "username"),
        "text": i18n.get("annotateit", "x-characters")
    },
    {
        "group": i18n.get("annotateit", "login"),
        "name": "password",
        "type": "text",
        "label": i18n.get("annotateit", "password"),
        "text": i18n.get("annotateit", "x-characters-pw"),
        "masked": true
    },
    {
        "group": i18n.get("annotateit", "login"),
        "name": "description",
        "type": "description",
        "text": i18n.get("annotateit", "description")
    },
    {
        "group": i18n.get("annotateit", "logout"),
        "name": "logout",
        "type": "button",
        "text": i18n.get("annotateit", "logout")
    }
];
this.options.annotateit.alignment = [
    [
        "username",
        "password"
    ]
];
this.options.annotateit.afterInit = function (settings) {
    (function ($) {
        $(settings.logout.element).click(function (e) {
            settings.username.set("");
            settings.password.set("");
            console.log("Logout button pressed");
        });
    })(jQuery);
};
this.options.annotateit.settingChanged = function (name, value, settings) {
    console.log("Setting changed", name, value);
};