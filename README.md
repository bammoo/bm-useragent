## Usage 用法

```js
var bmUserAgent = require('bm-useragent');

function someMiddleware(req, res, next) {
  var ua = bmUserAgent(req.headers['user-agent']);
  if(ua.mobile)
    return res.send('Please open it at desktop.');
  return next();
}
```


## API

### Properties

 - `mobile`
 - `ios` 
 - `mobileSafari`
 - `android`
 - `android4_4`
 - `qqbrowser`
 - `meizu`
 - `weixin`