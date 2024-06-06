(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Dungeon"] = factory();
	else
		root["Dungeon"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = __webpack_require__(4);

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = __webpack_require__(5);

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = __webpack_require__(6);

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = __webpack_require__(7);

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = __webpack_require__(8);

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = __webpack_require__(9);

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = __webpack_require__(10);

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = String(data);
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(0) && __webpack_require__(2)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.alea = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(0)   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(0) && __webpack_require__(2)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor128 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(0)   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(0) && __webpack_require__(2)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorwow = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(0)   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v, w;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, w, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      w = X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) w = X[7] = -1; else w = X[j];

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(0) && __webpack_require__(2)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorshift7 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(0)   // present with an AMD loader
);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
};

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(0) && __webpack_require__(2)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor4096 = impl;
}

})(
  this,                                     // window object or global
   true && module,    // present in node.js
  __webpack_require__(0)   // present with an AMD loader
);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
};

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(0) && __webpack_require__(2)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.tychei = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(0)   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)(module)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
Copyright 2019 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (global, pool, math) {
//
// The following constants are related to IEEE 754 limits.
//

var width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ( true && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = __webpack_require__(11);
  } catch (ex) {}
} else if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return seedrandom; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}


// End anonymous scope, and pass initial values.
})(
  // global: `self` in browsers (including strict mode and web workers),
  // otherwise `this` in Node and other environments
  (typeof self !== 'undefined') ? self : this,
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ../node_modules/seedrandom/index.js
var seedrandom = __webpack_require__(3);

// CONCATENATED MODULE: ./random.ts

var random_Random = /** @class */ (function () {
    function Random(seedValue) {
        this.rng = seedrandom(seedValue);
    }
    Random.prototype.randomInteger = function (min, max, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.onlyOdd, onlyOdd = _c === void 0 ? false : _c, _d = _b.onlyEven, onlyEven = _d === void 0 ? false : _d;
        if (onlyOdd)
            return this.randomOddInteger(min, max);
        else if (onlyEven)
            return this.randomEvenInteger(min, max);
        else
            return Math.floor(this.rng() * (max - min + 1) + min);
    };
    Random.prototype.randomEvenInteger = function (min, max) {
        if (min % 2 !== 0 && min < max)
            min++;
        if (max % 2 !== 0 && max > min)
            max--;
        var range = (max - min) / 2;
        return Math.floor(this.rng() * (range + 1)) * 2 + min;
    };
    Random.prototype.randomOddInteger = function (min, max) {
        if (min % 2 === 0)
            min++;
        if (max % 2 === 0)
            max--;
        var range = (max - min) / 2;
        return Math.floor(this.rng() * (range + 1)) * 2 + min;
    };
    Random.prototype.randomPick = function (array) {
        return array[this.randomInteger(0, array.length - 1)];
    };
    return Random;
}());
/* harmony default export */ var random = (random_Random);

// CONCATENATED MODULE: ./tiles.ts
var TILES;
(function (TILES) {
    TILES[TILES["EMPTY"] = 0] = "EMPTY";
    TILES[TILES["WALL"] = 1] = "WALL";
    TILES[TILES["FLOOR"] = 2] = "FLOOR";
    TILES[TILES["DOOR"] = 3] = "DOOR";
})(TILES || (TILES = {}));
/* harmony default export */ var tiles_0 = (TILES);

// CONCATENATED MODULE: ./create-2d-array.ts
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/**
 * Creates a 2D array of width x height, filled with the given value.
 */
function create2DArray(width, height, value) {
    return __spreadArrays(Array(height)).map(function () { return Array(width).fill(value); });
}

// CONCATENATED MODULE: ./room.ts


var room_Room = /** @class */ (function () {
    function Room(width, height) {
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
        this.centerX = 0;
        this.centerY = 0;
        this.width = width;
        this.height = height;
        this.setPosition(0, 0);
        this.tiles = create2DArray(width, height, tiles_0.FLOOR);
        // Place walls around edges of room.
        for (var y = 0; y < this.height; y++) {
            this.setTileAt(0, y, tiles_0.WALL);
            this.setTileAt(width - 1, y, tiles_0.WALL);
        }
        for (var x = 0; x < this.width; x++) {
            this.setTileAt(x, 0, tiles_0.WALL);
            this.setTileAt(x, height - 1, tiles_0.WALL);
        }
    }
    Room.prototype.forEachTile = function (fn) {
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                fn({ x: x, y: y }, this.getTileAt(x, y));
            }
        }
    };
    Room.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
        this.left = x;
        this.right = x + (this.width - 1);
        this.top = y;
        this.bottom = y + (this.height - 1);
        this.centerX = x + Math.floor(this.width / 2);
        this.centerY = y + Math.floor(this.height / 2);
    };
    Room.prototype.getDoorLocations = function () {
        var doors = [];
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (this.getTileAt(x, y) == tiles_0.DOOR) {
                    doors.push({ x: x, y: y });
                }
            }
        }
        return doors;
    };
    Room.prototype.overlaps = function (otherRoom) {
        if (this.right < otherRoom.left)
            return false;
        else if (this.left > otherRoom.right)
            return false;
        else if (this.bottom < otherRoom.top)
            return false;
        else if (this.top > otherRoom.bottom)
            return false;
        else
            return true;
    };
    /**
     * Check if the given local coordinates are within the dimensions of the room.
     * @param x
     * @param y
     */
    Room.prototype.isInBounds = function (x, y) {
        return x >= 0 && x < this.width - 1 && y >= 0 && y < this.height - 1;
    };
    /**
     * Get the tile at the given local coordinates of the room.
     * @param x
     * @param y
     */
    Room.prototype.getTileAt = function (x, y) {
        return this.tiles[y][x];
    };
    /**
     * Set the tile at the given local coordinates of the room.
     * @param x
     * @param y
     * @param tile
     */
    Room.prototype.setTileAt = function (x, y, tile) {
        this.tiles[y][x] = tile;
    };
    /**
     * Check if two rooms share a door between them.
     * @param otherRoom
     */
    Room.prototype.isConnectedTo = function (otherRoom) {
        var doors = this.getDoorLocations();
        for (var _i = 0, doors_1 = doors; _i < doors_1.length; _i++) {
            var d = doors_1[_i];
            // Find door position relative to otherRoom's local coordinate system.
            var dx = this.x + d.x - otherRoom.x;
            var dy = this.y + d.y - otherRoom.y;
            if (otherRoom.isInBounds(dx, dy) && otherRoom.getTileAt(dx, dy) === tiles_0.DOOR) {
                return true;
            }
        }
        return false;
    };
    return Room;
}());
/* harmony default export */ var room_0 = (room_Room);

