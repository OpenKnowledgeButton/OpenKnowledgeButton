(function () {
  "use strict";
  var root = this;

  window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window) { return; }

    console.log("Real page context received: ", event.data);
  }, false);

  window.postMessage("Hello from real page", "*");
}.call(this));
