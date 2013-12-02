(function ($) {
    $(document).ready(function () {
        var settings = new FancySettings("Open Knowledge Button", "../icon48.png");
        $.each(options, function (module, opts) {
            var outputSettings = {};

            var enabled = settings.create({
                "tab": i18n.get(module),
                "group": i18n.get("enabled"),
                "name": "general-" + module + "-enabled",
                "type": "checkbox",
                "label": i18n.get("Enable or disable") + " " + i18n.get(module)
            });

            enabled.addEvent("action", function () {
                BabelExt.storage.set("general-" + module + "-enabled", enabled.get(), function () {});
            });

            $.each(opts.settings, function (i, setting) {
                var name = setting.name;
                setting = $.extend({}, setting, {
                    "tab": i18n.get(module)
                });

                if (name) {
                    setting.name = module + "-" + name;
                }

                var output = settings.create(setting);
                if (name) {
                    outputSettings[name] = output;

                    if ($.inArray(setting.type, ["text", "textarea", "slider", "popupButton", "listBox", "radioButtons", "checkbox"]) !== -1) {
                         output.addEvent("action", function () {
                             var value = output.get().toString();
                             BabelExt.storage.get(setting.name, function (storage) {
                                 if (storage.value !== value) {
                                     BabelExt.storage.set(setting.name, value, function (newStorage) {
                                         if (opts.settingChanged) {
                                             opts.settingChanged(name, newStorage.value, outputSettings);
                                         }
                                     });
                                 }
                             })
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