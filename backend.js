let globalQueue = [];
// let globalDropingVar = "";
let globalInputField = document.createElement("input");
let globalEqualSign = document.createElement("span");
let globalSemiColonSign = document.createElement("span");
let globalSelectField = document.createElement("select");
let globalFertileDiv = document.createElement("div");
globalFertileDiv.setAttribute("class", "fertileDiv");
globalEqualSign.textContent = " = ";
globalSemiColonSign.textContent = " ; ";
globalInputField.style.borderRadius = "10px"
globalEqualSign.style.color = "white";
globalSelectField.style.borderRadius = "10px"

class SetVar {
  constructor() {
    this.value = "";
    this.name = "";
  }
  createElement() {
    let newDiv = document.createElement("div");
    newDiv.style.marginBottom = "2vh";
    let text = document.createElement("p");
 
    text.textContent = "Declare var: ";

    let nameField = globalInputField.cloneNode("true");
    nameField.setAttribute("placeholder", "name");
    nameField.addEventListener("change", (event) => {
      this.name = event.target.value;
    });

    let valueField = globalInputField.cloneNode("true");
    valueField.setAttribute("placeholder", "value");
    valueField.addEventListener("change", (event) => {
      this.value = event.target.value;
    });

    newDiv.appendChild(text);
    newDiv.appendChild(nameField);
    newDiv.appendChild(globalEqualSign.cloneNode(true));
    newDiv.appendChild(valueField);

    return newDiv;
  }

  generateCode() {
    if (isNaN(`${this.value}`)){return `$${this.name} = "${this.value}";\n`;}
    return `$${this.name} = ${this.value};\n`;
  }
}

class SimpleIf {
  constructor() {
    this.var1 = "";
    this.relation = "";
    this.var2 = "";
    this.children = [];
  }


  createElement() {
    let newDiv = document.createElement("div");
    newDiv.style.marginBottom = "2vh";

    let text = document.createElement("p");
 
    text.textContent = "if";

    let var1Field = globalInputField.cloneNode("true");
    var1Field.setAttribute("placeholder", "var1");
    var1Field.addEventListener("change", (event) => {
      this.var1 = event.target.value;
    });

    let var2Field = globalInputField.cloneNode("true");
    var2Field.setAttribute("placeholder", "var2");
    var2Field.addEventListener("change", (event) => {
      this.var2 = event.target.value;
    });

    let relationField = globalSelectField.cloneNode(true);
    const relationOptions = [" == ", " < ", " > ", " <= ", " >= ", " != "];
    relationOptions.forEach((option) => {
      let newOption = document.createElement("option");
      newOption.setAttribute("value", option);
      newOption.textContent = option;
      relationField.appendChild(newOption);
    });
    relationField.addEventListener("change", (event) => {
      this.relation = event.target.value;
    });
    if (this.relation == "") {
      this.relation = "==";
    }

    let block = globalFertileDiv.cloneNode(true);
    block.addEventListener("drop", (event) => {
      event.preventDefault();
      event.stopPropagation();
      let newChild = drop2(event);
      this.children = [...this.children, newChild];
    });

    newDiv.appendChild(text);
    newDiv.appendChild(var1Field);
    newDiv.appendChild(relationField);
    newDiv.appendChild(var2Field);
    newDiv.appendChild(block);

    return newDiv;
  }

  generateCode() {
    let ifCode = `if ($${this.var1} ${this.relation} ${this.var2}) \n {\n`;
    for (let i = 0; i < this.children.length; i++) {
      ifCode = ifCode + this.children[i].generateCode();
    }
    ifCode = ifCode + "}\n";
    return ifCode;
  }
}

