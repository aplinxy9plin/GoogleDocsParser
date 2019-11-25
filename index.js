const data = require("./data.json")
const fs = require("fs-extra")
const request = require("request")

const len = data.length
console.log("Start...")
start(0)

async function start(index){
    if(data[index]){
        for (let i = 0; i < data[index]["Фото Работ (макс. 10 фотографий)"].split(", ").length; i++) {
            await doRequest(data[index]["Фото Работ (макс. 10 фотографий)"].split(", ").map(item => item.split("?id=")[1])[i],
                data[index]["ФИО"],
                data[index]["Категория"],
                data[index]["Номинация"],
            )
        }
        for (let i = 0; i < data[index]["Фото Работ (макс. 10 фотографий)__1"].split(", ").length; i++) {
            await doRequest(data[index]["Фото Работ (макс. 10 фотографий)__1"].split(", ").map(item => item.split("?id=")[1])[i],
                data[index]["ФИО"],
                data[index]["Категория"],
                data[index]["Номинация"],
            )
        }
        console.log(`${index+1}/${len}...`)
        start(index+1)
    }else{
        console.log("Done.")
    }
}

function doRequest(url, username, category, nomination) {
    url = `https://drive.google.com/uc?id=${url}`
    const name = `result/${category}/${nomination}/${username}_${category}_${nomination}/${makeid(20)}.jpg`
    return new Promise(function (resolve, reject) {
        if(url){
            request(url, {encoding: 'binary'}, function (error, res, body) {
              fs.outputFile(name, body, 'binary', () => {
                  resolve(1);
              })
            });
        }else{
            resolve(0);
        }
    });
}
  
function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}