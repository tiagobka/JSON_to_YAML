
function convert(){
    const jsonTextBox = document.getElementById('json_code')
    const jsonCode = jsonTextBox.value;
    let json = "";
    let errorMessage= "";

    try{
        json = JSON.parse(jsonCode);
        errorMessage = "";
    }catch(error){
        console.error(error.message)
        errorMessage = error.message
    }

    if (errorMessage !== ""){
        jsonTextBox.classList.add('errorState');
        document.getElementById('error').innerText = errorMessage;
    }else{
        jsonTextBox.classList.remove('errorState');
        document.getElementById('error').innerText = "";
        document.getElementById('yaml_code').value = "";
        parse(json, '')
    }
}


function appendLineToYAML(string){
    document.getElementById('yaml_code').value += string + "\n";
}

function parse(cursor, currentIndentation){

    if (Array.isArray(cursor)){
        appendLineToYAML(`${currentIndentation}type: array`);
        appendLineToYAML(`${currentIndentation}items:`);
        if(cursor.length > 0){
            parse(cursor[0], `${currentIndentation}  `)
        }else{
            //default to <any>
            appendLineToYAML(`${currentIndentation}  type: object`)
        }

    }else if (typeof cursor === "object"){
        appendLineToYAML(`${currentIndentation}type: object`);
        if (Object.keys(cursor).length === 0){return;}
        appendLineToYAML(`${currentIndentation}properties:`);
        for(let key in cursor){
            appendLineToYAML(`${currentIndentation}  ${key}:`);
            if(cursor.hasOwnProperty(key)){
                parse(cursor[key], `${currentIndentation}    `)
            }
        }
    }else{
        appendLineToYAML(`${currentIndentation}type: ${typeof cursor}`)
    }

}