class IfElse {
  constructor() {
    this.ifPart = new SimpleIf();
    this.ifPart.var1 = "";
    this.ifPart.relation = "";
    this.ifPart.var2 = "";
    this.ifPart.children = [];
    this.elsePart = [];
  }
  createElement() {
    let text = document.createElement("p");
 
    text.textContent = "else";
    let newDiv = document.createElement("div");
    newDiv.style.marginBottom = "2vh";
    let block = globalFertileDiv.cloneNode(true);
    block.addEventListener("drop", (event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log("i trigget");
      let newChild = drop2(event);
      this.elsePart = [...this.elsePart, newChild];
    });
    newDiv.appendChild(this.ifPart.createElement());
    newDiv.appendChild(text);
    newDiv.appendChild(block);

    return newDiv;
  }
  generateCode() {
    let ifCode = this.ifPart.generateCode();
    let elseCode = `else\n {\n`;
    for (let i = 0; i < this.elsePart.length; i++) {
      elseCode = elseCode + this.elsePart[i].generateCode();
    }
    elseCode = elseCode + "}";
    return ifCode + elseCode;
  }
}

class ForLoop {
  constructor() {
    this.var1 = "";
    this.val1 = "";
    this.relation = "";
    this.var2 = "";
    this.val2 = "";
    this.changeVar = "";
    this.changer = "";
    this.children = [];
  }
  createElement() {
    let newDiv = document.createElement("div");
    newDiv.style.marginBottom = "2vh";

    let text = document.createElement("p");
    text.style.color ="white";
    text.textContent = "for";

    let var1Field = globalInputField.cloneNode(true);
    var1Field.setAttribute("placeholder", "var1");
    var1Field.addEventListener("change", (event) => {
      this.var1 = event.target.value;
    });

    let equalField = globalEqualSign.cloneNode(true);

    let val1Field = globalInputField.cloneNode(true);
    val1Field.setAttribute("placeholder", "val1");
    val1Field.addEventListener("change", (event) => {
      this.val1 = event.target.value;
    });

    let var2Field = globalInputField.cloneNode(true);
    var2Field.setAttribute("placeholder", "var1");
    var2Field.addEventListener("change", (event) => {
      this.var2 = event.target.value;
    });

    let relationField = globalSelectField.cloneNode(true);
    const relationOptions = [" < ", " > ", " <= ", " >= "];
    relationOptions.forEach((option) => {
      let newOption = document.createElement("option");
      newOption.setAttribute("value", option);
      newOption.textContent = option;
      relationField.appendChild(newOption);
    });
    relationField.addEventListener("change", (event) => {
      this.relation = event.target.value;
    });
    if (this.relation == "") {
      this.relation = " < ";
    }

    let val2Field = globalInputField.cloneNode(true);
    val2Field.setAttribute("placeholder", "val2");
    val2Field.addEventListener("change", (event) => {
      this.val2 = event.target.value;
    });

    let changerVar = globalInputField.cloneNode(true);
    changerVar.setAttribute("placeholder", "var");
    changerVar.addEventListener("change", (event) => {
      this.changeVar = event.target.value;
    });

    let changerField = globalSelectField.cloneNode(true);
    const changerOptions = [var1Field.value + "++", var1Field.value + "--"];
    console.log(changerOptions);
    changerOptions.forEach((option) => {
      let newOption = document.createElement("option");
      newOption.setAttribute("value", option);
      newOption.textContent = option;
      changerField.appendChild(newOption);
    });
    changerField.addEventListener("change", (event) => {
      this.changer = event.target.value;
    });
    if (this.changer == "") {
      this.changer = "++ ";
    }

    let block = globalFertileDiv.cloneNode(true);
    block.addEventListener("drop", (event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log("i trigget");
      let newChild = drop2(event);
      this.children = [...this.children, newChild];
    });

    newDiv.appendChild(text);
    newDiv.appendChild(var1Field);
    newDiv.appendChild(equalField);
    newDiv.appendChild(val1Field);
    newDiv.appendChild(var2Field);
    newDiv.appendChild(relationField);
    newDiv.appendChild(val2Field);
    newDiv.appendChild(changerVar);
    newDiv.appendChild(changerField);
    newDiv.appendChild(block);

    return newDiv;
  }

  generateCode() {
    let loopCode = `for ($${this.var1} = ${this.val1}; $${this.var1}${this.relation}${this.val2} ; $${this.changeVar}${this.changer})`;
    let childCode = "\n{\n";
    for (let i = 0; i < this.children.length; i++) {
      childCode = childCode + this.children[i].generateCode();
    }
    childCode = childCode + "}\n";
    return loopCode + childCode;
  }
}

