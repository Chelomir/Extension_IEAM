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
      var tablerow;
      var cellCode;
      var cellValue;
      var cellLabel;
      var callAttribute;
      result.forEach(function(field) {
        tablerow = document.createElement('tr');
        cellCode = document.createElement('td');
        cellCode.innerHTML = field.name;
        tablerow.appendChild(cellCode);
        cellValue = document.createElement('td');
        cellValue.innerHTML = field.value;
        tablerow.appendChild(cellValue);
        cellOriginalValue = document.createElement('td');
        cellOriginalValue.innerHTML = field.originalValue;
        tablerow.appendChild(cellOriginalValue);
        cellLabel = document.createElement('td');
        cellLabel.innerHTML = field.label;
        tablerow.appendChild(cellLabel);
        callAttribute = document.createElement('td');
        callAttribute.innerHTML = field.attribute;
        tablerow.appendChild(callAttribute);
        document.getElementById("fields").appendChild(tablerow);
      })
    }
  }
);