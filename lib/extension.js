(function() {
  // this ugly hack is because Opera seems to run userJS on iFrames regardless
  // of @include and @exclude directives. unfortunately, more sites than you'd
  // guess use iframes - which can cause unexpected behavior if Opera goes and
  // runs this script on a page it's not meant to be run
  if (window != window.top) { return false; }

  console.group("okbutton extension");

  var MODULES = {
    'annotator': {
      'humanName': 'AnnotateIt',
      'src': chrome.extension.getURL("annotateit.js"),
      'preload': function (w) {
        // NB: This doesn't work. You can't just add data to the window object
        // and expect it to be available to the page execution context. Leaving
        // it here for now as a demonstation of intent.
        w._annotatorConfig = {
          auth: { tokenUrl: "http://annotateit.org/api/token" },
          store: { prefix: "http://annotateit.org/api" },
          tags: true
        };
      }
    }
  };

  var MODULESTATE = {};

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

    injectScript(module.src, function () {
      console.debug(name + " injected");
    });
  };

  // Load all the modules. In future, we will want to provider users with the
  // option to enable or disable specific modules.
  (function () {
    var mod;
    for (mod in MODULES) {
      console.group(mod + " module");
      initialiseModule(mod);
      console.groupEnd();
    }
  }());

  window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window) { return; }

    console.log("Content script received: ", event.data);
  }, false);

  // window.postMessage("Hello from content script", "*");

  console.groupEnd();

  return true;
})();
