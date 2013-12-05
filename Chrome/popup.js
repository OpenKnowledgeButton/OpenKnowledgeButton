function updateCheckbox(moduleName) {
  BabelExt.storage.get("general-" + moduleName + "-enabled", function (returnData) {
      // Strange that the boolean value is encoded as a string!
      var button = $("#activate-" + moduleName);
      if(returnData.value !== "false") button.addClass("activated");
      else button.removeClass("activated");
  });
}

function listenToClick(moduleName) {
  var button = $("#activate-" + moduleName);
  button.on("click", function() {
    var value = button.hasClass("activated") ? "false" : "true";
    BabelExt.storage.set("general-" + moduleName + "-enabled", value, function() { updateCheckbox(moduleName) });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var MODULES = ["annotateit", "knownodes", "hypothesis"];
  for(var i = 0; i < MODULES.length; i++) {
    updateCheckbox(MODULES[i]);
    listenToClick(MODULES[i]);
  }
});
