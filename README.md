Roullette Rouge Lite

May 23rd, eskgetit.

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


if this interests you and you want to dive deep.. this will be something that could really get things lit (get it, like lighting effects)
https://www.madebymike.com.au/writing/canvas-image-manipulation/