// CONCATENATED MODULE: ./debug.ts
var debug_spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

var attributesToHtmlString = function (attrObj) {
    return Object.entries(attrObj)
        .map(function (_a) {
        var key = _a[0], val = _a[1];
        return key + "=\"" + val + "\"";
    })
        .join(" ");
};
// Debug by dumping a table to the console where each element in the map is the number of rooms in
// that location
function debugRoomGrid(dungeon) {
    var table = dungeon.roomGrid.map(function (row) { return row.map(function (elem) { return ("" + elem.length).padStart(2); }); });
    console.log(table.map(function (row) { return row.join(" "); }).join("\n"));
}
function debugHtmlStringMap(dungeon, config) {
    if (config === void 0) { config = {}; }
    var c = Object.assign({}, {
        empty: " ",
        emptyAttributes: { class: "dungeon__empty" },
        wall: "#",
        wallAttributes: { class: "dungeon__wall" },
        floor: "_",
        floorAttributes: { class: "dungeon__wall" },
        door: ".",
        doorAttributes: { class: "dungeon__door" },
        containerAttributes: { class: "dungeon" }
    }, config);
    var tiles = dungeon.getMappedTiles({
        empty: "<td " + attributesToHtmlString(c.emptyAttributes) + ">" + c.empty + "</td>",
        floor: "<td " + attributesToHtmlString(c.floorAttributes) + ">" + c.floor + "</td>",
        door: "<td " + attributesToHtmlString(c.doorAttributes) + ">" + c.door + "</td>",
        wall: "<td " + attributesToHtmlString(c.wallAttributes) + ">" + c.wall + "</td>"
    });
    var tilesHtml = tiles.map(function (row) { return "<tr>" + row.join("") + "</tr>"; }).join("");
    var htmlString = "<pre " + attributesToHtmlString(c.containerAttributes) + "><table><tbody>" + tilesHtml + "</tbody></table></pre>";
    return htmlString;
}
function debugHtmlMap(dungeon, config) {
    if (config === void 0) { config = {}; }
    var htmlString = debugHtmlStringMap(dungeon, config);
    var htmlFragment = document.createRange().createContextualFragment(htmlString);
    return htmlFragment;
}
function debugMap(dungeon, config) {
    if (config === void 0) { config = {}; }
    var c = Object.assign({}, {
        empty: " ",
        emptyColor: "rgb(0, 0, 0)",
        wall: "#",
        wallColor: "rgb(255, 0, 0)",
        floor: "_",
        floorColor: "rgb(210, 210, 210)",
        door: ".",
        doorColor: "rgb(0, 0, 255)",
        fontSize: "15px"
    }, config);
    var string = "";
    var styles = [];
    // First line in the browser console window has console line mapping (e.g. "dungeon.js:724") which
    // throws off the table. Kill two birds by displaying a guide on the first two lines.
    string += "Dungeon: the console window should be big enough to see all of the guide on the next line:\n";
    string += "%c|" + "=".repeat(dungeon.width * 2 - 2) + "|\n\n";
    styles.push("font-size: " + c.fontSize);
    for (var y = 0; y < dungeon.height; y += 1) {
        for (var x = 0; x < dungeon.width; x += 1) {
            var tile = dungeon.tiles[y][x];
            if (tile === tiles_0.EMPTY) {
                string += "%c" + c.empty;
                styles.push("color: " + c.emptyColor + "; font-size: " + c.fontSize);
            }
            else if (tile === tiles_0.WALL) {
                string += "%c" + c.wall;
                styles.push("color: " + c.wallColor + "; font-size: " + c.fontSize);
            }
            else if (tile === tiles_0.FLOOR) {
                string += "%c" + c.floor;
                styles.push("color: " + c.floorColor + "; font-size: " + c.fontSize);
            }
            else if (tile === tiles_0.DOOR) {
                string += "%c" + c.door;
                styles.push("color: " + c.doorColor + "; font-size: " + c.fontSize);
            }
            string += " ";
        }
        string += "\n";
    }
    console.log.apply(console, debug_spreadArrays([string], styles));
}

