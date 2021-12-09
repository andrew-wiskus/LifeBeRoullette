


npm install -> npm start 


game window on start is controlled here

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
