(function() {
  // this ugly hack is because Opera seems to run userJS on iFrames regardless
  // of @include and @exclude directives. unfortunately, more sites than you'd
  // guess use iframes - which can cause unexpected behavior if Opera goes and
  // runs this script on a page it's not meant to be run
  if (window != window.top) { return false; }

  console.group("okbutton extension");

  var MODULES = {
    'annotateit': {
      'humanName': 'AnnotateIt'
    }
  };

  var MODULE_STATE = {};
  var STATE_UNLOADED = 1;
  var STATE_INITIALISING = 2;
  var STATE_READY = 3;
  var STATE_ERROR = 4;

  (function () {
    var mod;
    for (mod in MODULES) {
      MODULE_STATE[mod] = STATE_UNLOADED;
    }
  }());

  // Inject a remote (or local) script tag into the page. Accepts an optional
  // callback that will fire when the script tag has loaded.
  var injectScript = function (src, callback) {
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    if (callback !== null && typeof callback !== 'undefined') {
      script.onload = callback;
    }
    script.src = src;
    document.getElementsByTagName('head')[0].appendChild(script);
  };

  // Generic module initialisation. Injects appropriate scripts and sets up
  // extension UI.
  var initialiseModule = function (name) {
    var module = MODULES[name];

    if (module === null || typeof module === 'undefined') {
      console.error("Module " + name + " not known, and thus not initialised");
      return;
    }

    if (module.preload !== null && typeof module.preload !== 'undefined') {
      module.preload.call(this, window);
    }

    var src = chrome.extension.getURL("modules/" + name + "/" + name + ".js");
    injectScript(src);
  };

  // Load all the modules. In future, we will want to provider users with the
  // option to enable or disable specific modules.
  (function () {
    var mod;
    for (mod in MODULES) {
      MODULE_STATE[mod] = STATE_INITIALISING;
      console.group(mod + " module");
      initialiseModule(mod);
      console.groupEnd();
    }
  }());

  window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window) { return; }

    var d = event.data;

    // We only accept messages which declare which module they are from
    if (d.module === null || typeof d.module === 'undefined') {
      console.warn("received message without module declared:", d);
      return;
    }

    // We only accept messages from valid modules
    var mod = MODULES[d.module];
    if (mod === null || typeof mod === 'undefined') {
      console.warn("received message from unknown module '" + d.module + "':", d);
      return;
    }

    if (d.type === "ready") {
      MODULE_STATE[d.module] = STATE_READY;

    } else if (d.type === "error") {
      MODULE_STATE[d.module] = STATE_ERROR;
      BabelExt.notification.create(
        "ERROR loading " + mod.humanName + "!",
        "Error message from module: " + d.message + "."
      );

    } else {
      console.debug("received message with unknown type:", d);
    }
  }, false);

  console.groupEnd();
  return true;
})();
