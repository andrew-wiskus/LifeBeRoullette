export class FileController {
    
    public static startSaveFile(filename: string, difficulty: string, date: string) {
        const fs = require('fs');
        const path = require('path');

        let newSave = {
            name: filename,
            difficulty: difficulty,
            date: date
        }
        
        //puts the name of each save into a text file to easiler get them later
        fs.appendFile('src/AppData/savefiles.txt', ',' + filename , function (err) {
            if (err) {
              console.log(err);
            }
        
        });
        //puts data into json file
        try {
            fs.writeFileSync(path.resolve(__dirname + "/AppData", filename + ".json"), JSON.stringify(newSave));
            
        } catch(e) {
            console.log(e);
        }
    }

    public static getDate(filename: string) {
        var json = require( "./../AppData/"+ filename + ".json"); 
        return json.date.slice(0,24);
    }

    public static readSaveFiles(){
        const fs = require('fs');
        var text = fs.readFileSync("./src/AppData/savefiles.txt") + '';
        var textByLine = text.split(",");
        return textByLine;

    }

    public static saveCurrentGameState() {
      console.log("Will Do Later When We Figure What in The Gamestore Needs To Be Saved");
    }
  
  }