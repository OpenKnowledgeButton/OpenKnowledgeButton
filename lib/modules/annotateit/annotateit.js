(function () {
  "use strict";
  var root = this;
  var uri = root.location.href.split(/#|\?/).shift();

  var MODULE = 'annotateit';
  var CONFIG = {
    timeout: 3000,
    jquerySrc: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js',
    annotatorSrc: 'https://s3.amazonaws.com/assets.annotateit.org/bookmarklet/annotator.min.js',
    annotatorStyles: 'https://s3.amazonaws.com/assets.annotateit.org/bookmarklet/annotator.min.css',
    annotator: {
      auth: {
        tokenUrl: 'http://annotateit.org/api/token'
      },
      store: {
        prefix: 'http://annotateit.org/api',
        annotationData: { 'uri': uri },
        loadFromSearch: { 'uri': uri }
      }
    }
  };

  var reportError = function (message) {
    root.postMessage({
      module: MODULE,
      type: 'error',
      message: message
    }, "*");
  };

  var reportReady = function () {
    root.postMessage({
      module: MODULE,
      type: 'ready'
    }, "*");
  };

  var body = root.document.body,
      head = root.document.getElementsByTagName('head')[0],
      globals = ['Annotator', '$', 'jQuery'],
      isLoaded = {},
      bookmarklet = {},
      notification, namespace, jQuery;

  while (globals.length) {
    namespace = globals.shift();
    isLoaded[namespace] = root.hasOwnProperty(namespace);
  }

  bookmarklet = {
    loadjQuery: function () {
      var script = root.document.createElement('script'),
          timer;

      timer = setTimeout(function () {
        reportError('Sorry, we were unable to load jQuery which is required by the annotator');
      }, CONFIG.timeout);

      script.src = CONFIG.jquerySrc;
      script.onload = function () {
        // Reassign our local copy of jQuery.
        jQuery = root.jQuery;

        clearTimeout(timer);
        body.removeChild(script);
        bookmarklet.load(function () {
          // Once the Annotator has been loaded we can finally remove jQuery.
          root.jQuery.noConflict(true);
          bookmarklet.setup();
        });
      };

      body.appendChild(script);
    },

    load: function (callback) {
      head.appendChild(jQuery('<link />', {
        rel: 'stylesheet',
        href: CONFIG.annotatorStyles
      })[0]);

      jQuery.ajaxSetup({timeout: CONFIG.timeout});
      jQuery.getScript(CONFIG.annotatorSrc, callback)
            .error(function () {
              reportError("Sorry, we're unable to load Annotator at the moment...");
            });
    },

    setup: function () {
      var annotator = new root.Annotator(body), namespace;

      annotator
        .addPlugin('Unsupported')
        .addPlugin('Auth', CONFIG.annotator.auth)
        .addPlugin('Store', CONFIG.annotator.store)
        .addPlugin('AnnotateItPermissions');

      // Attach the annotator to the window object so we can prevent it
      // being loaded twice and test.
      jQuery.extend(root._annotator, {
        jQuery: jQuery,
        element: body,
        instance: annotator,
        Annotator: root.Annotator.noConflict()
      });

      // Clean up after ourselves by removing any properties on window that
      // were not there before.
      for (namespace in isLoaded) {
        if (isLoaded.hasOwnProperty(namespace) && !isLoaded[namespace]) {
          delete root[namespace];
        }
      }

      reportReady();
    },

    init: function () {
      if (!root.jQuery || !root.jQuery.sub) {
        this.loadjQuery();
      } else {
        jQuery = root.jQuery.sub();
        this.load(jQuery.proxy(this.setup, this));
      }
    }
  };

  bookmarklet.init();

}.call(this));
