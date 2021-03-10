# Medium Unlimited   [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Yay!!%20I%20found%20this%20open%20source%20chrome%20extension%20to%20read%20Medium.com%20membership%20articles%20for%20free!%20%0ACheck%20it%20out%20-%20&url=https://github.com/manojVivek/medium-unlimited&hashtags=medium,membership,free,github,oss,opensource)

| :warning: **WARNING: A few of the added domains seem like are not working. Patches will be added as soon as someone finds a solution. ** |
| --- |

---

Code repository for the browser extension to unlock the articles behind the medium.com membership paywall.

Try the production version of the extension here:
- For Chrome: Download the latest archive from the releases sections. Extract the archive. Go to extensions page (or type in the browser's URL `chrome://extensions`). Enable `Developer mode`. Click `Load unpacked`. Show the path where you extracted the archive.
- For Firefox: https://addons.mozilla.org/en-US/firefox/addon/medium-unlimited-read-for-free.

**If someone knows how to build the firefox extension, please add a PR to add assets to the release section.** 

---

## Development

Run the following to build the code:

```shell
npm run dev         #For local development
#or
npm run build       #For production release
```

This will generate the bundle and other required files in ./dist directory.

Load the generated Chrome extension in chrome by `Kebab menu(⋮) -> More Tools -> Extensions` and then click on `LOAD UNPACKED` and select the dist folder.
Chrome extension is loaded and ready to use.

# Screenshot:
![alt text](https://raw.githubusercontent.com/manojVivek/medium-unlimited/master/designs/screenshot.png "Before after comparison")
