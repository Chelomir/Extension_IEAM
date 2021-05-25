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

// tabs
inspectedWindow.eval(
  `var tabInfo = EAM.Utils.getScreen().pageData.tabInfo;
  var tabs = [];
  if (tabInfo.display){
    for (let index = 0; index < tabInfo.display.length; index++) {
      const displayed_tab = tabInfo.display[index];
      tabs.push({itemId: displayed_tab.itemId, title: displayed_tab.title, isCurrent: (displayed_tab.itemId === tabInfo.current) ? "Yes" : "", isDisplayed: "Yes"});
    }
  }
  if (tabInfo.dropList){
    for (let index = 0; index < tabInfo.dropList.length; index++) {
      const dropped_tab = tabInfo.dropList[index];
      tabs.push({itemId: dropped_tab.itemId, title: dropped_tab.title, isCurrent: (dropped_tab.itemId === tabInfo.current) ? "Yes" : "", isDisplayed: ""});
    }
  }
  tabs`,
  function(result, isException) {
    if (isException) console.log("cannot get tabInfo");
    else {
      result.forEach(function(tab) {
        var tablerow = document.createElement('tr');

        var cellItemId = document.createElement('td');
        cellItemId.innerHTML = tab.itemId;
        tablerow.appendChild(cellItemId);

        var cellTitle = document.createElement('td');
        cellTitle.innerHTML = tab.title;
        tablerow.appendChild(cellTitle);

        var cellIsCurrent = document.createElement('td');
        cellIsCurrent.innerHTML = tab.isCurrent;
        tablerow.appendChild(cellIsCurrent);

        var cellIsDisplayed = document.createElement('td');
        cellIsDisplayed.innerHTML = tab.isDisplayed;
        tablerow.appendChild(cellIsDisplayed);

        document.getElementById("tabs").appendChild(tablerow);
      })
    }
  }
);

// All fields with values, labels, attributes
// TODO: Сделать вывод количества польз. полей. Возможно, стоит их как-то выделять
var code = 
    `var vFormPanel = EAM.Utils.getScreen().getCurrentTab().getFormPanel();
    var arrFields = Object.entries(vFormPanel.getFldValues('all'));
    var fields = [];
    arrFields.forEach(function(arrField) {
      var field = {
        name: 		arrField[0],
        value: 		(typeof arrField[1] === 'object' && arrField[1]) ? arrField[1].toString() : arrField[1],
      };
      var fld = vFormPanel.getFld(field.name);
      field.label = (vFormPanel.getResponseData().labels[field.name]) ? (vFormPanel.getResponseData().labels[field.name].label) : null;
      field.attribute = (fld.currentAttribute) ? (fld.currentAttribute) : null;
      field.originalValue = (JSON.stringify(fld.value) != JSON.stringify(fld.originalValue)) ? fld.originalValue.toString() : null;
      fields.push(field);
    });
    fields;`;
inspectedWindow.eval(
  code,
  function(result, isException) {
    if (isException) console.log("cannot get fields");
    else {
      result.forEach(function(field) {
        var tablerow = document.createElement('tr');
        var cellCode = document.createElement('td');
        cellCode.innerHTML = field.name;
        tablerow.appendChild(cellCode);
        var cellValue = document.createElement('td');
        cellValue.innerHTML = field.value;
        tablerow.appendChild(cellValue);
        var cellOriginalValue = document.createElement('td');
        cellOriginalValue.innerHTML = field.originalValue;
        tablerow.appendChild(cellOriginalValue);
        var cellLabel = document.createElement('td');
        cellLabel.innerHTML = field.label;
        tablerow.appendChild(cellLabel);
        var cellAttribute = document.createElement('td');
        cellAttribute.innerHTML = field.attribute;
        tablerow.appendChild(cellAttribute);
        document.getElementById("fields").appendChild(tablerow);
      })
    }
  }
);