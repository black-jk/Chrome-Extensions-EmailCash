
// Saves options to chrome.storage
function save_options() {
  var debug = document.getElementById("debug").checked;
  var redirectDelay = parseInt(document.getElementById("redirectDelay").value, 10);

  chrome.storage.sync.set({
    debug: debug,
    redirectDelay: redirectDelay
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(function () {
      status.textContent = "";
    }, 750);

    restore_options();
  });
}

// --------------------------------------------------

// Restores select box and checkbox state using the preferences stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    debug: false,
    redirectDelay: 0
  }, function (items) {
    document.getElementById("debug").checked = items.debug;
    document.getElementById("redirectDelay").value = items.redirectDelay;
  });
}

// ----------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
document.getElementById("restore").addEventListener("click", restore_options);
