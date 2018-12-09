# Medium Unlimited   [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Yay!!%20I%20found%20this%20open%20source%20chrome%20extension%20to%20read%20Medium.com%20membership%20articles%20for%20free!%20%0ACheck%20it%20out%20-%20&url=https://github.com/manojVivek/medium-unlimited&hashtags=medium,membership,free,github,oss,opensource)

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/eipfkfmeeebeehnkhmmgneiopemjamej.svg)](https://chrome.google.com/webstore/detail/medium-unlimited-read-pai/eipfkfmeeebeehnkhmmgneiopemjamej)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/rating/eipfkfmeeebeehnkhmmgneiopemjamej.svg)](https://chrome.google.com/webstore/detail/medium-unlimited-read-pai/eipfkfmeeebeehnkhmmgneiopemjamej)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/users/eipfkfmeeebeehnkhmmgneiopemjamej.svg)](https://chrome.google.com/webstore/detail/medium-unlimited-read-pai/eipfkfmeeebeehnkhmmgneiopemjamej)


Code repository for the chrome extension to unlock the articles behind the medium.com membership paywall.

Try the production version of the extension here: https://chrome.google.com/webstore/detail/medium-unlimited/eipfkfmeeebeehnkhmmgneiopemjamej

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

# Screenshot:
![alt text](https://raw.githubusercontent.com/manojVivek/medium-unlimited/master/designs/screenshot.png "Before after comparison")
