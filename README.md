# Medium Unlimited

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
