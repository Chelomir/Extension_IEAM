let inspectedWindow = chrome.devtools.inspectedWindow;

// User Function
inspectedWindow.eval(
  "EAM.Utils.getScreen().getCurrentTab().getFormPanel().screen.getUserFunction()",
  function(result, isException) {
    if (isException) console.log("cannot get User Function");
    else {
      document.getElementById("userfunction").innerHTML = result;
    }
  }
);
// class
inspectedWindow.eval(
    "EAM.Utils.getScreen().getCurrentTab().getFormPanel().getFldValue('class')",
    function(result, isException) {
      if (isException) console.log("cannot get class");
      else {
        document.getElementById("class").innerHTML = result;
      }
    }
  );

// All fields with values
// EAM.Utils.getScreen().getCurrentTab().getFormPanel().getFldValues('all')