class WhileLoop {
  constructor() {
    this.loopVar = "";
    this.loopVarVal = "";
    this.relation = "";
    this.targetVal = "";
    this.changeVar = "";
    this.changer = "";
    this.children = [];
  }
  createElement() {
    let newDiv = document.createElement("div");
    newDiv.style.marginBottom = "2vh";

    let text = document.createElement("p");
  
    text.textContent = "while";

    let varInput = globalInputField.cloneNode(true);
    varInput.setAttribute("placeholder", "var");
    varInput.addEventListener("change", (event) => {
      this.loopVar = event.target.value;
    });

    let relationField = globalSelectField.cloneNode(true);
    const relationOptions = [" < ", " > ", " <= ", " >= ", " != "];
    relationOptions.forEach((option) => {
      let newOption = document.createElement("option");
      newOption.setAttribute("value", option);
      newOption.textContent = option;
      relationField.appendChild(newOption);
    });
    relationField.addEventListener("change", (event) => {
      this.relation = event.target.value;
    });
    if (this.relation == "") {
      this.relation = " < ";
    }

    let varVal = globalInputField.cloneNode(true);
    varVal.setAttribute("placeholder", "var");
    varVal.addEventListener("change", (event) => {
      this.loopVarVal = event.target.value;
    });

    let block = globalFertileDiv.cloneNode(true);
    block.addEventListener("drop", (event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log("i trigget");
      let newChild = drop2(event);
      this.children = [...this.children, newChild];
    });

    newDiv.appendChild(text);
    newDiv.appendChild(varInput);
    newDiv.appendChild(relationField);
    newDiv.appendChild(varVal);
    newDiv.appendChild(block);
    return newDiv;
  }

  generateCode() {
    let whileCode = `while ($${this.loopVar} ${this.relation} ${this.loopVarVal})\n`;
    let childCode = "{\n";
    for (let i = 0; i < this.children.length; i++) {
      childCode = childCode + this.children[i].generateCode();
    }
    childCode = childCode + `\n}`;
    return whileCode + childCode;
  }
}

class Echo {
  constructor() {
    this.output = "";
  }

  createElement() {
    let newDiv = document.createElement("div");
    newDiv.style.display = "flex";
    newDiv.style.flexDirection = "row";
    newDiv.style.marginBottom = "2vh";

    let alert = document.createElement("div");
    alert.setAttribute("class","alert alert-warning");
    alert.setAttribute("role","alert");
    alert.textContent="Write $ if the value is a variable";

    let text = document.createElement("p");
 
    text.textContent = "echo";

    let outputField = globalInputField.cloneNode(true);
    outputField.setAttribute("placeholder", "text");
    outputField.addEventListener("change", (event) => {
      this.output = event.target.value;
    });

    newDiv.appendChild(text);
    newDiv.appendChild(outputField);
    newDiv.appendChild(alert);
    return newDiv;
  }

  generateCode() {
    return `echo "${this.output}";`;
  }
}

class Arithmetic {
  constructor() {
    this.destination = "";
    this.operand1 = "";
    this.operator = "";
    this.operand2 = "";
  }

  createElement() {
    let newDiv = document.createElement("div");
    newDiv.style.marginBottom = "2vh";

    let destField = globalInputField.cloneNode("true");
    destField.setAttribute("placeholder", "destination");
    destField.addEventListener("change", (event) => {
      this.destination = event.target.value;
    });

    let equals = globalEqualSign.cloneNode(true);

    let opField1 = globalInputField.cloneNode("true");
    opField1.setAttribute("placeholder", "var1");
    opField1.addEventListener("change", (event) => {
      this.operand1 = event.target.value;
    });

    let relationField = globalSelectField.cloneNode(true);
    const relationOptions = [" + ", " - ", " * ", " / "];
    relationOptions.forEach((option) => {
      let newOption = document.createElement("option");
      newOption.setAttribute("value", option);
      newOption.textContent = option;
      relationField.appendChild(newOption);
    });
    relationField.addEventListener("change", (event) => {
      this.operator = event.target.value;
    });
    if (this.operator == "") {
      this.operator = " + ";
    }

    let opField3 = globalInputField.cloneNode("true");
    opField3.setAttribute("placeholder", "var2");
    opField3.addEventListener("change", (event) => {
      this.operand2 = event.target.value;
    });

    newDiv.appendChild(destField);
    newDiv.appendChild(equals);
    newDiv.appendChild(opField1);
    newDiv.appendChild(relationField);
    newDiv.appendChild(opField3);

    return newDiv;
  }

