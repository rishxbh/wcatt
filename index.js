#!/usr/bin/env node

const fs= require("fs");
let arg= process.argv.slice(2); 
let flags=[];
let secondaryArguments = [];
let filenames=[];

for(let i of arg){
    if(i[0]=="-"){
        flags.push(i);
    }else if(i[0] == "%") {
        secondaryArguments.push(i.slice(1));
    }else{
        filenames.push(i);
    }
}

if(flags.length==0&&filenames.length!=0){
    for(let i of filenames){
        console.log(fs.readFileSync(i,"utf-8"));
    }
}else{
    for(let file of filenames) {
        let fileData = fs.readFileSync(file,"utf-8");
        for(let flag of flags) {
            if(flag == "-rs") {
                fileData = removeAll(fileData," ");
            }
            if(flag == "-rn") {
                fileData = removeAll(fileData, "\n")
            }
            if(flag == "-rsc") {
                for(let secondaryArgument of secondaryArguments) {
                    fileData = removeAll(fileData,secondaryArgument);
                }
            }
            if(flag=="-s"){
                let data=addSequence(fileData);
                console.log(data);
            }
            if(flag=="-sn"){
                let data=addSequenceTnel(fileData);
                for(let i=0;i<data.length;i++){
                    console.log(data[i]);
                }
            }
            if(flag=="-rl"){
                let ans=removeExtraLine(fileData);
                for(let i=0;i<ans.length;i++){
                    console.log(ans[i]);
                }
                
            }
            if(flag=="-w"){
                let file1data=fs.readFileSync(filenames[0],"utf-8");
                let file2data=fs.readFileSync(filenames[1],"utf-8");
                fs.writeFileSync(filenames[0],file1data+file2data)
            }
        }
        
    }
    
}
function removeAll(string, removalData) {
    return string.split(removalData).join("");
}

function addSequence(content){
    let contentArr=content.split("\n");
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]=(i+1)+" "+contentArr[i];
    }
    return contentArr;
}

function addSequenceTnel(content){
    let contentArr=content.split("\n");
    let count=1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!="\r"){
            contentArr[i]=count+" "+contentArr[i];
            count++;
        }
    }
    return contentArr;
}

function removeExtraLine(fileData){
    let contentArr=fileData.split("\n");
    let data=[];
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]=="\r"){
            continue;
        }else{
            data.push(contentArr[i]);
        }
    }

    // for(let i=0;i<contentArr.length;i++){
    //     if(contentArr[i]!=null){
    //         data.push(contentArr[i]);
    //     }
    // }
    return data;
}
