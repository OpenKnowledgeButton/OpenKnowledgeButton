(function () {
  "use strict";
  var root = this;
  var uri = root.location.href.split(/#|\?/).shift();

  var MODULE = 'annotateit';
  var CONFIG = {
    timeout: 3000,
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
    BabelExt.notification.create(
      "ERROR loading annotateit!",
      "Error message from module: " + message + "."
    );
  };

  var body = root.document.body,
      bookmarklet = {};

  bookmarklet = {
    setup: function () {
      var annotator = new Annotator(body), namespace;

      annotator
        .addPlugin('Unsupported')
        .addPlugin('Auth', CONFIG.annotator.auth)
        .addPlugin('Store', CONFIG.annotator.store)
        .addPlugin('AnnotateItPermissions');
    },
  };


  BabelExt.storage.get("general-" + MODULE + "-enabled", function (returnData) {
    // Strange that the boolean value is encoded as a string!
    if(returnData.value !== "false") bookmarklet.setup();
  });

}.call(this));
