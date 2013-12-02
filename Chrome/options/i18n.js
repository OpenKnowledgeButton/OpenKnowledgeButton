this.i18n = new (function () {})();
jQuery.extend(this.i18n, {
    "settings": {
        "en": "Settings",
        "de": "Optionen"
    },
    "search": {
        "en": "Search",
        "de": "Suche"
    },
    "nothing-found": {
        "en": "No matches were found.",
        "de": "Keine Übereinstimmungen gefunden."
    },
    "annotateit": {
        "en": "AnnotateIt",
        "de": "AnnotateIt"
    }
});

(function () {
    var lang = navigator.language;
    var global = this;

    function getString(obj, value) {
        if (obj.hasOwnProperty(value)) {
            value = obj[value];
            if (value.hasOwnProperty(lang)) {
                return value[lang];
            } else if (value.hasOwnProperty("en")) {
                return value["en"];
            } else {
                return Object.values(value)[0];
            }
        } else {
            return value;
        }
    }

    global.i18n.__proto__.get = function (module, value) {
        if (typeof value === "undefined") {
            value = module;
            module = null;
        }

        if (value === "lang") {
            return lang;
        }

        if (module === null) {
            return getString(global.i18n, value);
        }
        else {
            return getString(global.options[module].i18n, value);
        }
    };
})();