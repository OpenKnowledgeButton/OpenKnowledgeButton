(function ($) {
    $(document).ready(function () {
        var settings = new FancySettings("Open Knowledge Button", "../icon48.png");
        $.each(options, function (module, opts) {
            var outputSettings = {};

            var enabled = settings.create({
                "tab": i18n.get(module),
                "group": i18n.get("enabled"),
                // Name is different to not conflict with module settings
                "name": "general-" + module + "-enabled",
                "type": "checkbox",
                "label": i18n.get("Enable or disable") + " " + i18n.get(module)
            });

            enabled.addEvent("action", function () {
                BabelExt.storage.set("general-" + module + "-enabled", enabled.get(), function () {});
            });

            // Initializing enabled value. It triggers action
            // event afterwards, which is useful to set default value.
            BabelExt.storage.get("general-" + module + "-enabled", function (storage) {
                enabled.set((storage.value || "true") === "true");
            });

            $.each(opts.settings, function (i, setting) {
                var name = setting.name;
                setting = $.extend({}, setting, {
                    "tab": i18n.get(module)
                });

                if (name) {
                    // We prefix settings name with module name
                    setting.name = module + "-" + name;
                }

                var output = settings.create(setting);
                if (name) {
                    outputSettings[name] = output;

                    if ($.inArray(setting.type, ["text", "textarea", "slider", "popupButton", "listBox", "radioButtons", "checkbox"]) !== -1) {
                        // "action" event is special event triggered by fancy-settings
                        // on change and related events. Adding additional event handler
                        // for change and related events does not work for some reason,
                        // so we are using "action" event. We want to use MooTools events
                        // and not just DOM events because on .set() fancy-settings triggers
                        // MooTools change event which is not a DOM event is not captured
                        // with DOM listeners (or jQuery). But we want that on every .set()
                        // call we sync local storage as well.
                        output.addEvent("action", function () {
                            var value = output.get().toString();
                            BabelExt.storage.get(setting.name, function (storage) {
                                // To prevent any strange loops, we check
                                // if the value has been really changed
                                if (storage.value !== value) {
                                    BabelExt.storage.set(setting.name, value, function (newStorage) {
                                        if (opts.settingChanged) {
                                            opts.settingChanged(name, newStorage.value, outputSettings);
                                        }
                                    });
                                }
                            })
                        });

                        // Initializing the value from local storage.
                        BabelExt.storage.get(setting.name, function (storage) {
                            output.set(storage.value);
                        });
                    }
                }
            });

            if (opts.alignment && opts.alignment.length) {
                $('body').addClass("measuring");
                $.each(opts.alignment, function (i, group) {
                    group = $.map(group, function (settingName, j) {
                        return outputSettings[settingName];
                    });
                    settings.align(group);
                });
                $('body').removeClass("measuring");
            }

            if (opts.afterInit) {
                opts.afterInit(outputSettings);
            }
        });
    });
})(jQuery);