  generateCode() {
    let finalOperand1 = "";
    let finalOperand2 = "";
    if (isNaN(this.operand1)) {
      finalOperand1 = "`${this.operand1}`";
    } else {
      finalOperand1 = `${this.operand1}`;
    }
    if (isNaN(this.operand2)) {
      finalOperand2 = `$${this.operand2}`;
    } else {
      finalOperand2 = `${this.operand2}`;
    }
    return `$${this.destination} = ${finalOperand1}${this.operator}${finalOperand2};\n`;
  }
}

class Function {
  constructor() {
    this.name = "";
    this.parameter = "";
    this.return = "";
    this.children = [];
  }

  createElement() {
    let newDiv = document.createElement("div");
    newDiv.style.marginBottom = "2vh";

    let text = document.createElement("p");
    text.textContent = "function";

    let nameInput = globalInputField.cloneNode(true);
    nameInput.setAttribute("placeholder", "function name");
    nameInput.addEventListener("change", (event) => {
      this.name = event.target.value;
    });

    let paramField = globalInputField.cloneNode(true);
    paramField.setAttribute("placeholder", "arguments");
    paramField.addEventListener("change", (event) => {
      this.parameter = event.target.value;
    });

    let block = globalFertileDiv.cloneNode(true);
    block.addEventListener("drop", (event) => {
      event.preventDefault();
      event.stopPropagation();
      let newChild = drop2(event);
      this.children = [...this.children, newChild];
    });

    let returnInput = globalInputField.cloneNode(true);
    returnInput.setAttribute("placeholder", "return var");
    returnInput.addEventListener("change", (event) => {
      this.return = event.target.value;
    });

    newDiv.appendChild(text);
    newDiv.appendChild(nameInput);
    newDiv.appendChild(paramField);
    newDiv.appendChild(block);
    newDiv.appendChild(returnInput);

    return newDiv;
  }

  generateCode() {
    let functionCode = "";
    if (`${this.parameter==""}`)
    {
      functionCode = `function ${this.name}()\n{\n`;
    }
    if (`${this.parameter}`!= ""){
      functionCode = `function ${this.name}($${this.parameter})\n{\n`;
      console.log(functionCode);
    }
    
    let childCode = "";

    for (let i = 0; i < this.children.length; i++) {
      childCode = childCode + this.children[i].generateCode();
    }
    childCode = childCode + `return $${this.return};\n}\n`;
    return functionCode + childCode;
  }
}

class CallFunction
{
  constructor()
  {
    this.name = "";
    this.parameter = "";
  }

  createElement()
  {
    let newDiv = document.createElement("div");
    newDiv.style.marginBottom = "2vh";

    let functionName = globalInputField.cloneNode(true);
    functionName.setAttribute("placeholder", "function name");
    functionName.addEventListener("change", (event) => {
      this.name = event.target.value;
    });

    let parameterName = globalInputField.cloneNode(true);
    parameterName.setAttribute("placeholder", "Parameters");
    parameterName.addEventListener("change", (event) => {
      this.parameter = event.target.value;
    });

    newDiv.appendChild(functionName);
    newDiv.appendChild(parameterName);

    return newDiv;
  }

  generateCode()
  {
    if (`${this.parameter}`=="")
    {
      return `${this.name} ();\n`
    }
    return `${this.name} ($${this.parameter});\n`
  }
}

class WriteFile {
  constructor() {
    this.varName = "";
    this.fileName = "";
    this.text = "";
  }

