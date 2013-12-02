(function ($) {
    $(document).ready(function () {
        var settings = new FancySettings("Open Knowledge Button", "../icon48.png");
        $.each(options, function (module, opts) {
            var outputSettings = {};

            $.each(opts.settings, function (i, setting) {
                setting = $.extend({}, setting, {
                    "tab": i18n.get(module)
                });

                var output = settings.create(setting);
                if (setting.name) {
                    outputSettings[setting.name] = output;
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