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
// TODO: Сделать корректное подтягивание лейблов для пользовательских полей
// TODO: В столбце Value сделать отображение объектных значений (даты)
var code = "var vFormPanel = EAM.Utils.getScreen().getCurrentTab().getFormPanel();";
code += "var fields = Object.entries(vFormPanel.getFldValues('all'));";
code += "fields.forEach(function(field) {";
code += "if (vFormPanel.getFld(field[0]).ownerCt) {field.push(vFormPanel.getFld(field[0]).ownerCt.fieldLabel);}";
code += "field.push(vFormPanel.getFld(field[0]).currentAttribute);";
code += "}); fields;";
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
        cellCode.innerHTML = field[0];
        tablerow.appendChild(cellCode);
        cellValue = document.createElement('td');
        cellValue.innerHTML = field[1];
        tablerow.appendChild(cellValue);
        cellLabel = document.createElement('td');
        cellLabel.innerHTML = field[2];
        tablerow.appendChild(cellLabel);
        callAttribute = document.createElement('td');
        callAttribute.innerHTML = field[3]? field[3] : '';
        tablerow.appendChild(callAttribute);
        document.getElementById("fields").appendChild(tablerow);
      })
    }
  }
);