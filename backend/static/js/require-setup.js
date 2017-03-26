
var require = {
  shim : {
    "bootstrap" : {"deps": ["jquery", "tether"] },
    "cookie": {},
    "googleSignIn": {},
    "ie10hack": {},
    "login": {"deps": ["jquery", "cookie"] },
    "tether": {"deps": ["jquery"] },
  },
  paths: {
    "bootstrap":"/bootstrap-4.0.0-alpha.6-dist/js/bootstrap.min",
    "cookie":"/js/cookie",
    "googleSignIn": "https://apis.google.com/js/platform",
    "ie10hack": "/js/ie10-viewport-bug-workaround",
    "jquery":"/jquery/jquery-3.2.0.min",
    "login": "/js/login",
    "tether": "/js/lib/tether_local",
  }
};