  createElement() {
    let newDiv = document.createElement("div");
    newDiv.style.display = "flex";
    newDiv.style.flexDirection = "row";
    newDiv.style.marginBottom = "2vh";

    let varInput = globalInputField.cloneNode(true);
    varInput.setAttribute("placeholder", "var name");
    varInput.addEventListener("change", (event) => {
      this.varName = event.target.value;
    });

    let equals = globalEqualSign.cloneNode(true);

    let fopen = document.createElement("p");
    fopen.textContent = "fopen";

    let fileInput = globalInputField.cloneNode(true);
    fileInput.setAttribute("placeholder", "complete path");
    fileInput.addEventListener("change", (event) => {
      this.fileName = event.target.value;
    });

    let newText = globalInputField.cloneNode(true);
    newText.setAttribute("placeholder", "Text to add");
    newText.addEventListener("change", (event) => {
      this.text = event.target.value;
    });

    newDiv.appendChild(varInput);
    newDiv.appendChild(equals);
    newDiv.appendChild(fopen);
    newDiv.appendChild(fileInput);
    newDiv.appendChild(newText);

    return newDiv;
  }

  generateCode() {
    return `$${this.varName} = fopen("${this.fileName}","a" );\nfwrite($${this.varName},"${this.text}");\nfclose($${this.varName});`;
  }
}

class ReadFile {
  constructor() {
    this.varName = "";
    this.fileName = "";
    this.text = "";
  }

  createElement() {
    let newDiv = document.createElement("div");
    newDiv.style.display = "flex";
    newDiv.style.flexDirection = "row";
    newDiv.style.marginBottom = "2vh";

    let varInput = globalInputField.cloneNode(true);
    varInput.setAttribute("placeholder", "var name");
    varInput.addEventListener("change", (event) => {
      this.varName = event.target.value;
    });

    let equals = globalEqualSign.cloneNode(true);

    let fopen = document.createElement("p");
    fopen.textContent = "fread";

    let fileInput = globalInputField.cloneNode(true);
    fileInput.setAttribute("placeholder", "complete path");
    fileInput.addEventListener("change", (event) => {
      this.fileName = event.target.value;
    });

    newDiv.appendChild(varInput);
    newDiv.appendChild(equals);
    newDiv.appendChild(fopen);
    newDiv.appendChild(fileInput);

    return newDiv;
  }

  generateCode() {
    return `$veryObscureVariable = fopen("${this.fileName}","r" );\n$${this.varName} =fread($veryObscureVariable,filesize("${this.fileName}"));\nfclose($veryObscureVariable);`;
  }
}

function returnElement(id) {
  let x;
  switch (id) {
    case "setVal":
      x = new SetVar();
      break;
    case "ifButton":
      x = new SimpleIf();
      break;
    case "ifElseButton":
      x = new IfElse();
      break;
    case "forLoop":
      x = new ForLoop();
      break;
    case "whileLoop":
      x = new WhileLoop();
      break;
    case "echo":
      x = new Echo();
      break;
    case "add":
      x = new Arithmetic();
      break;
    case "function":
      x = new Function();
      break;
    case "writeFile":
      x = new WriteFile();
      break;
    case "readFile":
      x = new ReadFile();
      break;
    case "callFunction":
      x = new CallFunction();
      break;
  }
  return x;
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  event.stopPropagation();
  console.log({ event: event.target.id });
  if (event.target.id == "div2") {
    console.log("imne gfefdae");
    var data = event.dataTransfer.getData("text");
    console.log({ data });
    let newElement = returnElement(data);
    globalQueue.push(newElement);
    event.target.appendChild(newElement.createElement());
  }
}

function drop2(event) {
  event.preventDefault();
  event.stopPropagation();
  console.log({ event: event.target.id });
  if (event.target.classList.contains("fertileDiv")) {
    console.log("imne gfefdae");
    var data = event.dataTransfer.getData("text");
    console.log({ data });
    let newElement = returnElement(data);
    event.target.appendChild(newElement.createElement());
    return newElement;
  }
}

function outputCode() {
  let code = "";
  for (let i = 0; i < globalQueue.length; i++) {
    code = code + "\n" + globalQueue[i].generateCode();
  }
  finalCode = document.createElement("p");
  finalCode.textContent = code;
  finalCode.style.whiteSpace = "pre-wrap";
  const element = document.getElementById("codeDiv");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  document.getElementById("codeDiv").appendChild(finalCode);
  document.getElementById("final").value = finalCode.textContent;
  document.getElementById("executeButton").disabled = false;
  //console.log(document.getElementById("final").value);
}
