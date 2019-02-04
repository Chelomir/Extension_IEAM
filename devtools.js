function handleShown() {
  console.log("panel is being shown");
}
function handleHidden() {
  console.log("panel is being hidden");
}

// Create a new panel
chrome.devtools.panels.create("Infor EAM", null, "panel.html", function(panel) {
  panel.onShown.addListener(handleShown);
  panel.onHidden.addListener(handleHidden);
});
