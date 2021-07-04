#PATH 

-May 23rd, eskgetit.-
Ok didnt meet that deadline... August 1st?!

npm install -> npm start 


game window on start is controlled here, set your config and don't push it up ;)

`src/main.dev.ts`

```
  mainWindow = new BrowserWindow({
    show: false,
    width: 1476,
    height: 1405,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
    x: 1970,
    y: 0,
  });
```
