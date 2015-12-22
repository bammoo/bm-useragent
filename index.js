var bmUserAgentInit = function(_ua) {

  // 删除左右两端的空格
  function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }

  var _m = null,
    _formatV = function(vstr, vdiv) {
      var f = vstr.split(vdiv);
      f = f.shift() + '.' + f.join('');
      return f * 1;
    }, _rtn = {
      ua: _ua,
      version: null,
      ios: false,
      android: false,
      meizu: false,
      meizuVersion: null,
      weixin: false,
      wVersion: null,
      qqbrowser: false
    };
  _m = _ua.match(/MicroMessenger\/([\.0-9]+)/);
  if (_m != null) {
    _rtn.weixin = true;
    _rtn.wVersion = _formatV(_m[1], '.');
  }
  _m = _ua.match(/Android(\s|\/)([\.0-9]+)/);
  if (_m != null) {
    _rtn.android = true;
    _rtn.version = _formatV(_m[2], '.');

    // 魅族
    // 魅蓝 (m1(\s)note)(\s)
    _m = _ua.match(/(m1\snote|MEIZU|MX4|M040|M045|M351|M353|M355|M356)(\s)/);
    if (_m != null) {
      // alert(_m[0])
      _rtn.meizu = true;
      _rtn.meizuVersion = trim(_m[0]);
    }

    // qq 浏览器
    _m = _ua.match(/QQBrowser(\s|\/)([\.0-9]+)/);
    if (_m != null) {
      _rtn.qqbrowser = true;
    }
    
    return _rtn;
  }
  _m = _ua.match(/i(Pod|Pad|Phone).*\sOS\s([\_0-9]+)/);
  if (_m != null) {
    _rtn.ios = true;
    _rtn.version = _formatV(_m[2], '_');
    return _rtn;
  }
  return _rtn;
}

module.exports = function(ua) {
  var bmUserAgent = bmUserAgentInit(ua);
  
  bmUserAgent.touchSupport = bmUserAgent.ios || bmUserAgent.android || bmUserAgent.touchSupport;
  bmUserAgent.android4_4 = bmUserAgent.android && bmUserAgent.version >= 4.4;
  bmUserAgent.mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(bmUserAgent.ua);
  bmUserAgent.mobileSafari = bmUserAgent.ios && bmUserAgent.ua.match(/AppleWebKit/);

  return bmUserAgent;
};