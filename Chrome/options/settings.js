(function ($) {
    $(document).ready(function () {
        var settings = new FancySettings("Open Knowledge Button", "../icon48.png");
        $.each(options, function (module, opts) {
            var outputSettings = {};

            var enabled = settings.create({
                "tab": i18n.get(module),
                "group": i18n.get("enabled"),
                "name": module + "-enabled",
                "type": "checkbox",
                "label": i18n.get("Enable or disable") + " " + i18n.get(module)
            });

            $(enabled.element).on("change", function (e) {
                BabelExt.storage.set(module + "-enabled", $(this).is(":checked"), function () {});
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

            if (opts.callback) {
                // We clean out MooTools things because we might not in the future use MooTools
                $.each(outputSettings, function (settingName, setting) {
                    var output = {};
                    $.each(setting, function (fieldName, field) {
                        if ($.inArray(fieldName, ["bundle", "bundleContainer", "container", "element", "label"]) !== -1) {
                            output[fieldName] = field;
                        }
                    });
                    outputSettings[settingName] = output;
                });
                opts.callback(outputSettings);
            }
        });
    });
})(jQuery);