# Medium Unlimited   [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Yay!!%20I%20found%20this%20open%20source%20chrome%20extension%20to%20read%20Medium.com%20membership%20articles%20for%20free!%20%0ACheck%20it%20out%20-%20&url=https://github.com/manojVivek/medium-unlimited&hashtags=medium,membership,free,github,oss,opensource)


Code repository for the browser extension to unlock the articles behind the medium.com membership paywall.

Try the production version of the extension here: 

For Chrome: https://manojvivek.github.io/medium-unlimited/download/

For Firefox: https://addons.mozilla.org/en-US/firefox/addon/medium-unlimited-read-for-free


# Development

Run the following to build the code:

```
npm run dev         #For local development
#or
npm run build       #For production release
```

This will generate the bundle and other required files in ./dist directory.

Load the generated chrome extension in chrome by `Kebab menu(⋮) -> More Tools -> Extensions` and then click on `LOAD UNPACKED` and select the dist folder.
Chrome extension is loaded and ready to use.

# Adding custom domains

1. Go to the unpacked folder of the extension
2. Open `manifest.json` in any text editor and add your website in both `"matches"` and `"permissions"` lists:
    ```diff
    "matches": [
    +    "https://your.custom.domain/*",
        "https://medium.com/*",
        ...
    ]
    "permissions": [
        "webRequest",
        "webRequestBlocking",
    +    "https://your.custom.domain/*",
        "https://medium.com/*",
        ...
    ]
    ```
3. Open `background.bundle.js` and add your website in the list at the end of the file (you can find this list by some existing sites like `https://medium.com/*`):
    ```diff
    i = [
    +    'https://your.custom.domain/*',
        'https://medium.com/*',
        ...
    ];
    ```
4. Save files and load the extension again in your browser

# Screenshot:
![alt text](https://raw.githubusercontent.com/manojVivek/medium-unlimited/master/designs/screenshot.png "Before after comparison")