// CONCATENATED MODULE: ./math.ts
function isEven(value) {
    return Number.isInteger(value) && value % 2 === 0;
}
function isOdd(value) {
    return Number.isInteger(value) && value % 2 !== 0;
}


// CONCATENATED MODULE: ./dungeon.ts






var dungeon_Dungeon = /** @class */ (function () {
    function Dungeon(config) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.rooms = [];
        // 2D grid matching map dimensions where every element contains an array of all the rooms in
        // that location.
        this.roomGrid = [];
        this.width = config.width;
        this.height = config.height;
        this.doorPadding = (_a = config.doorPadding) !== null && _a !== void 0 ? _a : 1;
        this.rooms = [];
        this.randomSeed = config.randomSeed;
        this.r = new random(this.randomSeed);
        var rooms = config.rooms;
        var roomWidth = rooms.width;
        var roomHeight = rooms.height;
        var maxPossibleRoomArea = roomWidth.max * roomHeight.max;
        var minPossibleRoomArea = roomWidth.min * roomHeight.min;
        var maxPossibleRooms = Math.floor((this.width * this.height) / minPossibleRoomArea);
        this.roomWidthConfig = {
            min: roomWidth.min,
            max: roomWidth.max,
            onlyOdd: (_b = roomWidth.onlyOdd) !== null && _b !== void 0 ? _b : false,
            onlyEven: (_c = roomWidth.onlyEven) !== null && _c !== void 0 ? _c : false
        };
        this.roomHeightConfig = {
            min: roomHeight.min,
            max: roomHeight.max,
            onlyOdd: (_d = roomHeight.onlyOdd) !== null && _d !== void 0 ? _d : false,
            onlyEven: (_e = roomHeight.onlyEven) !== null && _e !== void 0 ? _e : false
        };
        this.maxRooms = (_f = rooms.maxRooms) !== null && _f !== void 0 ? _f : maxPossibleRooms;
        this.maxRoomArea = (_g = rooms.maxArea) !== null && _g !== void 0 ? _g : maxPossibleRoomArea;
        this.adjustDimensionConfigForParity(this.roomWidthConfig);
        this.adjustDimensionConfigForParity(this.roomHeightConfig);
        this.checkDimensionConfig(this.roomWidthConfig);
        this.checkDimensionConfig(this.roomHeightConfig);
        // Validate the room width and height settings.
        if (this.roomWidthConfig.max > this.width) {
            throw new Error("Room max width cannot exceed dungeon width.");
        }
        if (this.roomHeightConfig.max > this.height) {
            throw new Error("Room max height cannot exceed dungeon height.");
        }
        // Validate the max area based on min dimensions.
        if (this.maxRoomArea < minPossibleRoomArea) {
            throw new Error("The minimum dimensions specified exceeds the given maxArea.");
        }
        this.generate();
        this.tiles = this.getTiles();
    }
    /**
     * Adjust the given dimension config for parity settings (onlyOdd, onlyEven) so that min/max are
     * adjusted to reflect actual possible values.
     * @param dimensionConfig
     */
    Dungeon.prototype.adjustDimensionConfigForParity = function (dimensionConfig) {
        if (dimensionConfig.onlyOdd) {
            if (isEven(dimensionConfig.min)) {
                dimensionConfig.min++;
                console.log("Dungeon: warning, min dimension adjusted to match onlyOdd setting.");
            }
            if (isEven(dimensionConfig.max)) {
                dimensionConfig.max--;
                console.log("Dungeon: warning, max dimension adjusted to match onlyOdd setting.");
            }
        }
        else if (dimensionConfig.onlyEven) {
            if (isOdd(dimensionConfig.min)) {
                dimensionConfig.min++;
                console.log("Dungeon: warning, min dimension adjusted to match onlyEven setting.");
            }
            if (isOdd(dimensionConfig.max)) {
                dimensionConfig.max--;
                console.log("Dungeon: warning, max dimension adjusted to match onlyEven setting.");
            }
        }
    };
    Dungeon.prototype.checkDimensionConfig = function (dimensionConfig) {
        var max = dimensionConfig.max, min = dimensionConfig.min, onlyEven = dimensionConfig.onlyEven, onlyOdd = dimensionConfig.onlyOdd;
        if (onlyEven && onlyOdd) {
            throw new Error("Cannot use both onlyEven and onlyOdd in room's width/height config.");
        }
        if (max < min) {
            throw new Error("Room width and height max must be >= min.");
        }
        if (min < 3) {
            throw new Error("Room width and height must be >= 3.");
        }
    };
    Dungeon.prototype.getConfig = function () {
        return {
            width: this.width,
            height: this.height,
            doorPadding: this.doorPadding,
            randomSeed: this.randomSeed,
            rooms: {
                width: this.roomWidthConfig,
                height: this.roomHeightConfig,
                maxArea: this.maxRoomArea,
                maxRooms: this.maxRooms
            }
        };
    };
    Dungeon.prototype.drawToConsole = function (config) {
        debugMap(this, config);
    };
    Dungeon.prototype.drawToHtml = function (config) {
        return debugHtmlMap(this, config);
    };
    Dungeon.prototype.getMappedTiles = function (tileMapping) {
        if (tileMapping === void 0) { tileMapping = {}; }
        tileMapping = Object.assign({}, { empty: 0, wall: 1, floor: 2, door: 3 }, tileMapping);
        return this.tiles.map(function (row) {
            return row.map(function (tile) {
                if (tile === tiles_0.EMPTY)
                    return tileMapping.empty;
                else if (tile === tiles_0.WALL)
                    return tileMapping.wall;
                else if (tile === tiles_0.FLOOR)
                    return tileMapping.floor;
                else if (tile === tiles_0.DOOR)
                    return tileMapping.door;
            });
        });
    };
    Dungeon.prototype.getCenter = function () {
        return {
            x: Math.floor(this.width / 2),
            y: Math.floor(this.height / 2)
        };
    };
    Dungeon.prototype.generate = function () {
        this.rooms = [];
        this.roomGrid = [];
        for (var y = 0; y < this.height; y++) {
            this.roomGrid.push([]);
            for (var x = 0; x < this.width; x++) {
                this.roomGrid[y].push([]);
            }
        }
        // Seed the map with a starting randomly sized room in the center of the map.
        var mapCenter = this.getCenter();
        var room = this.createRandomRoom();
        room.setPosition(mapCenter.x - Math.floor(room.width / 2), mapCenter.y - Math.floor(room.height / 2));
        this.addRoom(room);
        // Continue generating rooms until we hit our cap or have hit our maximum iterations (generally
        // due to not being able to fit any more rooms in the map).
        var attempts = 0;
        var maxAttempts = this.maxRooms * 5;
        while (this.rooms.length < this.maxRooms && attempts < maxAttempts) {
            this.generateRoom();
            attempts++;
        }
    };
    Dungeon.prototype.hasRoomAt = function (x, y) {
        return x < 0 || y < 0 || x >= this.width || y >= this.height || this.roomGrid[y][x].length > 0;
    };
    Dungeon.prototype.getRoomAt = function (x, y) {
        if (this.hasRoomAt(x, y)) {
            // Assumes 1 room per tile, which is valid for now
            return this.roomGrid[y][x][0];
        }
        else {
            return null;
        }
    };
    /**
     * Attempt to add a room and return true/false based on whether it was successful.
     * @param room
     */
    Dungeon.prototype.addRoom = function (room) {
        if (!this.canFitRoom(room))
            return false;
        this.rooms.push(room);
        // Update all tiles in the roomGrid to indicate that this room is sitting on them.
        for (var y = room.top; y <= room.bottom; y++) {
            for (var x = room.left; x <= room.right; x++) {
                this.roomGrid[y][x].push(room);
            }
        }
        return true;
    };
    Dungeon.prototype.canFitRoom = function (room) {
        // Make sure the room fits inside the dungeon.
        if (room.x < 0 || room.right > this.width - 1)
            return false;
        if (room.y < 0 || room.bottom > this.height - 1)
            return false;
        // Make sure this room doesn't intersect any existing rooms.
        for (var i = 0; i < this.rooms.length; i++) {
            if (room.overlaps(this.rooms[i]))
                return false;
        }
        return true;
    };
    Dungeon.prototype.createRandomRoom = function () {
        var width = 0;
        var height = 0;
        var area = 0;
        // Find width and height using min/max sizes while keeping under the maximum area.
        var _a = this, roomWidthConfig = _a.roomWidthConfig, roomHeightConfig = _a.roomHeightConfig;
        do {
            width = this.r.randomInteger(roomWidthConfig.min, roomWidthConfig.max, {
                onlyEven: roomWidthConfig.onlyEven,
                onlyOdd: roomWidthConfig.onlyOdd
            });
            height = this.r.randomInteger(roomHeightConfig.min, roomHeightConfig.max, {
                onlyEven: roomHeightConfig.onlyEven,
                onlyOdd: roomHeightConfig.onlyOdd
            });
            area = width * height;
        } while (area > this.maxRoomArea);
        return new room_0(width, height);
    };
    Dungeon.prototype.generateRoom = function () {
        var room = this.createRandomRoom();
        // Only allow 150 tries at placing the room
        var i = 150;
        while (i > 0) {
            // Attempt to find another room to attach this one to
            var result = this.findRoomAttachment(room);
            room.setPosition(result.x, result.y);
            // Try to add it. If successful, add the door between the rooms and break the loop.
            if (this.addRoom(room)) {
                var _a = this.findNewDoorLocation(room, result.target), door1 = _a[0], door2 = _a[1];
                this.addDoor(door1);
                this.addDoor(door2);
                break;
            }
            i -= 1;
        }
    };
    Dungeon.prototype.getTiles = function () {
        var tiles = create2DArray(this.width, this.height, tiles_0.EMPTY);
        this.rooms.forEach(function (room) {
            room.forEachTile(function (point, tile) {
                tiles[room.y + point.y][room.x + point.x] = tile;
            });
        });
        return tiles;
    };
    Dungeon.prototype.getPotentiallyTouchingRooms = function (room) {
        var _this = this;
        var touchingRooms = [];
        // function that checks the list of rooms at a point in our grid for any potential touching
        // rooms
        var checkRoomList = function (x, y) {
            var r = _this.roomGrid[y][x];
            for (var i = 0; i < r.length; i++) {
                // make sure this room isn't the one we're searching around and that it isn't already in the
                // list
                if (r[i] != room && touchingRooms.indexOf(r[i]) === -1) {
                    // make sure this isn't a corner of the room (doors can't go into corners)
                    var lx = x - r[i].x;
                    var ly = y - r[i].y;
                    if ((lx > 0 && lx < r[i].width - 1) || (ly > 0 && ly < r[i].height - 1)) {
                        touchingRooms.push(r[i]);
                    }
                }
            }
        };
        // iterate the north and south walls, looking for other rooms in those tile locations
        for (var x = room.x + 1; x < room.x + room.width - 1; x++) {
            checkRoomList(x, room.y);
            checkRoomList(x, room.y + room.height - 1);
        }
        // iterate the west and east walls, looking for other rooms in those tile locations
        for (var y = room.y + 1; y < room.y + room.height - 1; y++) {
            checkRoomList(room.x, y);
            checkRoomList(room.x + room.width - 1, y);
        }
        return touchingRooms;
    };
    Dungeon.prototype.findNewDoorLocation = function (room1, room2) {
        var door1 = { x: -1, y: -1 };
        var door2 = { x: -1, y: -1 };
        if (room1.y === room2.y - room1.height) {
            // North
            door1.x = door2.x = this.r.randomInteger(Math.floor(Math.max(room2.left, room1.left) + this.doorPadding), Math.floor(Math.min(room2.right, room1.right) - this.doorPadding));
            door1.y = room1.y + room1.height - 1;
            door2.y = room2.y;
        }
        else if (room1.x == room2.x - room1.width) {
            // West
            door1.x = room1.x + room1.width - 1;
            door2.x = room2.x;
            door1.y = door2.y = this.r.randomInteger(Math.floor(Math.max(room2.top, room1.top) + this.doorPadding), Math.floor(Math.min(room2.bottom, room1.bottom) - this.doorPadding));
        }
        else if (room1.x == room2.x + room2.width) {
            // East
            door1.x = room1.x;
            door2.x = room2.x + room2.width - 1;
            door1.y = door2.y = this.r.randomInteger(Math.floor(Math.max(room2.top, room1.top) + this.doorPadding), Math.floor(Math.min(room2.bottom, room1.bottom) - this.doorPadding));
        }
        else if (room1.y == room2.y + room2.height) {
            // South
            door1.x = door2.x = this.r.randomInteger(Math.floor(Math.max(room2.left, room1.left) + this.doorPadding), Math.floor(Math.min(room2.right, room1.right) - this.doorPadding));
            door1.y = room1.y;
            door2.y = room2.y + room2.height - 1;
        }
        return [door1, door2];
    };
    Dungeon.prototype.findRoomAttachment = function (room) {
        var r = this.r.randomPick(this.rooms);
        var x = 0;
        var y = 0;
        var pad = 2 * this.doorPadding; // 2x padding to account for the padding both rooms need
        // Randomly position this room on one of the sides of the random room.
        switch (this.r.randomInteger(0, 3)) {
            // north
            case 0:
                // x = r.left - (room.width - 1) would have rooms sharing exactly 1x tile
                x = this.r.randomInteger(r.left - (room.width - 1) + pad, r.right - pad);
                y = r.top - room.height;
                break;
            // west
            case 1:
                x = r.left - room.width;
                y = this.r.randomInteger(r.top - (room.height - 1) + pad, r.bottom - pad);
                break;
            // east
            case 2:
                x = r.right + 1;
                y = this.r.randomInteger(r.top - (room.height - 1) + pad, r.bottom - pad);
                break;
            // south
            case 3:
                x = this.r.randomInteger(r.left - (room.width - 1) + pad, r.right - pad);
                y = r.bottom + 1;
                break;
        }
        // Return the position for this new room and the target room
        return {
            x: x,
            y: y,
            target: r
        };
    };
    Dungeon.prototype.addDoor = function (doorPos) {
        // Get all the rooms at the location of the door
        var rooms = this.roomGrid[doorPos.y][doorPos.x];
        rooms.forEach(function (room) {
            room.setTileAt(doorPos.x - room.x, doorPos.y - room.y, tiles_0.DOOR);
        });
    };
    return Dungeon;
}());
/* harmony default export */ var dungeon_0 = (dungeon_Dungeon);

// CONCATENATED MODULE: ./index.ts
/* concated harmony reexport Room */__webpack_require__.d(__webpack_exports__, "Room", function() { return room_0; });
/* concated harmony reexport TILES */__webpack_require__.d(__webpack_exports__, "TILES", function() { return tiles_0; });



/* harmony default export */ var index = __webpack_exports__["default"] = (dungeon_0);



/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=dungeon.js.map