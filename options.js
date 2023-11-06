function showToast() {
  var toast = document.getElementById("toast");
  toast.className = "show";
  setTimeout(function() { toast.className = toast.className.replace("show", ""); }, 3000);
}

function saveOptions() {
  var urlElement = document.getElementById('url');
  var portElement = document.getElementById('port');
  var url = urlElement.value;
  var port = portElement.value;

  // Check if the current values are different from the stored values before saving.
  browser.storage.local.get(['url', 'port'], function(items) {
    if (url !== items.url || port !== items.port) {
      browser.storage.local.set({ url: url, port: port }, showToast);
    }
  });
}

function restoreOptions() {
  browser.storage.local.get(['url', 'port'], function(items) {
    document.getElementById('url').value = items.url || 'http://127.0.0.1';
    document.getElementById('port').value = items.port || '8085';
  });
}

document.addEventListener('DOMContentLoaded', function() {
  restoreOptions();
  var inputs = document.querySelectorAll("input");
  inputs.forEach(input => input.addEventListener('change', saveOptions));
});
