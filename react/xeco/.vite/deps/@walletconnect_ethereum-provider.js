import {
  HashMD
} from "./chunk-PR5XCNAS.js";
import {
  LruMap,
  checksumAddress,
  defineFormatter,
  hexToBigInt,
  hexToNumber,
  isHex,
  keccak256,
  numberToHex,
  toHex
} from "./chunk-5SLYNUE4.js";
import {
  rotl,
  wrapConstructor
} from "./chunk-IXILO7AP.js";
import {
  A,
  C,
  E,
  IEvents,
  Po,
  Qe,
  Qo,
  clear,
  concat,
  createStore,
  del,
  destr,
  detect,
  esm_exports2 as esm_exports,
  f,
  formatJsonRpcError,
  formatJsonRpcRequest,
  formatJsonRpcResult,
  fromString,
  get,
  getBigIntRpcId,
  import_pino,
  init_esm,
  isJsonRpcError,
  isJsonRpcRequest,
  isJsonRpcResponse,
  isJsonRpcResult,
  isLocalhostUrl,
  isWsUrl,
  k,
  keys,
  parseConnectionError,
  payloadId,
  r,
  require_browser,
  require_buffer,
  require_cjs,
  require_cjs2,
  require_cjs3,
  require_crypto,
  require_events,
  require_inherits_browser,
  require_lodash,
  safeJsonParse,
  safeJsonStringify,
  set,
  sn,
  toString,
  y
} from "./chunk-TSWDCJ2T.js";
import {
  __commonJS,
  __toESM
} from "./chunk-XUG3XOB4.js";

// node_modules/elliptic/package.json
var require_package = __commonJS({
  "node_modules/elliptic/package.json"(exports, module) {
    module.exports = {
      name: "elliptic",
      version: "6.6.1",
      description: "EC cryptography",
      main: "lib/elliptic.js",
      files: [
        "lib"
      ],
      scripts: {
        lint: "eslint lib test",
        "lint:fix": "npm run lint -- --fix",
        unit: "istanbul test _mocha --reporter=spec test/index.js",
        test: "npm run lint && npm run unit",
        version: "grunt dist && git add dist/"
      },
      repository: {
        type: "git",
        url: "git@github.com:indutny/elliptic"
      },
      keywords: [
        "EC",
        "Elliptic",
        "curve",
        "Cryptography"
      ],
      author: "Fedor Indutny <fedor@indutny.com>",
      license: "MIT",
      bugs: {
        url: "https://github.com/indutny/elliptic/issues"
      },
      homepage: "https://github.com/indutny/elliptic",
      devDependencies: {
        brfs: "^2.0.2",
        coveralls: "^3.1.0",
        eslint: "^7.6.0",
        grunt: "^1.2.1",
        "grunt-browserify": "^5.3.0",
        "grunt-cli": "^1.3.2",
        "grunt-contrib-connect": "^3.0.0",
        "grunt-contrib-copy": "^1.0.0",
        "grunt-contrib-uglify": "^5.0.0",
        "grunt-mocha-istanbul": "^5.0.2",
        "grunt-saucelabs": "^9.0.1",
        istanbul: "^0.4.5",
        mocha: "^8.0.1"
      },
      dependencies: {
        "bn.js": "^4.11.9",
        brorand: "^1.1.0",
        "hash.js": "^1.0.0",
        "hmac-drbg": "^1.0.1",
        inherits: "^2.0.4",
        "minimalistic-assert": "^1.0.1",
        "minimalistic-crypto-utils": "^1.0.1"
      }
    };
  }
});

// node_modules/bn.js/lib/bn.js
var require_bn = __commonJS({
  "node_modules/bn.js/lib/bn.js"(exports, module) {
    (function(module2, exports2) {
      "use strict";
      function assert2(val, msg) {
        if (!val)
          throw new Error(msg || "Assertion failed");
      }
      function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
      function BN(number, base, endian) {
        if (BN.isBN(number)) {
          return number;
        }
        this.negative = 0;
        this.words = null;
        this.length = 0;
        this.red = null;
        if (number !== null) {
          if (base === "le" || base === "be") {
            endian = base;
            base = 10;
          }
          this._init(number || 0, base || 10, endian || "be");
        }
      }
      if (typeof module2 === "object") {
        module2.exports = BN;
      } else {
        exports2.BN = BN;
      }
      BN.BN = BN;
      BN.wordSize = 26;
      var Buffer2;
      try {
        if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
          Buffer2 = window.Buffer;
        } else {
          Buffer2 = require_buffer().Buffer;
        }
      } catch (e) {
      }
      BN.isBN = function isBN(num) {
        if (num instanceof BN) {
          return true;
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
      };
      BN.max = function max(left, right) {
        if (left.cmp(right) > 0)
          return left;
        return right;
      };
      BN.min = function min(left, right) {
        if (left.cmp(right) < 0)
          return left;
        return right;
      };
      BN.prototype._init = function init(number, base, endian) {
        if (typeof number === "number") {
          return this._initNumber(number, base, endian);
        }
        if (typeof number === "object") {
          return this._initArray(number, base, endian);
        }
        if (base === "hex") {
          base = 16;
        }
        assert2(base === (base | 0) && base >= 2 && base <= 36);
        number = number.toString().replace(/\s+/g, "");
        var start = 0;
        if (number[0] === "-") {
          start++;
          this.negative = 1;
        }
        if (start < number.length) {
          if (base === 16) {
            this._parseHex(number, start, endian);
          } else {
            this._parseBase(number, base, start);
            if (endian === "le") {
              this._initArray(this.toArray(), base, endian);
            }
          }
        }
      };
      BN.prototype._initNumber = function _initNumber(number, base, endian) {
        if (number < 0) {
          this.negative = 1;
          number = -number;
        }
        if (number < 67108864) {
          this.words = [number & 67108863];
          this.length = 1;
        } else if (number < 4503599627370496) {
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863
          ];
          this.length = 2;
        } else {
          assert2(number < 9007199254740992);
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863,
            1
          ];
          this.length = 3;
        }
        if (endian !== "le")
          return;
        this._initArray(this.toArray(), base, endian);
      };
      BN.prototype._initArray = function _initArray(number, base, endian) {
        assert2(typeof number.length === "number");
        if (number.length <= 0) {
          this.words = [0];
          this.length = 1;
          return this;
        }
        this.length = Math.ceil(number.length / 3);
        this.words = new Array(this.length);
        for (var i3 = 0; i3 < this.length; i3++) {
          this.words[i3] = 0;
        }
        var j5, w4;
        var off = 0;
        if (endian === "be") {
          for (i3 = number.length - 1, j5 = 0; i3 >= 0; i3 -= 3) {
            w4 = number[i3] | number[i3 - 1] << 8 | number[i3 - 2] << 16;
            this.words[j5] |= w4 << off & 67108863;
            this.words[j5 + 1] = w4 >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j5++;
            }
          }
        } else if (endian === "le") {
          for (i3 = 0, j5 = 0; i3 < number.length; i3 += 3) {
            w4 = number[i3] | number[i3 + 1] << 8 | number[i3 + 2] << 16;
            this.words[j5] |= w4 << off & 67108863;
            this.words[j5 + 1] = w4 >>> 26 - off & 67108863;
            off += 24;
            if (off >= 26) {
              off -= 26;
              j5++;
            }
          }
        }
        return this.strip();
      };
      function parseHex4Bits(string, index) {
        var c5 = string.charCodeAt(index);
        if (c5 >= 65 && c5 <= 70) {
          return c5 - 55;
        } else if (c5 >= 97 && c5 <= 102) {
          return c5 - 87;
        } else {
          return c5 - 48 & 15;
        }
      }
      function parseHexByte(string, lowerBound, index) {
        var r3 = parseHex4Bits(string, index);
        if (index - 1 >= lowerBound) {
          r3 |= parseHex4Bits(string, index - 1) << 4;
        }
        return r3;
      }
      BN.prototype._parseHex = function _parseHex(number, start, endian) {
        this.length = Math.ceil((number.length - start) / 6);
        this.words = new Array(this.length);
        for (var i3 = 0; i3 < this.length; i3++) {
          this.words[i3] = 0;
        }
        var off = 0;
        var j5 = 0;
        var w4;
        if (endian === "be") {
          for (i3 = number.length - 1; i3 >= start; i3 -= 2) {
            w4 = parseHexByte(number, start, i3) << off;
            this.words[j5] |= w4 & 67108863;
            if (off >= 18) {
              off -= 18;
              j5 += 1;
              this.words[j5] |= w4 >>> 26;
            } else {
              off += 8;
            }
          }
        } else {
          var parseLength = number.length - start;
          for (i3 = parseLength % 2 === 0 ? start + 1 : start; i3 < number.length; i3 += 2) {
            w4 = parseHexByte(number, start, i3) << off;
            this.words[j5] |= w4 & 67108863;
            if (off >= 18) {
              off -= 18;
              j5 += 1;
              this.words[j5] |= w4 >>> 26;
            } else {
              off += 8;
            }
          }
        }
        this.strip();
      };
      function parseBase(str, start, end, mul) {
        var r3 = 0;
        var len = Math.min(str.length, end);
        for (var i3 = start; i3 < len; i3++) {
          var c5 = str.charCodeAt(i3) - 48;
          r3 *= mul;
          if (c5 >= 49) {
            r3 += c5 - 49 + 10;
          } else if (c5 >= 17) {
            r3 += c5 - 17 + 10;
          } else {
            r3 += c5;
          }
        }
        return r3;
      }
      BN.prototype._parseBase = function _parseBase(number, base, start) {
        this.words = [0];
        this.length = 1;
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
          limbLen++;
        }
        limbLen--;
        limbPow = limbPow / base | 0;
        var total = number.length - start;
        var mod = total % limbLen;
        var end = Math.min(total, total - mod) + start;
        var word = 0;
        for (var i3 = start; i3 < end; i3 += limbLen) {
          word = parseBase(number, i3, i3 + limbLen, base);
          this.imuln(limbPow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        if (mod !== 0) {
          var pow = 1;
          word = parseBase(number, i3, number.length, base);
          for (i3 = 0; i3 < mod; i3++) {
            pow *= base;
          }
          this.imuln(pow);
          if (this.words[0] + word < 67108864) {
            this.words[0] += word;
          } else {
            this._iaddn(word);
          }
        }
        this.strip();
      };
      BN.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length);
        for (var i3 = 0; i3 < this.length; i3++) {
          dest.words[i3] = this.words[i3];
        }
        dest.length = this.length;
        dest.negative = this.negative;
        dest.red = this.red;
      };
      BN.prototype.clone = function clone() {
        var r3 = new BN(null);
        this.copy(r3);
        return r3;
      };
      BN.prototype._expand = function _expand(size4) {
        while (this.length < size4) {
          this.words[this.length++] = 0;
        }
        return this;
      };
      BN.prototype.strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--;
        }
        return this._normSign();
      };
      BN.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0;
        }
        return this;
      };
      BN.prototype.inspect = function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      };
      var zeros = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ];
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ];
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      BN.prototype.toString = function toString3(base, padding) {
        base = base || 10;
        padding = padding | 0 || 1;
        var out;
        if (base === 16 || base === "hex") {
          out = "";
          var off = 0;
          var carry = 0;
          for (var i3 = 0; i3 < this.length; i3++) {
            var w4 = this.words[i3];
            var word = ((w4 << off | carry) & 16777215).toString(16);
            carry = w4 >>> 24 - off & 16777215;
            off += 2;
            if (off >= 26) {
              off -= 26;
              i3--;
            }
            if (carry !== 0 || i3 !== this.length - 1) {
              out = zeros[6 - word.length] + word + out;
            } else {
              out = word + out;
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        if (base === (base | 0) && base >= 2 && base <= 36) {
          var groupSize = groupSizes[base];
          var groupBase = groupBases[base];
          out = "";
          var c5 = this.clone();
          c5.negative = 0;
          while (!c5.isZero()) {
            var r3 = c5.modn(groupBase).toString(base);
            c5 = c5.idivn(groupBase);
            if (!c5.isZero()) {
              out = zeros[groupSize - r3.length] + r3 + out;
            } else {
              out = r3 + out;
            }
          }
          if (this.isZero()) {
            out = "0" + out;
          }
          while (out.length % padding !== 0) {
            out = "0" + out;
          }
          if (this.negative !== 0) {
            out = "-" + out;
          }
          return out;
        }
        assert2(false, "Base should be between 2 and 36");
      };
      BN.prototype.toNumber = function toNumber3() {
        var ret = this.words[0];
        if (this.length === 2) {
          ret += this.words[1] * 67108864;
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864;
        } else if (this.length > 2) {
          assert2(false, "Number can only safely store up to 53 bits");
        }
        return this.negative !== 0 ? -ret : ret;
      };
      BN.prototype.toJSON = function toJSON() {
        return this.toString(16);
      };
      BN.prototype.toBuffer = function toBuffer(endian, length) {
        assert2(typeof Buffer2 !== "undefined");
        return this.toArrayLike(Buffer2, endian, length);
      };
      BN.prototype.toArray = function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length);
      };
      BN.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
        var byteLength = this.byteLength();
        var reqLength = length || Math.max(1, byteLength);
        assert2(byteLength <= reqLength, "byte array longer than desired length");
        assert2(reqLength > 0, "Requested array length <= 0");
        this.strip();
        var littleEndian = endian === "le";
        var res = new ArrayType(reqLength);
        var b3, i3;
        var q5 = this.clone();
        if (!littleEndian) {
          for (i3 = 0; i3 < reqLength - byteLength; i3++) {
            res[i3] = 0;
          }
          for (i3 = 0; !q5.isZero(); i3++) {
            b3 = q5.andln(255);
            q5.iushrn(8);
            res[reqLength - i3 - 1] = b3;
          }
        } else {
          for (i3 = 0; !q5.isZero(); i3++) {
            b3 = q5.andln(255);
            q5.iushrn(8);
            res[i3] = b3;
          }
          for (; i3 < reqLength; i3++) {
            res[i3] = 0;
          }
        }
        return res;
      };
      if (Math.clz32) {
        BN.prototype._countBits = function _countBits(w4) {
          return 32 - Math.clz32(w4);
        };
      } else {
        BN.prototype._countBits = function _countBits(w4) {
          var t = w4;
          var r3 = 0;
          if (t >= 4096) {
            r3 += 13;
            t >>>= 13;
          }
          if (t >= 64) {
            r3 += 7;
            t >>>= 7;
          }
          if (t >= 8) {
            r3 += 4;
            t >>>= 4;
          }
          if (t >= 2) {
            r3 += 2;
            t >>>= 2;
          }
          return r3 + t;
        };
      }
      BN.prototype._zeroBits = function _zeroBits(w4) {
        if (w4 === 0)
          return 26;
        var t = w4;
        var r3 = 0;
        if ((t & 8191) === 0) {
          r3 += 13;
          t >>>= 13;
        }
        if ((t & 127) === 0) {
          r3 += 7;
          t >>>= 7;
        }
        if ((t & 15) === 0) {
          r3 += 4;
          t >>>= 4;
        }
        if ((t & 3) === 0) {
          r3 += 2;
          t >>>= 2;
        }
        if ((t & 1) === 0) {
          r3++;
        }
        return r3;
      };
      BN.prototype.bitLength = function bitLength() {
        var w4 = this.words[this.length - 1];
        var hi4 = this._countBits(w4);
        return (this.length - 1) * 26 + hi4;
      };
      function toBitArray(num) {
        var w4 = new Array(num.bitLength());
        for (var bit = 0; bit < w4.length; bit++) {
          var off = bit / 26 | 0;
          var wbit = bit % 26;
          w4[bit] = (num.words[off] & 1 << wbit) >>> wbit;
        }
        return w4;
      }
      BN.prototype.zeroBits = function zeroBits() {
        if (this.isZero())
          return 0;
        var r3 = 0;
        for (var i3 = 0; i3 < this.length; i3++) {
          var b3 = this._zeroBits(this.words[i3]);
          r3 += b3;
          if (b3 !== 26)
            break;
        }
        return r3;
      };
      BN.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8);
      };
      BN.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1);
        }
        return this.clone();
      };
      BN.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg();
        }
        return this.clone();
      };
      BN.prototype.isNeg = function isNeg() {
        return this.negative !== 0;
      };
      BN.prototype.neg = function neg() {
        return this.clone().ineg();
      };
      BN.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1;
        }
        return this;
      };
      BN.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0;
        }
        for (var i3 = 0; i3 < num.length; i3++) {
          this.words[i3] = this.words[i3] | num.words[i3];
        }
        return this.strip();
      };
      BN.prototype.ior = function ior(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuor(num);
      };
      BN.prototype.or = function or4(num) {
        if (this.length > num.length)
          return this.clone().ior(num);
        return num.clone().ior(this);
      };
      BN.prototype.uor = function uor(num) {
        if (this.length > num.length)
          return this.clone().iuor(num);
        return num.clone().iuor(this);
      };
      BN.prototype.iuand = function iuand(num) {
        var b3;
        if (this.length > num.length) {
          b3 = num;
        } else {
          b3 = this;
        }
        for (var i3 = 0; i3 < b3.length; i3++) {
          this.words[i3] = this.words[i3] & num.words[i3];
        }
        this.length = b3.length;
        return this.strip();
      };
      BN.prototype.iand = function iand(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuand(num);
      };
      BN.prototype.and = function and(num) {
        if (this.length > num.length)
          return this.clone().iand(num);
        return num.clone().iand(this);
      };
      BN.prototype.uand = function uand(num) {
        if (this.length > num.length)
          return this.clone().iuand(num);
        return num.clone().iuand(this);
      };
      BN.prototype.iuxor = function iuxor(num) {
        var a3;
        var b3;
        if (this.length > num.length) {
          a3 = this;
          b3 = num;
        } else {
          a3 = num;
          b3 = this;
        }
        for (var i3 = 0; i3 < b3.length; i3++) {
          this.words[i3] = a3.words[i3] ^ b3.words[i3];
        }
        if (this !== a3) {
          for (; i3 < a3.length; i3++) {
            this.words[i3] = a3.words[i3];
          }
        }
        this.length = a3.length;
        return this.strip();
      };
      BN.prototype.ixor = function ixor(num) {
        assert2((this.negative | num.negative) === 0);
        return this.iuxor(num);
      };
      BN.prototype.xor = function xor(num) {
        if (this.length > num.length)
          return this.clone().ixor(num);
        return num.clone().ixor(this);
      };
      BN.prototype.uxor = function uxor(num) {
        if (this.length > num.length)
          return this.clone().iuxor(num);
        return num.clone().iuxor(this);
      };
      BN.prototype.inotn = function inotn(width) {
        assert2(typeof width === "number" && width >= 0);
        var bytesNeeded = Math.ceil(width / 26) | 0;
        var bitsLeft = width % 26;
        this._expand(bytesNeeded);
        if (bitsLeft > 0) {
          bytesNeeded--;
        }
        for (var i3 = 0; i3 < bytesNeeded; i3++) {
          this.words[i3] = ~this.words[i3] & 67108863;
        }
        if (bitsLeft > 0) {
          this.words[i3] = ~this.words[i3] & 67108863 >> 26 - bitsLeft;
        }
        return this.strip();
      };
      BN.prototype.notn = function notn(width) {
        return this.clone().inotn(width);
      };
      BN.prototype.setn = function setn(bit, val) {
        assert2(typeof bit === "number" && bit >= 0);
        var off = bit / 26 | 0;
        var wbit = bit % 26;
        this._expand(off + 1);
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit;
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit);
        }
        return this.strip();
      };
      BN.prototype.iadd = function iadd(num) {
        var r3;
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0;
          r3 = this.isub(num);
          this.negative ^= 1;
          return this._normSign();
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0;
          r3 = this.isub(num);
          num.negative = 1;
          return r3._normSign();
        }
        var a3, b3;
        if (this.length > num.length) {
          a3 = this;
          b3 = num;
        } else {
          a3 = num;
          b3 = this;
        }
        var carry = 0;
        for (var i3 = 0; i3 < b3.length; i3++) {
          r3 = (a3.words[i3] | 0) + (b3.words[i3] | 0) + carry;
          this.words[i3] = r3 & 67108863;
          carry = r3 >>> 26;
        }
        for (; carry !== 0 && i3 < a3.length; i3++) {
          r3 = (a3.words[i3] | 0) + carry;
          this.words[i3] = r3 & 67108863;
          carry = r3 >>> 26;
        }
        this.length = a3.length;
        if (carry !== 0) {
          this.words[this.length] = carry;
          this.length++;
        } else if (a3 !== this) {
          for (; i3 < a3.length; i3++) {
            this.words[i3] = a3.words[i3];
          }
        }
        return this;
      };
      BN.prototype.add = function add(num) {
        var res;
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0;
          res = this.sub(num);
          num.negative ^= 1;
          return res;
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0;
          res = num.sub(this);
          this.negative = 1;
          return res;
        }
        if (this.length > num.length)
          return this.clone().iadd(num);
        return num.clone().iadd(this);
      };
      BN.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0;
          var r3 = this.iadd(num);
          num.negative = 1;
          return r3._normSign();
        } else if (this.negative !== 0) {
          this.negative = 0;
          this.iadd(num);
          this.negative = 1;
          return this._normSign();
        }
        var cmp = this.cmp(num);
        if (cmp === 0) {
          this.negative = 0;
          this.length = 1;
          this.words[0] = 0;
          return this;
        }
        var a3, b3;
        if (cmp > 0) {
          a3 = this;
          b3 = num;
        } else {
          a3 = num;
          b3 = this;
        }
        var carry = 0;
        for (var i3 = 0; i3 < b3.length; i3++) {
          r3 = (a3.words[i3] | 0) - (b3.words[i3] | 0) + carry;
          carry = r3 >> 26;
          this.words[i3] = r3 & 67108863;
        }
        for (; carry !== 0 && i3 < a3.length; i3++) {
          r3 = (a3.words[i3] | 0) + carry;
          carry = r3 >> 26;
          this.words[i3] = r3 & 67108863;
        }
        if (carry === 0 && i3 < a3.length && a3 !== this) {
          for (; i3 < a3.length; i3++) {
            this.words[i3] = a3.words[i3];
          }
        }
        this.length = Math.max(this.length, i3);
        if (a3 !== this) {
          this.negative = 1;
        }
        return this.strip();
      };
      BN.prototype.sub = function sub(num) {
        return this.clone().isub(num);
      };
      function smallMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        var len = self2.length + num.length | 0;
        out.length = len;
        len = len - 1 | 0;
        var a3 = self2.words[0] | 0;
        var b3 = num.words[0] | 0;
        var r3 = a3 * b3;
        var lo3 = r3 & 67108863;
        var carry = r3 / 67108864 | 0;
        out.words[0] = lo3;
        for (var k5 = 1; k5 < len; k5++) {
          var ncarry = carry >>> 26;
          var rword = carry & 67108863;
          var maxJ = Math.min(k5, num.length - 1);
          for (var j5 = Math.max(0, k5 - self2.length + 1); j5 <= maxJ; j5++) {
            var i3 = k5 - j5 | 0;
            a3 = self2.words[i3] | 0;
            b3 = num.words[j5] | 0;
            r3 = a3 * b3 + rword;
            ncarry += r3 / 67108864 | 0;
            rword = r3 & 67108863;
          }
          out.words[k5] = rword | 0;
          carry = ncarry | 0;
        }
        if (carry !== 0) {
          out.words[k5] = carry | 0;
        } else {
          out.length--;
        }
        return out.strip();
      }
      var comb10MulTo = function comb10MulTo2(self2, num, out) {
        var a3 = self2.words;
        var b3 = num.words;
        var o4 = out.words;
        var c5 = 0;
        var lo3;
        var mid;
        var hi4;
        var a0 = a3[0] | 0;
        var al0 = a0 & 8191;
        var ah0 = a0 >>> 13;
        var a1 = a3[1] | 0;
        var al1 = a1 & 8191;
        var ah1 = a1 >>> 13;
        var a22 = a3[2] | 0;
        var al2 = a22 & 8191;
        var ah2 = a22 >>> 13;
        var a32 = a3[3] | 0;
        var al3 = a32 & 8191;
        var ah3 = a32 >>> 13;
        var a4 = a3[4] | 0;
        var al4 = a4 & 8191;
        var ah4 = a4 >>> 13;
        var a5 = a3[5] | 0;
        var al5 = a5 & 8191;
        var ah5 = a5 >>> 13;
        var a6 = a3[6] | 0;
        var al6 = a6 & 8191;
        var ah6 = a6 >>> 13;
        var a7 = a3[7] | 0;
        var al7 = a7 & 8191;
        var ah7 = a7 >>> 13;
        var a8 = a3[8] | 0;
        var al8 = a8 & 8191;
        var ah8 = a8 >>> 13;
        var a9 = a3[9] | 0;
        var al9 = a9 & 8191;
        var ah9 = a9 >>> 13;
        var b0 = b3[0] | 0;
        var bl0 = b0 & 8191;
        var bh0 = b0 >>> 13;
        var b1 = b3[1] | 0;
        var bl1 = b1 & 8191;
        var bh1 = b1 >>> 13;
        var b22 = b3[2] | 0;
        var bl2 = b22 & 8191;
        var bh2 = b22 >>> 13;
        var b32 = b3[3] | 0;
        var bl3 = b32 & 8191;
        var bh3 = b32 >>> 13;
        var b4 = b3[4] | 0;
        var bl4 = b4 & 8191;
        var bh4 = b4 >>> 13;
        var b5 = b3[5] | 0;
        var bl5 = b5 & 8191;
        var bh5 = b5 >>> 13;
        var b6 = b3[6] | 0;
        var bl6 = b6 & 8191;
        var bh6 = b6 >>> 13;
        var b7 = b3[7] | 0;
        var bl7 = b7 & 8191;
        var bh7 = b7 >>> 13;
        var b8 = b3[8] | 0;
        var bl8 = b8 & 8191;
        var bh8 = b8 >>> 13;
        var b9 = b3[9] | 0;
        var bl9 = b9 & 8191;
        var bh9 = b9 >>> 13;
        out.negative = self2.negative ^ num.negative;
        out.length = 19;
        lo3 = Math.imul(al0, bl0);
        mid = Math.imul(al0, bh0);
        mid = mid + Math.imul(ah0, bl0) | 0;
        hi4 = Math.imul(ah0, bh0);
        var w0 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
        w0 &= 67108863;
        lo3 = Math.imul(al1, bl0);
        mid = Math.imul(al1, bh0);
        mid = mid + Math.imul(ah1, bl0) | 0;
        hi4 = Math.imul(ah1, bh0);
        lo3 = lo3 + Math.imul(al0, bl1) | 0;
        mid = mid + Math.imul(al0, bh1) | 0;
        mid = mid + Math.imul(ah0, bl1) | 0;
        hi4 = hi4 + Math.imul(ah0, bh1) | 0;
        var w1 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
        w1 &= 67108863;
        lo3 = Math.imul(al2, bl0);
        mid = Math.imul(al2, bh0);
        mid = mid + Math.imul(ah2, bl0) | 0;
        hi4 = Math.imul(ah2, bh0);
        lo3 = lo3 + Math.imul(al1, bl1) | 0;
        mid = mid + Math.imul(al1, bh1) | 0;
        mid = mid + Math.imul(ah1, bl1) | 0;
        hi4 = hi4 + Math.imul(ah1, bh1) | 0;
        lo3 = lo3 + Math.imul(al0, bl2) | 0;
        mid = mid + Math.imul(al0, bh2) | 0;
        mid = mid + Math.imul(ah0, bl2) | 0;
        hi4 = hi4 + Math.imul(ah0, bh2) | 0;
        var w22 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w22 >>> 26) | 0;
        w22 &= 67108863;
        lo3 = Math.imul(al3, bl0);
        mid = Math.imul(al3, bh0);
        mid = mid + Math.imul(ah3, bl0) | 0;
        hi4 = Math.imul(ah3, bh0);
        lo3 = lo3 + Math.imul(al2, bl1) | 0;
        mid = mid + Math.imul(al2, bh1) | 0;
        mid = mid + Math.imul(ah2, bl1) | 0;
        hi4 = hi4 + Math.imul(ah2, bh1) | 0;
        lo3 = lo3 + Math.imul(al1, bl2) | 0;
        mid = mid + Math.imul(al1, bh2) | 0;
        mid = mid + Math.imul(ah1, bl2) | 0;
        hi4 = hi4 + Math.imul(ah1, bh2) | 0;
        lo3 = lo3 + Math.imul(al0, bl3) | 0;
        mid = mid + Math.imul(al0, bh3) | 0;
        mid = mid + Math.imul(ah0, bl3) | 0;
        hi4 = hi4 + Math.imul(ah0, bh3) | 0;
        var w32 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w32 >>> 26) | 0;
        w32 &= 67108863;
        lo3 = Math.imul(al4, bl0);
        mid = Math.imul(al4, bh0);
        mid = mid + Math.imul(ah4, bl0) | 0;
        hi4 = Math.imul(ah4, bh0);
        lo3 = lo3 + Math.imul(al3, bl1) | 0;
        mid = mid + Math.imul(al3, bh1) | 0;
        mid = mid + Math.imul(ah3, bl1) | 0;
        hi4 = hi4 + Math.imul(ah3, bh1) | 0;
        lo3 = lo3 + Math.imul(al2, bl2) | 0;
        mid = mid + Math.imul(al2, bh2) | 0;
        mid = mid + Math.imul(ah2, bl2) | 0;
        hi4 = hi4 + Math.imul(ah2, bh2) | 0;
        lo3 = lo3 + Math.imul(al1, bl3) | 0;
        mid = mid + Math.imul(al1, bh3) | 0;
        mid = mid + Math.imul(ah1, bl3) | 0;
        hi4 = hi4 + Math.imul(ah1, bh3) | 0;
        lo3 = lo3 + Math.imul(al0, bl4) | 0;
        mid = mid + Math.imul(al0, bh4) | 0;
        mid = mid + Math.imul(ah0, bl4) | 0;
        hi4 = hi4 + Math.imul(ah0, bh4) | 0;
        var w4 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
        w4 &= 67108863;
        lo3 = Math.imul(al5, bl0);
        mid = Math.imul(al5, bh0);
        mid = mid + Math.imul(ah5, bl0) | 0;
        hi4 = Math.imul(ah5, bh0);
        lo3 = lo3 + Math.imul(al4, bl1) | 0;
        mid = mid + Math.imul(al4, bh1) | 0;
        mid = mid + Math.imul(ah4, bl1) | 0;
        hi4 = hi4 + Math.imul(ah4, bh1) | 0;
        lo3 = lo3 + Math.imul(al3, bl2) | 0;
        mid = mid + Math.imul(al3, bh2) | 0;
        mid = mid + Math.imul(ah3, bl2) | 0;
        hi4 = hi4 + Math.imul(ah3, bh2) | 0;
        lo3 = lo3 + Math.imul(al2, bl3) | 0;
        mid = mid + Math.imul(al2, bh3) | 0;
        mid = mid + Math.imul(ah2, bl3) | 0;
        hi4 = hi4 + Math.imul(ah2, bh3) | 0;
        lo3 = lo3 + Math.imul(al1, bl4) | 0;
        mid = mid + Math.imul(al1, bh4) | 0;
        mid = mid + Math.imul(ah1, bl4) | 0;
        hi4 = hi4 + Math.imul(ah1, bh4) | 0;
        lo3 = lo3 + Math.imul(al0, bl5) | 0;
        mid = mid + Math.imul(al0, bh5) | 0;
        mid = mid + Math.imul(ah0, bl5) | 0;
        hi4 = hi4 + Math.imul(ah0, bh5) | 0;
        var w5 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
        w5 &= 67108863;
        lo3 = Math.imul(al6, bl0);
        mid = Math.imul(al6, bh0);
        mid = mid + Math.imul(ah6, bl0) | 0;
        hi4 = Math.imul(ah6, bh0);
        lo3 = lo3 + Math.imul(al5, bl1) | 0;
        mid = mid + Math.imul(al5, bh1) | 0;
        mid = mid + Math.imul(ah5, bl1) | 0;
        hi4 = hi4 + Math.imul(ah5, bh1) | 0;
        lo3 = lo3 + Math.imul(al4, bl2) | 0;
        mid = mid + Math.imul(al4, bh2) | 0;
        mid = mid + Math.imul(ah4, bl2) | 0;
        hi4 = hi4 + Math.imul(ah4, bh2) | 0;
        lo3 = lo3 + Math.imul(al3, bl3) | 0;
        mid = mid + Math.imul(al3, bh3) | 0;
        mid = mid + Math.imul(ah3, bl3) | 0;
        hi4 = hi4 + Math.imul(ah3, bh3) | 0;
        lo3 = lo3 + Math.imul(al2, bl4) | 0;
        mid = mid + Math.imul(al2, bh4) | 0;
        mid = mid + Math.imul(ah2, bl4) | 0;
        hi4 = hi4 + Math.imul(ah2, bh4) | 0;
        lo3 = lo3 + Math.imul(al1, bl5) | 0;
        mid = mid + Math.imul(al1, bh5) | 0;
        mid = mid + Math.imul(ah1, bl5) | 0;
        hi4 = hi4 + Math.imul(ah1, bh5) | 0;
        lo3 = lo3 + Math.imul(al0, bl6) | 0;
        mid = mid + Math.imul(al0, bh6) | 0;
        mid = mid + Math.imul(ah0, bl6) | 0;
        hi4 = hi4 + Math.imul(ah0, bh6) | 0;
        var w6 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
        w6 &= 67108863;
        lo3 = Math.imul(al7, bl0);
        mid = Math.imul(al7, bh0);
        mid = mid + Math.imul(ah7, bl0) | 0;
        hi4 = Math.imul(ah7, bh0);
        lo3 = lo3 + Math.imul(al6, bl1) | 0;
        mid = mid + Math.imul(al6, bh1) | 0;
        mid = mid + Math.imul(ah6, bl1) | 0;
        hi4 = hi4 + Math.imul(ah6, bh1) | 0;
        lo3 = lo3 + Math.imul(al5, bl2) | 0;
        mid = mid + Math.imul(al5, bh2) | 0;
        mid = mid + Math.imul(ah5, bl2) | 0;
        hi4 = hi4 + Math.imul(ah5, bh2) | 0;
        lo3 = lo3 + Math.imul(al4, bl3) | 0;
        mid = mid + Math.imul(al4, bh3) | 0;
        mid = mid + Math.imul(ah4, bl3) | 0;
        hi4 = hi4 + Math.imul(ah4, bh3) | 0;
        lo3 = lo3 + Math.imul(al3, bl4) | 0;
        mid = mid + Math.imul(al3, bh4) | 0;
        mid = mid + Math.imul(ah3, bl4) | 0;
        hi4 = hi4 + Math.imul(ah3, bh4) | 0;
        lo3 = lo3 + Math.imul(al2, bl5) | 0;
        mid = mid + Math.imul(al2, bh5) | 0;
        mid = mid + Math.imul(ah2, bl5) | 0;
        hi4 = hi4 + Math.imul(ah2, bh5) | 0;
        lo3 = lo3 + Math.imul(al1, bl6) | 0;
        mid = mid + Math.imul(al1, bh6) | 0;
        mid = mid + Math.imul(ah1, bl6) | 0;
        hi4 = hi4 + Math.imul(ah1, bh6) | 0;
        lo3 = lo3 + Math.imul(al0, bl7) | 0;
        mid = mid + Math.imul(al0, bh7) | 0;
        mid = mid + Math.imul(ah0, bl7) | 0;
        hi4 = hi4 + Math.imul(ah0, bh7) | 0;
        var w7 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
        w7 &= 67108863;
        lo3 = Math.imul(al8, bl0);
        mid = Math.imul(al8, bh0);
        mid = mid + Math.imul(ah8, bl0) | 0;
        hi4 = Math.imul(ah8, bh0);
        lo3 = lo3 + Math.imul(al7, bl1) | 0;
        mid = mid + Math.imul(al7, bh1) | 0;
        mid = mid + Math.imul(ah7, bl1) | 0;
        hi4 = hi4 + Math.imul(ah7, bh1) | 0;
        lo3 = lo3 + Math.imul(al6, bl2) | 0;
        mid = mid + Math.imul(al6, bh2) | 0;
        mid = mid + Math.imul(ah6, bl2) | 0;
        hi4 = hi4 + Math.imul(ah6, bh2) | 0;
        lo3 = lo3 + Math.imul(al5, bl3) | 0;
        mid = mid + Math.imul(al5, bh3) | 0;
        mid = mid + Math.imul(ah5, bl3) | 0;
        hi4 = hi4 + Math.imul(ah5, bh3) | 0;
        lo3 = lo3 + Math.imul(al4, bl4) | 0;
        mid = mid + Math.imul(al4, bh4) | 0;
        mid = mid + Math.imul(ah4, bl4) | 0;
        hi4 = hi4 + Math.imul(ah4, bh4) | 0;
        lo3 = lo3 + Math.imul(al3, bl5) | 0;
        mid = mid + Math.imul(al3, bh5) | 0;
        mid = mid + Math.imul(ah3, bl5) | 0;
        hi4 = hi4 + Math.imul(ah3, bh5) | 0;
        lo3 = lo3 + Math.imul(al2, bl6) | 0;
        mid = mid + Math.imul(al2, bh6) | 0;
        mid = mid + Math.imul(ah2, bl6) | 0;
        hi4 = hi4 + Math.imul(ah2, bh6) | 0;
        lo3 = lo3 + Math.imul(al1, bl7) | 0;
        mid = mid + Math.imul(al1, bh7) | 0;
        mid = mid + Math.imul(ah1, bl7) | 0;
        hi4 = hi4 + Math.imul(ah1, bh7) | 0;
        lo3 = lo3 + Math.imul(al0, bl8) | 0;
        mid = mid + Math.imul(al0, bh8) | 0;
        mid = mid + Math.imul(ah0, bl8) | 0;
        hi4 = hi4 + Math.imul(ah0, bh8) | 0;
        var w8 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
        w8 &= 67108863;
        lo3 = Math.imul(al9, bl0);
        mid = Math.imul(al9, bh0);
        mid = mid + Math.imul(ah9, bl0) | 0;
        hi4 = Math.imul(ah9, bh0);
        lo3 = lo3 + Math.imul(al8, bl1) | 0;
        mid = mid + Math.imul(al8, bh1) | 0;
        mid = mid + Math.imul(ah8, bl1) | 0;
        hi4 = hi4 + Math.imul(ah8, bh1) | 0;
        lo3 = lo3 + Math.imul(al7, bl2) | 0;
        mid = mid + Math.imul(al7, bh2) | 0;
        mid = mid + Math.imul(ah7, bl2) | 0;
        hi4 = hi4 + Math.imul(ah7, bh2) | 0;
        lo3 = lo3 + Math.imul(al6, bl3) | 0;
        mid = mid + Math.imul(al6, bh3) | 0;
        mid = mid + Math.imul(ah6, bl3) | 0;
        hi4 = hi4 + Math.imul(ah6, bh3) | 0;
        lo3 = lo3 + Math.imul(al5, bl4) | 0;
        mid = mid + Math.imul(al5, bh4) | 0;
        mid = mid + Math.imul(ah5, bl4) | 0;
        hi4 = hi4 + Math.imul(ah5, bh4) | 0;
        lo3 = lo3 + Math.imul(al4, bl5) | 0;
        mid = mid + Math.imul(al4, bh5) | 0;
        mid = mid + Math.imul(ah4, bl5) | 0;
        hi4 = hi4 + Math.imul(ah4, bh5) | 0;
        lo3 = lo3 + Math.imul(al3, bl6) | 0;
        mid = mid + Math.imul(al3, bh6) | 0;
        mid = mid + Math.imul(ah3, bl6) | 0;
        hi4 = hi4 + Math.imul(ah3, bh6) | 0;
        lo3 = lo3 + Math.imul(al2, bl7) | 0;
        mid = mid + Math.imul(al2, bh7) | 0;
        mid = mid + Math.imul(ah2, bl7) | 0;
        hi4 = hi4 + Math.imul(ah2, bh7) | 0;
        lo3 = lo3 + Math.imul(al1, bl8) | 0;
        mid = mid + Math.imul(al1, bh8) | 0;
        mid = mid + Math.imul(ah1, bl8) | 0;
        hi4 = hi4 + Math.imul(ah1, bh8) | 0;
        lo3 = lo3 + Math.imul(al0, bl9) | 0;
        mid = mid + Math.imul(al0, bh9) | 0;
        mid = mid + Math.imul(ah0, bl9) | 0;
        hi4 = hi4 + Math.imul(ah0, bh9) | 0;
        var w9 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
        w9 &= 67108863;
        lo3 = Math.imul(al9, bl1);
        mid = Math.imul(al9, bh1);
        mid = mid + Math.imul(ah9, bl1) | 0;
        hi4 = Math.imul(ah9, bh1);
        lo3 = lo3 + Math.imul(al8, bl2) | 0;
        mid = mid + Math.imul(al8, bh2) | 0;
        mid = mid + Math.imul(ah8, bl2) | 0;
        hi4 = hi4 + Math.imul(ah8, bh2) | 0;
        lo3 = lo3 + Math.imul(al7, bl3) | 0;
        mid = mid + Math.imul(al7, bh3) | 0;
        mid = mid + Math.imul(ah7, bl3) | 0;
        hi4 = hi4 + Math.imul(ah7, bh3) | 0;
        lo3 = lo3 + Math.imul(al6, bl4) | 0;
        mid = mid + Math.imul(al6, bh4) | 0;
        mid = mid + Math.imul(ah6, bl4) | 0;
        hi4 = hi4 + Math.imul(ah6, bh4) | 0;
        lo3 = lo3 + Math.imul(al5, bl5) | 0;
        mid = mid + Math.imul(al5, bh5) | 0;
        mid = mid + Math.imul(ah5, bl5) | 0;
        hi4 = hi4 + Math.imul(ah5, bh5) | 0;
        lo3 = lo3 + Math.imul(al4, bl6) | 0;
        mid = mid + Math.imul(al4, bh6) | 0;
        mid = mid + Math.imul(ah4, bl6) | 0;
        hi4 = hi4 + Math.imul(ah4, bh6) | 0;
        lo3 = lo3 + Math.imul(al3, bl7) | 0;
        mid = mid + Math.imul(al3, bh7) | 0;
        mid = mid + Math.imul(ah3, bl7) | 0;
        hi4 = hi4 + Math.imul(ah3, bh7) | 0;
        lo3 = lo3 + Math.imul(al2, bl8) | 0;
        mid = mid + Math.imul(al2, bh8) | 0;
        mid = mid + Math.imul(ah2, bl8) | 0;
        hi4 = hi4 + Math.imul(ah2, bh8) | 0;
        lo3 = lo3 + Math.imul(al1, bl9) | 0;
        mid = mid + Math.imul(al1, bh9) | 0;
        mid = mid + Math.imul(ah1, bl9) | 0;
        hi4 = hi4 + Math.imul(ah1, bh9) | 0;
        var w10 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
        w10 &= 67108863;
        lo3 = Math.imul(al9, bl2);
        mid = Math.imul(al9, bh2);
        mid = mid + Math.imul(ah9, bl2) | 0;
        hi4 = Math.imul(ah9, bh2);
        lo3 = lo3 + Math.imul(al8, bl3) | 0;
        mid = mid + Math.imul(al8, bh3) | 0;
        mid = mid + Math.imul(ah8, bl3) | 0;
        hi4 = hi4 + Math.imul(ah8, bh3) | 0;
        lo3 = lo3 + Math.imul(al7, bl4) | 0;
        mid = mid + Math.imul(al7, bh4) | 0;
        mid = mid + Math.imul(ah7, bl4) | 0;
        hi4 = hi4 + Math.imul(ah7, bh4) | 0;
        lo3 = lo3 + Math.imul(al6, bl5) | 0;
        mid = mid + Math.imul(al6, bh5) | 0;
        mid = mid + Math.imul(ah6, bl5) | 0;
        hi4 = hi4 + Math.imul(ah6, bh5) | 0;
        lo3 = lo3 + Math.imul(al5, bl6) | 0;
        mid = mid + Math.imul(al5, bh6) | 0;
        mid = mid + Math.imul(ah5, bl6) | 0;
        hi4 = hi4 + Math.imul(ah5, bh6) | 0;
        lo3 = lo3 + Math.imul(al4, bl7) | 0;
        mid = mid + Math.imul(al4, bh7) | 0;
        mid = mid + Math.imul(ah4, bl7) | 0;
        hi4 = hi4 + Math.imul(ah4, bh7) | 0;
        lo3 = lo3 + Math.imul(al3, bl8) | 0;
        mid = mid + Math.imul(al3, bh8) | 0;
        mid = mid + Math.imul(ah3, bl8) | 0;
        hi4 = hi4 + Math.imul(ah3, bh8) | 0;
        lo3 = lo3 + Math.imul(al2, bl9) | 0;
        mid = mid + Math.imul(al2, bh9) | 0;
        mid = mid + Math.imul(ah2, bl9) | 0;
        hi4 = hi4 + Math.imul(ah2, bh9) | 0;
        var w11 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
        w11 &= 67108863;
        lo3 = Math.imul(al9, bl3);
        mid = Math.imul(al9, bh3);
        mid = mid + Math.imul(ah9, bl3) | 0;
        hi4 = Math.imul(ah9, bh3);
        lo3 = lo3 + Math.imul(al8, bl4) | 0;
        mid = mid + Math.imul(al8, bh4) | 0;
        mid = mid + Math.imul(ah8, bl4) | 0;
        hi4 = hi4 + Math.imul(ah8, bh4) | 0;
        lo3 = lo3 + Math.imul(al7, bl5) | 0;
        mid = mid + Math.imul(al7, bh5) | 0;
        mid = mid + Math.imul(ah7, bl5) | 0;
        hi4 = hi4 + Math.imul(ah7, bh5) | 0;
        lo3 = lo3 + Math.imul(al6, bl6) | 0;
        mid = mid + Math.imul(al6, bh6) | 0;
        mid = mid + Math.imul(ah6, bl6) | 0;
        hi4 = hi4 + Math.imul(ah6, bh6) | 0;
        lo3 = lo3 + Math.imul(al5, bl7) | 0;
        mid = mid + Math.imul(al5, bh7) | 0;
        mid = mid + Math.imul(ah5, bl7) | 0;
        hi4 = hi4 + Math.imul(ah5, bh7) | 0;
        lo3 = lo3 + Math.imul(al4, bl8) | 0;
        mid = mid + Math.imul(al4, bh8) | 0;
        mid = mid + Math.imul(ah4, bl8) | 0;
        hi4 = hi4 + Math.imul(ah4, bh8) | 0;
        lo3 = lo3 + Math.imul(al3, bl9) | 0;
        mid = mid + Math.imul(al3, bh9) | 0;
        mid = mid + Math.imul(ah3, bl9) | 0;
        hi4 = hi4 + Math.imul(ah3, bh9) | 0;
        var w12 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
        w12 &= 67108863;
        lo3 = Math.imul(al9, bl4);
        mid = Math.imul(al9, bh4);
        mid = mid + Math.imul(ah9, bl4) | 0;
        hi4 = Math.imul(ah9, bh4);
        lo3 = lo3 + Math.imul(al8, bl5) | 0;
        mid = mid + Math.imul(al8, bh5) | 0;
        mid = mid + Math.imul(ah8, bl5) | 0;
        hi4 = hi4 + Math.imul(ah8, bh5) | 0;
        lo3 = lo3 + Math.imul(al7, bl6) | 0;
        mid = mid + Math.imul(al7, bh6) | 0;
        mid = mid + Math.imul(ah7, bl6) | 0;
        hi4 = hi4 + Math.imul(ah7, bh6) | 0;
        lo3 = lo3 + Math.imul(al6, bl7) | 0;
        mid = mid + Math.imul(al6, bh7) | 0;
        mid = mid + Math.imul(ah6, bl7) | 0;
        hi4 = hi4 + Math.imul(ah6, bh7) | 0;
        lo3 = lo3 + Math.imul(al5, bl8) | 0;
        mid = mid + Math.imul(al5, bh8) | 0;
        mid = mid + Math.imul(ah5, bl8) | 0;
        hi4 = hi4 + Math.imul(ah5, bh8) | 0;
        lo3 = lo3 + Math.imul(al4, bl9) | 0;
        mid = mid + Math.imul(al4, bh9) | 0;
        mid = mid + Math.imul(ah4, bl9) | 0;
        hi4 = hi4 + Math.imul(ah4, bh9) | 0;
        var w13 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
        w13 &= 67108863;
        lo3 = Math.imul(al9, bl5);
        mid = Math.imul(al9, bh5);
        mid = mid + Math.imul(ah9, bl5) | 0;
        hi4 = Math.imul(ah9, bh5);
        lo3 = lo3 + Math.imul(al8, bl6) | 0;
        mid = mid + Math.imul(al8, bh6) | 0;
        mid = mid + Math.imul(ah8, bl6) | 0;
        hi4 = hi4 + Math.imul(ah8, bh6) | 0;
        lo3 = lo3 + Math.imul(al7, bl7) | 0;
        mid = mid + Math.imul(al7, bh7) | 0;
        mid = mid + Math.imul(ah7, bl7) | 0;
        hi4 = hi4 + Math.imul(ah7, bh7) | 0;
        lo3 = lo3 + Math.imul(al6, bl8) | 0;
        mid = mid + Math.imul(al6, bh8) | 0;
        mid = mid + Math.imul(ah6, bl8) | 0;
        hi4 = hi4 + Math.imul(ah6, bh8) | 0;
        lo3 = lo3 + Math.imul(al5, bl9) | 0;
        mid = mid + Math.imul(al5, bh9) | 0;
        mid = mid + Math.imul(ah5, bl9) | 0;
        hi4 = hi4 + Math.imul(ah5, bh9) | 0;
        var w14 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
        w14 &= 67108863;
        lo3 = Math.imul(al9, bl6);
        mid = Math.imul(al9, bh6);
        mid = mid + Math.imul(ah9, bl6) | 0;
        hi4 = Math.imul(ah9, bh6);
        lo3 = lo3 + Math.imul(al8, bl7) | 0;
        mid = mid + Math.imul(al8, bh7) | 0;
        mid = mid + Math.imul(ah8, bl7) | 0;
        hi4 = hi4 + Math.imul(ah8, bh7) | 0;
        lo3 = lo3 + Math.imul(al7, bl8) | 0;
        mid = mid + Math.imul(al7, bh8) | 0;
        mid = mid + Math.imul(ah7, bl8) | 0;
        hi4 = hi4 + Math.imul(ah7, bh8) | 0;
        lo3 = lo3 + Math.imul(al6, bl9) | 0;
        mid = mid + Math.imul(al6, bh9) | 0;
        mid = mid + Math.imul(ah6, bl9) | 0;
        hi4 = hi4 + Math.imul(ah6, bh9) | 0;
        var w15 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
        w15 &= 67108863;
        lo3 = Math.imul(al9, bl7);
        mid = Math.imul(al9, bh7);
        mid = mid + Math.imul(ah9, bl7) | 0;
        hi4 = Math.imul(ah9, bh7);
        lo3 = lo3 + Math.imul(al8, bl8) | 0;
        mid = mid + Math.imul(al8, bh8) | 0;
        mid = mid + Math.imul(ah8, bl8) | 0;
        hi4 = hi4 + Math.imul(ah8, bh8) | 0;
        lo3 = lo3 + Math.imul(al7, bl9) | 0;
        mid = mid + Math.imul(al7, bh9) | 0;
        mid = mid + Math.imul(ah7, bl9) | 0;
        hi4 = hi4 + Math.imul(ah7, bh9) | 0;
        var w16 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
        w16 &= 67108863;
        lo3 = Math.imul(al9, bl8);
        mid = Math.imul(al9, bh8);
        mid = mid + Math.imul(ah9, bl8) | 0;
        hi4 = Math.imul(ah9, bh8);
        lo3 = lo3 + Math.imul(al8, bl9) | 0;
        mid = mid + Math.imul(al8, bh9) | 0;
        mid = mid + Math.imul(ah8, bl9) | 0;
        hi4 = hi4 + Math.imul(ah8, bh9) | 0;
        var w17 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
        w17 &= 67108863;
        lo3 = Math.imul(al9, bl9);
        mid = Math.imul(al9, bh9);
        mid = mid + Math.imul(ah9, bl9) | 0;
        hi4 = Math.imul(ah9, bh9);
        var w18 = (c5 + lo3 | 0) + ((mid & 8191) << 13) | 0;
        c5 = (hi4 + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
        w18 &= 67108863;
        o4[0] = w0;
        o4[1] = w1;
        o4[2] = w22;
        o4[3] = w32;
        o4[4] = w4;
        o4[5] = w5;
        o4[6] = w6;
        o4[7] = w7;
        o4[8] = w8;
        o4[9] = w9;
        o4[10] = w10;
        o4[11] = w11;
        o4[12] = w12;
        o4[13] = w13;
        o4[14] = w14;
        o4[15] = w15;
        o4[16] = w16;
        o4[17] = w17;
        o4[18] = w18;
        if (c5 !== 0) {
          o4[19] = c5;
          out.length++;
        }
        return out;
      };
      if (!Math.imul) {
        comb10MulTo = smallMulTo;
      }
      function bigMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative;
        out.length = self2.length + num.length;
        var carry = 0;
        var hncarry = 0;
        for (var k5 = 0; k5 < out.length - 1; k5++) {
          var ncarry = hncarry;
          hncarry = 0;
          var rword = carry & 67108863;
          var maxJ = Math.min(k5, num.length - 1);
          for (var j5 = Math.max(0, k5 - self2.length + 1); j5 <= maxJ; j5++) {
            var i3 = k5 - j5;
            var a3 = self2.words[i3] | 0;
            var b3 = num.words[j5] | 0;
            var r3 = a3 * b3;
            var lo3 = r3 & 67108863;
            ncarry = ncarry + (r3 / 67108864 | 0) | 0;
            lo3 = lo3 + rword | 0;
            rword = lo3 & 67108863;
            ncarry = ncarry + (lo3 >>> 26) | 0;
            hncarry += ncarry >>> 26;
            ncarry &= 67108863;
          }
          out.words[k5] = rword;
          carry = ncarry;
          ncarry = hncarry;
        }
        if (carry !== 0) {
          out.words[k5] = carry;
        } else {
          out.length--;
        }
        return out.strip();
      }
      function jumboMulTo(self2, num, out) {
        var fftm = new FFTM();
        return fftm.mulp(self2, num, out);
      }
      BN.prototype.mulTo = function mulTo(num, out) {
        var res;
        var len = this.length + num.length;
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out);
        } else if (len < 63) {
          res = smallMulTo(this, num, out);
        } else if (len < 1024) {
          res = bigMulTo(this, num, out);
        } else {
          res = jumboMulTo(this, num, out);
        }
        return res;
      };
      function FFTM(x7, y6) {
        this.x = x7;
        this.y = y6;
      }
      FFTM.prototype.makeRBT = function makeRBT(N5) {
        var t = new Array(N5);
        var l5 = BN.prototype._countBits(N5) - 1;
        for (var i3 = 0; i3 < N5; i3++) {
          t[i3] = this.revBin(i3, l5, N5);
        }
        return t;
      };
      FFTM.prototype.revBin = function revBin(x7, l5, N5) {
        if (x7 === 0 || x7 === N5 - 1)
          return x7;
        var rb = 0;
        for (var i3 = 0; i3 < l5; i3++) {
          rb |= (x7 & 1) << l5 - i3 - 1;
          x7 >>= 1;
        }
        return rb;
      };
      FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N5) {
        for (var i3 = 0; i3 < N5; i3++) {
          rtws[i3] = rws[rbt[i3]];
          itws[i3] = iws[rbt[i3]];
        }
      };
      FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N5, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N5);
        for (var s2 = 1; s2 < N5; s2 <<= 1) {
          var l5 = s2 << 1;
          var rtwdf = Math.cos(2 * Math.PI / l5);
          var itwdf = Math.sin(2 * Math.PI / l5);
          for (var p4 = 0; p4 < N5; p4 += l5) {
            var rtwdf_ = rtwdf;
            var itwdf_ = itwdf;
            for (var j5 = 0; j5 < s2; j5++) {
              var re4 = rtws[p4 + j5];
              var ie4 = itws[p4 + j5];
              var ro4 = rtws[p4 + j5 + s2];
              var io3 = itws[p4 + j5 + s2];
              var rx = rtwdf_ * ro4 - itwdf_ * io3;
              io3 = rtwdf_ * io3 + itwdf_ * ro4;
              ro4 = rx;
              rtws[p4 + j5] = re4 + ro4;
              itws[p4 + j5] = ie4 + io3;
              rtws[p4 + j5 + s2] = re4 - ro4;
              itws[p4 + j5 + s2] = ie4 - io3;
              if (j5 !== l5) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                rtwdf_ = rx;
              }
            }
          }
        }
      };
      FFTM.prototype.guessLen13b = function guessLen13b(n3, m3) {
        var N5 = Math.max(m3, n3) | 1;
        var odd = N5 & 1;
        var i3 = 0;
        for (N5 = N5 / 2 | 0; N5; N5 = N5 >>> 1) {
          i3++;
        }
        return 1 << i3 + 1 + odd;
      };
      FFTM.prototype.conjugate = function conjugate(rws, iws, N5) {
        if (N5 <= 1)
          return;
        for (var i3 = 0; i3 < N5 / 2; i3++) {
          var t = rws[i3];
          rws[i3] = rws[N5 - i3 - 1];
          rws[N5 - i3 - 1] = t;
          t = iws[i3];
          iws[i3] = -iws[N5 - i3 - 1];
          iws[N5 - i3 - 1] = -t;
        }
      };
      FFTM.prototype.normalize13b = function normalize13b(ws3, N5) {
        var carry = 0;
        for (var i3 = 0; i3 < N5 / 2; i3++) {
          var w4 = Math.round(ws3[2 * i3 + 1] / N5) * 8192 + Math.round(ws3[2 * i3] / N5) + carry;
          ws3[i3] = w4 & 67108863;
          if (w4 < 67108864) {
            carry = 0;
          } else {
            carry = w4 / 67108864 | 0;
          }
        }
        return ws3;
      };
      FFTM.prototype.convert13b = function convert13b(ws3, len, rws, N5) {
        var carry = 0;
        for (var i3 = 0; i3 < len; i3++) {
          carry = carry + (ws3[i3] | 0);
          rws[2 * i3] = carry & 8191;
          carry = carry >>> 13;
          rws[2 * i3 + 1] = carry & 8191;
          carry = carry >>> 13;
        }
        for (i3 = 2 * len; i3 < N5; ++i3) {
          rws[i3] = 0;
        }
        assert2(carry === 0);
        assert2((carry & ~8191) === 0);
      };
      FFTM.prototype.stub = function stub(N5) {
        var ph = new Array(N5);
        for (var i3 = 0; i3 < N5; i3++) {
          ph[i3] = 0;
        }
        return ph;
      };
      FFTM.prototype.mulp = function mulp(x7, y6, out) {
        var N5 = 2 * this.guessLen13b(x7.length, y6.length);
        var rbt = this.makeRBT(N5);
        var _6 = this.stub(N5);
        var rws = new Array(N5);
        var rwst = new Array(N5);
        var iwst = new Array(N5);
        var nrws = new Array(N5);
        var nrwst = new Array(N5);
        var niwst = new Array(N5);
        var rmws = out.words;
        rmws.length = N5;
        this.convert13b(x7.words, x7.length, rws, N5);
        this.convert13b(y6.words, y6.length, nrws, N5);
        this.transform(rws, _6, rwst, iwst, N5, rbt);
        this.transform(nrws, _6, nrwst, niwst, N5, rbt);
        for (var i3 = 0; i3 < N5; i3++) {
          var rx = rwst[i3] * nrwst[i3] - iwst[i3] * niwst[i3];
          iwst[i3] = rwst[i3] * niwst[i3] + iwst[i3] * nrwst[i3];
          rwst[i3] = rx;
        }
        this.conjugate(rwst, iwst, N5);
        this.transform(rwst, iwst, rmws, _6, N5, rbt);
        this.conjugate(rmws, _6, N5);
        this.normalize13b(rmws, N5);
        out.negative = x7.negative ^ y6.negative;
        out.length = x7.length + y6.length;
        return out.strip();
      };
      BN.prototype.mul = function mul(num) {
        var out = new BN(null);
        out.words = new Array(this.length + num.length);
        return this.mulTo(num, out);
      };
      BN.prototype.mulf = function mulf(num) {
        var out = new BN(null);
        out.words = new Array(this.length + num.length);
        return jumboMulTo(this, num, out);
      };
      BN.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this);
      };
      BN.prototype.imuln = function imuln(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        var carry = 0;
        for (var i3 = 0; i3 < this.length; i3++) {
          var w4 = (this.words[i3] | 0) * num;
          var lo3 = (w4 & 67108863) + (carry & 67108863);
          carry >>= 26;
          carry += w4 / 67108864 | 0;
          carry += lo3 >>> 26;
          this.words[i3] = lo3 & 67108863;
        }
        if (carry !== 0) {
          this.words[i3] = carry;
          this.length++;
        }
        return this;
      };
      BN.prototype.muln = function muln(num) {
        return this.clone().imuln(num);
      };
      BN.prototype.sqr = function sqr() {
        return this.mul(this);
      };
      BN.prototype.isqr = function isqr() {
        return this.imul(this.clone());
      };
      BN.prototype.pow = function pow(num) {
        var w4 = toBitArray(num);
        if (w4.length === 0)
          return new BN(1);
        var res = this;
        for (var i3 = 0; i3 < w4.length; i3++, res = res.sqr()) {
          if (w4[i3] !== 0)
            break;
        }
        if (++i3 < w4.length) {
          for (var q5 = res.sqr(); i3 < w4.length; i3++, q5 = q5.sqr()) {
            if (w4[i3] === 0)
              continue;
            res = res.mul(q5);
          }
        }
        return res;
      };
      BN.prototype.iushln = function iushln(bits) {
        assert2(typeof bits === "number" && bits >= 0);
        var r3 = bits % 26;
        var s2 = (bits - r3) / 26;
        var carryMask = 67108863 >>> 26 - r3 << 26 - r3;
        var i3;
        if (r3 !== 0) {
          var carry = 0;
          for (i3 = 0; i3 < this.length; i3++) {
            var newCarry = this.words[i3] & carryMask;
            var c5 = (this.words[i3] | 0) - newCarry << r3;
            this.words[i3] = c5 | carry;
            carry = newCarry >>> 26 - r3;
          }
          if (carry) {
            this.words[i3] = carry;
            this.length++;
          }
        }
        if (s2 !== 0) {
          for (i3 = this.length - 1; i3 >= 0; i3--) {
            this.words[i3 + s2] = this.words[i3];
          }
          for (i3 = 0; i3 < s2; i3++) {
            this.words[i3] = 0;
          }
          this.length += s2;
        }
        return this.strip();
      };
      BN.prototype.ishln = function ishln(bits) {
        assert2(this.negative === 0);
        return this.iushln(bits);
      };
      BN.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert2(typeof bits === "number" && bits >= 0);
        var h5;
        if (hint) {
          h5 = (hint - hint % 26) / 26;
        } else {
          h5 = 0;
        }
        var r3 = bits % 26;
        var s2 = Math.min((bits - r3) / 26, this.length);
        var mask = 67108863 ^ 67108863 >>> r3 << r3;
        var maskedWords = extended;
        h5 -= s2;
        h5 = Math.max(0, h5);
        if (maskedWords) {
          for (var i3 = 0; i3 < s2; i3++) {
            maskedWords.words[i3] = this.words[i3];
          }
          maskedWords.length = s2;
        }
        if (s2 === 0) {
        } else if (this.length > s2) {
          this.length -= s2;
          for (i3 = 0; i3 < this.length; i3++) {
            this.words[i3] = this.words[i3 + s2];
          }
        } else {
          this.words[0] = 0;
          this.length = 1;
        }
        var carry = 0;
        for (i3 = this.length - 1; i3 >= 0 && (carry !== 0 || i3 >= h5); i3--) {
          var word = this.words[i3] | 0;
          this.words[i3] = carry << 26 - r3 | word >>> r3;
          carry = word & mask;
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry;
        }
        if (this.length === 0) {
          this.words[0] = 0;
          this.length = 1;
        }
        return this.strip();
      };
      BN.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert2(this.negative === 0);
        return this.iushrn(bits, hint, extended);
      };
      BN.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits);
      };
      BN.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits);
      };
      BN.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits);
      };
      BN.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits);
      };
      BN.prototype.testn = function testn(bit) {
        assert2(typeof bit === "number" && bit >= 0);
        var r3 = bit % 26;
        var s2 = (bit - r3) / 26;
        var q5 = 1 << r3;
        if (this.length <= s2)
          return false;
        var w4 = this.words[s2];
        return !!(w4 & q5);
      };
      BN.prototype.imaskn = function imaskn(bits) {
        assert2(typeof bits === "number" && bits >= 0);
        var r3 = bits % 26;
        var s2 = (bits - r3) / 26;
        assert2(this.negative === 0, "imaskn works only with positive numbers");
        if (this.length <= s2) {
          return this;
        }
        if (r3 !== 0) {
          s2++;
        }
        this.length = Math.min(s2, this.length);
        if (r3 !== 0) {
          var mask = 67108863 ^ 67108863 >>> r3 << r3;
          this.words[this.length - 1] &= mask;
        }
        return this.strip();
      };
      BN.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits);
      };
      BN.prototype.iaddn = function iaddn(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        if (num < 0)
          return this.isubn(-num);
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) < num) {
            this.words[0] = num - (this.words[0] | 0);
            this.negative = 0;
            return this;
          }
          this.negative = 0;
          this.isubn(num);
          this.negative = 1;
          return this;
        }
        return this._iaddn(num);
      };
      BN.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num;
        for (var i3 = 0; i3 < this.length && this.words[i3] >= 67108864; i3++) {
          this.words[i3] -= 67108864;
          if (i3 === this.length - 1) {
            this.words[i3 + 1] = 1;
          } else {
            this.words[i3 + 1]++;
          }
        }
        this.length = Math.max(this.length, i3 + 1);
        return this;
      };
      BN.prototype.isubn = function isubn(num) {
        assert2(typeof num === "number");
        assert2(num < 67108864);
        if (num < 0)
          return this.iaddn(-num);
        if (this.negative !== 0) {
          this.negative = 0;
          this.iaddn(num);
          this.negative = 1;
          return this;
        }
        this.words[0] -= num;
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0];
          this.negative = 1;
        } else {
          for (var i3 = 0; i3 < this.length && this.words[i3] < 0; i3++) {
            this.words[i3] += 67108864;
            this.words[i3 + 1] -= 1;
          }
        }
        return this.strip();
      };
      BN.prototype.addn = function addn(num) {
        return this.clone().iaddn(num);
      };
      BN.prototype.subn = function subn(num) {
        return this.clone().isubn(num);
      };
      BN.prototype.iabs = function iabs() {
        this.negative = 0;
        return this;
      };
      BN.prototype.abs = function abs() {
        return this.clone().iabs();
      };
      BN.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift;
        var i3;
        this._expand(len);
        var w4;
        var carry = 0;
        for (i3 = 0; i3 < num.length; i3++) {
          w4 = (this.words[i3 + shift] | 0) + carry;
          var right = (num.words[i3] | 0) * mul;
          w4 -= right & 67108863;
          carry = (w4 >> 26) - (right / 67108864 | 0);
          this.words[i3 + shift] = w4 & 67108863;
        }
        for (; i3 < this.length - shift; i3++) {
          w4 = (this.words[i3 + shift] | 0) + carry;
          carry = w4 >> 26;
          this.words[i3 + shift] = w4 & 67108863;
        }
        if (carry === 0)
          return this.strip();
        assert2(carry === -1);
        carry = 0;
        for (i3 = 0; i3 < this.length; i3++) {
          w4 = -(this.words[i3] | 0) + carry;
          carry = w4 >> 26;
          this.words[i3] = w4 & 67108863;
        }
        this.negative = 1;
        return this.strip();
      };
      BN.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length;
        var a3 = this.clone();
        var b3 = num;
        var bhi = b3.words[b3.length - 1] | 0;
        var bhiBits = this._countBits(bhi);
        shift = 26 - bhiBits;
        if (shift !== 0) {
          b3 = b3.ushln(shift);
          a3.iushln(shift);
          bhi = b3.words[b3.length - 1] | 0;
        }
        var m3 = a3.length - b3.length;
        var q5;
        if (mode !== "mod") {
          q5 = new BN(null);
          q5.length = m3 + 1;
          q5.words = new Array(q5.length);
          for (var i3 = 0; i3 < q5.length; i3++) {
            q5.words[i3] = 0;
          }
        }
        var diff = a3.clone()._ishlnsubmul(b3, 1, m3);
        if (diff.negative === 0) {
          a3 = diff;
          if (q5) {
            q5.words[m3] = 1;
          }
        }
        for (var j5 = m3 - 1; j5 >= 0; j5--) {
          var qj = (a3.words[b3.length + j5] | 0) * 67108864 + (a3.words[b3.length + j5 - 1] | 0);
          qj = Math.min(qj / bhi | 0, 67108863);
          a3._ishlnsubmul(b3, qj, j5);
          while (a3.negative !== 0) {
            qj--;
            a3.negative = 0;
            a3._ishlnsubmul(b3, 1, j5);
            if (!a3.isZero()) {
              a3.negative ^= 1;
            }
          }
          if (q5) {
            q5.words[j5] = qj;
          }
        }
        if (q5) {
          q5.strip();
        }
        a3.strip();
        if (mode !== "div" && shift !== 0) {
          a3.iushrn(shift);
        }
        return {
          div: q5 || null,
          mod: a3
        };
      };
      BN.prototype.divmod = function divmod(num, mode, positive) {
        assert2(!num.isZero());
        if (this.isZero()) {
          return {
            div: new BN(0),
            mod: new BN(0)
          };
        }
        var div, mod, res;
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.iadd(num);
            }
          }
          return {
            div,
            mod
          };
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode);
          if (mode !== "mod") {
            div = res.div.neg();
          }
          return {
            div,
            mod: res.mod
          };
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode);
          if (mode !== "div") {
            mod = res.mod.neg();
            if (positive && mod.negative !== 0) {
              mod.isub(num);
            }
          }
          return {
            div: res.div,
            mod
          };
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN(0),
            mod: this
          };
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            };
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN(this.modn(num.words[0]))
            };
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN(this.modn(num.words[0]))
          };
        }
        return this._wordDiv(num, mode);
      };
      BN.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div;
      };
      BN.prototype.mod = function mod(num) {
        return this.divmod(num, "mod", false).mod;
      };
      BN.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod;
      };
      BN.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num);
        if (dm.mod.isZero())
          return dm.div;
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
        var half = num.ushrn(1);
        var r22 = num.andln(1);
        var cmp = mod.cmp(half);
        if (cmp < 0 || r22 === 1 && cmp === 0)
          return dm.div;
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
      };
      BN.prototype.modn = function modn(num) {
        assert2(num <= 67108863);
        var p4 = (1 << 26) % num;
        var acc = 0;
        for (var i3 = this.length - 1; i3 >= 0; i3--) {
          acc = (p4 * acc + (this.words[i3] | 0)) % num;
        }
        return acc;
      };
      BN.prototype.idivn = function idivn(num) {
        assert2(num <= 67108863);
        var carry = 0;
        for (var i3 = this.length - 1; i3 >= 0; i3--) {
          var w4 = (this.words[i3] | 0) + carry * 67108864;
          this.words[i3] = w4 / num | 0;
          carry = w4 % num;
        }
        return this.strip();
      };
      BN.prototype.divn = function divn(num) {
        return this.clone().idivn(num);
      };
      BN.prototype.egcd = function egcd(p4) {
        assert2(p4.negative === 0);
        assert2(!p4.isZero());
        var x7 = this;
        var y6 = p4.clone();
        if (x7.negative !== 0) {
          x7 = x7.umod(p4);
        } else {
          x7 = x7.clone();
        }
        var A5 = new BN(1);
        var B3 = new BN(0);
        var C5 = new BN(0);
        var D5 = new BN(1);
        var g4 = 0;
        while (x7.isEven() && y6.isEven()) {
          x7.iushrn(1);
          y6.iushrn(1);
          ++g4;
        }
        var yp = y6.clone();
        var xp = x7.clone();
        while (!x7.isZero()) {
          for (var i3 = 0, im = 1; (x7.words[0] & im) === 0 && i3 < 26; ++i3, im <<= 1)
            ;
          if (i3 > 0) {
            x7.iushrn(i3);
            while (i3-- > 0) {
              if (A5.isOdd() || B3.isOdd()) {
                A5.iadd(yp);
                B3.isub(xp);
              }
              A5.iushrn(1);
              B3.iushrn(1);
            }
          }
          for (var j5 = 0, jm = 1; (y6.words[0] & jm) === 0 && j5 < 26; ++j5, jm <<= 1)
            ;
          if (j5 > 0) {
            y6.iushrn(j5);
            while (j5-- > 0) {
              if (C5.isOdd() || D5.isOdd()) {
                C5.iadd(yp);
                D5.isub(xp);
              }
              C5.iushrn(1);
              D5.iushrn(1);
            }
          }
          if (x7.cmp(y6) >= 0) {
            x7.isub(y6);
            A5.isub(C5);
            B3.isub(D5);
          } else {
            y6.isub(x7);
            C5.isub(A5);
            D5.isub(B3);
          }
        }
        return {
          a: C5,
          b: D5,
          gcd: y6.iushln(g4)
        };
      };
      BN.prototype._invmp = function _invmp(p4) {
        assert2(p4.negative === 0);
        assert2(!p4.isZero());
        var a3 = this;
        var b3 = p4.clone();
        if (a3.negative !== 0) {
          a3 = a3.umod(p4);
        } else {
          a3 = a3.clone();
        }
        var x1 = new BN(1);
        var x22 = new BN(0);
        var delta = b3.clone();
        while (a3.cmpn(1) > 0 && b3.cmpn(1) > 0) {
          for (var i3 = 0, im = 1; (a3.words[0] & im) === 0 && i3 < 26; ++i3, im <<= 1)
            ;
          if (i3 > 0) {
            a3.iushrn(i3);
            while (i3-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta);
              }
              x1.iushrn(1);
            }
          }
          for (var j5 = 0, jm = 1; (b3.words[0] & jm) === 0 && j5 < 26; ++j5, jm <<= 1)
            ;
          if (j5 > 0) {
            b3.iushrn(j5);
            while (j5-- > 0) {
              if (x22.isOdd()) {
                x22.iadd(delta);
              }
              x22.iushrn(1);
            }
          }
          if (a3.cmp(b3) >= 0) {
            a3.isub(b3);
            x1.isub(x22);
          } else {
            b3.isub(a3);
            x22.isub(x1);
          }
        }
        var res;
        if (a3.cmpn(1) === 0) {
          res = x1;
        } else {
          res = x22;
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p4);
        }
        return res;
      };
      BN.prototype.gcd = function gcd(num) {
        if (this.isZero())
          return num.abs();
        if (num.isZero())
          return this.abs();
        var a3 = this.clone();
        var b3 = num.clone();
        a3.negative = 0;
        b3.negative = 0;
        for (var shift = 0; a3.isEven() && b3.isEven(); shift++) {
          a3.iushrn(1);
          b3.iushrn(1);
        }
        do {
          while (a3.isEven()) {
            a3.iushrn(1);
          }
          while (b3.isEven()) {
            b3.iushrn(1);
          }
          var r3 = a3.cmp(b3);
          if (r3 < 0) {
            var t = a3;
            a3 = b3;
            b3 = t;
          } else if (r3 === 0 || b3.cmpn(1) === 0) {
            break;
          }
          a3.isub(b3);
        } while (true);
        return b3.iushln(shift);
      };
      BN.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num);
      };
      BN.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0;
      };
      BN.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1;
      };
      BN.prototype.andln = function andln(num) {
        return this.words[0] & num;
      };
      BN.prototype.bincn = function bincn(bit) {
        assert2(typeof bit === "number");
        var r3 = bit % 26;
        var s2 = (bit - r3) / 26;
        var q5 = 1 << r3;
        if (this.length <= s2) {
          this._expand(s2 + 1);
          this.words[s2] |= q5;
          return this;
        }
        var carry = q5;
        for (var i3 = s2; carry !== 0 && i3 < this.length; i3++) {
          var w4 = this.words[i3] | 0;
          w4 += carry;
          carry = w4 >>> 26;
          w4 &= 67108863;
          this.words[i3] = w4;
        }
        if (carry !== 0) {
          this.words[i3] = carry;
          this.length++;
        }
        return this;
      };
      BN.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0;
      };
      BN.prototype.cmpn = function cmpn(num) {
        var negative = num < 0;
        if (this.negative !== 0 && !negative)
          return -1;
        if (this.negative === 0 && negative)
          return 1;
        this.strip();
        var res;
        if (this.length > 1) {
          res = 1;
        } else {
          if (negative) {
            num = -num;
          }
          assert2(num <= 67108863, "Number is too big");
          var w4 = this.words[0] | 0;
          res = w4 === num ? 0 : w4 < num ? -1 : 1;
        }
        if (this.negative !== 0)
          return -res | 0;
        return res;
      };
      BN.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0)
          return -1;
        if (this.negative === 0 && num.negative !== 0)
          return 1;
        var res = this.ucmp(num);
        if (this.negative !== 0)
          return -res | 0;
        return res;
      };
      BN.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length)
          return 1;
        if (this.length < num.length)
          return -1;
        var res = 0;
        for (var i3 = this.length - 1; i3 >= 0; i3--) {
          var a3 = this.words[i3] | 0;
          var b3 = num.words[i3] | 0;
          if (a3 === b3)
            continue;
          if (a3 < b3) {
            res = -1;
          } else if (a3 > b3) {
            res = 1;
          }
          break;
        }
        return res;
      };
      BN.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1;
      };
      BN.prototype.gt = function gt3(num) {
        return this.cmp(num) === 1;
      };
      BN.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0;
      };
      BN.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0;
      };
      BN.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1;
      };
      BN.prototype.lt = function lt3(num) {
        return this.cmp(num) === -1;
      };
      BN.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0;
      };
      BN.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0;
      };
      BN.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0;
      };
      BN.prototype.eq = function eq(num) {
        return this.cmp(num) === 0;
      };
      BN.red = function red(num) {
        return new Red(num);
      };
      BN.prototype.toRed = function toRed(ctx) {
        assert2(!this.red, "Already a number in reduction context");
        assert2(this.negative === 0, "red works only with positives");
        return ctx.convertTo(this)._forceRed(ctx);
      };
      BN.prototype.fromRed = function fromRed() {
        assert2(this.red, "fromRed works only with numbers in reduction context");
        return this.red.convertFrom(this);
      };
      BN.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx;
        return this;
      };
      BN.prototype.forceRed = function forceRed(ctx) {
        assert2(!this.red, "Already a number in reduction context");
        return this._forceRed(ctx);
      };
      BN.prototype.redAdd = function redAdd(num) {
        assert2(this.red, "redAdd works only with red numbers");
        return this.red.add(this, num);
      };
      BN.prototype.redIAdd = function redIAdd(num) {
        assert2(this.red, "redIAdd works only with red numbers");
        return this.red.iadd(this, num);
      };
      BN.prototype.redSub = function redSub(num) {
        assert2(this.red, "redSub works only with red numbers");
        return this.red.sub(this, num);
      };
      BN.prototype.redISub = function redISub(num) {
        assert2(this.red, "redISub works only with red numbers");
        return this.red.isub(this, num);
      };
      BN.prototype.redShl = function redShl(num) {
        assert2(this.red, "redShl works only with red numbers");
        return this.red.shl(this, num);
      };
      BN.prototype.redMul = function redMul(num) {
        assert2(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.mul(this, num);
      };
      BN.prototype.redIMul = function redIMul(num) {
        assert2(this.red, "redMul works only with red numbers");
        this.red._verify2(this, num);
        return this.red.imul(this, num);
      };
      BN.prototype.redSqr = function redSqr() {
        assert2(this.red, "redSqr works only with red numbers");
        this.red._verify1(this);
        return this.red.sqr(this);
      };
      BN.prototype.redISqr = function redISqr() {
        assert2(this.red, "redISqr works only with red numbers");
        this.red._verify1(this);
        return this.red.isqr(this);
      };
      BN.prototype.redSqrt = function redSqrt() {
        assert2(this.red, "redSqrt works only with red numbers");
        this.red._verify1(this);
        return this.red.sqrt(this);
      };
      BN.prototype.redInvm = function redInvm() {
        assert2(this.red, "redInvm works only with red numbers");
        this.red._verify1(this);
        return this.red.invm(this);
      };
      BN.prototype.redNeg = function redNeg() {
        assert2(this.red, "redNeg works only with red numbers");
        this.red._verify1(this);
        return this.red.neg(this);
      };
      BN.prototype.redPow = function redPow(num) {
        assert2(this.red && !num.red, "redPow(normalNum)");
        this.red._verify1(this);
        return this.red.pow(this, num);
      };
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function MPrime(name, p4) {
        this.name = name;
        this.p = new BN(p4, 16);
        this.n = this.p.bitLength();
        this.k = new BN(1).iushln(this.n).isub(this.p);
        this.tmp = this._tmp();
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN(null);
        tmp.words = new Array(Math.ceil(this.n / 13));
        return tmp;
      };
      MPrime.prototype.ireduce = function ireduce(num) {
        var r3 = num;
        var rlen;
        do {
          this.split(r3, this.tmp);
          r3 = this.imulK(r3);
          r3 = r3.iadd(this.tmp);
          rlen = r3.bitLength();
        } while (rlen > this.n);
        var cmp = rlen < this.n ? -1 : r3.ucmp(this.p);
        if (cmp === 0) {
          r3.words[0] = 0;
          r3.length = 1;
        } else if (cmp > 0) {
          r3.isub(this.p);
        } else {
          if (r3.strip !== void 0) {
            r3.strip();
          } else {
            r3._strip();
          }
        }
        return r3;
      };
      MPrime.prototype.split = function split2(input, out) {
        input.iushrn(this.n, 0, out);
      };
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k);
      };
      function K256() {
        MPrime.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      inherits(K256, MPrime);
      K256.prototype.split = function split2(input, output) {
        var mask = 4194303;
        var outLen = Math.min(input.length, 9);
        for (var i3 = 0; i3 < outLen; i3++) {
          output.words[i3] = input.words[i3];
        }
        output.length = outLen;
        if (input.length <= 9) {
          input.words[0] = 0;
          input.length = 1;
          return;
        }
        var prev = input.words[9];
        output.words[output.length++] = prev & mask;
        for (i3 = 10; i3 < input.length; i3++) {
          var next = input.words[i3] | 0;
          input.words[i3 - 10] = (next & mask) << 4 | prev >>> 22;
          prev = next;
        }
        prev >>>= 22;
        input.words[i3 - 10] = prev;
        if (prev === 0 && input.length > 10) {
          input.length -= 10;
        } else {
          input.length -= 9;
        }
      };
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0;
        num.words[num.length + 1] = 0;
        num.length += 2;
        var lo3 = 0;
        for (var i3 = 0; i3 < num.length; i3++) {
          var w4 = num.words[i3] | 0;
          lo3 += w4 * 977;
          num.words[i3] = lo3 & 67108863;
          lo3 = w4 * 64 + (lo3 / 67108864 | 0);
        }
        if (num.words[num.length - 1] === 0) {
          num.length--;
          if (num.words[num.length - 1] === 0) {
            num.length--;
          }
        }
        return num;
      };
      function P224() {
        MPrime.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      inherits(P224, MPrime);
      function P192() {
        MPrime.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      inherits(P192, MPrime);
      function P25519() {
        MPrime.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      inherits(P25519, MPrime);
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0;
        for (var i3 = 0; i3 < num.length; i3++) {
          var hi4 = (num.words[i3] | 0) * 19 + carry;
          var lo3 = hi4 & 67108863;
          hi4 >>>= 26;
          num.words[i3] = lo3;
          carry = hi4;
        }
        if (carry !== 0) {
          num.words[num.length++] = carry;
        }
        return num;
      };
      BN._prime = function prime(name) {
        if (primes[name])
          return primes[name];
        var prime2;
        if (name === "k256") {
          prime2 = new K256();
        } else if (name === "p224") {
          prime2 = new P224();
        } else if (name === "p192") {
          prime2 = new P192();
        } else if (name === "p25519") {
          prime2 = new P25519();
        } else {
          throw new Error("Unknown prime " + name);
        }
        primes[name] = prime2;
        return prime2;
      };
      function Red(m3) {
        if (typeof m3 === "string") {
          var prime = BN._prime(m3);
          this.m = prime.p;
          this.prime = prime;
        } else {
          assert2(m3.gtn(1), "modulus must be greater than 1");
          this.m = m3;
          this.prime = null;
        }
      }
      Red.prototype._verify1 = function _verify1(a3) {
        assert2(a3.negative === 0, "red works only with positives");
        assert2(a3.red, "red works only with red numbers");
      };
      Red.prototype._verify2 = function _verify2(a3, b3) {
        assert2((a3.negative | b3.negative) === 0, "red works only with positives");
        assert2(
          a3.red && a3.red === b3.red,
          "red works only with red numbers"
        );
      };
      Red.prototype.imod = function imod(a3) {
        if (this.prime)
          return this.prime.ireduce(a3)._forceRed(this);
        return a3.umod(this.m)._forceRed(this);
      };
      Red.prototype.neg = function neg(a3) {
        if (a3.isZero()) {
          return a3.clone();
        }
        return this.m.sub(a3)._forceRed(this);
      };
      Red.prototype.add = function add(a3, b3) {
        this._verify2(a3, b3);
        var res = a3.add(b3);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.iadd = function iadd(a3, b3) {
        this._verify2(a3, b3);
        var res = a3.iadd(b3);
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m);
        }
        return res;
      };
      Red.prototype.sub = function sub(a3, b3) {
        this._verify2(a3, b3);
        var res = a3.sub(b3);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Red.prototype.isub = function isub(a3, b3) {
        this._verify2(a3, b3);
        var res = a3.isub(b3);
        if (res.cmpn(0) < 0) {
          res.iadd(this.m);
        }
        return res;
      };
      Red.prototype.shl = function shl(a3, num) {
        this._verify1(a3);
        return this.imod(a3.ushln(num));
      };
      Red.prototype.imul = function imul(a3, b3) {
        this._verify2(a3, b3);
        return this.imod(a3.imul(b3));
      };
      Red.prototype.mul = function mul(a3, b3) {
        this._verify2(a3, b3);
        return this.imod(a3.mul(b3));
      };
      Red.prototype.isqr = function isqr(a3) {
        return this.imul(a3, a3.clone());
      };
      Red.prototype.sqr = function sqr(a3) {
        return this.mul(a3, a3);
      };
      Red.prototype.sqrt = function sqrt(a3) {
        if (a3.isZero())
          return a3.clone();
        var mod3 = this.m.andln(3);
        assert2(mod3 % 2 === 1);
        if (mod3 === 3) {
          var pow = this.m.add(new BN(1)).iushrn(2);
          return this.pow(a3, pow);
        }
        var q5 = this.m.subn(1);
        var s2 = 0;
        while (!q5.isZero() && q5.andln(1) === 0) {
          s2++;
          q5.iushrn(1);
        }
        assert2(!q5.isZero());
        var one = new BN(1).toRed(this);
        var nOne = one.redNeg();
        var lpow = this.m.subn(1).iushrn(1);
        var z6 = this.m.bitLength();
        z6 = new BN(2 * z6 * z6).toRed(this);
        while (this.pow(z6, lpow).cmp(nOne) !== 0) {
          z6.redIAdd(nOne);
        }
        var c5 = this.pow(z6, q5);
        var r3 = this.pow(a3, q5.addn(1).iushrn(1));
        var t = this.pow(a3, q5);
        var m3 = s2;
        while (t.cmp(one) !== 0) {
          var tmp = t;
          for (var i3 = 0; tmp.cmp(one) !== 0; i3++) {
            tmp = tmp.redSqr();
          }
          assert2(i3 < m3);
          var b3 = this.pow(c5, new BN(1).iushln(m3 - i3 - 1));
          r3 = r3.redMul(b3);
          c5 = b3.redSqr();
          t = t.redMul(c5);
          m3 = i3;
        }
        return r3;
      };
      Red.prototype.invm = function invm(a3) {
        var inv = a3._invmp(this.m);
        if (inv.negative !== 0) {
          inv.negative = 0;
          return this.imod(inv).redNeg();
        } else {
          return this.imod(inv);
        }
      };
      Red.prototype.pow = function pow(a3, num) {
        if (num.isZero())
          return new BN(1).toRed(this);
        if (num.cmpn(1) === 0)
          return a3.clone();
        var windowSize = 4;
        var wnd = new Array(1 << windowSize);
        wnd[0] = new BN(1).toRed(this);
        wnd[1] = a3;
        for (var i3 = 2; i3 < wnd.length; i3++) {
          wnd[i3] = this.mul(wnd[i3 - 1], a3);
        }
        var res = wnd[0];
        var current = 0;
        var currentLen = 0;
        var start = num.bitLength() % 26;
        if (start === 0) {
          start = 26;
        }
        for (i3 = num.length - 1; i3 >= 0; i3--) {
          var word = num.words[i3];
          for (var j5 = start - 1; j5 >= 0; j5--) {
            var bit = word >> j5 & 1;
            if (res !== wnd[0]) {
              res = this.sqr(res);
            }
            if (bit === 0 && current === 0) {
              currentLen = 0;
              continue;
            }
            current <<= 1;
            current |= bit;
            currentLen++;
            if (currentLen !== windowSize && (i3 !== 0 || j5 !== 0))
              continue;
            res = this.mul(res, wnd[current]);
            currentLen = 0;
            current = 0;
          }
          start = 26;
        }
        return res;
      };
      Red.prototype.convertTo = function convertTo(num) {
        var r3 = num.umod(this.m);
        return r3 === num ? r3.clone() : r3;
      };
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone();
        res.red = null;
        return res;
      };
      BN.mont = function mont(num) {
        return new Mont(num);
      };
      function Mont(m3) {
        Red.call(this, m3);
        this.shift = this.m.bitLength();
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26;
        }
        this.r = new BN(1).iushln(this.shift);
        this.r2 = this.imod(this.r.sqr());
        this.rinv = this.r._invmp(this.m);
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
        this.minv = this.minv.umod(this.r);
        this.minv = this.r.sub(this.minv);
      }
      inherits(Mont, Red);
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift));
      };
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r3 = this.imod(num.mul(this.rinv));
        r3.red = null;
        return r3;
      };
      Mont.prototype.imul = function imul(a3, b3) {
        if (a3.isZero() || b3.isZero()) {
          a3.words[0] = 0;
          a3.length = 1;
          return a3;
        }
        var t = a3.imul(b3);
        var c5 = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u3 = t.isub(c5).iushrn(this.shift);
        var res = u3;
        if (u3.cmp(this.m) >= 0) {
          res = u3.isub(this.m);
        } else if (u3.cmpn(0) < 0) {
          res = u3.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.mul = function mul(a3, b3) {
        if (a3.isZero() || b3.isZero())
          return new BN(0)._forceRed(this);
        var t = a3.mul(b3);
        var c5 = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
        var u3 = t.isub(c5).iushrn(this.shift);
        var res = u3;
        if (u3.cmp(this.m) >= 0) {
          res = u3.isub(this.m);
        } else if (u3.cmpn(0) < 0) {
          res = u3.iadd(this.m);
        }
        return res._forceRed(this);
      };
      Mont.prototype.invm = function invm(a3) {
        var res = this.imod(a3._invmp(this.m).mul(this.r2));
        return res._forceRed(this);
      };
    })(typeof module === "undefined" || module, exports);
  }
});

// node_modules/minimalistic-assert/index.js
var require_minimalistic_assert = __commonJS({
  "node_modules/minimalistic-assert/index.js"(exports, module) {
    module.exports = assert2;
    function assert2(val, msg) {
      if (!val)
        throw new Error(msg || "Assertion failed");
    }
    assert2.equal = function assertEqual(l5, r3, msg) {
      if (l5 != r3)
        throw new Error(msg || "Assertion failed: " + l5 + " != " + r3);
    };
  }
});

// node_modules/minimalistic-crypto-utils/lib/utils.js
var require_utils = __commonJS({
  "node_modules/minimalistic-crypto-utils/lib/utils.js"(exports) {
    "use strict";
    var utils = exports;
    function toArray(msg, enc) {
      if (Array.isArray(msg))
        return msg.slice();
      if (!msg)
        return [];
      var res = [];
      if (typeof msg !== "string") {
        for (var i3 = 0; i3 < msg.length; i3++)
          res[i3] = msg[i3] | 0;
        return res;
      }
      if (enc === "hex") {
        msg = msg.replace(/[^a-z0-9]+/ig, "");
        if (msg.length % 2 !== 0)
          msg = "0" + msg;
        for (var i3 = 0; i3 < msg.length; i3 += 2)
          res.push(parseInt(msg[i3] + msg[i3 + 1], 16));
      } else {
        for (var i3 = 0; i3 < msg.length; i3++) {
          var c5 = msg.charCodeAt(i3);
          var hi4 = c5 >> 8;
          var lo3 = c5 & 255;
          if (hi4)
            res.push(hi4, lo3);
          else
            res.push(lo3);
        }
      }
      return res;
    }
    utils.toArray = toArray;
    function zero2(word) {
      if (word.length === 1)
        return "0" + word;
      else
        return word;
    }
    utils.zero2 = zero2;
    function toHex3(msg) {
      var res = "";
      for (var i3 = 0; i3 < msg.length; i3++)
        res += zero2(msg[i3].toString(16));
      return res;
    }
    utils.toHex = toHex3;
    utils.encode = function encode4(arr, enc) {
      if (enc === "hex")
        return toHex3(arr);
      else
        return arr;
    };
  }
});

// node_modules/elliptic/lib/elliptic/utils.js
var require_utils2 = __commonJS({
  "node_modules/elliptic/lib/elliptic/utils.js"(exports) {
    "use strict";
    var utils = exports;
    var BN = require_bn();
    var minAssert = require_minimalistic_assert();
    var minUtils = require_utils();
    utils.assert = minAssert;
    utils.toArray = minUtils.toArray;
    utils.zero2 = minUtils.zero2;
    utils.toHex = minUtils.toHex;
    utils.encode = minUtils.encode;
    function getNAF(num, w4, bits) {
      var naf = new Array(Math.max(num.bitLength(), bits) + 1);
      var i3;
      for (i3 = 0; i3 < naf.length; i3 += 1) {
        naf[i3] = 0;
      }
      var ws3 = 1 << w4 + 1;
      var k5 = num.clone();
      for (i3 = 0; i3 < naf.length; i3++) {
        var z6;
        var mod = k5.andln(ws3 - 1);
        if (k5.isOdd()) {
          if (mod > (ws3 >> 1) - 1)
            z6 = (ws3 >> 1) - mod;
          else
            z6 = mod;
          k5.isubn(z6);
        } else {
          z6 = 0;
        }
        naf[i3] = z6;
        k5.iushrn(1);
      }
      return naf;
    }
    utils.getNAF = getNAF;
    function getJSF(k1, k22) {
      var jsf = [
        [],
        []
      ];
      k1 = k1.clone();
      k22 = k22.clone();
      var d1 = 0;
      var d22 = 0;
      var m8;
      while (k1.cmpn(-d1) > 0 || k22.cmpn(-d22) > 0) {
        var m14 = k1.andln(3) + d1 & 3;
        var m24 = k22.andln(3) + d22 & 3;
        if (m14 === 3)
          m14 = -1;
        if (m24 === 3)
          m24 = -1;
        var u1;
        if ((m14 & 1) === 0) {
          u1 = 0;
        } else {
          m8 = k1.andln(7) + d1 & 7;
          if ((m8 === 3 || m8 === 5) && m24 === 2)
            u1 = -m14;
          else
            u1 = m14;
        }
        jsf[0].push(u1);
        var u22;
        if ((m24 & 1) === 0) {
          u22 = 0;
        } else {
          m8 = k22.andln(7) + d22 & 7;
          if ((m8 === 3 || m8 === 5) && m14 === 2)
            u22 = -m24;
          else
            u22 = m24;
        }
        jsf[1].push(u22);
        if (2 * d1 === u1 + 1)
          d1 = 1 - d1;
        if (2 * d22 === u22 + 1)
          d22 = 1 - d22;
        k1.iushrn(1);
        k22.iushrn(1);
      }
      return jsf;
    }
    utils.getJSF = getJSF;
    function cachedProperty(obj, name, computer) {
      var key = "_" + name;
      obj.prototype[name] = function cachedProperty2() {
        return this[key] !== void 0 ? this[key] : this[key] = computer.call(this);
      };
    }
    utils.cachedProperty = cachedProperty;
    function parseBytes(bytes) {
      return typeof bytes === "string" ? utils.toArray(bytes, "hex") : bytes;
    }
    utils.parseBytes = parseBytes;
    function intFromLE(bytes) {
      return new BN(bytes, "hex", "le");
    }
    utils.intFromLE = intFromLE;
  }
});

// node_modules/brorand/index.js
var require_brorand = __commonJS({
  "node_modules/brorand/index.js"(exports, module) {
    var r3;
    module.exports = function rand(len) {
      if (!r3)
        r3 = new Rand(null);
      return r3.generate(len);
    };
    function Rand(rand) {
      this.rand = rand;
    }
    module.exports.Rand = Rand;
    Rand.prototype.generate = function generate(len) {
      return this._rand(len);
    };
    Rand.prototype._rand = function _rand(n3) {
      if (this.rand.getBytes)
        return this.rand.getBytes(n3);
      var res = new Uint8Array(n3);
      for (var i3 = 0; i3 < res.length; i3++)
        res[i3] = this.rand.getByte();
      return res;
    };
    if (typeof self === "object") {
      if (self.crypto && self.crypto.getRandomValues) {
        Rand.prototype._rand = function _rand(n3) {
          var arr = new Uint8Array(n3);
          self.crypto.getRandomValues(arr);
          return arr;
        };
      } else if (self.msCrypto && self.msCrypto.getRandomValues) {
        Rand.prototype._rand = function _rand(n3) {
          var arr = new Uint8Array(n3);
          self.msCrypto.getRandomValues(arr);
          return arr;
        };
      } else if (typeof window === "object") {
        Rand.prototype._rand = function() {
          throw new Error("Not implemented yet");
        };
      }
    } else {
      try {
        crypto3 = require_crypto();
        if (typeof crypto3.randomBytes !== "function")
          throw new Error("Not supported");
        Rand.prototype._rand = function _rand(n3) {
          return crypto3.randomBytes(n3);
        };
      } catch (e) {
      }
    }
    var crypto3;
  }
});

// node_modules/elliptic/lib/elliptic/curve/base.js
var require_base = __commonJS({
  "node_modules/elliptic/lib/elliptic/curve/base.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var utils = require_utils2();
    var getNAF = utils.getNAF;
    var getJSF = utils.getJSF;
    var assert2 = utils.assert;
    function BaseCurve(type, conf) {
      this.type = type;
      this.p = new BN(conf.p, 16);
      this.red = conf.prime ? BN.red(conf.prime) : BN.mont(this.p);
      this.zero = new BN(0).toRed(this.red);
      this.one = new BN(1).toRed(this.red);
      this.two = new BN(2).toRed(this.red);
      this.n = conf.n && new BN(conf.n, 16);
      this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);
      this._wnafT1 = new Array(4);
      this._wnafT2 = new Array(4);
      this._wnafT3 = new Array(4);
      this._wnafT4 = new Array(4);
      this._bitLength = this.n ? this.n.bitLength() : 0;
      var adjustCount = this.n && this.p.div(this.n);
      if (!adjustCount || adjustCount.cmpn(100) > 0) {
        this.redN = null;
      } else {
        this._maxwellTrick = true;
        this.redN = this.n.toRed(this.red);
      }
    }
    module.exports = BaseCurve;
    BaseCurve.prototype.point = function point() {
      throw new Error("Not implemented");
    };
    BaseCurve.prototype.validate = function validate4() {
      throw new Error("Not implemented");
    };
    BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p4, k5) {
      assert2(p4.precomputed);
      var doubles = p4._getDoubles();
      var naf = getNAF(k5, 1, this._bitLength);
      var I3 = (1 << doubles.step + 1) - (doubles.step % 2 === 0 ? 2 : 1);
      I3 /= 3;
      var repr = [];
      var j5;
      var nafW;
      for (j5 = 0; j5 < naf.length; j5 += doubles.step) {
        nafW = 0;
        for (var l5 = j5 + doubles.step - 1; l5 >= j5; l5--)
          nafW = (nafW << 1) + naf[l5];
        repr.push(nafW);
      }
      var a3 = this.jpoint(null, null, null);
      var b3 = this.jpoint(null, null, null);
      for (var i3 = I3; i3 > 0; i3--) {
        for (j5 = 0; j5 < repr.length; j5++) {
          nafW = repr[j5];
          if (nafW === i3)
            b3 = b3.mixedAdd(doubles.points[j5]);
          else if (nafW === -i3)
            b3 = b3.mixedAdd(doubles.points[j5].neg());
        }
        a3 = a3.add(b3);
      }
      return a3.toP();
    };
    BaseCurve.prototype._wnafMul = function _wnafMul(p4, k5) {
      var w4 = 4;
      var nafPoints = p4._getNAFPoints(w4);
      w4 = nafPoints.wnd;
      var wnd = nafPoints.points;
      var naf = getNAF(k5, w4, this._bitLength);
      var acc = this.jpoint(null, null, null);
      for (var i3 = naf.length - 1; i3 >= 0; i3--) {
        for (var l5 = 0; i3 >= 0 && naf[i3] === 0; i3--)
          l5++;
        if (i3 >= 0)
          l5++;
        acc = acc.dblp(l5);
        if (i3 < 0)
          break;
        var z6 = naf[i3];
        assert2(z6 !== 0);
        if (p4.type === "affine") {
          if (z6 > 0)
            acc = acc.mixedAdd(wnd[z6 - 1 >> 1]);
          else
            acc = acc.mixedAdd(wnd[-z6 - 1 >> 1].neg());
        } else {
          if (z6 > 0)
            acc = acc.add(wnd[z6 - 1 >> 1]);
          else
            acc = acc.add(wnd[-z6 - 1 >> 1].neg());
        }
      }
      return p4.type === "affine" ? acc.toP() : acc;
    };
    BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW, points, coeffs, len, jacobianResult) {
      var wndWidth = this._wnafT1;
      var wnd = this._wnafT2;
      var naf = this._wnafT3;
      var max = 0;
      var i3;
      var j5;
      var p4;
      for (i3 = 0; i3 < len; i3++) {
        p4 = points[i3];
        var nafPoints = p4._getNAFPoints(defW);
        wndWidth[i3] = nafPoints.wnd;
        wnd[i3] = nafPoints.points;
      }
      for (i3 = len - 1; i3 >= 1; i3 -= 2) {
        var a3 = i3 - 1;
        var b3 = i3;
        if (wndWidth[a3] !== 1 || wndWidth[b3] !== 1) {
          naf[a3] = getNAF(coeffs[a3], wndWidth[a3], this._bitLength);
          naf[b3] = getNAF(coeffs[b3], wndWidth[b3], this._bitLength);
          max = Math.max(naf[a3].length, max);
          max = Math.max(naf[b3].length, max);
          continue;
        }
        var comb = [
          points[a3],
          /* 1 */
          null,
          /* 3 */
          null,
          /* 5 */
          points[b3]
          /* 7 */
        ];
        if (points[a3].y.cmp(points[b3].y) === 0) {
          comb[1] = points[a3].add(points[b3]);
          comb[2] = points[a3].toJ().mixedAdd(points[b3].neg());
        } else if (points[a3].y.cmp(points[b3].y.redNeg()) === 0) {
          comb[1] = points[a3].toJ().mixedAdd(points[b3]);
          comb[2] = points[a3].add(points[b3].neg());
        } else {
          comb[1] = points[a3].toJ().mixedAdd(points[b3]);
          comb[2] = points[a3].toJ().mixedAdd(points[b3].neg());
        }
        var index = [
          -3,
          /* -1 -1 */
          -1,
          /* -1 0 */
          -5,
          /* -1 1 */
          -7,
          /* 0 -1 */
          0,
          /* 0 0 */
          7,
          /* 0 1 */
          5,
          /* 1 -1 */
          1,
          /* 1 0 */
          3
          /* 1 1 */
        ];
        var jsf = getJSF(coeffs[a3], coeffs[b3]);
        max = Math.max(jsf[0].length, max);
        naf[a3] = new Array(max);
        naf[b3] = new Array(max);
        for (j5 = 0; j5 < max; j5++) {
          var ja2 = jsf[0][j5] | 0;
          var jb = jsf[1][j5] | 0;
          naf[a3][j5] = index[(ja2 + 1) * 3 + (jb + 1)];
          naf[b3][j5] = 0;
          wnd[a3] = comb;
        }
      }
      var acc = this.jpoint(null, null, null);
      var tmp = this._wnafT4;
      for (i3 = max; i3 >= 0; i3--) {
        var k5 = 0;
        while (i3 >= 0) {
          var zero = true;
          for (j5 = 0; j5 < len; j5++) {
            tmp[j5] = naf[j5][i3] | 0;
            if (tmp[j5] !== 0)
              zero = false;
          }
          if (!zero)
            break;
          k5++;
          i3--;
        }
        if (i3 >= 0)
          k5++;
        acc = acc.dblp(k5);
        if (i3 < 0)
          break;
        for (j5 = 0; j5 < len; j5++) {
          var z6 = tmp[j5];
          p4;
          if (z6 === 0)
            continue;
          else if (z6 > 0)
            p4 = wnd[j5][z6 - 1 >> 1];
          else if (z6 < 0)
            p4 = wnd[j5][-z6 - 1 >> 1].neg();
          if (p4.type === "affine")
            acc = acc.mixedAdd(p4);
          else
            acc = acc.add(p4);
        }
      }
      for (i3 = 0; i3 < len; i3++)
        wnd[i3] = null;
      if (jacobianResult)
        return acc;
      else
        return acc.toP();
    };
    function BasePoint(curve, type) {
      this.curve = curve;
      this.type = type;
      this.precomputed = null;
    }
    BaseCurve.BasePoint = BasePoint;
    BasePoint.prototype.eq = function eq() {
      throw new Error("Not implemented");
    };
    BasePoint.prototype.validate = function validate4() {
      return this.curve.validate(this);
    };
    BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
      bytes = utils.toArray(bytes, enc);
      var len = this.p.byteLength();
      if ((bytes[0] === 4 || bytes[0] === 6 || bytes[0] === 7) && bytes.length - 1 === 2 * len) {
        if (bytes[0] === 6)
          assert2(bytes[bytes.length - 1] % 2 === 0);
        else if (bytes[0] === 7)
          assert2(bytes[bytes.length - 1] % 2 === 1);
        var res = this.point(
          bytes.slice(1, 1 + len),
          bytes.slice(1 + len, 1 + 2 * len)
        );
        return res;
      } else if ((bytes[0] === 2 || bytes[0] === 3) && bytes.length - 1 === len) {
        return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 3);
      }
      throw new Error("Unknown point format");
    };
    BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
      return this.encode(enc, true);
    };
    BasePoint.prototype._encode = function _encode(compact) {
      var len = this.curve.p.byteLength();
      var x7 = this.getX().toArray("be", len);
      if (compact)
        return [this.getY().isEven() ? 2 : 3].concat(x7);
      return [4].concat(x7, this.getY().toArray("be", len));
    };
    BasePoint.prototype.encode = function encode4(enc, compact) {
      return utils.encode(this._encode(compact), enc);
    };
    BasePoint.prototype.precompute = function precompute(power) {
      if (this.precomputed)
        return this;
      var precomputed = {
        doubles: null,
        naf: null,
        beta: null
      };
      precomputed.naf = this._getNAFPoints(8);
      precomputed.doubles = this._getDoubles(4, power);
      precomputed.beta = this._getBeta();
      this.precomputed = precomputed;
      return this;
    };
    BasePoint.prototype._hasDoubles = function _hasDoubles(k5) {
      if (!this.precomputed)
        return false;
      var doubles = this.precomputed.doubles;
      if (!doubles)
        return false;
      return doubles.points.length >= Math.ceil((k5.bitLength() + 1) / doubles.step);
    };
    BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
      if (this.precomputed && this.precomputed.doubles)
        return this.precomputed.doubles;
      var doubles = [this];
      var acc = this;
      for (var i3 = 0; i3 < power; i3 += step) {
        for (var j5 = 0; j5 < step; j5++)
          acc = acc.dbl();
        doubles.push(acc);
      }
      return {
        step,
        points: doubles
      };
    };
    BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
      if (this.precomputed && this.precomputed.naf)
        return this.precomputed.naf;
      var res = [this];
      var max = (1 << wnd) - 1;
      var dbl = max === 1 ? null : this.dbl();
      for (var i3 = 1; i3 < max; i3++)
        res[i3] = res[i3 - 1].add(dbl);
      return {
        wnd,
        points: res
      };
    };
    BasePoint.prototype._getBeta = function _getBeta() {
      return null;
    };
    BasePoint.prototype.dblp = function dblp(k5) {
      var r3 = this;
      for (var i3 = 0; i3 < k5; i3++)
        r3 = r3.dbl();
      return r3;
    };
  }
});

// node_modules/elliptic/lib/elliptic/curve/short.js
var require_short = __commonJS({
  "node_modules/elliptic/lib/elliptic/curve/short.js"(exports, module) {
    "use strict";
    var utils = require_utils2();
    var BN = require_bn();
    var inherits = require_inherits_browser();
    var Base = require_base();
    var assert2 = utils.assert;
    function ShortCurve(conf) {
      Base.call(this, "short", conf);
      this.a = new BN(conf.a, 16).toRed(this.red);
      this.b = new BN(conf.b, 16).toRed(this.red);
      this.tinv = this.two.redInvm();
      this.zeroA = this.a.fromRed().cmpn(0) === 0;
      this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;
      this.endo = this._getEndomorphism(conf);
      this._endoWnafT1 = new Array(4);
      this._endoWnafT2 = new Array(4);
    }
    inherits(ShortCurve, Base);
    module.exports = ShortCurve;
    ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
      if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
        return;
      var beta;
      var lambda;
      if (conf.beta) {
        beta = new BN(conf.beta, 16).toRed(this.red);
      } else {
        var betas = this._getEndoRoots(this.p);
        beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
        beta = beta.toRed(this.red);
      }
      if (conf.lambda) {
        lambda = new BN(conf.lambda, 16);
      } else {
        var lambdas = this._getEndoRoots(this.n);
        if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
          lambda = lambdas[0];
        } else {
          lambda = lambdas[1];
          assert2(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
        }
      }
      var basis;
      if (conf.basis) {
        basis = conf.basis.map(function(vec) {
          return {
            a: new BN(vec.a, 16),
            b: new BN(vec.b, 16)
          };
        });
      } else {
        basis = this._getEndoBasis(lambda);
      }
      return {
        beta,
        lambda,
        basis
      };
    };
    ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
      var red = num === this.p ? this.red : BN.mont(num);
      var tinv = new BN(2).toRed(red).redInvm();
      var ntinv = tinv.redNeg();
      var s2 = new BN(3).toRed(red).redNeg().redSqrt().redMul(tinv);
      var l1 = ntinv.redAdd(s2).fromRed();
      var l22 = ntinv.redSub(s2).fromRed();
      return [l1, l22];
    };
    ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
      var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));
      var u3 = lambda;
      var v6 = this.n.clone();
      var x1 = new BN(1);
      var y1 = new BN(0);
      var x22 = new BN(0);
      var y22 = new BN(1);
      var a0;
      var b0;
      var a1;
      var b1;
      var a22;
      var b22;
      var prevR;
      var i3 = 0;
      var r3;
      var x7;
      while (u3.cmpn(0) !== 0) {
        var q5 = v6.div(u3);
        r3 = v6.sub(q5.mul(u3));
        x7 = x22.sub(q5.mul(x1));
        var y6 = y22.sub(q5.mul(y1));
        if (!a1 && r3.cmp(aprxSqrt) < 0) {
          a0 = prevR.neg();
          b0 = x1;
          a1 = r3.neg();
          b1 = x7;
        } else if (a1 && ++i3 === 2) {
          break;
        }
        prevR = r3;
        v6 = u3;
        u3 = r3;
        x22 = x1;
        x1 = x7;
        y22 = y1;
        y1 = y6;
      }
      a22 = r3.neg();
      b22 = x7;
      var len1 = a1.sqr().add(b1.sqr());
      var len2 = a22.sqr().add(b22.sqr());
      if (len2.cmp(len1) >= 0) {
        a22 = a0;
        b22 = b0;
      }
      if (a1.negative) {
        a1 = a1.neg();
        b1 = b1.neg();
      }
      if (a22.negative) {
        a22 = a22.neg();
        b22 = b22.neg();
      }
      return [
        { a: a1, b: b1 },
        { a: a22, b: b22 }
      ];
    };
    ShortCurve.prototype._endoSplit = function _endoSplit(k5) {
      var basis = this.endo.basis;
      var v1 = basis[0];
      var v22 = basis[1];
      var c1 = v22.b.mul(k5).divRound(this.n);
      var c22 = v1.b.neg().mul(k5).divRound(this.n);
      var p1 = c1.mul(v1.a);
      var p22 = c22.mul(v22.a);
      var q1 = c1.mul(v1.b);
      var q22 = c22.mul(v22.b);
      var k1 = k5.sub(p1).sub(p22);
      var k22 = q1.add(q22).neg();
      return { k1, k2: k22 };
    };
    ShortCurve.prototype.pointFromX = function pointFromX(x7, odd) {
      x7 = new BN(x7, 16);
      if (!x7.red)
        x7 = x7.toRed(this.red);
      var y22 = x7.redSqr().redMul(x7).redIAdd(x7.redMul(this.a)).redIAdd(this.b);
      var y6 = y22.redSqrt();
      if (y6.redSqr().redSub(y22).cmp(this.zero) !== 0)
        throw new Error("invalid point");
      var isOdd = y6.fromRed().isOdd();
      if (odd && !isOdd || !odd && isOdd)
        y6 = y6.redNeg();
      return this.point(x7, y6);
    };
    ShortCurve.prototype.validate = function validate4(point) {
      if (point.inf)
        return true;
      var x7 = point.x;
      var y6 = point.y;
      var ax = this.a.redMul(x7);
      var rhs = x7.redSqr().redMul(x7).redIAdd(ax).redIAdd(this.b);
      return y6.redSqr().redISub(rhs).cmpn(0) === 0;
    };
    ShortCurve.prototype._endoWnafMulAdd = function _endoWnafMulAdd(points, coeffs, jacobianResult) {
      var npoints = this._endoWnafT1;
      var ncoeffs = this._endoWnafT2;
      for (var i3 = 0; i3 < points.length; i3++) {
        var split2 = this._endoSplit(coeffs[i3]);
        var p4 = points[i3];
        var beta = p4._getBeta();
        if (split2.k1.negative) {
          split2.k1.ineg();
          p4 = p4.neg(true);
        }
        if (split2.k2.negative) {
          split2.k2.ineg();
          beta = beta.neg(true);
        }
        npoints[i3 * 2] = p4;
        npoints[i3 * 2 + 1] = beta;
        ncoeffs[i3 * 2] = split2.k1;
        ncoeffs[i3 * 2 + 1] = split2.k2;
      }
      var res = this._wnafMulAdd(1, npoints, ncoeffs, i3 * 2, jacobianResult);
      for (var j5 = 0; j5 < i3 * 2; j5++) {
        npoints[j5] = null;
        ncoeffs[j5] = null;
      }
      return res;
    };
    function Point(curve, x7, y6, isRed) {
      Base.BasePoint.call(this, curve, "affine");
      if (x7 === null && y6 === null) {
        this.x = null;
        this.y = null;
        this.inf = true;
      } else {
        this.x = new BN(x7, 16);
        this.y = new BN(y6, 16);
        if (isRed) {
          this.x.forceRed(this.curve.red);
          this.y.forceRed(this.curve.red);
        }
        if (!this.x.red)
          this.x = this.x.toRed(this.curve.red);
        if (!this.y.red)
          this.y = this.y.toRed(this.curve.red);
        this.inf = false;
      }
    }
    inherits(Point, Base.BasePoint);
    ShortCurve.prototype.point = function point(x7, y6, isRed) {
      return new Point(this, x7, y6, isRed);
    };
    ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
      return Point.fromJSON(this, obj, red);
    };
    Point.prototype._getBeta = function _getBeta() {
      if (!this.curve.endo)
        return;
      var pre = this.precomputed;
      if (pre && pre.beta)
        return pre.beta;
      var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
      if (pre) {
        var curve = this.curve;
        var endoMul = function(p4) {
          return curve.point(p4.x.redMul(curve.endo.beta), p4.y);
        };
        pre.beta = beta;
        beta.precomputed = {
          beta: null,
          naf: pre.naf && {
            wnd: pre.naf.wnd,
            points: pre.naf.points.map(endoMul)
          },
          doubles: pre.doubles && {
            step: pre.doubles.step,
            points: pre.doubles.points.map(endoMul)
          }
        };
      }
      return beta;
    };
    Point.prototype.toJSON = function toJSON() {
      if (!this.precomputed)
        return [this.x, this.y];
      return [this.x, this.y, this.precomputed && {
        doubles: this.precomputed.doubles && {
          step: this.precomputed.doubles.step,
          points: this.precomputed.doubles.points.slice(1)
        },
        naf: this.precomputed.naf && {
          wnd: this.precomputed.naf.wnd,
          points: this.precomputed.naf.points.slice(1)
        }
      }];
    };
    Point.fromJSON = function fromJSON(curve, obj, red) {
      if (typeof obj === "string")
        obj = JSON.parse(obj);
      var res = curve.point(obj[0], obj[1], red);
      if (!obj[2])
        return res;
      function obj2point(obj2) {
        return curve.point(obj2[0], obj2[1], red);
      }
      var pre = obj[2];
      res.precomputed = {
        beta: null,
        doubles: pre.doubles && {
          step: pre.doubles.step,
          points: [res].concat(pre.doubles.points.map(obj2point))
        },
        naf: pre.naf && {
          wnd: pre.naf.wnd,
          points: [res].concat(pre.naf.points.map(obj2point))
        }
      };
      return res;
    };
    Point.prototype.inspect = function inspect() {
      if (this.isInfinity())
        return "<EC Point Infinity>";
      return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
    };
    Point.prototype.isInfinity = function isInfinity() {
      return this.inf;
    };
    Point.prototype.add = function add(p4) {
      if (this.inf)
        return p4;
      if (p4.inf)
        return this;
      if (this.eq(p4))
        return this.dbl();
      if (this.neg().eq(p4))
        return this.curve.point(null, null);
      if (this.x.cmp(p4.x) === 0)
        return this.curve.point(null, null);
      var c5 = this.y.redSub(p4.y);
      if (c5.cmpn(0) !== 0)
        c5 = c5.redMul(this.x.redSub(p4.x).redInvm());
      var nx = c5.redSqr().redISub(this.x).redISub(p4.x);
      var ny = c5.redMul(this.x.redSub(nx)).redISub(this.y);
      return this.curve.point(nx, ny);
    };
    Point.prototype.dbl = function dbl() {
      if (this.inf)
        return this;
      var ys1 = this.y.redAdd(this.y);
      if (ys1.cmpn(0) === 0)
        return this.curve.point(null, null);
      var a3 = this.curve.a;
      var x22 = this.x.redSqr();
      var dyinv = ys1.redInvm();
      var c5 = x22.redAdd(x22).redIAdd(x22).redIAdd(a3).redMul(dyinv);
      var nx = c5.redSqr().redISub(this.x.redAdd(this.x));
      var ny = c5.redMul(this.x.redSub(nx)).redISub(this.y);
      return this.curve.point(nx, ny);
    };
    Point.prototype.getX = function getX() {
      return this.x.fromRed();
    };
    Point.prototype.getY = function getY() {
      return this.y.fromRed();
    };
    Point.prototype.mul = function mul(k5) {
      k5 = new BN(k5, 16);
      if (this.isInfinity())
        return this;
      else if (this._hasDoubles(k5))
        return this.curve._fixedNafMul(this, k5);
      else if (this.curve.endo)
        return this.curve._endoWnafMulAdd([this], [k5]);
      else
        return this.curve._wnafMul(this, k5);
    };
    Point.prototype.mulAdd = function mulAdd(k1, p22, k22) {
      var points = [this, p22];
      var coeffs = [k1, k22];
      if (this.curve.endo)
        return this.curve._endoWnafMulAdd(points, coeffs);
      else
        return this.curve._wnafMulAdd(1, points, coeffs, 2);
    };
    Point.prototype.jmulAdd = function jmulAdd(k1, p22, k22) {
      var points = [this, p22];
      var coeffs = [k1, k22];
      if (this.curve.endo)
        return this.curve._endoWnafMulAdd(points, coeffs, true);
      else
        return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
    };
    Point.prototype.eq = function eq(p4) {
      return this === p4 || this.inf === p4.inf && (this.inf || this.x.cmp(p4.x) === 0 && this.y.cmp(p4.y) === 0);
    };
    Point.prototype.neg = function neg(_precompute) {
      if (this.inf)
        return this;
      var res = this.curve.point(this.x, this.y.redNeg());
      if (_precompute && this.precomputed) {
        var pre = this.precomputed;
        var negate = function(p4) {
          return p4.neg();
        };
        res.precomputed = {
          naf: pre.naf && {
            wnd: pre.naf.wnd,
            points: pre.naf.points.map(negate)
          },
          doubles: pre.doubles && {
            step: pre.doubles.step,
            points: pre.doubles.points.map(negate)
          }
        };
      }
      return res;
    };
    Point.prototype.toJ = function toJ() {
      if (this.inf)
        return this.curve.jpoint(null, null, null);
      var res = this.curve.jpoint(this.x, this.y, this.curve.one);
      return res;
    };
    function JPoint(curve, x7, y6, z6) {
      Base.BasePoint.call(this, curve, "jacobian");
      if (x7 === null && y6 === null && z6 === null) {
        this.x = this.curve.one;
        this.y = this.curve.one;
        this.z = new BN(0);
      } else {
        this.x = new BN(x7, 16);
        this.y = new BN(y6, 16);
        this.z = new BN(z6, 16);
      }
      if (!this.x.red)
        this.x = this.x.toRed(this.curve.red);
      if (!this.y.red)
        this.y = this.y.toRed(this.curve.red);
      if (!this.z.red)
        this.z = this.z.toRed(this.curve.red);
      this.zOne = this.z === this.curve.one;
    }
    inherits(JPoint, Base.BasePoint);
    ShortCurve.prototype.jpoint = function jpoint(x7, y6, z6) {
      return new JPoint(this, x7, y6, z6);
    };
    JPoint.prototype.toP = function toP() {
      if (this.isInfinity())
        return this.curve.point(null, null);
      var zinv = this.z.redInvm();
      var zinv2 = zinv.redSqr();
      var ax = this.x.redMul(zinv2);
      var ay = this.y.redMul(zinv2).redMul(zinv);
      return this.curve.point(ax, ay);
    };
    JPoint.prototype.neg = function neg() {
      return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
    };
    JPoint.prototype.add = function add(p4) {
      if (this.isInfinity())
        return p4;
      if (p4.isInfinity())
        return this;
      var pz2 = p4.z.redSqr();
      var z22 = this.z.redSqr();
      var u1 = this.x.redMul(pz2);
      var u22 = p4.x.redMul(z22);
      var s1 = this.y.redMul(pz2.redMul(p4.z));
      var s2 = p4.y.redMul(z22.redMul(this.z));
      var h5 = u1.redSub(u22);
      var r3 = s1.redSub(s2);
      if (h5.cmpn(0) === 0) {
        if (r3.cmpn(0) !== 0)
          return this.curve.jpoint(null, null, null);
        else
          return this.dbl();
      }
      var h22 = h5.redSqr();
      var h32 = h22.redMul(h5);
      var v6 = u1.redMul(h22);
      var nx = r3.redSqr().redIAdd(h32).redISub(v6).redISub(v6);
      var ny = r3.redMul(v6.redISub(nx)).redISub(s1.redMul(h32));
      var nz = this.z.redMul(p4.z).redMul(h5);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.mixedAdd = function mixedAdd(p4) {
      if (this.isInfinity())
        return p4.toJ();
      if (p4.isInfinity())
        return this;
      var z22 = this.z.redSqr();
      var u1 = this.x;
      var u22 = p4.x.redMul(z22);
      var s1 = this.y;
      var s2 = p4.y.redMul(z22).redMul(this.z);
      var h5 = u1.redSub(u22);
      var r3 = s1.redSub(s2);
      if (h5.cmpn(0) === 0) {
        if (r3.cmpn(0) !== 0)
          return this.curve.jpoint(null, null, null);
        else
          return this.dbl();
      }
      var h22 = h5.redSqr();
      var h32 = h22.redMul(h5);
      var v6 = u1.redMul(h22);
      var nx = r3.redSqr().redIAdd(h32).redISub(v6).redISub(v6);
      var ny = r3.redMul(v6.redISub(nx)).redISub(s1.redMul(h32));
      var nz = this.z.redMul(h5);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.dblp = function dblp(pow) {
      if (pow === 0)
        return this;
      if (this.isInfinity())
        return this;
      if (!pow)
        return this.dbl();
      var i3;
      if (this.curve.zeroA || this.curve.threeA) {
        var r3 = this;
        for (i3 = 0; i3 < pow; i3++)
          r3 = r3.dbl();
        return r3;
      }
      var a3 = this.curve.a;
      var tinv = this.curve.tinv;
      var jx = this.x;
      var jy = this.y;
      var jz = this.z;
      var jz4 = jz.redSqr().redSqr();
      var jyd = jy.redAdd(jy);
      for (i3 = 0; i3 < pow; i3++) {
        var jx2 = jx.redSqr();
        var jyd2 = jyd.redSqr();
        var jyd4 = jyd2.redSqr();
        var c5 = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a3.redMul(jz4));
        var t1 = jx.redMul(jyd2);
        var nx = c5.redSqr().redISub(t1.redAdd(t1));
        var t2 = t1.redISub(nx);
        var dny = c5.redMul(t2);
        dny = dny.redIAdd(dny).redISub(jyd4);
        var nz = jyd.redMul(jz);
        if (i3 + 1 < pow)
          jz4 = jz4.redMul(jyd4);
        jx = nx;
        jz = nz;
        jyd = dny;
      }
      return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
    };
    JPoint.prototype.dbl = function dbl() {
      if (this.isInfinity())
        return this;
      if (this.curve.zeroA)
        return this._zeroDbl();
      else if (this.curve.threeA)
        return this._threeDbl();
      else
        return this._dbl();
    };
    JPoint.prototype._zeroDbl = function _zeroDbl() {
      var nx;
      var ny;
      var nz;
      if (this.zOne) {
        var xx = this.x.redSqr();
        var yy = this.y.redSqr();
        var yyyy = yy.redSqr();
        var s2 = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
        s2 = s2.redIAdd(s2);
        var m3 = xx.redAdd(xx).redIAdd(xx);
        var t = m3.redSqr().redISub(s2).redISub(s2);
        var yyyy8 = yyyy.redIAdd(yyyy);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        nx = t;
        ny = m3.redMul(s2.redISub(t)).redISub(yyyy8);
        nz = this.y.redAdd(this.y);
      } else {
        var a3 = this.x.redSqr();
        var b3 = this.y.redSqr();
        var c5 = b3.redSqr();
        var d4 = this.x.redAdd(b3).redSqr().redISub(a3).redISub(c5);
        d4 = d4.redIAdd(d4);
        var e = a3.redAdd(a3).redIAdd(a3);
        var f8 = e.redSqr();
        var c8 = c5.redIAdd(c5);
        c8 = c8.redIAdd(c8);
        c8 = c8.redIAdd(c8);
        nx = f8.redISub(d4).redISub(d4);
        ny = e.redMul(d4.redISub(nx)).redISub(c8);
        nz = this.y.redMul(this.z);
        nz = nz.redIAdd(nz);
      }
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype._threeDbl = function _threeDbl() {
      var nx;
      var ny;
      var nz;
      if (this.zOne) {
        var xx = this.x.redSqr();
        var yy = this.y.redSqr();
        var yyyy = yy.redSqr();
        var s2 = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
        s2 = s2.redIAdd(s2);
        var m3 = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
        var t = m3.redSqr().redISub(s2).redISub(s2);
        nx = t;
        var yyyy8 = yyyy.redIAdd(yyyy);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        yyyy8 = yyyy8.redIAdd(yyyy8);
        ny = m3.redMul(s2.redISub(t)).redISub(yyyy8);
        nz = this.y.redAdd(this.y);
      } else {
        var delta = this.z.redSqr();
        var gamma = this.y.redSqr();
        var beta = this.x.redMul(gamma);
        var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
        alpha = alpha.redAdd(alpha).redIAdd(alpha);
        var beta4 = beta.redIAdd(beta);
        beta4 = beta4.redIAdd(beta4);
        var beta8 = beta4.redAdd(beta4);
        nx = alpha.redSqr().redISub(beta8);
        nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
        var ggamma8 = gamma.redSqr();
        ggamma8 = ggamma8.redIAdd(ggamma8);
        ggamma8 = ggamma8.redIAdd(ggamma8);
        ggamma8 = ggamma8.redIAdd(ggamma8);
        ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
      }
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype._dbl = function _dbl() {
      var a3 = this.curve.a;
      var jx = this.x;
      var jy = this.y;
      var jz = this.z;
      var jz4 = jz.redSqr().redSqr();
      var jx2 = jx.redSqr();
      var jy2 = jy.redSqr();
      var c5 = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a3.redMul(jz4));
      var jxd4 = jx.redAdd(jx);
      jxd4 = jxd4.redIAdd(jxd4);
      var t1 = jxd4.redMul(jy2);
      var nx = c5.redSqr().redISub(t1.redAdd(t1));
      var t2 = t1.redISub(nx);
      var jyd8 = jy2.redSqr();
      jyd8 = jyd8.redIAdd(jyd8);
      jyd8 = jyd8.redIAdd(jyd8);
      jyd8 = jyd8.redIAdd(jyd8);
      var ny = c5.redMul(t2).redISub(jyd8);
      var nz = jy.redAdd(jy).redMul(jz);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.trpl = function trpl() {
      if (!this.curve.zeroA)
        return this.dbl().add(this);
      var xx = this.x.redSqr();
      var yy = this.y.redSqr();
      var zz = this.z.redSqr();
      var yyyy = yy.redSqr();
      var m3 = xx.redAdd(xx).redIAdd(xx);
      var mm = m3.redSqr();
      var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
      e = e.redIAdd(e);
      e = e.redAdd(e).redIAdd(e);
      e = e.redISub(mm);
      var ee3 = e.redSqr();
      var t = yyyy.redIAdd(yyyy);
      t = t.redIAdd(t);
      t = t.redIAdd(t);
      t = t.redIAdd(t);
      var u3 = m3.redIAdd(e).redSqr().redISub(mm).redISub(ee3).redISub(t);
      var yyu4 = yy.redMul(u3);
      yyu4 = yyu4.redIAdd(yyu4);
      yyu4 = yyu4.redIAdd(yyu4);
      var nx = this.x.redMul(ee3).redISub(yyu4);
      nx = nx.redIAdd(nx);
      nx = nx.redIAdd(nx);
      var ny = this.y.redMul(u3.redMul(t.redISub(u3)).redISub(e.redMul(ee3)));
      ny = ny.redIAdd(ny);
      ny = ny.redIAdd(ny);
      ny = ny.redIAdd(ny);
      var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee3);
      return this.curve.jpoint(nx, ny, nz);
    };
    JPoint.prototype.mul = function mul(k5, kbase) {
      k5 = new BN(k5, kbase);
      return this.curve._wnafMul(this, k5);
    };
    JPoint.prototype.eq = function eq(p4) {
      if (p4.type === "affine")
        return this.eq(p4.toJ());
      if (this === p4)
        return true;
      var z22 = this.z.redSqr();
      var pz2 = p4.z.redSqr();
      if (this.x.redMul(pz2).redISub(p4.x.redMul(z22)).cmpn(0) !== 0)
        return false;
      var z32 = z22.redMul(this.z);
      var pz3 = pz2.redMul(p4.z);
      return this.y.redMul(pz3).redISub(p4.y.redMul(z32)).cmpn(0) === 0;
    };
    JPoint.prototype.eqXToP = function eqXToP(x7) {
      var zs3 = this.z.redSqr();
      var rx = x7.toRed(this.curve.red).redMul(zs3);
      if (this.x.cmp(rx) === 0)
        return true;
      var xc2 = x7.clone();
      var t = this.curve.redN.redMul(zs3);
      for (; ; ) {
        xc2.iadd(this.curve.n);
        if (xc2.cmp(this.curve.p) >= 0)
          return false;
        rx.redIAdd(t);
        if (this.x.cmp(rx) === 0)
          return true;
      }
    };
    JPoint.prototype.inspect = function inspect() {
      if (this.isInfinity())
        return "<EC JPoint Infinity>";
      return "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
    };
    JPoint.prototype.isInfinity = function isInfinity() {
      return this.z.cmpn(0) === 0;
    };
  }
});

// node_modules/elliptic/lib/elliptic/curve/mont.js
var require_mont = __commonJS({
  "node_modules/elliptic/lib/elliptic/curve/mont.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var inherits = require_inherits_browser();
    var Base = require_base();
    var utils = require_utils2();
    function MontCurve(conf) {
      Base.call(this, "mont", conf);
      this.a = new BN(conf.a, 16).toRed(this.red);
      this.b = new BN(conf.b, 16).toRed(this.red);
      this.i4 = new BN(4).toRed(this.red).redInvm();
      this.two = new BN(2).toRed(this.red);
      this.a24 = this.i4.redMul(this.a.redAdd(this.two));
    }
    inherits(MontCurve, Base);
    module.exports = MontCurve;
    MontCurve.prototype.validate = function validate4(point) {
      var x7 = point.normalize().x;
      var x22 = x7.redSqr();
      var rhs = x22.redMul(x7).redAdd(x22.redMul(this.a)).redAdd(x7);
      var y6 = rhs.redSqrt();
      return y6.redSqr().cmp(rhs) === 0;
    };
    function Point(curve, x7, z6) {
      Base.BasePoint.call(this, curve, "projective");
      if (x7 === null && z6 === null) {
        this.x = this.curve.one;
        this.z = this.curve.zero;
      } else {
        this.x = new BN(x7, 16);
        this.z = new BN(z6, 16);
        if (!this.x.red)
          this.x = this.x.toRed(this.curve.red);
        if (!this.z.red)
          this.z = this.z.toRed(this.curve.red);
      }
    }
    inherits(Point, Base.BasePoint);
    MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
      return this.point(utils.toArray(bytes, enc), 1);
    };
    MontCurve.prototype.point = function point(x7, z6) {
      return new Point(this, x7, z6);
    };
    MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
      return Point.fromJSON(this, obj);
    };
    Point.prototype.precompute = function precompute() {
    };
    Point.prototype._encode = function _encode() {
      return this.getX().toArray("be", this.curve.p.byteLength());
    };
    Point.fromJSON = function fromJSON(curve, obj) {
      return new Point(curve, obj[0], obj[1] || curve.one);
    };
    Point.prototype.inspect = function inspect() {
      if (this.isInfinity())
        return "<EC Point Infinity>";
      return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
    };
    Point.prototype.isInfinity = function isInfinity() {
      return this.z.cmpn(0) === 0;
    };
    Point.prototype.dbl = function dbl() {
      var a3 = this.x.redAdd(this.z);
      var aa2 = a3.redSqr();
      var b3 = this.x.redSub(this.z);
      var bb = b3.redSqr();
      var c5 = aa2.redSub(bb);
      var nx = aa2.redMul(bb);
      var nz = c5.redMul(bb.redAdd(this.curve.a24.redMul(c5)));
      return this.curve.point(nx, nz);
    };
    Point.prototype.add = function add() {
      throw new Error("Not supported on Montgomery curve");
    };
    Point.prototype.diffAdd = function diffAdd(p4, diff) {
      var a3 = this.x.redAdd(this.z);
      var b3 = this.x.redSub(this.z);
      var c5 = p4.x.redAdd(p4.z);
      var d4 = p4.x.redSub(p4.z);
      var da2 = d4.redMul(a3);
      var cb = c5.redMul(b3);
      var nx = diff.z.redMul(da2.redAdd(cb).redSqr());
      var nz = diff.x.redMul(da2.redISub(cb).redSqr());
      return this.curve.point(nx, nz);
    };
    Point.prototype.mul = function mul(k5) {
      var t = k5.clone();
      var a3 = this;
      var b3 = this.curve.point(null, null);
      var c5 = this;
      for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
        bits.push(t.andln(1));
      for (var i3 = bits.length - 1; i3 >= 0; i3--) {
        if (bits[i3] === 0) {
          a3 = a3.diffAdd(b3, c5);
          b3 = b3.dbl();
        } else {
          b3 = a3.diffAdd(b3, c5);
          a3 = a3.dbl();
        }
      }
      return b3;
    };
    Point.prototype.mulAdd = function mulAdd() {
      throw new Error("Not supported on Montgomery curve");
    };
    Point.prototype.jumlAdd = function jumlAdd() {
      throw new Error("Not supported on Montgomery curve");
    };
    Point.prototype.eq = function eq(other) {
      return this.getX().cmp(other.getX()) === 0;
    };
    Point.prototype.normalize = function normalize() {
      this.x = this.x.redMul(this.z.redInvm());
      this.z = this.curve.one;
      return this;
    };
    Point.prototype.getX = function getX() {
      this.normalize();
      return this.x.fromRed();
    };
  }
});

// node_modules/elliptic/lib/elliptic/curve/edwards.js
var require_edwards = __commonJS({
  "node_modules/elliptic/lib/elliptic/curve/edwards.js"(exports, module) {
    "use strict";
    var utils = require_utils2();
    var BN = require_bn();
    var inherits = require_inherits_browser();
    var Base = require_base();
    var assert2 = utils.assert;
    function EdwardsCurve(conf) {
      this.twisted = (conf.a | 0) !== 1;
      this.mOneA = this.twisted && (conf.a | 0) === -1;
      this.extended = this.mOneA;
      Base.call(this, "edwards", conf);
      this.a = new BN(conf.a, 16).umod(this.red.m);
      this.a = this.a.toRed(this.red);
      this.c = new BN(conf.c, 16).toRed(this.red);
      this.c2 = this.c.redSqr();
      this.d = new BN(conf.d, 16).toRed(this.red);
      this.dd = this.d.redAdd(this.d);
      assert2(!this.twisted || this.c.fromRed().cmpn(1) === 0);
      this.oneC = (conf.c | 0) === 1;
    }
    inherits(EdwardsCurve, Base);
    module.exports = EdwardsCurve;
    EdwardsCurve.prototype._mulA = function _mulA(num) {
      if (this.mOneA)
        return num.redNeg();
      else
        return this.a.redMul(num);
    };
    EdwardsCurve.prototype._mulC = function _mulC(num) {
      if (this.oneC)
        return num;
      else
        return this.c.redMul(num);
    };
    EdwardsCurve.prototype.jpoint = function jpoint(x7, y6, z6, t) {
      return this.point(x7, y6, z6, t);
    };
    EdwardsCurve.prototype.pointFromX = function pointFromX(x7, odd) {
      x7 = new BN(x7, 16);
      if (!x7.red)
        x7 = x7.toRed(this.red);
      var x22 = x7.redSqr();
      var rhs = this.c2.redSub(this.a.redMul(x22));
      var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x22));
      var y22 = rhs.redMul(lhs.redInvm());
      var y6 = y22.redSqrt();
      if (y6.redSqr().redSub(y22).cmp(this.zero) !== 0)
        throw new Error("invalid point");
      var isOdd = y6.fromRed().isOdd();
      if (odd && !isOdd || !odd && isOdd)
        y6 = y6.redNeg();
      return this.point(x7, y6);
    };
    EdwardsCurve.prototype.pointFromY = function pointFromY(y6, odd) {
      y6 = new BN(y6, 16);
      if (!y6.red)
        y6 = y6.toRed(this.red);
      var y22 = y6.redSqr();
      var lhs = y22.redSub(this.c2);
      var rhs = y22.redMul(this.d).redMul(this.c2).redSub(this.a);
      var x22 = lhs.redMul(rhs.redInvm());
      if (x22.cmp(this.zero) === 0) {
        if (odd)
          throw new Error("invalid point");
        else
          return this.point(this.zero, y6);
      }
      var x7 = x22.redSqrt();
      if (x7.redSqr().redSub(x22).cmp(this.zero) !== 0)
        throw new Error("invalid point");
      if (x7.fromRed().isOdd() !== odd)
        x7 = x7.redNeg();
      return this.point(x7, y6);
    };
    EdwardsCurve.prototype.validate = function validate4(point) {
      if (point.isInfinity())
        return true;
      point.normalize();
      var x22 = point.x.redSqr();
      var y22 = point.y.redSqr();
      var lhs = x22.redMul(this.a).redAdd(y22);
      var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x22).redMul(y22)));
      return lhs.cmp(rhs) === 0;
    };
    function Point(curve, x7, y6, z6, t) {
      Base.BasePoint.call(this, curve, "projective");
      if (x7 === null && y6 === null && z6 === null) {
        this.x = this.curve.zero;
        this.y = this.curve.one;
        this.z = this.curve.one;
        this.t = this.curve.zero;
        this.zOne = true;
      } else {
        this.x = new BN(x7, 16);
        this.y = new BN(y6, 16);
        this.z = z6 ? new BN(z6, 16) : this.curve.one;
        this.t = t && new BN(t, 16);
        if (!this.x.red)
          this.x = this.x.toRed(this.curve.red);
        if (!this.y.red)
          this.y = this.y.toRed(this.curve.red);
        if (!this.z.red)
          this.z = this.z.toRed(this.curve.red);
        if (this.t && !this.t.red)
          this.t = this.t.toRed(this.curve.red);
        this.zOne = this.z === this.curve.one;
        if (this.curve.extended && !this.t) {
          this.t = this.x.redMul(this.y);
          if (!this.zOne)
            this.t = this.t.redMul(this.z.redInvm());
        }
      }
    }
    inherits(Point, Base.BasePoint);
    EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
      return Point.fromJSON(this, obj);
    };
    EdwardsCurve.prototype.point = function point(x7, y6, z6, t) {
      return new Point(this, x7, y6, z6, t);
    };
    Point.fromJSON = function fromJSON(curve, obj) {
      return new Point(curve, obj[0], obj[1], obj[2]);
    };
    Point.prototype.inspect = function inspect() {
      if (this.isInfinity())
        return "<EC Point Infinity>";
      return "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
    };
    Point.prototype.isInfinity = function isInfinity() {
      return this.x.cmpn(0) === 0 && (this.y.cmp(this.z) === 0 || this.zOne && this.y.cmp(this.curve.c) === 0);
    };
    Point.prototype._extDbl = function _extDbl() {
      var a3 = this.x.redSqr();
      var b3 = this.y.redSqr();
      var c5 = this.z.redSqr();
      c5 = c5.redIAdd(c5);
      var d4 = this.curve._mulA(a3);
      var e = this.x.redAdd(this.y).redSqr().redISub(a3).redISub(b3);
      var g4 = d4.redAdd(b3);
      var f8 = g4.redSub(c5);
      var h5 = d4.redSub(b3);
      var nx = e.redMul(f8);
      var ny = g4.redMul(h5);
      var nt2 = e.redMul(h5);
      var nz = f8.redMul(g4);
      return this.curve.point(nx, ny, nz, nt2);
    };
    Point.prototype._projDbl = function _projDbl() {
      var b3 = this.x.redAdd(this.y).redSqr();
      var c5 = this.x.redSqr();
      var d4 = this.y.redSqr();
      var nx;
      var ny;
      var nz;
      var e;
      var h5;
      var j5;
      if (this.curve.twisted) {
        e = this.curve._mulA(c5);
        var f8 = e.redAdd(d4);
        if (this.zOne) {
          nx = b3.redSub(c5).redSub(d4).redMul(f8.redSub(this.curve.two));
          ny = f8.redMul(e.redSub(d4));
          nz = f8.redSqr().redSub(f8).redSub(f8);
        } else {
          h5 = this.z.redSqr();
          j5 = f8.redSub(h5).redISub(h5);
          nx = b3.redSub(c5).redISub(d4).redMul(j5);
          ny = f8.redMul(e.redSub(d4));
          nz = f8.redMul(j5);
        }
      } else {
        e = c5.redAdd(d4);
        h5 = this.curve._mulC(this.z).redSqr();
        j5 = e.redSub(h5).redSub(h5);
        nx = this.curve._mulC(b3.redISub(e)).redMul(j5);
        ny = this.curve._mulC(e).redMul(c5.redISub(d4));
        nz = e.redMul(j5);
      }
      return this.curve.point(nx, ny, nz);
    };
    Point.prototype.dbl = function dbl() {
      if (this.isInfinity())
        return this;
      if (this.curve.extended)
        return this._extDbl();
      else
        return this._projDbl();
    };
    Point.prototype._extAdd = function _extAdd(p4) {
      var a3 = this.y.redSub(this.x).redMul(p4.y.redSub(p4.x));
      var b3 = this.y.redAdd(this.x).redMul(p4.y.redAdd(p4.x));
      var c5 = this.t.redMul(this.curve.dd).redMul(p4.t);
      var d4 = this.z.redMul(p4.z.redAdd(p4.z));
      var e = b3.redSub(a3);
      var f8 = d4.redSub(c5);
      var g4 = d4.redAdd(c5);
      var h5 = b3.redAdd(a3);
      var nx = e.redMul(f8);
      var ny = g4.redMul(h5);
      var nt2 = e.redMul(h5);
      var nz = f8.redMul(g4);
      return this.curve.point(nx, ny, nz, nt2);
    };
    Point.prototype._projAdd = function _projAdd(p4) {
      var a3 = this.z.redMul(p4.z);
      var b3 = a3.redSqr();
      var c5 = this.x.redMul(p4.x);
      var d4 = this.y.redMul(p4.y);
      var e = this.curve.d.redMul(c5).redMul(d4);
      var f8 = b3.redSub(e);
      var g4 = b3.redAdd(e);
      var tmp = this.x.redAdd(this.y).redMul(p4.x.redAdd(p4.y)).redISub(c5).redISub(d4);
      var nx = a3.redMul(f8).redMul(tmp);
      var ny;
      var nz;
      if (this.curve.twisted) {
        ny = a3.redMul(g4).redMul(d4.redSub(this.curve._mulA(c5)));
        nz = f8.redMul(g4);
      } else {
        ny = a3.redMul(g4).redMul(d4.redSub(c5));
        nz = this.curve._mulC(f8).redMul(g4);
      }
      return this.curve.point(nx, ny, nz);
    };
    Point.prototype.add = function add(p4) {
      if (this.isInfinity())
        return p4;
      if (p4.isInfinity())
        return this;
      if (this.curve.extended)
        return this._extAdd(p4);
      else
        return this._projAdd(p4);
    };
    Point.prototype.mul = function mul(k5) {
      if (this._hasDoubles(k5))
        return this.curve._fixedNafMul(this, k5);
      else
        return this.curve._wnafMul(this, k5);
    };
    Point.prototype.mulAdd = function mulAdd(k1, p4, k22) {
      return this.curve._wnafMulAdd(1, [this, p4], [k1, k22], 2, false);
    };
    Point.prototype.jmulAdd = function jmulAdd(k1, p4, k22) {
      return this.curve._wnafMulAdd(1, [this, p4], [k1, k22], 2, true);
    };
    Point.prototype.normalize = function normalize() {
      if (this.zOne)
        return this;
      var zi4 = this.z.redInvm();
      this.x = this.x.redMul(zi4);
      this.y = this.y.redMul(zi4);
      if (this.t)
        this.t = this.t.redMul(zi4);
      this.z = this.curve.one;
      this.zOne = true;
      return this;
    };
    Point.prototype.neg = function neg() {
      return this.curve.point(
        this.x.redNeg(),
        this.y,
        this.z,
        this.t && this.t.redNeg()
      );
    };
    Point.prototype.getX = function getX() {
      this.normalize();
      return this.x.fromRed();
    };
    Point.prototype.getY = function getY() {
      this.normalize();
      return this.y.fromRed();
    };
    Point.prototype.eq = function eq(other) {
      return this === other || this.getX().cmp(other.getX()) === 0 && this.getY().cmp(other.getY()) === 0;
    };
    Point.prototype.eqXToP = function eqXToP(x7) {
      var rx = x7.toRed(this.curve.red).redMul(this.z);
      if (this.x.cmp(rx) === 0)
        return true;
      var xc2 = x7.clone();
      var t = this.curve.redN.redMul(this.z);
      for (; ; ) {
        xc2.iadd(this.curve.n);
        if (xc2.cmp(this.curve.p) >= 0)
          return false;
        rx.redIAdd(t);
        if (this.x.cmp(rx) === 0)
          return true;
      }
    };
    Point.prototype.toP = Point.prototype.normalize;
    Point.prototype.mixedAdd = Point.prototype.add;
  }
});

// node_modules/elliptic/lib/elliptic/curve/index.js
var require_curve = __commonJS({
  "node_modules/elliptic/lib/elliptic/curve/index.js"(exports) {
    "use strict";
    var curve = exports;
    curve.base = require_base();
    curve.short = require_short();
    curve.mont = require_mont();
    curve.edwards = require_edwards();
  }
});

// node_modules/hash.js/lib/hash/utils.js
var require_utils3 = __commonJS({
  "node_modules/hash.js/lib/hash/utils.js"(exports) {
    "use strict";
    var assert2 = require_minimalistic_assert();
    var inherits = require_inherits_browser();
    exports.inherits = inherits;
    function isSurrogatePair(msg, i3) {
      if ((msg.charCodeAt(i3) & 64512) !== 55296) {
        return false;
      }
      if (i3 < 0 || i3 + 1 >= msg.length) {
        return false;
      }
      return (msg.charCodeAt(i3 + 1) & 64512) === 56320;
    }
    function toArray(msg, enc) {
      if (Array.isArray(msg))
        return msg.slice();
      if (!msg)
        return [];
      var res = [];
      if (typeof msg === "string") {
        if (!enc) {
          var p4 = 0;
          for (var i3 = 0; i3 < msg.length; i3++) {
            var c5 = msg.charCodeAt(i3);
            if (c5 < 128) {
              res[p4++] = c5;
            } else if (c5 < 2048) {
              res[p4++] = c5 >> 6 | 192;
              res[p4++] = c5 & 63 | 128;
            } else if (isSurrogatePair(msg, i3)) {
              c5 = 65536 + ((c5 & 1023) << 10) + (msg.charCodeAt(++i3) & 1023);
              res[p4++] = c5 >> 18 | 240;
              res[p4++] = c5 >> 12 & 63 | 128;
              res[p4++] = c5 >> 6 & 63 | 128;
              res[p4++] = c5 & 63 | 128;
            } else {
              res[p4++] = c5 >> 12 | 224;
              res[p4++] = c5 >> 6 & 63 | 128;
              res[p4++] = c5 & 63 | 128;
            }
          }
        } else if (enc === "hex") {
          msg = msg.replace(/[^a-z0-9]+/ig, "");
          if (msg.length % 2 !== 0)
            msg = "0" + msg;
          for (i3 = 0; i3 < msg.length; i3 += 2)
            res.push(parseInt(msg[i3] + msg[i3 + 1], 16));
        }
      } else {
        for (i3 = 0; i3 < msg.length; i3++)
          res[i3] = msg[i3] | 0;
      }
      return res;
    }
    exports.toArray = toArray;
    function toHex3(msg) {
      var res = "";
      for (var i3 = 0; i3 < msg.length; i3++)
        res += zero2(msg[i3].toString(16));
      return res;
    }
    exports.toHex = toHex3;
    function htonl(w4) {
      var res = w4 >>> 24 | w4 >>> 8 & 65280 | w4 << 8 & 16711680 | (w4 & 255) << 24;
      return res >>> 0;
    }
    exports.htonl = htonl;
    function toHex32(msg, endian) {
      var res = "";
      for (var i3 = 0; i3 < msg.length; i3++) {
        var w4 = msg[i3];
        if (endian === "little")
          w4 = htonl(w4);
        res += zero8(w4.toString(16));
      }
      return res;
    }
    exports.toHex32 = toHex32;
    function zero2(word) {
      if (word.length === 1)
        return "0" + word;
      else
        return word;
    }
    exports.zero2 = zero2;
    function zero8(word) {
      if (word.length === 7)
        return "0" + word;
      else if (word.length === 6)
        return "00" + word;
      else if (word.length === 5)
        return "000" + word;
      else if (word.length === 4)
        return "0000" + word;
      else if (word.length === 3)
        return "00000" + word;
      else if (word.length === 2)
        return "000000" + word;
      else if (word.length === 1)
        return "0000000" + word;
      else
        return word;
    }
    exports.zero8 = zero8;
    function join32(msg, start, end, endian) {
      var len = end - start;
      assert2(len % 4 === 0);
      var res = new Array(len / 4);
      for (var i3 = 0, k5 = start; i3 < res.length; i3++, k5 += 4) {
        var w4;
        if (endian === "big")
          w4 = msg[k5] << 24 | msg[k5 + 1] << 16 | msg[k5 + 2] << 8 | msg[k5 + 3];
        else
          w4 = msg[k5 + 3] << 24 | msg[k5 + 2] << 16 | msg[k5 + 1] << 8 | msg[k5];
        res[i3] = w4 >>> 0;
      }
      return res;
    }
    exports.join32 = join32;
    function split32(msg, endian) {
      var res = new Array(msg.length * 4);
      for (var i3 = 0, k5 = 0; i3 < msg.length; i3++, k5 += 4) {
        var m3 = msg[i3];
        if (endian === "big") {
          res[k5] = m3 >>> 24;
          res[k5 + 1] = m3 >>> 16 & 255;
          res[k5 + 2] = m3 >>> 8 & 255;
          res[k5 + 3] = m3 & 255;
        } else {
          res[k5 + 3] = m3 >>> 24;
          res[k5 + 2] = m3 >>> 16 & 255;
          res[k5 + 1] = m3 >>> 8 & 255;
          res[k5] = m3 & 255;
        }
      }
      return res;
    }
    exports.split32 = split32;
    function rotr32(w4, b3) {
      return w4 >>> b3 | w4 << 32 - b3;
    }
    exports.rotr32 = rotr32;
    function rotl32(w4, b3) {
      return w4 << b3 | w4 >>> 32 - b3;
    }
    exports.rotl32 = rotl32;
    function sum32(a3, b3) {
      return a3 + b3 >>> 0;
    }
    exports.sum32 = sum32;
    function sum32_3(a3, b3, c5) {
      return a3 + b3 + c5 >>> 0;
    }
    exports.sum32_3 = sum32_3;
    function sum32_4(a3, b3, c5, d4) {
      return a3 + b3 + c5 + d4 >>> 0;
    }
    exports.sum32_4 = sum32_4;
    function sum32_5(a3, b3, c5, d4, e) {
      return a3 + b3 + c5 + d4 + e >>> 0;
    }
    exports.sum32_5 = sum32_5;
    function sum64(buf, pos, ah2, al) {
      var bh = buf[pos];
      var bl = buf[pos + 1];
      var lo3 = al + bl >>> 0;
      var hi4 = (lo3 < al ? 1 : 0) + ah2 + bh;
      buf[pos] = hi4 >>> 0;
      buf[pos + 1] = lo3;
    }
    exports.sum64 = sum64;
    function sum64_hi(ah2, al, bh, bl) {
      var lo3 = al + bl >>> 0;
      var hi4 = (lo3 < al ? 1 : 0) + ah2 + bh;
      return hi4 >>> 0;
    }
    exports.sum64_hi = sum64_hi;
    function sum64_lo(ah2, al, bh, bl) {
      var lo3 = al + bl;
      return lo3 >>> 0;
    }
    exports.sum64_lo = sum64_lo;
    function sum64_4_hi(ah2, al, bh, bl, ch, cl, dh, dl) {
      var carry = 0;
      var lo3 = al;
      lo3 = lo3 + bl >>> 0;
      carry += lo3 < al ? 1 : 0;
      lo3 = lo3 + cl >>> 0;
      carry += lo3 < cl ? 1 : 0;
      lo3 = lo3 + dl >>> 0;
      carry += lo3 < dl ? 1 : 0;
      var hi4 = ah2 + bh + ch + dh + carry;
      return hi4 >>> 0;
    }
    exports.sum64_4_hi = sum64_4_hi;
    function sum64_4_lo(ah2, al, bh, bl, ch, cl, dh, dl) {
      var lo3 = al + bl + cl + dl;
      return lo3 >>> 0;
    }
    exports.sum64_4_lo = sum64_4_lo;
    function sum64_5_hi(ah2, al, bh, bl, ch, cl, dh, dl, eh2, el) {
      var carry = 0;
      var lo3 = al;
      lo3 = lo3 + bl >>> 0;
      carry += lo3 < al ? 1 : 0;
      lo3 = lo3 + cl >>> 0;
      carry += lo3 < cl ? 1 : 0;
      lo3 = lo3 + dl >>> 0;
      carry += lo3 < dl ? 1 : 0;
      lo3 = lo3 + el >>> 0;
      carry += lo3 < el ? 1 : 0;
      var hi4 = ah2 + bh + ch + dh + eh2 + carry;
      return hi4 >>> 0;
    }
    exports.sum64_5_hi = sum64_5_hi;
    function sum64_5_lo(ah2, al, bh, bl, ch, cl, dh, dl, eh2, el) {
      var lo3 = al + bl + cl + dl + el;
      return lo3 >>> 0;
    }
    exports.sum64_5_lo = sum64_5_lo;
    function rotr64_hi(ah2, al, num) {
      var r3 = al << 32 - num | ah2 >>> num;
      return r3 >>> 0;
    }
    exports.rotr64_hi = rotr64_hi;
    function rotr64_lo(ah2, al, num) {
      var r3 = ah2 << 32 - num | al >>> num;
      return r3 >>> 0;
    }
    exports.rotr64_lo = rotr64_lo;
    function shr64_hi(ah2, al, num) {
      return ah2 >>> num;
    }
    exports.shr64_hi = shr64_hi;
    function shr64_lo(ah2, al, num) {
      var r3 = ah2 << 32 - num | al >>> num;
      return r3 >>> 0;
    }
    exports.shr64_lo = shr64_lo;
  }
});

// node_modules/hash.js/lib/hash/common.js
var require_common = __commonJS({
  "node_modules/hash.js/lib/hash/common.js"(exports) {
    "use strict";
    var utils = require_utils3();
    var assert2 = require_minimalistic_assert();
    function BlockHash() {
      this.pending = null;
      this.pendingTotal = 0;
      this.blockSize = this.constructor.blockSize;
      this.outSize = this.constructor.outSize;
      this.hmacStrength = this.constructor.hmacStrength;
      this.padLength = this.constructor.padLength / 8;
      this.endian = "big";
      this._delta8 = this.blockSize / 8;
      this._delta32 = this.blockSize / 32;
    }
    exports.BlockHash = BlockHash;
    BlockHash.prototype.update = function update(msg, enc) {
      msg = utils.toArray(msg, enc);
      if (!this.pending)
        this.pending = msg;
      else
        this.pending = this.pending.concat(msg);
      this.pendingTotal += msg.length;
      if (this.pending.length >= this._delta8) {
        msg = this.pending;
        var r3 = msg.length % this._delta8;
        this.pending = msg.slice(msg.length - r3, msg.length);
        if (this.pending.length === 0)
          this.pending = null;
        msg = utils.join32(msg, 0, msg.length - r3, this.endian);
        for (var i3 = 0; i3 < msg.length; i3 += this._delta32)
          this._update(msg, i3, i3 + this._delta32);
      }
      return this;
    };
    BlockHash.prototype.digest = function digest(enc) {
      this.update(this._pad());
      assert2(this.pending === null);
      return this._digest(enc);
    };
    BlockHash.prototype._pad = function pad4() {
      var len = this.pendingTotal;
      var bytes = this._delta8;
      var k5 = bytes - (len + this.padLength) % bytes;
      var res = new Array(k5 + this.padLength);
      res[0] = 128;
      for (var i3 = 1; i3 < k5; i3++)
        res[i3] = 0;
      len <<= 3;
      if (this.endian === "big") {
        for (var t = 8; t < this.padLength; t++)
          res[i3++] = 0;
        res[i3++] = 0;
        res[i3++] = 0;
        res[i3++] = 0;
        res[i3++] = 0;
        res[i3++] = len >>> 24 & 255;
        res[i3++] = len >>> 16 & 255;
        res[i3++] = len >>> 8 & 255;
        res[i3++] = len & 255;
      } else {
        res[i3++] = len & 255;
        res[i3++] = len >>> 8 & 255;
        res[i3++] = len >>> 16 & 255;
        res[i3++] = len >>> 24 & 255;
        res[i3++] = 0;
        res[i3++] = 0;
        res[i3++] = 0;
        res[i3++] = 0;
        for (t = 8; t < this.padLength; t++)
          res[i3++] = 0;
      }
      return res;
    };
  }
});

// node_modules/hash.js/lib/hash/sha/common.js
var require_common2 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/common.js"(exports) {
    "use strict";
    var utils = require_utils3();
    var rotr32 = utils.rotr32;
    function ft_1(s2, x7, y6, z6) {
      if (s2 === 0)
        return ch32(x7, y6, z6);
      if (s2 === 1 || s2 === 3)
        return p32(x7, y6, z6);
      if (s2 === 2)
        return maj32(x7, y6, z6);
    }
    exports.ft_1 = ft_1;
    function ch32(x7, y6, z6) {
      return x7 & y6 ^ ~x7 & z6;
    }
    exports.ch32 = ch32;
    function maj32(x7, y6, z6) {
      return x7 & y6 ^ x7 & z6 ^ y6 & z6;
    }
    exports.maj32 = maj32;
    function p32(x7, y6, z6) {
      return x7 ^ y6 ^ z6;
    }
    exports.p32 = p32;
    function s0_256(x7) {
      return rotr32(x7, 2) ^ rotr32(x7, 13) ^ rotr32(x7, 22);
    }
    exports.s0_256 = s0_256;
    function s1_256(x7) {
      return rotr32(x7, 6) ^ rotr32(x7, 11) ^ rotr32(x7, 25);
    }
    exports.s1_256 = s1_256;
    function g0_256(x7) {
      return rotr32(x7, 7) ^ rotr32(x7, 18) ^ x7 >>> 3;
    }
    exports.g0_256 = g0_256;
    function g1_256(x7) {
      return rotr32(x7, 17) ^ rotr32(x7, 19) ^ x7 >>> 10;
    }
    exports.g1_256 = g1_256;
  }
});

// node_modules/hash.js/lib/hash/sha/1.js
var require__ = __commonJS({
  "node_modules/hash.js/lib/hash/sha/1.js"(exports, module) {
    "use strict";
    var utils = require_utils3();
    var common = require_common();
    var shaCommon = require_common2();
    var rotl32 = utils.rotl32;
    var sum32 = utils.sum32;
    var sum32_5 = utils.sum32_5;
    var ft_1 = shaCommon.ft_1;
    var BlockHash = common.BlockHash;
    var sha1_K = [
      1518500249,
      1859775393,
      2400959708,
      3395469782
    ];
    function SHA1() {
      if (!(this instanceof SHA1))
        return new SHA1();
      BlockHash.call(this);
      this.h = [
        1732584193,
        4023233417,
        2562383102,
        271733878,
        3285377520
      ];
      this.W = new Array(80);
    }
    utils.inherits(SHA1, BlockHash);
    module.exports = SHA1;
    SHA1.blockSize = 512;
    SHA1.outSize = 160;
    SHA1.hmacStrength = 80;
    SHA1.padLength = 64;
    SHA1.prototype._update = function _update(msg, start) {
      var W2 = this.W;
      for (var i3 = 0; i3 < 16; i3++)
        W2[i3] = msg[start + i3];
      for (; i3 < W2.length; i3++)
        W2[i3] = rotl32(W2[i3 - 3] ^ W2[i3 - 8] ^ W2[i3 - 14] ^ W2[i3 - 16], 1);
      var a3 = this.h[0];
      var b3 = this.h[1];
      var c5 = this.h[2];
      var d4 = this.h[3];
      var e = this.h[4];
      for (i3 = 0; i3 < W2.length; i3++) {
        var s2 = ~~(i3 / 20);
        var t = sum32_5(rotl32(a3, 5), ft_1(s2, b3, c5, d4), e, W2[i3], sha1_K[s2]);
        e = d4;
        d4 = c5;
        c5 = rotl32(b3, 30);
        b3 = a3;
        a3 = t;
      }
      this.h[0] = sum32(this.h[0], a3);
      this.h[1] = sum32(this.h[1], b3);
      this.h[2] = sum32(this.h[2], c5);
      this.h[3] = sum32(this.h[3], d4);
      this.h[4] = sum32(this.h[4], e);
    };
    SHA1.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "big");
      else
        return utils.split32(this.h, "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha/256.js
var require__2 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/256.js"(exports, module) {
    "use strict";
    var utils = require_utils3();
    var common = require_common();
    var shaCommon = require_common2();
    var assert2 = require_minimalistic_assert();
    var sum32 = utils.sum32;
    var sum32_4 = utils.sum32_4;
    var sum32_5 = utils.sum32_5;
    var ch32 = shaCommon.ch32;
    var maj32 = shaCommon.maj32;
    var s0_256 = shaCommon.s0_256;
    var s1_256 = shaCommon.s1_256;
    var g0_256 = shaCommon.g0_256;
    var g1_256 = shaCommon.g1_256;
    var BlockHash = common.BlockHash;
    var sha256_K = [
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ];
    function SHA2562() {
      if (!(this instanceof SHA2562))
        return new SHA2562();
      BlockHash.call(this);
      this.h = [
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ];
      this.k = sha256_K;
      this.W = new Array(64);
    }
    utils.inherits(SHA2562, BlockHash);
    module.exports = SHA2562;
    SHA2562.blockSize = 512;
    SHA2562.outSize = 256;
    SHA2562.hmacStrength = 192;
    SHA2562.padLength = 64;
    SHA2562.prototype._update = function _update(msg, start) {
      var W2 = this.W;
      for (var i3 = 0; i3 < 16; i3++)
        W2[i3] = msg[start + i3];
      for (; i3 < W2.length; i3++)
        W2[i3] = sum32_4(g1_256(W2[i3 - 2]), W2[i3 - 7], g0_256(W2[i3 - 15]), W2[i3 - 16]);
      var a3 = this.h[0];
      var b3 = this.h[1];
      var c5 = this.h[2];
      var d4 = this.h[3];
      var e = this.h[4];
      var f8 = this.h[5];
      var g4 = this.h[6];
      var h5 = this.h[7];
      assert2(this.k.length === W2.length);
      for (i3 = 0; i3 < W2.length; i3++) {
        var T1 = sum32_5(h5, s1_256(e), ch32(e, f8, g4), this.k[i3], W2[i3]);
        var T22 = sum32(s0_256(a3), maj32(a3, b3, c5));
        h5 = g4;
        g4 = f8;
        f8 = e;
        e = sum32(d4, T1);
        d4 = c5;
        c5 = b3;
        b3 = a3;
        a3 = sum32(T1, T22);
      }
      this.h[0] = sum32(this.h[0], a3);
      this.h[1] = sum32(this.h[1], b3);
      this.h[2] = sum32(this.h[2], c5);
      this.h[3] = sum32(this.h[3], d4);
      this.h[4] = sum32(this.h[4], e);
      this.h[5] = sum32(this.h[5], f8);
      this.h[6] = sum32(this.h[6], g4);
      this.h[7] = sum32(this.h[7], h5);
    };
    SHA2562.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "big");
      else
        return utils.split32(this.h, "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha/224.js
var require__3 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/224.js"(exports, module) {
    "use strict";
    var utils = require_utils3();
    var SHA2562 = require__2();
    function SHA2242() {
      if (!(this instanceof SHA2242))
        return new SHA2242();
      SHA2562.call(this);
      this.h = [
        3238371032,
        914150663,
        812702999,
        4144912697,
        4290775857,
        1750603025,
        1694076839,
        3204075428
      ];
    }
    utils.inherits(SHA2242, SHA2562);
    module.exports = SHA2242;
    SHA2242.blockSize = 512;
    SHA2242.outSize = 224;
    SHA2242.hmacStrength = 192;
    SHA2242.padLength = 64;
    SHA2242.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h.slice(0, 7), "big");
      else
        return utils.split32(this.h.slice(0, 7), "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha/512.js
var require__4 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/512.js"(exports, module) {
    "use strict";
    var utils = require_utils3();
    var common = require_common();
    var assert2 = require_minimalistic_assert();
    var rotr64_hi = utils.rotr64_hi;
    var rotr64_lo = utils.rotr64_lo;
    var shr64_hi = utils.shr64_hi;
    var shr64_lo = utils.shr64_lo;
    var sum64 = utils.sum64;
    var sum64_hi = utils.sum64_hi;
    var sum64_lo = utils.sum64_lo;
    var sum64_4_hi = utils.sum64_4_hi;
    var sum64_4_lo = utils.sum64_4_lo;
    var sum64_5_hi = utils.sum64_5_hi;
    var sum64_5_lo = utils.sum64_5_lo;
    var BlockHash = common.BlockHash;
    var sha512_K = [
      1116352408,
      3609767458,
      1899447441,
      602891725,
      3049323471,
      3964484399,
      3921009573,
      2173295548,
      961987163,
      4081628472,
      1508970993,
      3053834265,
      2453635748,
      2937671579,
      2870763221,
      3664609560,
      3624381080,
      2734883394,
      310598401,
      1164996542,
      607225278,
      1323610764,
      1426881987,
      3590304994,
      1925078388,
      4068182383,
      2162078206,
      991336113,
      2614888103,
      633803317,
      3248222580,
      3479774868,
      3835390401,
      2666613458,
      4022224774,
      944711139,
      264347078,
      2341262773,
      604807628,
      2007800933,
      770255983,
      1495990901,
      1249150122,
      1856431235,
      1555081692,
      3175218132,
      1996064986,
      2198950837,
      2554220882,
      3999719339,
      2821834349,
      766784016,
      2952996808,
      2566594879,
      3210313671,
      3203337956,
      3336571891,
      1034457026,
      3584528711,
      2466948901,
      113926993,
      3758326383,
      338241895,
      168717936,
      666307205,
      1188179964,
      773529912,
      1546045734,
      1294757372,
      1522805485,
      1396182291,
      2643833823,
      1695183700,
      2343527390,
      1986661051,
      1014477480,
      2177026350,
      1206759142,
      2456956037,
      344077627,
      2730485921,
      1290863460,
      2820302411,
      3158454273,
      3259730800,
      3505952657,
      3345764771,
      106217008,
      3516065817,
      3606008344,
      3600352804,
      1432725776,
      4094571909,
      1467031594,
      275423344,
      851169720,
      430227734,
      3100823752,
      506948616,
      1363258195,
      659060556,
      3750685593,
      883997877,
      3785050280,
      958139571,
      3318307427,
      1322822218,
      3812723403,
      1537002063,
      2003034995,
      1747873779,
      3602036899,
      1955562222,
      1575990012,
      2024104815,
      1125592928,
      2227730452,
      2716904306,
      2361852424,
      442776044,
      2428436474,
      593698344,
      2756734187,
      3733110249,
      3204031479,
      2999351573,
      3329325298,
      3815920427,
      3391569614,
      3928383900,
      3515267271,
      566280711,
      3940187606,
      3454069534,
      4118630271,
      4000239992,
      116418474,
      1914138554,
      174292421,
      2731055270,
      289380356,
      3203993006,
      460393269,
      320620315,
      685471733,
      587496836,
      852142971,
      1086792851,
      1017036298,
      365543100,
      1126000580,
      2618297676,
      1288033470,
      3409855158,
      1501505948,
      4234509866,
      1607167915,
      987167468,
      1816402316,
      1246189591
    ];
    function SHA512() {
      if (!(this instanceof SHA512))
        return new SHA512();
      BlockHash.call(this);
      this.h = [
        1779033703,
        4089235720,
        3144134277,
        2227873595,
        1013904242,
        4271175723,
        2773480762,
        1595750129,
        1359893119,
        2917565137,
        2600822924,
        725511199,
        528734635,
        4215389547,
        1541459225,
        327033209
      ];
      this.k = sha512_K;
      this.W = new Array(160);
    }
    utils.inherits(SHA512, BlockHash);
    module.exports = SHA512;
    SHA512.blockSize = 1024;
    SHA512.outSize = 512;
    SHA512.hmacStrength = 192;
    SHA512.padLength = 128;
    SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
      var W2 = this.W;
      for (var i3 = 0; i3 < 32; i3++)
        W2[i3] = msg[start + i3];
      for (; i3 < W2.length; i3 += 2) {
        var c0_hi = g1_512_hi(W2[i3 - 4], W2[i3 - 3]);
        var c0_lo = g1_512_lo(W2[i3 - 4], W2[i3 - 3]);
        var c1_hi = W2[i3 - 14];
        var c1_lo = W2[i3 - 13];
        var c2_hi = g0_512_hi(W2[i3 - 30], W2[i3 - 29]);
        var c2_lo = g0_512_lo(W2[i3 - 30], W2[i3 - 29]);
        var c3_hi = W2[i3 - 32];
        var c3_lo = W2[i3 - 31];
        W2[i3] = sum64_4_hi(
          c0_hi,
          c0_lo,
          c1_hi,
          c1_lo,
          c2_hi,
          c2_lo,
          c3_hi,
          c3_lo
        );
        W2[i3 + 1] = sum64_4_lo(
          c0_hi,
          c0_lo,
          c1_hi,
          c1_lo,
          c2_hi,
          c2_lo,
          c3_hi,
          c3_lo
        );
      }
    };
    SHA512.prototype._update = function _update(msg, start) {
      this._prepareBlock(msg, start);
      var W2 = this.W;
      var ah2 = this.h[0];
      var al = this.h[1];
      var bh = this.h[2];
      var bl = this.h[3];
      var ch = this.h[4];
      var cl = this.h[5];
      var dh = this.h[6];
      var dl = this.h[7];
      var eh2 = this.h[8];
      var el = this.h[9];
      var fh = this.h[10];
      var fl = this.h[11];
      var gh = this.h[12];
      var gl = this.h[13];
      var hh = this.h[14];
      var hl = this.h[15];
      assert2(this.k.length === W2.length);
      for (var i3 = 0; i3 < W2.length; i3 += 2) {
        var c0_hi = hh;
        var c0_lo = hl;
        var c1_hi = s1_512_hi(eh2, el);
        var c1_lo = s1_512_lo(eh2, el);
        var c2_hi = ch64_hi(eh2, el, fh, fl, gh, gl);
        var c2_lo = ch64_lo(eh2, el, fh, fl, gh, gl);
        var c3_hi = this.k[i3];
        var c3_lo = this.k[i3 + 1];
        var c4_hi = W2[i3];
        var c4_lo = W2[i3 + 1];
        var T1_hi = sum64_5_hi(
          c0_hi,
          c0_lo,
          c1_hi,
          c1_lo,
          c2_hi,
          c2_lo,
          c3_hi,
          c3_lo,
          c4_hi,
          c4_lo
        );
        var T1_lo = sum64_5_lo(
          c0_hi,
          c0_lo,
          c1_hi,
          c1_lo,
          c2_hi,
          c2_lo,
          c3_hi,
          c3_lo,
          c4_hi,
          c4_lo
        );
        c0_hi = s0_512_hi(ah2, al);
        c0_lo = s0_512_lo(ah2, al);
        c1_hi = maj64_hi(ah2, al, bh, bl, ch, cl);
        c1_lo = maj64_lo(ah2, al, bh, bl, ch, cl);
        var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
        var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);
        hh = gh;
        hl = gl;
        gh = fh;
        gl = fl;
        fh = eh2;
        fl = el;
        eh2 = sum64_hi(dh, dl, T1_hi, T1_lo);
        el = sum64_lo(dl, dl, T1_hi, T1_lo);
        dh = ch;
        dl = cl;
        ch = bh;
        cl = bl;
        bh = ah2;
        bl = al;
        ah2 = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
        al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
      }
      sum64(this.h, 0, ah2, al);
      sum64(this.h, 2, bh, bl);
      sum64(this.h, 4, ch, cl);
      sum64(this.h, 6, dh, dl);
      sum64(this.h, 8, eh2, el);
      sum64(this.h, 10, fh, fl);
      sum64(this.h, 12, gh, gl);
      sum64(this.h, 14, hh, hl);
    };
    SHA512.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "big");
      else
        return utils.split32(this.h, "big");
    };
    function ch64_hi(xh, xl, yh, yl, zh) {
      var r3 = xh & yh ^ ~xh & zh;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function ch64_lo(xh, xl, yh, yl, zh, zl) {
      var r3 = xl & yl ^ ~xl & zl;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function maj64_hi(xh, xl, yh, yl, zh) {
      var r3 = xh & yh ^ xh & zh ^ yh & zh;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function maj64_lo(xh, xl, yh, yl, zh, zl) {
      var r3 = xl & yl ^ xl & zl ^ yl & zl;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function s0_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 28);
      var c1_hi = rotr64_hi(xl, xh, 2);
      var c2_hi = rotr64_hi(xl, xh, 7);
      var r3 = c0_hi ^ c1_hi ^ c2_hi;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function s0_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 28);
      var c1_lo = rotr64_lo(xl, xh, 2);
      var c2_lo = rotr64_lo(xl, xh, 7);
      var r3 = c0_lo ^ c1_lo ^ c2_lo;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function s1_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 14);
      var c1_hi = rotr64_hi(xh, xl, 18);
      var c2_hi = rotr64_hi(xl, xh, 9);
      var r3 = c0_hi ^ c1_hi ^ c2_hi;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function s1_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 14);
      var c1_lo = rotr64_lo(xh, xl, 18);
      var c2_lo = rotr64_lo(xl, xh, 9);
      var r3 = c0_lo ^ c1_lo ^ c2_lo;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function g0_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 1);
      var c1_hi = rotr64_hi(xh, xl, 8);
      var c2_hi = shr64_hi(xh, xl, 7);
      var r3 = c0_hi ^ c1_hi ^ c2_hi;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function g0_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 1);
      var c1_lo = rotr64_lo(xh, xl, 8);
      var c2_lo = shr64_lo(xh, xl, 7);
      var r3 = c0_lo ^ c1_lo ^ c2_lo;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function g1_512_hi(xh, xl) {
      var c0_hi = rotr64_hi(xh, xl, 19);
      var c1_hi = rotr64_hi(xl, xh, 29);
      var c2_hi = shr64_hi(xh, xl, 6);
      var r3 = c0_hi ^ c1_hi ^ c2_hi;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
    function g1_512_lo(xh, xl) {
      var c0_lo = rotr64_lo(xh, xl, 19);
      var c1_lo = rotr64_lo(xl, xh, 29);
      var c2_lo = shr64_lo(xh, xl, 6);
      var r3 = c0_lo ^ c1_lo ^ c2_lo;
      if (r3 < 0)
        r3 += 4294967296;
      return r3;
    }
  }
});

// node_modules/hash.js/lib/hash/sha/384.js
var require__5 = __commonJS({
  "node_modules/hash.js/lib/hash/sha/384.js"(exports, module) {
    "use strict";
    var utils = require_utils3();
    var SHA512 = require__4();
    function SHA384() {
      if (!(this instanceof SHA384))
        return new SHA384();
      SHA512.call(this);
      this.h = [
        3418070365,
        3238371032,
        1654270250,
        914150663,
        2438529370,
        812702999,
        355462360,
        4144912697,
        1731405415,
        4290775857,
        2394180231,
        1750603025,
        3675008525,
        1694076839,
        1203062813,
        3204075428
      ];
    }
    utils.inherits(SHA384, SHA512);
    module.exports = SHA384;
    SHA384.blockSize = 1024;
    SHA384.outSize = 384;
    SHA384.hmacStrength = 192;
    SHA384.padLength = 128;
    SHA384.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h.slice(0, 12), "big");
      else
        return utils.split32(this.h.slice(0, 12), "big");
    };
  }
});

// node_modules/hash.js/lib/hash/sha.js
var require_sha = __commonJS({
  "node_modules/hash.js/lib/hash/sha.js"(exports) {
    "use strict";
    exports.sha1 = require__();
    exports.sha224 = require__3();
    exports.sha256 = require__2();
    exports.sha384 = require__5();
    exports.sha512 = require__4();
  }
});

// node_modules/hash.js/lib/hash/ripemd.js
var require_ripemd = __commonJS({
  "node_modules/hash.js/lib/hash/ripemd.js"(exports) {
    "use strict";
    var utils = require_utils3();
    var common = require_common();
    var rotl32 = utils.rotl32;
    var sum32 = utils.sum32;
    var sum32_3 = utils.sum32_3;
    var sum32_4 = utils.sum32_4;
    var BlockHash = common.BlockHash;
    function RIPEMD1603() {
      if (!(this instanceof RIPEMD1603))
        return new RIPEMD1603();
      BlockHash.call(this);
      this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
      this.endian = "little";
    }
    utils.inherits(RIPEMD1603, BlockHash);
    exports.ripemd160 = RIPEMD1603;
    RIPEMD1603.blockSize = 512;
    RIPEMD1603.outSize = 160;
    RIPEMD1603.hmacStrength = 192;
    RIPEMD1603.padLength = 64;
    RIPEMD1603.prototype._update = function update(msg, start) {
      var A5 = this.h[0];
      var B3 = this.h[1];
      var C5 = this.h[2];
      var D5 = this.h[3];
      var E5 = this.h[4];
      var Ah = A5;
      var Bh = B3;
      var Ch = C5;
      var Dh = D5;
      var Eh = E5;
      for (var j5 = 0; j5 < 80; j5++) {
        var T5 = sum32(
          rotl32(
            sum32_4(A5, f8(j5, B3, C5, D5), msg[r3[j5] + start], K4(j5)),
            s2[j5]
          ),
          E5
        );
        A5 = E5;
        E5 = D5;
        D5 = rotl32(C5, 10);
        C5 = B3;
        B3 = T5;
        T5 = sum32(
          rotl32(
            sum32_4(Ah, f8(79 - j5, Bh, Ch, Dh), msg[rh2[j5] + start], Kh(j5)),
            sh2[j5]
          ),
          Eh
        );
        Ah = Eh;
        Eh = Dh;
        Dh = rotl32(Ch, 10);
        Ch = Bh;
        Bh = T5;
      }
      T5 = sum32_3(this.h[1], C5, Dh);
      this.h[1] = sum32_3(this.h[2], D5, Eh);
      this.h[2] = sum32_3(this.h[3], E5, Ah);
      this.h[3] = sum32_3(this.h[4], A5, Bh);
      this.h[4] = sum32_3(this.h[0], B3, Ch);
      this.h[0] = T5;
    };
    RIPEMD1603.prototype._digest = function digest(enc) {
      if (enc === "hex")
        return utils.toHex32(this.h, "little");
      else
        return utils.split32(this.h, "little");
    };
    function f8(j5, x7, y6, z6) {
      if (j5 <= 15)
        return x7 ^ y6 ^ z6;
      else if (j5 <= 31)
        return x7 & y6 | ~x7 & z6;
      else if (j5 <= 47)
        return (x7 | ~y6) ^ z6;
      else if (j5 <= 63)
        return x7 & z6 | y6 & ~z6;
      else
        return x7 ^ (y6 | ~z6);
    }
    function K4(j5) {
      if (j5 <= 15)
        return 0;
      else if (j5 <= 31)
        return 1518500249;
      else if (j5 <= 47)
        return 1859775393;
      else if (j5 <= 63)
        return 2400959708;
      else
        return 2840853838;
    }
    function Kh(j5) {
      if (j5 <= 15)
        return 1352829926;
      else if (j5 <= 31)
        return 1548603684;
      else if (j5 <= 47)
        return 1836072691;
      else if (j5 <= 63)
        return 2053994217;
      else
        return 0;
    }
    var r3 = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      7,
      4,
      13,
      1,
      10,
      6,
      15,
      3,
      12,
      0,
      9,
      5,
      2,
      14,
      11,
      8,
      3,
      10,
      14,
      4,
      9,
      15,
      8,
      1,
      2,
      7,
      0,
      6,
      13,
      11,
      5,
      12,
      1,
      9,
      11,
      10,
      0,
      8,
      12,
      4,
      13,
      3,
      7,
      15,
      14,
      5,
      6,
      2,
      4,
      0,
      5,
      9,
      7,
      12,
      2,
      10,
      14,
      1,
      3,
      8,
      11,
      6,
      15,
      13
    ];
    var rh2 = [
      5,
      14,
      7,
      0,
      9,
      2,
      11,
      4,
      13,
      6,
      15,
      8,
      1,
      10,
      3,
      12,
      6,
      11,
      3,
      7,
      0,
      13,
      5,
      10,
      14,
      15,
      8,
      12,
      4,
      9,
      1,
      2,
      15,
      5,
      1,
      3,
      7,
      14,
      6,
      9,
      11,
      8,
      12,
      2,
      10,
      0,
      4,
      13,
      8,
      6,
      4,
      1,
      3,
      11,
      15,
      0,
      5,
      12,
      2,
      13,
      9,
      7,
      10,
      14,
      12,
      15,
      10,
      4,
      1,
      5,
      8,
      7,
      6,
      2,
      13,
      14,
      0,
      3,
      9,
      11
    ];
    var s2 = [
      11,
      14,
      15,
      12,
      5,
      8,
      7,
      9,
      11,
      13,
      14,
      15,
      6,
      7,
      9,
      8,
      7,
      6,
      8,
      13,
      11,
      9,
      7,
      15,
      7,
      12,
      15,
      9,
      11,
      7,
      13,
      12,
      11,
      13,
      6,
      7,
      14,
      9,
      13,
      15,
      14,
      8,
      13,
      6,
      5,
      12,
      7,
      5,
      11,
      12,
      14,
      15,
      14,
      15,
      9,
      8,
      9,
      14,
      5,
      6,
      8,
      6,
      5,
      12,
      9,
      15,
      5,
      11,
      6,
      8,
      13,
      12,
      5,
      12,
      13,
      14,
      11,
      8,
      5,
      6
    ];
    var sh2 = [
      8,
      9,
      9,
      11,
      13,
      15,
      15,
      5,
      7,
      7,
      8,
      11,
      14,
      14,
      12,
      6,
      9,
      13,
      15,
      7,
      12,
      8,
      9,
      11,
      7,
      7,
      12,
      7,
      6,
      15,
      13,
      11,
      9,
      7,
      15,
      11,
      8,
      6,
      6,
      14,
      12,
      13,
      5,
      14,
      13,
      13,
      7,
      5,
      15,
      5,
      8,
      11,
      14,
      14,
      6,
      14,
      6,
      9,
      12,
      9,
      12,
      5,
      15,
      8,
      8,
      5,
      12,
      9,
      12,
      5,
      14,
      6,
      8,
      13,
      6,
      5,
      15,
      13,
      11,
      11
    ];
  }
});

// node_modules/hash.js/lib/hash/hmac.js
var require_hmac = __commonJS({
  "node_modules/hash.js/lib/hash/hmac.js"(exports, module) {
    "use strict";
    var utils = require_utils3();
    var assert2 = require_minimalistic_assert();
    function Hmac(hash, key, enc) {
      if (!(this instanceof Hmac))
        return new Hmac(hash, key, enc);
      this.Hash = hash;
      this.blockSize = hash.blockSize / 8;
      this.outSize = hash.outSize / 8;
      this.inner = null;
      this.outer = null;
      this._init(utils.toArray(key, enc));
    }
    module.exports = Hmac;
    Hmac.prototype._init = function init(key) {
      if (key.length > this.blockSize)
        key = new this.Hash().update(key).digest();
      assert2(key.length <= this.blockSize);
      for (var i3 = key.length; i3 < this.blockSize; i3++)
        key.push(0);
      for (i3 = 0; i3 < key.length; i3++)
        key[i3] ^= 54;
      this.inner = new this.Hash().update(key);
      for (i3 = 0; i3 < key.length; i3++)
        key[i3] ^= 106;
      this.outer = new this.Hash().update(key);
    };
    Hmac.prototype.update = function update(msg, enc) {
      this.inner.update(msg, enc);
      return this;
    };
    Hmac.prototype.digest = function digest(enc) {
      this.outer.update(this.inner.digest());
      return this.outer.digest(enc);
    };
  }
});

// node_modules/hash.js/lib/hash.js
var require_hash = __commonJS({
  "node_modules/hash.js/lib/hash.js"(exports) {
    var hash = exports;
    hash.utils = require_utils3();
    hash.common = require_common();
    hash.sha = require_sha();
    hash.ripemd = require_ripemd();
    hash.hmac = require_hmac();
    hash.sha1 = hash.sha.sha1;
    hash.sha256 = hash.sha.sha256;
    hash.sha224 = hash.sha.sha224;
    hash.sha384 = hash.sha.sha384;
    hash.sha512 = hash.sha.sha512;
    hash.ripemd160 = hash.ripemd.ripemd160;
  }
});

// node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js
var require_secp256k1 = __commonJS({
  "node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js"(exports, module) {
    module.exports = {
      doubles: {
        step: 4,
        points: [
          [
            "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
            "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"
          ],
          [
            "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
            "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"
          ],
          [
            "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
            "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"
          ],
          [
            "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
            "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"
          ],
          [
            "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
            "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"
          ],
          [
            "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
            "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"
          ],
          [
            "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
            "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"
          ],
          [
            "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
            "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"
          ],
          [
            "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
            "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"
          ],
          [
            "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
            "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"
          ],
          [
            "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
            "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"
          ],
          [
            "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
            "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"
          ],
          [
            "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
            "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"
          ],
          [
            "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
            "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"
          ],
          [
            "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
            "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"
          ],
          [
            "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
            "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"
          ],
          [
            "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
            "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"
          ],
          [
            "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
            "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"
          ],
          [
            "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
            "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"
          ],
          [
            "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
            "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"
          ],
          [
            "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
            "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"
          ],
          [
            "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
            "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"
          ],
          [
            "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
            "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"
          ],
          [
            "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
            "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"
          ],
          [
            "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
            "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"
          ],
          [
            "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
            "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"
          ],
          [
            "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
            "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"
          ],
          [
            "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
            "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"
          ],
          [
            "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
            "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"
          ],
          [
            "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
            "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"
          ],
          [
            "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
            "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"
          ],
          [
            "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
            "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"
          ],
          [
            "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
            "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"
          ],
          [
            "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
            "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"
          ],
          [
            "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
            "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"
          ],
          [
            "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
            "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"
          ],
          [
            "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
            "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"
          ],
          [
            "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
            "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"
          ],
          [
            "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
            "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"
          ],
          [
            "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
            "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"
          ],
          [
            "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
            "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"
          ],
          [
            "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
            "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"
          ],
          [
            "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
            "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"
          ],
          [
            "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
            "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"
          ],
          [
            "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
            "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"
          ],
          [
            "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
            "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"
          ],
          [
            "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
            "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"
          ],
          [
            "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
            "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"
          ],
          [
            "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
            "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"
          ],
          [
            "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
            "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"
          ],
          [
            "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
            "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"
          ],
          [
            "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
            "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"
          ],
          [
            "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
            "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"
          ],
          [
            "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
            "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"
          ],
          [
            "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
            "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"
          ],
          [
            "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
            "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"
          ],
          [
            "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
            "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"
          ],
          [
            "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
            "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"
          ],
          [
            "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
            "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"
          ],
          [
            "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
            "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"
          ],
          [
            "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
            "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"
          ],
          [
            "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
            "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"
          ],
          [
            "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
            "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"
          ],
          [
            "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
            "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"
          ],
          [
            "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
            "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"
          ]
        ]
      },
      naf: {
        wnd: 7,
        points: [
          [
            "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
            "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"
          ],
          [
            "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
            "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"
          ],
          [
            "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
            "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"
          ],
          [
            "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
            "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"
          ],
          [
            "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
            "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"
          ],
          [
            "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
            "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"
          ],
          [
            "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
            "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"
          ],
          [
            "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
            "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"
          ],
          [
            "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
            "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"
          ],
          [
            "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
            "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"
          ],
          [
            "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
            "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"
          ],
          [
            "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
            "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"
          ],
          [
            "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
            "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"
          ],
          [
            "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
            "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"
          ],
          [
            "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
            "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"
          ],
          [
            "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
            "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"
          ],
          [
            "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
            "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"
          ],
          [
            "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
            "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"
          ],
          [
            "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
            "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"
          ],
          [
            "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
            "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"
          ],
          [
            "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
            "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"
          ],
          [
            "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
            "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"
          ],
          [
            "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
            "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"
          ],
          [
            "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
            "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"
          ],
          [
            "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
            "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"
          ],
          [
            "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
            "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"
          ],
          [
            "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
            "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"
          ],
          [
            "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
            "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"
          ],
          [
            "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
            "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"
          ],
          [
            "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
            "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"
          ],
          [
            "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
            "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"
          ],
          [
            "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
            "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"
          ],
          [
            "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
            "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"
          ],
          [
            "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
            "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"
          ],
          [
            "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
            "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"
          ],
          [
            "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
            "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"
          ],
          [
            "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
            "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"
          ],
          [
            "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
            "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"
          ],
          [
            "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
            "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"
          ],
          [
            "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
            "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"
          ],
          [
            "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
            "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"
          ],
          [
            "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
            "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"
          ],
          [
            "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
            "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"
          ],
          [
            "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
            "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"
          ],
          [
            "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
            "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"
          ],
          [
            "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
            "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"
          ],
          [
            "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
            "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"
          ],
          [
            "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
            "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"
          ],
          [
            "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
            "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"
          ],
          [
            "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
            "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"
          ],
          [
            "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
            "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"
          ],
          [
            "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
            "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"
          ],
          [
            "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
            "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"
          ],
          [
            "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
            "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"
          ],
          [
            "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
            "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"
          ],
          [
            "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
            "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"
          ],
          [
            "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
            "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"
          ],
          [
            "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
            "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"
          ],
          [
            "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
            "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"
          ],
          [
            "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
            "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"
          ],
          [
            "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
            "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"
          ],
          [
            "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
            "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"
          ],
          [
            "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
            "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"
          ],
          [
            "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
            "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"
          ],
          [
            "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
            "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"
          ],
          [
            "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
            "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"
          ],
          [
            "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
            "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"
          ],
          [
            "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
            "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"
          ],
          [
            "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
            "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"
          ],
          [
            "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
            "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"
          ],
          [
            "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
            "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"
          ],
          [
            "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
            "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"
          ],
          [
            "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
            "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"
          ],
          [
            "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
            "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"
          ],
          [
            "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
            "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"
          ],
          [
            "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
            "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"
          ],
          [
            "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
            "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"
          ],
          [
            "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
            "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"
          ],
          [
            "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
            "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"
          ],
          [
            "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
            "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"
          ],
          [
            "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
            "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"
          ],
          [
            "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
            "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"
          ],
          [
            "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
            "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"
          ],
          [
            "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
            "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"
          ],
          [
            "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
            "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"
          ],
          [
            "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
            "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"
          ],
          [
            "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
            "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"
          ],
          [
            "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
            "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"
          ],
          [
            "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
            "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"
          ],
          [
            "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
            "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"
          ],
          [
            "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
            "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"
          ],
          [
            "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
            "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"
          ],
          [
            "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
            "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"
          ],
          [
            "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
            "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"
          ],
          [
            "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
            "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"
          ],
          [
            "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
            "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"
          ],
          [
            "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
            "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"
          ],
          [
            "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
            "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"
          ],
          [
            "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
            "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"
          ],
          [
            "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
            "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"
          ],
          [
            "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
            "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"
          ],
          [
            "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
            "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"
          ],
          [
            "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
            "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"
          ],
          [
            "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
            "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"
          ],
          [
            "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
            "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"
          ],
          [
            "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
            "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"
          ],
          [
            "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
            "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"
          ],
          [
            "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
            "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"
          ],
          [
            "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
            "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"
          ],
          [
            "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
            "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"
          ],
          [
            "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
            "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"
          ],
          [
            "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
            "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"
          ],
          [
            "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
            "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"
          ],
          [
            "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
            "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"
          ],
          [
            "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
            "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"
          ],
          [
            "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
            "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"
          ],
          [
            "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
            "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"
          ],
          [
            "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
            "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"
          ],
          [
            "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
            "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"
          ],
          [
            "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
            "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"
          ],
          [
            "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
            "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"
          ],
          [
            "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
            "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"
          ],
          [
            "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
            "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"
          ],
          [
            "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
            "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"
          ],
          [
            "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
            "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"
          ],
          [
            "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
            "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"
          ],
          [
            "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
            "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"
          ]
        ]
      }
    };
  }
});

// node_modules/elliptic/lib/elliptic/curves.js
var require_curves = __commonJS({
  "node_modules/elliptic/lib/elliptic/curves.js"(exports) {
    "use strict";
    var curves = exports;
    var hash = require_hash();
    var curve = require_curve();
    var utils = require_utils2();
    var assert2 = utils.assert;
    function PresetCurve(options) {
      if (options.type === "short")
        this.curve = new curve.short(options);
      else if (options.type === "edwards")
        this.curve = new curve.edwards(options);
      else
        this.curve = new curve.mont(options);
      this.g = this.curve.g;
      this.n = this.curve.n;
      this.hash = options.hash;
      assert2(this.g.validate(), "Invalid curve");
      assert2(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
    }
    curves.PresetCurve = PresetCurve;
    function defineCurve(name, options) {
      Object.defineProperty(curves, name, {
        configurable: true,
        enumerable: true,
        get: function() {
          var curve2 = new PresetCurve(options);
          Object.defineProperty(curves, name, {
            configurable: true,
            enumerable: true,
            value: curve2
          });
          return curve2;
        }
      });
    }
    defineCurve("p192", {
      type: "short",
      prime: "p192",
      p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
      b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
      n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
      hash: hash.sha256,
      gRed: false,
      g: [
        "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
        "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
      ]
    });
    defineCurve("p224", {
      type: "short",
      prime: "p224",
      p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
      b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
      n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
      hash: hash.sha256,
      gRed: false,
      g: [
        "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
        "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
      ]
    });
    defineCurve("p256", {
      type: "short",
      prime: null,
      p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
      a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
      b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
      n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
      hash: hash.sha256,
      gRed: false,
      g: [
        "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
        "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
      ]
    });
    defineCurve("p384", {
      type: "short",
      prime: null,
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
      a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
      b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
      n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
      hash: hash.sha384,
      gRed: false,
      g: [
        "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
        "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
      ]
    });
    defineCurve("p521", {
      type: "short",
      prime: null,
      p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
      a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
      b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
      n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
      hash: hash.sha512,
      gRed: false,
      g: [
        "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
        "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
      ]
    });
    defineCurve("curve25519", {
      type: "mont",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "76d06",
      b: "1",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: hash.sha256,
      gRed: false,
      g: [
        "9"
      ]
    });
    defineCurve("ed25519", {
      type: "edwards",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "-1",
      c: "1",
      // -121665 * (121666^(-1)) (mod P)
      d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: hash.sha256,
      gRed: false,
      g: [
        "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
        // 4/5
        "6666666666666666666666666666666666666666666666666666666666666658"
      ]
    });
    var pre;
    try {
      pre = require_secp256k1();
    } catch (e) {
      pre = void 0;
    }
    defineCurve("secp256k1", {
      type: "short",
      prime: "k256",
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      a: "0",
      b: "7",
      n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
      h: "1",
      hash: hash.sha256,
      // Precomputed endomorphism
      beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
      lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
      basis: [
        {
          a: "3086d221a7d46bcde86c90e49284eb15",
          b: "-e4437ed6010e88286f547fa90abfe4c3"
        },
        {
          a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
          b: "3086d221a7d46bcde86c90e49284eb15"
        }
      ],
      gRed: false,
      g: [
        "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
        "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
        pre
      ]
    });
  }
});

// node_modules/hmac-drbg/lib/hmac-drbg.js
var require_hmac_drbg = __commonJS({
  "node_modules/hmac-drbg/lib/hmac-drbg.js"(exports, module) {
    "use strict";
    var hash = require_hash();
    var utils = require_utils();
    var assert2 = require_minimalistic_assert();
    function HmacDRBG(options) {
      if (!(this instanceof HmacDRBG))
        return new HmacDRBG(options);
      this.hash = options.hash;
      this.predResist = !!options.predResist;
      this.outLen = this.hash.outSize;
      this.minEntropy = options.minEntropy || this.hash.hmacStrength;
      this._reseed = null;
      this.reseedInterval = null;
      this.K = null;
      this.V = null;
      var entropy = utils.toArray(options.entropy, options.entropyEnc || "hex");
      var nonce = utils.toArray(options.nonce, options.nonceEnc || "hex");
      var pers = utils.toArray(options.pers, options.persEnc || "hex");
      assert2(
        entropy.length >= this.minEntropy / 8,
        "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
      );
      this._init(entropy, nonce, pers);
    }
    module.exports = HmacDRBG;
    HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
      var seed = entropy.concat(nonce).concat(pers);
      this.K = new Array(this.outLen / 8);
      this.V = new Array(this.outLen / 8);
      for (var i3 = 0; i3 < this.V.length; i3++) {
        this.K[i3] = 0;
        this.V[i3] = 1;
      }
      this._update(seed);
      this._reseed = 1;
      this.reseedInterval = 281474976710656;
    };
    HmacDRBG.prototype._hmac = function hmac() {
      return new hash.hmac(this.hash, this.K);
    };
    HmacDRBG.prototype._update = function update(seed) {
      var kmac = this._hmac().update(this.V).update([0]);
      if (seed)
        kmac = kmac.update(seed);
      this.K = kmac.digest();
      this.V = this._hmac().update(this.V).digest();
      if (!seed)
        return;
      this.K = this._hmac().update(this.V).update([1]).update(seed).digest();
      this.V = this._hmac().update(this.V).digest();
    };
    HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
      if (typeof entropyEnc !== "string") {
        addEnc = add;
        add = entropyEnc;
        entropyEnc = null;
      }
      entropy = utils.toArray(entropy, entropyEnc);
      add = utils.toArray(add, addEnc);
      assert2(
        entropy.length >= this.minEntropy / 8,
        "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
      );
      this._update(entropy.concat(add || []));
      this._reseed = 1;
    };
    HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
      if (this._reseed > this.reseedInterval)
        throw new Error("Reseed is required");
      if (typeof enc !== "string") {
        addEnc = add;
        add = enc;
        enc = null;
      }
      if (add) {
        add = utils.toArray(add, addEnc || "hex");
        this._update(add);
      }
      var temp = [];
      while (temp.length < len) {
        this.V = this._hmac().update(this.V).digest();
        temp = temp.concat(this.V);
      }
      var res = temp.slice(0, len);
      this._update(add);
      this._reseed++;
      return utils.encode(res, enc);
    };
  }
});

// node_modules/elliptic/lib/elliptic/ec/key.js
var require_key = __commonJS({
  "node_modules/elliptic/lib/elliptic/ec/key.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var utils = require_utils2();
    var assert2 = utils.assert;
    function KeyPair(ec2, options) {
      this.ec = ec2;
      this.priv = null;
      this.pub = null;
      if (options.priv)
        this._importPrivate(options.priv, options.privEnc);
      if (options.pub)
        this._importPublic(options.pub, options.pubEnc);
    }
    module.exports = KeyPair;
    KeyPair.fromPublic = function fromPublic(ec2, pub, enc) {
      if (pub instanceof KeyPair)
        return pub;
      return new KeyPair(ec2, {
        pub,
        pubEnc: enc
      });
    };
    KeyPair.fromPrivate = function fromPrivate(ec2, priv, enc) {
      if (priv instanceof KeyPair)
        return priv;
      return new KeyPair(ec2, {
        priv,
        privEnc: enc
      });
    };
    KeyPair.prototype.validate = function validate4() {
      var pub = this.getPublic();
      if (pub.isInfinity())
        return { result: false, reason: "Invalid public key" };
      if (!pub.validate())
        return { result: false, reason: "Public key is not a point" };
      if (!pub.mul(this.ec.curve.n).isInfinity())
        return { result: false, reason: "Public key * N != O" };
      return { result: true, reason: null };
    };
    KeyPair.prototype.getPublic = function getPublic(compact, enc) {
      if (typeof compact === "string") {
        enc = compact;
        compact = null;
      }
      if (!this.pub)
        this.pub = this.ec.g.mul(this.priv);
      if (!enc)
        return this.pub;
      return this.pub.encode(enc, compact);
    };
    KeyPair.prototype.getPrivate = function getPrivate(enc) {
      if (enc === "hex")
        return this.priv.toString(16, 2);
      else
        return this.priv;
    };
    KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
      this.priv = new BN(key, enc || 16);
      this.priv = this.priv.umod(this.ec.curve.n);
    };
    KeyPair.prototype._importPublic = function _importPublic(key, enc) {
      if (key.x || key.y) {
        if (this.ec.curve.type === "mont") {
          assert2(key.x, "Need x coordinate");
        } else if (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") {
          assert2(key.x && key.y, "Need both x and y coordinate");
        }
        this.pub = this.ec.curve.point(key.x, key.y);
        return;
      }
      this.pub = this.ec.curve.decodePoint(key, enc);
    };
    KeyPair.prototype.derive = function derive(pub) {
      if (!pub.validate()) {
        assert2(pub.validate(), "public point not validated");
      }
      return pub.mul(this.priv).getX();
    };
    KeyPair.prototype.sign = function sign(msg, enc, options) {
      return this.ec.sign(msg, this, enc, options);
    };
    KeyPair.prototype.verify = function verify(msg, signature, options) {
      return this.ec.verify(msg, signature, this, void 0, options);
    };
    KeyPair.prototype.inspect = function inspect() {
      return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
    };
  }
});

// node_modules/elliptic/lib/elliptic/ec/signature.js
var require_signature = __commonJS({
  "node_modules/elliptic/lib/elliptic/ec/signature.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var utils = require_utils2();
    var assert2 = utils.assert;
    function Signature(options, enc) {
      if (options instanceof Signature)
        return options;
      if (this._importDER(options, enc))
        return;
      assert2(options.r && options.s, "Signature without r or s");
      this.r = new BN(options.r, 16);
      this.s = new BN(options.s, 16);
      if (options.recoveryParam === void 0)
        this.recoveryParam = null;
      else
        this.recoveryParam = options.recoveryParam;
    }
    module.exports = Signature;
    function Position() {
      this.place = 0;
    }
    function getLength(buf, p4) {
      var initial = buf[p4.place++];
      if (!(initial & 128)) {
        return initial;
      }
      var octetLen = initial & 15;
      if (octetLen === 0 || octetLen > 4) {
        return false;
      }
      if (buf[p4.place] === 0) {
        return false;
      }
      var val = 0;
      for (var i3 = 0, off = p4.place; i3 < octetLen; i3++, off++) {
        val <<= 8;
        val |= buf[off];
        val >>>= 0;
      }
      if (val <= 127) {
        return false;
      }
      p4.place = off;
      return val;
    }
    function rmPadding(buf) {
      var i3 = 0;
      var len = buf.length - 1;
      while (!buf[i3] && !(buf[i3 + 1] & 128) && i3 < len) {
        i3++;
      }
      if (i3 === 0) {
        return buf;
      }
      return buf.slice(i3);
    }
    Signature.prototype._importDER = function _importDER(data, enc) {
      data = utils.toArray(data, enc);
      var p4 = new Position();
      if (data[p4.place++] !== 48) {
        return false;
      }
      var len = getLength(data, p4);
      if (len === false) {
        return false;
      }
      if (len + p4.place !== data.length) {
        return false;
      }
      if (data[p4.place++] !== 2) {
        return false;
      }
      var rlen = getLength(data, p4);
      if (rlen === false) {
        return false;
      }
      if ((data[p4.place] & 128) !== 0) {
        return false;
      }
      var r3 = data.slice(p4.place, rlen + p4.place);
      p4.place += rlen;
      if (data[p4.place++] !== 2) {
        return false;
      }
      var slen = getLength(data, p4);
      if (slen === false) {
        return false;
      }
      if (data.length !== slen + p4.place) {
        return false;
      }
      if ((data[p4.place] & 128) !== 0) {
        return false;
      }
      var s2 = data.slice(p4.place, slen + p4.place);
      if (r3[0] === 0) {
        if (r3[1] & 128) {
          r3 = r3.slice(1);
        } else {
          return false;
        }
      }
      if (s2[0] === 0) {
        if (s2[1] & 128) {
          s2 = s2.slice(1);
        } else {
          return false;
        }
      }
      this.r = new BN(r3);
      this.s = new BN(s2);
      this.recoveryParam = null;
      return true;
    };
    function constructLength(arr, len) {
      if (len < 128) {
        arr.push(len);
        return;
      }
      var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
      arr.push(octets | 128);
      while (--octets) {
        arr.push(len >>> (octets << 3) & 255);
      }
      arr.push(len);
    }
    Signature.prototype.toDER = function toDER(enc) {
      var r3 = this.r.toArray();
      var s2 = this.s.toArray();
      if (r3[0] & 128)
        r3 = [0].concat(r3);
      if (s2[0] & 128)
        s2 = [0].concat(s2);
      r3 = rmPadding(r3);
      s2 = rmPadding(s2);
      while (!s2[0] && !(s2[1] & 128)) {
        s2 = s2.slice(1);
      }
      var arr = [2];
      constructLength(arr, r3.length);
      arr = arr.concat(r3);
      arr.push(2);
      constructLength(arr, s2.length);
      var backHalf = arr.concat(s2);
      var res = [48];
      constructLength(res, backHalf.length);
      res = res.concat(backHalf);
      return utils.encode(res, enc);
    };
  }
});

// node_modules/elliptic/lib/elliptic/ec/index.js
var require_ec = __commonJS({
  "node_modules/elliptic/lib/elliptic/ec/index.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var HmacDRBG = require_hmac_drbg();
    var utils = require_utils2();
    var curves = require_curves();
    var rand = require_brorand();
    var assert2 = utils.assert;
    var KeyPair = require_key();
    var Signature = require_signature();
    function EC(options) {
      if (!(this instanceof EC))
        return new EC(options);
      if (typeof options === "string") {
        assert2(
          Object.prototype.hasOwnProperty.call(curves, options),
          "Unknown curve " + options
        );
        options = curves[options];
      }
      if (options instanceof curves.PresetCurve)
        options = { curve: options };
      this.curve = options.curve.curve;
      this.n = this.curve.n;
      this.nh = this.n.ushrn(1);
      this.g = this.curve.g;
      this.g = options.curve.g;
      this.g.precompute(options.curve.n.bitLength() + 1);
      this.hash = options.hash || options.curve.hash;
    }
    module.exports = EC;
    EC.prototype.keyPair = function keyPair(options) {
      return new KeyPair(this, options);
    };
    EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
      return KeyPair.fromPrivate(this, priv, enc);
    };
    EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
      return KeyPair.fromPublic(this, pub, enc);
    };
    EC.prototype.genKeyPair = function genKeyPair(options) {
      if (!options)
        options = {};
      var drbg = new HmacDRBG({
        hash: this.hash,
        pers: options.pers,
        persEnc: options.persEnc || "utf8",
        entropy: options.entropy || rand(this.hash.hmacStrength),
        entropyEnc: options.entropy && options.entropyEnc || "utf8",
        nonce: this.n.toArray()
      });
      var bytes = this.n.byteLength();
      var ns22 = this.n.sub(new BN(2));
      for (; ; ) {
        var priv = new BN(drbg.generate(bytes));
        if (priv.cmp(ns22) > 0)
          continue;
        priv.iaddn(1);
        return this.keyFromPrivate(priv);
      }
    };
    EC.prototype._truncateToN = function _truncateToN(msg, truncOnly, bitLength) {
      var byteLength;
      if (BN.isBN(msg) || typeof msg === "number") {
        msg = new BN(msg, 16);
        byteLength = msg.byteLength();
      } else if (typeof msg === "object") {
        byteLength = msg.length;
        msg = new BN(msg, 16);
      } else {
        var str = msg.toString();
        byteLength = str.length + 1 >>> 1;
        msg = new BN(str, 16);
      }
      if (typeof bitLength !== "number") {
        bitLength = byteLength * 8;
      }
      var delta = bitLength - this.n.bitLength();
      if (delta > 0)
        msg = msg.ushrn(delta);
      if (!truncOnly && msg.cmp(this.n) >= 0)
        return msg.sub(this.n);
      else
        return msg;
    };
    EC.prototype.sign = function sign(msg, key, enc, options) {
      if (typeof enc === "object") {
        options = enc;
        enc = null;
      }
      if (!options)
        options = {};
      if (typeof msg !== "string" && typeof msg !== "number" && !BN.isBN(msg)) {
        assert2(
          typeof msg === "object" && msg && typeof msg.length === "number",
          "Expected message to be an array-like, a hex string, or a BN instance"
        );
        assert2(msg.length >>> 0 === msg.length);
        for (var i3 = 0; i3 < msg.length; i3++)
          assert2((msg[i3] & 255) === msg[i3]);
      }
      key = this.keyFromPrivate(key, enc);
      msg = this._truncateToN(msg, false, options.msgBitLength);
      assert2(!msg.isNeg(), "Can not sign a negative message");
      var bytes = this.n.byteLength();
      var bkey = key.getPrivate().toArray("be", bytes);
      var nonce = msg.toArray("be", bytes);
      assert2(new BN(nonce).eq(msg), "Can not sign message");
      var drbg = new HmacDRBG({
        hash: this.hash,
        entropy: bkey,
        nonce,
        pers: options.pers,
        persEnc: options.persEnc || "utf8"
      });
      var ns1 = this.n.sub(new BN(1));
      for (var iter = 0; ; iter++) {
        var k5 = options.k ? options.k(iter) : new BN(drbg.generate(this.n.byteLength()));
        k5 = this._truncateToN(k5, true);
        if (k5.cmpn(1) <= 0 || k5.cmp(ns1) >= 0)
          continue;
        var kp = this.g.mul(k5);
        if (kp.isInfinity())
          continue;
        var kpX = kp.getX();
        var r3 = kpX.umod(this.n);
        if (r3.cmpn(0) === 0)
          continue;
        var s2 = k5.invm(this.n).mul(r3.mul(key.getPrivate()).iadd(msg));
        s2 = s2.umod(this.n);
        if (s2.cmpn(0) === 0)
          continue;
        var recoveryParam = (kp.getY().isOdd() ? 1 : 0) | (kpX.cmp(r3) !== 0 ? 2 : 0);
        if (options.canonical && s2.cmp(this.nh) > 0) {
          s2 = this.n.sub(s2);
          recoveryParam ^= 1;
        }
        return new Signature({ r: r3, s: s2, recoveryParam });
      }
    };
    EC.prototype.verify = function verify(msg, signature, key, enc, options) {
      if (!options)
        options = {};
      msg = this._truncateToN(msg, false, options.msgBitLength);
      key = this.keyFromPublic(key, enc);
      signature = new Signature(signature, "hex");
      var r3 = signature.r;
      var s2 = signature.s;
      if (r3.cmpn(1) < 0 || r3.cmp(this.n) >= 0)
        return false;
      if (s2.cmpn(1) < 0 || s2.cmp(this.n) >= 0)
        return false;
      var sinv = s2.invm(this.n);
      var u1 = sinv.mul(msg).umod(this.n);
      var u22 = sinv.mul(r3).umod(this.n);
      var p4;
      if (!this.curve._maxwellTrick) {
        p4 = this.g.mulAdd(u1, key.getPublic(), u22);
        if (p4.isInfinity())
          return false;
        return p4.getX().umod(this.n).cmp(r3) === 0;
      }
      p4 = this.g.jmulAdd(u1, key.getPublic(), u22);
      if (p4.isInfinity())
        return false;
      return p4.eqXToP(r3);
    };
    EC.prototype.recoverPubKey = function(msg, signature, j5, enc) {
      assert2((3 & j5) === j5, "The recovery param is more than two bits");
      signature = new Signature(signature, enc);
      var n3 = this.n;
      var e = new BN(msg);
      var r3 = signature.r;
      var s2 = signature.s;
      var isYOdd = j5 & 1;
      var isSecondKey = j5 >> 1;
      if (r3.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
        throw new Error("Unable to find sencond key candinate");
      if (isSecondKey)
        r3 = this.curve.pointFromX(r3.add(this.curve.n), isYOdd);
      else
        r3 = this.curve.pointFromX(r3, isYOdd);
      var rInv = signature.r.invm(n3);
      var s1 = n3.sub(e).mul(rInv).umod(n3);
      var s22 = s2.mul(rInv).umod(n3);
      return this.g.mulAdd(s1, r3, s22);
    };
    EC.prototype.getKeyRecoveryParam = function(e, signature, Q4, enc) {
      signature = new Signature(signature, enc);
      if (signature.recoveryParam !== null)
        return signature.recoveryParam;
      for (var i3 = 0; i3 < 4; i3++) {
        var Qprime;
        try {
          Qprime = this.recoverPubKey(e, signature, i3);
        } catch (e2) {
          continue;
        }
        if (Qprime.eq(Q4))
          return i3;
      }
      throw new Error("Unable to find valid recovery factor");
    };
  }
});

// node_modules/elliptic/lib/elliptic/eddsa/key.js
var require_key2 = __commonJS({
  "node_modules/elliptic/lib/elliptic/eddsa/key.js"(exports, module) {
    "use strict";
    var utils = require_utils2();
    var assert2 = utils.assert;
    var parseBytes = utils.parseBytes;
    var cachedProperty = utils.cachedProperty;
    function KeyPair(eddsa, params) {
      this.eddsa = eddsa;
      this._secret = parseBytes(params.secret);
      if (eddsa.isPoint(params.pub))
        this._pub = params.pub;
      else
        this._pubBytes = parseBytes(params.pub);
    }
    KeyPair.fromPublic = function fromPublic(eddsa, pub) {
      if (pub instanceof KeyPair)
        return pub;
      return new KeyPair(eddsa, { pub });
    };
    KeyPair.fromSecret = function fromSecret(eddsa, secret) {
      if (secret instanceof KeyPair)
        return secret;
      return new KeyPair(eddsa, { secret });
    };
    KeyPair.prototype.secret = function secret() {
      return this._secret;
    };
    cachedProperty(KeyPair, "pubBytes", function pubBytes() {
      return this.eddsa.encodePoint(this.pub());
    });
    cachedProperty(KeyPair, "pub", function pub() {
      if (this._pubBytes)
        return this.eddsa.decodePoint(this._pubBytes);
      return this.eddsa.g.mul(this.priv());
    });
    cachedProperty(KeyPair, "privBytes", function privBytes() {
      var eddsa = this.eddsa;
      var hash = this.hash();
      var lastIx = eddsa.encodingLength - 1;
      var a3 = hash.slice(0, eddsa.encodingLength);
      a3[0] &= 248;
      a3[lastIx] &= 127;
      a3[lastIx] |= 64;
      return a3;
    });
    cachedProperty(KeyPair, "priv", function priv() {
      return this.eddsa.decodeInt(this.privBytes());
    });
    cachedProperty(KeyPair, "hash", function hash() {
      return this.eddsa.hash().update(this.secret()).digest();
    });
    cachedProperty(KeyPair, "messagePrefix", function messagePrefix() {
      return this.hash().slice(this.eddsa.encodingLength);
    });
    KeyPair.prototype.sign = function sign(message) {
      assert2(this._secret, "KeyPair can only verify");
      return this.eddsa.sign(message, this);
    };
    KeyPair.prototype.verify = function verify(message, sig) {
      return this.eddsa.verify(message, sig, this);
    };
    KeyPair.prototype.getSecret = function getSecret(enc) {
      assert2(this._secret, "KeyPair is public only");
      return utils.encode(this.secret(), enc);
    };
    KeyPair.prototype.getPublic = function getPublic(enc) {
      return utils.encode(this.pubBytes(), enc);
    };
    module.exports = KeyPair;
  }
});

// node_modules/elliptic/lib/elliptic/eddsa/signature.js
var require_signature2 = __commonJS({
  "node_modules/elliptic/lib/elliptic/eddsa/signature.js"(exports, module) {
    "use strict";
    var BN = require_bn();
    var utils = require_utils2();
    var assert2 = utils.assert;
    var cachedProperty = utils.cachedProperty;
    var parseBytes = utils.parseBytes;
    function Signature(eddsa, sig) {
      this.eddsa = eddsa;
      if (typeof sig !== "object")
        sig = parseBytes(sig);
      if (Array.isArray(sig)) {
        assert2(sig.length === eddsa.encodingLength * 2, "Signature has invalid size");
        sig = {
          R: sig.slice(0, eddsa.encodingLength),
          S: sig.slice(eddsa.encodingLength)
        };
      }
      assert2(sig.R && sig.S, "Signature without R or S");
      if (eddsa.isPoint(sig.R))
        this._R = sig.R;
      if (sig.S instanceof BN)
        this._S = sig.S;
      this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
      this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
    }
    cachedProperty(Signature, "S", function S4() {
      return this.eddsa.decodeInt(this.Sencoded());
    });
    cachedProperty(Signature, "R", function R4() {
      return this.eddsa.decodePoint(this.Rencoded());
    });
    cachedProperty(Signature, "Rencoded", function Rencoded() {
      return this.eddsa.encodePoint(this.R());
    });
    cachedProperty(Signature, "Sencoded", function Sencoded() {
      return this.eddsa.encodeInt(this.S());
    });
    Signature.prototype.toBytes = function toBytes3() {
      return this.Rencoded().concat(this.Sencoded());
    };
    Signature.prototype.toHex = function toHex3() {
      return utils.encode(this.toBytes(), "hex").toUpperCase();
    };
    module.exports = Signature;
  }
});

// node_modules/elliptic/lib/elliptic/eddsa/index.js
var require_eddsa = __commonJS({
  "node_modules/elliptic/lib/elliptic/eddsa/index.js"(exports, module) {
    "use strict";
    var hash = require_hash();
    var curves = require_curves();
    var utils = require_utils2();
    var assert2 = utils.assert;
    var parseBytes = utils.parseBytes;
    var KeyPair = require_key2();
    var Signature = require_signature2();
    function EDDSA(curve) {
      assert2(curve === "ed25519", "only tested with ed25519 so far");
      if (!(this instanceof EDDSA))
        return new EDDSA(curve);
      curve = curves[curve].curve;
      this.curve = curve;
      this.g = curve.g;
      this.g.precompute(curve.n.bitLength() + 1);
      this.pointClass = curve.point().constructor;
      this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
      this.hash = hash.sha512;
    }
    module.exports = EDDSA;
    EDDSA.prototype.sign = function sign(message, secret) {
      message = parseBytes(message);
      var key = this.keyFromSecret(secret);
      var r3 = this.hashInt(key.messagePrefix(), message);
      var R4 = this.g.mul(r3);
      var Rencoded = this.encodePoint(R4);
      var s_ = this.hashInt(Rencoded, key.pubBytes(), message).mul(key.priv());
      var S4 = r3.add(s_).umod(this.curve.n);
      return this.makeSignature({ R: R4, S: S4, Rencoded });
    };
    EDDSA.prototype.verify = function verify(message, sig, pub) {
      message = parseBytes(message);
      sig = this.makeSignature(sig);
      if (sig.S().gte(sig.eddsa.curve.n) || sig.S().isNeg()) {
        return false;
      }
      var key = this.keyFromPublic(pub);
      var h5 = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
      var SG = this.g.mul(sig.S());
      var RplusAh = sig.R().add(key.pub().mul(h5));
      return RplusAh.eq(SG);
    };
    EDDSA.prototype.hashInt = function hashInt() {
      var hash2 = this.hash();
      for (var i3 = 0; i3 < arguments.length; i3++)
        hash2.update(arguments[i3]);
      return utils.intFromLE(hash2.digest()).umod(this.curve.n);
    };
    EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
      return KeyPair.fromPublic(this, pub);
    };
    EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
      return KeyPair.fromSecret(this, secret);
    };
    EDDSA.prototype.makeSignature = function makeSignature(sig) {
      if (sig instanceof Signature)
        return sig;
      return new Signature(this, sig);
    };
    EDDSA.prototype.encodePoint = function encodePoint(point) {
      var enc = point.getY().toArray("le", this.encodingLength);
      enc[this.encodingLength - 1] |= point.getX().isOdd() ? 128 : 0;
      return enc;
    };
    EDDSA.prototype.decodePoint = function decodePoint(bytes) {
      bytes = utils.parseBytes(bytes);
      var lastIx = bytes.length - 1;
      var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~128);
      var xIsOdd = (bytes[lastIx] & 128) !== 0;
      var y6 = utils.intFromLE(normed);
      return this.curve.pointFromY(y6, xIsOdd);
    };
    EDDSA.prototype.encodeInt = function encodeInt(num) {
      return num.toArray("le", this.encodingLength);
    };
    EDDSA.prototype.decodeInt = function decodeInt(bytes) {
      return utils.intFromLE(bytes);
    };
    EDDSA.prototype.isPoint = function isPoint(val) {
      return val instanceof this.pointClass;
    };
  }
});

// node_modules/elliptic/lib/elliptic.js
var require_elliptic = __commonJS({
  "node_modules/elliptic/lib/elliptic.js"(exports) {
    "use strict";
    var elliptic = exports;
    elliptic.version = require_package().version;
    elliptic.utils = require_utils2();
    elliptic.rand = require_brorand();
    elliptic.curve = require_curve();
    elliptic.curves = require_curves();
    elliptic.ec = require_ec();
    elliptic.eddsa = require_eddsa();
  }
});

// node_modules/@walletconnect/ethereum-provider/dist/index.es.js
var import_events10 = __toESM(require_events());

// node_modules/@walletconnect/utils/dist/index.es.js
var import_time = __toESM(require_cjs());
var import_window_getters = __toESM(require_cjs2());
var import_window_metadata = __toESM(require_cjs3());

// node_modules/@walletconnect/utils/node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js
function publicKeyToAddress(publicKey) {
  const address = keccak256(`0x${publicKey.substring(4)}`).substring(26);
  return checksumAddress(`0x${address}`);
}

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/signature/recoverPublicKey.js
async function recoverPublicKey({ hash, signature }) {
  const hashHex = isHex(hash) ? hash : toHex(hash);
  const { secp256k1: secp256k12 } = await import("./secp256k1-DBGV4H26.js");
  const signature_ = (() => {
    if (typeof signature === "object" && "r" in signature && "s" in signature) {
      const { r: r3, s: s2, v: v6, yParity } = signature;
      const yParityOrV2 = Number(yParity ?? v6);
      const recoveryBit2 = toRecoveryBit(yParityOrV2);
      return new secp256k12.Signature(hexToBigInt(r3), hexToBigInt(s2)).addRecoveryBit(recoveryBit2);
    }
    const signatureHex = isHex(signature) ? signature : toHex(signature);
    const yParityOrV = hexToNumber(`0x${signatureHex.slice(130)}`);
    const recoveryBit = toRecoveryBit(yParityOrV);
    return secp256k12.Signature.fromCompact(signatureHex.substring(2, 130)).addRecoveryBit(recoveryBit);
  })();
  const publicKey = signature_.recoverPublicKey(hashHex.substring(2)).toHex(false);
  return `0x${publicKey}`;
}
function toRecoveryBit(yParityOrV) {
  if (yParityOrV === 0 || yParityOrV === 1)
    return yParityOrV;
  if (yParityOrV === 27)
    return 0;
  if (yParityOrV === 28)
    return 1;
  throw new Error("Invalid yParityOrV value");
}

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/signature/recoverAddress.js
async function recoverAddress({ hash, signature }) {
  return publicKeyToAddress(await recoverPublicKey({ hash, signature }));
}

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/formatters/transaction.js
var transactionType = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
  "0x3": "eip4844",
  "0x4": "eip7702"
};
function formatTransaction(transaction) {
  const transaction_ = {
    ...transaction,
    blockHash: transaction.blockHash ? transaction.blockHash : null,
    blockNumber: transaction.blockNumber ? BigInt(transaction.blockNumber) : null,
    chainId: transaction.chainId ? hexToNumber(transaction.chainId) : void 0,
    gas: transaction.gas ? BigInt(transaction.gas) : void 0,
    gasPrice: transaction.gasPrice ? BigInt(transaction.gasPrice) : void 0,
    maxFeePerBlobGas: transaction.maxFeePerBlobGas ? BigInt(transaction.maxFeePerBlobGas) : void 0,
    maxFeePerGas: transaction.maxFeePerGas ? BigInt(transaction.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ? BigInt(transaction.maxPriorityFeePerGas) : void 0,
    nonce: transaction.nonce ? hexToNumber(transaction.nonce) : void 0,
    to: transaction.to ? transaction.to : null,
    transactionIndex: transaction.transactionIndex ? Number(transaction.transactionIndex) : null,
    type: transaction.type ? transactionType[transaction.type] : void 0,
    typeHex: transaction.type ? transaction.type : void 0,
    value: transaction.value ? BigInt(transaction.value) : void 0,
    v: transaction.v ? BigInt(transaction.v) : void 0
  };
  if (transaction.authorizationList)
    transaction_.authorizationList = formatAuthorizationList(transaction.authorizationList);
  transaction_.yParity = (() => {
    if (transaction.yParity)
      return Number(transaction.yParity);
    if (typeof transaction_.v === "bigint") {
      if (transaction_.v === 0n || transaction_.v === 27n)
        return 0;
      if (transaction_.v === 1n || transaction_.v === 28n)
        return 1;
      if (transaction_.v >= 35n)
        return transaction_.v % 2n === 0n ? 1 : 0;
    }
    return void 0;
  })();
  if (transaction_.type === "legacy") {
    delete transaction_.accessList;
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
    delete transaction_.yParity;
  }
  if (transaction_.type === "eip2930") {
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
  }
  if (transaction_.type === "eip1559") {
    delete transaction_.maxFeePerBlobGas;
  }
  return transaction_;
}
var defineTransaction = defineFormatter("transaction", formatTransaction);
function formatAuthorizationList(authorizationList) {
  return authorizationList.map((authorization) => ({
    contractAddress: authorization.address,
    chainId: Number(authorization.chainId),
    nonce: Number(authorization.nonce),
    r: authorization.r,
    s: authorization.s,
    yParity: Number(authorization.yParity)
  }));
}

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/formatters/block.js
function formatBlock(block) {
  const transactions = (block.transactions ?? []).map((transaction) => {
    if (typeof transaction === "string")
      return transaction;
    return formatTransaction(transaction);
  });
  return {
    ...block,
    baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
    blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : void 0,
    difficulty: block.difficulty ? BigInt(block.difficulty) : void 0,
    excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : void 0,
    gasLimit: block.gasLimit ? BigInt(block.gasLimit) : void 0,
    gasUsed: block.gasUsed ? BigInt(block.gasUsed) : void 0,
    hash: block.hash ? block.hash : null,
    logsBloom: block.logsBloom ? block.logsBloom : null,
    nonce: block.nonce ? block.nonce : null,
    number: block.number ? BigInt(block.number) : null,
    size: block.size ? BigInt(block.size) : void 0,
    timestamp: block.timestamp ? BigInt(block.timestamp) : void 0,
    transactions,
    totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
  };
}
var defineBlock = defineFormatter("block", formatBlock);

// node_modules/@walletconnect/utils/node_modules/viem/_esm/actions/public/getTransactionCount.js
async function getTransactionCount(client, { address, blockTag = "latest", blockNumber }) {
  const count = await client.request({
    method: "eth_getTransactionCount",
    params: [address, blockNumber ? numberToHex(blockNumber) : blockTag]
  }, { dedupe: Boolean(blockNumber) });
  return hexToNumber(count);
}

// node_modules/@walletconnect/utils/node_modules/viem/_esm/constants/blob.js
var blobsPerTransaction = 6;
var bytesPerFieldElement = 32;
var fieldElementsPerBlob = 4096;
var bytesPerBlob = bytesPerFieldElement * fieldElementsPerBlob;
var maxBytesPerTransaction = bytesPerBlob * blobsPerTransaction - // terminator byte (0x80).
1 - // zero byte (0x00) appended to each field element.
1 * fieldElementsPerBlob * blobsPerTransaction;

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/formatters/log.js
function formatLog(log, { args, eventName } = {}) {
  return {
    ...log,
    blockHash: log.blockHash ? log.blockHash : null,
    blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
    logIndex: log.logIndex ? Number(log.logIndex) : null,
    transactionHash: log.transactionHash ? log.transactionHash : null,
    transactionIndex: log.transactionIndex ? Number(log.transactionIndex) : null,
    ...eventName ? { args, eventName } : {}
  };
}

// node_modules/@walletconnect/utils/node_modules/viem/_esm/actions/wallet/sendTransaction.js
var supportsWalletNamespace = new LruMap(128);

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/promise/withDedupe.js
var promiseCache = new LruMap(8192);

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/rpc/id.js
function createIdStore() {
  return {
    current: 0,
    take() {
      return this.current++;
    },
    reset() {
      this.current = 0;
    }
  };
}
var idCache = createIdStore();

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/formatters/transactionReceipt.js
var receiptStatuses = {
  "0x0": "reverted",
  "0x1": "success"
};
function formatTransactionReceipt(transactionReceipt) {
  const receipt = {
    ...transactionReceipt,
    blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
    contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
    cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
    effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
    gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
    logs: transactionReceipt.logs ? transactionReceipt.logs.map((log) => formatLog(log)) : null,
    to: transactionReceipt.to ? transactionReceipt.to : null,
    transactionIndex: transactionReceipt.transactionIndex ? hexToNumber(transactionReceipt.transactionIndex) : null,
    status: transactionReceipt.status ? receiptStatuses[transactionReceipt.status] : null,
    type: transactionReceipt.type ? transactionType[transactionReceipt.type] || transactionReceipt.type : null
  };
  if (transactionReceipt.blobGasPrice)
    receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
  if (transactionReceipt.blobGasUsed)
    receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
  return receipt;
}
var defineTransactionReceipt = defineFormatter("transactionReceipt", formatTransactionReceipt);

// node_modules/@walletconnect/utils/node_modules/@noble/hashes/esm/ripemd160.js
var Rho = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]);
var Id = new Uint8Array(new Array(16).fill(0).map((_6, i3) => i3));
var Pi = Id.map((i3) => (9 * i3 + 5) % 16);
var idxL = [Id];
var idxR = [Pi];
for (let i3 = 0; i3 < 4; i3++)
  for (let j5 of [idxL, idxR])
    j5.push(j5[i3].map((k5) => Rho[k5]));
var shifts = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((i3) => new Uint8Array(i3));
var shiftsL = idxL.map((idx, i3) => idx.map((j5) => shifts[i3][j5]));
var shiftsR = idxR.map((idx, i3) => idx.map((j5) => shifts[i3][j5]));
var Kl = new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]);
var Kr = new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function f2(group, x7, y6, z6) {
  if (group === 0)
    return x7 ^ y6 ^ z6;
  else if (group === 1)
    return x7 & y6 | ~x7 & z6;
  else if (group === 2)
    return (x7 | ~y6) ^ z6;
  else if (group === 3)
    return x7 & z6 | y6 & ~z6;
  else
    return x7 ^ (y6 | ~z6);
}
var R_BUF = new Uint32Array(16);
var RIPEMD160 = class extends HashMD {
  constructor() {
    super(64, 20, 8, true);
    this.h0 = 1732584193 | 0;
    this.h1 = 4023233417 | 0;
    this.h2 = 2562383102 | 0;
    this.h3 = 271733878 | 0;
    this.h4 = 3285377520 | 0;
  }
  get() {
    const { h0, h1, h2: h22, h3: h32, h4: h42 } = this;
    return [h0, h1, h22, h32, h42];
  }
  set(h0, h1, h22, h32, h42) {
    this.h0 = h0 | 0;
    this.h1 = h1 | 0;
    this.h2 = h22 | 0;
    this.h3 = h32 | 0;
    this.h4 = h42 | 0;
  }
  process(view, offset) {
    for (let i3 = 0; i3 < 16; i3++, offset += 4)
      R_BUF[i3] = view.getUint32(offset, true);
    let al = this.h0 | 0, ar4 = al, bl = this.h1 | 0, br4 = bl, cl = this.h2 | 0, cr4 = cl, dl = this.h3 | 0, dr4 = dl, el = this.h4 | 0, er4 = el;
    for (let group = 0; group < 5; group++) {
      const rGroup = 4 - group;
      const hbl = Kl[group], hbr = Kr[group];
      const rl = idxL[group], rr4 = idxR[group];
      const sl = shiftsL[group], sr4 = shiftsR[group];
      for (let i3 = 0; i3 < 16; i3++) {
        const tl = rotl(al + f2(group, bl, cl, dl) + R_BUF[rl[i3]] + hbl, sl[i3]) + el | 0;
        al = el, el = dl, dl = rotl(cl, 10) | 0, cl = bl, bl = tl;
      }
      for (let i3 = 0; i3 < 16; i3++) {
        const tr4 = rotl(ar4 + f2(rGroup, br4, cr4, dr4) + R_BUF[rr4[i3]] + hbr, sr4[i3]) + er4 | 0;
        ar4 = er4, er4 = dr4, dr4 = rotl(cr4, 10) | 0, cr4 = br4, br4 = tr4;
      }
    }
    this.set(this.h1 + cl + dr4 | 0, this.h2 + dl + er4 | 0, this.h3 + el + ar4 | 0, this.h4 + al + br4 | 0, this.h0 + bl + cr4 | 0);
  }
  roundClean() {
    R_BUF.fill(0);
  }
  destroy() {
    this.destroyed = true;
    this.buffer.fill(0);
    this.set(0, 0, 0, 0, 0);
  }
};
var ripemd160 = wrapConstructor(() => new RIPEMD160());

// node_modules/@walletconnect/utils/node_modules/viem/_esm/utils/nonceManager.js
function createNonceManager(parameters) {
  const { source } = parameters;
  const deltaMap = /* @__PURE__ */ new Map();
  const nonceMap = new LruMap(8192);
  const promiseMap = /* @__PURE__ */ new Map();
  const getKey = ({ address, chainId }) => `${address}.${chainId}`;
  return {
    async consume({ address, chainId, client }) {
      const key = getKey({ address, chainId });
      const promise = this.get({ address, chainId, client });
      this.increment({ address, chainId });
      const nonce = await promise;
      await source.set({ address, chainId }, nonce);
      nonceMap.set(key, nonce);
      return nonce;
    },
    async increment({ address, chainId }) {
      const key = getKey({ address, chainId });
      const delta = deltaMap.get(key) ?? 0;
      deltaMap.set(key, delta + 1);
    },
    async get({ address, chainId, client }) {
      const key = getKey({ address, chainId });
      let promise = promiseMap.get(key);
      if (!promise) {
        promise = (async () => {
          try {
            const nonce = await source.get({ address, chainId, client });
            const previousNonce = nonceMap.get(key) ?? 0;
            if (previousNonce > 0 && nonce <= previousNonce)
              return previousNonce + 1;
            nonceMap.delete(key);
            return nonce;
          } finally {
            this.reset({ address, chainId });
          }
        })();
        promiseMap.set(key, promise);
      }
      const delta = deltaMap.get(key) ?? 0;
      return delta + await promise;
    },
    reset({ address, chainId }) {
      const key = getKey({ address, chainId });
      deltaMap.delete(key);
      promiseMap.delete(key);
    }
  };
}
function jsonRpc() {
  return {
    async get(parameters) {
      const { address, client } = parameters;
      return getTransactionCount(client, {
        address,
        blockTag: "pending"
      });
    },
    set() {
    }
  };
}
var nonceManager = createNonceManager({
  source: jsonRpc()
});

// node_modules/@noble/curves/esm/abstract/utils.js
var _0n = BigInt(0);
var _1n = BigInt(1);
var _2n = BigInt(2);
var hexes = Array.from({ length: 256 }, (_6, i3) => i3.toString(16).padStart(2, "0"));

// node_modules/ox/_esm/core/version.js
var version = "0.1.1";

// node_modules/ox/_esm/core/internal/errors.js
function getVersion() {
  return version;
}

// node_modules/ox/_esm/core/Errors.js
var BaseError2 = class _BaseError extends Error {
  constructor(shortMessage, options = {}) {
    const details = (() => {
      var _a2;
      if (options.cause instanceof _BaseError) {
        if (options.cause.details)
          return options.cause.details;
        if (options.cause.shortMessage)
          return options.cause.shortMessage;
      }
      if ((_a2 = options.cause) == null ? void 0 : _a2.message)
        return options.cause.message;
      return options.details;
    })();
    const docsPath = (() => {
      if (options.cause instanceof _BaseError)
        return options.cause.docsPath || options.docsPath;
      return options.docsPath;
    })();
    const docsBaseUrl = "https://oxlib.sh";
    const docs = `${docsBaseUrl}${docsPath ?? ""}`;
    const message = [
      shortMessage || "An error occurred.",
      ...options.metaMessages ? ["", ...options.metaMessages] : [],
      ...details || docsPath ? [
        "",
        details ? `Details: ${details}` : void 0,
        docsPath ? `See: ${docs}` : void 0
      ] : []
    ].filter((x7) => typeof x7 === "string").join("\n");
    super(message, options.cause ? { cause: options.cause } : void 0);
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseError"
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: `ox@${getVersion()}`
    });
    this.cause = options.cause;
    this.details = details;
    this.docs = docs;
    this.docsPath = docsPath;
    this.shortMessage = shortMessage;
  }
  walk(fn4) {
    return walk(this, fn4);
  }
};
function walk(err, fn4) {
  if (fn4 == null ? void 0 : fn4(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause)
    return walk(err.cause, fn4);
  return fn4 ? null : err;
}

// node_modules/ox/_esm/core/internal/bytes.js
function assertSize(bytes, size_) {
  if (size2(bytes) > size_)
    throw new SizeOverflowError({
      givenSize: size2(bytes),
      maxSize: size_
    });
}
var charCodeMap = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function pad2(bytes, options = {}) {
  const { dir, size: size4 = 32 } = options;
  if (size4 === 0)
    return bytes;
  if (bytes.length > size4)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size4,
      type: "Bytes"
    });
  const paddedBytes = new Uint8Array(size4);
  for (let i3 = 0; i3 < size4; i3++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i3 : size4 - i3 - 1] = bytes[padEnd ? i3 : bytes.length - i3 - 1];
  }
  return paddedBytes;
}

// node_modules/ox/_esm/core/internal/hex.js
function assertSize2(hex, size_) {
  if (size3(hex) > size_)
    throw new SizeOverflowError2({
      givenSize: size3(hex),
      maxSize: size_
    });
}
function pad3(hex_, options = {}) {
  const { dir, size: size4 = 32 } = options;
  if (size4 === 0)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size4 * 2)
    throw new SizeExceedsPaddingSizeError2({
      size: Math.ceil(hex.length / 2),
      targetSize: size4,
      type: "Hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size4 * 2, "0")}`;
}

// node_modules/ox/_esm/core/Bytes.js
var decoder = new TextDecoder();
var encoder = new TextEncoder();
function from(value) {
  if (value instanceof Uint8Array)
    return value;
  if (typeof value === "string")
    return fromHex2(value);
  return fromArray(value);
}
function fromArray(value) {
  return value instanceof Uint8Array ? value : new Uint8Array(value);
}
function fromHex2(value, options = {}) {
  const { size: size4 } = options;
  let hex = value;
  if (size4) {
    assertSize2(value, size4);
    hex = padRight(value, size4);
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index = 0, j5 = 0; index < length; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j5++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j5++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError2(`Invalid byte sequence ("${hexString[j5 - 2]}${hexString[j5 - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function fromString2(value, options = {}) {
  const { size: size4 } = options;
  const bytes = encoder.encode(value);
  if (typeof size4 === "number") {
    assertSize(bytes, size4);
    return padRight2(bytes, size4);
  }
  return bytes;
}
function padRight2(value, size4) {
  return pad2(value, { dir: "right", size: size4 });
}
function size2(value) {
  return value.length;
}
var SizeOverflowError = class extends BaseError2 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeOverflowError"
    });
  }
};
var SizeExceedsPaddingSizeError = class extends BaseError2 {
  constructor({ size: size4, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size4}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Bytes.SizeExceedsPaddingSizeError"
    });
  }
};

// node_modules/ox/_esm/core/Hex.js
var encoder2 = new TextEncoder();
var hexes2 = Array.from({ length: 256 }, (_v, i3) => i3.toString(16).padStart(2, "0"));
function concat3(...values) {
  return `0x${values.reduce((acc, x7) => acc + x7.replace("0x", ""), "")}`;
}
function fromBoolean(value, options = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof options.size === "number") {
    assertSize2(hex, options.size);
    return padLeft(hex, options.size);
  }
  return hex;
}
function fromBytes2(value, options = {}) {
  let string = "";
  for (let i3 = 0; i3 < value.length; i3++)
    string += hexes2[value[i3]];
  const hex = `0x${string}`;
  if (typeof options.size === "number") {
    assertSize2(hex, options.size);
    return padRight(hex, options.size);
  }
  return hex;
}
function fromNumber(value, options = {}) {
  const { signed, size: size4 } = options;
  const value_ = BigInt(value);
  let maxValue;
  if (size4) {
    if (signed)
      maxValue = (1n << BigInt(size4) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size4) * 8n) - 1n;
  } else if (typeof value === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value_ > maxValue || value_ < minValue) {
    const suffix = typeof value === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size4,
      value: `${value}${suffix}`
    });
  }
  const stringValue = (signed && value_ < 0 ? (1n << BigInt(size4 * 8)) + BigInt(value_) : value_).toString(16);
  const hex = `0x${stringValue}`;
  if (size4)
    return padLeft(hex, size4);
  return hex;
}
function fromString3(value, options = {}) {
  return fromBytes2(encoder2.encode(value), options);
}
function padLeft(value, size4) {
  return pad3(value, { dir: "left", size: size4 });
}
function padRight(value, size4) {
  return pad3(value, { dir: "right", size: size4 });
}
function size3(value) {
  return Math.ceil((value.length - 2) / 2);
}
var IntegerOutOfRangeError = class extends BaseError2 {
  constructor({ max, min, signed, size: size4, value }) {
    super(`Number \`${value}\` is not in safe${size4 ? ` ${size4 * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.IntegerOutOfRangeError"
    });
  }
};
var SizeOverflowError2 = class extends BaseError2 {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeOverflowError"
    });
  }
};
var SizeExceedsPaddingSizeError2 = class extends BaseError2 {
  constructor({ size: size4, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size4}\`) exceeds padding size (\`${targetSize}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Hex.SizeExceedsPaddingSizeError"
    });
  }
};

// node_modules/@noble/hashes/esm/_assert.js
function anumber(n3) {
  if (!Number.isSafeInteger(n3) || n3 < 0)
    throw new Error("positive integer expected, got " + n3);
}
function isBytes2(a3) {
  return a3 instanceof Uint8Array || ArrayBuffer.isView(a3) && a3.constructor.name === "Uint8Array";
}
function abytes(b3, ...lengths) {
  if (!isBytes2(b3))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b3.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b3.length);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}

// node_modules/@noble/hashes/esm/crypto.js
var crypto2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;

// node_modules/@noble/hashes/esm/utils.js
var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
var rotr = (word, shift) => word << 32 - shift | word >>> shift;
var rotl2 = (word, shift) => word << shift | word >>> 32 - shift >>> 0;
var isLE = (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
var byteSwap = (word) => word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
function byteSwap32(arr) {
  for (let i3 = 0; i3 < arr.length; i3++) {
    arr[i3] = byteSwap(arr[i3]);
  }
}
var hexes3 = Array.from({ length: 256 }, (_6, i3) => i3.toString(16).padStart(2, "0"));
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("utf8ToBytes expected string, got " + typeof str);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes2(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
var Hash = class {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
};
function wrapConstructor2(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function wrapXOFConstructorWithOpts(hashCons) {
  const hashC = (msg, opts) => hashCons(opts).update(toBytes2(msg)).digest();
  const tmp = hashCons({});
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  return hashC;
}

// node_modules/@noble/hashes/esm/_md.js
function setBigUint64(view, byteOffset, value, isLE2) {
  if (typeof view.setBigUint64 === "function")
    return view.setBigUint64(byteOffset, value, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h5 = isLE2 ? 4 : 0;
  const l5 = isLE2 ? 0 : 4;
  view.setUint32(byteOffset + h5, wh, isLE2);
  view.setUint32(byteOffset + l5, wl, isLE2);
}
var Chi = (a3, b3, c5) => a3 & b3 ^ ~a3 & c5;
var Maj = (a3, b3, c5) => a3 & b3 ^ a3 & c5 ^ b3 & c5;
var HashMD2 = class extends Hash {
  constructor(blockLen, outputLen, padOffset, isLE2) {
    super();
    this.blockLen = blockLen;
    this.outputLen = outputLen;
    this.padOffset = padOffset;
    this.isLE = isLE2;
    this.finished = false;
    this.length = 0;
    this.pos = 0;
    this.destroyed = false;
    this.buffer = new Uint8Array(blockLen);
    this.view = createView(this.buffer);
  }
  update(data) {
    aexists(this);
    const { view, buffer, blockLen } = this;
    data = toBytes2(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      if (take === blockLen) {
        const dataView = createView(data);
        for (; blockLen <= len - pos; pos += blockLen)
          this.process(dataView, pos);
        continue;
      }
      buffer.set(data.subarray(pos, pos + take), this.pos);
      this.pos += take;
      pos += take;
      if (this.pos === blockLen) {
        this.process(view, 0);
        this.pos = 0;
      }
    }
    this.length += data.length;
    this.roundClean();
    return this;
  }
  digestInto(out) {
    aexists(this);
    aoutput(out, this);
    this.finished = true;
    const { buffer, view, blockLen, isLE: isLE2 } = this;
    let { pos } = this;
    buffer[pos++] = 128;
    this.buffer.subarray(pos).fill(0);
    if (this.padOffset > blockLen - pos) {
      this.process(view, 0);
      pos = 0;
    }
    for (let i3 = pos; i3 < blockLen; i3++)
      buffer[i3] = 0;
    setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
    this.process(view, 0);
    const oview = createView(out);
    const len = this.outputLen;
    if (len % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const outLen = len / 4;
    const state = this.get();
    if (outLen > state.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let i3 = 0; i3 < outLen; i3++)
      oview.setUint32(4 * i3, state[i3], isLE2);
  }
  digest() {
    const { buffer, outputLen } = this;
    this.digestInto(buffer);
    const res = buffer.slice(0, outputLen);
    this.destroy();
    return res;
  }
  _cloneInto(to3) {
    to3 || (to3 = new this.constructor());
    to3.set(...this.get());
    const { blockLen, buffer, length, finished, destroyed, pos } = this;
    to3.length = length;
    to3.pos = pos;
    to3.finished = finished;
    to3.destroyed = destroyed;
    if (length % blockLen)
      to3.buffer.set(buffer);
    return to3;
  }
};

// node_modules/@noble/hashes/esm/ripemd160.js
var Rho2 = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]);
var Id2 = new Uint8Array(new Array(16).fill(0).map((_6, i3) => i3));
var Pi2 = Id2.map((i3) => (9 * i3 + 5) % 16);
var idxL2 = [Id2];
var idxR2 = [Pi2];
for (let i3 = 0; i3 < 4; i3++)
  for (let j5 of [idxL2, idxR2])
    j5.push(j5[i3].map((k5) => Rho2[k5]));
var shifts2 = [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((i3) => new Uint8Array(i3));
var shiftsL2 = idxL2.map((idx, i3) => idx.map((j5) => shifts2[i3][j5]));
var shiftsR2 = idxR2.map((idx, i3) => idx.map((j5) => shifts2[i3][j5]));
var Kl2 = new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]);
var Kr2 = new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function f3(group, x7, y6, z6) {
  if (group === 0)
    return x7 ^ y6 ^ z6;
  else if (group === 1)
    return x7 & y6 | ~x7 & z6;
  else if (group === 2)
    return (x7 | ~y6) ^ z6;
  else if (group === 3)
    return x7 & z6 | y6 & ~z6;
  else
    return x7 ^ (y6 | ~z6);
}
var R_BUF2 = new Uint32Array(16);
var RIPEMD1602 = class extends HashMD2 {
  constructor() {
    super(64, 20, 8, true);
    this.h0 = 1732584193 | 0;
    this.h1 = 4023233417 | 0;
    this.h2 = 2562383102 | 0;
    this.h3 = 271733878 | 0;
    this.h4 = 3285377520 | 0;
  }
  get() {
    const { h0, h1, h2: h22, h3: h32, h4: h42 } = this;
    return [h0, h1, h22, h32, h42];
  }
  set(h0, h1, h22, h32, h42) {
    this.h0 = h0 | 0;
    this.h1 = h1 | 0;
    this.h2 = h22 | 0;
    this.h3 = h32 | 0;
    this.h4 = h42 | 0;
  }
  process(view, offset) {
    for (let i3 = 0; i3 < 16; i3++, offset += 4)
      R_BUF2[i3] = view.getUint32(offset, true);
    let al = this.h0 | 0, ar4 = al, bl = this.h1 | 0, br4 = bl, cl = this.h2 | 0, cr4 = cl, dl = this.h3 | 0, dr4 = dl, el = this.h4 | 0, er4 = el;
    for (let group = 0; group < 5; group++) {
      const rGroup = 4 - group;
      const hbl = Kl2[group], hbr = Kr2[group];
      const rl = idxL2[group], rr4 = idxR2[group];
      const sl = shiftsL2[group], sr4 = shiftsR2[group];
      for (let i3 = 0; i3 < 16; i3++) {
        const tl = rotl2(al + f3(group, bl, cl, dl) + R_BUF2[rl[i3]] + hbl, sl[i3]) + el | 0;
        al = el, el = dl, dl = rotl2(cl, 10) | 0, cl = bl, bl = tl;
      }
      for (let i3 = 0; i3 < 16; i3++) {
        const tr4 = rotl2(ar4 + f3(rGroup, br4, cr4, dr4) + R_BUF2[rr4[i3]] + hbr, sr4[i3]) + er4 | 0;
        ar4 = er4, er4 = dr4, dr4 = rotl2(cr4, 10) | 0, cr4 = br4, br4 = tr4;
      }
    }
    this.set(this.h1 + cl + dr4 | 0, this.h2 + dl + er4 | 0, this.h3 + el + ar4 | 0, this.h4 + al + br4 | 0, this.h0 + bl + cr4 | 0);
  }
  roundClean() {
    R_BUF2.fill(0);
  }
  destroy() {
    this.destroyed = true;
    this.buffer.fill(0);
    this.set(0, 0, 0, 0, 0);
  }
};
var ripemd1603 = wrapConstructor2(() => new RIPEMD1602());

// node_modules/@noble/hashes/esm/_u64.js
var U32_MASK64 = BigInt(2 ** 32 - 1);
var _32n = BigInt(32);
function fromBig(n3, le5 = false) {
  if (le5)
    return { h: Number(n3 & U32_MASK64), l: Number(n3 >> _32n & U32_MASK64) };
  return { h: Number(n3 >> _32n & U32_MASK64) | 0, l: Number(n3 & U32_MASK64) | 0 };
}
function split(lst, le5 = false) {
  let Ah = new Uint32Array(lst.length);
  let Al = new Uint32Array(lst.length);
  for (let i3 = 0; i3 < lst.length; i3++) {
    const { h: h5, l: l5 } = fromBig(lst[i3], le5);
    [Ah[i3], Al[i3]] = [h5, l5];
  }
  return [Ah, Al];
}
var rotlSH = (h5, l5, s2) => h5 << s2 | l5 >>> 32 - s2;
var rotlSL = (h5, l5, s2) => l5 << s2 | h5 >>> 32 - s2;
var rotlBH = (h5, l5, s2) => l5 << s2 - 32 | h5 >>> 64 - s2;
var rotlBL = (h5, l5, s2) => h5 << s2 - 32 | l5 >>> 64 - s2;

// node_modules/@noble/hashes/esm/sha3.js
var SHA3_PI = [];
var SHA3_ROTL = [];
var _SHA3_IOTA = [];
var _0n2 = BigInt(0);
var _1n2 = BigInt(1);
var _2n2 = BigInt(2);
var _7n = BigInt(7);
var _256n = BigInt(256);
var _0x71n = BigInt(113);
for (let round = 0, R4 = _1n2, x7 = 1, y6 = 0; round < 24; round++) {
  [x7, y6] = [y6, (2 * x7 + 3 * y6) % 5];
  SHA3_PI.push(2 * (5 * y6 + x7));
  SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
  let t = _0n2;
  for (let j5 = 0; j5 < 7; j5++) {
    R4 = (R4 << _1n2 ^ (R4 >> _7n) * _0x71n) % _256n;
    if (R4 & _2n2)
      t ^= _1n2 << (_1n2 << BigInt(j5)) - _1n2;
  }
  _SHA3_IOTA.push(t);
}
var [SHA3_IOTA_H, SHA3_IOTA_L] = split(_SHA3_IOTA, true);
var rotlH = (h5, l5, s2) => s2 > 32 ? rotlBH(h5, l5, s2) : rotlSH(h5, l5, s2);
var rotlL = (h5, l5, s2) => s2 > 32 ? rotlBL(h5, l5, s2) : rotlSL(h5, l5, s2);
function keccakP(s2, rounds = 24) {
  const B3 = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x7 = 0; x7 < 10; x7++)
      B3[x7] = s2[x7] ^ s2[x7 + 10] ^ s2[x7 + 20] ^ s2[x7 + 30] ^ s2[x7 + 40];
    for (let x7 = 0; x7 < 10; x7 += 2) {
      const idx1 = (x7 + 8) % 10;
      const idx0 = (x7 + 2) % 10;
      const B0 = B3[idx0];
      const B1 = B3[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B3[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B3[idx1 + 1];
      for (let y6 = 0; y6 < 50; y6 += 10) {
        s2[x7 + y6] ^= Th;
        s2[x7 + y6 + 1] ^= Tl;
      }
    }
    let curH = s2[2];
    let curL = s2[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s2[PI];
      curL = s2[PI + 1];
      s2[PI] = Th;
      s2[PI + 1] = Tl;
    }
    for (let y6 = 0; y6 < 50; y6 += 10) {
      for (let x7 = 0; x7 < 10; x7++)
        B3[x7] = s2[y6 + x7];
      for (let x7 = 0; x7 < 10; x7++)
        s2[y6 + x7] ^= ~B3[(x7 + 2) % 10] & B3[(x7 + 4) % 10];
    }
    s2[0] ^= SHA3_IOTA_H[round];
    s2[1] ^= SHA3_IOTA_L[round];
  }
  B3.fill(0);
}
var Keccak = class _Keccak extends Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    anumber(outputLen);
    if (0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  keccak() {
    if (!isLE)
      byteSwap32(this.state32);
    keccakP(this.state32, this.rounds);
    if (!isLE)
      byteSwap32(this.state32);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data) {
    aexists(this);
    const { blockLen, state } = this;
    data = toBytes2(data);
    const len = data.length;
    for (let pos = 0; pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i3 = 0; i3 < take; i3++)
        state[this.pos++] ^= data[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    aexists(this, false);
    abytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length; pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes) {
    anumber(bytes);
    return this.xofInto(new Uint8Array(bytes));
  }
  digestInto(out) {
    aoutput(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    this.state.fill(0);
  }
  _cloneInto(to3) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to3 || (to3 = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to3.state32.set(this.state32);
    to3.pos = this.pos;
    to3.posOut = this.posOut;
    to3.finished = this.finished;
    to3.rounds = rounds;
    to3.suffix = suffix;
    to3.outputLen = outputLen;
    to3.enableXOF = enableXOF;
    to3.destroyed = this.destroyed;
    return to3;
  }
};
var gen = (suffix, blockLen, outputLen) => wrapConstructor2(() => new Keccak(blockLen, suffix, outputLen));
var sha3_224 = gen(6, 144, 224 / 8);
var sha3_256 = gen(6, 136, 256 / 8);
var sha3_384 = gen(6, 104, 384 / 8);
var sha3_512 = gen(6, 72, 512 / 8);
var keccak_224 = gen(1, 144, 224 / 8);
var keccak_256 = gen(1, 136, 256 / 8);
var keccak_384 = gen(1, 104, 384 / 8);
var keccak_512 = gen(1, 72, 512 / 8);
var genShake = (suffix, blockLen, outputLen) => wrapXOFConstructorWithOpts((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
var shake128 = genShake(31, 168, 128 / 8);
var shake256 = genShake(31, 136, 256 / 8);

// node_modules/@noble/hashes/esm/sha256.js
var SHA256_K = new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);
var SHA256_IV = new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]);
var SHA256_W = new Uint32Array(64);
var SHA256 = class extends HashMD2 {
  constructor() {
    super(64, 32, 8, false);
    this.A = SHA256_IV[0] | 0;
    this.B = SHA256_IV[1] | 0;
    this.C = SHA256_IV[2] | 0;
    this.D = SHA256_IV[3] | 0;
    this.E = SHA256_IV[4] | 0;
    this.F = SHA256_IV[5] | 0;
    this.G = SHA256_IV[6] | 0;
    this.H = SHA256_IV[7] | 0;
  }
  get() {
    const { A: A5, B: B3, C: C5, D: D5, E: E5, F: F4, G: G3, H: H4 } = this;
    return [A5, B3, C5, D5, E5, F4, G3, H4];
  }
  // prettier-ignore
  set(A5, B3, C5, D5, E5, F4, G3, H4) {
    this.A = A5 | 0;
    this.B = B3 | 0;
    this.C = C5 | 0;
    this.D = D5 | 0;
    this.E = E5 | 0;
    this.F = F4 | 0;
    this.G = G3 | 0;
    this.H = H4 | 0;
  }
  process(view, offset) {
    for (let i3 = 0; i3 < 16; i3++, offset += 4)
      SHA256_W[i3] = view.getUint32(offset, false);
    for (let i3 = 16; i3 < 64; i3++) {
      const W15 = SHA256_W[i3 - 15];
      const W2 = SHA256_W[i3 - 2];
      const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
      const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
      SHA256_W[i3] = s1 + SHA256_W[i3 - 7] + s0 + SHA256_W[i3 - 16] | 0;
    }
    let { A: A5, B: B3, C: C5, D: D5, E: E5, F: F4, G: G3, H: H4 } = this;
    for (let i3 = 0; i3 < 64; i3++) {
      const sigma1 = rotr(E5, 6) ^ rotr(E5, 11) ^ rotr(E5, 25);
      const T1 = H4 + sigma1 + Chi(E5, F4, G3) + SHA256_K[i3] + SHA256_W[i3] | 0;
      const sigma0 = rotr(A5, 2) ^ rotr(A5, 13) ^ rotr(A5, 22);
      const T22 = sigma0 + Maj(A5, B3, C5) | 0;
      H4 = G3;
      G3 = F4;
      F4 = E5;
      E5 = D5 + T1 | 0;
      D5 = C5;
      C5 = B3;
      B3 = A5;
      A5 = T1 + T22 | 0;
    }
    A5 = A5 + this.A | 0;
    B3 = B3 + this.B | 0;
    C5 = C5 + this.C | 0;
    D5 = D5 + this.D | 0;
    E5 = E5 + this.E | 0;
    F4 = F4 + this.F | 0;
    G3 = G3 + this.G | 0;
    H4 = H4 + this.H | 0;
    this.set(A5, B3, C5, D5, E5, F4, G3, H4);
  }
  roundClean() {
    SHA256_W.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0);
    this.buffer.fill(0);
  }
};
var SHA224 = class extends SHA256 {
  constructor() {
    super();
    this.A = 3238371032 | 0;
    this.B = 914150663 | 0;
    this.C = 812702999 | 0;
    this.D = 4144912697 | 0;
    this.E = 4290775857 | 0;
    this.F = 1750603025 | 0;
    this.G = 1694076839 | 0;
    this.H = 3204075428 | 0;
    this.outputLen = 28;
  }
};
var sha2563 = wrapConstructor2(() => new SHA256());
var sha224 = wrapConstructor2(() => new SHA224());

// node_modules/ox/_esm/core/Hash.js
function keccak2562(value, options = {}) {
  const { as: as3 = typeof value === "string" ? "Hex" : "Bytes" } = options;
  const bytes = keccak_256(from(value));
  if (as3 === "Bytes")
    return bytes;
  return fromBytes2(bytes);
}

// node_modules/ox/_esm/core/internal/lru.js
var LruMap2 = class extends Map {
  constructor(size4) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size4;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
};

// node_modules/ox/_esm/core/Caches.js
var caches = {
  checksum: new LruMap2(8192)
};
var checksum = caches.checksum;

// node_modules/ox/_esm/core/Address.js
var addressRegex = /^0x[a-fA-F0-9]{40}$/;
function assert(value, options = {}) {
  const { strict = true } = options;
  if (!addressRegex.test(value))
    throw new InvalidAddressError2({
      address: value,
      cause: new InvalidInputError()
    });
  if (strict) {
    if (value.toLowerCase() === value)
      return;
    if (checksum2(value) !== value)
      throw new InvalidAddressError2({
        address: value,
        cause: new InvalidChecksumError()
      });
  }
}
function checksum2(address) {
  if (checksum.has(address))
    return checksum.get(address);
  assert(address, { strict: false });
  const hexAddress = address.substring(2).toLowerCase();
  const hash = keccak2562(fromString2(hexAddress), { as: "Bytes" });
  const characters = hexAddress.split("");
  for (let i3 = 0; i3 < 40; i3 += 2) {
    if (hash[i3 >> 1] >> 4 >= 8 && characters[i3]) {
      characters[i3] = characters[i3].toUpperCase();
    }
    if ((hash[i3 >> 1] & 15) >= 8 && characters[i3 + 1]) {
      characters[i3 + 1] = characters[i3 + 1].toUpperCase();
    }
  }
  const result = `0x${characters.join("")}`;
  checksum.set(address, result);
  return result;
}
var InvalidAddressError2 = class extends BaseError2 {
  constructor({ address, cause }) {
    super(`Address "${address}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidAddressError"
    });
  }
};
var InvalidInputError = class extends BaseError2 {
  constructor() {
    super("Address is not a 20 byte (40 hexadecimal character) value.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidInputError"
    });
  }
};
var InvalidChecksumError = class extends BaseError2 {
  constructor() {
    super("Address does not match its checksum counterpart.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidChecksumError"
    });
  }
};

// node_modules/ox/_esm/core/Solidity.js
var arrayRegex2 = /^(.*)\[([0-9]*)\]$/;
var bytesRegex2 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
var integerRegex2 = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
var maxInt8 = 2n ** (8n - 1n) - 1n;
var maxInt16 = 2n ** (16n - 1n) - 1n;
var maxInt24 = 2n ** (24n - 1n) - 1n;
var maxInt32 = 2n ** (32n - 1n) - 1n;
var maxInt40 = 2n ** (40n - 1n) - 1n;
var maxInt48 = 2n ** (48n - 1n) - 1n;
var maxInt56 = 2n ** (56n - 1n) - 1n;
var maxInt64 = 2n ** (64n - 1n) - 1n;
var maxInt72 = 2n ** (72n - 1n) - 1n;
var maxInt80 = 2n ** (80n - 1n) - 1n;
var maxInt88 = 2n ** (88n - 1n) - 1n;
var maxInt96 = 2n ** (96n - 1n) - 1n;
var maxInt104 = 2n ** (104n - 1n) - 1n;
var maxInt112 = 2n ** (112n - 1n) - 1n;
var maxInt120 = 2n ** (120n - 1n) - 1n;
var maxInt128 = 2n ** (128n - 1n) - 1n;
var maxInt136 = 2n ** (136n - 1n) - 1n;
var maxInt144 = 2n ** (144n - 1n) - 1n;
var maxInt152 = 2n ** (152n - 1n) - 1n;
var maxInt160 = 2n ** (160n - 1n) - 1n;
var maxInt168 = 2n ** (168n - 1n) - 1n;
var maxInt176 = 2n ** (176n - 1n) - 1n;
var maxInt184 = 2n ** (184n - 1n) - 1n;
var maxInt192 = 2n ** (192n - 1n) - 1n;
var maxInt200 = 2n ** (200n - 1n) - 1n;
var maxInt208 = 2n ** (208n - 1n) - 1n;
var maxInt216 = 2n ** (216n - 1n) - 1n;
var maxInt224 = 2n ** (224n - 1n) - 1n;
var maxInt232 = 2n ** (232n - 1n) - 1n;
var maxInt240 = 2n ** (240n - 1n) - 1n;
var maxInt248 = 2n ** (248n - 1n) - 1n;
var maxInt256 = 2n ** (256n - 1n) - 1n;
var minInt8 = -(2n ** (8n - 1n));
var minInt16 = -(2n ** (16n - 1n));
var minInt24 = -(2n ** (24n - 1n));
var minInt32 = -(2n ** (32n - 1n));
var minInt40 = -(2n ** (40n - 1n));
var minInt48 = -(2n ** (48n - 1n));
var minInt56 = -(2n ** (56n - 1n));
var minInt64 = -(2n ** (64n - 1n));
var minInt72 = -(2n ** (72n - 1n));
var minInt80 = -(2n ** (80n - 1n));
var minInt88 = -(2n ** (88n - 1n));
var minInt96 = -(2n ** (96n - 1n));
var minInt104 = -(2n ** (104n - 1n));
var minInt112 = -(2n ** (112n - 1n));
var minInt120 = -(2n ** (120n - 1n));
var minInt128 = -(2n ** (128n - 1n));
var minInt136 = -(2n ** (136n - 1n));
var minInt144 = -(2n ** (144n - 1n));
var minInt152 = -(2n ** (152n - 1n));
var minInt160 = -(2n ** (160n - 1n));
var minInt168 = -(2n ** (168n - 1n));
var minInt176 = -(2n ** (176n - 1n));
var minInt184 = -(2n ** (184n - 1n));
var minInt192 = -(2n ** (192n - 1n));
var minInt200 = -(2n ** (200n - 1n));
var minInt208 = -(2n ** (208n - 1n));
var minInt216 = -(2n ** (216n - 1n));
var minInt224 = -(2n ** (224n - 1n));
var minInt232 = -(2n ** (232n - 1n));
var minInt240 = -(2n ** (240n - 1n));
var minInt248 = -(2n ** (248n - 1n));
var minInt256 = -(2n ** (256n - 1n));
var maxUint8 = 2n ** 8n - 1n;
var maxUint16 = 2n ** 16n - 1n;
var maxUint24 = 2n ** 24n - 1n;
var maxUint32 = 2n ** 32n - 1n;
var maxUint40 = 2n ** 40n - 1n;
var maxUint48 = 2n ** 48n - 1n;
var maxUint56 = 2n ** 56n - 1n;
var maxUint64 = 2n ** 64n - 1n;
var maxUint72 = 2n ** 72n - 1n;
var maxUint80 = 2n ** 80n - 1n;
var maxUint88 = 2n ** 88n - 1n;
var maxUint96 = 2n ** 96n - 1n;
var maxUint104 = 2n ** 104n - 1n;
var maxUint112 = 2n ** 112n - 1n;
var maxUint120 = 2n ** 120n - 1n;
var maxUint128 = 2n ** 128n - 1n;
var maxUint136 = 2n ** 136n - 1n;
var maxUint144 = 2n ** 144n - 1n;
var maxUint152 = 2n ** 152n - 1n;
var maxUint160 = 2n ** 160n - 1n;
var maxUint168 = 2n ** 168n - 1n;
var maxUint176 = 2n ** 176n - 1n;
var maxUint184 = 2n ** 184n - 1n;
var maxUint192 = 2n ** 192n - 1n;
var maxUint200 = 2n ** 200n - 1n;
var maxUint208 = 2n ** 208n - 1n;
var maxUint216 = 2n ** 216n - 1n;
var maxUint224 = 2n ** 224n - 1n;
var maxUint232 = 2n ** 232n - 1n;
var maxUint240 = 2n ** 240n - 1n;
var maxUint248 = 2n ** 248n - 1n;
var maxUint2562 = 2n ** 256n - 1n;

// node_modules/ox/_esm/core/internal/cursor.js
var staticCursor = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: /* @__PURE__ */ new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new RecursiveReadLimitExceededError({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit
      });
  },
  assertPosition(position) {
    if (position < 0 || position > this.bytes.length - 1)
      throw new PositionOutOfBoundsError2({
        length: this.bytes.length,
        position
      });
  },
  decrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position - offset;
    this.assertPosition(position);
    this.position = position;
  },
  getReadCount(position) {
    return this.positionReadCount.get(position || this.position) || 0;
  },
  incrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError({ offset });
    const position = this.position + offset;
    this.assertPosition(position);
    this.position = position;
  },
  inspectByte(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectBytes(length, position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + length - 1);
    return this.bytes.subarray(position, position + length);
  },
  inspectUint8(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectUint16(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 1);
    return this.dataView.getUint16(position);
  },
  inspectUint24(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 2);
    return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
  },
  inspectUint32(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 3);
    return this.dataView.getUint32(position);
  },
  pushByte(byte) {
    this.assertPosition(this.position);
    this.bytes[this.position] = byte;
    this.position++;
  },
  pushBytes(bytes) {
    this.assertPosition(this.position + bytes.length - 1);
    this.bytes.set(bytes, this.position);
    this.position += bytes.length;
  },
  pushUint8(value) {
    this.assertPosition(this.position);
    this.bytes[this.position] = value;
    this.position++;
  },
  pushUint16(value) {
    this.assertPosition(this.position + 1);
    this.dataView.setUint16(this.position, value);
    this.position += 2;
  },
  pushUint24(value) {
    this.assertPosition(this.position + 2);
    this.dataView.setUint16(this.position, value >> 8);
    this.dataView.setUint8(this.position + 2, value & ~4294967040);
    this.position += 3;
  },
  pushUint32(value) {
    this.assertPosition(this.position + 3);
    this.dataView.setUint32(this.position, value);
    this.position += 4;
  },
  readByte() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectByte();
    this.position++;
    return value;
  },
  readBytes(length, size4) {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectBytes(length);
    this.position += size4 ?? length;
    return value;
  },
  readUint8() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint8();
    this.position += 1;
    return value;
  },
  readUint16() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint16();
    this.position += 2;
    return value;
  },
  readUint24() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint24();
    this.position += 3;
    return value;
  },
  readUint32() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint32();
    this.position += 4;
    return value;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(position) {
    const oldPosition = this.position;
    this.assertPosition(position);
    this.position = position;
    return () => this.position = oldPosition;
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
      return;
    const count = this.getReadCount();
    this.positionReadCount.set(this.position, count + 1);
    if (count > 0)
      this.recursiveReadCount++;
  }
};
var NegativeOffsetError = class extends BaseError2 {
  constructor({ offset }) {
    super(`Offset \`${offset}\` cannot be negative.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.NegativeOffsetError"
    });
  }
};
var PositionOutOfBoundsError2 = class extends BaseError2 {
  constructor({ length, position }) {
    super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.PositionOutOfBoundsError"
    });
  }
};
var RecursiveReadLimitExceededError = class extends BaseError2 {
  constructor({ count, limit }) {
    super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.RecursiveReadLimitExceededError"
    });
  }
};

// node_modules/ox/_esm/core/AbiParameters.js
function encodePacked2(types, values) {
  if (types.length !== values.length)
    throw new LengthMismatchError({
      expectedLength: types.length,
      givenLength: values.length
    });
  const data = [];
  for (let i3 = 0; i3 < types.length; i3++) {
    const type = types[i3];
    const value = values[i3];
    data.push(encodePacked2.encode(type, value));
  }
  return concat3(...data);
}
(function(encodePacked3) {
  function encode4(type, value, isArray = false) {
    if (type === "address") {
      const address = value;
      assert(address);
      return padLeft(address.toLowerCase(), isArray ? 32 : 0);
    }
    if (type === "string")
      return fromString3(value);
    if (type === "bytes")
      return value;
    if (type === "bool")
      return padLeft(fromBoolean(value), isArray ? 32 : 1);
    const intMatch = type.match(integerRegex2);
    if (intMatch) {
      const [_type, baseType, bits = "256"] = intMatch;
      const size4 = Number.parseInt(bits) / 8;
      return fromNumber(value, {
        size: isArray ? 32 : size4,
        signed: baseType === "int"
      });
    }
    const bytesMatch = type.match(bytesRegex2);
    if (bytesMatch) {
      const [_type, size4] = bytesMatch;
      if (Number.parseInt(size4) !== (value.length - 2) / 2)
        throw new BytesSizeMismatchError2({
          expectedSize: Number.parseInt(size4),
          value
        });
      return padRight(value, isArray ? 32 : 0);
    }
    const arrayMatch = type.match(arrayRegex2);
    if (arrayMatch && Array.isArray(value)) {
      const [_type, childType] = arrayMatch;
      const data = [];
      for (let i3 = 0; i3 < value.length; i3++) {
        data.push(encode4(childType, value[i3], true));
      }
      if (data.length === 0)
        return "0x";
      return concat3(...data);
    }
    throw new InvalidTypeError(type);
  }
  encodePacked3.encode = encode4;
})(encodePacked2 || (encodePacked2 = {}));
var BytesSizeMismatchError2 = class extends BaseError2 {
  constructor({ expectedSize, value }) {
    super(`Size of bytes "${value}" (bytes${size3(value)}) does not match expected size (bytes${expectedSize}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.BytesSizeMismatchError"
    });
  }
};
var LengthMismatchError = class extends BaseError2 {
  constructor({ expectedLength, givenLength }) {
    super([
      "ABI encoding parameters/values length mismatch.",
      `Expected length (parameters): ${expectedLength}`,
      `Given length (values): ${givenLength}`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.LengthMismatchError"
    });
  }
};
var InvalidTypeError = class extends BaseError2 {
  constructor(type) {
    super(`Type \`${type}\` is not a valid ABI Type.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.InvalidTypeError"
    });
  }
};

// node_modules/@walletconnect/utils/dist/index.es.js
var import_elliptic = __toESM(require_elliptic());
var Pe = ":";
function Ye(e) {
  const [t, n3] = e.split(Pe);
  return { namespace: t, reference: n3 };
}
function Hr(e, t = []) {
  const n3 = [];
  return Object.keys(e).forEach((r3) => {
    if (t.length && !t.includes(r3))
      return;
    const o4 = e[r3];
    n3.push(...o4.accounts);
  }), n3;
}
function Le(e, t) {
  return e.includes(":") ? [e] : t.chains || [];
}
var Ft = "ReactNative";
var H = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" };
var Gt = "js";
function et() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function ne() {
  return !(0, import_window_getters.getDocument)() && !!(0, import_window_getters.getNavigator)() && navigator.product === Ft;
}
function Wr() {
  return ne() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "android";
}
function zr() {
  return ne() && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u" && (global == null ? void 0 : global.Platform.OS) === "ios";
}
function Ae() {
  return !et() && !!(0, import_window_getters.getNavigator)() && !!(0, import_window_getters.getDocument)();
}
function ue() {
  return ne() ? H.reactNative : et() ? H.node : Ae() ? H.browser : H.unknown;
}
function Jr() {
  var e;
  try {
    return ne() && typeof global < "u" && typeof (global == null ? void 0 : global.Application) < "u" ? (e = global.Application) == null ? void 0 : e.applicationId : void 0;
  } catch {
    return;
  }
}
function Wt(e, t) {
  const n3 = new URLSearchParams(e);
  for (const r3 of Object.keys(t).sort())
    if (t.hasOwnProperty(r3)) {
      const o4 = t[r3];
      o4 !== void 0 && n3.set(r3, o4);
    }
  return n3.toString();
}
function Yr() {
  return (0, import_window_metadata.getWindowMetadata)() || { name: "", description: "", url: "", icons: [""] };
}
function zt() {
  if (ue() === H.reactNative && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u") {
    const { OS: n3, Version: r3 } = global.Platform;
    return [n3, r3].join("-");
  }
  const e = detect();
  if (e === null)
    return "unknown";
  const t = e.os ? e.os.replace(" ", "").toLowerCase() : "unknown";
  return e.type === "browser" ? [t, e.name, e.version].join("-") : [t, e.version].join("-");
}
function Jt() {
  var e;
  const t = ue();
  return t === H.browser ? [t, ((e = (0, import_window_getters.getLocation)()) == null ? void 0 : e.host) || "unknown"].join(":") : t;
}
function Yt(e, t, n3) {
  const r3 = zt(), o4 = Jt();
  return [[e, t].join("-"), [Gt, n3].join("-"), r3, o4].join("/");
}
function Zr({ protocol: e, version: t, relayUrl: n3, sdkVersion: r3, auth: o4, projectId: s2, useOnCloseEvent: i3, bundleId: c5, packageName: u3 }) {
  const a3 = n3.split("?"), l5 = Yt(e, t, r3), f8 = { auth: o4, ua: l5, projectId: s2, useOnCloseEvent: i3 || void 0, packageName: u3 || void 0, bundleId: c5 || void 0 }, d4 = Wt(a3[1] || "", f8);
  return a3[0] + "?" + d4;
}
function re(e, t) {
  return e.filter((n3) => t.includes(n3)).length === e.length;
}
function no(e) {
  return Object.fromEntries(e.entries());
}
function ro(e) {
  return new Map(Object.entries(e));
}
function co(e = import_time.FIVE_MINUTES, t) {
  const n3 = (0, import_time.toMiliseconds)(e || import_time.FIVE_MINUTES);
  let r3, o4, s2, i3;
  return { resolve: (c5) => {
    s2 && r3 && (clearTimeout(s2), r3(c5), i3 = Promise.resolve(c5));
  }, reject: (c5) => {
    s2 && o4 && (clearTimeout(s2), o4(c5));
  }, done: () => new Promise((c5, u3) => {
    if (i3)
      return c5(i3);
    s2 = setTimeout(() => {
      const a3 = new Error(t);
      i3 = Promise.reject(a3), u3(a3);
    }, n3), r3 = c5, o4 = u3;
  }) };
}
function ao(e, t, n3) {
  return new Promise(async (r3, o4) => {
    const s2 = setTimeout(() => o4(new Error(n3)), t);
    try {
      const i3 = await e;
      r3(i3);
    } catch (i3) {
      o4(i3);
    }
    clearTimeout(s2);
  });
}
function tt(e, t) {
  if (typeof t == "string" && t.startsWith(`${e}:`))
    return t;
  if (e.toLowerCase() === "topic") {
    if (typeof t != "string")
      throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${t}`;
  } else if (e.toLowerCase() === "id") {
    if (typeof t != "number")
      throw new Error('Value must be "number" for expirer target type: id');
    return `id:${t}`;
  }
  throw new Error(`Unknown expirer target type: ${e}`);
}
function uo(e) {
  return tt("topic", e);
}
function fo(e) {
  return tt("id", e);
}
function lo(e) {
  const [t, n3] = e.split(":"), r3 = { id: void 0, topic: void 0 };
  if (t === "topic" && typeof n3 == "string")
    r3.topic = n3;
  else if (t === "id" && Number.isInteger(Number(n3)))
    r3.id = Number(n3);
  else
    throw new Error(`Invalid target, expected id:number or topic:string, got ${t}:${n3}`);
  return r3;
}
function ho(e, t) {
  return (0, import_time.fromMiliseconds)((t || Date.now()) + (0, import_time.toMiliseconds)(e));
}
function po(e) {
  return Date.now() >= (0, import_time.toMiliseconds)(e);
}
function go(e, t) {
  return `${e}${t ? `:${t}` : ""}`;
}
function Q(e = [], t = []) {
  return [.../* @__PURE__ */ new Set([...e, ...t])];
}
async function yo({ id: e, topic: t, wcDeepLink: n3 }) {
  var r3;
  try {
    if (!n3)
      return;
    const o4 = typeof n3 == "string" ? JSON.parse(n3) : n3, s2 = o4 == null ? void 0 : o4.href;
    if (typeof s2 != "string")
      return;
    const i3 = en(s2, e, t), c5 = ue();
    if (c5 === H.browser) {
      if (!((r3 = (0, import_window_getters.getDocument)()) != null && r3.hasFocus())) {
        console.warn("Document does not have focus, skipping deeplink.");
        return;
      }
      tn(i3);
    } else
      c5 === H.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && await global.Linking.openURL(i3);
  } catch (o4) {
    console.error(o4);
  }
}
function en(e, t, n3) {
  const r3 = `requestId=${t}&sessionTopic=${n3}`;
  e.endsWith("/") && (e = e.slice(0, -1));
  let o4 = `${e}`;
  if (e.startsWith("https://t.me")) {
    const s2 = e.includes("?") ? "&startapp=" : "?startapp=";
    o4 = `${o4}${s2}${on(r3, true)}`;
  } else
    o4 = `${o4}/wc?${r3}`;
  return o4;
}
function tn(e) {
  let t = "_self";
  rn() ? t = "_top" : (nn() || e.startsWith("https://") || e.startsWith("http://")) && (t = "_blank"), window.open(e, t, "noreferrer noopener");
}
async function mo(e, t) {
  let n3 = "";
  try {
    if (Ae() && (n3 = localStorage.getItem(t), n3))
      return n3;
    n3 = await e.getItem(t);
  } catch (r3) {
    console.error(r3);
  }
  return n3;
}
function bo(e, t) {
  if (!e.includes(t))
    return null;
  const n3 = e.split(/([&,?,=])/), r3 = n3.indexOf(t);
  return n3[r3 + 2];
}
function wo() {
  return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, (e) => {
    const t = Math.random() * 16 | 0;
    return (e === "x" ? t : t & 3 | 8).toString(16);
  });
}
function Eo() {
  return typeof process < "u" && process.env.IS_VITEST === "true";
}
function nn() {
  return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto);
}
function rn() {
  try {
    return window.self !== window.top;
  } catch {
    return false;
  }
}
function on(e, t = false) {
  const n3 = Buffer.from(e).toString("base64");
  return t ? n3.replace(/[=]/g, "") : n3;
}
function rt(e) {
  return Buffer.from(e, "base64").toString("utf-8");
}
function vo(e) {
  return new Promise((t) => setTimeout(t, e));
}
function Ne(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error("positive integer expected, got " + e);
}
function xo(e) {
  return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
}
function je(e, ...t) {
  if (!xo(e))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error("Uint8Array expected of length " + t + ", got length=" + e.length);
}
function ot(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Ne(e.outputLen), Ne(e.blockLen);
}
function me(e, t = true) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function sn2(e, t) {
  je(e);
  const n3 = t.outputLen;
  if (e.length < n3)
    throw new Error("digestInto() expects output buffer of length at least " + n3);
}
var Ce = BigInt(2 ** 32 - 1);
var cn = BigInt(32);
function Oo(e, t = false) {
  return t ? { h: Number(e & Ce), l: Number(e >> cn & Ce) } : { h: Number(e >> cn & Ce) | 0, l: Number(e & Ce) | 0 };
}
function Io(e, t = false) {
  let n3 = new Uint32Array(e.length), r3 = new Uint32Array(e.length);
  for (let o4 = 0; o4 < e.length; o4++) {
    const { h: s2, l: i3 } = Oo(e[o4], t);
    [n3[o4], r3[o4]] = [s2, i3];
  }
  return [n3, r3];
}
var Ao = (e, t, n3) => e << n3 | t >>> 32 - n3;
var No = (e, t, n3) => t << n3 | e >>> 32 - n3;
var So = (e, t, n3) => t << n3 - 32 | e >>> 64 - n3;
var Uo = (e, t, n3) => e << n3 - 32 | t >>> 64 - n3;
var be = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
function _o(e) {
  return new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
}
function st(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function J(e, t) {
  return e << 32 - t | e >>> t;
}
var an = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function To(e) {
  return e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255;
}
function un(e) {
  for (let t = 0; t < e.length; t++)
    e[t] = To(e[t]);
}
function $o(e) {
  if (typeof e != "string")
    throw new Error("utf8ToBytes expected string, got " + typeof e);
  return new Uint8Array(new TextEncoder().encode(e));
}
function we(e) {
  return typeof e == "string" && (e = $o(e)), je(e), e;
}
var it = class {
  clone() {
    return this._cloneInto();
  }
};
function fn(e) {
  const t = (r3) => e().update(we(r3)).digest(), n3 = e();
  return t.outputLen = n3.outputLen, t.blockLen = n3.blockLen, t.create = () => e(), t;
}
function Se(e = 32) {
  if (be && typeof be.getRandomValues == "function")
    return be.getRandomValues(new Uint8Array(e));
  if (be && typeof be.randomBytes == "function")
    return be.randomBytes(e);
  throw new Error("crypto.getRandomValues must be defined");
}
var ln = [];
var dn = [];
var hn = [];
var Ro = BigInt(0);
var Ue = BigInt(1);
var Po2 = BigInt(2);
var Lo = BigInt(7);
var Bo = BigInt(256);
var jo = BigInt(113);
for (let e = 0, t = Ue, n3 = 1, r3 = 0; e < 24; e++) {
  [n3, r3] = [r3, (2 * n3 + 3 * r3) % 5], ln.push(2 * (5 * r3 + n3)), dn.push((e + 1) * (e + 2) / 2 % 64);
  let o4 = Ro;
  for (let s2 = 0; s2 < 7; s2++)
    t = (t << Ue ^ (t >> Lo) * jo) % Bo, t & Po2 && (o4 ^= Ue << (Ue << BigInt(s2)) - Ue);
  hn.push(o4);
}
var [Co, ko] = Io(hn, true);
var pn = (e, t, n3) => n3 > 32 ? So(e, t, n3) : Ao(e, t, n3);
var gn = (e, t, n3) => n3 > 32 ? Uo(e, t, n3) : No(e, t, n3);
function Do(e, t = 24) {
  const n3 = new Uint32Array(10);
  for (let r3 = 24 - t; r3 < 24; r3++) {
    for (let i3 = 0; i3 < 10; i3++)
      n3[i3] = e[i3] ^ e[i3 + 10] ^ e[i3 + 20] ^ e[i3 + 30] ^ e[i3 + 40];
    for (let i3 = 0; i3 < 10; i3 += 2) {
      const c5 = (i3 + 8) % 10, u3 = (i3 + 2) % 10, a3 = n3[u3], l5 = n3[u3 + 1], f8 = pn(a3, l5, 1) ^ n3[c5], d4 = gn(a3, l5, 1) ^ n3[c5 + 1];
      for (let g4 = 0; g4 < 50; g4 += 10)
        e[i3 + g4] ^= f8, e[i3 + g4 + 1] ^= d4;
    }
    let o4 = e[2], s2 = e[3];
    for (let i3 = 0; i3 < 24; i3++) {
      const c5 = dn[i3], u3 = pn(o4, s2, c5), a3 = gn(o4, s2, c5), l5 = ln[i3];
      o4 = e[l5], s2 = e[l5 + 1], e[l5] = u3, e[l5 + 1] = a3;
    }
    for (let i3 = 0; i3 < 50; i3 += 10) {
      for (let c5 = 0; c5 < 10; c5++)
        n3[c5] = e[i3 + c5];
      for (let c5 = 0; c5 < 10; c5++)
        e[i3 + c5] ^= ~n3[(c5 + 2) % 10] & n3[(c5 + 4) % 10];
    }
    e[0] ^= Co[r3], e[1] ^= ko[r3];
  }
  n3.fill(0);
}
var Bt = class _Bt extends it {
  constructor(t, n3, r3, o4 = false, s2 = 24) {
    if (super(), this.blockLen = t, this.suffix = n3, this.outputLen = r3, this.enableXOF = o4, this.rounds = s2, this.pos = 0, this.posOut = 0, this.finished = false, this.destroyed = false, Ne(r3), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = _o(this.state);
  }
  keccak() {
    an || un(this.state32), Do(this.state32, this.rounds), an || un(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    me(this);
    const { blockLen: n3, state: r3 } = this;
    t = we(t);
    const o4 = t.length;
    for (let s2 = 0; s2 < o4; ) {
      const i3 = Math.min(n3 - this.pos, o4 - s2);
      for (let c5 = 0; c5 < i3; c5++)
        r3[this.pos++] ^= t[s2++];
      this.pos === n3 && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state: t, suffix: n3, pos: r3, blockLen: o4 } = this;
    t[r3] ^= n3, (n3 & 128) !== 0 && r3 === o4 - 1 && this.keccak(), t[o4 - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    me(this, false), je(t), this.finish();
    const n3 = this.state, { blockLen: r3 } = this;
    for (let o4 = 0, s2 = t.length; o4 < s2; ) {
      this.posOut >= r3 && this.keccak();
      const i3 = Math.min(r3 - this.posOut, s2 - o4);
      t.set(n3.subarray(this.posOut, this.posOut + i3), o4), this.posOut += i3, o4 += i3;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return Ne(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (sn2(t, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true, this.state.fill(0);
  }
  _cloneInto(t) {
    const { blockLen: n3, suffix: r3, outputLen: o4, rounds: s2, enableXOF: i3 } = this;
    return t || (t = new _Bt(n3, r3, o4, i3, s2)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = s2, t.suffix = r3, t.outputLen = o4, t.enableXOF = i3, t.destroyed = this.destroyed, t;
  }
};
var Mo = (e, t, n3) => fn(() => new Bt(t, e, n3));
var Vo = Mo(1, 136, 256 / 8);
var Ho = "https://rpc.walletconnect.org/v1";
function ct(e) {
  const t = `Ethereum Signed Message:
${e.length}`, n3 = new TextEncoder().encode(t + e);
  return "0x" + Buffer.from(Vo(n3)).toString("hex");
}
async function yn(e, t, n3, r3, o4, s2) {
  switch (n3.t) {
    case "eip191":
      return await mn(e, t, n3.s);
    case "eip1271":
      return await bn(e, t, n3.s, r3, o4, s2);
    default:
      throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${n3.t}`);
  }
}
async function mn(e, t, n3) {
  return (await recoverAddress({ hash: ct(t), signature: n3 })).toLowerCase() === e.toLowerCase();
}
async function bn(e, t, n3, r3, o4, s2) {
  const i3 = Ye(r3);
  if (!i3.namespace || !i3.reference)
    throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${r3}`);
  try {
    const c5 = "0x1626ba7e", u3 = "0000000000000000000000000000000000000000000000000000000000000040", a3 = "0000000000000000000000000000000000000000000000000000000000000041", l5 = n3.substring(2), f8 = ct(t).substring(2), d4 = c5 + f8 + u3 + a3 + l5, g4 = await fetch(`${s2 || Ho}/?chainId=${r3}&projectId=${o4}`, { method: "POST", body: JSON.stringify({ id: Ko(), jsonrpc: "2.0", method: "eth_call", params: [{ to: e, data: d4 }, "latest"] }) }), { result: y6 } = await g4.json();
    return y6 ? y6.slice(0, c5.length).toLowerCase() === c5.toLowerCase() : false;
  } catch (c5) {
    return console.error("isValidEip1271Signature: ", c5), false;
  }
}
function Ko() {
  return Date.now() + Math.floor(Math.random() * 1e3);
}
var Fo = Object.defineProperty;
var qo = Object.defineProperties;
var Go = Object.getOwnPropertyDescriptors;
var wn = Object.getOwnPropertySymbols;
var Wo = Object.prototype.hasOwnProperty;
var zo = Object.prototype.propertyIsEnumerable;
var En = (e, t, n3) => t in e ? Fo(e, t, { enumerable: true, configurable: true, writable: true, value: n3 }) : e[t] = n3;
var at = (e, t) => {
  for (var n3 in t || (t = {}))
    Wo.call(t, n3) && En(e, n3, t[n3]);
  if (wn)
    for (var n3 of wn(t))
      zo.call(t, n3) && En(e, n3, t[n3]);
  return e;
};
var vn = (e, t) => qo(e, Go(t));
var Jo = "did:pkh:";
var ke = (e) => e == null ? void 0 : e.split(":");
var xn = (e) => {
  const t = e && ke(e);
  if (t)
    return e.includes(Jo) ? t[3] : t[1];
};
var On = (e) => {
  const t = e && ke(e);
  if (t)
    return t[2] + ":" + t[3];
};
var ut = (e) => {
  const t = e && ke(e);
  if (t)
    return t.pop();
};
async function Yo(e) {
  const { cacao: t, projectId: n3 } = e, { s: r3, p: o4 } = t, s2 = In(o4, o4.iss), i3 = ut(o4.iss);
  return await yn(i3, s2, r3, On(o4.iss), n3);
}
var In = (e, t) => {
  const n3 = `${e.domain} wants you to sign in with your Ethereum account:`, r3 = ut(t);
  if (!e.aud && !e.uri)
    throw new Error("Either `aud` or `uri` is required to construct the message");
  let o4 = e.statement || void 0;
  const s2 = `URI: ${e.aud || e.uri}`, i3 = `Version: ${e.version}`, c5 = `Chain ID: ${xn(t)}`, u3 = `Nonce: ${e.nonce}`, a3 = `Issued At: ${e.iat}`, l5 = e.exp ? `Expiration Time: ${e.exp}` : void 0, f8 = e.nbf ? `Not Before: ${e.nbf}` : void 0, d4 = e.requestId ? `Request ID: ${e.requestId}` : void 0, g4 = e.resources ? `Resources:${e.resources.map((h5) => `
- ${h5}`).join("")}` : void 0, y6 = Me(e.resources);
  if (y6) {
    const h5 = oe(y6);
    o4 = dt(o4, h5);
  }
  return [n3, r3, "", o4, "", s2, i3, c5, u3, a3, l5, f8, d4, g4].filter((h5) => h5 != null).join(`
`);
};
function Un(e) {
  return Buffer.from(JSON.stringify(e)).toString("base64");
}
function _n(e) {
  return JSON.parse(Buffer.from(e, "base64").toString("utf-8"));
}
function Y(e) {
  if (!e)
    throw new Error("No recap provided, value is undefined");
  if (!e.att)
    throw new Error("No `att` property found");
  const t = Object.keys(e.att);
  if (!(t != null && t.length))
    throw new Error("No resources found in `att` property");
  t.forEach((n3) => {
    const r3 = e.att[n3];
    if (Array.isArray(r3))
      throw new Error(`Resource must be an object: ${n3}`);
    if (typeof r3 != "object")
      throw new Error(`Resource must be an object: ${n3}`);
    if (!Object.keys(r3).length)
      throw new Error(`Resource object is empty: ${n3}`);
    Object.keys(r3).forEach((o4) => {
      const s2 = r3[o4];
      if (!Array.isArray(s2))
        throw new Error(`Ability limits ${o4} must be an array of objects, found: ${s2}`);
      if (!s2.length)
        throw new Error(`Value of ${o4} is empty array, must be an array with objects`);
      s2.forEach((i3) => {
        if (typeof i3 != "object")
          throw new Error(`Ability limits (${o4}) must be an array of objects, found: ${i3}`);
      });
    });
  });
}
function Tn(e, t, n3, r3 = {}) {
  return n3 == null ? void 0 : n3.sort((o4, s2) => o4.localeCompare(s2)), { att: { [e]: ft(t, n3, r3) } };
}
function ft(e, t, n3 = {}) {
  t = t == null ? void 0 : t.sort((o4, s2) => o4.localeCompare(s2));
  const r3 = t.map((o4) => ({ [`${e}/${o4}`]: [n3] }));
  return Object.assign({}, ...r3);
}
function De(e) {
  return Y(e), `urn:recap:${Un(e).replace(/=/g, "")}`;
}
function oe(e) {
  const t = _n(e.replace("urn:recap:", ""));
  return Y(t), t;
}
function ts(e, t, n3) {
  const r3 = Tn(e, t, n3);
  return De(r3);
}
function lt(e) {
  return e && e.includes("urn:recap:");
}
function ns(e, t) {
  const n3 = oe(e), r3 = oe(t), o4 = Rn(n3, r3);
  return De(o4);
}
function Rn(e, t) {
  Y(e), Y(t);
  const n3 = Object.keys(e.att).concat(Object.keys(t.att)).sort((o4, s2) => o4.localeCompare(s2)), r3 = { att: {} };
  return n3.forEach((o4) => {
    var s2, i3;
    Object.keys(((s2 = e.att) == null ? void 0 : s2[o4]) || {}).concat(Object.keys(((i3 = t.att) == null ? void 0 : i3[o4]) || {})).sort((c5, u3) => c5.localeCompare(u3)).forEach((c5) => {
      var u3, a3;
      r3.att[o4] = vn(at({}, r3.att[o4]), { [c5]: ((u3 = e.att[o4]) == null ? void 0 : u3[c5]) || ((a3 = t.att[o4]) == null ? void 0 : a3[c5]) });
    });
  }), r3;
}
function dt(e = "", t) {
  Y(t);
  const n3 = "I further authorize the stated URI to perform the following actions on my behalf: ";
  if (e.includes(n3))
    return e;
  const r3 = [];
  let o4 = 0;
  Object.keys(t.att).forEach((c5) => {
    const u3 = Object.keys(t.att[c5]).map((f8) => ({ ability: f8.split("/")[0], action: f8.split("/")[1] }));
    u3.sort((f8, d4) => f8.action.localeCompare(d4.action));
    const a3 = {};
    u3.forEach((f8) => {
      a3[f8.ability] || (a3[f8.ability] = []), a3[f8.ability].push(f8.action);
    });
    const l5 = Object.keys(a3).map((f8) => (o4++, `(${o4}) '${f8}': '${a3[f8].join("', '")}' for '${c5}'.`));
    r3.push(l5.join(", ").replace(".,", "."));
  });
  const s2 = r3.join(" "), i3 = `${n3}${s2}`;
  return `${e ? e + " " : ""}${i3}`;
}
function rs(e) {
  var t;
  const n3 = oe(e);
  Y(n3);
  const r3 = (t = n3.att) == null ? void 0 : t.eip155;
  return r3 ? Object.keys(r3).map((o4) => o4.split("/")[1]) : [];
}
function os(e) {
  const t = oe(e);
  Y(t);
  const n3 = [];
  return Object.values(t.att).forEach((r3) => {
    Object.values(r3).forEach((o4) => {
      var s2;
      (s2 = o4 == null ? void 0 : o4[0]) != null && s2.chains && n3.push(o4[0].chains);
    });
  }), [...new Set(n3.flat())];
}
function Me(e) {
  if (!e)
    return;
  const t = e == null ? void 0 : e[e.length - 1];
  return lt(t) ? t : void 0;
}
function ht(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error("positive integer expected, got " + e);
}
function Ln(e) {
  return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
}
function F(e, ...t) {
  if (!Ln(e))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error("Uint8Array expected of length " + t + ", got length=" + e.length);
}
function Bn(e, t = true) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function ss(e, t) {
  F(e);
  const n3 = t.outputLen;
  if (e.length < n3)
    throw new Error("digestInto() expects output buffer of length at least " + n3);
}
function jn(e) {
  if (typeof e != "boolean")
    throw new Error(`boolean expected, not ${e}`);
}
var se = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
var is = (e) => new DataView(e.buffer, e.byteOffset, e.byteLength);
var cs = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!cs)
  throw new Error("Non little-endian hardware is not supported");
function as(e) {
  if (typeof e != "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(e));
}
function pt(e) {
  if (typeof e == "string")
    e = as(e);
  else if (Ln(e))
    e = gt(e);
  else
    throw new Error("Uint8Array expected, got " + typeof e);
  return e;
}
function us(e, t) {
  if (t == null || typeof t != "object")
    throw new Error("options must be defined");
  return Object.assign(e, t);
}
function fs(e, t) {
  if (e.length !== t.length)
    return false;
  let n3 = 0;
  for (let r3 = 0; r3 < e.length; r3++)
    n3 |= e[r3] ^ t[r3];
  return n3 === 0;
}
var ls = (e, t) => {
  function n3(r3, ...o4) {
    if (F(r3), e.nonceLength !== void 0) {
      const l5 = o4[0];
      if (!l5)
        throw new Error("nonce / iv required");
      e.varSizeNonce ? F(l5) : F(l5, e.nonceLength);
    }
    const s2 = e.tagLength;
    s2 && o4[1] !== void 0 && F(o4[1]);
    const i3 = t(r3, ...o4), c5 = (l5, f8) => {
      if (f8 !== void 0) {
        if (l5 !== 2)
          throw new Error("cipher output not supported");
        F(f8);
      }
    };
    let u3 = false;
    return { encrypt(l5, f8) {
      if (u3)
        throw new Error("cannot encrypt() twice with same key + nonce");
      return u3 = true, F(l5), c5(i3.encrypt.length, f8), i3.encrypt(l5, f8);
    }, decrypt(l5, f8) {
      if (F(l5), s2 && l5.length < s2)
        throw new Error("invalid ciphertext length: smaller than tagLength=" + s2);
      return c5(i3.decrypt.length, f8), i3.decrypt(l5, f8);
    } };
  }
  return Object.assign(n3, e), n3;
};
function Cn(e, t, n3 = true) {
  if (t === void 0)
    return new Uint8Array(e);
  if (t.length !== e)
    throw new Error("invalid output length, expected " + e + ", got: " + t.length);
  if (n3 && !ds(t))
    throw new Error("invalid output, must be aligned");
  return t;
}
function kn(e, t, n3, r3) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n3, r3);
  const o4 = BigInt(32), s2 = BigInt(4294967295), i3 = Number(n3 >> o4 & s2), c5 = Number(n3 & s2), u3 = r3 ? 4 : 0, a3 = r3 ? 0 : 4;
  e.setUint32(t + u3, i3, r3), e.setUint32(t + a3, c5, r3);
}
function ds(e) {
  return e.byteOffset % 4 === 0;
}
function gt(e) {
  return Uint8Array.from(e);
}
function Ee(...e) {
  for (let t = 0; t < e.length; t++)
    e[t].fill(0);
}
var Dn = (e) => Uint8Array.from(e.split("").map((t) => t.charCodeAt(0)));
var hs = Dn("expand 16-byte k");
var ps = Dn("expand 32-byte k");
var gs = se(hs);
var ys = se(ps);
function x(e, t) {
  return e << t | e >>> 32 - t;
}
function yt(e) {
  return e.byteOffset % 4 === 0;
}
var Ve = 64;
var ms = 16;
var Mn = 2 ** 32 - 1;
var Vn = new Uint32Array();
function bs(e, t, n3, r3, o4, s2, i3, c5) {
  const u3 = o4.length, a3 = new Uint8Array(Ve), l5 = se(a3), f8 = yt(o4) && yt(s2), d4 = f8 ? se(o4) : Vn, g4 = f8 ? se(s2) : Vn;
  for (let y6 = 0; y6 < u3; i3++) {
    if (e(t, n3, r3, l5, i3, c5), i3 >= Mn)
      throw new Error("arx: counter overflow");
    const h5 = Math.min(Ve, u3 - y6);
    if (f8 && h5 === Ve) {
      const m3 = y6 / 4;
      if (y6 % 4 !== 0)
        throw new Error("arx: invalid block position");
      for (let B3 = 0, b3; B3 < ms; B3++)
        b3 = m3 + B3, g4[b3] = d4[b3] ^ l5[B3];
      y6 += Ve;
      continue;
    }
    for (let m3 = 0, B3; m3 < h5; m3++)
      B3 = y6 + m3, s2[B3] = o4[B3] ^ a3[m3];
    y6 += h5;
  }
}
function ws(e, t) {
  const { allowShortKeys: n3, extendNonceFn: r3, counterLength: o4, counterRight: s2, rounds: i3 } = us({ allowShortKeys: false, counterLength: 8, counterRight: false, rounds: 20 }, t);
  if (typeof e != "function")
    throw new Error("core must be a function");
  return ht(o4), ht(i3), jn(s2), jn(n3), (c5, u3, a3, l5, f8 = 0) => {
    F(c5), F(u3), F(a3);
    const d4 = a3.length;
    if (l5 === void 0 && (l5 = new Uint8Array(d4)), F(l5), ht(f8), f8 < 0 || f8 >= Mn)
      throw new Error("arx: counter overflow");
    if (l5.length < d4)
      throw new Error(`arx: output (${l5.length}) is shorter than data (${d4})`);
    const g4 = [];
    let y6 = c5.length, h5, m3;
    if (y6 === 32)
      g4.push(h5 = gt(c5)), m3 = ys;
    else if (y6 === 16 && n3)
      h5 = new Uint8Array(32), h5.set(c5), h5.set(c5, 16), m3 = gs, g4.push(h5);
    else
      throw new Error(`arx: invalid 32-byte key, got length=${y6}`);
    yt(u3) || g4.push(u3 = gt(u3));
    const B3 = se(h5);
    if (r3) {
      if (u3.length !== 24)
        throw new Error("arx: extended nonce must be 24 bytes");
      r3(m3, B3, se(u3.subarray(0, 16)), B3), u3 = u3.subarray(16);
    }
    const b3 = 16 - o4;
    if (b3 !== u3.length)
      throw new Error(`arx: nonce must be ${b3} or 16 bytes`);
    if (b3 !== 12) {
      const I3 = new Uint8Array(12);
      I3.set(u3, s2 ? 0 : 12 - u3.length), u3 = I3, g4.push(u3);
    }
    const _6 = se(u3);
    return bs(e, m3, B3, _6, a3, l5, f8, i3), Ee(...g4), l5;
  };
}
var M = (e, t) => e[t++] & 255 | (e[t++] & 255) << 8;
var Es = class {
  constructor(t) {
    this.blockLen = 16, this.outputLen = 16, this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), this.pad = new Uint16Array(8), this.pos = 0, this.finished = false, t = pt(t), F(t, 32);
    const n3 = M(t, 0), r3 = M(t, 2), o4 = M(t, 4), s2 = M(t, 6), i3 = M(t, 8), c5 = M(t, 10), u3 = M(t, 12), a3 = M(t, 14);
    this.r[0] = n3 & 8191, this.r[1] = (n3 >>> 13 | r3 << 3) & 8191, this.r[2] = (r3 >>> 10 | o4 << 6) & 7939, this.r[3] = (o4 >>> 7 | s2 << 9) & 8191, this.r[4] = (s2 >>> 4 | i3 << 12) & 255, this.r[5] = i3 >>> 1 & 8190, this.r[6] = (i3 >>> 14 | c5 << 2) & 8191, this.r[7] = (c5 >>> 11 | u3 << 5) & 8065, this.r[8] = (u3 >>> 8 | a3 << 8) & 8191, this.r[9] = a3 >>> 5 & 127;
    for (let l5 = 0; l5 < 8; l5++)
      this.pad[l5] = M(t, 16 + 2 * l5);
  }
  process(t, n3, r3 = false) {
    const o4 = r3 ? 0 : 2048, { h: s2, r: i3 } = this, c5 = i3[0], u3 = i3[1], a3 = i3[2], l5 = i3[3], f8 = i3[4], d4 = i3[5], g4 = i3[6], y6 = i3[7], h5 = i3[8], m3 = i3[9], B3 = M(t, n3 + 0), b3 = M(t, n3 + 2), _6 = M(t, n3 + 4), I3 = M(t, n3 + 6), k5 = M(t, n3 + 8), E5 = M(t, n3 + 10), L4 = M(t, n3 + 12), j5 = M(t, n3 + 14);
    let v6 = s2[0] + (B3 & 8191), O5 = s2[1] + ((B3 >>> 13 | b3 << 3) & 8191), w4 = s2[2] + ((b3 >>> 10 | _6 << 6) & 8191), R4 = s2[3] + ((_6 >>> 7 | I3 << 9) & 8191), A5 = s2[4] + ((I3 >>> 4 | k5 << 12) & 8191), T5 = s2[5] + (k5 >>> 1 & 8191), N5 = s2[6] + ((k5 >>> 14 | E5 << 2) & 8191), S4 = s2[7] + ((E5 >>> 11 | L4 << 5) & 8191), U3 = s2[8] + ((L4 >>> 8 | j5 << 8) & 8191), $5 = s2[9] + (j5 >>> 5 | o4), p4 = 0, C5 = p4 + v6 * c5 + O5 * (5 * m3) + w4 * (5 * h5) + R4 * (5 * y6) + A5 * (5 * g4);
    p4 = C5 >>> 13, C5 &= 8191, C5 += T5 * (5 * d4) + N5 * (5 * f8) + S4 * (5 * l5) + U3 * (5 * a3) + $5 * (5 * u3), p4 += C5 >>> 13, C5 &= 8191;
    let D5 = p4 + v6 * u3 + O5 * c5 + w4 * (5 * m3) + R4 * (5 * h5) + A5 * (5 * y6);
    p4 = D5 >>> 13, D5 &= 8191, D5 += T5 * (5 * g4) + N5 * (5 * d4) + S4 * (5 * f8) + U3 * (5 * l5) + $5 * (5 * a3), p4 += D5 >>> 13, D5 &= 8191;
    let P4 = p4 + v6 * a3 + O5 * u3 + w4 * c5 + R4 * (5 * m3) + A5 * (5 * h5);
    p4 = P4 >>> 13, P4 &= 8191, P4 += T5 * (5 * y6) + N5 * (5 * g4) + S4 * (5 * d4) + U3 * (5 * f8) + $5 * (5 * l5), p4 += P4 >>> 13, P4 &= 8191;
    let G3 = p4 + v6 * l5 + O5 * a3 + w4 * u3 + R4 * c5 + A5 * (5 * m3);
    p4 = G3 >>> 13, G3 &= 8191, G3 += T5 * (5 * h5) + N5 * (5 * y6) + S4 * (5 * g4) + U3 * (5 * d4) + $5 * (5 * f8), p4 += G3 >>> 13, G3 &= 8191;
    let X2 = p4 + v6 * f8 + O5 * l5 + w4 * a3 + R4 * u3 + A5 * c5;
    p4 = X2 >>> 13, X2 &= 8191, X2 += T5 * (5 * m3) + N5 * (5 * h5) + S4 * (5 * y6) + U3 * (5 * g4) + $5 * (5 * d4), p4 += X2 >>> 13, X2 &= 8191;
    let Z3 = p4 + v6 * d4 + O5 * f8 + w4 * l5 + R4 * a3 + A5 * u3;
    p4 = Z3 >>> 13, Z3 &= 8191, Z3 += T5 * c5 + N5 * (5 * m3) + S4 * (5 * h5) + U3 * (5 * y6) + $5 * (5 * g4), p4 += Z3 >>> 13, Z3 &= 8191;
    let he3 = p4 + v6 * g4 + O5 * d4 + w4 * f8 + R4 * l5 + A5 * a3;
    p4 = he3 >>> 13, he3 &= 8191, he3 += T5 * u3 + N5 * c5 + S4 * (5 * m3) + U3 * (5 * h5) + $5 * (5 * y6), p4 += he3 >>> 13, he3 &= 8191;
    let pe3 = p4 + v6 * y6 + O5 * g4 + w4 * d4 + R4 * f8 + A5 * l5;
    p4 = pe3 >>> 13, pe3 &= 8191, pe3 += T5 * a3 + N5 * u3 + S4 * c5 + U3 * (5 * m3) + $5 * (5 * h5), p4 += pe3 >>> 13, pe3 &= 8191;
    let ge = p4 + v6 * h5 + O5 * y6 + w4 * g4 + R4 * d4 + A5 * f8;
    p4 = ge >>> 13, ge &= 8191, ge += T5 * l5 + N5 * a3 + S4 * u3 + U3 * c5 + $5 * (5 * m3), p4 += ge >>> 13, ge &= 8191;
    let ye3 = p4 + v6 * m3 + O5 * h5 + w4 * y6 + R4 * g4 + A5 * d4;
    p4 = ye3 >>> 13, ye3 &= 8191, ye3 += T5 * f8 + N5 * l5 + S4 * a3 + U3 * u3 + $5 * c5, p4 += ye3 >>> 13, ye3 &= 8191, p4 = (p4 << 2) + p4 | 0, p4 = p4 + C5 | 0, C5 = p4 & 8191, p4 = p4 >>> 13, D5 += p4, s2[0] = C5, s2[1] = D5, s2[2] = P4, s2[3] = G3, s2[4] = X2, s2[5] = Z3, s2[6] = he3, s2[7] = pe3, s2[8] = ge, s2[9] = ye3;
  }
  finalize() {
    const { h: t, pad: n3 } = this, r3 = new Uint16Array(10);
    let o4 = t[1] >>> 13;
    t[1] &= 8191;
    for (let c5 = 2; c5 < 10; c5++)
      t[c5] += o4, o4 = t[c5] >>> 13, t[c5] &= 8191;
    t[0] += o4 * 5, o4 = t[0] >>> 13, t[0] &= 8191, t[1] += o4, o4 = t[1] >>> 13, t[1] &= 8191, t[2] += o4, r3[0] = t[0] + 5, o4 = r3[0] >>> 13, r3[0] &= 8191;
    for (let c5 = 1; c5 < 10; c5++)
      r3[c5] = t[c5] + o4, o4 = r3[c5] >>> 13, r3[c5] &= 8191;
    r3[9] -= 8192;
    let s2 = (o4 ^ 1) - 1;
    for (let c5 = 0; c5 < 10; c5++)
      r3[c5] &= s2;
    s2 = ~s2;
    for (let c5 = 0; c5 < 10; c5++)
      t[c5] = t[c5] & s2 | r3[c5];
    t[0] = (t[0] | t[1] << 13) & 65535, t[1] = (t[1] >>> 3 | t[2] << 10) & 65535, t[2] = (t[2] >>> 6 | t[3] << 7) & 65535, t[3] = (t[3] >>> 9 | t[4] << 4) & 65535, t[4] = (t[4] >>> 12 | t[5] << 1 | t[6] << 14) & 65535, t[5] = (t[6] >>> 2 | t[7] << 11) & 65535, t[6] = (t[7] >>> 5 | t[8] << 8) & 65535, t[7] = (t[8] >>> 8 | t[9] << 5) & 65535;
    let i3 = t[0] + n3[0];
    t[0] = i3 & 65535;
    for (let c5 = 1; c5 < 8; c5++)
      i3 = (t[c5] + n3[c5] | 0) + (i3 >>> 16) | 0, t[c5] = i3 & 65535;
    Ee(r3);
  }
  update(t) {
    Bn(this);
    const { buffer: n3, blockLen: r3 } = this;
    t = pt(t);
    const o4 = t.length;
    for (let s2 = 0; s2 < o4; ) {
      const i3 = Math.min(r3 - this.pos, o4 - s2);
      if (i3 === r3) {
        for (; r3 <= o4 - s2; s2 += r3)
          this.process(t, s2);
        continue;
      }
      n3.set(t.subarray(s2, s2 + i3), this.pos), this.pos += i3, s2 += i3, this.pos === r3 && (this.process(n3, 0, false), this.pos = 0);
    }
    return this;
  }
  destroy() {
    Ee(this.h, this.r, this.buffer, this.pad);
  }
  digestInto(t) {
    Bn(this), ss(t, this), this.finished = true;
    const { buffer: n3, h: r3 } = this;
    let { pos: o4 } = this;
    if (o4) {
      for (n3[o4++] = 1; o4 < 16; o4++)
        n3[o4] = 0;
      this.process(n3, 0, true);
    }
    this.finalize();
    let s2 = 0;
    for (let i3 = 0; i3 < 8; i3++)
      t[s2++] = r3[i3] >>> 0, t[s2++] = r3[i3] >>> 8;
    return t;
  }
  digest() {
    const { buffer: t, outputLen: n3 } = this;
    this.digestInto(t);
    const r3 = t.slice(0, n3);
    return this.destroy(), r3;
  }
};
function vs(e) {
  const t = (r3, o4) => e(o4).update(pt(r3)).digest(), n3 = e(new Uint8Array(32));
  return t.outputLen = n3.outputLen, t.blockLen = n3.blockLen, t.create = (r3) => e(r3), t;
}
var xs = vs((e) => new Es(e));
function Os(e, t, n3, r3, o4, s2 = 20) {
  let i3 = e[0], c5 = e[1], u3 = e[2], a3 = e[3], l5 = t[0], f8 = t[1], d4 = t[2], g4 = t[3], y6 = t[4], h5 = t[5], m3 = t[6], B3 = t[7], b3 = o4, _6 = n3[0], I3 = n3[1], k5 = n3[2], E5 = i3, L4 = c5, j5 = u3, v6 = a3, O5 = l5, w4 = f8, R4 = d4, A5 = g4, T5 = y6, N5 = h5, S4 = m3, U3 = B3, $5 = b3, p4 = _6, C5 = I3, D5 = k5;
  for (let G3 = 0; G3 < s2; G3 += 2)
    E5 = E5 + O5 | 0, $5 = x($5 ^ E5, 16), T5 = T5 + $5 | 0, O5 = x(O5 ^ T5, 12), E5 = E5 + O5 | 0, $5 = x($5 ^ E5, 8), T5 = T5 + $5 | 0, O5 = x(O5 ^ T5, 7), L4 = L4 + w4 | 0, p4 = x(p4 ^ L4, 16), N5 = N5 + p4 | 0, w4 = x(w4 ^ N5, 12), L4 = L4 + w4 | 0, p4 = x(p4 ^ L4, 8), N5 = N5 + p4 | 0, w4 = x(w4 ^ N5, 7), j5 = j5 + R4 | 0, C5 = x(C5 ^ j5, 16), S4 = S4 + C5 | 0, R4 = x(R4 ^ S4, 12), j5 = j5 + R4 | 0, C5 = x(C5 ^ j5, 8), S4 = S4 + C5 | 0, R4 = x(R4 ^ S4, 7), v6 = v6 + A5 | 0, D5 = x(D5 ^ v6, 16), U3 = U3 + D5 | 0, A5 = x(A5 ^ U3, 12), v6 = v6 + A5 | 0, D5 = x(D5 ^ v6, 8), U3 = U3 + D5 | 0, A5 = x(A5 ^ U3, 7), E5 = E5 + w4 | 0, D5 = x(D5 ^ E5, 16), S4 = S4 + D5 | 0, w4 = x(w4 ^ S4, 12), E5 = E5 + w4 | 0, D5 = x(D5 ^ E5, 8), S4 = S4 + D5 | 0, w4 = x(w4 ^ S4, 7), L4 = L4 + R4 | 0, $5 = x($5 ^ L4, 16), U3 = U3 + $5 | 0, R4 = x(R4 ^ U3, 12), L4 = L4 + R4 | 0, $5 = x($5 ^ L4, 8), U3 = U3 + $5 | 0, R4 = x(R4 ^ U3, 7), j5 = j5 + A5 | 0, p4 = x(p4 ^ j5, 16), T5 = T5 + p4 | 0, A5 = x(A5 ^ T5, 12), j5 = j5 + A5 | 0, p4 = x(p4 ^ j5, 8), T5 = T5 + p4 | 0, A5 = x(A5 ^ T5, 7), v6 = v6 + O5 | 0, C5 = x(C5 ^ v6, 16), N5 = N5 + C5 | 0, O5 = x(O5 ^ N5, 12), v6 = v6 + O5 | 0, C5 = x(C5 ^ v6, 8), N5 = N5 + C5 | 0, O5 = x(O5 ^ N5, 7);
  let P4 = 0;
  r3[P4++] = i3 + E5 | 0, r3[P4++] = c5 + L4 | 0, r3[P4++] = u3 + j5 | 0, r3[P4++] = a3 + v6 | 0, r3[P4++] = l5 + O5 | 0, r3[P4++] = f8 + w4 | 0, r3[P4++] = d4 + R4 | 0, r3[P4++] = g4 + A5 | 0, r3[P4++] = y6 + T5 | 0, r3[P4++] = h5 + N5 | 0, r3[P4++] = m3 + S4 | 0, r3[P4++] = B3 + U3 | 0, r3[P4++] = b3 + $5 | 0, r3[P4++] = _6 + p4 | 0, r3[P4++] = I3 + C5 | 0, r3[P4++] = k5 + D5 | 0;
}
var Is = ws(Os, { counterRight: false, counterLength: 4, allowShortKeys: false });
var As = new Uint8Array(16);
var Hn = (e, t) => {
  e.update(t);
  const n3 = t.length % 16;
  n3 && e.update(As.subarray(n3));
};
var Ns = new Uint8Array(32);
function Kn(e, t, n3, r3, o4) {
  const s2 = e(t, n3, Ns), i3 = xs.create(s2);
  o4 && Hn(i3, o4), Hn(i3, r3);
  const c5 = new Uint8Array(16), u3 = is(c5);
  kn(u3, 0, BigInt(o4 ? o4.length : 0), true), kn(u3, 8, BigInt(r3.length), true), i3.update(c5);
  const a3 = i3.digest();
  return Ee(s2, c5), a3;
}
var Ss = (e) => (t, n3, r3) => ({ encrypt(s2, i3) {
  const c5 = s2.length;
  i3 = Cn(c5 + 16, i3, false), i3.set(s2);
  const u3 = i3.subarray(0, -16);
  e(t, n3, u3, u3, 1);
  const a3 = Kn(e, t, n3, u3, r3);
  return i3.set(a3, c5), Ee(a3), i3;
}, decrypt(s2, i3) {
  i3 = Cn(s2.length - 16, i3, false);
  const c5 = s2.subarray(0, -16), u3 = s2.subarray(-16), a3 = Kn(e, t, n3, c5, r3);
  if (!fs(u3, a3))
    throw new Error("invalid tag");
  return i3.set(s2.subarray(0, -16)), e(t, n3, i3, i3, 1), Ee(a3), i3;
} });
var Fn = ls({ blockSize: 64, nonceLength: 12, tagLength: 16 }, Ss(Is));
var qn = class extends it {
  constructor(t, n3) {
    super(), this.finished = false, this.destroyed = false, ot(t);
    const r3 = we(n3);
    if (this.iHash = t.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const o4 = this.blockLen, s2 = new Uint8Array(o4);
    s2.set(r3.length > o4 ? t.create().update(r3).digest() : r3);
    for (let i3 = 0; i3 < s2.length; i3++)
      s2[i3] ^= 54;
    this.iHash.update(s2), this.oHash = t.create();
    for (let i3 = 0; i3 < s2.length; i3++)
      s2[i3] ^= 106;
    this.oHash.update(s2), s2.fill(0);
  }
  update(t) {
    return me(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    me(this), je(t, this.outputLen), this.finished = true, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: n3, iHash: r3, finished: o4, destroyed: s2, blockLen: i3, outputLen: c5 } = this;
    return t = t, t.finished = o4, t.destroyed = s2, t.blockLen = i3, t.outputLen = c5, t.oHash = n3._cloneInto(t.oHash), t.iHash = r3._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = true, this.oHash.destroy(), this.iHash.destroy();
  }
};
var mt = (e, t, n3) => new qn(e, t).update(n3).digest();
mt.create = (e, t) => new qn(e, t);
function Us(e, t, n3) {
  return ot(e), n3 === void 0 && (n3 = new Uint8Array(e.outputLen)), mt(e, we(n3), we(t));
}
var bt = new Uint8Array([0]);
var Gn = new Uint8Array();
function _s(e, t, n3, r3 = 32) {
  if (ot(e), Ne(r3), r3 > 255 * e.outputLen)
    throw new Error("Length should be <= 255*HashLen");
  const o4 = Math.ceil(r3 / e.outputLen);
  n3 === void 0 && (n3 = Gn);
  const s2 = new Uint8Array(o4 * e.outputLen), i3 = mt.create(e, t), c5 = i3._cloneInto(), u3 = new Uint8Array(i3.outputLen);
  for (let a3 = 0; a3 < o4; a3++)
    bt[0] = a3 + 1, c5.update(a3 === 0 ? Gn : u3).update(n3).update(bt).digestInto(u3), s2.set(u3, e.outputLen * a3), i3._cloneInto(c5);
  return i3.destroy(), c5.destroy(), u3.fill(0), bt.fill(0), s2.slice(0, r3);
}
var Ts = (e, t, n3, r3, o4) => _s(e, Us(e, t, n3), r3, o4);
function $s(e, t, n3, r3) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n3, r3);
  const o4 = BigInt(32), s2 = BigInt(4294967295), i3 = Number(n3 >> o4 & s2), c5 = Number(n3 & s2), u3 = r3 ? 4 : 0, a3 = r3 ? 0 : 4;
  e.setUint32(t + u3, i3, r3), e.setUint32(t + a3, c5, r3);
}
function Rs(e, t, n3) {
  return e & t ^ ~e & n3;
}
function Ps(e, t, n3) {
  return e & t ^ e & n3 ^ t & n3;
}
var Ls = class extends it {
  constructor(t, n3, r3, o4) {
    super(), this.blockLen = t, this.outputLen = n3, this.padOffset = r3, this.isLE = o4, this.finished = false, this.length = 0, this.pos = 0, this.destroyed = false, this.buffer = new Uint8Array(t), this.view = st(this.buffer);
  }
  update(t) {
    me(this);
    const { view: n3, buffer: r3, blockLen: o4 } = this;
    t = we(t);
    const s2 = t.length;
    for (let i3 = 0; i3 < s2; ) {
      const c5 = Math.min(o4 - this.pos, s2 - i3);
      if (c5 === o4) {
        const u3 = st(t);
        for (; o4 <= s2 - i3; i3 += o4)
          this.process(u3, i3);
        continue;
      }
      r3.set(t.subarray(i3, i3 + c5), this.pos), this.pos += c5, i3 += c5, this.pos === o4 && (this.process(n3, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    me(this), sn2(t, this), this.finished = true;
    const { buffer: n3, view: r3, blockLen: o4, isLE: s2 } = this;
    let { pos: i3 } = this;
    n3[i3++] = 128, this.buffer.subarray(i3).fill(0), this.padOffset > o4 - i3 && (this.process(r3, 0), i3 = 0);
    for (let f8 = i3; f8 < o4; f8++)
      n3[f8] = 0;
    $s(r3, o4 - 8, BigInt(this.length * 8), s2), this.process(r3, 0);
    const c5 = st(t), u3 = this.outputLen;
    if (u3 % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const a3 = u3 / 4, l5 = this.get();
    if (a3 > l5.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let f8 = 0; f8 < a3; f8++)
      c5.setUint32(4 * f8, l5[f8], s2);
  }
  digest() {
    const { buffer: t, outputLen: n3 } = this;
    this.digestInto(t);
    const r3 = t.slice(0, n3);
    return this.destroy(), r3;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: n3, buffer: r3, length: o4, finished: s2, destroyed: i3, pos: c5 } = this;
    return t.length = o4, t.pos = c5, t.finished = s2, t.destroyed = i3, o4 % n3 && t.buffer.set(r3), t;
  }
};
var Bs = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]);
var ie = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]);
var ce = new Uint32Array(64);
var js = class extends Ls {
  constructor() {
    super(64, 32, 8, false), this.A = ie[0] | 0, this.B = ie[1] | 0, this.C = ie[2] | 0, this.D = ie[3] | 0, this.E = ie[4] | 0, this.F = ie[5] | 0, this.G = ie[6] | 0, this.H = ie[7] | 0;
  }
  get() {
    const { A: t, B: n3, C: r3, D: o4, E: s2, F: i3, G: c5, H: u3 } = this;
    return [t, n3, r3, o4, s2, i3, c5, u3];
  }
  set(t, n3, r3, o4, s2, i3, c5, u3) {
    this.A = t | 0, this.B = n3 | 0, this.C = r3 | 0, this.D = o4 | 0, this.E = s2 | 0, this.F = i3 | 0, this.G = c5 | 0, this.H = u3 | 0;
  }
  process(t, n3) {
    for (let f8 = 0; f8 < 16; f8++, n3 += 4)
      ce[f8] = t.getUint32(n3, false);
    for (let f8 = 16; f8 < 64; f8++) {
      const d4 = ce[f8 - 15], g4 = ce[f8 - 2], y6 = J(d4, 7) ^ J(d4, 18) ^ d4 >>> 3, h5 = J(g4, 17) ^ J(g4, 19) ^ g4 >>> 10;
      ce[f8] = h5 + ce[f8 - 7] + y6 + ce[f8 - 16] | 0;
    }
    let { A: r3, B: o4, C: s2, D: i3, E: c5, F: u3, G: a3, H: l5 } = this;
    for (let f8 = 0; f8 < 64; f8++) {
      const d4 = J(c5, 6) ^ J(c5, 11) ^ J(c5, 25), g4 = l5 + d4 + Rs(c5, u3, a3) + Bs[f8] + ce[f8] | 0, h5 = (J(r3, 2) ^ J(r3, 13) ^ J(r3, 22)) + Ps(r3, o4, s2) | 0;
      l5 = a3, a3 = u3, u3 = c5, c5 = i3 + g4 | 0, i3 = s2, s2 = o4, o4 = r3, r3 = g4 + h5 | 0;
    }
    r3 = r3 + this.A | 0, o4 = o4 + this.B | 0, s2 = s2 + this.C | 0, i3 = i3 + this.D | 0, c5 = c5 + this.E | 0, u3 = u3 + this.F | 0, a3 = a3 + this.G | 0, l5 = l5 + this.H | 0, this.set(r3, o4, s2, i3, c5, u3, a3, l5);
  }
  roundClean() {
    ce.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
};
var He = fn(() => new js());
var Wn = BigInt(0);
function wt(e) {
  return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
}
function zn(e) {
  if (!wt(e))
    throw new Error("Uint8Array expected");
}
var Cs = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function ks(e) {
  zn(e);
  let t = "";
  for (let n3 = 0; n3 < e.length; n3++)
    t += Cs[e[n3]];
  return t;
}
function Ds(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return e === "" ? Wn : BigInt("0x" + e);
}
var ee = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Jn(e) {
  if (e >= ee._0 && e <= ee._9)
    return e - ee._0;
  if (e >= ee.A && e <= ee.F)
    return e - (ee.A - 10);
  if (e >= ee.a && e <= ee.f)
    return e - (ee.a - 10);
}
function Yn(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  const t = e.length, n3 = t / 2;
  if (t % 2)
    throw new Error("hex string expected, got unpadded hex of length " + t);
  const r3 = new Uint8Array(n3);
  for (let o4 = 0, s2 = 0; o4 < n3; o4++, s2 += 2) {
    const i3 = Jn(e.charCodeAt(s2)), c5 = Jn(e.charCodeAt(s2 + 1));
    if (i3 === void 0 || c5 === void 0) {
      const u3 = e[s2] + e[s2 + 1];
      throw new Error('hex string expected, got non-hex character "' + u3 + '" at index ' + s2);
    }
    r3[o4] = i3 * 16 + c5;
  }
  return r3;
}
function Xn(e) {
  return zn(e), Ds(ks(Uint8Array.from(e).reverse()));
}
function Ms(e, t) {
  return Yn(e.toString(16).padStart(t * 2, "0"));
}
function Vs(e, t) {
  return Ms(e, t).reverse();
}
function Zn(e, t, n3) {
  let r3;
  if (typeof t == "string")
    try {
      r3 = Yn(t);
    } catch (s2) {
      throw new Error(e + " must be hex string or Uint8Array, cause: " + s2);
    }
  else if (wt(t))
    r3 = Uint8Array.from(t);
  else
    throw new Error(e + " must be hex string or Uint8Array");
  const o4 = r3.length;
  if (typeof n3 == "number" && o4 !== n3)
    throw new Error(e + " of length " + n3 + " expected, got " + o4);
  return r3;
}
var Et = (e) => typeof e == "bigint" && Wn <= e;
function Hs(e, t, n3) {
  return Et(e) && Et(t) && Et(n3) && t <= e && e < n3;
}
function Qn(e, t, n3, r3) {
  if (!Hs(t, n3, r3))
    throw new Error("expected valid " + e + ": " + n3 + " <= n < " + r3 + ", got " + t);
}
var Ks = { bigint: (e) => typeof e == "bigint", function: (e) => typeof e == "function", boolean: (e) => typeof e == "boolean", string: (e) => typeof e == "string", stringOrUint8Array: (e) => typeof e == "string" || wt(e), isSafeInteger: (e) => Number.isSafeInteger(e), array: (e) => Array.isArray(e), field: (e, t) => t.Fp.isValid(e), hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen) };
function Fs(e, t, n3 = {}) {
  const r3 = (o4, s2, i3) => {
    const c5 = Ks[s2];
    if (typeof c5 != "function")
      throw new Error("invalid validator function");
    const u3 = e[o4];
    if (!(i3 && u3 === void 0) && !c5(u3, e))
      throw new Error("param " + String(o4) + " is invalid. Expected " + s2 + ", got " + u3);
  };
  for (const [o4, s2] of Object.entries(t))
    r3(o4, s2, false);
  for (const [o4, s2] of Object.entries(n3))
    r3(o4, s2, true);
  return e;
}
var ve = BigInt(0);
var Ke = BigInt(1);
function er(e, t) {
  const n3 = e % t;
  return n3 >= ve ? n3 : t + n3;
}
function qs(e, t, n3) {
  if (t < ve)
    throw new Error("invalid exponent, negatives unsupported");
  if (n3 <= ve)
    throw new Error("invalid modulus");
  if (n3 === Ke)
    return ve;
  let r3 = Ke;
  for (; t > ve; )
    t & Ke && (r3 = r3 * e % n3), e = e * e % n3, t >>= Ke;
  return r3;
}
function z(e, t, n3) {
  let r3 = e;
  for (; t-- > ve; )
    r3 *= r3, r3 %= n3;
  return r3;
}
BigInt(0), BigInt(1), BigInt(0), BigInt(1), BigInt(2), BigInt(8);
var xe = BigInt(0);
var vt = BigInt(1);
function Gs(e) {
  return Fs(e, { a: "bigint" }, { montgomeryBits: "isSafeInteger", nByteLength: "isSafeInteger", adjustScalarBytes: "function", domain: "function", powPminus2: "function", Gu: "bigint" }), Object.freeze({ ...e });
}
function Ws(e) {
  const t = Gs(e), { P: n3 } = t, r3 = (b3) => er(b3, n3), o4 = t.montgomeryBits, s2 = Math.ceil(o4 / 8), i3 = t.nByteLength, c5 = t.adjustScalarBytes || ((b3) => b3), u3 = t.powPminus2 || ((b3) => qs(b3, n3 - BigInt(2), n3));
  function a3(b3, _6, I3) {
    const k5 = r3(b3 * (_6 - I3));
    return _6 = r3(_6 - k5), I3 = r3(I3 + k5), [_6, I3];
  }
  const l5 = (t.a - BigInt(2)) / BigInt(4);
  function f8(b3, _6) {
    Qn("u", b3, xe, n3), Qn("scalar", _6, xe, n3);
    const I3 = _6, k5 = b3;
    let E5 = vt, L4 = xe, j5 = b3, v6 = vt, O5 = xe, w4;
    for (let A5 = BigInt(o4 - 1); A5 >= xe; A5--) {
      const T5 = I3 >> A5 & vt;
      O5 ^= T5, w4 = a3(O5, E5, j5), E5 = w4[0], j5 = w4[1], w4 = a3(O5, L4, v6), L4 = w4[0], v6 = w4[1], O5 = T5;
      const N5 = E5 + L4, S4 = r3(N5 * N5), U3 = E5 - L4, $5 = r3(U3 * U3), p4 = S4 - $5, C5 = j5 + v6, D5 = j5 - v6, P4 = r3(D5 * N5), G3 = r3(C5 * U3), X2 = P4 + G3, Z3 = P4 - G3;
      j5 = r3(X2 * X2), v6 = r3(k5 * r3(Z3 * Z3)), E5 = r3(S4 * $5), L4 = r3(p4 * (S4 + r3(l5 * p4)));
    }
    w4 = a3(O5, E5, j5), E5 = w4[0], j5 = w4[1], w4 = a3(O5, L4, v6), L4 = w4[0], v6 = w4[1];
    const R4 = u3(L4);
    return r3(E5 * R4);
  }
  function d4(b3) {
    return Vs(r3(b3), s2);
  }
  function g4(b3) {
    const _6 = Zn("u coordinate", b3, s2);
    return i3 === 32 && (_6[31] &= 127), Xn(_6);
  }
  function y6(b3) {
    const _6 = Zn("scalar", b3), I3 = _6.length;
    if (I3 !== s2 && I3 !== i3) {
      let k5 = "" + s2 + " or " + i3;
      throw new Error("invalid scalar, expected " + k5 + " bytes, got " + I3);
    }
    return Xn(c5(_6));
  }
  function h5(b3, _6) {
    const I3 = g4(_6), k5 = y6(b3), E5 = f8(I3, k5);
    if (E5 === xe)
      throw new Error("invalid private or public key received");
    return d4(E5);
  }
  const m3 = d4(t.Gu);
  function B3(b3) {
    return h5(b3, m3);
  }
  return { scalarMult: h5, scalarMultBase: B3, getSharedSecret: (b3, _6) => h5(b3, _6), getPublicKey: (b3) => B3(b3), utils: { randomPrivateKey: () => t.randomBytes(t.nByteLength) }, GuBytes: m3 };
}
var xt = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");
BigInt(0);
var zs = BigInt(1);
var tr = BigInt(2);
var Js = BigInt(3);
var Ys = BigInt(5);
BigInt(8);
function Xs(e) {
  const t = BigInt(10), n3 = BigInt(20), r3 = BigInt(40), o4 = BigInt(80), s2 = xt, c5 = e * e % s2 * e % s2, u3 = z(c5, tr, s2) * c5 % s2, a3 = z(u3, zs, s2) * e % s2, l5 = z(a3, Ys, s2) * a3 % s2, f8 = z(l5, t, s2) * l5 % s2, d4 = z(f8, n3, s2) * f8 % s2, g4 = z(d4, r3, s2) * d4 % s2, y6 = z(g4, o4, s2) * g4 % s2, h5 = z(y6, o4, s2) * g4 % s2, m3 = z(h5, t, s2) * l5 % s2;
  return { pow_p_5_8: z(m3, tr, s2) * e % s2, b2: c5 };
}
function Zs(e) {
  return e[0] &= 248, e[31] &= 127, e[31] |= 64, e;
}
var Ot = Ws({ P: xt, a: BigInt(486662), montgomeryBits: 255, nByteLength: 32, Gu: BigInt(9), powPminus2: (e) => {
  const t = xt, { pow_p_5_8: n3, b2: r3 } = Xs(e);
  return er(z(n3, Js, t) * r3, t);
}, adjustScalarBytes: Zs, randomBytes: Se });
var It = "base10";
var V = "base16";
var At = "base64pad";
var Qs = "base64url";
var Oe = "utf8";
var Nt = 0;
var Ie = 1;
var _e = 2;
var ei = 0;
var nr = 1;
var Te = 12;
var St = 32;
function ti() {
  const e = Ot.utils.randomPrivateKey(), t = Ot.getPublicKey(e);
  return { privateKey: toString(e, V), publicKey: toString(t, V) };
}
function ni() {
  const e = Se(St);
  return toString(e, V);
}
function ri(e, t) {
  const n3 = Ot.getSharedSecret(fromString(e, V), fromString(t, V)), r3 = Ts(He, n3, void 0, void 0, St);
  return toString(r3, V);
}
function oi(e) {
  const t = He(fromString(e, V));
  return toString(t, V);
}
function si(e) {
  const t = He(fromString(e, Oe));
  return toString(t, V);
}
function Ut(e) {
  return fromString(`${e}`, It);
}
function fe(e) {
  return Number(toString(e, It));
}
function ii(e) {
  const t = Ut(typeof e.type < "u" ? e.type : Nt);
  if (fe(t) === Ie && typeof e.senderPublicKey > "u")
    throw new Error("Missing sender public key for type 1 envelope");
  const n3 = typeof e.senderPublicKey < "u" ? fromString(e.senderPublicKey, V) : void 0, r3 = typeof e.iv < "u" ? fromString(e.iv, V) : Se(Te), o4 = fromString(e.symKey, V), s2 = Fn(o4, r3).encrypt(fromString(e.message, Oe));
  return _t({ type: t, sealed: s2, iv: r3, senderPublicKey: n3, encoding: e.encoding });
}
function ci(e) {
  const t = fromString(e.symKey, V), { sealed: n3, iv: r3 } = Fe(e), o4 = Fn(t, r3).decrypt(n3);
  if (o4 === null)
    throw new Error("Failed to decrypt");
  return toString(o4, Oe);
}
function ai(e, t) {
  const n3 = Ut(_e), r3 = Se(Te), o4 = fromString(e, Oe);
  return _t({ type: n3, sealed: o4, iv: r3, encoding: t });
}
function ui(e, t) {
  const { sealed: n3 } = Fe({ encoded: e, encoding: t });
  return toString(n3, Oe);
}
function _t(e) {
  const { encoding: t = At } = e;
  if (fe(e.type) === _e)
    return toString(concat([e.type, e.sealed]), t);
  if (fe(e.type) === Ie) {
    if (typeof e.senderPublicKey > "u")
      throw new Error("Missing sender public key for type 1 envelope");
    return toString(concat([e.type, e.senderPublicKey, e.iv, e.sealed]), t);
  }
  return toString(concat([e.type, e.iv, e.sealed]), t);
}
function Fe(e) {
  const { encoded: t, encoding: n3 = At } = e, r3 = fromString(t, n3), o4 = r3.slice(ei, nr), s2 = nr;
  if (fe(o4) === Ie) {
    const a3 = s2 + St, l5 = a3 + Te, f8 = r3.slice(s2, a3), d4 = r3.slice(a3, l5), g4 = r3.slice(l5);
    return { type: o4, sealed: g4, iv: d4, senderPublicKey: f8 };
  }
  if (fe(o4) === _e) {
    const a3 = r3.slice(s2), l5 = Se(Te);
    return { type: o4, sealed: a3, iv: l5 };
  }
  const i3 = s2 + Te, c5 = r3.slice(s2, i3), u3 = r3.slice(i3);
  return { type: o4, sealed: u3, iv: c5 };
}
function fi(e, t) {
  const n3 = Fe({ encoded: e, encoding: t == null ? void 0 : t.encoding });
  return rr({ type: fe(n3.type), senderPublicKey: typeof n3.senderPublicKey < "u" ? toString(n3.senderPublicKey, V) : void 0, receiverPublicKey: t == null ? void 0 : t.receiverPublicKey });
}
function rr(e) {
  const t = (e == null ? void 0 : e.type) || Nt;
  if (t === Ie) {
    if (typeof (e == null ? void 0 : e.senderPublicKey) > "u")
      throw new Error("missing sender public key");
    if (typeof (e == null ? void 0 : e.receiverPublicKey) > "u")
      throw new Error("missing receiver public key");
  }
  return { type: t, senderPublicKey: e == null ? void 0 : e.senderPublicKey, receiverPublicKey: e == null ? void 0 : e.receiverPublicKey };
}
function li(e) {
  return e.type === Ie && typeof e.senderPublicKey == "string" && typeof e.receiverPublicKey == "string";
}
function di(e) {
  return e.type === _e;
}
function or(e) {
  return new import_elliptic.ec("p256").keyFromPublic({ x: Buffer.from(e.x, "base64").toString("hex"), y: Buffer.from(e.y, "base64").toString("hex") }, "hex");
}
function hi(e) {
  let t = e.replace(/-/g, "+").replace(/_/g, "/");
  const n3 = t.length % 4;
  return n3 > 0 && (t += "=".repeat(4 - n3)), t;
}
function pi(e) {
  return Buffer.from(hi(e), "base64");
}
function gi(e, t) {
  const [n3, r3, o4] = e.split("."), s2 = pi(o4);
  if (s2.length !== 64)
    throw new Error("Invalid signature length");
  const i3 = s2.slice(0, 32).toString("hex"), c5 = s2.slice(32, 64).toString("hex"), u3 = `${n3}.${r3}`, a3 = He(u3), l5 = or(t), f8 = toString(a3, V);
  if (!l5.verify(f8, { r: i3, s: c5 }))
    throw new Error("Invalid signature");
  return sn(e).payload;
}
var sr = "irn";
function yi(e) {
  return (e == null ? void 0 : e.relay) || { protocol: sr };
}
function mi(e) {
  const t = C[e];
  if (typeof t > "u")
    throw new Error(`Relay Protocol not supported: ${e}`);
  return t;
}
function ir(e, t = "-") {
  const n3 = {}, r3 = "relay" + t;
  return Object.keys(e).forEach((o4) => {
    if (o4.startsWith(r3)) {
      const s2 = o4.replace(r3, ""), i3 = e[o4];
      n3[s2] = i3;
    }
  }), n3;
}
function bi(e) {
  if (!e.includes("wc:")) {
    const a3 = rt(e);
    a3 != null && a3.includes("wc:") && (e = a3);
  }
  e = e.includes("wc://") ? e.replace("wc://", "") : e, e = e.includes("wc:") ? e.replace("wc:", "") : e;
  const t = e.indexOf(":"), n3 = e.indexOf("?") !== -1 ? e.indexOf("?") : void 0, r3 = e.substring(0, t), o4 = e.substring(t + 1, n3).split("@"), s2 = typeof n3 < "u" ? e.substring(n3) : "", i3 = new URLSearchParams(s2), c5 = {};
  i3.forEach((a3, l5) => {
    c5[l5] = a3;
  });
  const u3 = typeof c5.methods == "string" ? c5.methods.split(",") : void 0;
  return { protocol: r3, topic: cr(o4[0]), version: parseInt(o4[1], 10), symKey: c5.symKey, relay: ir(c5), methods: u3, expiryTimestamp: c5.expiryTimestamp ? parseInt(c5.expiryTimestamp, 10) : void 0 };
}
function cr(e) {
  return e.startsWith("//") ? e.substring(2) : e;
}
function ar(e, t = "-") {
  const n3 = "relay", r3 = {};
  return Object.keys(e).forEach((o4) => {
    const s2 = o4, i3 = n3 + t + s2;
    e[s2] && (r3[i3] = e[s2]);
  }), r3;
}
function wi(e) {
  const t = new URLSearchParams(), n3 = ar(e.relay);
  Object.keys(n3).sort().forEach((o4) => {
    t.set(o4, n3[o4]);
  }), t.set("symKey", e.symKey), e.expiryTimestamp && t.set("expiryTimestamp", e.expiryTimestamp.toString()), e.methods && t.set("methods", e.methods.join(","));
  const r3 = t.toString();
  return `${e.protocol}:${e.topic}@${e.version}?${r3}`;
}
function Ei(e, t, n3) {
  return `${e}?wc_ev=${n3}&topic=${t}`;
}
function le(e) {
  const t = [];
  return e.forEach((n3) => {
    const [r3, o4] = n3.split(":");
    t.push(`${r3}:${o4}`);
  }), t;
}
function lr(e) {
  const t = [];
  return Object.values(e).forEach((n3) => {
    t.push(...le(n3.accounts));
  }), t;
}
function dr(e, t) {
  const n3 = [];
  return Object.values(e).forEach((r3) => {
    le(r3.accounts).includes(t) && n3.push(...r3.methods);
  }), n3;
}
function hr(e, t) {
  const n3 = [];
  return Object.values(e).forEach((r3) => {
    le(r3.accounts).includes(t) && n3.push(...r3.events);
  }), n3;
}
function Tt(e) {
  return e.includes(":");
}
function pr(e) {
  return Tt(e) ? e.split(":")[0] : e;
}
function gr(e) {
  const t = {};
  return e == null ? void 0 : e.forEach((n3) => {
    var r3;
    const [o4, s2] = n3.split(":");
    t[o4] || (t[o4] = { accounts: [], chains: [], events: [], methods: [] }), t[o4].accounts.push(n3), (r3 = t[o4].chains) == null || r3.push(`${o4}:${s2}`);
  }), t;
}
function Ti(e, t) {
  t = t.map((r3) => r3.replace("did:pkh:", ""));
  const n3 = gr(t);
  for (const [r3, o4] of Object.entries(n3))
    o4.methods ? o4.methods = Q(o4.methods, e) : o4.methods = e, o4.events = ["chainChanged", "accountsChanged"];
  return n3;
}
var yr = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } };
var mr = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function te(e, t) {
  const { message: n3, code: r3 } = mr[e];
  return { message: t ? `${n3} ${t}` : n3, code: r3 };
}
function de(e, t) {
  const { message: n3, code: r3 } = yr[e];
  return { message: t ? `${n3} ${t}` : n3, code: r3 };
}
function $e(e, t) {
  return Array.isArray(e) ? typeof t < "u" && e.length ? e.every(t) : true : false;
}
function qe(e) {
  return Object.getPrototypeOf(e) === Object.prototype && Object.keys(e).length;
}
function ae(e) {
  return typeof e > "u";
}
function q(e, t) {
  return t && ae(e) ? true : typeof e == "string" && !!e.trim().length;
}
function Ge(e, t) {
  return t && ae(e) ? true : typeof e == "number" && !isNaN(e);
}
function $i(e, t) {
  const { requiredNamespaces: n3 } = t, r3 = Object.keys(e.namespaces), o4 = Object.keys(n3);
  let s2 = true;
  return re(o4, r3) ? (r3.forEach((i3) => {
    const { accounts: c5, methods: u3, events: a3 } = e.namespaces[i3], l5 = le(c5), f8 = n3[i3];
    (!re(Le(i3, f8), l5) || !re(f8.methods, u3) || !re(f8.events, a3)) && (s2 = false);
  }), s2) : false;
}
function Re(e) {
  return q(e, false) && e.includes(":") ? e.split(":").length === 2 : false;
}
function br(e) {
  if (q(e, false) && e.includes(":")) {
    const t = e.split(":");
    if (t.length === 3) {
      const n3 = t[0] + ":" + t[1];
      return !!t[2] && Re(n3);
    }
  }
  return false;
}
function Ri(e) {
  function t(n3) {
    try {
      return typeof new URL(n3) < "u";
    } catch {
      return false;
    }
  }
  try {
    if (q(e, false)) {
      if (t(e))
        return true;
      const n3 = rt(e);
      return t(n3);
    }
  } catch {
  }
  return false;
}
function Pi3(e) {
  var t;
  return (t = e == null ? void 0 : e.proposer) == null ? void 0 : t.publicKey;
}
function Li(e) {
  return e == null ? void 0 : e.topic;
}
function Bi(e, t) {
  let n3 = null;
  return q(e == null ? void 0 : e.publicKey, false) || (n3 = te("MISSING_OR_INVALID", `${t} controller public key should be a string`)), n3;
}
function Rt(e) {
  let t = true;
  return $e(e) ? e.length && (t = e.every((n3) => q(n3, false))) : t = false, t;
}
function wr(e, t, n3) {
  let r3 = null;
  return $e(t) && t.length ? t.forEach((o4) => {
    r3 || Re(o4) || (r3 = de("UNSUPPORTED_CHAINS", `${n3}, chain ${o4} should be a string and conform to "namespace:chainId" format`));
  }) : Re(e) || (r3 = de("UNSUPPORTED_CHAINS", `${n3}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), r3;
}
function Er(e, t, n3) {
  let r3 = null;
  return Object.entries(e).forEach(([o4, s2]) => {
    if (r3)
      return;
    const i3 = wr(o4, Le(o4, s2), `${t} ${n3}`);
    i3 && (r3 = i3);
  }), r3;
}
function vr(e, t) {
  let n3 = null;
  return $e(e) ? e.forEach((r3) => {
    n3 || br(r3) || (n3 = de("UNSUPPORTED_ACCOUNTS", `${t}, account ${r3} should be a string and conform to "namespace:chainId:address" format`));
  }) : n3 = de("UNSUPPORTED_ACCOUNTS", `${t}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), n3;
}
function xr(e, t) {
  let n3 = null;
  return Object.values(e).forEach((r3) => {
    if (n3)
      return;
    const o4 = vr(r3 == null ? void 0 : r3.accounts, `${t} namespace`);
    o4 && (n3 = o4);
  }), n3;
}
function Or(e, t) {
  let n3 = null;
  return Rt(e == null ? void 0 : e.methods) ? Rt(e == null ? void 0 : e.events) || (n3 = de("UNSUPPORTED_EVENTS", `${t}, events should be an array of strings or empty array for no events`)) : n3 = de("UNSUPPORTED_METHODS", `${t}, methods should be an array of strings or empty array for no methods`), n3;
}
function Pt(e, t) {
  let n3 = null;
  return Object.values(e).forEach((r3) => {
    if (n3)
      return;
    const o4 = Or(r3, `${t}, namespace`);
    o4 && (n3 = o4);
  }), n3;
}
function ji(e, t, n3) {
  let r3 = null;
  if (e && qe(e)) {
    const o4 = Pt(e, t);
    o4 && (r3 = o4);
    const s2 = Er(e, t, n3);
    s2 && (r3 = s2);
  } else
    r3 = te("MISSING_OR_INVALID", `${t}, ${n3} should be an object with data`);
  return r3;
}
function Ir(e, t) {
  let n3 = null;
  if (e && qe(e)) {
    const r3 = Pt(e, t);
    r3 && (n3 = r3);
    const o4 = xr(e, t);
    o4 && (n3 = o4);
  } else
    n3 = te("MISSING_OR_INVALID", `${t}, namespaces should be an object with data`);
  return n3;
}
function Ar(e) {
  return q(e.protocol, true);
}
function Ci(e, t) {
  let n3 = false;
  return t && !e ? n3 = true : e && $e(e) && e.length && e.forEach((r3) => {
    n3 = Ar(r3);
  }), n3;
}
function ki(e) {
  return typeof e == "number";
}
function Di(e) {
  return typeof e < "u" && typeof e !== null;
}
function Mi(e) {
  return !(!e || typeof e != "object" || !e.code || !Ge(e.code, false) || !e.message || !q(e.message, false));
}
function Vi(e) {
  return !(ae(e) || !q(e.method, false));
}
function Hi(e) {
  return !(ae(e) || ae(e.result) && ae(e.error) || !Ge(e.id, false) || !q(e.jsonrpc, false));
}
function Ki(e) {
  return !(ae(e) || !q(e.name, false));
}
function Fi(e, t) {
  return !(!Re(t) || !lr(e).includes(t));
}
function qi(e, t, n3) {
  return q(n3, false) ? dr(e, t).includes(n3) : false;
}
function Gi(e, t, n3) {
  return q(n3, false) ? hr(e, t).includes(n3) : false;
}
function Nr(e, t, n3) {
  let r3 = null;
  const o4 = Wi(e), s2 = zi(t), i3 = Object.keys(o4), c5 = Object.keys(s2), u3 = Sr(Object.keys(e)), a3 = Sr(Object.keys(t)), l5 = u3.filter((f8) => !a3.includes(f8));
  return l5.length && (r3 = te("NON_CONFORMING_NAMESPACES", `${n3} namespaces keys don't satisfy requiredNamespaces.
      Required: ${l5.toString()}
      Received: ${Object.keys(t).toString()}`)), re(i3, c5) || (r3 = te("NON_CONFORMING_NAMESPACES", `${n3} namespaces chains don't satisfy required namespaces.
      Required: ${i3.toString()}
      Approved: ${c5.toString()}`)), Object.keys(t).forEach((f8) => {
    if (!f8.includes(":") || r3)
      return;
    const d4 = le(t[f8].accounts);
    d4.includes(f8) || (r3 = te("NON_CONFORMING_NAMESPACES", `${n3} namespaces accounts don't satisfy namespace accounts for ${f8}
        Required: ${f8}
        Approved: ${d4.toString()}`));
  }), i3.forEach((f8) => {
    r3 || (re(o4[f8].methods, s2[f8].methods) ? re(o4[f8].events, s2[f8].events) || (r3 = te("NON_CONFORMING_NAMESPACES", `${n3} namespaces events don't satisfy namespace events for ${f8}`)) : r3 = te("NON_CONFORMING_NAMESPACES", `${n3} namespaces methods don't satisfy namespace methods for ${f8}`));
  }), r3;
}
function Wi(e) {
  const t = {};
  return Object.keys(e).forEach((n3) => {
    var r3;
    n3.includes(":") ? t[n3] = e[n3] : (r3 = e[n3].chains) == null || r3.forEach((o4) => {
      t[o4] = { methods: e[n3].methods, events: e[n3].events };
    });
  }), t;
}
function Sr(e) {
  return [...new Set(e.map((t) => t.includes(":") ? t.split(":")[0] : t))];
}
function zi(e) {
  const t = {};
  return Object.keys(e).forEach((n3) => {
    if (n3.includes(":"))
      t[n3] = e[n3];
    else {
      const r3 = le(e[n3].accounts);
      r3 == null ? void 0 : r3.forEach((o4) => {
        t[o4] = { accounts: e[n3].accounts.filter((s2) => s2.includes(`${o4}:`)), methods: e[n3].methods, events: e[n3].events };
      });
    }
  }), t;
}
function Ji(e, t) {
  return Ge(e, false) && e <= t.max && e >= t.min;
}
function Yi() {
  const e = ue();
  return new Promise((t) => {
    switch (e) {
      case H.browser:
        t(Ur());
        break;
      case H.reactNative:
        t(_r());
        break;
      case H.node:
        t(Tr());
        break;
      default:
        t(true);
    }
  });
}
function Ur() {
  return Ae() && (navigator == null ? void 0 : navigator.onLine);
}
async function _r() {
  if (ne() && typeof global < "u" && global != null && global.NetInfo) {
    const e = await (global == null ? void 0 : global.NetInfo.fetch());
    return e == null ? void 0 : e.isConnected;
  }
  return true;
}
function Tr() {
  return true;
}
function Xi(e) {
  switch (ue()) {
    case H.browser:
      $r(e);
      break;
    case H.reactNative:
      Rr(e);
      break;
    case H.node:
      break;
  }
}
function $r(e) {
  !ne() && Ae() && (window.addEventListener("online", () => e(true)), window.addEventListener("offline", () => e(false)));
}
function Rr(e) {
  ne() && typeof global < "u" && global != null && global.NetInfo && (global == null ? void 0 : global.NetInfo.addEventListener((t) => e(t == null ? void 0 : t.isConnected)));
}
var Lt = {};
var Zi = class {
  static get(t) {
    return Lt[t];
  }
  static set(t, n3) {
    Lt[t] = n3;
  }
  static delete(t) {
    delete Lt[t];
  }
};

// node_modules/@walletconnect/core/dist/index.es.js
var import_events7 = __toESM(require_events());

// node_modules/@walletconnect/heartbeat/dist/index.es.js
var import_events = __toESM(require_events());
var import_time2 = __toESM(require_cjs());
init_esm();
var n = class extends IEvents {
  constructor(e) {
    super();
  }
};
var s = import_time2.FIVE_SECONDS;
var r2 = { pulse: "heartbeat_pulse" };
var i = class _i3 extends n {
  constructor(e) {
    super(e), this.events = new import_events.EventEmitter(), this.interval = s, this.interval = (e == null ? void 0 : e.interval) || s;
  }
  static async init(e) {
    const t = new _i3(e);
    return await t.init(), t;
  }
  async init() {
    await this.initialize();
  }
  stop() {
    clearInterval(this.intervalRef);
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async initialize() {
    this.intervalRef = setInterval(() => this.pulse(), (0, import_time2.toMiliseconds)(this.interval));
  }
  pulse() {
    this.events.emit(r2.pulse);
  }
};

// node_modules/@walletconnect/core/node_modules/unstorage/dist/shared/unstorage.mNKHTF5Y.mjs
function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify3(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify3(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
var BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c5) => c5.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}
function normalizeKey(key) {
  var _a2;
  if (!key) {
    return "";
  }
  return ((_a2 = key.split("?")[0]) == null ? void 0 : _a2.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "")) || "";
}
function joinKeys(...keys2) {
  return normalizeKey(keys2.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

// node_modules/@walletconnect/core/node_modules/unstorage/dist/index.mjs
function defineDriver(factory) {
  return factory;
}
var DRIVER_NAME = "memory";
var memory = defineDriver(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});
function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r3) => r3.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r3) => r3.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify3(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify3(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify3(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      var _a2;
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!((_a2 = mount.driver.flags) == null ? void 0 : _a2.maxDepth)) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey(key);
          if (!maskedMounts.some((p4) => fullKey.startsWith(p4))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p4) => !p4.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m3) => {
          if (m3.driver.clear) {
            return asyncCall(m3.driver.clear, m3.relativeBase, opts);
          }
          if (m3.driver.removeItem) {
            const keys2 = await m3.driver.getKeys(m3.relativeBase || "", opts);
            return Promise.all(
              keys2.map((key) => m3.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a3, b3) => b3.length - a3.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      var _a2, _b;
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        (_b = (_a2 = context.unwatch)[base]) == null ? void 0 : _b.call(_a2);
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey(key) + ":";
      const m3 = getMount(key);
      return {
        driver: m3.driver,
        base: m3.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m3) => ({
        driver: m3.driver,
        base: m3.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

// node_modules/@walletconnect/core/node_modules/@walletconnect/keyvaluestorage/dist/index.es.js
var x2 = "idb-keyval";
var z2 = (i3 = {}) => {
  const t = i3.base && i3.base.length > 0 ? `${i3.base}:` : "", e = (s2) => t + s2;
  let n3;
  return i3.dbName && i3.storeName && (n3 = createStore(i3.dbName, i3.storeName)), { name: x2, options: i3, async hasItem(s2) {
    return !(typeof await get(e(s2), n3) > "u");
  }, async getItem(s2) {
    return await get(e(s2), n3) ?? null;
  }, setItem(s2, a3) {
    return set(e(s2), a3, n3);
  }, removeItem(s2) {
    return del(e(s2), n3);
  }, getKeys() {
    return keys(n3);
  }, clear() {
    return clear(n3);
  } };
};
var D = "WALLET_CONNECT_V2_INDEXED_DB";
var E2 = "keyvaluestorage";
var _ = class {
  constructor() {
    this.indexedDb = createStorage({ driver: z2({ dbName: D, storeName: E2 }) });
  }
  async getKeys() {
    return this.indexedDb.getKeys();
  }
  async getEntries() {
    return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map((t) => [t.key, t.value]);
  }
  async getItem(t) {
    const e = await this.indexedDb.getItem(t);
    if (e !== null)
      return e;
  }
  async setItem(t, e) {
    await this.indexedDb.setItem(t, safeJsonStringify(e));
  }
  async removeItem(t) {
    await this.indexedDb.removeItem(t);
  }
};
var l2 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var c = { exports: {} };
(function() {
  let i3;
  function t() {
  }
  i3 = t, i3.prototype.getItem = function(e) {
    return this.hasOwnProperty(e) ? String(this[e]) : null;
  }, i3.prototype.setItem = function(e, n3) {
    this[e] = String(n3);
  }, i3.prototype.removeItem = function(e) {
    delete this[e];
  }, i3.prototype.clear = function() {
    const e = this;
    Object.keys(e).forEach(function(n3) {
      e[n3] = void 0, delete e[n3];
    });
  }, i3.prototype.key = function(e) {
    return e = e || 0, Object.keys(this)[e];
  }, i3.prototype.__defineGetter__("length", function() {
    return Object.keys(this).length;
  }), typeof l2 < "u" && l2.localStorage ? c.exports = l2.localStorage : typeof window < "u" && window.localStorage ? c.exports = window.localStorage : c.exports = new t();
})();
function k2(i3) {
  var t;
  return [i3[0], safeJsonParse((t = i3[1]) != null ? t : "")];
}
var K = class {
  constructor() {
    this.localStorage = c.exports;
  }
  async getKeys() {
    return Object.keys(this.localStorage);
  }
  async getEntries() {
    return Object.entries(this.localStorage).map(k2);
  }
  async getItem(t) {
    const e = this.localStorage.getItem(t);
    if (e !== null)
      return safeJsonParse(e);
  }
  async setItem(t, e) {
    this.localStorage.setItem(t, safeJsonStringify(e));
  }
  async removeItem(t) {
    this.localStorage.removeItem(t);
  }
};
var N = "wc_storage_version";
var y2 = 1;
var O = async (i3, t, e) => {
  const n3 = N, s2 = await t.getItem(n3);
  if (s2 && s2 >= y2) {
    e(t);
    return;
  }
  const a3 = await i3.getKeys();
  if (!a3.length) {
    e(t);
    return;
  }
  const m3 = [];
  for (; a3.length; ) {
    const r3 = a3.shift();
    if (!r3)
      continue;
    const o4 = r3.toLowerCase();
    if (o4.includes("wc@") || o4.includes("walletconnect") || o4.includes("wc_") || o4.includes("wallet_connect")) {
      const f8 = await i3.getItem(r3);
      await t.setItem(r3, f8), m3.push(r3);
    }
  }
  await t.setItem(n3, y2), e(t), j(i3, m3);
};
var j = async (i3, t) => {
  t.length && t.forEach(async (e) => {
    await i3.removeItem(e);
  });
};
var h = class {
  constructor() {
    this.initialized = false, this.setInitialized = (e) => {
      this.storage = e, this.initialized = true;
    };
    const t = new K();
    this.storage = t;
    try {
      const e = new _();
      O(t, e, this.setInitialized);
    } catch {
      this.initialized = true;
    }
  }
  async getKeys() {
    return await this.initialize(), this.storage.getKeys();
  }
  async getEntries() {
    return await this.initialize(), this.storage.getEntries();
  }
  async getItem(t) {
    return await this.initialize(), this.storage.getItem(t);
  }
  async setItem(t, e) {
    return await this.initialize(), this.storage.setItem(t, e);
  }
  async removeItem(t) {
    return await this.initialize(), this.storage.removeItem(t);
  }
  async initialize() {
    this.initialized || await new Promise((t) => {
      const e = setInterval(() => {
        this.initialized && (clearInterval(e), t());
      }, 20);
    });
  }
};

// node_modules/@walletconnect/types/dist/index.es.js
init_esm();
var import_events4 = __toESM(require_events());
var a2 = Object.defineProperty;
var u = (e, s2, r3) => s2 in e ? a2(e, s2, { enumerable: true, configurable: true, writable: true, value: r3 }) : e[s2] = r3;
var c2 = (e, s2, r3) => u(e, typeof s2 != "symbol" ? s2 + "" : s2, r3);
var h2 = class extends IEvents {
  constructor(s2) {
    super(), this.opts = s2, c2(this, "protocol", "wc"), c2(this, "version", 2);
  }
};
var p = Object.defineProperty;
var b = (e, s2, r3) => s2 in e ? p(e, s2, { enumerable: true, configurable: true, writable: true, value: r3 }) : e[s2] = r3;
var v = (e, s2, r3) => b(e, typeof s2 != "symbol" ? s2 + "" : s2, r3);
var I = class extends IEvents {
  constructor(s2, r3) {
    super(), this.core = s2, this.logger = r3, v(this, "records", /* @__PURE__ */ new Map());
  }
};
var y3 = class {
  constructor(s2, r3) {
    this.logger = s2, this.core = r3;
  }
};
var m = class extends IEvents {
  constructor(s2, r3) {
    super(), this.relayer = s2, this.logger = r3;
  }
};
var d = class extends IEvents {
  constructor(s2) {
    super();
  }
};
var f4 = class {
  constructor(s2, r3, t, q5) {
    this.core = s2, this.logger = r3, this.name = t;
  }
};
var P = class extends IEvents {
  constructor(s2, r3) {
    super(), this.relayer = s2, this.logger = r3;
  }
};
var S = class extends IEvents {
  constructor(s2, r3) {
    super(), this.core = s2, this.logger = r3;
  }
};
var M2 = class {
  constructor(s2, r3, t) {
    this.core = s2, this.logger = r3, this.store = t;
  }
};
var O2 = class {
  constructor(s2, r3) {
    this.projectId = s2, this.logger = r3;
  }
};
var R = class {
  constructor(s2, r3, t) {
    this.core = s2, this.logger = r3, this.telemetryEnabled = t;
  }
};
var T = Object.defineProperty;
var k3 = (e, s2, r3) => s2 in e ? T(e, s2, { enumerable: true, configurable: true, writable: true, value: r3 }) : e[s2] = r3;
var i2 = (e, s2, r3) => k3(e, typeof s2 != "symbol" ? s2 + "" : s2, r3);
var J2 = class {
  constructor(s2) {
    this.opts = s2, i2(this, "protocol", "wc"), i2(this, "version", 2);
  }
};
var V2 = class {
  constructor(s2) {
    this.client = s2;
  }
};

// node_modules/@walletconnect/core/dist/index.es.js
var import_time3 = __toESM(require_cjs());

// node_modules/@walletconnect/jsonrpc-provider/dist/index.es.js
var import_events5 = __toESM(require_events());
var o2 = class extends r {
  constructor(t) {
    super(t), this.events = new import_events5.EventEmitter(), this.hasRegisteredEventListeners = false, this.connection = this.setConnection(t), this.connection.connected && this.registerEventListeners();
  }
  async connect(t = this.connection) {
    await this.open(t);
  }
  async disconnect() {
    await this.close();
  }
  on(t, e) {
    this.events.on(t, e);
  }
  once(t, e) {
    this.events.once(t, e);
  }
  off(t, e) {
    this.events.off(t, e);
  }
  removeListener(t, e) {
    this.events.removeListener(t, e);
  }
  async request(t, e) {
    return this.requestStrict(formatJsonRpcRequest(t.method, t.params || [], t.id || getBigIntRpcId().toString()), e);
  }
  async requestStrict(t, e) {
    return new Promise(async (i3, s2) => {
      if (!this.connection.connected)
        try {
          await this.open();
        } catch (n3) {
          s2(n3);
        }
      this.events.on(`${t.id}`, (n3) => {
        isJsonRpcError(n3) ? s2(n3.error) : i3(n3.result);
      });
      try {
        await this.connection.send(t, e);
      } catch (n3) {
        s2(n3);
      }
    });
  }
  setConnection(t = this.connection) {
    return t;
  }
  onPayload(t) {
    this.events.emit("payload", t), isJsonRpcResponse(t) ? this.events.emit(`${t.id}`, t) : this.events.emit("message", { type: t.method, data: t.params });
  }
  onClose(t) {
    t && t.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${t.code} ${t.reason ? `(${t.reason})` : ""}`)), this.events.emit("disconnect");
  }
  async open(t = this.connection) {
    this.connection === t && this.connection.connected || (this.connection.connected && this.close(), typeof t == "string" && (await this.connection.open(t), t = this.connection), this.connection = this.setConnection(t), await this.connection.open(), this.registerEventListeners(), this.events.emit("connect"));
  }
  async close() {
    await this.connection.close();
  }
  registerEventListeners() {
    this.hasRegisteredEventListeners || (this.connection.on("payload", (t) => this.onPayload(t)), this.connection.on("close", (t) => this.onClose(t)), this.connection.on("error", (t) => this.events.emit("error", t)), this.connection.on("register_error", (t) => this.onClose()), this.hasRegisteredEventListeners = true);
  }
};

// node_modules/@walletconnect/jsonrpc-ws-connection/dist/index.es.js
var import_events6 = __toESM(require_events());
var v2 = () => typeof WebSocket < "u" ? WebSocket : typeof global < "u" && typeof global.WebSocket < "u" ? global.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : require_browser();
var w = () => typeof WebSocket < "u" || typeof global < "u" && typeof global.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u";
var d2 = (r3) => r3.split("?")[0];
var h3 = 10;
var b2 = v2();
var f5 = class {
  constructor(e) {
    if (this.url = e, this.events = new import_events6.EventEmitter(), this.registering = false, !isWsUrl(e))
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
    this.url = e;
  }
  get connected() {
    return typeof this.socket < "u";
  }
  get connecting() {
    return this.registering;
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async open(e = this.url) {
    await this.register(e);
  }
  async close() {
    return new Promise((e, t) => {
      if (typeof this.socket > "u") {
        t(new Error("Connection already closed"));
        return;
      }
      this.socket.onclose = (n3) => {
        this.onClose(n3), e();
      }, this.socket.close();
    });
  }
  async send(e) {
    typeof this.socket > "u" && (this.socket = await this.register());
    try {
      this.socket.send(safeJsonStringify(e));
    } catch (t) {
      this.onError(e.id, t);
    }
  }
  register(e = this.url) {
    if (!isWsUrl(e))
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
    if (this.registering) {
      const t = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= t || this.events.listenerCount("open") >= t) && this.events.setMaxListeners(t + 1), new Promise((n3, s2) => {
        this.events.once("register_error", (o4) => {
          this.resetMaxListeners(), s2(o4);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.socket > "u")
            return s2(new Error("WebSocket connection is missing or invalid"));
          n3(this.socket);
        });
      });
    }
    return this.url = e, this.registering = true, new Promise((t, n3) => {
      const s2 = (0, esm_exports.isReactNative)() ? void 0 : { rejectUnauthorized: !isLocalhostUrl(e) }, o4 = new b2(e, [], s2);
      w() ? o4.onerror = (i3) => {
        const a3 = i3;
        n3(this.emitError(a3.error));
      } : o4.on("error", (i3) => {
        n3(this.emitError(i3));
      }), o4.onopen = () => {
        this.onOpen(o4), t(o4);
      };
    });
  }
  onOpen(e) {
    e.onmessage = (t) => this.onPayload(t), e.onclose = (t) => this.onClose(t), this.socket = e, this.registering = false, this.events.emit("open");
  }
  onClose(e) {
    this.socket = void 0, this.registering = false, this.events.emit("close", e);
  }
  onPayload(e) {
    if (typeof e.data > "u")
      return;
    const t = typeof e.data == "string" ? safeJsonParse(e.data) : e.data;
    this.events.emit("payload", t);
  }
  onError(e, t) {
    const n3 = this.parseError(t), s2 = n3.message || n3.toString(), o4 = formatJsonRpcError(e, s2);
    this.events.emit("payload", o4);
  }
  parseError(e, t = this.url) {
    return parseConnectionError(e, d2(t), "WS");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > h3 && this.events.setMaxListeners(h3);
  }
  emitError(e) {
    const t = this.parseError(new Error((e == null ? void 0 : e.message) || `WebSocket connection failed for host: ${d2(this.url)}`));
    return this.events.emit("register_error", t), t;
  }
};

// node_modules/@walletconnect/core/dist/index.es.js
var import_lodash = __toESM(require_lodash());
var import_window_getters2 = __toESM(require_cjs2());
var xe2 = "wc";
var Oe2 = 2;
var he = "core";
var B = `${xe2}@2:${he}:`;
var mt2 = { name: he, logger: "error" };
var vt2 = { database: ":memory:" };
var ft2 = "crypto";
var Ae2 = "client_ed25519_seed";
var _t2 = import_time3.ONE_DAY;
var Et2 = "keychain";
var wt2 = "0.3";
var It2 = "messages";
var Tt2 = "0.3";
var Ne2 = import_time3.SIX_HOURS;
var Ct2 = "publisher";
var Pt2 = "irn";
var St2 = "error";
var $e2 = "wss://relay.walletconnect.org";
var Rt2 = "relayer";
var T2 = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" };
var xt2 = "_subscription";
var L = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" };
var Ot2 = 0.1;
var me2 = "2.19.0";
var Q2 = { link_mode: "link_mode", relay: "relay" };
var At2 = "0.3";
var Nt2 = "WALLETCONNECT_CLIENT_ID";
var ze2 = "WALLETCONNECT_LINK_MODE_APPS";
var $ = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" };
var $t = "subscription";
var zt2 = "0.3";
var Lt2 = import_time3.FIVE_SECONDS * 1e3;
var kt2 = "pairing";
var Ut2 = "0.3";
var ie2 = { wc_pairingDelete: { req: { ttl: import_time3.ONE_DAY, prompt: false, tag: 1e3 }, res: { ttl: import_time3.ONE_DAY, prompt: false, tag: 1001 } }, wc_pairingPing: { req: { ttl: import_time3.THIRTY_SECONDS, prompt: false, tag: 1002 }, res: { ttl: import_time3.THIRTY_SECONDS, prompt: false, tag: 1003 } }, unregistered_method: { req: { ttl: import_time3.ONE_DAY, prompt: false, tag: 0 }, res: { ttl: import_time3.ONE_DAY, prompt: false, tag: 0 } } };
var se2 = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" };
var F2 = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" };
var Ft2 = "history";
var Mt = "0.3";
var Kt = "expirer";
var M3 = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" };
var Bt2 = "0.3";
var jt2 = "verify-api";
var js2 = "https://verify.walletconnect.com";
var Vt = "https://verify.walletconnect.org";
var le2 = Vt;
var qt = `${le2}/v3`;
var Gt2 = [js2, Vt];
var Ht = "echo";
var Yt2 = "https://echo.walletconnect.com";
var q2 = { pairing_started: "pairing_started", pairing_uri_validation_success: "pairing_uri_validation_success", pairing_uri_not_expired: "pairing_uri_not_expired", store_new_pairing: "store_new_pairing", subscribing_pairing_topic: "subscribing_pairing_topic", subscribe_pairing_topic_success: "subscribe_pairing_topic_success", existing_pairing: "existing_pairing", pairing_not_expired: "pairing_not_expired", emit_inactive_pairing: "emit_inactive_pairing", emit_session_proposal: "emit_session_proposal", subscribing_to_pairing_topic: "subscribing_to_pairing_topic" };
var J3 = { no_wss_connection: "no_wss_connection", no_internet_connection: "no_internet_connection", malformed_pairing_uri: "malformed_pairing_uri", active_pairing_already_exists: "active_pairing_already_exists", subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure", pairing_expired: "pairing_expired", proposal_expired: "proposal_expired", proposal_listener_not_found: "proposal_listener_not_found" };
var qs2 = { session_approve_started: "session_approve_started", proposal_not_expired: "proposal_not_expired", session_namespaces_validation_success: "session_namespaces_validation_success", create_session_topic: "create_session_topic", subscribing_session_topic: "subscribing_session_topic", subscribe_session_topic_success: "subscribe_session_topic_success", publishing_session_approve: "publishing_session_approve", session_approve_publish_success: "session_approve_publish_success", store_session: "store_session", publishing_session_settle: "publishing_session_settle", session_settle_publish_success: "session_settle_publish_success" };
var Gs2 = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", proposal_expired: "proposal_expired", subscribe_session_topic_failure: "subscribe_session_topic_failure", session_approve_publish_failure: "session_approve_publish_failure", session_settle_publish_failure: "session_settle_publish_failure", session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure", proposal_not_found: "proposal_not_found" };
var Hs2 = { authenticated_session_approve_started: "authenticated_session_approve_started", authenticated_session_not_expired: "authenticated_session_not_expired", chains_caip2_compliant: "chains_caip2_compliant", chains_evm_compliant: "chains_evm_compliant", create_authenticated_session_topic: "create_authenticated_session_topic", cacaos_verified: "cacaos_verified", store_authenticated_session: "store_authenticated_session", subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic", subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success", publishing_authenticated_session_approve: "publishing_authenticated_session_approve", authenticated_session_approve_publish_success: "authenticated_session_approve_publish_success" };
var Ys2 = { no_internet_connection: "no_internet_connection", no_wss_connection: "no_wss_connection", missing_session_authenticate_request: "missing_session_authenticate_request", session_authenticate_request_expired: "session_authenticate_request_expired", chains_caip2_compliant_failure: "chains_caip2_compliant_failure", chains_evm_compliant_failure: "chains_evm_compliant_failure", invalid_cacao: "invalid_cacao", subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure", authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure", authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found" };
var Jt2 = 0.1;
var Xt = "event-client";
var Wt2 = 86400;
var Zt = "https://pulse.walletconnect.org/batch";
function Js2(n3, e) {
  if (n3.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), s2 = 0; s2 < t.length; s2++)
    t[s2] = 255;
  for (var i3 = 0; i3 < n3.length; i3++) {
    var r3 = n3.charAt(i3), o4 = r3.charCodeAt(0);
    if (t[o4] !== 255)
      throw new TypeError(r3 + " is ambiguous");
    t[o4] = i3;
  }
  var a3 = n3.length, c5 = n3.charAt(0), h5 = Math.log(a3) / Math.log(256), u3 = Math.log(256) / Math.log(a3);
  function g4(l5) {
    if (l5 instanceof Uint8Array || (ArrayBuffer.isView(l5) ? l5 = new Uint8Array(l5.buffer, l5.byteOffset, l5.byteLength) : Array.isArray(l5) && (l5 = Uint8Array.from(l5))), !(l5 instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (l5.length === 0)
      return "";
    for (var y6 = 0, O5 = 0, w4 = 0, v6 = l5.length; w4 !== v6 && l5[w4] === 0; )
      w4++, y6++;
    for (var k5 = (v6 - w4) * u3 + 1 >>> 0, I3 = new Uint8Array(k5); w4 !== v6; ) {
      for (var V4 = l5[w4], X2 = 0, K4 = k5 - 1; (V4 !== 0 || X2 < O5) && K4 !== -1; K4--, X2++)
        V4 += 256 * I3[K4] >>> 0, I3[K4] = V4 % a3 >>> 0, V4 = V4 / a3 >>> 0;
      if (V4 !== 0)
        throw new Error("Non-zero carry");
      O5 = X2, w4++;
    }
    for (var Y4 = k5 - O5; Y4 !== k5 && I3[Y4] === 0; )
      Y4++;
    for (var ge = c5.repeat(y6); Y4 < k5; ++Y4)
      ge += n3.charAt(I3[Y4]);
    return ge;
  }
  function m3(l5) {
    if (typeof l5 != "string")
      throw new TypeError("Expected String");
    if (l5.length === 0)
      return new Uint8Array();
    var y6 = 0;
    if (l5[y6] !== " ") {
      for (var O5 = 0, w4 = 0; l5[y6] === c5; )
        O5++, y6++;
      for (var v6 = (l5.length - y6) * h5 + 1 >>> 0, k5 = new Uint8Array(v6); l5[y6]; ) {
        var I3 = t[l5.charCodeAt(y6)];
        if (I3 === 255)
          return;
        for (var V4 = 0, X2 = v6 - 1; (I3 !== 0 || V4 < w4) && X2 !== -1; X2--, V4++)
          I3 += a3 * k5[X2] >>> 0, k5[X2] = I3 % 256 >>> 0, I3 = I3 / 256 >>> 0;
        if (I3 !== 0)
          throw new Error("Non-zero carry");
        w4 = V4, y6++;
      }
      if (l5[y6] !== " ") {
        for (var K4 = v6 - w4; K4 !== v6 && k5[K4] === 0; )
          K4++;
        for (var Y4 = new Uint8Array(O5 + (v6 - K4)), ge = O5; K4 !== v6; )
          Y4[ge++] = k5[K4++];
        return Y4;
      }
    }
  }
  function A5(l5) {
    var y6 = m3(l5);
    if (y6)
      return y6;
    throw new Error(`Non-${e} character`);
  }
  return { encode: g4, decodeUnsafe: m3, decode: A5 };
}
var Xs2 = Js2;
var Ws2 = Xs2;
var Qt = (n3) => {
  if (n3 instanceof Uint8Array && n3.constructor.name === "Uint8Array")
    return n3;
  if (n3 instanceof ArrayBuffer)
    return new Uint8Array(n3);
  if (ArrayBuffer.isView(n3))
    return new Uint8Array(n3.buffer, n3.byteOffset, n3.byteLength);
  throw new Error("Unknown type, must be binary type");
};
var Zs2 = (n3) => new TextEncoder().encode(n3);
var Qs2 = (n3) => new TextDecoder().decode(n3);
var er2 = class {
  constructor(e, t, s2) {
    this.name = e, this.prefix = t, this.baseEncode = s2;
  }
  encode(e) {
    if (e instanceof Uint8Array)
      return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
};
var tr2 = class {
  constructor(e, t, s2) {
    if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0)
      throw new Error("Invalid prefix character");
    this.prefixCodePoint = t.codePointAt(0), this.baseDecode = s2;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint)
        throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else
      throw Error("Can only multibase decode strings");
  }
  or(e) {
    return ei2(this, e);
  }
};
var ir2 = class {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return ei2(this, e);
  }
  decode(e) {
    const t = e[0], s2 = this.decoders[t];
    if (s2)
      return s2.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
};
var ei2 = (n3, e) => new ir2({ ...n3.decoders || { [n3.prefix]: n3 }, ...e.decoders || { [e.prefix]: e } });
var sr2 = class {
  constructor(e, t, s2, i3) {
    this.name = e, this.prefix = t, this.baseEncode = s2, this.baseDecode = i3, this.encoder = new er2(e, t, s2), this.decoder = new tr2(e, t, i3);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
};
var ve2 = ({ name: n3, prefix: e, encode: t, decode: s2 }) => new sr2(n3, e, t, s2);
var ue2 = ({ prefix: n3, name: e, alphabet: t }) => {
  const { encode: s2, decode: i3 } = Ws2(t, e);
  return ve2({ prefix: n3, name: e, encode: s2, decode: (r3) => Qt(i3(r3)) });
};
var rr2 = (n3, e, t, s2) => {
  const i3 = {};
  for (let u3 = 0; u3 < e.length; ++u3)
    i3[e[u3]] = u3;
  let r3 = n3.length;
  for (; n3[r3 - 1] === "="; )
    --r3;
  const o4 = new Uint8Array(r3 * t / 8 | 0);
  let a3 = 0, c5 = 0, h5 = 0;
  for (let u3 = 0; u3 < r3; ++u3) {
    const g4 = i3[n3[u3]];
    if (g4 === void 0)
      throw new SyntaxError(`Non-${s2} character`);
    c5 = c5 << t | g4, a3 += t, a3 >= 8 && (a3 -= 8, o4[h5++] = 255 & c5 >> a3);
  }
  if (a3 >= t || 255 & c5 << 8 - a3)
    throw new SyntaxError("Unexpected end of data");
  return o4;
};
var nr2 = (n3, e, t) => {
  const s2 = e[e.length - 1] === "=", i3 = (1 << t) - 1;
  let r3 = "", o4 = 0, a3 = 0;
  for (let c5 = 0; c5 < n3.length; ++c5)
    for (a3 = a3 << 8 | n3[c5], o4 += 8; o4 > t; )
      o4 -= t, r3 += e[i3 & a3 >> o4];
  if (o4 && (r3 += e[i3 & a3 << t - o4]), s2)
    for (; r3.length * t & 7; )
      r3 += "=";
  return r3;
};
var C2 = ({ name: n3, prefix: e, bitsPerChar: t, alphabet: s2 }) => ve2({ prefix: e, name: n3, encode(i3) {
  return nr2(i3, s2, t);
}, decode(i3) {
  return rr2(i3, s2, t, n3);
} });
var or2 = ve2({ prefix: "\0", name: "identity", encode: (n3) => Qs2(n3), decode: (n3) => Zs2(n3) });
var ar2 = Object.freeze({ __proto__: null, identity: or2 });
var cr2 = C2({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var hr2 = Object.freeze({ __proto__: null, base2: cr2 });
var lr2 = C2({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var ur = Object.freeze({ __proto__: null, base8: lr2 });
var dr2 = ue2({ prefix: "9", name: "base10", alphabet: "0123456789" });
var pr2 = Object.freeze({ __proto__: null, base10: dr2 });
var gr2 = C2({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 });
var yr2 = C2({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var br2 = Object.freeze({ __proto__: null, base16: gr2, base16upper: yr2 });
var Dr = C2({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 });
var mr2 = C2({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 });
var vr2 = C2({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 });
var fr = C2({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 });
var _r2 = C2({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 });
var Er2 = C2({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 });
var wr2 = C2({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 });
var Ir2 = C2({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 });
var Tr2 = C2({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var Cr = Object.freeze({ __proto__: null, base32: Dr, base32upper: mr2, base32pad: vr2, base32padupper: fr, base32hex: _r2, base32hexupper: Er2, base32hexpad: wr2, base32hexpadupper: Ir2, base32z: Tr2 });
var Pr = ue2({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" });
var Sr2 = ue2({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var Rr2 = Object.freeze({ __proto__: null, base36: Pr, base36upper: Sr2 });
var xr2 = ue2({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" });
var Or2 = ue2({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var Ar2 = Object.freeze({ __proto__: null, base58btc: xr2, base58flickr: Or2 });
var Nr2 = C2({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 });
var $r2 = C2({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 });
var zr2 = C2({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 });
var Lr2 = C2({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var kr2 = Object.freeze({ __proto__: null, base64: Nr2, base64pad: $r2, base64url: zr2, base64urlpad: Lr2 });
var ti2 = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂");
var Ur2 = ti2.reduce((n3, e, t) => (n3[t] = e, n3), []);
var Fr = ti2.reduce((n3, e, t) => (n3[e.codePointAt(0)] = t, n3), []);
function Mr(n3) {
  return n3.reduce((e, t) => (e += Ur2[t], e), "");
}
function Kr3(n3) {
  const e = [];
  for (const t of n3) {
    const s2 = Fr[t.codePointAt(0)];
    if (s2 === void 0)
      throw new Error(`Non-base256emoji character: ${t}`);
    e.push(s2);
  }
  return new Uint8Array(e);
}
var Br2 = ve2({ prefix: "🚀", name: "base256emoji", encode: Mr, decode: Kr3 });
var jr = Object.freeze({ __proto__: null, base256emoji: Br2 });
var Vr = si2;
var ii2 = 128;
var qr = 127;
var Gr = ~qr;
var Hr2 = Math.pow(2, 31);
function si2(n3, e, t) {
  e = e || [], t = t || 0;
  for (var s2 = t; n3 >= Hr2; )
    e[t++] = n3 & 255 | ii2, n3 /= 128;
  for (; n3 & Gr; )
    e[t++] = n3 & 255 | ii2, n3 >>>= 7;
  return e[t] = n3 | 0, si2.bytes = t - s2 + 1, e;
}
var Yr2 = Le2;
var Jr2 = 128;
var ri2 = 127;
function Le2(n3, s2) {
  var t = 0, s2 = s2 || 0, i3 = 0, r3 = s2, o4, a3 = n3.length;
  do {
    if (r3 >= a3)
      throw Le2.bytes = 0, new RangeError("Could not decode varint");
    o4 = n3[r3++], t += i3 < 28 ? (o4 & ri2) << i3 : (o4 & ri2) * Math.pow(2, i3), i3 += 7;
  } while (o4 >= Jr2);
  return Le2.bytes = r3 - s2, t;
}
var Xr = Math.pow(2, 7);
var Wr2 = Math.pow(2, 14);
var Zr2 = Math.pow(2, 21);
var Qr = Math.pow(2, 28);
var en2 = Math.pow(2, 35);
var tn2 = Math.pow(2, 42);
var sn3 = Math.pow(2, 49);
var rn2 = Math.pow(2, 56);
var nn2 = Math.pow(2, 63);
var on2 = function(n3) {
  return n3 < Xr ? 1 : n3 < Wr2 ? 2 : n3 < Zr2 ? 3 : n3 < Qr ? 4 : n3 < en2 ? 5 : n3 < tn2 ? 6 : n3 < sn3 ? 7 : n3 < rn2 ? 8 : n3 < nn2 ? 9 : 10;
};
var an2 = { encode: Vr, decode: Yr2, encodingLength: on2 };
var ni2 = an2;
var oi2 = (n3, e, t = 0) => (ni2.encode(n3, e, t), e);
var ai2 = (n3) => ni2.encodingLength(n3);
var ke2 = (n3, e) => {
  const t = e.byteLength, s2 = ai2(n3), i3 = s2 + ai2(t), r3 = new Uint8Array(i3 + t);
  return oi2(n3, r3, 0), oi2(t, r3, s2), r3.set(e, i3), new cn2(n3, t, e, r3);
};
var cn2 = class {
  constructor(e, t, s2, i3) {
    this.code = e, this.size = t, this.digest = s2, this.bytes = i3;
  }
};
var ci2 = ({ name: n3, code: e, encode: t }) => new hn2(n3, e, t);
var hn2 = class {
  constructor(e, t, s2) {
    this.name = e, this.code = t, this.encode = s2;
  }
  digest(e) {
    if (e instanceof Uint8Array) {
      const t = this.encode(e);
      return t instanceof Uint8Array ? ke2(this.code, t) : t.then((s2) => ke2(this.code, s2));
    } else
      throw Error("Unknown type, must be binary type");
  }
};
var hi2 = (n3) => async (e) => new Uint8Array(await crypto.subtle.digest(n3, e));
var ln2 = ci2({ name: "sha2-256", code: 18, encode: hi2("SHA-256") });
var un2 = ci2({ name: "sha2-512", code: 19, encode: hi2("SHA-512") });
var dn2 = Object.freeze({ __proto__: null, sha256: ln2, sha512: un2 });
var li2 = 0;
var pn2 = "identity";
var ui2 = Qt;
var gn2 = (n3) => ke2(li2, ui2(n3));
var yn2 = { code: li2, name: pn2, encode: ui2, digest: gn2 };
var bn2 = Object.freeze({ __proto__: null, identity: yn2 });
new TextEncoder(), new TextDecoder();
var di2 = { ...ar2, ...hr2, ...ur, ...pr2, ...br2, ...Cr, ...Rr2, ...Ar2, ...kr2, ...jr };
({ ...dn2, ...bn2 });
function Dn2(n3 = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? globalThis.Buffer.allocUnsafe(n3) : new Uint8Array(n3);
}
function pi2(n3, e, t, s2) {
  return { name: n3, prefix: e, encoder: { name: n3, prefix: e, encode: t }, decoder: { decode: s2 } };
}
var gi2 = pi2("utf8", "u", (n3) => "u" + new TextDecoder("utf8").decode(n3), (n3) => new TextEncoder().encode(n3.substring(1)));
var Ue2 = pi2("ascii", "a", (n3) => {
  let e = "a";
  for (let t = 0; t < n3.length; t++)
    e += String.fromCharCode(n3[t]);
  return e;
}, (n3) => {
  n3 = n3.substring(1);
  const e = Dn2(n3.length);
  for (let t = 0; t < n3.length; t++)
    e[t] = n3.charCodeAt(t);
  return e;
});
var mn2 = { utf8: gi2, "utf-8": gi2, hex: di2.base16, latin1: Ue2, ascii: Ue2, binary: Ue2, ...di2 };
function vn2(n3, e = "utf8") {
  const t = mn2[e];
  if (!t)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(n3, "utf8") : t.decoder.decode(`${t.prefix}${n3}`);
}
var fn2 = Object.defineProperty;
var _n2 = (n3, e, t) => e in n3 ? fn2(n3, e, { enumerable: true, configurable: true, writable: true, value: t }) : n3[e] = t;
var G = (n3, e, t) => _n2(n3, typeof e != "symbol" ? e + "" : e, t);
var yi2 = class {
  constructor(e, t) {
    this.core = e, this.logger = t, G(this, "keychain", /* @__PURE__ */ new Map()), G(this, "name", Et2), G(this, "version", wt2), G(this, "initialized", false), G(this, "storagePrefix", B), G(this, "init", async () => {
      if (!this.initialized) {
        const s2 = await this.getKeyChain();
        typeof s2 < "u" && (this.keychain = s2), this.initialized = true;
      }
    }), G(this, "has", (s2) => (this.isInitialized(), this.keychain.has(s2))), G(this, "set", async (s2, i3) => {
      this.isInitialized(), this.keychain.set(s2, i3), await this.persist();
    }), G(this, "get", (s2) => {
      this.isInitialized();
      const i3 = this.keychain.get(s2);
      if (typeof i3 > "u") {
        const { message: r3 } = te("NO_MATCHING_KEY", `${this.name}: ${s2}`);
        throw new Error(r3);
      }
      return i3;
    }), G(this, "del", async (s2) => {
      this.isInitialized(), this.keychain.delete(s2), await this.persist();
    }), this.core = e, this.logger = E(t, this.name);
  }
  get context() {
    return y(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(e) {
    await this.core.storage.setItem(this.storageKey, no(e));
  }
  async getKeyChain() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? ro(e) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = te("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
var En2 = Object.defineProperty;
var wn2 = (n3, e, t) => e in n3 ? En2(n3, e, { enumerable: true, configurable: true, writable: true, value: t }) : n3[e] = t;
var P2 = (n3, e, t) => wn2(n3, typeof e != "symbol" ? e + "" : e, t);
var bi2 = class {
  constructor(e, t, s2) {
    this.core = e, this.logger = t, P2(this, "name", ft2), P2(this, "keychain"), P2(this, "randomSessionIdentifier", ni()), P2(this, "initialized", false), P2(this, "init", async () => {
      this.initialized || (await this.keychain.init(), this.initialized = true);
    }), P2(this, "hasKeys", (i3) => (this.isInitialized(), this.keychain.has(i3))), P2(this, "getClientId", async () => {
      this.isInitialized();
      const i3 = await this.getClientSeed(), r3 = Po(i3);
      return Qe(r3.publicKey);
    }), P2(this, "generateKeyPair", () => {
      this.isInitialized();
      const i3 = ti();
      return this.setPrivateKey(i3.publicKey, i3.privateKey);
    }), P2(this, "signJWT", async (i3) => {
      this.isInitialized();
      const r3 = await this.getClientSeed(), o4 = Po(r3), a3 = this.randomSessionIdentifier, c5 = _t2;
      return await Qo(a3, i3, c5, o4);
    }), P2(this, "generateSharedKey", (i3, r3, o4) => {
      this.isInitialized();
      const a3 = this.getPrivateKey(i3), c5 = ri(a3, r3);
      return this.setSymKey(c5, o4);
    }), P2(this, "setSymKey", async (i3, r3) => {
      this.isInitialized();
      const o4 = r3 || oi(i3);
      return await this.keychain.set(o4, i3), o4;
    }), P2(this, "deleteKeyPair", async (i3) => {
      this.isInitialized(), await this.keychain.del(i3);
    }), P2(this, "deleteSymKey", async (i3) => {
      this.isInitialized(), await this.keychain.del(i3);
    }), P2(this, "encode", async (i3, r3, o4) => {
      this.isInitialized();
      const a3 = rr(o4), c5 = safeJsonStringify(r3);
      if (di(a3))
        return ai(c5, o4 == null ? void 0 : o4.encoding);
      if (li(a3)) {
        const m3 = a3.senderPublicKey, A5 = a3.receiverPublicKey;
        i3 = await this.generateSharedKey(m3, A5);
      }
      const h5 = this.getSymKey(i3), { type: u3, senderPublicKey: g4 } = a3;
      return ii({ type: u3, symKey: h5, message: c5, senderPublicKey: g4, encoding: o4 == null ? void 0 : o4.encoding });
    }), P2(this, "decode", async (i3, r3, o4) => {
      this.isInitialized();
      const a3 = fi(r3, o4);
      if (di(a3)) {
        const c5 = ui(r3, o4 == null ? void 0 : o4.encoding);
        return safeJsonParse(c5);
      }
      if (li(a3)) {
        const c5 = a3.receiverPublicKey, h5 = a3.senderPublicKey;
        i3 = await this.generateSharedKey(c5, h5);
      }
      try {
        const c5 = this.getSymKey(i3), h5 = ci({ symKey: c5, encoded: r3, encoding: o4 == null ? void 0 : o4.encoding });
        return safeJsonParse(h5);
      } catch (c5) {
        this.logger.error(`Failed to decode message from topic: '${i3}', clientId: '${await this.getClientId()}'`), this.logger.error(c5);
      }
    }), P2(this, "getPayloadType", (i3, r3 = At) => {
      const o4 = Fe({ encoded: i3, encoding: r3 });
      return fe(o4.type);
    }), P2(this, "getPayloadSenderPublicKey", (i3, r3 = At) => {
      const o4 = Fe({ encoded: i3, encoding: r3 });
      return o4.senderPublicKey ? toString(o4.senderPublicKey, V) : void 0;
    }), this.core = e, this.logger = E(t, this.name), this.keychain = s2 || new yi2(this.core, this.logger);
  }
  get context() {
    return y(this.logger);
  }
  async setPrivateKey(e, t) {
    return await this.keychain.set(e, t), e;
  }
  getPrivateKey(e) {
    return this.keychain.get(e);
  }
  async getClientSeed() {
    let e = "";
    try {
      e = this.keychain.get(Ae2);
    } catch {
      e = ni(), await this.keychain.set(Ae2, e);
    }
    return vn2(e, "base16");
  }
  getSymKey(e) {
    return this.keychain.get(e);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = te("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
var In2 = Object.defineProperty;
var Tn2 = (n3, e, t) => e in n3 ? In2(n3, e, { enumerable: true, configurable: true, writable: true, value: t }) : n3[e] = t;
var H2 = (n3, e, t) => Tn2(n3, typeof e != "symbol" ? e + "" : e, t);
var Di2 = class extends y3 {
  constructor(e, t) {
    super(e, t), this.logger = e, this.core = t, H2(this, "messages", /* @__PURE__ */ new Map()), H2(this, "name", It2), H2(this, "version", Tt2), H2(this, "initialized", false), H2(this, "storagePrefix", B), H2(this, "init", async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const s2 = await this.getRelayerMessages();
          typeof s2 < "u" && (this.messages = s2), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (s2) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(s2);
        } finally {
          this.initialized = true;
        }
      }
    }), H2(this, "set", async (s2, i3) => {
      this.isInitialized();
      const r3 = si(i3);
      let o4 = this.messages.get(s2);
      return typeof o4 > "u" && (o4 = {}), typeof o4[r3] < "u" || (o4[r3] = i3, this.messages.set(s2, o4), await this.persist()), r3;
    }), H2(this, "get", (s2) => {
      this.isInitialized();
      let i3 = this.messages.get(s2);
      return typeof i3 > "u" && (i3 = {}), i3;
    }), H2(this, "has", (s2, i3) => {
      this.isInitialized();
      const r3 = this.get(s2), o4 = si(i3);
      return typeof r3[o4] < "u";
    }), H2(this, "del", async (s2) => {
      this.isInitialized(), this.messages.delete(s2), await this.persist();
    }), this.logger = E(e, this.name), this.core = t;
  }
  get context() {
    return y(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setRelayerMessages(e) {
    await this.core.storage.setItem(this.storageKey, no(e));
  }
  async getRelayerMessages() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? ro(e) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = te("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
var Cn2 = Object.defineProperty;
var Pn = Object.defineProperties;
var Sn = Object.getOwnPropertyDescriptors;
var mi2 = Object.getOwnPropertySymbols;
var Rn2 = Object.prototype.hasOwnProperty;
var xn2 = Object.prototype.propertyIsEnumerable;
var Fe2 = (n3, e, t) => e in n3 ? Cn2(n3, e, { enumerable: true, configurable: true, writable: true, value: t }) : n3[e] = t;
var fe2 = (n3, e) => {
  for (var t in e || (e = {}))
    Rn2.call(e, t) && Fe2(n3, t, e[t]);
  if (mi2)
    for (var t of mi2(e))
      xn2.call(e, t) && Fe2(n3, t, e[t]);
  return n3;
};
var Me2 = (n3, e) => Pn(n3, Sn(e));
var j2 = (n3, e, t) => Fe2(n3, typeof e != "symbol" ? e + "" : e, t);
var On2 = class extends m {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, j2(this, "events", new import_events7.EventEmitter()), j2(this, "name", Ct2), j2(this, "queue", /* @__PURE__ */ new Map()), j2(this, "publishTimeout", (0, import_time3.toMiliseconds)(import_time3.ONE_MINUTE)), j2(this, "initialPublishTimeout", (0, import_time3.toMiliseconds)(import_time3.ONE_SECOND * 15)), j2(this, "needsTransportRestart", false), j2(this, "publish", async (s2, i3, r3) => {
      var o4;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: s2, message: i3, opts: r3 } });
      const a3 = (r3 == null ? void 0 : r3.ttl) || Ne2, c5 = yi(r3), h5 = (r3 == null ? void 0 : r3.prompt) || false, u3 = (r3 == null ? void 0 : r3.tag) || 0, g4 = (r3 == null ? void 0 : r3.id) || getBigIntRpcId().toString(), m3 = { topic: s2, message: i3, opts: { ttl: a3, relay: c5, prompt: h5, tag: u3, id: g4, attestation: r3 == null ? void 0 : r3.attestation, tvf: r3 == null ? void 0 : r3.tvf } }, A5 = `Failed to publish payload, please try again. id:${g4} tag:${u3}`;
      try {
        const l5 = new Promise(async (y6) => {
          const O5 = ({ id: v6 }) => {
            m3.opts.id === v6 && (this.removeRequestFromQueue(v6), this.relayer.events.removeListener(T2.publish, O5), y6(m3));
          };
          this.relayer.events.on(T2.publish, O5);
          const w4 = ao(new Promise((v6, k5) => {
            this.rpcPublish({ topic: s2, message: i3, ttl: a3, prompt: h5, tag: u3, id: g4, attestation: r3 == null ? void 0 : r3.attestation, tvf: r3 == null ? void 0 : r3.tvf }).then(v6).catch((I3) => {
              this.logger.warn(I3, I3 == null ? void 0 : I3.message), k5(I3);
            });
          }), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${g4} tag:${u3}`);
          try {
            await w4, this.events.removeListener(T2.publish, O5);
          } catch (v6) {
            this.queue.set(g4, Me2(fe2({}, m3), { attempt: 1 })), this.logger.warn(v6, v6 == null ? void 0 : v6.message);
          }
        });
        this.logger.trace({ type: "method", method: "publish", params: { id: g4, topic: s2, message: i3, opts: r3 } }), await ao(l5, this.publishTimeout, A5);
      } catch (l5) {
        if (this.logger.debug("Failed to Publish Payload"), this.logger.error(l5), (o4 = r3 == null ? void 0 : r3.internal) != null && o4.throwOnFailedPublish)
          throw l5;
      } finally {
        this.queue.delete(g4);
      }
    }), j2(this, "on", (s2, i3) => {
      this.events.on(s2, i3);
    }), j2(this, "once", (s2, i3) => {
      this.events.once(s2, i3);
    }), j2(this, "off", (s2, i3) => {
      this.events.off(s2, i3);
    }), j2(this, "removeListener", (s2, i3) => {
      this.events.removeListener(s2, i3);
    }), this.relayer = e, this.logger = E(t, this.name), this.registerEventListeners();
  }
  get context() {
    return y(this.logger);
  }
  async rpcPublish(e) {
    var t, s2, i3, r3;
    const { topic: o4, message: a3, ttl: c5 = Ne2, prompt: h5, tag: u3, id: g4, attestation: m3, tvf: A5 } = e, l5 = { method: mi(yi().protocol).publish, params: fe2({ topic: o4, message: a3, ttl: c5, prompt: h5, tag: u3, attestation: m3 }, A5), id: g4 };
    ae((t = l5.params) == null ? void 0 : t.prompt) && ((s2 = l5.params) == null || delete s2.prompt), ae((i3 = l5.params) == null ? void 0 : i3.tag) && ((r3 = l5.params) == null || delete r3.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: l5 });
    const y6 = await this.relayer.request(l5);
    return this.relayer.events.emit(T2.publish, e), this.logger.debug("Successfully Published Payload"), y6;
  }
  removeRequestFromQueue(e) {
    this.queue.delete(e);
  }
  checkQueue() {
    this.queue.forEach(async (e, t) => {
      const s2 = e.attempt + 1;
      this.queue.set(t, Me2(fe2({}, e), { attempt: s2 }));
      const { topic: i3, message: r3, opts: o4, attestation: a3 } = e;
      this.logger.warn({}, `Publisher: queue->publishing: ${e.opts.id}, tag: ${e.opts.tag}, attempt: ${s2}`), await this.rpcPublish(Me2(fe2({}, e), { topic: i3, message: r3, ttl: o4.ttl, prompt: o4.prompt, tag: o4.tag, id: o4.id, attestation: a3, tvf: o4.tvf })), this.logger.warn({}, `Publisher: queue->published: ${e.opts.id}`);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(r2.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = false, this.relayer.events.emit(T2.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(T2.message_ack, (e) => {
      this.removeRequestFromQueue(e.id.toString());
    });
  }
};
var An = Object.defineProperty;
var Nn = (n3, e, t) => e in n3 ? An(n3, e, { enumerable: true, configurable: true, writable: true, value: t }) : n3[e] = t;
var re2 = (n3, e, t) => Nn(n3, typeof e != "symbol" ? e + "" : e, t);
var $n = class {
  constructor() {
    re2(this, "map", /* @__PURE__ */ new Map()), re2(this, "set", (e, t) => {
      const s2 = this.get(e);
      this.exists(e, t) || this.map.set(e, [...s2, t]);
    }), re2(this, "get", (e) => this.map.get(e) || []), re2(this, "exists", (e, t) => this.get(e).includes(t)), re2(this, "delete", (e, t) => {
      if (typeof t > "u") {
        this.map.delete(e);
        return;
      }
      if (!this.map.has(e))
        return;
      const s2 = this.get(e);
      if (!this.exists(e, t))
        return;
      const i3 = s2.filter((r3) => r3 !== t);
      if (!i3.length) {
        this.map.delete(e);
        return;
      }
      this.map.set(e, i3);
    }), re2(this, "clear", () => {
      this.map.clear();
    });
  }
  get topics() {
    return Array.from(this.map.keys());
  }
};
var zn2 = Object.defineProperty;
var Ln2 = Object.defineProperties;
var kn2 = Object.getOwnPropertyDescriptors;
var vi = Object.getOwnPropertySymbols;
var Un2 = Object.prototype.hasOwnProperty;
var Fn2 = Object.prototype.propertyIsEnumerable;
var Ke2 = (n3, e, t) => e in n3 ? zn2(n3, e, { enumerable: true, configurable: true, writable: true, value: t }) : n3[e] = t;
var de2 = (n3, e) => {
  for (var t in e || (e = {}))
    Un2.call(e, t) && Ke2(n3, t, e[t]);
  if (vi)
    for (var t of vi(e))
      Fn2.call(e, t) && Ke2(n3, t, e[t]);
  return n3;
};
var Be = (n3, e) => Ln2(n3, kn2(e));
var D2 = (n3, e, t) => Ke2(n3, typeof e != "symbol" ? e + "" : e, t);
var fi2 = class extends P {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, D2(this, "subscriptions", /* @__PURE__ */ new Map()), D2(this, "topicMap", new $n()), D2(this, "events", new import_events7.EventEmitter()), D2(this, "name", $t), D2(this, "version", zt2), D2(this, "pending", /* @__PURE__ */ new Map()), D2(this, "cached", []), D2(this, "initialized", false), D2(this, "pendingSubscriptionWatchLabel", "pending_sub_watch_label"), D2(this, "pollingInterval", 20), D2(this, "storagePrefix", B), D2(this, "subscribeTimeout", (0, import_time3.toMiliseconds)(import_time3.ONE_MINUTE)), D2(this, "initialSubscribeTimeout", (0, import_time3.toMiliseconds)(import_time3.ONE_SECOND * 15)), D2(this, "clientId"), D2(this, "batchSubscribeTopicsLimit", 500), D2(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), await this.restore()), this.initialized = true;
    }), D2(this, "subscribe", async (s2, i3) => {
      this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: s2, opts: i3 } });
      try {
        const r3 = yi(i3), o4 = { topic: s2, relay: r3, transportType: i3 == null ? void 0 : i3.transportType };
        this.pending.set(s2, o4);
        const a3 = await this.rpcSubscribe(s2, r3, i3);
        return typeof a3 == "string" && (this.onSubscribe(a3, o4), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: s2, opts: i3 } })), a3;
      } catch (r3) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(r3), r3;
      }
    }), D2(this, "unsubscribe", async (s2, i3) => {
      this.isInitialized(), typeof (i3 == null ? void 0 : i3.id) < "u" ? await this.unsubscribeById(s2, i3.id, i3) : await this.unsubscribeByTopic(s2, i3);
    }), D2(this, "isSubscribed", async (s2) => {
      if (this.topics.includes(s2))
        return true;
      const i3 = `${this.pendingSubscriptionWatchLabel}_${s2}`;
      return await new Promise((r3, o4) => {
        const a3 = new import_time3.Watch();
        a3.start(i3);
        const c5 = setInterval(() => {
          (!this.pending.has(s2) && this.topics.includes(s2) || this.cached.some((h5) => h5.topic === s2)) && (clearInterval(c5), a3.stop(i3), r3(true)), a3.elapsed(i3) >= Lt2 && (clearInterval(c5), a3.stop(i3), o4(new Error("Subscription resolution timeout")));
        }, this.pollingInterval);
      }).catch(() => false);
    }), D2(this, "on", (s2, i3) => {
      this.events.on(s2, i3);
    }), D2(this, "once", (s2, i3) => {
      this.events.once(s2, i3);
    }), D2(this, "off", (s2, i3) => {
      this.events.off(s2, i3);
    }), D2(this, "removeListener", (s2, i3) => {
      this.events.removeListener(s2, i3);
    }), D2(this, "start", async () => {
      await this.onConnect();
    }), D2(this, "stop", async () => {
      await this.onDisconnect();
    }), D2(this, "restart", async () => {
      await this.restore(), await this.onRestart();
    }), D2(this, "checkPending", async () => {
      if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected))
        return;
      const s2 = [];
      this.pending.forEach((i3) => {
        s2.push(i3);
      }), await this.batchSubscribe(s2);
    }), D2(this, "registerEventListeners", () => {
      this.relayer.core.heartbeat.on(r2.pulse, async () => {
        await this.checkPending();
      }), this.events.on($.created, async (s2) => {
        const i3 = $.created;
        this.logger.info(`Emitting ${i3}`), this.logger.debug({ type: "event", event: i3, data: s2 }), await this.persist();
      }), this.events.on($.deleted, async (s2) => {
        const i3 = $.deleted;
        this.logger.info(`Emitting ${i3}`), this.logger.debug({ type: "event", event: i3, data: s2 }), await this.persist();
      });
    }), this.relayer = e, this.logger = E(t, this.name), this.clientId = "";
  }
  get context() {
    return y(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  get hasAnyTopics() {
    return this.topicMap.topics.length > 0 || this.pending.size > 0 || this.cached.length > 0 || this.subscriptions.size > 0;
  }
  hasSubscription(e, t) {
    let s2 = false;
    try {
      s2 = this.getSubscription(e).topic === t;
    } catch {
    }
    return s2;
  }
  reset() {
    this.cached = [], this.initialized = true;
  }
  onDisable() {
    this.cached = this.values, this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(e, t) {
    const s2 = this.topicMap.get(e);
    await Promise.all(s2.map(async (i3) => await this.unsubscribeById(e, i3, t)));
  }
  async unsubscribeById(e, t, s2) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: s2 } });
    try {
      const i3 = yi(s2);
      await this.restartToComplete({ topic: e, id: t, relay: i3 }), await this.rpcUnsubscribe(e, t, i3);
      const r3 = de("USER_DISCONNECTED", `${this.name}, ${e}`);
      await this.onUnsubscribe(e, t, r3), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: s2 } });
    } catch (i3) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(i3), i3;
    }
  }
  async rpcSubscribe(e, t, s2) {
    var i3;
    (!s2 || (s2 == null ? void 0 : s2.transportType) === Q2.relay) && await this.restartToComplete({ topic: e, id: e, relay: t });
    const r3 = { method: mi(t.protocol).subscribe, params: { topic: e } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: r3 });
    const o4 = (i3 = s2 == null ? void 0 : s2.internal) == null ? void 0 : i3.throwOnFailedPublish;
    try {
      const a3 = await this.getSubscriptionId(e);
      if ((s2 == null ? void 0 : s2.transportType) === Q2.link_mode)
        return setTimeout(() => {
          (this.relayer.connected || this.relayer.connecting) && this.relayer.request(r3).catch((u3) => this.logger.warn(u3));
        }, (0, import_time3.toMiliseconds)(import_time3.ONE_SECOND)), a3;
      const c5 = new Promise(async (u3) => {
        const g4 = (m3) => {
          m3.topic === e && (this.events.removeListener($.created, g4), u3(m3.id));
        };
        this.events.on($.created, g4);
        try {
          const m3 = await ao(new Promise((A5, l5) => {
            this.relayer.request(r3).catch((y6) => {
              this.logger.warn(y6, y6 == null ? void 0 : y6.message), l5(y6);
            }).then(A5);
          }), this.initialSubscribeTimeout, `Subscribing to ${e} failed, please try again`);
          this.events.removeListener($.created, g4), u3(m3);
        } catch {
        }
      }), h5 = await ao(c5, this.subscribeTimeout, `Subscribing to ${e} failed, please try again`);
      if (!h5 && o4)
        throw new Error(`Subscribing to ${e} failed, please try again`);
      return h5 ? a3 : null;
    } catch (a3) {
      if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(T2.connection_stalled), o4)
        throw a3;
    }
    return null;
  }
  async rpcBatchSubscribe(e) {
    if (!e.length)
      return;
    const t = e[0].relay, s2 = { method: mi(t.protocol).batchSubscribe, params: { topics: e.map((i3) => i3.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s2 });
    try {
      await await ao(new Promise((i3) => {
        this.relayer.request(s2).catch((r3) => this.logger.warn(r3)).then(i3);
      }), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again");
    } catch {
      this.relayer.events.emit(T2.connection_stalled);
    }
  }
  async rpcBatchFetchMessages(e) {
    if (!e.length)
      return;
    const t = e[0].relay, s2 = { method: mi(t.protocol).batchFetchMessages, params: { topics: e.map((r3) => r3.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s2 });
    let i3;
    try {
      i3 = await await ao(new Promise((r3, o4) => {
        this.relayer.request(s2).catch((a3) => {
          this.logger.warn(a3), o4(a3);
        }).then(r3);
      }), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again");
    } catch {
      this.relayer.events.emit(T2.connection_stalled);
    }
    return i3;
  }
  rpcUnsubscribe(e, t, s2) {
    const i3 = { method: mi(s2.protocol).unsubscribe, params: { topic: e, id: t } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i3 }), this.relayer.request(i3);
  }
  onSubscribe(e, t) {
    this.setSubscription(e, Be(de2({}, t), { id: e })), this.pending.delete(t.topic);
  }
  onBatchSubscribe(e) {
    e.length && e.forEach((t) => {
      this.setSubscription(t.id, de2({}, t)), this.pending.delete(t.topic);
    });
  }
  async onUnsubscribe(e, t, s2) {
    this.events.removeAllListeners(t), this.hasSubscription(t, e) && this.deleteSubscription(t, s2), await this.relayer.messages.del(e);
  }
  async setRelayerSubscriptions(e) {
    await this.relayer.core.storage.setItem(this.storageKey, e);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e, t) {
    this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e, subscription: t }), this.addSubscription(e, t);
  }
  addSubscription(e, t) {
    this.subscriptions.set(e, de2({}, t)), this.topicMap.set(t.topic, e), this.events.emit($.created, t);
  }
  getSubscription(e) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e });
    const t = this.subscriptions.get(e);
    if (!t) {
      const { message: s2 } = te("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(s2);
    }
    return t;
  }
  deleteSubscription(e, t) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e, reason: t });
    const s2 = this.getSubscription(e);
    this.subscriptions.delete(e), this.topicMap.delete(s2.topic, e), this.events.emit($.deleted, Be(de2({}, s2), { reason: t }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit($.sync);
  }
  async onRestart() {
    if (this.cached.length) {
      const e = [...this.cached], t = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let s2 = 0; s2 < t; s2++) {
        const i3 = e.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(i3);
      }
    }
    this.events.emit($.resubscribed);
  }
  async restore() {
    try {
      const e = await this.getRelayerSubscriptions();
      if (typeof e > "u" || !e.length)
        return;
      if (this.subscriptions.size) {
        const { message: t } = te("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
    }
  }
  async batchSubscribe(e) {
    e.length && (await this.rpcBatchSubscribe(e), this.onBatchSubscribe(await Promise.all(e.map(async (t) => Be(de2({}, t), { id: await this.getSubscriptionId(t.topic) })))));
  }
  async batchFetchMessages(e) {
    if (!e.length)
      return;
    this.logger.trace(`Fetching batch messages for ${e.length} subscriptions`);
    const t = await this.rpcBatchFetchMessages(e);
    t && t.messages && (await vo((0, import_time3.toMiliseconds)(import_time3.ONE_SECOND)), await this.relayer.handleBatchMessageEvents(t.messages));
  }
  async onConnect() {
    await this.restart(), this.reset();
  }
  onDisconnect() {
    this.onDisable();
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = te("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async restartToComplete(e) {
    !this.relayer.connected && !this.relayer.connecting && (this.cached.push(e), await this.relayer.transportOpen());
  }
  async getClientId() {
    return this.clientId || (this.clientId = await this.relayer.core.crypto.getClientId()), this.clientId;
  }
  async getSubscriptionId(e) {
    return si(e + await this.getClientId());
  }
};
var Mn2 = Object.defineProperty;
var _i = Object.getOwnPropertySymbols;
var Kn2 = Object.prototype.hasOwnProperty;
var Bn2 = Object.prototype.propertyIsEnumerable;
var je2 = (n3, e, t) => e in n3 ? Mn2(n3, e, { enumerable: true, configurable: true, writable: true, value: t }) : n3[e] = t;
var Ei2 = (n3, e) => {
  for (var t in e || (e = {}))
    Kn2.call(e, t) && je2(n3, t, e[t]);
  if (_i)
    for (var t of _i(e))
      Bn2.call(e, t) && je2(n3, t, e[t]);
  return n3;
};
var p2 = (n3, e, t) => je2(n3, typeof e != "symbol" ? e + "" : e, t);
var wi2 = class extends d {
  constructor(e) {
    super(e), p2(this, "protocol", "wc"), p2(this, "version", 2), p2(this, "core"), p2(this, "logger"), p2(this, "events", new import_events7.EventEmitter()), p2(this, "provider"), p2(this, "messages"), p2(this, "subscriber"), p2(this, "publisher"), p2(this, "name", Rt2), p2(this, "transportExplicitlyClosed", false), p2(this, "initialized", false), p2(this, "connectionAttemptInProgress", false), p2(this, "relayUrl"), p2(this, "projectId"), p2(this, "packageName"), p2(this, "bundleId"), p2(this, "hasExperiencedNetworkDisruption", false), p2(this, "pingTimeout"), p2(this, "heartBeatTimeout", (0, import_time3.toMiliseconds)(import_time3.THIRTY_SECONDS + import_time3.FIVE_SECONDS)), p2(this, "reconnectTimeout"), p2(this, "connectPromise"), p2(this, "reconnectInProgress", false), p2(this, "requestsInFlight", []), p2(this, "connectTimeout", (0, import_time3.toMiliseconds)(import_time3.ONE_SECOND * 15)), p2(this, "request", async (t) => {
      var s2, i3;
      this.logger.debug("Publishing Request Payload");
      const r3 = t.id || getBigIntRpcId().toString();
      await this.toEstablishConnection();
      try {
        this.logger.trace({ id: r3, method: t.method, topic: (s2 = t.params) == null ? void 0 : s2.topic }, "relayer.request - publishing...");
        const o4 = `${r3}:${((i3 = t.params) == null ? void 0 : i3.tag) || ""}`;
        this.requestsInFlight.push(o4);
        const a3 = await this.provider.request(t);
        return this.requestsInFlight = this.requestsInFlight.filter((c5) => c5 !== o4), a3;
      } catch (o4) {
        throw this.logger.debug(`Failed to Publish Request: ${r3}`), o4;
      }
    }), p2(this, "resetPingTimeout", () => {
      if (et())
        try {
          clearTimeout(this.pingTimeout), this.pingTimeout = setTimeout(() => {
            var t, s2, i3;
            this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."), (i3 = (s2 = (t = this.provider) == null ? void 0 : t.connection) == null ? void 0 : s2.socket) == null || i3.terminate();
          }, this.heartBeatTimeout);
        } catch (t) {
          this.logger.warn(t, t == null ? void 0 : t.message);
        }
    }), p2(this, "onPayloadHandler", (t) => {
      this.onProviderPayload(t), this.resetPingTimeout();
    }), p2(this, "onConnectHandler", () => {
      this.logger.warn({}, "Relayer connected 🛜"), this.startPingTimeout(), this.events.emit(T2.connect);
    }), p2(this, "onDisconnectHandler", () => {
      this.logger.warn({}, "Relayer disconnected 🛑"), this.requestsInFlight = [], this.onProviderDisconnect();
    }), p2(this, "onProviderErrorHandler", (t) => {
      this.logger.fatal(`Fatal socket error: ${t.message}`), this.events.emit(T2.error, t), this.logger.fatal("Fatal socket error received, closing transport"), this.transportClose();
    }), p2(this, "registerProviderListeners", () => {
      this.provider.on(L.payload, this.onPayloadHandler), this.provider.on(L.connect, this.onConnectHandler), this.provider.on(L.disconnect, this.onDisconnectHandler), this.provider.on(L.error, this.onProviderErrorHandler);
    }), this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? E(e.logger, this.name) : (0, import_pino.default)(k({ level: e.logger || St2 })), this.messages = new Di2(this.logger, e.core), this.subscriber = new fi2(this, this.logger), this.publisher = new On2(this, this.logger), this.relayUrl = (e == null ? void 0 : e.relayUrl) || $e2, this.projectId = e.projectId, Wr() ? this.packageName = Jr() : zr() && (this.bundleId = Jr()), this.provider = {};
  }
  async init() {
    if (this.logger.trace("Initialized"), this.registerEventListeners(), await Promise.all([this.messages.init(), this.subscriber.init()]), this.initialized = true, this.subscriber.hasAnyTopics)
      try {
        await this.transportOpen();
      } catch (e) {
        this.logger.warn(e, e == null ? void 0 : e.message);
      }
  }
  get context() {
    return y(this.logger);
  }
  get connected() {
    var e, t, s2;
    return ((s2 = (t = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : t.socket) == null ? void 0 : s2.readyState) === 1 || false;
  }
  get connecting() {
    var e, t, s2;
    return ((s2 = (t = (e = this.provider) == null ? void 0 : e.connection) == null ? void 0 : t.socket) == null ? void 0 : s2.readyState) === 0 || this.connectPromise !== void 0 || false;
  }
  async publish(e, t, s2) {
    this.isInitialized(), await this.publisher.publish(e, t, s2), await this.recordMessageEvent({ topic: e, message: t, publishedAt: Date.now(), transportType: Q2.relay });
  }
  async subscribe(e, t) {
    var s2, i3, r3;
    this.isInitialized(), (!(t != null && t.transportType) || (t == null ? void 0 : t.transportType) === "relay") && await this.toEstablishConnection();
    const o4 = typeof ((s2 = t == null ? void 0 : t.internal) == null ? void 0 : s2.throwOnFailedPublish) > "u" ? true : (i3 = t == null ? void 0 : t.internal) == null ? void 0 : i3.throwOnFailedPublish;
    let a3 = ((r3 = this.subscriber.topicMap.get(e)) == null ? void 0 : r3[0]) || "", c5;
    const h5 = (u3) => {
      u3.topic === e && (this.subscriber.off($.created, h5), c5());
    };
    return await Promise.all([new Promise((u3) => {
      c5 = u3, this.subscriber.on($.created, h5);
    }), new Promise(async (u3, g4) => {
      a3 = await this.subscriber.subscribe(e, Ei2({ internal: { throwOnFailedPublish: o4 } }, t)).catch((m3) => {
        o4 && g4(m3);
      }) || a3, u3();
    })]), a3;
  }
  async unsubscribe(e, t) {
    this.isInitialized(), await this.subscriber.unsubscribe(e, t);
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async transportDisconnect() {
    this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await ao(this.provider.disconnect(), 2e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.onProviderDisconnect();
  }
  async transportClose() {
    this.transportExplicitlyClosed = true, await this.transportDisconnect();
  }
  async transportOpen(e) {
    if (!this.subscriber.hasAnyTopics) {
      this.logger.warn("Starting WS connection skipped because the client has no topics to work with.");
      return;
    }
    if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."), await this.connectPromise, this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = new Promise(async (t, s2) => {
      await this.connect(e).then(t).catch(s2).finally(() => {
        this.connectPromise = void 0;
      });
    }), await this.connectPromise), !this.connected)
      throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`);
  }
  async restartTransport(e) {
    this.logger.debug({}, "Restarting transport..."), !this.connectionAttemptInProgress && (this.relayUrl = e || this.relayUrl, await this.confirmOnlineStateOrThrow(), await this.transportClose(), await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!await Yi())
      throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  async handleBatchMessageEvents(e) {
    if ((e == null ? void 0 : e.length) === 0) {
      this.logger.trace("Batch message events is empty. Ignoring...");
      return;
    }
    const t = e.sort((s2, i3) => s2.publishedAt - i3.publishedAt);
    this.logger.debug(`Batch of ${t.length} message events sorted`);
    for (const s2 of t)
      try {
        await this.onMessageEvent(s2);
      } catch (i3) {
        this.logger.warn(i3, "Error while processing batch message event: " + (i3 == null ? void 0 : i3.message));
      }
    this.logger.trace(`Batch of ${t.length} message events processed`);
  }
  async onLinkMessageEvent(e, t) {
    const { topic: s2 } = e;
    if (!t.sessionExists) {
      const i3 = ho(import_time3.FIVE_MINUTES), r3 = { topic: s2, expiry: i3, relay: { protocol: "irn" }, active: false };
      await this.core.pairing.pairings.set(s2, r3);
    }
    this.events.emit(T2.message, e), await this.recordMessageEvent(e);
  }
  async connect(e) {
    await this.confirmOnlineStateOrThrow(), e && e !== this.relayUrl && (this.relayUrl = e, await this.transportDisconnect()), this.connectionAttemptInProgress = true, this.transportExplicitlyClosed = false;
    let t = 1;
    for (; t < 6; ) {
      try {
        if (this.transportExplicitlyClosed)
          break;
        this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${t}...`), await this.createProvider(), await new Promise(async (s2, i3) => {
          const r3 = () => {
            i3(new Error("Connection interrupted while trying to subscribe"));
          };
          this.provider.once(L.disconnect, r3), await ao(new Promise((o4, a3) => {
            this.provider.connect().then(o4).catch(a3);
          }), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).catch((o4) => {
            i3(o4);
          }).finally(() => {
            this.provider.off(L.disconnect, r3), clearTimeout(this.reconnectTimeout);
          }), await new Promise(async (o4, a3) => {
            const c5 = () => {
              a3(new Error("Connection interrupted while trying to subscribe"));
            };
            this.provider.once(L.disconnect, c5), await this.subscriber.start().then(o4).catch(a3).finally(() => {
              this.provider.off(L.disconnect, c5);
            });
          }), this.hasExperiencedNetworkDisruption = false, s2();
        });
      } catch (s2) {
        await this.subscriber.stop();
        const i3 = s2;
        this.logger.warn({}, i3.message), this.hasExperiencedNetworkDisruption = true;
      } finally {
        this.connectionAttemptInProgress = false;
      }
      if (this.connected) {
        this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${t}`);
        break;
      }
      await new Promise((s2) => setTimeout(s2, (0, import_time3.toMiliseconds)(t * 1))), t++;
    }
  }
  startPingTimeout() {
    var e, t, s2, i3, r3;
    if (et())
      try {
        (t = (e = this.provider) == null ? void 0 : e.connection) != null && t.socket && ((r3 = (i3 = (s2 = this.provider) == null ? void 0 : s2.connection) == null ? void 0 : i3.socket) == null || r3.on("ping", () => {
          this.resetPingTimeout();
        })), this.resetPingTimeout();
      } catch (o4) {
        this.logger.warn(o4, o4 == null ? void 0 : o4.message);
      }
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const e = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new o2(new f5(Zr({ sdkVersion: me2, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e, useOnCloseEvent: true, bundleId: this.bundleId, packageName: this.packageName }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e) {
    const { topic: t, message: s2 } = e;
    await this.messages.set(t, s2);
  }
  async shouldIgnoreMessageEvent(e) {
    const { topic: t, message: s2 } = e;
    if (!s2 || s2.length === 0)
      return this.logger.warn(`Ignoring invalid/empty message: ${s2}`), true;
    if (!await this.subscriber.isSubscribed(t))
      return this.logger.warn(`Ignoring message for non-subscribed topic ${t}`), true;
    const i3 = this.messages.has(t, s2);
    return i3 && this.logger.warn(`Ignoring duplicate message: ${s2}`), i3;
  }
  async onProviderPayload(e) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e }), isJsonRpcRequest(e)) {
      if (!e.method.endsWith(xt2))
        return;
      const t = e.params, { topic: s2, message: i3, publishedAt: r3, attestation: o4 } = t.data, a3 = { topic: s2, message: i3, publishedAt: r3, transportType: Q2.relay, attestation: o4 };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(Ei2({ type: "event", event: t.id }, a3)), this.events.emit(t.id, a3), await this.acknowledgePayload(e), await this.onMessageEvent(a3);
    } else
      isJsonRpcResponse(e) && this.events.emit(T2.message_ack, e);
  }
  async onMessageEvent(e) {
    await this.shouldIgnoreMessageEvent(e) || (this.events.emit(T2.message, e), await this.recordMessageEvent(e));
  }
  async acknowledgePayload(e) {
    const t = formatJsonRpcResult(e.id, true);
    await this.provider.connection.send(t);
  }
  unregisterProviderListeners() {
    this.provider.off(L.payload, this.onPayloadHandler), this.provider.off(L.connect, this.onConnectHandler), this.provider.off(L.disconnect, this.onDisconnectHandler), this.provider.off(L.error, this.onProviderErrorHandler), clearTimeout(this.pingTimeout);
  }
  async registerEventListeners() {
    let e = await Yi();
    Xi(async (t) => {
      e !== t && (e = t, t ? await this.transportOpen().catch((s2) => this.logger.error(s2, s2 == null ? void 0 : s2.message)) : (this.hasExperiencedNetworkDisruption = true, await this.transportDisconnect(), this.transportExplicitlyClosed = false));
    });
  }
  async onProviderDisconnect() {
    clearTimeout(this.pingTimeout), this.events.emit(T2.disconnect), this.connectionAttemptInProgress = false, !this.reconnectInProgress && (this.reconnectInProgress = true, await this.subscriber.stop(), this.subscriber.hasAnyTopics && (this.transportExplicitlyClosed || (this.reconnectTimeout = setTimeout(async () => {
      await this.transportOpen().catch((e) => this.logger.error(e, e == null ? void 0 : e.message)), this.reconnectTimeout = void 0, this.reconnectInProgress = false;
    }, (0, import_time3.toMiliseconds)(Ot2)))));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = te("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async toEstablishConnection() {
    await this.confirmOnlineStateOrThrow(), !this.connected && await this.connect();
  }
};
var jn2 = Object.defineProperty;
var Ii = Object.getOwnPropertySymbols;
var Vn2 = Object.prototype.hasOwnProperty;
var qn2 = Object.prototype.propertyIsEnumerable;
var Ve2 = (n3, e, t) => e in n3 ? jn2(n3, e, { enumerable: true, configurable: true, writable: true, value: t }) : n3[e] = t;
var Ti2 = (n3, e) => {
  for (var t in e || (e = {}))
    Vn2.call(e, t) && Ve2(n3, t, e[t]);
  if (Ii)
    for (var t of Ii(e))
      qn2.call(e, t) && Ve2(n3, t, e[t]);
  return n3;
};
var z3 = (n3, e, t) => Ve2(n3, typeof e != "symbol" ? e + "" : e, t);
var Ci2 = class extends f4 {
  constructor(e, t, s2, i3 = B, r3 = void 0) {
    super(e, t, s2, i3), this.core = e, this.logger = t, this.name = s2, z3(this, "map", /* @__PURE__ */ new Map()), z3(this, "version", At2), z3(this, "cached", []), z3(this, "initialized", false), z3(this, "getKey"), z3(this, "storagePrefix", B), z3(this, "recentlyDeleted", []), z3(this, "recentlyDeletedLimit", 200), z3(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((o4) => {
        this.getKey && o4 !== null && !ae(o4) ? this.map.set(this.getKey(o4), o4) : Pi3(o4) ? this.map.set(o4.id, o4) : Li(o4) && this.map.set(o4.topic, o4);
      }), this.cached = [], this.initialized = true);
    }), z3(this, "set", async (o4, a3) => {
      this.isInitialized(), this.map.has(o4) ? await this.update(o4, a3) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: o4, value: a3 }), this.map.set(o4, a3), await this.persist());
    }), z3(this, "get", (o4) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: o4 }), this.getData(o4))), z3(this, "getAll", (o4) => (this.isInitialized(), o4 ? this.values.filter((a3) => Object.keys(o4).every((c5) => (0, import_lodash.default)(a3[c5], o4[c5]))) : this.values)), z3(this, "update", async (o4, a3) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: o4, update: a3 });
      const c5 = Ti2(Ti2({}, this.getData(o4)), a3);
      this.map.set(o4, c5), await this.persist();
    }), z3(this, "delete", async (o4, a3) => {
      this.isInitialized(), this.map.has(o4) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: o4, reason: a3 }), this.map.delete(o4), this.addToRecentlyDeleted(o4), await this.persist());
    }), this.logger = E(t, this.name), this.storagePrefix = i3, this.getKey = r3;
  }
  get context() {
    return y(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  addToRecentlyDeleted(e) {
    this.recentlyDeleted.push(e), this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2);
  }
  async setDataStore(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e) {
    const t = this.map.get(e);
    if (!t) {
      if (this.recentlyDeleted.includes(e)) {
        const { message: i3 } = te("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${e}`);
        throw this.logger.error(i3), new Error(i3);
      }
      const { message: s2 } = te("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.error(s2), new Error(s2);
    }
    return t;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e = await this.getDataStore();
      if (typeof e > "u" || !e.length)
        return;
      if (this.map.size) {
        const { message: t } = te("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = te("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
var Gn2 = Object.defineProperty;
var Hn2 = (n3, e, t) => e in n3 ? Gn2(n3, e, { enumerable: true, configurable: true, writable: true, value: t }) : n3[e] = t;
var d3 = (n3, e, t) => Hn2(n3, typeof e != "symbol" ? e + "" : e, t);
var Pi4 = class {
  constructor(e, t) {
    this.core = e, this.logger = t, d3(this, "name", kt2), d3(this, "version", Ut2), d3(this, "events", new import_events7.default()), d3(this, "pairings"), d3(this, "initialized", false), d3(this, "storagePrefix", B), d3(this, "ignoredPayloadTypes", [Ie]), d3(this, "registeredMethods", []), d3(this, "init", async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = true, this.logger.trace("Initialized"));
    }), d3(this, "register", ({ methods: s2 }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...s2])];
    }), d3(this, "create", async (s2) => {
      this.isInitialized();
      const i3 = ni(), r3 = await this.core.crypto.setSymKey(i3), o4 = ho(import_time3.FIVE_MINUTES), a3 = { protocol: Pt2 }, c5 = { topic: r3, expiry: o4, relay: a3, active: false, methods: s2 == null ? void 0 : s2.methods }, h5 = wi({ protocol: this.core.protocol, version: this.core.version, topic: r3, symKey: i3, relay: a3, expiryTimestamp: o4, methods: s2 == null ? void 0 : s2.methods });
      return this.events.emit(se2.create, c5), this.core.expirer.set(r3, o4), await this.pairings.set(r3, c5), await this.core.relayer.subscribe(r3, { transportType: s2 == null ? void 0 : s2.transportType }), { topic: r3, uri: h5 };
    }), d3(this, "pair", async (s2) => {
      this.isInitialized();
      const i3 = this.core.eventClient.createEvent({ properties: { topic: s2 == null ? void 0 : s2.uri, trace: [q2.pairing_started] } });
      this.isValidPair(s2, i3);
      const { topic: r3, symKey: o4, relay: a3, expiryTimestamp: c5, methods: h5 } = bi(s2.uri);
      i3.props.properties.topic = r3, i3.addTrace(q2.pairing_uri_validation_success), i3.addTrace(q2.pairing_uri_not_expired);
      let u3;
      if (this.pairings.keys.includes(r3)) {
        if (u3 = this.pairings.get(r3), i3.addTrace(q2.existing_pairing), u3.active)
          throw i3.setError(J3.active_pairing_already_exists), new Error(`Pairing already exists: ${r3}. Please try again with a new connection URI.`);
        i3.addTrace(q2.pairing_not_expired);
      }
      const g4 = c5 || ho(import_time3.FIVE_MINUTES), m3 = { topic: r3, relay: a3, expiry: g4, active: false, methods: h5 };
      this.core.expirer.set(r3, g4), await this.pairings.set(r3, m3), i3.addTrace(q2.store_new_pairing), s2.activatePairing && await this.activate({ topic: r3 }), this.events.emit(se2.create, m3), i3.addTrace(q2.emit_inactive_pairing), this.core.crypto.keychain.has(r3) || await this.core.crypto.setSymKey(o4, r3), i3.addTrace(q2.subscribing_pairing_topic);
      try {
        await this.core.relayer.confirmOnlineStateOrThrow();
      } catch {
        i3.setError(J3.no_internet_connection);
      }
      try {
        await this.core.relayer.subscribe(r3, { relay: a3 });
      } catch (A5) {
        throw i3.setError(J3.subscribe_pairing_topic_failure), A5;
      }
      return i3.addTrace(q2.subscribe_pairing_topic_success), m3;
    }), d3(this, "activate", async ({ topic: s2 }) => {
      this.isInitialized();
      const i3 = ho(import_time3.FIVE_MINUTES);
      this.core.expirer.set(s2, i3), await this.pairings.update(s2, { active: true, expiry: i3 });
    }), d3(this, "ping", async (s2) => {
      this.isInitialized(), await this.isValidPing(s2), this.logger.warn("ping() is deprecated and will be removed in the next major release.");
      const { topic: i3 } = s2;
      if (this.pairings.keys.includes(i3)) {
        const r3 = await this.sendRequest(i3, "wc_pairingPing", {}), { done: o4, resolve: a3, reject: c5 } = co();
        this.events.once(go("pairing_ping", r3), ({ error: h5 }) => {
          h5 ? c5(h5) : a3();
        }), await o4();
      }
    }), d3(this, "updateExpiry", async ({ topic: s2, expiry: i3 }) => {
      this.isInitialized(), await this.pairings.update(s2, { expiry: i3 });
    }), d3(this, "updateMetadata", async ({ topic: s2, metadata: i3 }) => {
      this.isInitialized(), await this.pairings.update(s2, { peerMetadata: i3 });
    }), d3(this, "getPairings", () => (this.isInitialized(), this.pairings.values)), d3(this, "disconnect", async (s2) => {
      this.isInitialized(), await this.isValidDisconnect(s2);
      const { topic: i3 } = s2;
      this.pairings.keys.includes(i3) && (await this.sendRequest(i3, "wc_pairingDelete", de("USER_DISCONNECTED")), await this.deletePairing(i3));
    }), d3(this, "formatUriFromPairing", (s2) => {
      this.isInitialized();
      const { topic: i3, relay: r3, expiry: o4, methods: a3 } = s2, c5 = this.core.crypto.keychain.get(i3);
      return wi({ protocol: this.core.protocol, version: this.core.version, topic: i3, symKey: c5, relay: r3, expiryTimestamp: o4, methods: a3 });
    }), d3(this, "sendRequest", async (s2, i3, r3) => {
      const o4 = formatJsonRpcRequest(i3, r3), a3 = await this.core.crypto.encode(s2, o4), c5 = ie2[i3].req;
      return this.core.history.set(s2, o4), this.core.relayer.publish(s2, a3, c5), o4.id;
    }), d3(this, "sendResult", async (s2, i3, r3) => {
      const o4 = formatJsonRpcResult(s2, r3), a3 = await this.core.crypto.encode(i3, o4), c5 = (await this.core.history.get(i3, s2)).request.method, h5 = ie2[c5].res;
      await this.core.relayer.publish(i3, a3, h5), await this.core.history.resolve(o4);
    }), d3(this, "sendError", async (s2, i3, r3) => {
      const o4 = formatJsonRpcError(s2, r3), a3 = await this.core.crypto.encode(i3, o4), c5 = (await this.core.history.get(i3, s2)).request.method, h5 = ie2[c5] ? ie2[c5].res : ie2.unregistered_method.res;
      await this.core.relayer.publish(i3, a3, h5), await this.core.history.resolve(o4);
    }), d3(this, "deletePairing", async (s2, i3) => {
      await this.core.relayer.unsubscribe(s2), await Promise.all([this.pairings.delete(s2, de("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(s2), i3 ? Promise.resolve() : this.core.expirer.del(s2)]);
    }), d3(this, "cleanup", async () => {
      const s2 = this.pairings.getAll().filter((i3) => po(i3.expiry));
      await Promise.all(s2.map((i3) => this.deletePairing(i3.topic)));
    }), d3(this, "onRelayEventRequest", (s2) => {
      const { topic: i3, payload: r3 } = s2;
      switch (r3.method) {
        case "wc_pairingPing":
          return this.onPairingPingRequest(i3, r3);
        case "wc_pairingDelete":
          return this.onPairingDeleteRequest(i3, r3);
        default:
          return this.onUnknownRpcMethodRequest(i3, r3);
      }
    }), d3(this, "onRelayEventResponse", async (s2) => {
      const { topic: i3, payload: r3 } = s2, o4 = (await this.core.history.get(i3, r3.id)).request.method;
      switch (o4) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(i3, r3);
        default:
          return this.onUnknownRpcMethodResponse(o4);
      }
    }), d3(this, "onPairingPingRequest", async (s2, i3) => {
      const { id: r3 } = i3;
      try {
        this.isValidPing({ topic: s2 }), await this.sendResult(r3, s2, true), this.events.emit(se2.ping, { id: r3, topic: s2 });
      } catch (o4) {
        await this.sendError(r3, s2, o4), this.logger.error(o4);
      }
    }), d3(this, "onPairingPingResponse", (s2, i3) => {
      const { id: r3 } = i3;
      setTimeout(() => {
        isJsonRpcResult(i3) ? this.events.emit(go("pairing_ping", r3), {}) : isJsonRpcError(i3) && this.events.emit(go("pairing_ping", r3), { error: i3.error });
      }, 500);
    }), d3(this, "onPairingDeleteRequest", async (s2, i3) => {
      const { id: r3 } = i3;
      try {
        this.isValidDisconnect({ topic: s2 }), await this.deletePairing(s2), this.events.emit(se2.delete, { id: r3, topic: s2 });
      } catch (o4) {
        await this.sendError(r3, s2, o4), this.logger.error(o4);
      }
    }), d3(this, "onUnknownRpcMethodRequest", async (s2, i3) => {
      const { id: r3, method: o4 } = i3;
      try {
        if (this.registeredMethods.includes(o4))
          return;
        const a3 = de("WC_METHOD_UNSUPPORTED", o4);
        await this.sendError(r3, s2, a3), this.logger.error(a3);
      } catch (a3) {
        await this.sendError(r3, s2, a3), this.logger.error(a3);
      }
    }), d3(this, "onUnknownRpcMethodResponse", (s2) => {
      this.registeredMethods.includes(s2) || this.logger.error(de("WC_METHOD_UNSUPPORTED", s2));
    }), d3(this, "isValidPair", (s2, i3) => {
      var r3;
      if (!Di(s2)) {
        const { message: a3 } = te("MISSING_OR_INVALID", `pair() params: ${s2}`);
        throw i3.setError(J3.malformed_pairing_uri), new Error(a3);
      }
      if (!Ri(s2.uri)) {
        const { message: a3 } = te("MISSING_OR_INVALID", `pair() uri: ${s2.uri}`);
        throw i3.setError(J3.malformed_pairing_uri), new Error(a3);
      }
      const o4 = bi(s2 == null ? void 0 : s2.uri);
      if (!((r3 = o4 == null ? void 0 : o4.relay) != null && r3.protocol)) {
        const { message: a3 } = te("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw i3.setError(J3.malformed_pairing_uri), new Error(a3);
      }
      if (!(o4 != null && o4.symKey)) {
        const { message: a3 } = te("MISSING_OR_INVALID", "pair() uri#symKey");
        throw i3.setError(J3.malformed_pairing_uri), new Error(a3);
      }
      if (o4 != null && o4.expiryTimestamp && (0, import_time3.toMiliseconds)(o4 == null ? void 0 : o4.expiryTimestamp) < Date.now()) {
        i3.setError(J3.pairing_expired);
        const { message: a3 } = te("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
        throw new Error(a3);
      }
    }), d3(this, "isValidPing", async (s2) => {
      if (!Di(s2)) {
        const { message: r3 } = te("MISSING_OR_INVALID", `ping() params: ${s2}`);
        throw new Error(r3);
      }
      const { topic: i3 } = s2;
      await this.isValidPairingTopic(i3);
    }), d3(this, "isValidDisconnect", async (s2) => {
      if (!Di(s2)) {
        const { message: r3 } = te("MISSING_OR_INVALID", `disconnect() params: ${s2}`);
        throw new Error(r3);
      }
      const { topic: i3 } = s2;
      await this.isValidPairingTopic(i3);
    }), d3(this, "isValidPairingTopic", async (s2) => {
      if (!q(s2, false)) {
        const { message: i3 } = te("MISSING_OR_INVALID", `pairing topic should be a string: ${s2}`);
        throw new Error(i3);
      }
      if (!this.pairings.keys.includes(s2)) {
        const { message: i3 } = te("NO_MATCHING_KEY", `pairing topic doesn't exist: ${s2}`);
        throw new Error(i3);
      }
      if (po(this.pairings.get(s2).expiry)) {
        await this.deletePairing(s2);
        const { message: i3 } = te("EXPIRED", `pairing topic: ${s2}`);
        throw new Error(i3);
      }
    }), this.core = e, this.logger = E(t, this.name), this.pairings = new Ci2(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return y(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = te("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(T2.message, async (e) => {
      const { topic: t, message: s2, transportType: i3 } = e;
      if (!this.pairings.keys.includes(t) || i3 === Q2.link_mode || this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(s2)))
        return;
      const r3 = await this.core.crypto.decode(t, s2);
      try {
        isJsonRpcRequest(r3) ? (this.core.history.set(t, r3), this.onRelayEventRequest({ topic: t, payload: r3 })) : isJsonRpcResponse(r3) && (await this.core.history.resolve(r3), await this.onRelayEventResponse({ topic: t, payload: r3 }), this.core.history.delete(t, r3.id));
      } catch (o4) {
        this.logger.error(o4);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(M3.expired, async (e) => {
      const { topic: t } = lo(e.target);
      t && this.pairings.keys.includes(t) && (await this.deletePairing(t, true), this.events.emit(se2.expire, { topic: t }));
    });
  }
};
var Yn2 = Object.defineProperty;
var Jn2 = (n3, e, t) => e in n3 ? Yn2(n3, e, { enumerable: true, configurable: true, writable: true, value: t }) : n3[e] = t;
var S2 = (n3, e, t) => Jn2(n3, typeof e != "symbol" ? e + "" : e, t);
var Si = class extends I {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, S2(this, "records", /* @__PURE__ */ new Map()), S2(this, "events", new import_events7.EventEmitter()), S2(this, "name", Ft2), S2(this, "version", Mt), S2(this, "cached", []), S2(this, "initialized", false), S2(this, "storagePrefix", B), S2(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((s2) => this.records.set(s2.id, s2)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }), S2(this, "set", (s2, i3, r3) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: s2, request: i3, chainId: r3 }), this.records.has(i3.id))
        return;
      const o4 = { id: i3.id, topic: s2, request: { method: i3.method, params: i3.params || null }, chainId: r3, expiry: ho(import_time3.THIRTY_DAYS) };
      this.records.set(o4.id, o4), this.persist(), this.events.emit(F2.created, o4);
    }), S2(this, "resolve", async (s2) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: s2 }), !this.records.has(s2.id))
        return;
      const i3 = await this.getRecord(s2.id);
      typeof i3.response > "u" && (i3.response = isJsonRpcError(s2) ? { error: s2.error } : { result: s2.result }, this.records.set(i3.id, i3), this.persist(), this.events.emit(F2.updated, i3));
    }), S2(this, "get", async (s2, i3) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: s2, id: i3 }), await this.getRecord(i3))), S2(this, "delete", (s2, i3) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: i3 }), this.values.forEach((r3) => {
        if (r3.topic === s2) {
          if (typeof i3 < "u" && r3.id !== i3)
            return;
          this.records.delete(r3.id), this.events.emit(F2.deleted, r3);
        }
      }), this.persist();
    }), S2(this, "exists", async (s2, i3) => (this.isInitialized(), this.records.has(i3) ? (await this.getRecord(i3)).topic === s2 : false)), S2(this, "on", (s2, i3) => {
      this.events.on(s2, i3);
    }), S2(this, "once", (s2, i3) => {
      this.events.once(s2, i3);
    }), S2(this, "off", (s2, i3) => {
      this.events.off(s2, i3);
    }), S2(this, "removeListener", (s2, i3) => {
      this.events.removeListener(s2, i3);
    }), this.logger = E(t, this.name);
  }
  get context() {
    return y(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e = [];
    return this.values.forEach((t) => {
      if (typeof t.response < "u")
        return;
      const s2 = { topic: t.topic, request: formatJsonRpcRequest(t.request.method, t.request.params, t.id), chainId: t.chainId };
      return e.push(s2);
    }), e;
  }
  async setJsonRpcRecords(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e) {
    this.isInitialized();
    const t = this.records.get(e);
    if (!t) {
      const { message: s2 } = te("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(s2);
    }
    return t;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(F2.sync);
  }
  async restore() {
    try {
      const e = await this.getJsonRpcRecords();
      if (typeof e > "u" || !e.length)
        return;
      if (this.records.size) {
        const { message: t } = te("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
    }
  }
  registerEventListeners() {
    this.events.on(F2.created, (e) => {
      const t = F2.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.events.on(F2.updated, (e) => {
      const t = F2.updated;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.events.on(F2.deleted, (e) => {
      const t = F2.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e });
    }), this.core.heartbeat.on(r2.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.isInitialized();
      let e = false;
      this.records.forEach((t) => {
        (0, import_time3.toMiliseconds)(t.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${t.id}`), this.records.delete(t.id), this.events.emit(F2.deleted, t, false), e = true);
      }), e && this.persist();
    } catch (e) {
      this.logger.warn(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = te("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
var Xn2 = Object.defineProperty;
var Wn2 = (n3, e, t) => e in n3 ? Xn2(n3, e, { enumerable: true, configurable: true, writable: true, value: t }) : n3[e] = t;
var x3 = (n3, e, t) => Wn2(n3, typeof e != "symbol" ? e + "" : e, t);
var Ri2 = class extends S {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, x3(this, "expirations", /* @__PURE__ */ new Map()), x3(this, "events", new import_events7.EventEmitter()), x3(this, "name", Kt), x3(this, "version", Bt2), x3(this, "cached", []), x3(this, "initialized", false), x3(this, "storagePrefix", B), x3(this, "init", async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((s2) => this.expirations.set(s2.target, s2)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }), x3(this, "has", (s2) => {
      try {
        const i3 = this.formatTarget(s2);
        return typeof this.getExpiration(i3) < "u";
      } catch {
        return false;
      }
    }), x3(this, "set", (s2, i3) => {
      this.isInitialized();
      const r3 = this.formatTarget(s2), o4 = { target: r3, expiry: i3 };
      this.expirations.set(r3, o4), this.checkExpiry(r3, o4), this.events.emit(M3.created, { target: r3, expiration: o4 });
    }), x3(this, "get", (s2) => {
      this.isInitialized();
      const i3 = this.formatTarget(s2);
      return this.getExpiration(i3);
    }), x3(this, "del", (s2) => {
      if (this.isInitialized(), this.has(s2)) {
        const i3 = this.formatTarget(s2), r3 = this.getExpiration(i3);
        this.expirations.delete(i3), this.events.emit(M3.deleted, { target: i3, expiration: r3 });
      }
    }), x3(this, "on", (s2, i3) => {
      this.events.on(s2, i3);
    }), x3(this, "once", (s2, i3) => {
      this.events.once(s2, i3);
    }), x3(this, "off", (s2, i3) => {
      this.events.off(s2, i3);
    }), x3(this, "removeListener", (s2, i3) => {
      this.events.removeListener(s2, i3);
    }), this.logger = E(t, this.name);
  }
  get context() {
    return y(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e) {
    if (typeof e == "string")
      return uo(e);
    if (typeof e == "number")
      return fo(e);
    const { message: t } = te("UNKNOWN_TYPE", `Target type: ${typeof e}`);
    throw new Error(t);
  }
  async setExpirations(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(M3.sync);
  }
  async restore() {
    try {
      const e = await this.getExpirations();
      if (typeof e > "u" || !e.length)
        return;
      if (this.expirations.size) {
        const { message: t } = te("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
    }
  }
  getExpiration(e) {
    const t = this.expirations.get(e);
    if (!t) {
      const { message: s2 } = te("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.warn(s2), new Error(s2);
    }
    return t;
  }
  checkExpiry(e, t) {
    const { expiry: s2 } = t;
    (0, import_time3.toMiliseconds)(s2) - Date.now() <= 0 && this.expire(e, t);
  }
  expire(e, t) {
    this.expirations.delete(e), this.events.emit(M3.expired, { target: e, expiration: t });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e, t) => this.checkExpiry(t, e));
  }
  registerEventListeners() {
    this.core.heartbeat.on(r2.pulse, () => this.checkExpirations()), this.events.on(M3.created, (e) => {
      const t = M3.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(M3.expired, (e) => {
      const t = M3.expired;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(M3.deleted, (e) => {
      const t = M3.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = te("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
var Zn2 = Object.defineProperty;
var Qn2 = (n3, e, t) => e in n3 ? Zn2(n3, e, { enumerable: true, configurable: true, writable: true, value: t }) : n3[e] = t;
var _2 = (n3, e, t) => Qn2(n3, typeof e != "symbol" ? e + "" : e, t);
var xi = class extends M2 {
  constructor(e, t, s2) {
    super(e, t, s2), this.core = e, this.logger = t, this.store = s2, _2(this, "name", jt2), _2(this, "abortController"), _2(this, "isDevEnv"), _2(this, "verifyUrlV3", qt), _2(this, "storagePrefix", B), _2(this, "version", Oe2), _2(this, "publicKey"), _2(this, "fetchPromise"), _2(this, "init", async () => {
      var i3;
      this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey), this.publicKey && (0, import_time3.toMiliseconds)((i3 = this.publicKey) == null ? void 0 : i3.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"), await this.removePublicKey()));
    }), _2(this, "register", async (i3) => {
      if (!Ae() || this.isDevEnv)
        return;
      const r3 = window.location.origin, { id: o4, decryptedId: a3 } = i3, c5 = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${r3}&id=${o4}&decryptedId=${a3}`;
      try {
        const h5 = (0, import_window_getters2.getDocument)(), u3 = this.startAbortTimer(import_time3.ONE_SECOND * 5), g4 = await new Promise((m3, A5) => {
          const l5 = () => {
            window.removeEventListener("message", O5), h5.body.removeChild(y6), A5("attestation aborted");
          };
          this.abortController.signal.addEventListener("abort", l5);
          const y6 = h5.createElement("iframe");
          y6.src = c5, y6.style.display = "none", y6.addEventListener("error", l5, { signal: this.abortController.signal });
          const O5 = (w4) => {
            if (w4.data && typeof w4.data == "string")
              try {
                const v6 = JSON.parse(w4.data);
                if (v6.type === "verify_attestation") {
                  if (sn(v6.attestation).payload.id !== o4)
                    return;
                  clearInterval(u3), h5.body.removeChild(y6), this.abortController.signal.removeEventListener("abort", l5), window.removeEventListener("message", O5), m3(v6.attestation === null ? "" : v6.attestation);
                }
              } catch (v6) {
                this.logger.warn(v6);
              }
          };
          h5.body.appendChild(y6), window.addEventListener("message", O5, { signal: this.abortController.signal });
        });
        return this.logger.debug("jwt attestation", g4), g4;
      } catch (h5) {
        this.logger.warn(h5);
      }
      return "";
    }), _2(this, "resolve", async (i3) => {
      if (this.isDevEnv)
        return "";
      const { attestationId: r3, hash: o4, encryptedId: a3 } = i3;
      if (r3 === "") {
        this.logger.debug("resolve: attestationId is empty, skipping");
        return;
      }
      if (r3) {
        if (sn(r3).payload.id !== a3)
          return;
        const h5 = await this.isValidJwtAttestation(r3);
        if (h5) {
          if (!h5.isVerified) {
            this.logger.warn("resolve: jwt attestation: origin url not verified");
            return;
          }
          return h5;
        }
      }
      if (!o4)
        return;
      const c5 = this.getVerifyUrl(i3 == null ? void 0 : i3.verifyUrl);
      return this.fetchAttestation(o4, c5);
    }), _2(this, "fetchAttestation", async (i3, r3) => {
      this.logger.debug(`resolving attestation: ${i3} from url: ${r3}`);
      const o4 = this.startAbortTimer(import_time3.ONE_SECOND * 5), a3 = await fetch(`${r3}/attestation/${i3}?v2Supported=true`, { signal: this.abortController.signal });
      return clearTimeout(o4), a3.status === 200 ? await a3.json() : void 0;
    }), _2(this, "getVerifyUrl", (i3) => {
      let r3 = i3 || le2;
      return Gt2.includes(r3) || (this.logger.info(`verify url: ${r3}, not included in trusted list, assigning default: ${le2}`), r3 = le2), r3;
    }), _2(this, "fetchPublicKey", async () => {
      try {
        this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
        const i3 = this.startAbortTimer(import_time3.FIVE_SECONDS), r3 = await fetch(`${this.verifyUrlV3}/public-key`, { signal: this.abortController.signal });
        return clearTimeout(i3), await r3.json();
      } catch (i3) {
        this.logger.warn(i3);
      }
    }), _2(this, "persistPublicKey", async (i3) => {
      this.logger.debug("persisting public key to local storage", i3), await this.store.setItem(this.storeKey, i3), this.publicKey = i3;
    }), _2(this, "removePublicKey", async () => {
      this.logger.debug("removing verify v2 public key from storage"), await this.store.removeItem(this.storeKey), this.publicKey = void 0;
    }), _2(this, "isValidJwtAttestation", async (i3) => {
      const r3 = await this.getPublicKey();
      try {
        if (r3)
          return this.validateAttestation(i3, r3);
      } catch (a3) {
        this.logger.error(a3), this.logger.warn("error validating attestation");
      }
      const o4 = await this.fetchAndPersistPublicKey();
      try {
        if (o4)
          return this.validateAttestation(i3, o4);
      } catch (a3) {
        this.logger.error(a3), this.logger.warn("error validating attestation");
      }
    }), _2(this, "getPublicKey", async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey()), _2(this, "fetchAndPersistPublicKey", async () => {
      if (this.fetchPromise)
        return await this.fetchPromise, this.publicKey;
      this.fetchPromise = new Promise(async (r3) => {
        const o4 = await this.fetchPublicKey();
        o4 && (await this.persistPublicKey(o4), r3(o4));
      });
      const i3 = await this.fetchPromise;
      return this.fetchPromise = void 0, i3;
    }), _2(this, "validateAttestation", (i3, r3) => {
      const o4 = gi(i3, r3.publicKey), a3 = { hasExpired: (0, import_time3.toMiliseconds)(o4.exp) < Date.now(), payload: o4 };
      if (a3.hasExpired)
        throw this.logger.warn("resolve: jwt attestation expired"), new Error("JWT attestation expired");
      return { origin: a3.payload.origin, isScam: a3.payload.isScam, isVerified: a3.payload.isVerified };
    }), this.logger = E(t, this.name), this.abortController = new AbortController(), this.isDevEnv = Eo(), this.init();
  }
  get storeKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key";
  }
  get context() {
    return y(this.logger);
  }
  startAbortTimer(e) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), (0, import_time3.toMiliseconds)(e));
  }
};
var eo = Object.defineProperty;
var to = (n3, e, t) => e in n3 ? eo(n3, e, { enumerable: true, configurable: true, writable: true, value: t }) : n3[e] = t;
var Oi = (n3, e, t) => to(n3, typeof e != "symbol" ? e + "" : e, t);
var Ai = class extends O2 {
  constructor(e, t) {
    super(e, t), this.projectId = e, this.logger = t, Oi(this, "context", Ht), Oi(this, "registerDeviceToken", async (s2) => {
      const { clientId: i3, token: r3, notificationType: o4, enableEncrypted: a3 = false } = s2, c5 = `${Yt2}/${this.projectId}/clients`;
      await fetch(c5, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: i3, type: o4, token: r3, always_raw: a3 }) });
    }), this.logger = E(t, this.context);
  }
};
var io = Object.defineProperty;
var Ni = Object.getOwnPropertySymbols;
var so = Object.prototype.hasOwnProperty;
var ro2 = Object.prototype.propertyIsEnumerable;
var qe2 = (n3, e, t) => e in n3 ? io(n3, e, { enumerable: true, configurable: true, writable: true, value: t }) : n3[e] = t;
var pe = (n3, e) => {
  for (var t in e || (e = {}))
    so.call(e, t) && qe2(n3, t, e[t]);
  if (Ni)
    for (var t of Ni(e))
      ro2.call(e, t) && qe2(n3, t, e[t]);
  return n3;
};
var E3 = (n3, e, t) => qe2(n3, typeof e != "symbol" ? e + "" : e, t);
var $i2 = class extends R {
  constructor(e, t, s2 = true) {
    super(e, t, s2), this.core = e, this.logger = t, E3(this, "context", Xt), E3(this, "storagePrefix", B), E3(this, "storageVersion", Jt2), E3(this, "events", /* @__PURE__ */ new Map()), E3(this, "shouldPersist", false), E3(this, "init", async () => {
      if (!Eo())
        try {
          const i3 = { eventId: wo(), timestamp: Date.now(), domain: this.getAppDomain(), props: { event: "INIT", type: "", properties: { client_id: await this.core.crypto.getClientId(), user_agent: Yt(this.core.relayer.protocol, this.core.relayer.version, me2) } } };
          await this.sendEvent([i3]);
        } catch (i3) {
          this.logger.warn(i3);
        }
    }), E3(this, "createEvent", (i3) => {
      const { event: r3 = "ERROR", type: o4 = "", properties: { topic: a3, trace: c5 } } = i3, h5 = wo(), u3 = this.core.projectId || "", g4 = Date.now(), m3 = pe({ eventId: h5, timestamp: g4, props: { event: r3, type: o4, properties: { topic: a3, trace: c5 } }, bundleId: u3, domain: this.getAppDomain() }, this.setMethods(h5));
      return this.telemetryEnabled && (this.events.set(h5, m3), this.shouldPersist = true), m3;
    }), E3(this, "getEvent", (i3) => {
      const { eventId: r3, topic: o4 } = i3;
      if (r3)
        return this.events.get(r3);
      const a3 = Array.from(this.events.values()).find((c5) => c5.props.properties.topic === o4);
      if (a3)
        return pe(pe({}, a3), this.setMethods(a3.eventId));
    }), E3(this, "deleteEvent", (i3) => {
      const { eventId: r3 } = i3;
      this.events.delete(r3), this.shouldPersist = true;
    }), E3(this, "setEventListeners", () => {
      this.core.heartbeat.on(r2.pulse, async () => {
        this.shouldPersist && await this.persist(), this.events.forEach((i3) => {
          (0, import_time3.fromMiliseconds)(Date.now()) - (0, import_time3.fromMiliseconds)(i3.timestamp) > Wt2 && (this.events.delete(i3.eventId), this.shouldPersist = true);
        });
      });
    }), E3(this, "setMethods", (i3) => ({ addTrace: (r3) => this.addTrace(i3, r3), setError: (r3) => this.setError(i3, r3) })), E3(this, "addTrace", (i3, r3) => {
      const o4 = this.events.get(i3);
      o4 && (o4.props.properties.trace.push(r3), this.events.set(i3, o4), this.shouldPersist = true);
    }), E3(this, "setError", (i3, r3) => {
      const o4 = this.events.get(i3);
      o4 && (o4.props.type = r3, o4.timestamp = Date.now(), this.events.set(i3, o4), this.shouldPersist = true);
    }), E3(this, "persist", async () => {
      await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())), this.shouldPersist = false;
    }), E3(this, "restore", async () => {
      try {
        const i3 = await this.core.storage.getItem(this.storageKey) || [];
        if (!i3.length)
          return;
        i3.forEach((r3) => {
          this.events.set(r3.eventId, pe(pe({}, r3), this.setMethods(r3.eventId)));
        });
      } catch (i3) {
        this.logger.warn(i3);
      }
    }), E3(this, "submit", async () => {
      if (!this.telemetryEnabled || this.events.size === 0)
        return;
      const i3 = [];
      for (const [r3, o4] of this.events)
        o4.props.type && i3.push(o4);
      if (i3.length !== 0)
        try {
          if ((await this.sendEvent(i3)).ok)
            for (const r3 of i3)
              this.events.delete(r3.eventId), this.shouldPersist = true;
        } catch (r3) {
          this.logger.warn(r3);
        }
    }), E3(this, "sendEvent", async (i3) => {
      const r3 = this.getAppDomain() ? "" : "&sp=desktop";
      return await fetch(`${Zt}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${me2}${r3}`, { method: "POST", body: JSON.stringify(i3) });
    }), E3(this, "getAppDomain", () => Yr().url), this.logger = E(t, this.context), this.telemetryEnabled = s2, s2 ? this.restore().then(async () => {
      await this.submit(), this.setEventListeners();
    }) : this.persist();
  }
  get storageKey() {
    return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context;
  }
};
var no2 = Object.defineProperty;
var zi2 = Object.getOwnPropertySymbols;
var oo = Object.prototype.hasOwnProperty;
var ao2 = Object.prototype.propertyIsEnumerable;
var Ge2 = (n3, e, t) => e in n3 ? no2(n3, e, { enumerable: true, configurable: true, writable: true, value: t }) : n3[e] = t;
var Li2 = (n3, e) => {
  for (var t in e || (e = {}))
    oo.call(e, t) && Ge2(n3, t, e[t]);
  if (zi2)
    for (var t of zi2(e))
      ao2.call(e, t) && Ge2(n3, t, e[t]);
  return n3;
};
var f6 = (n3, e, t) => Ge2(n3, typeof e != "symbol" ? e + "" : e, t);
var _e2 = class __e extends h2 {
  constructor(e) {
    var t;
    super(e), f6(this, "protocol", xe2), f6(this, "version", Oe2), f6(this, "name", he), f6(this, "relayUrl"), f6(this, "projectId"), f6(this, "customStoragePrefix"), f6(this, "events", new import_events7.EventEmitter()), f6(this, "logger"), f6(this, "heartbeat"), f6(this, "relayer"), f6(this, "crypto"), f6(this, "storage"), f6(this, "history"), f6(this, "expirer"), f6(this, "pairing"), f6(this, "verify"), f6(this, "echoClient"), f6(this, "linkModeSupportedApps"), f6(this, "eventClient"), f6(this, "initialized", false), f6(this, "logChunkController"), f6(this, "on", (o4, a3) => this.events.on(o4, a3)), f6(this, "once", (o4, a3) => this.events.once(o4, a3)), f6(this, "off", (o4, a3) => this.events.off(o4, a3)), f6(this, "removeListener", (o4, a3) => this.events.removeListener(o4, a3)), f6(this, "dispatchEnvelope", ({ topic: o4, message: a3, sessionExists: c5 }) => {
      if (!o4 || !a3)
        return;
      const h5 = { topic: o4, message: a3, publishedAt: Date.now(), transportType: Q2.link_mode };
      this.relayer.onLinkMessageEvent(h5, { sessionExists: c5 });
    }), this.projectId = e == null ? void 0 : e.projectId, this.relayUrl = (e == null ? void 0 : e.relayUrl) || $e2, this.customStoragePrefix = e != null && e.customStoragePrefix ? `:${e.customStoragePrefix}` : "";
    const s2 = k({ level: typeof (e == null ? void 0 : e.logger) == "string" && e.logger ? e.logger : mt2.logger, name: he }), { logger: i3, chunkLoggerController: r3 } = A({ opts: s2, maxSizeInBytes: e == null ? void 0 : e.maxLogBlobSizeInBytes, loggerOverride: e == null ? void 0 : e.logger });
    this.logChunkController = r3, (t = this.logChunkController) != null && t.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
      var o4, a3;
      (o4 = this.logChunkController) != null && o4.downloadLogsBlobInBrowser && ((a3 = this.logChunkController) == null || a3.downloadLogsBlobInBrowser({ clientId: await this.crypto.getClientId() }));
    }), this.logger = E(i3, this.name), this.heartbeat = new i(), this.crypto = new bi2(this, this.logger, e == null ? void 0 : e.keychain), this.history = new Si(this, this.logger), this.expirer = new Ri2(this, this.logger), this.storage = e != null && e.storage ? e.storage : new h(Li2(Li2({}, vt2), e == null ? void 0 : e.storageOptions)), this.relayer = new wi2({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new Pi4(this, this.logger), this.verify = new xi(this, this.logger, this.storage), this.echoClient = new Ai(this.projectId || "", this.logger), this.linkModeSupportedApps = [], this.eventClient = new $i2(this, this.logger, e == null ? void 0 : e.telemetryEnabled);
  }
  static async init(e) {
    const t = new __e(e);
    await t.initialize();
    const s2 = await t.crypto.getClientId();
    return await t.storage.setItem(Nt2, s2), t;
  }
  get context() {
    return y(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async getLogsBlob() {
    var e;
    return (e = this.logChunkController) == null ? void 0 : e.logsToBlob({ clientId: await this.crypto.getClientId() });
  }
  async addLinkModeSupportedApp(e) {
    this.linkModeSupportedApps.includes(e) || (this.linkModeSupportedApps.push(e), await this.storage.setItem(ze2, this.linkModeSupportedApps));
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.linkModeSupportedApps = await this.storage.getItem(ze2) || [], this.initialized = true, this.logger.info("Core Initialization Success");
    } catch (e) {
      throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
    }
  }
};
var co2 = _e2;

// node_modules/@walletconnect/sign-client/dist/index.es.js
var import_time4 = __toESM(require_cjs());
var import_events8 = __toESM(require_events());
var De2 = "wc";
var Le3 = 2;
var Me3 = "client";
var me3 = `${De2}@${Le3}:${Me3}:`;
var _e3 = { name: Me3, logger: "error", controller: false, relayUrl: "wss://relay.walletconnect.org" };
var ke3 = "WALLETCONNECT_DEEPLINK_CHOICE";
var pt2 = "proposal";
var $e3 = "Proposal expired";
var ht2 = "session";
var Y2 = import_time4.SEVEN_DAYS;
var dt2 = "engine";
var N2 = { wc_sessionPropose: { req: { ttl: import_time4.FIVE_MINUTES, prompt: true, tag: 1100 }, res: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1101 }, reject: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1120 }, autoReject: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1121 } }, wc_sessionSettle: { req: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1102 }, res: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1104 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1105 } }, wc_sessionExtend: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1106 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1107 } }, wc_sessionRequest: { req: { ttl: import_time4.FIVE_MINUTES, prompt: true, tag: 1108 }, res: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1109 } }, wc_sessionEvent: { req: { ttl: import_time4.FIVE_MINUTES, prompt: true, tag: 1110 }, res: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1111 } }, wc_sessionDelete: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1112 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1113 } }, wc_sessionPing: { req: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1114 }, res: { ttl: import_time4.ONE_DAY, prompt: false, tag: 1115 } }, wc_sessionAuthenticate: { req: { ttl: import_time4.ONE_HOUR, prompt: true, tag: 1116 }, res: { ttl: import_time4.ONE_HOUR, prompt: false, tag: 1117 }, reject: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1118 }, autoReject: { ttl: import_time4.FIVE_MINUTES, prompt: false, tag: 1119 } } };
var Ee3 = { min: import_time4.FIVE_MINUTES, max: import_time4.SEVEN_DAYS };
var $2 = { idle: "IDLE", active: "ACTIVE" };
var Ke3 = { eth_sendTransaction: { key: "" }, eth_sendRawTransaction: { key: "" }, wallet_sendCalls: { key: "" }, solana_signTransaction: { key: "signature" }, solana_signAllTransactions: { key: "transactions" }, solana_signAndSendTransaction: { key: "signature" } };
var ut2 = "request";
var gt2 = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"];
var yt2 = "wc";
var wt3 = "auth";
var mt3 = "authKeys";
var _t3 = "pairingTopics";
var Et3 = "requests";
var ce2 = `${yt2}@${1.5}:${wt3}:`;
var le3 = `${ce2}:PUB_KEY`;
var Rs2 = Object.defineProperty;
var fs2 = Object.defineProperties;
var Is2 = Object.getOwnPropertyDescriptors;
var St3 = Object.getOwnPropertySymbols;
var vs2 = Object.prototype.hasOwnProperty;
var qs3 = Object.prototype.propertyIsEnumerable;
var Ue3 = (S4, n3, e) => n3 in S4 ? Rs2(S4, n3, { enumerable: true, configurable: true, writable: true, value: e }) : S4[n3] = e;
var v3 = (S4, n3) => {
  for (var e in n3 || (n3 = {}))
    vs2.call(n3, e) && Ue3(S4, e, n3[e]);
  if (St3)
    for (var e of St3(n3))
      qs3.call(n3, e) && Ue3(S4, e, n3[e]);
  return S4;
};
var x4 = (S4, n3) => fs2(S4, Is2(n3));
var c4 = (S4, n3, e) => Ue3(S4, typeof n3 != "symbol" ? n3 + "" : n3, e);
var Ts2 = class extends V2 {
  constructor(n3) {
    super(n3), c4(this, "name", dt2), c4(this, "events", new import_events8.default()), c4(this, "initialized", false), c4(this, "requestQueue", { state: $2.idle, queue: [] }), c4(this, "sessionRequestQueue", { state: $2.idle, queue: [] }), c4(this, "requestQueueDelay", import_time4.ONE_SECOND), c4(this, "expectedPairingMethodMap", /* @__PURE__ */ new Map()), c4(this, "recentlyDeletedMap", /* @__PURE__ */ new Map()), c4(this, "recentlyDeletedLimit", 200), c4(this, "relayMessageCache", []), c4(this, "pendingSessions", /* @__PURE__ */ new Map()), c4(this, "init", async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), await this.registerLinkModeListeners(), this.client.core.pairing.register({ methods: Object.keys(N2) }), this.initialized = true, setTimeout(() => {
        this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, (0, import_time4.toMiliseconds)(this.requestQueueDelay)));
    }), c4(this, "connect", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      const t = x4(v3({}, e), { requiredNamespaces: e.requiredNamespaces || {}, optionalNamespaces: e.optionalNamespaces || {} });
      await this.isValidConnect(t);
      const { pairingTopic: s2, requiredNamespaces: i3, optionalNamespaces: r3, sessionProperties: o4, relays: a3 } = t;
      let l5 = s2, u3, g4 = false;
      try {
        if (l5) {
          const R4 = this.client.core.pairing.pairings.get(l5);
          this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."), g4 = R4.active;
        }
      } catch (R4) {
        throw this.client.logger.error(`connect() -> pairing.get(${l5}) failed`), R4;
      }
      if (!l5 || !g4) {
        const { topic: R4, uri: D5 } = await this.client.core.pairing.create();
        l5 = R4, u3 = D5;
      }
      if (!l5) {
        const { message: R4 } = te("NO_MATCHING_KEY", `connect() pairing topic: ${l5}`);
        throw new Error(R4);
      }
      const h5 = await this.client.core.crypto.generateKeyPair(), d4 = N2.wc_sessionPropose.req.ttl || import_time4.FIVE_MINUTES, y6 = ho(d4), m3 = x4(v3({ requiredNamespaces: i3, optionalNamespaces: r3, relays: a3 ?? [{ protocol: Pt2 }], proposer: { publicKey: h5, metadata: this.client.metadata }, expiryTimestamp: y6, pairingTopic: l5 }, o4 && { sessionProperties: o4 }), { id: payloadId() }), I3 = go("session_connect", m3.id), { reject: p4, resolve: E5, done: V4 } = co(d4, $e3), q5 = ({ id: R4 }) => {
        R4 === m3.id && (this.client.events.off("proposal_expire", q5), this.pendingSessions.delete(m3.id), this.events.emit(I3, { error: { message: $e3, code: 0 } }));
      };
      return this.client.events.on("proposal_expire", q5), this.events.once(I3, ({ error: R4, session: D5 }) => {
        this.client.events.off("proposal_expire", q5), R4 ? p4(R4) : D5 && E5(D5);
      }), await this.sendRequest({ topic: l5, method: "wc_sessionPropose", params: m3, throwOnFailedPublish: true, clientRpcId: m3.id }), await this.setProposal(m3.id, m3), { uri: u3, approval: V4 };
    }), c4(this, "pair", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        return await this.client.core.pairing.pair(e);
      } catch (t) {
        throw this.client.logger.error("pair() failed"), t;
      }
    }), c4(this, "approve", async (e) => {
      var t, s2, i3;
      const r3 = this.client.core.eventClient.createEvent({ properties: { topic: (t = e == null ? void 0 : e.id) == null ? void 0 : t.toString(), trace: [qs2.session_approve_started] } });
      try {
        this.isInitialized(), await this.confirmOnlineStateOrThrow();
      } catch (P4) {
        throw r3.setError(Gs2.no_internet_connection), P4;
      }
      try {
        await this.isValidProposalId(e == null ? void 0 : e.id);
      } catch (P4) {
        throw this.client.logger.error(`approve() -> proposal.get(${e == null ? void 0 : e.id}) failed`), r3.setError(Gs2.proposal_not_found), P4;
      }
      try {
        await this.isValidApprove(e);
      } catch (P4) {
        throw this.client.logger.error("approve() -> isValidApprove() failed"), r3.setError(Gs2.session_approve_namespace_validation_failure), P4;
      }
      const { id: o4, relayProtocol: a3, namespaces: l5, sessionProperties: u3, sessionConfig: g4 } = e, h5 = this.client.proposal.get(o4);
      this.client.core.eventClient.deleteEvent({ eventId: r3.eventId });
      const { pairingTopic: d4, proposer: y6, requiredNamespaces: m3, optionalNamespaces: I3 } = h5;
      let p4 = (s2 = this.client.core.eventClient) == null ? void 0 : s2.getEvent({ topic: d4 });
      p4 || (p4 = (i3 = this.client.core.eventClient) == null ? void 0 : i3.createEvent({ type: qs2.session_approve_started, properties: { topic: d4, trace: [qs2.session_approve_started, qs2.session_namespaces_validation_success] } }));
      const E5 = await this.client.core.crypto.generateKeyPair(), V4 = y6.publicKey, q5 = await this.client.core.crypto.generateSharedKey(E5, V4), R4 = v3(v3({ relay: { protocol: a3 ?? "irn" }, namespaces: l5, controller: { publicKey: E5, metadata: this.client.metadata }, expiry: ho(Y2) }, u3 && { sessionProperties: u3 }), g4 && { sessionConfig: g4 }), D5 = Q2.relay;
      p4.addTrace(qs2.subscribing_session_topic);
      try {
        await this.client.core.relayer.subscribe(q5, { transportType: D5 });
      } catch (P4) {
        throw p4.setError(Gs2.subscribe_session_topic_failure), P4;
      }
      p4.addTrace(qs2.subscribe_session_topic_success);
      const ee3 = x4(v3({}, R4), { topic: q5, requiredNamespaces: m3, optionalNamespaces: I3, pairingTopic: d4, acknowledged: false, self: R4.controller, peer: { publicKey: y6.publicKey, metadata: y6.metadata }, controller: E5, transportType: Q2.relay });
      await this.client.session.set(q5, ee3), p4.addTrace(qs2.store_session);
      try {
        p4.addTrace(qs2.publishing_session_settle), await this.sendRequest({ topic: q5, method: "wc_sessionSettle", params: R4, throwOnFailedPublish: true }).catch((P4) => {
          throw p4 == null ? void 0 : p4.setError(Gs2.session_settle_publish_failure), P4;
        }), p4.addTrace(qs2.session_settle_publish_success), p4.addTrace(qs2.publishing_session_approve), await this.sendResult({ id: o4, topic: d4, result: { relay: { protocol: a3 ?? "irn" }, responderPublicKey: E5 }, throwOnFailedPublish: true }).catch((P4) => {
          throw p4 == null ? void 0 : p4.setError(Gs2.session_approve_publish_failure), P4;
        }), p4.addTrace(qs2.session_approve_publish_success);
      } catch (P4) {
        throw this.client.logger.error(P4), this.client.session.delete(q5, de("USER_DISCONNECTED")), await this.client.core.relayer.unsubscribe(q5), P4;
      }
      return this.client.core.eventClient.deleteEvent({ eventId: p4.eventId }), await this.client.core.pairing.updateMetadata({ topic: d4, metadata: y6.metadata }), await this.client.proposal.delete(o4, de("USER_DISCONNECTED")), await this.client.core.pairing.activate({ topic: d4 }), await this.setExpiry(q5, ho(Y2)), { topic: q5, acknowledged: () => Promise.resolve(this.client.session.get(q5)) };
    }), c4(this, "reject", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidReject(e);
      } catch (r3) {
        throw this.client.logger.error("reject() -> isValidReject() failed"), r3;
      }
      const { id: t, reason: s2 } = e;
      let i3;
      try {
        i3 = this.client.proposal.get(t).pairingTopic;
      } catch (r3) {
        throw this.client.logger.error(`reject() -> proposal.get(${t}) failed`), r3;
      }
      i3 && (await this.sendError({ id: t, topic: i3, error: s2, rpcOpts: N2.wc_sessionPropose.reject }), await this.client.proposal.delete(t, de("USER_DISCONNECTED")));
    }), c4(this, "update", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidUpdate(e);
      } catch (g4) {
        throw this.client.logger.error("update() -> isValidUpdate() failed"), g4;
      }
      const { topic: t, namespaces: s2 } = e, { done: i3, resolve: r3, reject: o4 } = co(), a3 = payloadId(), l5 = getBigIntRpcId().toString(), u3 = this.client.session.get(t).namespaces;
      return this.events.once(go("session_update", a3), ({ error: g4 }) => {
        g4 ? o4(g4) : r3();
      }), await this.client.session.update(t, { namespaces: s2 }), await this.sendRequest({ topic: t, method: "wc_sessionUpdate", params: { namespaces: s2 }, throwOnFailedPublish: true, clientRpcId: a3, relayRpcId: l5 }).catch((g4) => {
        this.client.logger.error(g4), this.client.session.update(t, { namespaces: u3 }), o4(g4);
      }), { acknowledged: i3 };
    }), c4(this, "extend", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidExtend(e);
      } catch (a3) {
        throw this.client.logger.error("extend() -> isValidExtend() failed"), a3;
      }
      const { topic: t } = e, s2 = payloadId(), { done: i3, resolve: r3, reject: o4 } = co();
      return this.events.once(go("session_extend", s2), ({ error: a3 }) => {
        a3 ? o4(a3) : r3();
      }), await this.setExpiry(t, ho(Y2)), this.sendRequest({ topic: t, method: "wc_sessionExtend", params: {}, clientRpcId: s2, throwOnFailedPublish: true }).catch((a3) => {
        o4(a3);
      }), { acknowledged: i3 };
    }), c4(this, "request", async (e) => {
      this.isInitialized();
      try {
        await this.isValidRequest(e);
      } catch (p4) {
        throw this.client.logger.error("request() -> isValidRequest() failed"), p4;
      }
      const { chainId: t, request: s2, topic: i3, expiry: r3 = N2.wc_sessionRequest.req.ttl } = e, o4 = this.client.session.get(i3);
      (o4 == null ? void 0 : o4.transportType) === Q2.relay && await this.confirmOnlineStateOrThrow();
      const a3 = payloadId(), l5 = getBigIntRpcId().toString(), { done: u3, resolve: g4, reject: h5 } = co(r3, "Request expired. Please try again.");
      this.events.once(go("session_request", a3), ({ error: p4, result: E5 }) => {
        p4 ? h5(p4) : g4(E5);
      });
      const d4 = "wc_sessionRequest", y6 = this.getAppLinkIfEnabled(o4.peer.metadata, o4.transportType);
      if (y6)
        return await this.sendRequest({ clientRpcId: a3, relayRpcId: l5, topic: i3, method: d4, params: { request: x4(v3({}, s2), { expiryTimestamp: ho(r3) }), chainId: t }, expiry: r3, throwOnFailedPublish: true, appLink: y6 }).catch((p4) => h5(p4)), this.client.events.emit("session_request_sent", { topic: i3, request: s2, chainId: t, id: a3 }), await u3();
      const m3 = { request: x4(v3({}, s2), { expiryTimestamp: ho(r3) }), chainId: t }, I3 = this.shouldSetTVF(d4, m3);
      return await Promise.all([new Promise(async (p4) => {
        await this.sendRequest(v3({ clientRpcId: a3, relayRpcId: l5, topic: i3, method: d4, params: m3, expiry: r3, throwOnFailedPublish: true }, I3 && { tvf: this.getTVFParams(a3, m3) })).catch((E5) => h5(E5)), this.client.events.emit("session_request_sent", { topic: i3, request: s2, chainId: t, id: a3 }), p4();
      }), new Promise(async (p4) => {
        var E5;
        if (!((E5 = o4.sessionConfig) != null && E5.disableDeepLink)) {
          const V4 = await mo(this.client.core.storage, ke3);
          await yo({ id: a3, topic: i3, wcDeepLink: V4 });
        }
        p4();
      }), u3()]).then((p4) => p4[2]);
    }), c4(this, "respond", async (e) => {
      this.isInitialized(), await this.isValidRespond(e);
      const { topic: t, response: s2 } = e, { id: i3 } = s2, r3 = this.client.session.get(t);
      r3.transportType === Q2.relay && await this.confirmOnlineStateOrThrow();
      const o4 = this.getAppLinkIfEnabled(r3.peer.metadata, r3.transportType);
      isJsonRpcResult(s2) ? await this.sendResult({ id: i3, topic: t, result: s2.result, throwOnFailedPublish: true, appLink: o4 }) : isJsonRpcError(s2) && await this.sendError({ id: i3, topic: t, error: s2.error, appLink: o4 }), this.cleanupAfterResponse(e);
    }), c4(this, "ping", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow();
      try {
        await this.isValidPing(e);
      } catch (s2) {
        throw this.client.logger.error("ping() -> isValidPing() failed"), s2;
      }
      const { topic: t } = e;
      if (this.client.session.keys.includes(t)) {
        const s2 = payloadId(), i3 = getBigIntRpcId().toString(), { done: r3, resolve: o4, reject: a3 } = co();
        this.events.once(go("session_ping", s2), ({ error: l5 }) => {
          l5 ? a3(l5) : o4();
        }), await Promise.all([this.sendRequest({ topic: t, method: "wc_sessionPing", params: {}, throwOnFailedPublish: true, clientRpcId: s2, relayRpcId: i3 }), r3()]);
      } else
        this.client.core.pairing.pairings.keys.includes(t) && (this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."), await this.client.core.pairing.ping({ topic: t }));
    }), c4(this, "emit", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidEmit(e);
      const { topic: t, event: s2, chainId: i3 } = e, r3 = getBigIntRpcId().toString(), o4 = payloadId();
      await this.sendRequest({ topic: t, method: "wc_sessionEvent", params: { event: s2, chainId: i3 }, throwOnFailedPublish: true, relayRpcId: r3, clientRpcId: o4 });
    }), c4(this, "disconnect", async (e) => {
      this.isInitialized(), await this.confirmOnlineStateOrThrow(), await this.isValidDisconnect(e);
      const { topic: t } = e;
      if (this.client.session.keys.includes(t))
        await this.sendRequest({ topic: t, method: "wc_sessionDelete", params: de("USER_DISCONNECTED"), throwOnFailedPublish: true }), await this.deleteSession({ topic: t, emitEvent: false });
      else if (this.client.core.pairing.pairings.keys.includes(t))
        await this.client.core.pairing.disconnect({ topic: t });
      else {
        const { message: s2 } = te("MISMATCHED_TOPIC", `Session or pairing topic not found: ${t}`);
        throw new Error(s2);
      }
    }), c4(this, "find", (e) => (this.isInitialized(), this.client.session.getAll().filter((t) => $i(t, e)))), c4(this, "getPendingSessionRequests", () => this.client.pendingRequest.getAll()), c4(this, "authenticate", async (e, t) => {
      var s2;
      this.isInitialized(), this.isValidAuthenticate(e);
      const i3 = t && this.client.core.linkModeSupportedApps.includes(t) && ((s2 = this.client.metadata.redirect) == null ? void 0 : s2.linkMode), r3 = i3 ? Q2.link_mode : Q2.relay;
      r3 === Q2.relay && await this.confirmOnlineStateOrThrow();
      const { chains: o4, statement: a3 = "", uri: l5, domain: u3, nonce: g4, type: h5, exp: d4, nbf: y6, methods: m3 = [], expiry: I3 } = e, p4 = [...e.resources || []], { topic: E5, uri: V4 } = await this.client.core.pairing.create({ methods: ["wc_sessionAuthenticate"], transportType: r3 });
      this.client.logger.info({ message: "Generated new pairing", pairing: { topic: E5, uri: V4 } });
      const q5 = await this.client.core.crypto.generateKeyPair(), R4 = oi(q5);
      if (await Promise.all([this.client.auth.authKeys.set(le3, { responseTopic: R4, publicKey: q5 }), this.client.auth.pairingTopics.set(R4, { topic: R4, pairingTopic: E5 })]), await this.client.core.relayer.subscribe(R4, { transportType: r3 }), this.client.logger.info(`sending request to new pairing topic: ${E5}`), m3.length > 0) {
        const { namespace: b3 } = Ye(o4[0]);
        let L4 = ts(b3, "request", m3);
        Me(p4) && (L4 = ns(L4, p4.pop())), p4.push(L4);
      }
      const D5 = I3 && I3 > N2.wc_sessionAuthenticate.req.ttl ? I3 : N2.wc_sessionAuthenticate.req.ttl, ee3 = { authPayload: { type: h5 ?? "caip122", chains: o4, statement: a3, aud: l5, domain: u3, version: "1", nonce: g4, iat: (/* @__PURE__ */ new Date()).toISOString(), exp: d4, nbf: y6, resources: p4 }, requester: { publicKey: q5, metadata: this.client.metadata }, expiryTimestamp: ho(D5) }, P4 = { eip155: { chains: o4, methods: [.../* @__PURE__ */ new Set(["personal_sign", ...m3])], events: ["chainChanged", "accountsChanged"] } }, X2 = { requiredNamespaces: {}, optionalNamespaces: P4, relays: [{ protocol: "irn" }], pairingTopic: E5, proposer: { publicKey: q5, metadata: this.client.metadata }, expiryTimestamp: ho(N2.wc_sessionPropose.req.ttl), id: payloadId() }, { done: ft3, resolve: Fe4, reject: Re3 } = co(D5, "Request expired"), te4 = payloadId(), pe3 = go("session_connect", X2.id), fe3 = go("session_request", te4), he3 = async ({ error: b3, session: L4 }) => {
        this.events.off(fe3, Ie4), b3 ? Re3(b3) : L4 && Fe4({ session: L4 });
      }, Ie4 = async (b3) => {
        var L4, je4, Qe3;
        if (await this.deletePendingAuthRequest(te4, { message: "fulfilled", code: 0 }), b3.error) {
          const ie4 = de("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
          return b3.error.code === ie4.code ? void 0 : (this.events.off(pe3, he3), Re3(b3.error.message));
        }
        await this.deleteProposal(X2.id), this.events.off(pe3, he3);
        const { cacaos: He3, responder: Q4 } = b3.result, qe4 = [], ze4 = [];
        for (const ie4 of He3) {
          await Yo({ cacao: ie4, projectId: this.client.core.projectId }) || (this.client.logger.error(ie4, "Signature verification failed"), Re3(de("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
          const { p: Te3 } = ie4, Ne4 = Me(Te3.resources), Ye4 = [On(Te3.iss)], It4 = ut(Te3.iss);
          if (Ne4) {
            const Pe2 = rs(Ne4), vt4 = os(Ne4);
            qe4.push(...Pe2), Ye4.push(...vt4);
          }
          for (const Pe2 of Ye4)
            ze4.push(`${Pe2}:${It4}`);
        }
        const se4 = await this.client.core.crypto.generateSharedKey(q5, Q4.publicKey);
        let de4;
        qe4.length > 0 && (de4 = { topic: se4, acknowledged: true, self: { publicKey: q5, metadata: this.client.metadata }, peer: Q4, controller: Q4.publicKey, expiry: ho(Y2), requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: E5, namespaces: Ti([...new Set(qe4)], [...new Set(ze4)]), transportType: r3 }, await this.client.core.relayer.subscribe(se4, { transportType: r3 }), await this.client.session.set(se4, de4), E5 && await this.client.core.pairing.updateMetadata({ topic: E5, metadata: Q4.metadata }), de4 = this.client.session.get(se4)), (L4 = this.client.metadata.redirect) != null && L4.linkMode && (je4 = Q4.metadata.redirect) != null && je4.linkMode && (Qe3 = Q4.metadata.redirect) != null && Qe3.universal && t && (this.client.core.addLinkModeSupportedApp(Q4.metadata.redirect.universal), this.client.session.update(se4, { transportType: Q2.link_mode })), Fe4({ auths: He3, session: de4 });
      };
      this.events.once(pe3, he3), this.events.once(fe3, Ie4);
      let ve3;
      try {
        if (i3) {
          const b3 = formatJsonRpcRequest("wc_sessionAuthenticate", ee3, te4);
          this.client.core.history.set(E5, b3);
          const L4 = await this.client.core.crypto.encode("", b3, { type: _e, encoding: Qs });
          ve3 = Ei(t, E5, L4);
        } else
          await Promise.all([this.sendRequest({ topic: E5, method: "wc_sessionAuthenticate", params: ee3, expiry: e.expiry, throwOnFailedPublish: true, clientRpcId: te4 }), this.sendRequest({ topic: E5, method: "wc_sessionPropose", params: X2, expiry: N2.wc_sessionPropose.req.ttl, throwOnFailedPublish: true, clientRpcId: X2.id })]);
      } catch (b3) {
        throw this.events.off(pe3, he3), this.events.off(fe3, Ie4), b3;
      }
      return await this.setProposal(X2.id, X2), await this.setAuthRequest(te4, { request: x4(v3({}, ee3), { verifyContext: {} }), pairingTopic: E5, transportType: r3 }), { uri: ve3 ?? V4, response: ft3 };
    }), c4(this, "approveSessionAuthenticate", async (e) => {
      const { id: t, auths: s2 } = e, i3 = this.client.core.eventClient.createEvent({ properties: { topic: t.toString(), trace: [Hs2.authenticated_session_approve_started] } });
      try {
        this.isInitialized();
      } catch (I3) {
        throw i3.setError(Ys2.no_internet_connection), I3;
      }
      const r3 = this.getPendingAuthRequest(t);
      if (!r3)
        throw i3.setError(Ys2.authenticated_session_pending_request_not_found), new Error(`Could not find pending auth request with id ${t}`);
      const o4 = r3.transportType || Q2.relay;
      o4 === Q2.relay && await this.confirmOnlineStateOrThrow();
      const a3 = r3.requester.publicKey, l5 = await this.client.core.crypto.generateKeyPair(), u3 = oi(a3), g4 = { type: Ie, receiverPublicKey: a3, senderPublicKey: l5 }, h5 = [], d4 = [];
      for (const I3 of s2) {
        if (!await Yo({ cacao: I3, projectId: this.client.core.projectId })) {
          i3.setError(Ys2.invalid_cacao);
          const R4 = de("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
          throw await this.sendError({ id: t, topic: u3, error: R4, encodeOpts: g4 }), new Error(R4.message);
        }
        i3.addTrace(Hs2.cacaos_verified);
        const { p: p4 } = I3, E5 = Me(p4.resources), V4 = [On(p4.iss)], q5 = ut(p4.iss);
        if (E5) {
          const R4 = rs(E5), D5 = os(E5);
          h5.push(...R4), V4.push(...D5);
        }
        for (const R4 of V4)
          d4.push(`${R4}:${q5}`);
      }
      const y6 = await this.client.core.crypto.generateSharedKey(l5, a3);
      i3.addTrace(Hs2.create_authenticated_session_topic);
      let m3;
      if ((h5 == null ? void 0 : h5.length) > 0) {
        m3 = { topic: y6, acknowledged: true, self: { publicKey: l5, metadata: this.client.metadata }, peer: { publicKey: a3, metadata: r3.requester.metadata }, controller: a3, expiry: ho(Y2), authentication: s2, requiredNamespaces: {}, optionalNamespaces: {}, relay: { protocol: "irn" }, pairingTopic: r3.pairingTopic, namespaces: Ti([...new Set(h5)], [...new Set(d4)]), transportType: o4 }, i3.addTrace(Hs2.subscribing_authenticated_session_topic);
        try {
          await this.client.core.relayer.subscribe(y6, { transportType: o4 });
        } catch (I3) {
          throw i3.setError(Ys2.subscribe_authenticated_session_topic_failure), I3;
        }
        i3.addTrace(Hs2.subscribe_authenticated_session_topic_success), await this.client.session.set(y6, m3), i3.addTrace(Hs2.store_authenticated_session), await this.client.core.pairing.updateMetadata({ topic: r3.pairingTopic, metadata: r3.requester.metadata });
      }
      i3.addTrace(Hs2.publishing_authenticated_session_approve);
      try {
        await this.sendResult({ topic: u3, id: t, result: { cacaos: s2, responder: { publicKey: l5, metadata: this.client.metadata } }, encodeOpts: g4, throwOnFailedPublish: true, appLink: this.getAppLinkIfEnabled(r3.requester.metadata, o4) });
      } catch (I3) {
        throw i3.setError(Ys2.authenticated_session_approve_publish_failure), I3;
      }
      return await this.client.auth.requests.delete(t, { message: "fulfilled", code: 0 }), await this.client.core.pairing.activate({ topic: r3.pairingTopic }), this.client.core.eventClient.deleteEvent({ eventId: i3.eventId }), { session: m3 };
    }), c4(this, "rejectSessionAuthenticate", async (e) => {
      this.isInitialized();
      const { id: t, reason: s2 } = e, i3 = this.getPendingAuthRequest(t);
      if (!i3)
        throw new Error(`Could not find pending auth request with id ${t}`);
      i3.transportType === Q2.relay && await this.confirmOnlineStateOrThrow();
      const r3 = i3.requester.publicKey, o4 = await this.client.core.crypto.generateKeyPair(), a3 = oi(r3), l5 = { type: Ie, receiverPublicKey: r3, senderPublicKey: o4 };
      await this.sendError({ id: t, topic: a3, error: s2, encodeOpts: l5, rpcOpts: N2.wc_sessionAuthenticate.reject, appLink: this.getAppLinkIfEnabled(i3.requester.metadata, i3.transportType) }), await this.client.auth.requests.delete(t, { message: "rejected", code: 0 }), await this.client.proposal.delete(t, de("USER_DISCONNECTED"));
    }), c4(this, "formatAuthMessage", (e) => {
      this.isInitialized();
      const { request: t, iss: s2 } = e;
      return In(t, s2);
    }), c4(this, "processRelayMessageCache", () => {
      setTimeout(async () => {
        if (this.relayMessageCache.length !== 0)
          for (; this.relayMessageCache.length > 0; )
            try {
              const e = this.relayMessageCache.shift();
              e && await this.onRelayMessage(e);
            } catch (e) {
              this.client.logger.error(e);
            }
      }, 50);
    }), c4(this, "cleanupDuplicatePairings", async (e) => {
      if (e.pairingTopic)
        try {
          const t = this.client.core.pairing.pairings.get(e.pairingTopic), s2 = this.client.core.pairing.pairings.getAll().filter((i3) => {
            var r3, o4;
            return ((r3 = i3.peerMetadata) == null ? void 0 : r3.url) && ((o4 = i3.peerMetadata) == null ? void 0 : o4.url) === e.peer.metadata.url && i3.topic && i3.topic !== t.topic;
          });
          if (s2.length === 0)
            return;
          this.client.logger.info(`Cleaning up ${s2.length} duplicate pairing(s)`), await Promise.all(s2.map((i3) => this.client.core.pairing.disconnect({ topic: i3.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
        } catch (t) {
          this.client.logger.error(t);
        }
    }), c4(this, "deleteSession", async (e) => {
      var t;
      const { topic: s2, expirerHasDeleted: i3 = false, emitEvent: r3 = true, id: o4 = 0 } = e, { self: a3 } = this.client.session.get(s2);
      await this.client.core.relayer.unsubscribe(s2), await this.client.session.delete(s2, de("USER_DISCONNECTED")), this.addToRecentlyDeleted(s2, "session"), this.client.core.crypto.keychain.has(a3.publicKey) && await this.client.core.crypto.deleteKeyPair(a3.publicKey), this.client.core.crypto.keychain.has(s2) && await this.client.core.crypto.deleteSymKey(s2), i3 || this.client.core.expirer.del(s2), this.client.core.storage.removeItem(ke3).catch((l5) => this.client.logger.warn(l5)), this.getPendingSessionRequests().forEach((l5) => {
        l5.topic === s2 && this.deletePendingSessionRequest(l5.id, de("USER_DISCONNECTED"));
      }), s2 === ((t = this.sessionRequestQueue.queue[0]) == null ? void 0 : t.topic) && (this.sessionRequestQueue.state = $2.idle), r3 && this.client.events.emit("session_delete", { id: o4, topic: s2 });
    }), c4(this, "deleteProposal", async (e, t) => {
      if (t)
        try {
          const s2 = this.client.proposal.get(e), i3 = this.client.core.eventClient.getEvent({ topic: s2.pairingTopic });
          i3 == null ? void 0 : i3.setError(Gs2.proposal_expired);
        } catch {
        }
      await Promise.all([this.client.proposal.delete(e, de("USER_DISCONNECTED")), t ? Promise.resolve() : this.client.core.expirer.del(e)]), this.addToRecentlyDeleted(e, "proposal");
    }), c4(this, "deletePendingSessionRequest", async (e, t, s2 = false) => {
      await Promise.all([this.client.pendingRequest.delete(e, t), s2 ? Promise.resolve() : this.client.core.expirer.del(e)]), this.addToRecentlyDeleted(e, "request"), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((i3) => i3.id !== e), s2 && (this.sessionRequestQueue.state = $2.idle, this.client.events.emit("session_request_expire", { id: e }));
    }), c4(this, "deletePendingAuthRequest", async (e, t, s2 = false) => {
      await Promise.all([this.client.auth.requests.delete(e, t), s2 ? Promise.resolve() : this.client.core.expirer.del(e)]);
    }), c4(this, "setExpiry", async (e, t) => {
      this.client.session.keys.includes(e) && (this.client.core.expirer.set(e, t), await this.client.session.update(e, { expiry: t }));
    }), c4(this, "setProposal", async (e, t) => {
      this.client.core.expirer.set(e, ho(N2.wc_sessionPropose.req.ttl)), await this.client.proposal.set(e, t);
    }), c4(this, "setAuthRequest", async (e, t) => {
      const { request: s2, pairingTopic: i3, transportType: r3 = Q2.relay } = t;
      this.client.core.expirer.set(e, s2.expiryTimestamp), await this.client.auth.requests.set(e, { authPayload: s2.authPayload, requester: s2.requester, expiryTimestamp: s2.expiryTimestamp, id: e, pairingTopic: i3, verifyContext: s2.verifyContext, transportType: r3 });
    }), c4(this, "setPendingSessionRequest", async (e) => {
      const { id: t, topic: s2, params: i3, verifyContext: r3 } = e, o4 = i3.request.expiryTimestamp || ho(N2.wc_sessionRequest.req.ttl);
      this.client.core.expirer.set(t, o4), await this.client.pendingRequest.set(t, { id: t, topic: s2, params: i3, verifyContext: r3 });
    }), c4(this, "sendRequest", async (e) => {
      const { topic: t, method: s2, params: i3, expiry: r3, relayRpcId: o4, clientRpcId: a3, throwOnFailedPublish: l5, appLink: u3, tvf: g4 } = e, h5 = formatJsonRpcRequest(s2, i3, a3);
      let d4;
      const y6 = !!u3;
      try {
        const p4 = y6 ? Qs : At;
        d4 = await this.client.core.crypto.encode(t, h5, { encoding: p4 });
      } catch (p4) {
        throw await this.cleanup(), this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${t} failed`), p4;
      }
      let m3;
      if (gt2.includes(s2)) {
        const p4 = si(JSON.stringify(h5)), E5 = si(d4);
        m3 = await this.client.core.verify.register({ id: E5, decryptedId: p4 });
      }
      const I3 = N2[s2].req;
      if (I3.attestation = m3, r3 && (I3.ttl = r3), o4 && (I3.id = o4), this.client.core.history.set(t, h5), y6) {
        const p4 = Ei(u3, t, d4);
        await global.Linking.openURL(p4, this.client.name);
      } else {
        const p4 = N2[s2].req;
        r3 && (p4.ttl = r3), o4 && (p4.id = o4), p4.tvf = x4(v3({}, g4), { correlationId: h5.id }), l5 ? (p4.internal = x4(v3({}, p4.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(t, d4, p4)) : this.client.core.relayer.publish(t, d4, p4).catch((E5) => this.client.logger.error(E5));
      }
      return h5.id;
    }), c4(this, "sendResult", async (e) => {
      const { id: t, topic: s2, result: i3, throwOnFailedPublish: r3, encodeOpts: o4, appLink: a3 } = e, l5 = formatJsonRpcResult(t, i3);
      let u3;
      const g4 = a3 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const y6 = g4 ? Qs : At;
        u3 = await this.client.core.crypto.encode(s2, l5, x4(v3({}, o4 || {}), { encoding: y6 }));
      } catch (y6) {
        throw await this.cleanup(), this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${s2} failed`), y6;
      }
      let h5, d4;
      try {
        h5 = await this.client.core.history.get(s2, t);
        const y6 = h5.request;
        try {
          this.shouldSetTVF(y6.method, y6.params) && (d4 = this.getTVFParams(t, y6.params, i3));
        } catch (m3) {
          this.client.logger.warn("sendResult() -> getTVFParams() failed", m3);
        }
      } catch (y6) {
        throw this.client.logger.error(`sendResult() -> history.get(${s2}, ${t}) failed`), y6;
      }
      if (g4) {
        const y6 = Ei(a3, s2, u3);
        await global.Linking.openURL(y6, this.client.name);
      } else {
        const y6 = h5.request.method, m3 = N2[y6].res;
        m3.tvf = x4(v3({}, d4), { correlationId: t }), r3 ? (m3.internal = x4(v3({}, m3.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(s2, u3, m3)) : this.client.core.relayer.publish(s2, u3, m3).catch((I3) => this.client.logger.error(I3));
      }
      await this.client.core.history.resolve(l5);
    }), c4(this, "sendError", async (e) => {
      const { id: t, topic: s2, error: i3, encodeOpts: r3, rpcOpts: o4, appLink: a3 } = e, l5 = formatJsonRpcError(t, i3);
      let u3;
      const g4 = a3 && typeof (global == null ? void 0 : global.Linking) < "u";
      try {
        const d4 = g4 ? Qs : At;
        u3 = await this.client.core.crypto.encode(s2, l5, x4(v3({}, r3 || {}), { encoding: d4 }));
      } catch (d4) {
        throw await this.cleanup(), this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${s2} failed`), d4;
      }
      let h5;
      try {
        h5 = await this.client.core.history.get(s2, t);
      } catch (d4) {
        throw this.client.logger.error(`sendError() -> history.get(${s2}, ${t}) failed`), d4;
      }
      if (g4) {
        const d4 = Ei(a3, s2, u3);
        await global.Linking.openURL(d4, this.client.name);
      } else {
        const d4 = h5.request.method, y6 = o4 || N2[d4].res;
        this.client.core.relayer.publish(s2, u3, y6);
      }
      await this.client.core.history.resolve(l5);
    }), c4(this, "cleanup", async () => {
      const e = [], t = [];
      this.client.session.getAll().forEach((s2) => {
        let i3 = false;
        po(s2.expiry) && (i3 = true), this.client.core.crypto.keychain.has(s2.topic) || (i3 = true), i3 && e.push(s2.topic);
      }), this.client.proposal.getAll().forEach((s2) => {
        po(s2.expiryTimestamp) && t.push(s2.id);
      }), await Promise.all([...e.map((s2) => this.deleteSession({ topic: s2 })), ...t.map((s2) => this.deleteProposal(s2))]);
    }), c4(this, "onRelayEventRequest", async (e) => {
      this.requestQueue.queue.push(e), await this.processRequestsQueue();
    }), c4(this, "processRequestsQueue", async () => {
      if (this.requestQueue.state === $2.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = $2.active;
        const e = this.requestQueue.queue.shift();
        if (e)
          try {
            await this.processRequest(e);
          } catch (t) {
            this.client.logger.warn(t);
          }
      }
      this.requestQueue.state = $2.idle;
    }), c4(this, "processRequest", async (e) => {
      const { topic: t, payload: s2, attestation: i3, transportType: r3, encryptedId: o4 } = e, a3 = s2.method;
      if (!this.shouldIgnorePairingRequest({ topic: t, requestMethod: a3 }))
        switch (a3) {
          case "wc_sessionPropose":
            return await this.onSessionProposeRequest({ topic: t, payload: s2, attestation: i3, encryptedId: o4 });
          case "wc_sessionSettle":
            return await this.onSessionSettleRequest(t, s2);
          case "wc_sessionUpdate":
            return await this.onSessionUpdateRequest(t, s2);
          case "wc_sessionExtend":
            return await this.onSessionExtendRequest(t, s2);
          case "wc_sessionPing":
            return await this.onSessionPingRequest(t, s2);
          case "wc_sessionDelete":
            return await this.onSessionDeleteRequest(t, s2);
          case "wc_sessionRequest":
            return await this.onSessionRequest({ topic: t, payload: s2, attestation: i3, encryptedId: o4, transportType: r3 });
          case "wc_sessionEvent":
            return await this.onSessionEventRequest(t, s2);
          case "wc_sessionAuthenticate":
            return await this.onSessionAuthenticateRequest({ topic: t, payload: s2, attestation: i3, encryptedId: o4, transportType: r3 });
          default:
            return this.client.logger.info(`Unsupported request method ${a3}`);
        }
    }), c4(this, "onRelayEventResponse", async (e) => {
      const { topic: t, payload: s2, transportType: i3 } = e, r3 = (await this.client.core.history.get(t, s2.id)).request.method;
      switch (r3) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(t, s2, i3);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(t, s2);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(t, s2);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(t, s2);
        case "wc_sessionPing":
          return this.onSessionPingResponse(t, s2);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(t, s2);
        case "wc_sessionAuthenticate":
          return this.onSessionAuthenticateResponse(t, s2);
        default:
          return this.client.logger.info(`Unsupported response method ${r3}`);
      }
    }), c4(this, "onRelayEventUnknownPayload", (e) => {
      const { topic: t } = e, { message: s2 } = te("MISSING_OR_INVALID", `Decoded payload on topic ${t} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(s2);
    }), c4(this, "shouldIgnorePairingRequest", (e) => {
      const { topic: t, requestMethod: s2 } = e, i3 = this.expectedPairingMethodMap.get(t);
      return !i3 || i3.includes(s2) ? false : !!(i3.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0);
    }), c4(this, "onSessionProposeRequest", async (e) => {
      const { topic: t, payload: s2, attestation: i3, encryptedId: r3 } = e, { params: o4, id: a3 } = s2;
      try {
        const l5 = this.client.core.eventClient.getEvent({ topic: t });
        this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"), l5 == null ? void 0 : l5.setError(J3.proposal_listener_not_found)), this.isValidConnect(v3({}, s2.params));
        const u3 = o4.expiryTimestamp || ho(N2.wc_sessionPropose.req.ttl), g4 = v3({ id: a3, pairingTopic: t, expiryTimestamp: u3 }, o4);
        await this.setProposal(a3, g4);
        const h5 = await this.getVerifyContext({ attestationId: i3, hash: si(JSON.stringify(s2)), encryptedId: r3, metadata: g4.proposer.metadata });
        l5 == null ? void 0 : l5.addTrace(q2.emit_session_proposal), this.client.events.emit("session_proposal", { id: a3, params: g4, verifyContext: h5 });
      } catch (l5) {
        await this.sendError({ id: a3, topic: t, error: l5, rpcOpts: N2.wc_sessionPropose.autoReject }), this.client.logger.error(l5);
      }
    }), c4(this, "onSessionProposeResponse", async (e, t, s2) => {
      const { id: i3 } = t;
      if (isJsonRpcResult(t)) {
        const { result: r3 } = t;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: r3 });
        const o4 = this.client.proposal.get(i3);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: o4 });
        const a3 = o4.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: a3 });
        const l5 = r3.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: l5 });
        const u3 = await this.client.core.crypto.generateSharedKey(a3, l5);
        this.pendingSessions.set(i3, { sessionTopic: u3, pairingTopic: e, proposalId: i3, publicKey: a3 });
        const g4 = await this.client.core.relayer.subscribe(u3, { transportType: s2 });
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: g4 }), await this.client.core.pairing.activate({ topic: e });
      } else if (isJsonRpcError(t)) {
        await this.client.proposal.delete(i3, de("USER_DISCONNECTED"));
        const r3 = go("session_connect", i3);
        if (this.events.listenerCount(r3) === 0)
          throw new Error(`emitting ${r3} without any listeners, 954`);
        this.events.emit(r3, { error: t.error });
      }
    }), c4(this, "onSessionSettleRequest", async (e, t) => {
      const { id: s2, params: i3 } = t;
      try {
        this.isValidSessionSettleRequest(i3);
        const { relay: r3, controller: o4, expiry: a3, namespaces: l5, sessionProperties: u3, sessionConfig: g4 } = t.params, h5 = [...this.pendingSessions.values()].find((m3) => m3.sessionTopic === e);
        if (!h5)
          return this.client.logger.error(`Pending session not found for topic ${e}`);
        const d4 = this.client.proposal.get(h5.proposalId), y6 = x4(v3(v3({ topic: e, relay: r3, expiry: a3, namespaces: l5, acknowledged: true, pairingTopic: h5.pairingTopic, requiredNamespaces: d4.requiredNamespaces, optionalNamespaces: d4.optionalNamespaces, controller: o4.publicKey, self: { publicKey: h5.publicKey, metadata: this.client.metadata }, peer: { publicKey: o4.publicKey, metadata: o4.metadata } }, u3 && { sessionProperties: u3 }), g4 && { sessionConfig: g4 }), { transportType: Q2.relay });
        await this.client.session.set(y6.topic, y6), await this.setExpiry(y6.topic, y6.expiry), await this.client.core.pairing.updateMetadata({ topic: h5.pairingTopic, metadata: y6.peer.metadata }), this.client.events.emit("session_connect", { session: y6 }), this.events.emit(go("session_connect", h5.proposalId), { session: y6 }), this.pendingSessions.delete(h5.proposalId), this.deleteProposal(h5.proposalId, false), this.cleanupDuplicatePairings(y6), await this.sendResult({ id: t.id, topic: e, result: true, throwOnFailedPublish: true });
      } catch (r3) {
        await this.sendError({ id: s2, topic: e, error: r3 }), this.client.logger.error(r3);
      }
    }), c4(this, "onSessionSettleResponse", async (e, t) => {
      const { id: s2 } = t;
      isJsonRpcResult(t) ? (await this.client.session.update(e, { acknowledged: true }), this.events.emit(go("session_approve", s2), {})) : isJsonRpcError(t) && (await this.client.session.delete(e, de("USER_DISCONNECTED")), this.events.emit(go("session_approve", s2), { error: t.error }));
    }), c4(this, "onSessionUpdateRequest", async (e, t) => {
      const { params: s2, id: i3 } = t;
      try {
        const r3 = `${e}_session_update`, o4 = Zi.get(r3);
        if (o4 && this.isRequestOutOfSync(o4, i3)) {
          this.client.logger.warn(`Discarding out of sync request - ${i3}`), this.sendError({ id: i3, topic: e, error: de("INVALID_UPDATE_REQUEST") });
          return;
        }
        this.isValidUpdate(v3({ topic: e }, s2));
        try {
          Zi.set(r3, i3), await this.client.session.update(e, { namespaces: s2.namespaces }), await this.sendResult({ id: i3, topic: e, result: true, throwOnFailedPublish: true });
        } catch (a3) {
          throw Zi.delete(r3), a3;
        }
        this.client.events.emit("session_update", { id: i3, topic: e, params: s2 });
      } catch (r3) {
        await this.sendError({ id: i3, topic: e, error: r3 }), this.client.logger.error(r3);
      }
    }), c4(this, "isRequestOutOfSync", (e, t) => t.toString().slice(0, -3) < e.toString().slice(0, -3)), c4(this, "onSessionUpdateResponse", (e, t) => {
      const { id: s2 } = t, i3 = go("session_update", s2);
      if (this.events.listenerCount(i3) === 0)
        throw new Error(`emitting ${i3} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(go("session_update", s2), {}) : isJsonRpcError(t) && this.events.emit(go("session_update", s2), { error: t.error });
    }), c4(this, "onSessionExtendRequest", async (e, t) => {
      const { id: s2 } = t;
      try {
        this.isValidExtend({ topic: e }), await this.setExpiry(e, ho(Y2)), await this.sendResult({ id: s2, topic: e, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_extend", { id: s2, topic: e });
      } catch (i3) {
        await this.sendError({ id: s2, topic: e, error: i3 }), this.client.logger.error(i3);
      }
    }), c4(this, "onSessionExtendResponse", (e, t) => {
      const { id: s2 } = t, i3 = go("session_extend", s2);
      if (this.events.listenerCount(i3) === 0)
        throw new Error(`emitting ${i3} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(go("session_extend", s2), {}) : isJsonRpcError(t) && this.events.emit(go("session_extend", s2), { error: t.error });
    }), c4(this, "onSessionPingRequest", async (e, t) => {
      const { id: s2 } = t;
      try {
        this.isValidPing({ topic: e }), await this.sendResult({ id: s2, topic: e, result: true, throwOnFailedPublish: true }), this.client.events.emit("session_ping", { id: s2, topic: e });
      } catch (i3) {
        await this.sendError({ id: s2, topic: e, error: i3 }), this.client.logger.error(i3);
      }
    }), c4(this, "onSessionPingResponse", (e, t) => {
      const { id: s2 } = t, i3 = go("session_ping", s2);
      if (this.events.listenerCount(i3) === 0)
        throw new Error(`emitting ${i3} without any listeners`);
      setTimeout(() => {
        isJsonRpcResult(t) ? this.events.emit(go("session_ping", s2), {}) : isJsonRpcError(t) && this.events.emit(go("session_ping", s2), { error: t.error });
      }, 500);
    }), c4(this, "onSessionDeleteRequest", async (e, t) => {
      const { id: s2 } = t;
      try {
        this.isValidDisconnect({ topic: e, reason: t.params }), Promise.all([new Promise((i3) => {
          this.client.core.relayer.once(T2.publish, async () => {
            i3(await this.deleteSession({ topic: e, id: s2 }));
          });
        }), this.sendResult({ id: s2, topic: e, result: true, throwOnFailedPublish: true }), this.cleanupPendingSentRequestsForTopic({ topic: e, error: de("USER_DISCONNECTED") })]).catch((i3) => this.client.logger.error(i3));
      } catch (i3) {
        this.client.logger.error(i3);
      }
    }), c4(this, "onSessionRequest", async (e) => {
      var t, s2, i3;
      const { topic: r3, payload: o4, attestation: a3, encryptedId: l5, transportType: u3 } = e, { id: g4, params: h5 } = o4;
      try {
        await this.isValidRequest(v3({ topic: r3 }, h5));
        const d4 = this.client.session.get(r3), y6 = await this.getVerifyContext({ attestationId: a3, hash: si(JSON.stringify(formatJsonRpcRequest("wc_sessionRequest", h5, g4))), encryptedId: l5, metadata: d4.peer.metadata, transportType: u3 }), m3 = { id: g4, topic: r3, params: h5, verifyContext: y6 };
        await this.setPendingSessionRequest(m3), u3 === Q2.link_mode && (t = d4.peer.metadata.redirect) != null && t.universal && this.client.core.addLinkModeSupportedApp((s2 = d4.peer.metadata.redirect) == null ? void 0 : s2.universal), (i3 = this.client.signConfig) != null && i3.disableRequestQueue ? this.emitSessionRequest(m3) : (this.addSessionRequestToSessionRequestQueue(m3), this.processSessionRequestQueue());
      } catch (d4) {
        await this.sendError({ id: g4, topic: r3, error: d4 }), this.client.logger.error(d4);
      }
    }), c4(this, "onSessionRequestResponse", (e, t) => {
      const { id: s2 } = t, i3 = go("session_request", s2);
      if (this.events.listenerCount(i3) === 0)
        throw new Error(`emitting ${i3} without any listeners`);
      isJsonRpcResult(t) ? this.events.emit(go("session_request", s2), { result: t.result }) : isJsonRpcError(t) && this.events.emit(go("session_request", s2), { error: t.error });
    }), c4(this, "onSessionEventRequest", async (e, t) => {
      const { id: s2, params: i3 } = t;
      try {
        const r3 = `${e}_session_event_${i3.event.name}`, o4 = Zi.get(r3);
        if (o4 && this.isRequestOutOfSync(o4, s2)) {
          this.client.logger.info(`Discarding out of sync request - ${s2}`);
          return;
        }
        this.isValidEmit(v3({ topic: e }, i3)), this.client.events.emit("session_event", { id: s2, topic: e, params: i3 }), Zi.set(r3, s2);
      } catch (r3) {
        await this.sendError({ id: s2, topic: e, error: r3 }), this.client.logger.error(r3);
      }
    }), c4(this, "onSessionAuthenticateResponse", (e, t) => {
      const { id: s2 } = t;
      this.client.logger.trace({ type: "method", method: "onSessionAuthenticateResponse", topic: e, payload: t }), isJsonRpcResult(t) ? this.events.emit(go("session_request", s2), { result: t.result }) : isJsonRpcError(t) && this.events.emit(go("session_request", s2), { error: t.error });
    }), c4(this, "onSessionAuthenticateRequest", async (e) => {
      var t;
      const { topic: s2, payload: i3, attestation: r3, encryptedId: o4, transportType: a3 } = e;
      try {
        const { requester: l5, authPayload: u3, expiryTimestamp: g4 } = i3.params, h5 = await this.getVerifyContext({ attestationId: r3, hash: si(JSON.stringify(i3)), encryptedId: o4, metadata: l5.metadata, transportType: a3 }), d4 = { requester: l5, pairingTopic: s2, id: i3.id, authPayload: u3, verifyContext: h5, expiryTimestamp: g4 };
        await this.setAuthRequest(i3.id, { request: d4, pairingTopic: s2, transportType: a3 }), a3 === Q2.link_mode && (t = l5.metadata.redirect) != null && t.universal && this.client.core.addLinkModeSupportedApp(l5.metadata.redirect.universal), this.client.events.emit("session_authenticate", { topic: s2, params: i3.params, id: i3.id, verifyContext: h5 });
      } catch (l5) {
        this.client.logger.error(l5);
        const u3 = i3.params.requester.publicKey, g4 = await this.client.core.crypto.generateKeyPair(), h5 = this.getAppLinkIfEnabled(i3.params.requester.metadata, a3), d4 = { type: Ie, receiverPublicKey: u3, senderPublicKey: g4 };
        await this.sendError({ id: i3.id, topic: s2, error: l5, encodeOpts: d4, rpcOpts: N2.wc_sessionAuthenticate.autoReject, appLink: h5 });
      }
    }), c4(this, "addSessionRequestToSessionRequestQueue", (e) => {
      this.sessionRequestQueue.queue.push(e);
    }), c4(this, "cleanupAfterResponse", (e) => {
      this.deletePendingSessionRequest(e.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = $2.idle, this.processSessionRequestQueue();
      }, (0, import_time4.toMiliseconds)(this.requestQueueDelay));
    }), c4(this, "cleanupPendingSentRequestsForTopic", ({ topic: e, error: t }) => {
      const s2 = this.client.core.history.pending;
      s2.length > 0 && s2.filter((i3) => i3.topic === e && i3.request.method === "wc_sessionRequest").forEach((i3) => {
        const r3 = i3.request.id, o4 = go("session_request", r3);
        if (this.events.listenerCount(o4) === 0)
          throw new Error(`emitting ${o4} without any listeners`);
        this.events.emit(go("session_request", i3.request.id), { error: t });
      });
    }), c4(this, "processSessionRequestQueue", () => {
      if (this.sessionRequestQueue.state === $2.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const e = this.sessionRequestQueue.queue[0];
      if (!e) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.sessionRequestQueue.state = $2.active, this.emitSessionRequest(e);
      } catch (t) {
        this.client.logger.error(t);
      }
    }), c4(this, "emitSessionRequest", (e) => {
      this.client.events.emit("session_request", e);
    }), c4(this, "onPairingCreated", (e) => {
      if (e.methods && this.expectedPairingMethodMap.set(e.topic, e.methods), e.active)
        return;
      const t = this.client.proposal.getAll().find((s2) => s2.pairingTopic === e.topic);
      t && this.onSessionProposeRequest({ topic: e.topic, payload: formatJsonRpcRequest("wc_sessionPropose", { requiredNamespaces: t.requiredNamespaces, optionalNamespaces: t.optionalNamespaces, relays: t.relays, proposer: t.proposer, sessionProperties: t.sessionProperties }, t.id) });
    }), c4(this, "isValidConnect", async (e) => {
      if (!Di(e)) {
        const { message: a3 } = te("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(e)}`);
        throw new Error(a3);
      }
      const { pairingTopic: t, requiredNamespaces: s2, optionalNamespaces: i3, sessionProperties: r3, relays: o4 } = e;
      if (ae(t) || await this.isValidPairingTopic(t), !Ci(o4, true)) {
        const { message: a3 } = te("MISSING_OR_INVALID", `connect() relays: ${o4}`);
        throw new Error(a3);
      }
      !ae(s2) && qe(s2) !== 0 && this.validateNamespaces(s2, "requiredNamespaces"), !ae(i3) && qe(i3) !== 0 && this.validateNamespaces(i3, "optionalNamespaces"), ae(r3) || this.validateSessionProps(r3, "sessionProperties");
    }), c4(this, "validateNamespaces", (e, t) => {
      const s2 = ji(e, "connect()", t);
      if (s2)
        throw new Error(s2.message);
    }), c4(this, "isValidApprove", async (e) => {
      if (!Di(e))
        throw new Error(te("MISSING_OR_INVALID", `approve() params: ${e}`).message);
      const { id: t, namespaces: s2, relayProtocol: i3, sessionProperties: r3 } = e;
      this.checkRecentlyDeleted(t), await this.isValidProposalId(t);
      const o4 = this.client.proposal.get(t), a3 = Ir(s2, "approve()");
      if (a3)
        throw new Error(a3.message);
      const l5 = Nr(o4.requiredNamespaces, s2, "approve()");
      if (l5)
        throw new Error(l5.message);
      if (!q(i3, true)) {
        const { message: u3 } = te("MISSING_OR_INVALID", `approve() relayProtocol: ${i3}`);
        throw new Error(u3);
      }
      ae(r3) || this.validateSessionProps(r3, "sessionProperties");
    }), c4(this, "isValidReject", async (e) => {
      if (!Di(e)) {
        const { message: i3 } = te("MISSING_OR_INVALID", `reject() params: ${e}`);
        throw new Error(i3);
      }
      const { id: t, reason: s2 } = e;
      if (this.checkRecentlyDeleted(t), await this.isValidProposalId(t), !Mi(s2)) {
        const { message: i3 } = te("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(s2)}`);
        throw new Error(i3);
      }
    }), c4(this, "isValidSessionSettleRequest", (e) => {
      if (!Di(e)) {
        const { message: l5 } = te("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${e}`);
        throw new Error(l5);
      }
      const { relay: t, controller: s2, namespaces: i3, expiry: r3 } = e;
      if (!Ar(t)) {
        const { message: l5 } = te("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(l5);
      }
      const o4 = Bi(s2, "onSessionSettleRequest()");
      if (o4)
        throw new Error(o4.message);
      const a3 = Ir(i3, "onSessionSettleRequest()");
      if (a3)
        throw new Error(a3.message);
      if (po(r3)) {
        const { message: l5 } = te("EXPIRED", "onSessionSettleRequest()");
        throw new Error(l5);
      }
    }), c4(this, "isValidUpdate", async (e) => {
      if (!Di(e)) {
        const { message: a3 } = te("MISSING_OR_INVALID", `update() params: ${e}`);
        throw new Error(a3);
      }
      const { topic: t, namespaces: s2 } = e;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
      const i3 = this.client.session.get(t), r3 = Ir(s2, "update()");
      if (r3)
        throw new Error(r3.message);
      const o4 = Nr(i3.requiredNamespaces, s2, "update()");
      if (o4)
        throw new Error(o4.message);
    }), c4(this, "isValidExtend", async (e) => {
      if (!Di(e)) {
        const { message: s2 } = te("MISSING_OR_INVALID", `extend() params: ${e}`);
        throw new Error(s2);
      }
      const { topic: t } = e;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
    }), c4(this, "isValidRequest", async (e) => {
      if (!Di(e)) {
        const { message: a3 } = te("MISSING_OR_INVALID", `request() params: ${e}`);
        throw new Error(a3);
      }
      const { topic: t, request: s2, chainId: i3, expiry: r3 } = e;
      this.checkRecentlyDeleted(t), await this.isValidSessionTopic(t);
      const { namespaces: o4 } = this.client.session.get(t);
      if (!Fi(o4, i3)) {
        const { message: a3 } = te("MISSING_OR_INVALID", `request() chainId: ${i3}`);
        throw new Error(a3);
      }
      if (!Vi(s2)) {
        const { message: a3 } = te("MISSING_OR_INVALID", `request() ${JSON.stringify(s2)}`);
        throw new Error(a3);
      }
      if (!qi(o4, i3, s2.method)) {
        const { message: a3 } = te("MISSING_OR_INVALID", `request() method: ${s2.method}`);
        throw new Error(a3);
      }
      if (r3 && !Ji(r3, Ee3)) {
        const { message: a3 } = te("MISSING_OR_INVALID", `request() expiry: ${r3}. Expiry must be a number (in seconds) between ${Ee3.min} and ${Ee3.max}`);
        throw new Error(a3);
      }
    }), c4(this, "isValidRespond", async (e) => {
      var t;
      if (!Di(e)) {
        const { message: r3 } = te("MISSING_OR_INVALID", `respond() params: ${e}`);
        throw new Error(r3);
      }
      const { topic: s2, response: i3 } = e;
      try {
        await this.isValidSessionTopic(s2);
      } catch (r3) {
        throw (t = e == null ? void 0 : e.response) != null && t.id && this.cleanupAfterResponse(e), r3;
      }
      if (!Hi(i3)) {
        const { message: r3 } = te("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(i3)}`);
        throw new Error(r3);
      }
    }), c4(this, "isValidPing", async (e) => {
      if (!Di(e)) {
        const { message: s2 } = te("MISSING_OR_INVALID", `ping() params: ${e}`);
        throw new Error(s2);
      }
      const { topic: t } = e;
      await this.isValidSessionOrPairingTopic(t);
    }), c4(this, "isValidEmit", async (e) => {
      if (!Di(e)) {
        const { message: o4 } = te("MISSING_OR_INVALID", `emit() params: ${e}`);
        throw new Error(o4);
      }
      const { topic: t, event: s2, chainId: i3 } = e;
      await this.isValidSessionTopic(t);
      const { namespaces: r3 } = this.client.session.get(t);
      if (!Fi(r3, i3)) {
        const { message: o4 } = te("MISSING_OR_INVALID", `emit() chainId: ${i3}`);
        throw new Error(o4);
      }
      if (!Ki(s2)) {
        const { message: o4 } = te("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s2)}`);
        throw new Error(o4);
      }
      if (!Gi(r3, i3, s2.name)) {
        const { message: o4 } = te("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(s2)}`);
        throw new Error(o4);
      }
    }), c4(this, "isValidDisconnect", async (e) => {
      if (!Di(e)) {
        const { message: s2 } = te("MISSING_OR_INVALID", `disconnect() params: ${e}`);
        throw new Error(s2);
      }
      const { topic: t } = e;
      await this.isValidSessionOrPairingTopic(t);
    }), c4(this, "isValidAuthenticate", (e) => {
      const { chains: t, uri: s2, domain: i3, nonce: r3 } = e;
      if (!Array.isArray(t) || t.length === 0)
        throw new Error("chains is required and must be a non-empty array");
      if (!q(s2, false))
        throw new Error("uri is required parameter");
      if (!q(i3, false))
        throw new Error("domain is required parameter");
      if (!q(r3, false))
        throw new Error("nonce is required parameter");
      if ([...new Set(t.map((a3) => Ye(a3).namespace))].length > 1)
        throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
      const { namespace: o4 } = Ye(t[0]);
      if (o4 !== "eip155")
        throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.");
    }), c4(this, "getVerifyContext", async (e) => {
      const { attestationId: t, hash: s2, encryptedId: i3, metadata: r3, transportType: o4 } = e, a3 = { verified: { verifyUrl: r3.verifyUrl || le2, validation: "UNKNOWN", origin: r3.url || "" } };
      try {
        if (o4 === Q2.link_mode) {
          const u3 = this.getAppLinkIfEnabled(r3, o4);
          return a3.verified.validation = u3 && new URL(u3).origin === new URL(r3.url).origin ? "VALID" : "INVALID", a3;
        }
        const l5 = await this.client.core.verify.resolve({ attestationId: t, hash: s2, encryptedId: i3, verifyUrl: r3.verifyUrl });
        l5 && (a3.verified.origin = l5.origin, a3.verified.isScam = l5.isScam, a3.verified.validation = l5.origin === new URL(r3.url).origin ? "VALID" : "INVALID");
      } catch (l5) {
        this.client.logger.warn(l5);
      }
      return this.client.logger.debug(`Verify context: ${JSON.stringify(a3)}`), a3;
    }), c4(this, "validateSessionProps", (e, t) => {
      Object.values(e).forEach((s2) => {
        if (!q(s2, false)) {
          const { message: i3 } = te("MISSING_OR_INVALID", `${t} must be in Record<string, string> format. Received: ${JSON.stringify(s2)}`);
          throw new Error(i3);
        }
      });
    }), c4(this, "getPendingAuthRequest", (e) => {
      const t = this.client.auth.requests.get(e);
      return typeof t == "object" ? t : void 0;
    }), c4(this, "addToRecentlyDeleted", (e, t) => {
      if (this.recentlyDeletedMap.set(e, t), this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
        let s2 = 0;
        const i3 = this.recentlyDeletedLimit / 2;
        for (const r3 of this.recentlyDeletedMap.keys()) {
          if (s2++ >= i3)
            break;
          this.recentlyDeletedMap.delete(r3);
        }
      }
    }), c4(this, "checkRecentlyDeleted", (e) => {
      const t = this.recentlyDeletedMap.get(e);
      if (t) {
        const { message: s2 } = te("MISSING_OR_INVALID", `Record was recently deleted - ${t}: ${e}`);
        throw new Error(s2);
      }
    }), c4(this, "isLinkModeEnabled", (e, t) => {
      var s2, i3, r3, o4, a3, l5, u3, g4, h5;
      return !e || t !== Q2.link_mode ? false : ((i3 = (s2 = this.client.metadata) == null ? void 0 : s2.redirect) == null ? void 0 : i3.linkMode) === true && ((o4 = (r3 = this.client.metadata) == null ? void 0 : r3.redirect) == null ? void 0 : o4.universal) !== void 0 && ((l5 = (a3 = this.client.metadata) == null ? void 0 : a3.redirect) == null ? void 0 : l5.universal) !== "" && ((u3 = e == null ? void 0 : e.redirect) == null ? void 0 : u3.universal) !== void 0 && ((g4 = e == null ? void 0 : e.redirect) == null ? void 0 : g4.universal) !== "" && ((h5 = e == null ? void 0 : e.redirect) == null ? void 0 : h5.linkMode) === true && this.client.core.linkModeSupportedApps.includes(e.redirect.universal) && typeof (global == null ? void 0 : global.Linking) < "u";
    }), c4(this, "getAppLinkIfEnabled", (e, t) => {
      var s2;
      return this.isLinkModeEnabled(e, t) ? (s2 = e == null ? void 0 : e.redirect) == null ? void 0 : s2.universal : void 0;
    }), c4(this, "handleLinkModeMessage", ({ url: e }) => {
      if (!e || !e.includes("wc_ev") || !e.includes("topic"))
        return;
      const t = bo(e, "topic") || "", s2 = decodeURIComponent(bo(e, "wc_ev") || ""), i3 = this.client.session.keys.includes(t);
      i3 && this.client.session.update(t, { transportType: Q2.link_mode }), this.client.core.dispatchEnvelope({ topic: t, message: s2, sessionExists: i3 });
    }), c4(this, "registerLinkModeListeners", async () => {
      var e;
      if (Eo() || ne() && (e = this.client.metadata.redirect) != null && e.linkMode) {
        const t = global == null ? void 0 : global.Linking;
        if (typeof t < "u") {
          t.addEventListener("url", this.handleLinkModeMessage, this.client.name);
          const s2 = await t.getInitialURL();
          s2 && setTimeout(() => {
            this.handleLinkModeMessage({ url: s2 });
          }, 50);
        }
      }
    }), c4(this, "shouldSetTVF", (e, t) => {
      if (!t || e !== "wc_sessionRequest")
        return false;
      const { request: s2 } = t;
      return Object.keys(Ke3).includes(s2.method);
    }), c4(this, "getTVFParams", (e, t, s2) => {
      var i3, r3;
      try {
        const o4 = t.request.method, a3 = this.extractTxHashesFromResult(o4, s2);
        return x4(v3({ correlationId: e, rpcMethods: [o4], chainId: t.chainId }, this.isValidContractData(t.request.params) && { contractAddresses: [(r3 = (i3 = t.request.params) == null ? void 0 : i3[0]) == null ? void 0 : r3.to] }), { txHashes: a3 });
      } catch (o4) {
        this.client.logger.warn("Error getting TVF params", o4);
      }
      return {};
    }), c4(this, "isValidContractData", (e) => {
      var t;
      if (!e)
        return false;
      try {
        const s2 = (e == null ? void 0 : e.data) || ((t = e == null ? void 0 : e[0]) == null ? void 0 : t.data);
        if (!s2.startsWith("0x"))
          return false;
        const i3 = s2.slice(2);
        return /^[0-9a-fA-F]*$/.test(i3) ? i3.length % 2 === 0 : false;
      } catch {
      }
      return false;
    }), c4(this, "extractTxHashesFromResult", (e, t) => {
      try {
        const s2 = Ke3[e];
        if (typeof t == "string")
          return [t];
        const i3 = t[s2.key];
        if ($e(i3))
          return i3;
        if (typeof i3 == "string")
          return [i3];
      } catch (s2) {
        this.client.logger.warn("Error extracting tx hashes from result", s2);
      }
      return [];
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: n3 } = te("NOT_INITIALIZED", this.name);
      throw new Error(n3);
    }
  }
  async confirmOnlineStateOrThrow() {
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(T2.message, (n3) => {
      !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(n3) : this.onRelayMessage(n3);
    });
  }
  async onRelayMessage(n3) {
    const { topic: e, message: t, attestation: s2, transportType: i3 } = n3, { publicKey: r3 } = this.client.auth.authKeys.keys.includes(le3) ? this.client.auth.authKeys.get(le3) : { responseTopic: void 0, publicKey: void 0 }, o4 = await this.client.core.crypto.decode(e, t, { receiverPublicKey: r3, encoding: i3 === Q2.link_mode ? Qs : At });
    try {
      isJsonRpcRequest(o4) ? (this.client.core.history.set(e, o4), this.onRelayEventRequest({ topic: e, payload: o4, attestation: s2, transportType: i3, encryptedId: si(t) })) : isJsonRpcResponse(o4) ? (await this.client.core.history.resolve(o4), await this.onRelayEventResponse({ topic: e, payload: o4, transportType: i3 }), this.client.core.history.delete(e, o4.id)) : this.onRelayEventUnknownPayload({ topic: e, payload: o4, transportType: i3 });
    } catch (a3) {
      this.client.logger.error(a3);
    }
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(M3.expired, async (n3) => {
      const { topic: e, id: t } = lo(n3.target);
      if (t && this.client.pendingRequest.keys.includes(t))
        return await this.deletePendingSessionRequest(t, te("EXPIRED"), true);
      if (t && this.client.auth.requests.keys.includes(t))
        return await this.deletePendingAuthRequest(t, te("EXPIRED"), true);
      e ? this.client.session.keys.includes(e) && (await this.deleteSession({ topic: e, expirerHasDeleted: true }), this.client.events.emit("session_expire", { topic: e })) : t && (await this.deleteProposal(t, true), this.client.events.emit("proposal_expire", { id: t }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(se2.create, (n3) => this.onPairingCreated(n3)), this.client.core.pairing.events.on(se2.delete, (n3) => {
      this.addToRecentlyDeleted(n3.topic, "pairing");
    });
  }
  isValidPairingTopic(n3) {
    if (!q(n3, false)) {
      const { message: e } = te("MISSING_OR_INVALID", `pairing topic should be a string: ${n3}`);
      throw new Error(e);
    }
    if (!this.client.core.pairing.pairings.keys.includes(n3)) {
      const { message: e } = te("NO_MATCHING_KEY", `pairing topic doesn't exist: ${n3}`);
      throw new Error(e);
    }
    if (po(this.client.core.pairing.pairings.get(n3).expiry)) {
      const { message: e } = te("EXPIRED", `pairing topic: ${n3}`);
      throw new Error(e);
    }
  }
  async isValidSessionTopic(n3) {
    if (!q(n3, false)) {
      const { message: e } = te("MISSING_OR_INVALID", `session topic should be a string: ${n3}`);
      throw new Error(e);
    }
    if (this.checkRecentlyDeleted(n3), !this.client.session.keys.includes(n3)) {
      const { message: e } = te("NO_MATCHING_KEY", `session topic doesn't exist: ${n3}`);
      throw new Error(e);
    }
    if (po(this.client.session.get(n3).expiry)) {
      await this.deleteSession({ topic: n3 });
      const { message: e } = te("EXPIRED", `session topic: ${n3}`);
      throw new Error(e);
    }
    if (!this.client.core.crypto.keychain.has(n3)) {
      const { message: e } = te("MISSING_OR_INVALID", `session topic does not exist in keychain: ${n3}`);
      throw await this.deleteSession({ topic: n3 }), new Error(e);
    }
  }
  async isValidSessionOrPairingTopic(n3) {
    if (this.checkRecentlyDeleted(n3), this.client.session.keys.includes(n3))
      await this.isValidSessionTopic(n3);
    else if (this.client.core.pairing.pairings.keys.includes(n3))
      this.isValidPairingTopic(n3);
    else if (q(n3, false)) {
      const { message: e } = te("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${n3}`);
      throw new Error(e);
    } else {
      const { message: e } = te("MISSING_OR_INVALID", `session or pairing topic should be a string: ${n3}`);
      throw new Error(e);
    }
  }
  async isValidProposalId(n3) {
    if (!ki(n3)) {
      const { message: e } = te("MISSING_OR_INVALID", `proposal id should be a number: ${n3}`);
      throw new Error(e);
    }
    if (!this.client.proposal.keys.includes(n3)) {
      const { message: e } = te("NO_MATCHING_KEY", `proposal id doesn't exist: ${n3}`);
      throw new Error(e);
    }
    if (po(this.client.proposal.get(n3).expiryTimestamp)) {
      await this.deleteProposal(n3);
      const { message: e } = te("EXPIRED", `proposal id: ${n3}`);
      throw new Error(e);
    }
  }
};
var Ns2 = class extends Ci2 {
  constructor(n3, e) {
    super(n3, e, pt2, me3), this.core = n3, this.logger = e;
  }
};
var Rt3 = class extends Ci2 {
  constructor(n3, e) {
    super(n3, e, ht2, me3), this.core = n3, this.logger = e;
  }
};
var Ps2 = class extends Ci2 {
  constructor(n3, e) {
    super(n3, e, ut2, me3, (t) => t.id), this.core = n3, this.logger = e;
  }
};
var Os2 = class extends Ci2 {
  constructor(n3, e) {
    super(n3, e, mt3, ce2, () => le3), this.core = n3, this.logger = e;
  }
};
var bs2 = class extends Ci2 {
  constructor(n3, e) {
    super(n3, e, _t3, ce2), this.core = n3, this.logger = e;
  }
};
var As2 = class extends Ci2 {
  constructor(n3, e) {
    super(n3, e, Et3, ce2, (t) => t.id), this.core = n3, this.logger = e;
  }
};
var Cs2 = Object.defineProperty;
var xs2 = (S4, n3, e) => n3 in S4 ? Cs2(S4, n3, { enumerable: true, configurable: true, writable: true, value: e }) : S4[n3] = e;
var Ge3 = (S4, n3, e) => xs2(S4, typeof n3 != "symbol" ? n3 + "" : n3, e);
var Vs2 = class {
  constructor(n3, e) {
    this.core = n3, this.logger = e, Ge3(this, "authKeys"), Ge3(this, "pairingTopics"), Ge3(this, "requests"), this.authKeys = new Os2(this.core, this.logger), this.pairingTopics = new bs2(this.core, this.logger), this.requests = new As2(this.core, this.logger);
  }
  async init() {
    await this.authKeys.init(), await this.pairingTopics.init(), await this.requests.init();
  }
};
var Ds2 = Object.defineProperty;
var Ls3 = (S4, n3, e) => n3 in S4 ? Ds2(S4, n3, { enumerable: true, configurable: true, writable: true, value: e }) : S4[n3] = e;
var _3 = (S4, n3, e) => Ls3(S4, typeof n3 != "symbol" ? n3 + "" : n3, e);
var Se2 = class _Se extends J2 {
  constructor(n3) {
    super(n3), _3(this, "protocol", De2), _3(this, "version", Le3), _3(this, "name", _e3.name), _3(this, "metadata"), _3(this, "core"), _3(this, "logger"), _3(this, "events", new import_events8.EventEmitter()), _3(this, "engine"), _3(this, "session"), _3(this, "proposal"), _3(this, "pendingRequest"), _3(this, "auth"), _3(this, "signConfig"), _3(this, "on", (t, s2) => this.events.on(t, s2)), _3(this, "once", (t, s2) => this.events.once(t, s2)), _3(this, "off", (t, s2) => this.events.off(t, s2)), _3(this, "removeListener", (t, s2) => this.events.removeListener(t, s2)), _3(this, "removeAllListeners", (t) => this.events.removeAllListeners(t)), _3(this, "connect", async (t) => {
      try {
        return await this.engine.connect(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), _3(this, "pair", async (t) => {
      try {
        return await this.engine.pair(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), _3(this, "approve", async (t) => {
      try {
        return await this.engine.approve(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), _3(this, "reject", async (t) => {
      try {
        return await this.engine.reject(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), _3(this, "update", async (t) => {
      try {
        return await this.engine.update(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), _3(this, "extend", async (t) => {
      try {
        return await this.engine.extend(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), _3(this, "request", async (t) => {
      try {
        return await this.engine.request(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), _3(this, "respond", async (t) => {
      try {
        return await this.engine.respond(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), _3(this, "ping", async (t) => {
      try {
        return await this.engine.ping(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), _3(this, "emit", async (t) => {
      try {
        return await this.engine.emit(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), _3(this, "disconnect", async (t) => {
      try {
        return await this.engine.disconnect(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), _3(this, "find", (t) => {
      try {
        return this.engine.find(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), _3(this, "getPendingSessionRequests", () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }), _3(this, "authenticate", async (t, s2) => {
      try {
        return await this.engine.authenticate(t, s2);
      } catch (i3) {
        throw this.logger.error(i3.message), i3;
      }
    }), _3(this, "formatAuthMessage", (t) => {
      try {
        return this.engine.formatAuthMessage(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), _3(this, "approveSessionAuthenticate", async (t) => {
      try {
        return await this.engine.approveSessionAuthenticate(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), _3(this, "rejectSessionAuthenticate", async (t) => {
      try {
        return await this.engine.rejectSessionAuthenticate(t);
      } catch (s2) {
        throw this.logger.error(s2.message), s2;
      }
    }), this.name = (n3 == null ? void 0 : n3.name) || _e3.name, this.metadata = (n3 == null ? void 0 : n3.metadata) || Yr(), this.signConfig = n3 == null ? void 0 : n3.signConfig;
    const e = typeof (n3 == null ? void 0 : n3.logger) < "u" && typeof (n3 == null ? void 0 : n3.logger) != "string" ? n3.logger : (0, import_pino.default)(k({ level: (n3 == null ? void 0 : n3.logger) || _e3.logger }));
    this.core = (n3 == null ? void 0 : n3.core) || new co2(n3), this.logger = E(e, this.name), this.session = new Rt3(this.core, this.logger), this.proposal = new Ns2(this.core, this.logger), this.pendingRequest = new Ps2(this.core, this.logger), this.engine = new Ts2(this), this.auth = new Vs2(this.core, this.logger);
  }
  static async init(n3) {
    const e = new _Se(n3);
    return await e.initialize(), e;
  }
  get context() {
    return y(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.auth.init(), await this.engine.init(), this.logger.info("SignClient Initialization Success"), setTimeout(() => {
        this.engine.processRelayMessageCache();
      }, (0, import_time4.toMiliseconds)(import_time4.ONE_SECOND));
    } catch (n3) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(n3.message), n3;
    }
  }
};

// node_modules/@walletconnect/universal-provider/dist/index.es.js
var import_events9 = __toESM(require_events());
var be2 = "error";
var _t4 = "wss://relay.walletconnect.org";
var Ct3 = "wc";
var It3 = "universal_provider";
var $e4 = `${Ct3}@2:${It3}:`;
var ye2 = "https://rpc.walletconnect.org/v1/";
var w2 = "generic";
var Ot3 = `${ye2}bundler`;
var f7 = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
var G2 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function At3() {
  this.__data__ = [], this.size = 0;
}
var jt3 = At3;
function Ht2(r3, e) {
  return r3 === e || r3 !== r3 && e !== e;
}
var z4 = Ht2;
var Et4 = z4;
function St4(r3, e) {
  for (var t = r3.length; t--; )
    if (Et4(r3[t][0], e))
      return t;
  return -1;
}
var k4 = St4;
var Nt3 = k4;
var Tt3 = Array.prototype;
var Dt = Tt3.splice;
function qt2(r3) {
  var e = this.__data__, t = Nt3(e, r3);
  if (t < 0)
    return false;
  var i3 = e.length - 1;
  return t == i3 ? e.pop() : Dt.call(e, t, 1), --this.size, true;
}
var Rt4 = qt2;
var xt3 = k4;
function Lt3(r3) {
  var e = this.__data__, t = xt3(e, r3);
  return t < 0 ? void 0 : e[t][1];
}
var Ut3 = Lt3;
var Ft3 = k4;
function Mt3(r3) {
  return Ft3(this.__data__, r3) > -1;
}
var Gt3 = Mt3;
var zt3 = k4;
function kt3(r3, e) {
  var t = this.__data__, i3 = zt3(t, r3);
  return i3 < 0 ? (++this.size, t.push([r3, e])) : t[i3][1] = e, this;
}
var Bt3 = kt3;
var Vt2 = jt3;
var Jt3 = Rt4;
var Kt2 = Ut3;
var Wt3 = Gt3;
var Xt2 = Bt3;
function _4(r3) {
  var e = -1, t = r3 == null ? 0 : r3.length;
  for (this.clear(); ++e < t; ) {
    var i3 = r3[e];
    this.set(i3[0], i3[1]);
  }
}
_4.prototype.clear = Vt2, _4.prototype.delete = Jt3, _4.prototype.get = Kt2, _4.prototype.has = Wt3, _4.prototype.set = Xt2;
var B2 = _4;
var Yt3 = B2;
function Zt2() {
  this.__data__ = new Yt3(), this.size = 0;
}
var Qt2 = Zt2;
function er3(r3) {
  var e = this.__data__, t = e.delete(r3);
  return this.size = e.size, t;
}
var tr3 = er3;
function rr3(r3) {
  return this.__data__.get(r3);
}
var ir3 = rr3;
function sr3(r3) {
  return this.__data__.has(r3);
}
var nr3 = sr3;
var ar3 = typeof G2 == "object" && G2 && G2.Object === Object && G2;
var we3 = ar3;
var or3 = we3;
var cr3 = typeof self == "object" && self && self.Object === Object && self;
var hr3 = or3 || cr3 || Function("return this")();
var C3 = hr3;
var pr3 = C3;
var ur2 = pr3.Symbol;
var _e4 = ur2;
var Ce2 = _e4;
var Ie3 = Object.prototype;
var lr3 = Ie3.hasOwnProperty;
var dr3 = Ie3.toString;
var F3 = Ce2 ? Ce2.toStringTag : void 0;
function vr3(r3) {
  var e = lr3.call(r3, F3), t = r3[F3];
  try {
    r3[F3] = void 0;
    var i3 = true;
  } catch {
  }
  var s2 = dr3.call(r3);
  return i3 && (e ? r3[F3] = t : delete r3[F3]), s2;
}
var fr2 = vr3;
var mr3 = Object.prototype;
var gr3 = mr3.toString;
function Pr2(r3) {
  return gr3.call(r3);
}
var br3 = Pr2;
var Oe4 = _e4;
var $r3 = fr2;
var yr3 = br3;
var wr3 = "[object Null]";
var _r3 = "[object Undefined]";
var Ae3 = Oe4 ? Oe4.toStringTag : void 0;
function Cr2(r3) {
  return r3 == null ? r3 === void 0 ? _r3 : wr3 : Ae3 && Ae3 in Object(r3) ? $r3(r3) : yr3(r3);
}
var V3 = Cr2;
function Ir3(r3) {
  var e = typeof r3;
  return r3 != null && (e == "object" || e == "function");
}
var $3 = Ir3;
var Or3 = V3;
var Ar3 = $3;
var jr2 = "[object AsyncFunction]";
var Hr3 = "[object Function]";
var Er3 = "[object GeneratorFunction]";
var Sr3 = "[object Proxy]";
function Nr3(r3) {
  if (!Ar3(r3))
    return false;
  var e = Or3(r3);
  return e == Hr3 || e == Er3 || e == jr2 || e == Sr3;
}
var te3 = Nr3;
var Tr3 = C3;
var Dr2 = Tr3["__core-js_shared__"];
var qr2 = Dr2;
var re3 = qr2;
var je3 = function() {
  var r3 = /[^.]+$/.exec(re3 && re3.keys && re3.keys.IE_PROTO || "");
  return r3 ? "Symbol(src)_1." + r3 : "";
}();
function Rr3(r3) {
  return !!je3 && je3 in r3;
}
var xr3 = Rr3;
var Lr3 = Function.prototype;
var Ur3 = Lr3.toString;
function Fr2(r3) {
  if (r3 != null) {
    try {
      return Ur3.call(r3);
    } catch {
    }
    try {
      return r3 + "";
    } catch {
    }
  }
  return "";
}
var Mr2 = Fr2;
var Gr2 = te3;
var zr3 = xr3;
var kr3 = $3;
var Br3 = Mr2;
var Vr2 = /[\\^$.*+?()[\]{}|]/g;
var Jr3 = /^\[object .+?Constructor\]$/;
var Kr4 = Function.prototype;
var Wr3 = Object.prototype;
var Xr2 = Kr4.toString;
var Yr3 = Wr3.hasOwnProperty;
var Zr3 = RegExp("^" + Xr2.call(Yr3).replace(Vr2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function Qr2(r3) {
  if (!kr3(r3) || zr3(r3))
    return false;
  var e = Gr2(r3) ? Zr3 : Jr3;
  return e.test(Br3(r3));
}
var ei3 = Qr2;
function ti3(r3, e) {
  return r3 == null ? void 0 : r3[e];
}
var ri3 = ti3;
var ii3 = ei3;
var si3 = ri3;
function ni3(r3, e) {
  var t = si3(r3, e);
  return ii3(t) ? t : void 0;
}
var ie3 = ni3;
var ai3 = ie3;
var oi3 = C3;
var ci3 = ai3(oi3, "Map");
var He2 = ci3;
var hi3 = ie3;
var pi3 = hi3(Object, "create");
var J4 = pi3;
var Ee4 = J4;
function ui3() {
  this.__data__ = Ee4 ? Ee4(null) : {}, this.size = 0;
}
var li3 = ui3;
function di3(r3) {
  var e = this.has(r3) && delete this.__data__[r3];
  return this.size -= e ? 1 : 0, e;
}
var vi2 = di3;
var fi3 = J4;
var mi3 = "__lodash_hash_undefined__";
var gi3 = Object.prototype;
var Pi5 = gi3.hasOwnProperty;
function bi3(r3) {
  var e = this.__data__;
  if (fi3) {
    var t = e[r3];
    return t === mi3 ? void 0 : t;
  }
  return Pi5.call(e, r3) ? e[r3] : void 0;
}
var $i3 = bi3;
var yi3 = J4;
var wi3 = Object.prototype;
var _i2 = wi3.hasOwnProperty;
function Ci3(r3) {
  var e = this.__data__;
  return yi3 ? e[r3] !== void 0 : _i2.call(e, r3);
}
var Ii2 = Ci3;
var Oi2 = J4;
var Ai2 = "__lodash_hash_undefined__";
function ji2(r3, e) {
  var t = this.__data__;
  return this.size += this.has(r3) ? 0 : 1, t[r3] = Oi2 && e === void 0 ? Ai2 : e, this;
}
var Hi2 = ji2;
var Ei3 = li3;
var Si2 = vi2;
var Ni2 = $i3;
var Ti3 = Ii2;
var Di3 = Hi2;
function I2(r3) {
  var e = -1, t = r3 == null ? 0 : r3.length;
  for (this.clear(); ++e < t; ) {
    var i3 = r3[e];
    this.set(i3[0], i3[1]);
  }
}
I2.prototype.clear = Ei3, I2.prototype.delete = Si2, I2.prototype.get = Ni2, I2.prototype.has = Ti3, I2.prototype.set = Di3;
var qi2 = I2;
var Se3 = qi2;
var Ri3 = B2;
var xi2 = He2;
function Li3() {
  this.size = 0, this.__data__ = { hash: new Se3(), map: new (xi2 || Ri3)(), string: new Se3() };
}
var Ui = Li3;
function Fi2(r3) {
  var e = typeof r3;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? r3 !== "__proto__" : r3 === null;
}
var Mi2 = Fi2;
var Gi2 = Mi2;
function zi3(r3, e) {
  var t = r3.__data__;
  return Gi2(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
var K3 = zi3;
var ki3 = K3;
function Bi2(r3) {
  var e = ki3(this, r3).delete(r3);
  return this.size -= e ? 1 : 0, e;
}
var Vi2 = Bi2;
var Ji2 = K3;
function Ki2(r3) {
  return Ji2(this, r3).get(r3);
}
var Wi2 = Ki2;
var Xi2 = K3;
function Yi2(r3) {
  return Xi2(this, r3).has(r3);
}
var Zi2 = Yi2;
var Qi2 = K3;
function es2(r3, e) {
  var t = Qi2(this, r3), i3 = t.size;
  return t.set(r3, e), this.size += t.size == i3 ? 0 : 1, this;
}
var ts2 = es2;
var rs2 = Ui;
var is2 = Vi2;
var ss2 = Wi2;
var ns2 = Zi2;
var as2 = ts2;
function O3(r3) {
  var e = -1, t = r3 == null ? 0 : r3.length;
  for (this.clear(); ++e < t; ) {
    var i3 = r3[e];
    this.set(i3[0], i3[1]);
  }
}
O3.prototype.clear = rs2, O3.prototype.delete = is2, O3.prototype.get = ss2, O3.prototype.has = ns2, O3.prototype.set = as2;
var os2 = O3;
var cs3 = B2;
var hs2 = He2;
var ps2 = os2;
var us2 = 200;
function ls3(r3, e) {
  var t = this.__data__;
  if (t instanceof cs3) {
    var i3 = t.__data__;
    if (!hs2 || i3.length < us2 - 1)
      return i3.push([r3, e]), this.size = ++t.size, this;
    t = this.__data__ = new ps2(i3);
  }
  return t.set(r3, e), this.size = t.size, this;
}
var ds2 = ls3;
var vs3 = B2;
var fs3 = Qt2;
var ms2 = tr3;
var gs2 = ir3;
var Ps3 = nr3;
var bs3 = ds2;
function A3(r3) {
  var e = this.__data__ = new vs3(r3);
  this.size = e.size;
}
A3.prototype.clear = fs3, A3.prototype.delete = ms2, A3.prototype.get = gs2, A3.prototype.has = Ps3, A3.prototype.set = bs3;
var $s2 = A3;
var ys2 = ie3;
var ws2 = function() {
  try {
    var r3 = ys2(Object, "defineProperty");
    return r3({}, "", {}), r3;
  } catch {
  }
}();
var Ne3 = ws2;
var Te2 = Ne3;
function _s2(r3, e, t) {
  e == "__proto__" && Te2 ? Te2(r3, e, { configurable: true, enumerable: true, value: t, writable: true }) : r3[e] = t;
}
var se3 = _s2;
var Cs3 = se3;
var Is3 = z4;
function Os3(r3, e, t) {
  (t !== void 0 && !Is3(r3[e], t) || t === void 0 && !(e in r3)) && Cs3(r3, e, t);
}
var De3 = Os3;
function As3(r3) {
  return function(e, t, i3) {
    for (var s2 = -1, n3 = Object(e), a3 = i3(e), o4 = a3.length; o4--; ) {
      var c5 = a3[r3 ? o4 : ++s2];
      if (t(n3[c5], c5, n3) === false)
        break;
    }
    return e;
  };
}
var js3 = As3;
var Hs3 = js3;
var Es2 = Hs3();
var Ss2 = Es2;
var ne2 = { exports: {} };
(function(r3, e) {
  var t = C3, i3 = e && !e.nodeType && e, s2 = i3 && true && r3 && !r3.nodeType && r3, n3 = s2 && s2.exports === i3, a3 = n3 ? t.Buffer : void 0, o4 = a3 ? a3.allocUnsafe : void 0;
  function c5(u3, l5) {
    if (l5)
      return u3.slice();
    var P4 = u3.length, d4 = o4 ? o4(P4) : new u3.constructor(P4);
    return u3.copy(d4), d4;
  }
  r3.exports = c5;
})(ne2, ne2.exports);
var Ns3 = C3;
var Ts3 = Ns3.Uint8Array;
var Ds3 = Ts3;
var qe3 = Ds3;
function qs4(r3) {
  var e = new r3.constructor(r3.byteLength);
  return new qe3(e).set(new qe3(r3)), e;
}
var Rs3 = qs4;
var xs3 = Rs3;
function Ls4(r3, e) {
  var t = e ? xs3(r3.buffer) : r3.buffer;
  return new r3.constructor(t, r3.byteOffset, r3.length);
}
var Us2 = Ls4;
function Fs2(r3, e) {
  var t = -1, i3 = r3.length;
  for (e || (e = Array(i3)); ++t < i3; )
    e[t] = r3[t];
  return e;
}
var Ms2 = Fs2;
var Gs3 = $3;
var Re2 = Object.create;
var zs2 = /* @__PURE__ */ function() {
  function r3() {
  }
  return function(e) {
    if (!Gs3(e))
      return {};
    if (Re2)
      return Re2(e);
    r3.prototype = e;
    var t = new r3();
    return r3.prototype = void 0, t;
  };
}();
var ks3 = zs2;
function Bs2(r3, e) {
  return function(t) {
    return r3(e(t));
  };
}
var Vs3 = Bs2;
var Js3 = Vs3;
var Ks2 = Js3(Object.getPrototypeOf, Object);
var xe3 = Ks2;
var Ws3 = Object.prototype;
function Xs3(r3) {
  var e = r3 && r3.constructor, t = typeof e == "function" && e.prototype || Ws3;
  return r3 === t;
}
var Le4 = Xs3;
var Ys3 = ks3;
var Zs3 = xe3;
var Qs3 = Le4;
function en3(r3) {
  return typeof r3.constructor == "function" && !Qs3(r3) ? Ys3(Zs3(r3)) : {};
}
var tn3 = en3;
function rn3(r3) {
  return r3 != null && typeof r3 == "object";
}
var M4 = rn3;
var sn4 = V3;
var nn3 = M4;
var an3 = "[object Arguments]";
function on3(r3) {
  return nn3(r3) && sn4(r3) == an3;
}
var cn3 = on3;
var Ue4 = cn3;
var hn3 = M4;
var Fe3 = Object.prototype;
var pn3 = Fe3.hasOwnProperty;
var un3 = Fe3.propertyIsEnumerable;
var ln3 = Ue4(/* @__PURE__ */ function() {
  return arguments;
}()) ? Ue4 : function(r3) {
  return hn3(r3) && pn3.call(r3, "callee") && !un3.call(r3, "callee");
};
var Me4 = ln3;
var dn3 = Array.isArray;
var Ge4 = dn3;
var vn3 = 9007199254740991;
function fn3(r3) {
  return typeof r3 == "number" && r3 > -1 && r3 % 1 == 0 && r3 <= vn3;
}
var ze3 = fn3;
var mn3 = te3;
var gn3 = ze3;
function Pn2(r3) {
  return r3 != null && gn3(r3.length) && !mn3(r3);
}
var ae2 = Pn2;
var bn3 = ae2;
var $n2 = M4;
function yn3(r3) {
  return $n2(r3) && bn3(r3);
}
var wn3 = yn3;
var W = { exports: {} };
function _n3() {
  return false;
}
var Cn3 = _n3;
(function(r3, e) {
  var t = C3, i3 = Cn3, s2 = e && !e.nodeType && e, n3 = s2 && true && r3 && !r3.nodeType && r3, a3 = n3 && n3.exports === s2, o4 = a3 ? t.Buffer : void 0, c5 = o4 ? o4.isBuffer : void 0, u3 = c5 || i3;
  r3.exports = u3;
})(W, W.exports);
var In3 = V3;
var On3 = xe3;
var An2 = M4;
var jn3 = "[object Object]";
var Hn3 = Function.prototype;
var En3 = Object.prototype;
var ke4 = Hn3.toString;
var Sn2 = En3.hasOwnProperty;
var Nn2 = ke4.call(Object);
function Tn3(r3) {
  if (!An2(r3) || In3(r3) != jn3)
    return false;
  var e = On3(r3);
  if (e === null)
    return true;
  var t = Sn2.call(e, "constructor") && e.constructor;
  return typeof t == "function" && t instanceof t && ke4.call(t) == Nn2;
}
var Dn3 = Tn3;
var qn3 = V3;
var Rn3 = ze3;
var xn3 = M4;
var Ln3 = "[object Arguments]";
var Un3 = "[object Array]";
var Fn3 = "[object Boolean]";
var Mn3 = "[object Date]";
var Gn3 = "[object Error]";
var zn3 = "[object Function]";
var kn3 = "[object Map]";
var Bn3 = "[object Number]";
var Vn3 = "[object Object]";
var Jn3 = "[object RegExp]";
var Kn3 = "[object Set]";
var Wn3 = "[object String]";
var Xn3 = "[object WeakMap]";
var Yn3 = "[object ArrayBuffer]";
var Zn3 = "[object DataView]";
var Qn3 = "[object Float32Array]";
var ea = "[object Float64Array]";
var ta = "[object Int8Array]";
var ra = "[object Int16Array]";
var ia = "[object Int32Array]";
var sa = "[object Uint8Array]";
var na = "[object Uint8ClampedArray]";
var aa = "[object Uint16Array]";
var oa = "[object Uint32Array]";
var p3 = {};
p3[Qn3] = p3[ea] = p3[ta] = p3[ra] = p3[ia] = p3[sa] = p3[na] = p3[aa] = p3[oa] = true, p3[Ln3] = p3[Un3] = p3[Yn3] = p3[Fn3] = p3[Zn3] = p3[Mn3] = p3[Gn3] = p3[zn3] = p3[kn3] = p3[Bn3] = p3[Vn3] = p3[Jn3] = p3[Kn3] = p3[Wn3] = p3[Xn3] = false;
function ca(r3) {
  return xn3(r3) && Rn3(r3.length) && !!p3[qn3(r3)];
}
var ha = ca;
function pa(r3) {
  return function(e) {
    return r3(e);
  };
}
var ua = pa;
var oe2 = { exports: {} };
(function(r3, e) {
  var t = we3, i3 = e && !e.nodeType && e, s2 = i3 && true && r3 && !r3.nodeType && r3, n3 = s2 && s2.exports === i3, a3 = n3 && t.process, o4 = function() {
    try {
      var c5 = s2 && s2.require && s2.require("util").types;
      return c5 || a3 && a3.binding && a3.binding("util");
    } catch {
    }
  }();
  r3.exports = o4;
})(oe2, oe2.exports);
var la = ha;
var da = ua;
var Be3 = oe2.exports;
var Ve3 = Be3 && Be3.isTypedArray;
var va = Ve3 ? da(Ve3) : la;
var Je2 = va;
function fa(r3, e) {
  if (!(e === "constructor" && typeof r3[e] == "function") && e != "__proto__")
    return r3[e];
}
var Ke4 = fa;
var ma = se3;
var ga = z4;
var Pa = Object.prototype;
var ba = Pa.hasOwnProperty;
function $a(r3, e, t) {
  var i3 = r3[e];
  (!(ba.call(r3, e) && ga(i3, t)) || t === void 0 && !(e in r3)) && ma(r3, e, t);
}
var ya = $a;
var wa = ya;
var _a = se3;
function Ca(r3, e, t, i3) {
  var s2 = !t;
  t || (t = {});
  for (var n3 = -1, a3 = e.length; ++n3 < a3; ) {
    var o4 = e[n3], c5 = i3 ? i3(t[o4], r3[o4], o4, t, r3) : void 0;
    c5 === void 0 && (c5 = r3[o4]), s2 ? _a(t, o4, c5) : wa(t, o4, c5);
  }
  return t;
}
var Ia = Ca;
function Oa(r3, e) {
  for (var t = -1, i3 = Array(r3); ++t < r3; )
    i3[t] = e(t);
  return i3;
}
var Aa = Oa;
var ja = 9007199254740991;
var Ha = /^(?:0|[1-9]\d*)$/;
function Ea(r3, e) {
  var t = typeof r3;
  return e = e ?? ja, !!e && (t == "number" || t != "symbol" && Ha.test(r3)) && r3 > -1 && r3 % 1 == 0 && r3 < e;
}
var We3 = Ea;
var Sa = Aa;
var Na = Me4;
var Ta = Ge4;
var Da = W.exports;
var qa = We3;
var Ra = Je2;
var xa = Object.prototype;
var La = xa.hasOwnProperty;
function Ua(r3, e) {
  var t = Ta(r3), i3 = !t && Na(r3), s2 = !t && !i3 && Da(r3), n3 = !t && !i3 && !s2 && Ra(r3), a3 = t || i3 || s2 || n3, o4 = a3 ? Sa(r3.length, String) : [], c5 = o4.length;
  for (var u3 in r3)
    (e || La.call(r3, u3)) && !(a3 && (u3 == "length" || s2 && (u3 == "offset" || u3 == "parent") || n3 && (u3 == "buffer" || u3 == "byteLength" || u3 == "byteOffset") || qa(u3, c5))) && o4.push(u3);
  return o4;
}
var Fa = Ua;
function Ma(r3) {
  var e = [];
  if (r3 != null)
    for (var t in Object(r3))
      e.push(t);
  return e;
}
var Ga = Ma;
var za = $3;
var ka = Le4;
var Ba = Ga;
var Va = Object.prototype;
var Ja = Va.hasOwnProperty;
function Ka(r3) {
  if (!za(r3))
    return Ba(r3);
  var e = ka(r3), t = [];
  for (var i3 in r3)
    i3 == "constructor" && (e || !Ja.call(r3, i3)) || t.push(i3);
  return t;
}
var Wa = Ka;
var Xa = Fa;
var Ya = Wa;
var Za = ae2;
function Qa(r3) {
  return Za(r3) ? Xa(r3, true) : Ya(r3);
}
var Xe = Qa;
var eo2 = Ia;
var to2 = Xe;
function ro3(r3) {
  return eo2(r3, to2(r3));
}
var io2 = ro3;
var Ye3 = De3;
var so2 = ne2.exports;
var no3 = Us2;
var ao3 = Ms2;
var oo2 = tn3;
var Ze2 = Me4;
var Qe2 = Ge4;
var co3 = wn3;
var ho2 = W.exports;
var po2 = te3;
var uo2 = $3;
var lo2 = Dn3;
var vo2 = Je2;
var et2 = Ke4;
var fo2 = io2;
function mo2(r3, e, t, i3, s2, n3, a3) {
  var o4 = et2(r3, t), c5 = et2(e, t), u3 = a3.get(c5);
  if (u3) {
    Ye3(r3, t, u3);
    return;
  }
  var l5 = n3 ? n3(o4, c5, t + "", r3, e, a3) : void 0, P4 = l5 === void 0;
  if (P4) {
    var d4 = Qe2(c5), Q4 = !d4 && ho2(c5), ve3 = !d4 && !Q4 && vo2(c5);
    l5 = c5, d4 || Q4 || ve3 ? Qe2(o4) ? l5 = o4 : co3(o4) ? l5 = ao3(o4) : Q4 ? (P4 = false, l5 = so2(c5, true)) : ve3 ? (P4 = false, l5 = no3(c5, true)) : l5 = [] : lo2(c5) || Ze2(c5) ? (l5 = o4, Ze2(o4) ? l5 = fo2(o4) : (!uo2(o4) || po2(o4)) && (l5 = oo2(c5))) : P4 = false;
  }
  P4 && (a3.set(c5, l5), s2(l5, c5, i3, n3, a3), a3.delete(c5)), Ye3(r3, t, l5);
}
var go2 = mo2;
var Po3 = $s2;
var bo2 = De3;
var $o2 = Ss2;
var yo2 = go2;
var wo2 = $3;
var _o2 = Xe;
var Co2 = Ke4;
function tt2(r3, e, t, i3, s2) {
  r3 !== e && $o2(e, function(n3, a3) {
    if (s2 || (s2 = new Po3()), wo2(n3))
      yo2(r3, e, a3, t, tt2, i3, s2);
    else {
      var o4 = i3 ? i3(Co2(r3, a3), n3, a3 + "", r3, e, s2) : void 0;
      o4 === void 0 && (o4 = n3), bo2(r3, a3, o4);
    }
  }, _o2);
}
var Io2 = tt2;
function Oo2(r3) {
  return r3;
}
var rt2 = Oo2;
function Ao2(r3, e, t) {
  switch (t.length) {
    case 0:
      return r3.call(e);
    case 1:
      return r3.call(e, t[0]);
    case 2:
      return r3.call(e, t[0], t[1]);
    case 3:
      return r3.call(e, t[0], t[1], t[2]);
  }
  return r3.apply(e, t);
}
var jo2 = Ao2;
var Ho2 = jo2;
var it2 = Math.max;
function Eo2(r3, e, t) {
  return e = it2(e === void 0 ? r3.length - 1 : e, 0), function() {
    for (var i3 = arguments, s2 = -1, n3 = it2(i3.length - e, 0), a3 = Array(n3); ++s2 < n3; )
      a3[s2] = i3[e + s2];
    s2 = -1;
    for (var o4 = Array(e + 1); ++s2 < e; )
      o4[s2] = i3[s2];
    return o4[e] = t(a3), Ho2(r3, this, o4);
  };
}
var So2 = Eo2;
function No2(r3) {
  return function() {
    return r3;
  };
}
var To2 = No2;
var Do2 = To2;
var st2 = Ne3;
var qo2 = rt2;
var Ro2 = st2 ? function(r3, e) {
  return st2(r3, "toString", { configurable: true, enumerable: false, value: Do2(e), writable: true });
} : qo2;
var xo2 = Ro2;
var Lo2 = 800;
var Uo2 = 16;
var Fo2 = Date.now;
function Mo2(r3) {
  var e = 0, t = 0;
  return function() {
    var i3 = Fo2(), s2 = Uo2 - (i3 - t);
    if (t = i3, s2 > 0) {
      if (++e >= Lo2)
        return arguments[0];
    } else
      e = 0;
    return r3.apply(void 0, arguments);
  };
}
var Go2 = Mo2;
var zo2 = xo2;
var ko2 = Go2;
var Bo2 = ko2(zo2);
var Vo2 = Bo2;
var Jo2 = rt2;
var Ko2 = So2;
var Wo2 = Vo2;
function Xo(r3, e) {
  return Wo2(Ko2(r3, e, Jo2), r3 + "");
}
var Yo2 = Xo;
var Zo = z4;
var Qo2 = ae2;
var ec = We3;
var tc = $3;
function rc(r3, e, t) {
  if (!tc(t))
    return false;
  var i3 = typeof e;
  return (i3 == "number" ? Qo2(t) && ec(e, t.length) : i3 == "string" && e in t) ? Zo(t[e], r3) : false;
}
var ic = rc;
var sc = Yo2;
var nc = ic;
function ac(r3) {
  return sc(function(e, t) {
    var i3 = -1, s2 = t.length, n3 = s2 > 1 ? t[s2 - 1] : void 0, a3 = s2 > 2 ? t[2] : void 0;
    for (n3 = r3.length > 3 && typeof n3 == "function" ? (s2--, n3) : void 0, a3 && nc(t[0], t[1], a3) && (n3 = s2 < 3 ? void 0 : n3, s2 = 1), e = Object(e); ++i3 < s2; ) {
      var o4 = t[i3];
      o4 && r3(e, o4, i3, n3);
    }
    return e;
  });
}
var oc = ac;
var cc = Io2;
var hc = oc;
var pc = hc(function(r3, e, t) {
  cc(r3, e, t);
});
var uc = pc;
var lc = Object.defineProperty;
var dc = Object.defineProperties;
var vc = Object.getOwnPropertyDescriptors;
var nt = Object.getOwnPropertySymbols;
var fc = Object.prototype.hasOwnProperty;
var mc = Object.prototype.propertyIsEnumerable;
var at2 = (r3, e, t) => e in r3 ? lc(r3, e, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e] = t;
var X = (r3, e) => {
  for (var t in e || (e = {}))
    fc.call(e, t) && at2(r3, t, e[t]);
  if (nt)
    for (var t of nt(e))
      mc.call(e, t) && at2(r3, t, e[t]);
  return r3;
};
var gc = (r3, e) => dc(r3, vc(e));
function v4(r3, e, t) {
  var i3;
  const s2 = Ye(r3);
  return ((i3 = e.rpcMap) == null ? void 0 : i3[s2.reference]) || `${ye2}?chainId=${s2.namespace}:${s2.reference}&projectId=${t}`;
}
function y4(r3) {
  return r3.includes(":") ? r3.split(":")[1] : r3;
}
function ot2(r3) {
  return r3.map((e) => `${e.split(":")[0]}:${e.split(":")[1]}`);
}
function Pc(r3, e) {
  const t = Object.keys(e.namespaces).filter((s2) => s2.includes(r3));
  if (!t.length)
    return [];
  const i3 = [];
  return t.forEach((s2) => {
    const n3 = e.namespaces[s2].accounts;
    i3.push(...n3);
  }), i3;
}
function ce3(r3 = {}, e = {}) {
  const t = ct2(r3), i3 = ct2(e);
  return uc(t, i3);
}
function ct2(r3) {
  var e, t, i3, s2;
  const n3 = {};
  if (!qe(r3))
    return n3;
  for (const [a3, o4] of Object.entries(r3)) {
    const c5 = Tt(a3) ? [a3] : o4.chains, u3 = o4.methods || [], l5 = o4.events || [], P4 = o4.rpcMap || {}, d4 = pr(a3);
    n3[d4] = gc(X(X({}, n3[d4]), o4), { chains: Q(c5, (e = n3[d4]) == null ? void 0 : e.chains), methods: Q(u3, (t = n3[d4]) == null ? void 0 : t.methods), events: Q(l5, (i3 = n3[d4]) == null ? void 0 : i3.events), rpcMap: X(X({}, P4), (s2 = n3[d4]) == null ? void 0 : s2.rpcMap) });
  }
  return n3;
}
function bc(r3) {
  return r3.includes(":") ? r3.split(":")[2] : r3;
}
function ht3(r3) {
  const e = {};
  for (const [t, i3] of Object.entries(r3)) {
    const s2 = i3.methods || [], n3 = i3.events || [], a3 = i3.accounts || [], o4 = Tt(t) ? [t] : i3.chains ? i3.chains : ot2(i3.accounts);
    e[t] = { chains: o4, methods: s2, events: n3, accounts: a3 };
  }
  return e;
}
function he2(r3) {
  return typeof r3 == "number" ? r3 : r3.includes("0x") ? parseInt(r3, 16) : (r3 = r3.includes(":") ? r3.split(":")[1] : r3, isNaN(Number(r3)) ? r3 : Number(r3));
}
var pt3 = {};
var h4 = (r3) => pt3[r3];
var pe2 = (r3, e) => {
  pt3[r3] = e;
};
var $c = Object.defineProperty;
var yc = (r3, e, t) => e in r3 ? $c(r3, e, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e] = t;
var j3 = (r3, e, t) => yc(r3, typeof e != "symbol" ? e + "" : e, t);
var wc = class {
  constructor(e) {
    j3(this, "name", "polkadot"), j3(this, "client"), j3(this, "httpProviders"), j3(this, "events"), j3(this, "namespace"), j3(this, "chainId"), this.namespace = e.namespace, this.events = h4("events"), this.client = h4("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e)
      throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(f7.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var i3;
      const s2 = y4(t);
      e[s2] = this.createHttpProvider(s2, (i3 = this.namespace.rpcMap) == null ? void 0 : i3[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u")
      throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const i3 = this.createHttpProvider(e, t);
    i3 && (this.httpProviders[e] = i3);
  }
  createHttpProvider(e, t) {
    const i3 = t || v4(e, this.namespace, this.client.core.projectId);
    if (!i3)
      throw new Error(`No RPC url provided for chainId: ${e}`);
    return new o2(new f(i3, h4("disableProviderPing")));
  }
};
var _c = Object.defineProperty;
var Cc = Object.defineProperties;
var Ic = Object.getOwnPropertyDescriptors;
var ut3 = Object.getOwnPropertySymbols;
var Oc = Object.prototype.hasOwnProperty;
var Ac = Object.prototype.propertyIsEnumerable;
var ue3 = (r3, e, t) => e in r3 ? _c(r3, e, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e] = t;
var lt2 = (r3, e) => {
  for (var t in e || (e = {}))
    Oc.call(e, t) && ue3(r3, t, e[t]);
  if (ut3)
    for (var t of ut3(e))
      Ac.call(e, t) && ue3(r3, t, e[t]);
  return r3;
};
var dt3 = (r3, e) => Cc(r3, Ic(e));
var H3 = (r3, e, t) => ue3(r3, typeof e != "symbol" ? e + "" : e, t);
var jc = class {
  constructor(e) {
    H3(this, "name", "eip155"), H3(this, "client"), H3(this, "chainId"), H3(this, "namespace"), H3(this, "httpProviders"), H3(this, "events"), this.namespace = e.namespace, this.events = h4("events"), this.client = h4("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain());
  }
  async request(e) {
    switch (e.request.method) {
      case "eth_requestAccounts":
        return this.getAccounts();
      case "eth_accounts":
        return this.getAccounts();
      case "wallet_switchEthereumChain":
        return await this.handleSwitchChain(e);
      case "eth_chainId":
        return parseInt(this.getDefaultChain());
      case "wallet_getCapabilities":
        return await this.getCapabilities(e);
      case "wallet_getCallsStatus":
        return await this.getCallStatus(e);
    }
    return this.namespace.methods.includes(e.request.method) ? await this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  setDefaultChain(e, t) {
    this.httpProviders[e] || this.setHttpProvider(parseInt(e), t), this.chainId = parseInt(e), this.events.emit(f7.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId.toString();
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e)
      throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  createHttpProvider(e, t) {
    const i3 = t || v4(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
    if (!i3)
      throw new Error(`No RPC url provided for chainId: ${e}`);
    return new o2(new f(i3, h4("disableProviderPing")));
  }
  setHttpProvider(e, t) {
    const i3 = this.createHttpProvider(e, t);
    i3 && (this.httpProviders[e] = i3);
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var i3;
      const s2 = parseInt(y4(t));
      e[s2] = this.createHttpProvider(s2, (i3 = this.namespace.rpcMap) == null ? void 0 : i3[t]);
    }), e;
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  getHttpProvider() {
    const e = this.chainId, t = this.httpProviders[e];
    if (typeof t > "u")
      throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  async handleSwitchChain(e) {
    var t, i3;
    let s2 = e.request.params ? (t = e.request.params[0]) == null ? void 0 : t.chainId : "0x0";
    s2 = s2.startsWith("0x") ? s2 : `0x${s2}`;
    const n3 = parseInt(s2, 16);
    if (this.isChainApproved(n3))
      this.setDefaultChain(`${n3}`);
    else if (this.namespace.methods.includes("wallet_switchEthereumChain"))
      await this.client.request({ topic: e.topic, request: { method: e.request.method, params: [{ chainId: s2 }] }, chainId: (i3 = this.namespace.chains) == null ? void 0 : i3[0] }), this.setDefaultChain(`${n3}`);
    else
      throw new Error(`Failed to switch to chain 'eip155:${n3}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
    return null;
  }
  isChainApproved(e) {
    return this.namespace.chains.includes(`${this.name}:${e}`);
  }
  async getCapabilities(e) {
    var t, i3, s2;
    const n3 = (i3 = (t = e.request) == null ? void 0 : t.params) == null ? void 0 : i3[0];
    if (!n3)
      throw new Error("Missing address parameter in `wallet_getCapabilities` request");
    const a3 = this.client.session.get(e.topic), o4 = ((s2 = a3 == null ? void 0 : a3.sessionProperties) == null ? void 0 : s2.capabilities) || {};
    if (o4 != null && o4[n3])
      return o4 == null ? void 0 : o4[n3];
    const c5 = await this.client.request(e);
    try {
      await this.client.session.update(e.topic, { sessionProperties: dt3(lt2({}, a3.sessionProperties || {}), { capabilities: dt3(lt2({}, o4 || {}), { [n3]: c5 }) }) });
    } catch (u3) {
      console.warn("Failed to update session with capabilities", u3);
    }
    return c5;
  }
  async getCallStatus(e) {
    var t, i3;
    const s2 = this.client.session.get(e.topic), n3 = (t = s2.sessionProperties) == null ? void 0 : t.bundler_name;
    if (n3) {
      const o4 = this.getBundlerUrl(e.chainId, n3);
      try {
        return await this.getUserOperationReceipt(o4, e);
      } catch (c5) {
        console.warn("Failed to fetch call status from bundler", c5, o4);
      }
    }
    const a3 = (i3 = s2.sessionProperties) == null ? void 0 : i3.bundler_url;
    if (a3)
      try {
        return await this.getUserOperationReceipt(a3, e);
      } catch (o4) {
        console.warn("Failed to fetch call status from custom bundler", o4, a3);
      }
    if (this.namespace.methods.includes(e.request.method))
      return await this.client.request(e);
    throw new Error("Fetching call status not approved by the wallet.");
  }
  async getUserOperationReceipt(e, t) {
    var i3;
    const s2 = new URL(e), n3 = await fetch(s2, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formatJsonRpcRequest("eth_getUserOperationReceipt", [(i3 = t.request.params) == null ? void 0 : i3[0]])) });
    if (!n3.ok)
      throw new Error(`Failed to fetch user operation receipt - ${n3.status}`);
    return await n3.json();
  }
  getBundlerUrl(e, t) {
    return `${Ot3}?projectId=${this.client.core.projectId}&chainId=${e}&bundler=${t}`;
  }
};
var Hc = Object.defineProperty;
var Ec = (r3, e, t) => e in r3 ? Hc(r3, e, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e] = t;
var E4 = (r3, e, t) => Ec(r3, typeof e != "symbol" ? e + "" : e, t);
var Sc = class {
  constructor(e) {
    E4(this, "name", "solana"), E4(this, "client"), E4(this, "httpProviders"), E4(this, "events"), E4(this, "namespace"), E4(this, "chainId"), this.namespace = e.namespace, this.events = h4("events"), this.client = h4("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(f7.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e)
      throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var i3;
      const s2 = y4(t);
      e[s2] = this.createHttpProvider(s2, (i3 = this.namespace.rpcMap) == null ? void 0 : i3[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u")
      throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const i3 = this.createHttpProvider(e, t);
    i3 && (this.httpProviders[e] = i3);
  }
  createHttpProvider(e, t) {
    const i3 = t || v4(e, this.namespace, this.client.core.projectId);
    if (!i3)
      throw new Error(`No RPC url provided for chainId: ${e}`);
    return new o2(new f(i3, h4("disableProviderPing")));
  }
};
var Nc = Object.defineProperty;
var Tc = (r3, e, t) => e in r3 ? Nc(r3, e, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e] = t;
var S3 = (r3, e, t) => Tc(r3, typeof e != "symbol" ? e + "" : e, t);
var Dc = class {
  constructor(e) {
    S3(this, "name", "cosmos"), S3(this, "client"), S3(this, "httpProviders"), S3(this, "events"), S3(this, "namespace"), S3(this, "chainId"), this.namespace = e.namespace, this.events = h4("events"), this.client = h4("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e)
      throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(f7.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var i3;
      const s2 = y4(t);
      e[s2] = this.createHttpProvider(s2, (i3 = this.namespace.rpcMap) == null ? void 0 : i3[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u")
      throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const i3 = this.createHttpProvider(e, t);
    i3 && (this.httpProviders[e] = i3);
  }
  createHttpProvider(e, t) {
    const i3 = t || v4(e, this.namespace, this.client.core.projectId);
    if (!i3)
      throw new Error(`No RPC url provided for chainId: ${e}`);
    return new o2(new f(i3, h4("disableProviderPing")));
  }
};
var qc = Object.defineProperty;
var Rc = (r3, e, t) => e in r3 ? qc(r3, e, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e] = t;
var N3 = (r3, e, t) => Rc(r3, typeof e != "symbol" ? e + "" : e, t);
var xc = class {
  constructor(e) {
    N3(this, "name", "algorand"), N3(this, "client"), N3(this, "httpProviders"), N3(this, "events"), N3(this, "namespace"), N3(this, "chainId"), this.namespace = e.namespace, this.events = h4("events"), this.client = h4("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    if (!this.httpProviders[e]) {
      const i3 = t || v4(`${this.name}:${e}`, this.namespace, this.client.core.projectId);
      if (!i3)
        throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, i3);
    }
    this.chainId = e, this.events.emit(f7.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e)
      throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var i3;
      e[t] = this.createHttpProvider(t, (i3 = this.namespace.rpcMap) == null ? void 0 : i3[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u")
      throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const i3 = this.createHttpProvider(e, t);
    i3 && (this.httpProviders[e] = i3);
  }
  createHttpProvider(e, t) {
    const i3 = t || v4(e, this.namespace, this.client.core.projectId);
    return typeof i3 > "u" ? void 0 : new o2(new f(i3, h4("disableProviderPing")));
  }
};
var Lc = Object.defineProperty;
var Uc = (r3, e, t) => e in r3 ? Lc(r3, e, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e] = t;
var T3 = (r3, e, t) => Uc(r3, typeof e != "symbol" ? e + "" : e, t);
var Fc = class {
  constructor(e) {
    T3(this, "name", "cip34"), T3(this, "client"), T3(this, "httpProviders"), T3(this, "events"), T3(this, "namespace"), T3(this, "chainId"), this.namespace = e.namespace, this.events = h4("events"), this.client = h4("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e)
      throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(f7.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      const i3 = this.getCardanoRPCUrl(t), s2 = y4(t);
      e[s2] = this.createHttpProvider(s2, i3);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u")
      throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  getCardanoRPCUrl(e) {
    const t = this.namespace.rpcMap;
    if (t)
      return t[e];
  }
  setHttpProvider(e, t) {
    const i3 = this.createHttpProvider(e, t);
    i3 && (this.httpProviders[e] = i3);
  }
  createHttpProvider(e, t) {
    const i3 = t || this.getCardanoRPCUrl(e);
    if (!i3)
      throw new Error(`No RPC url provided for chainId: ${e}`);
    return new o2(new f(i3, h4("disableProviderPing")));
  }
};
var Mc = Object.defineProperty;
var Gc = (r3, e, t) => e in r3 ? Mc(r3, e, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e] = t;
var D3 = (r3, e, t) => Gc(r3, typeof e != "symbol" ? e + "" : e, t);
var zc = class {
  constructor(e) {
    D3(this, "name", "elrond"), D3(this, "client"), D3(this, "httpProviders"), D3(this, "events"), D3(this, "namespace"), D3(this, "chainId"), this.namespace = e.namespace, this.events = h4("events"), this.client = h4("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(f7.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e)
      throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var i3;
      const s2 = y4(t);
      e[s2] = this.createHttpProvider(s2, (i3 = this.namespace.rpcMap) == null ? void 0 : i3[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u")
      throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const i3 = this.createHttpProvider(e, t);
    i3 && (this.httpProviders[e] = i3);
  }
  createHttpProvider(e, t) {
    const i3 = t || v4(e, this.namespace, this.client.core.projectId);
    if (!i3)
      throw new Error(`No RPC url provided for chainId: ${e}`);
    return new o2(new f(i3, h4("disableProviderPing")));
  }
};
var kc = Object.defineProperty;
var Bc = (r3, e, t) => e in r3 ? kc(r3, e, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e] = t;
var q3 = (r3, e, t) => Bc(r3, typeof e != "symbol" ? e + "" : e, t);
var Vc = class {
  constructor(e) {
    q3(this, "name", "multiversx"), q3(this, "client"), q3(this, "httpProviders"), q3(this, "events"), q3(this, "namespace"), q3(this, "chainId"), this.namespace = e.namespace, this.events = h4("events"), this.client = h4("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(f7.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e)
      throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var i3;
      const s2 = y4(t);
      e[s2] = this.createHttpProvider(s2, (i3 = this.namespace.rpcMap) == null ? void 0 : i3[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u")
      throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const i3 = this.createHttpProvider(e, t);
    i3 && (this.httpProviders[e] = i3);
  }
  createHttpProvider(e, t) {
    const i3 = t || v4(e, this.namespace, this.client.core.projectId);
    if (!i3)
      throw new Error(`No RPC url provided for chainId: ${e}`);
    return new o2(new f(i3, h4("disableProviderPing")));
  }
};
var Jc = Object.defineProperty;
var Kc = (r3, e, t) => e in r3 ? Jc(r3, e, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e] = t;
var R3 = (r3, e, t) => Kc(r3, typeof e != "symbol" ? e + "" : e, t);
var Wc = class {
  constructor(e) {
    R3(this, "name", "near"), R3(this, "client"), R3(this, "httpProviders"), R3(this, "events"), R3(this, "namespace"), R3(this, "chainId"), this.namespace = e.namespace, this.events = h4("events"), this.client = h4("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e)
      throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    if (this.chainId = e, !this.httpProviders[e]) {
      const i3 = t || v4(`${this.name}:${e}`, this.namespace);
      if (!i3)
        throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, i3);
    }
    this.events.emit(f7.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      var i3;
      e[t] = this.createHttpProvider(t, (i3 = this.namespace.rpcMap) == null ? void 0 : i3[t]);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u")
      throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const i3 = this.createHttpProvider(e, t);
    i3 && (this.httpProviders[e] = i3);
  }
  createHttpProvider(e, t) {
    const i3 = t || v4(e, this.namespace);
    return typeof i3 > "u" ? void 0 : new o2(new f(i3, h4("disableProviderPing")));
  }
};
var Xc = Object.defineProperty;
var Yc = (r3, e, t) => e in r3 ? Xc(r3, e, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e] = t;
var x5 = (r3, e, t) => Yc(r3, typeof e != "symbol" ? e + "" : e, t);
var Zc = class {
  constructor(e) {
    x5(this, "name", "tezos"), x5(this, "client"), x5(this, "httpProviders"), x5(this, "events"), x5(this, "namespace"), x5(this, "chainId"), this.namespace = e.namespace, this.events = h4("events"), this.client = h4("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace = Object.assign(this.namespace, e);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e)
      throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider().request(e.request);
  }
  setDefaultChain(e, t) {
    if (this.chainId = e, !this.httpProviders[e]) {
      const i3 = t || v4(`${this.name}:${e}`, this.namespace);
      if (!i3)
        throw new Error(`No RPC url provided for chainId: ${e}`);
      this.setHttpProvider(e, i3);
    }
    this.events.emit(f7.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const e = {};
    return this.namespace.chains.forEach((t) => {
      e[t] = this.createHttpProvider(t);
    }), e;
  }
  getHttpProvider() {
    const e = `${this.name}:${this.chainId}`, t = this.httpProviders[e];
    if (typeof t > "u")
      throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const i3 = this.createHttpProvider(e, t);
    i3 && (this.httpProviders[e] = i3);
  }
  createHttpProvider(e, t) {
    const i3 = t || v4(e, this.namespace);
    return typeof i3 > "u" ? void 0 : new o2(new f(i3));
  }
};
var Qc = Object.defineProperty;
var eh = (r3, e, t) => e in r3 ? Qc(r3, e, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e] = t;
var L2 = (r3, e, t) => eh(r3, typeof e != "symbol" ? e + "" : e, t);
var th = class {
  constructor(e) {
    L2(this, "name", w2), L2(this, "client"), L2(this, "httpProviders"), L2(this, "events"), L2(this, "namespace"), L2(this, "chainId"), this.namespace = e.namespace, this.events = h4("events"), this.client = h4("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(e) {
    this.namespace.chains = [...new Set((this.namespace.chains || []).concat(e.chains || []))], this.namespace.accounts = [...new Set((this.namespace.accounts || []).concat(e.accounts || []))], this.namespace.methods = [...new Set((this.namespace.methods || []).concat(e.methods || []))], this.namespace.events = [...new Set((this.namespace.events || []).concat(e.events || []))], this.httpProviders = this.createHttpProviders();
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(e) {
    return this.namespace.methods.includes(e.request.method) ? this.client.request(e) : this.getHttpProvider(e.chainId).request(e.request);
  }
  setDefaultChain(e, t) {
    this.httpProviders[e] || this.setHttpProvider(e, t), this.chainId = e, this.events.emit(f7.DEFAULT_CHAIN_CHANGED, `${this.name}:${e}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const e = this.namespace.chains[0];
    if (!e)
      throw new Error("ChainId not found");
    return e.split(":")[1];
  }
  getAccounts() {
    const e = this.namespace.accounts;
    return e ? [...new Set(e.filter((t) => t.split(":")[1] === this.chainId.toString()).map((t) => t.split(":")[2]))] : [];
  }
  createHttpProviders() {
    var e, t;
    const i3 = {};
    return (t = (e = this.namespace) == null ? void 0 : e.accounts) == null || t.forEach((s2) => {
      const n3 = Ye(s2);
      i3[`${n3.namespace}:${n3.reference}`] = this.createHttpProvider(s2);
    }), i3;
  }
  getHttpProvider(e) {
    const t = this.httpProviders[e];
    if (typeof t > "u")
      throw new Error(`JSON-RPC provider for ${e} not found`);
    return t;
  }
  setHttpProvider(e, t) {
    const i3 = this.createHttpProvider(e, t);
    i3 && (this.httpProviders[e] = i3);
  }
  createHttpProvider(e, t) {
    const i3 = t || v4(e, this.namespace, this.client.core.projectId);
    if (!i3)
      throw new Error(`No RPC url provided for chainId: ${e}`);
    return new o2(new f(i3, h4("disableProviderPing")));
  }
};
var rh = Object.defineProperty;
var ih = Object.defineProperties;
var sh = Object.getOwnPropertyDescriptors;
var vt3 = Object.getOwnPropertySymbols;
var nh = Object.prototype.hasOwnProperty;
var ah = Object.prototype.propertyIsEnumerable;
var le4 = (r3, e, t) => e in r3 ? rh(r3, e, { enumerable: true, configurable: true, writable: true, value: t }) : r3[e] = t;
var Y3 = (r3, e) => {
  for (var t in e || (e = {}))
    nh.call(e, t) && le4(r3, t, e[t]);
  if (vt3)
    for (var t of vt3(e))
      ah.call(e, t) && le4(r3, t, e[t]);
  return r3;
};
var de3 = (r3, e) => ih(r3, sh(e));
var g2 = (r3, e, t) => le4(r3, typeof e != "symbol" ? e + "" : e, t);
var Z2 = class _Z {
  constructor(e) {
    g2(this, "client"), g2(this, "namespaces"), g2(this, "optionalNamespaces"), g2(this, "sessionProperties"), g2(this, "events", new import_events9.default()), g2(this, "rpcProviders", {}), g2(this, "session"), g2(this, "providerOpts"), g2(this, "logger"), g2(this, "uri"), g2(this, "disableProviderPing", false), this.providerOpts = e, this.logger = typeof (e == null ? void 0 : e.logger) < "u" && typeof (e == null ? void 0 : e.logger) != "string" ? e.logger : (0, import_pino.default)(k({ level: (e == null ? void 0 : e.logger) || be2 })), this.disableProviderPing = (e == null ? void 0 : e.disableProviderPing) || false;
  }
  static async init(e) {
    const t = new _Z(e);
    return await t.initialize(), t;
  }
  async request(e, t, i3) {
    const [s2, n3] = this.validateChain(t);
    if (!this.session)
      throw new Error("Please call connect() before request()");
    return await this.getProvider(s2).request({ request: Y3({}, e), chainId: `${s2}:${n3}`, topic: this.session.topic, expiry: i3 });
  }
  sendAsync(e, t, i3, s2) {
    const n3 = (/* @__PURE__ */ new Date()).getTime();
    this.request(e, i3, s2).then((a3) => t(null, formatJsonRpcResult(n3, a3))).catch((a3) => t(a3, void 0));
  }
  async enable() {
    if (!this.client)
      throw new Error("Sign Client not initialized");
    return this.session || await this.connect({ namespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties }), await this.requestAccounts();
  }
  async disconnect() {
    var e;
    if (!this.session)
      throw new Error("Please call connect() before enable()");
    await this.client.disconnect({ topic: (e = this.session) == null ? void 0 : e.topic, reason: de("USER_DISCONNECTED") }), await this.cleanup();
  }
  async connect(e) {
    if (!this.client)
      throw new Error("Sign Client not initialized");
    if (this.setNamespaces(e), await this.cleanupPendingPairings(), !e.skipPairing)
      return await this.pair(e.pairingTopic);
  }
  async authenticate(e, t) {
    if (!this.client)
      throw new Error("Sign Client not initialized");
    this.setNamespaces(e), await this.cleanupPendingPairings();
    const { uri: i3, response: s2 } = await this.client.authenticate(e, t);
    i3 && (this.uri = i3, this.events.emit("display_uri", i3));
    const n3 = await s2();
    if (this.session = n3.session, this.session) {
      const a3 = ht3(this.session.namespaces);
      this.namespaces = ce3(this.namespaces, a3), this.persist("namespaces", this.namespaces), this.onConnect();
    }
    return n3;
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  get isWalletConnect() {
    return true;
  }
  async pair(e) {
    const { uri: t, approval: i3 } = await this.client.connect({ pairingTopic: e, requiredNamespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties });
    t && (this.uri = t, this.events.emit("display_uri", t));
    const s2 = await i3();
    this.session = s2;
    const n3 = ht3(s2.namespaces);
    return this.namespaces = ce3(this.namespaces, n3), this.persist("namespaces", this.namespaces), this.onConnect(), this.session;
  }
  setDefaultChain(e, t) {
    try {
      if (!this.session)
        return;
      const [i3, s2] = this.validateChain(e), n3 = this.getProvider(i3);
      n3.name === w2 ? n3.setDefaultChain(`${i3}:${s2}`, t) : n3.setDefaultChain(s2, t);
    } catch (i3) {
      if (!/Please call connect/.test(i3.message))
        throw i3;
    }
  }
  async cleanupPendingPairings(e = {}) {
    this.logger.info("Cleaning up inactive pairings...");
    const t = this.client.pairing.getAll();
    if ($e(t)) {
      for (const i3 of t)
        e.deletePairings ? this.client.core.expirer.set(i3.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(i3.topic);
      this.logger.info(`Inactive pairings cleared: ${t.length}`);
    }
  }
  abortPairingAttempt() {
    this.logger.warn("abortPairingAttempt is deprecated. This is now a no-op.");
  }
  async checkStorage() {
    if (this.namespaces = await this.getFromStore("namespaces"), this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {}, this.client.session.length) {
      const e = this.client.session.keys.length - 1;
      this.session = this.client.session.get(this.client.session.keys[e]), this.createProviders();
    }
  }
  async initialize() {
    this.logger.trace("Initialized"), await this.createClient(), await this.checkStorage(), this.registerEventListeners();
  }
  async createClient() {
    this.client = this.providerOpts.client || await Se2.init({ core: this.providerOpts.core, logger: this.providerOpts.logger || be2, relayUrl: this.providerOpts.relayUrl || _t4, projectId: this.providerOpts.projectId, metadata: this.providerOpts.metadata, storageOptions: this.providerOpts.storageOptions, storage: this.providerOpts.storage, name: this.providerOpts.name, customStoragePrefix: this.providerOpts.customStoragePrefix, telemetryEnabled: this.providerOpts.telemetryEnabled }), this.logger.trace("SignClient Initialized");
  }
  createProviders() {
    if (!this.client)
      throw new Error("Sign Client not initialized");
    if (!this.session)
      throw new Error("Session not initialized. Please call connect() before enable()");
    const e = [...new Set(Object.keys(this.session.namespaces).map((t) => pr(t)))];
    pe2("client", this.client), pe2("events", this.events), pe2("disableProviderPing", this.disableProviderPing), e.forEach((t) => {
      if (!this.session)
        return;
      const i3 = Pc(t, this.session), s2 = ot2(i3), n3 = ce3(this.namespaces, this.optionalNamespaces), a3 = de3(Y3({}, n3[t]), { accounts: i3, chains: s2 });
      switch (t) {
        case "eip155":
          this.rpcProviders[t] = new jc({ namespace: a3 });
          break;
        case "algorand":
          this.rpcProviders[t] = new xc({ namespace: a3 });
          break;
        case "solana":
          this.rpcProviders[t] = new Sc({ namespace: a3 });
          break;
        case "cosmos":
          this.rpcProviders[t] = new Dc({ namespace: a3 });
          break;
        case "polkadot":
          this.rpcProviders[t] = new wc({ namespace: a3 });
          break;
        case "cip34":
          this.rpcProviders[t] = new Fc({ namespace: a3 });
          break;
        case "elrond":
          this.rpcProviders[t] = new zc({ namespace: a3 });
          break;
        case "multiversx":
          this.rpcProviders[t] = new Vc({ namespace: a3 });
          break;
        case "near":
          this.rpcProviders[t] = new Wc({ namespace: a3 });
          break;
        case "tezos":
          this.rpcProviders[t] = new Zc({ namespace: a3 });
          break;
        default:
          this.rpcProviders[w2] ? this.rpcProviders[w2].updateNamespace(a3) : this.rpcProviders[w2] = new th({ namespace: a3 });
      }
    });
  }
  registerEventListeners() {
    if (typeof this.client > "u")
      throw new Error("Sign Client is not initialized");
    this.client.on("session_ping", (e) => {
      this.events.emit("session_ping", e);
    }), this.client.on("session_event", (e) => {
      const { params: t } = e, { event: i3 } = t;
      if (i3.name === "accountsChanged") {
        const s2 = i3.data;
        s2 && $e(s2) && this.events.emit("accountsChanged", s2.map(bc));
      } else if (i3.name === "chainChanged") {
        const s2 = t.chainId, n3 = t.event.data, a3 = pr(s2), o4 = he2(s2) !== he2(n3) ? `${a3}:${he2(n3)}` : s2;
        this.onChainChanged(o4);
      } else
        this.events.emit(i3.name, i3.data);
      this.events.emit("session_event", e);
    }), this.client.on("session_update", ({ topic: e, params: t }) => {
      var i3;
      const { namespaces: s2 } = t, n3 = (i3 = this.client) == null ? void 0 : i3.session.get(e);
      this.session = de3(Y3({}, n3), { namespaces: s2 }), this.onSessionUpdate(), this.events.emit("session_update", { topic: e, params: t });
    }), this.client.on("session_delete", async (e) => {
      await this.cleanup(), this.events.emit("session_delete", e), this.events.emit("disconnect", de3(Y3({}, de("USER_DISCONNECTED")), { data: e.topic }));
    }), this.on(f7.DEFAULT_CHAIN_CHANGED, (e) => {
      this.onChainChanged(e, true);
    });
  }
  getProvider(e) {
    return this.rpcProviders[e] || this.rpcProviders[w2];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((e) => {
      var t;
      this.getProvider(e).updateNamespace((t = this.session) == null ? void 0 : t.namespaces[e]);
    });
  }
  setNamespaces(e) {
    const { namespaces: t, optionalNamespaces: i3, sessionProperties: s2 } = e;
    t && Object.keys(t).length && (this.namespaces = t), i3 && Object.keys(i3).length && (this.optionalNamespaces = i3), this.sessionProperties = s2, this.persist("namespaces", t), this.persist("optionalNamespaces", i3);
  }
  validateChain(e) {
    const [t, i3] = (e == null ? void 0 : e.split(":")) || ["", ""];
    if (!this.namespaces || !Object.keys(this.namespaces).length)
      return [t, i3];
    if (t && !Object.keys(this.namespaces || {}).map((a3) => pr(a3)).includes(t))
      throw new Error(`Namespace '${t}' is not configured. Please call connect() first with namespace config.`);
    if (t && i3)
      return [t, i3];
    const s2 = pr(Object.keys(this.namespaces)[0]), n3 = this.rpcProviders[s2].getDefaultChain();
    return [s2, n3];
  }
  async requestAccounts() {
    const [e] = this.validateChain();
    return await this.getProvider(e).requestAccounts();
  }
  onChainChanged(e, t = false) {
    if (!this.namespaces)
      return;
    const [i3, s2] = this.validateChain(e);
    s2 && (t || this.getProvider(i3).setDefaultChain(s2), this.namespaces[i3] ? this.namespaces[i3].defaultChain = s2 : this.namespaces[`${i3}:${s2}`] ? this.namespaces[`${i3}:${s2}`].defaultChain = s2 : this.namespaces[`${i3}:${s2}`] = { defaultChain: s2 }, this.persist("namespaces", this.namespaces), this.events.emit("chainChanged", s2));
  }
  onConnect() {
    this.createProviders(), this.events.emit("connect", { session: this.session });
  }
  async cleanup() {
    this.session = void 0, this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, this.persist("namespaces", void 0), this.persist("optionalNamespaces", void 0), this.persist("sessionProperties", void 0), await this.cleanupPendingPairings({ deletePairings: true });
  }
  persist(e, t) {
    this.client.core.storage.setItem(`${$e4}/${e}`, t);
  }
  async getFromStore(e) {
    return await this.client.core.storage.getItem(`${$e4}/${e}`);
  }
};
var oh = Z2;

// node_modules/@walletconnect/ethereum-provider/dist/index.es.js
var T4 = "wc";
var $4 = "ethereum_provider";
var j4 = `${T4}@2:${$4}:`;
var q4 = "https://rpc.walletconnect.org/v1/";
var u2 = ["eth_sendTransaction", "personal_sign"];
var M5 = ["eth_accounts", "eth_requestAccounts", "eth_sendRawTransaction", "eth_sign", "eth_signTransaction", "eth_signTypedData", "eth_signTypedData_v3", "eth_signTypedData_v4", "eth_sendTransaction", "personal_sign", "wallet_switchEthereumChain", "wallet_addEthereumChain", "wallet_getPermissions", "wallet_requestPermissions", "wallet_registerOnboarding", "wallet_watchAsset", "wallet_scanQRCode", "wallet_sendCalls", "wallet_getCapabilities", "wallet_getCallsStatus", "wallet_showCallsStatus"];
var m2 = ["chainChanged", "accountsChanged"];
var O4 = ["chainChanged", "accountsChanged", "message", "disconnect", "connect"];
var N4 = Object.defineProperty;
var D4 = Object.defineProperties;
var U2 = Object.getOwnPropertyDescriptors;
var P3 = Object.getOwnPropertySymbols;
var Q3 = Object.prototype.hasOwnProperty;
var L3 = Object.prototype.propertyIsEnumerable;
var y5 = (a3, t, s2) => t in a3 ? N4(a3, t, { enumerable: true, configurable: true, writable: true, value: s2 }) : a3[t] = s2;
var g3 = (a3, t) => {
  for (var s2 in t || (t = {}))
    Q3.call(t, s2) && y5(a3, s2, t[s2]);
  if (P3)
    for (var s2 of P3(t))
      L3.call(t, s2) && y5(a3, s2, t[s2]);
  return a3;
};
var _5 = (a3, t) => D4(a3, U2(t));
var o3 = (a3, t, s2) => y5(a3, typeof t != "symbol" ? t + "" : t, s2);
function v5(a3) {
  return Number(a3[0].split(":")[1]);
}
function C4(a3) {
  return `0x${a3.toString(16)}`;
}
function x6(a3) {
  const { chains: t, optionalChains: s2, methods: i3, optionalMethods: e, events: n3, optionalEvents: h5, rpcMap: l5 } = a3;
  if (!$e(t))
    throw new Error("Invalid chains");
  const r3 = { chains: t, methods: i3 || u2, events: n3 || m2, rpcMap: g3({}, t.length ? { [v5(t)]: l5[v5(t)] } : {}) }, c5 = n3 == null ? void 0 : n3.filter((d4) => !m2.includes(d4)), p4 = i3 == null ? void 0 : i3.filter((d4) => !u2.includes(d4));
  if (!s2 && !h5 && !e && !(c5 != null && c5.length) && !(p4 != null && p4.length))
    return { required: t.length ? r3 : void 0 };
  const I3 = (c5 == null ? void 0 : c5.length) && (p4 == null ? void 0 : p4.length) || !s2, f8 = { chains: [...new Set(I3 ? r3.chains.concat(s2 || []) : s2)], methods: [...new Set(r3.methods.concat(e != null && e.length ? e : M5))], events: [...new Set(r3.events.concat(h5 != null && h5.length ? h5 : O4))], rpcMap: l5 };
  return { required: t.length ? r3 : void 0, optional: s2.length ? f8 : void 0 };
}
var w3 = class _w {
  constructor() {
    o3(this, "events", new import_events10.EventEmitter()), o3(this, "namespace", "eip155"), o3(this, "accounts", []), o3(this, "signer"), o3(this, "chainId", 1), o3(this, "modal"), o3(this, "rpc"), o3(this, "STORAGE_KEY", j4), o3(this, "on", (t, s2) => (this.events.on(t, s2), this)), o3(this, "once", (t, s2) => (this.events.once(t, s2), this)), o3(this, "removeListener", (t, s2) => (this.events.removeListener(t, s2), this)), o3(this, "off", (t, s2) => (this.events.off(t, s2), this)), o3(this, "parseAccount", (t) => this.isCompatibleChainId(t) ? this.parseAccountId(t).address : t), this.signer = {}, this.rpc = {};
  }
  static async init(t) {
    const s2 = new _w();
    return await s2.initialize(t), s2;
  }
  async request(t, s2) {
    return await this.signer.request(t, this.formatChainId(this.chainId), s2);
  }
  sendAsync(t, s2, i3) {
    this.signer.sendAsync(t, s2, this.formatChainId(this.chainId), i3);
  }
  get connected() {
    return this.signer.client ? this.signer.client.core.relayer.connected : false;
  }
  get connecting() {
    return this.signer.client ? this.signer.client.core.relayer.connecting : false;
  }
  async enable() {
    return this.session || await this.connect(), await this.request({ method: "eth_requestAccounts" });
  }
  async connect(t) {
    if (!this.signer.client)
      throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts(t);
    const { required: s2, optional: i3 } = x6(this.rpc);
    try {
      const e = await new Promise(async (h5, l5) => {
        var r3;
        this.rpc.showQrModal && ((r3 = this.modal) == null || r3.subscribeModal((c5) => {
          !c5.open && !this.signer.session && (this.signer.abortPairingAttempt(), l5(new Error("Connection request reset. Please try again.")));
        })), await this.signer.connect(_5(g3({ namespaces: g3({}, s2 && { [this.namespace]: s2 }) }, i3 && { optionalNamespaces: { [this.namespace]: i3 } }), { pairingTopic: t == null ? void 0 : t.pairingTopic })).then((c5) => {
          h5(c5);
        }).catch((c5) => {
          l5(new Error(c5.message));
        });
      });
      if (!e)
        return;
      const n3 = Hr(e.namespaces, [this.namespace]);
      this.setChainIds(this.rpc.chains.length ? this.rpc.chains : n3), this.setAccounts(n3), this.events.emit("connect", { chainId: C4(this.chainId) });
    } catch (e) {
      throw this.signer.logger.error(e), e;
    } finally {
      this.modal && this.modal.closeModal();
    }
  }
  async authenticate(t, s2) {
    if (!this.signer.client)
      throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts({ chains: t == null ? void 0 : t.chains });
    try {
      const i3 = await new Promise(async (n3, h5) => {
        var l5;
        this.rpc.showQrModal && ((l5 = this.modal) == null || l5.subscribeModal((r3) => {
          !r3.open && !this.signer.session && (this.signer.abortPairingAttempt(), h5(new Error("Connection request reset. Please try again.")));
        })), await this.signer.authenticate(_5(g3({}, t), { chains: this.rpc.chains }), s2).then((r3) => {
          n3(r3);
        }).catch((r3) => {
          h5(new Error(r3.message));
        });
      }), e = i3.session;
      if (e) {
        const n3 = Hr(e.namespaces, [this.namespace]);
        this.setChainIds(this.rpc.chains.length ? this.rpc.chains : n3), this.setAccounts(n3), this.events.emit("connect", { chainId: C4(this.chainId) });
      }
      return i3;
    } catch (i3) {
      throw this.signer.logger.error(i3), i3;
    } finally {
      this.modal && this.modal.closeModal();
    }
  }
  async disconnect() {
    this.session && await this.signer.disconnect(), this.reset();
  }
  get isWalletConnect() {
    return true;
  }
  get session() {
    return this.signer.session;
  }
  registerEventListeners() {
    this.signer.on("session_event", (t) => {
      const { params: s2 } = t, { event: i3 } = s2;
      i3.name === "accountsChanged" ? (this.accounts = this.parseAccounts(i3.data), this.events.emit("accountsChanged", this.accounts)) : i3.name === "chainChanged" ? this.setChainId(this.formatChainId(i3.data)) : this.events.emit(i3.name, i3.data), this.events.emit("session_event", t);
    }), this.signer.on("chainChanged", (t) => {
      const s2 = parseInt(t);
      this.chainId = s2, this.events.emit("chainChanged", C4(this.chainId)), this.persist();
    }), this.signer.on("session_update", (t) => {
      this.events.emit("session_update", t);
    }), this.signer.on("session_delete", (t) => {
      this.reset(), this.events.emit("session_delete", t), this.events.emit("disconnect", _5(g3({}, de("USER_DISCONNECTED")), { data: t.topic, name: "USER_DISCONNECTED" }));
    }), this.signer.on("display_uri", (t) => {
      var s2, i3;
      this.rpc.showQrModal && ((s2 = this.modal) == null || s2.closeModal(), (i3 = this.modal) == null || i3.openModal({ uri: t })), this.events.emit("display_uri", t);
    });
  }
  switchEthereumChain(t) {
    this.request({ method: "wallet_switchEthereumChain", params: [{ chainId: t.toString(16) }] });
  }
  isCompatibleChainId(t) {
    return typeof t == "string" ? t.startsWith(`${this.namespace}:`) : false;
  }
  formatChainId(t) {
    return `${this.namespace}:${t}`;
  }
  parseChainId(t) {
    return Number(t.split(":")[1]);
  }
  setChainIds(t) {
    const s2 = t.filter((i3) => this.isCompatibleChainId(i3)).map((i3) => this.parseChainId(i3));
    s2.length && (this.chainId = s2[0], this.events.emit("chainChanged", C4(this.chainId)), this.persist());
  }
  setChainId(t) {
    if (this.isCompatibleChainId(t)) {
      const s2 = this.parseChainId(t);
      this.chainId = s2, this.switchEthereumChain(s2);
    }
  }
  parseAccountId(t) {
    const [s2, i3, e] = t.split(":");
    return { chainId: `${s2}:${i3}`, address: e };
  }
  setAccounts(t) {
    this.accounts = t.filter((s2) => this.parseChainId(this.parseAccountId(s2).chainId) === this.chainId).map((s2) => this.parseAccountId(s2).address), this.events.emit("accountsChanged", this.accounts);
  }
  getRpcConfig(t) {
    var s2, i3;
    const e = (s2 = t == null ? void 0 : t.chains) != null ? s2 : [], n3 = (i3 = t == null ? void 0 : t.optionalChains) != null ? i3 : [], h5 = e.concat(n3);
    if (!h5.length)
      throw new Error("No chains specified in either `chains` or `optionalChains`");
    const l5 = e.length ? (t == null ? void 0 : t.methods) || u2 : [], r3 = e.length ? (t == null ? void 0 : t.events) || m2 : [], c5 = (t == null ? void 0 : t.optionalMethods) || [], p4 = (t == null ? void 0 : t.optionalEvents) || [], I3 = (t == null ? void 0 : t.rpcMap) || this.buildRpcMap(h5, t.projectId), f8 = (t == null ? void 0 : t.qrModalOptions) || void 0;
    return { chains: e == null ? void 0 : e.map((d4) => this.formatChainId(d4)), optionalChains: n3.map((d4) => this.formatChainId(d4)), methods: l5, events: r3, optionalMethods: c5, optionalEvents: p4, rpcMap: I3, showQrModal: !!(t != null && t.showQrModal), qrModalOptions: f8, projectId: t.projectId, metadata: t.metadata };
  }
  buildRpcMap(t, s2) {
    const i3 = {};
    return t.forEach((e) => {
      i3[e] = this.getRpcUrl(e, s2);
    }), i3;
  }
  async initialize(t) {
    if (this.rpc = this.getRpcConfig(t), this.chainId = this.rpc.chains.length ? v5(this.rpc.chains) : v5(this.rpc.optionalChains), this.signer = await oh.init({ projectId: this.rpc.projectId, metadata: this.rpc.metadata, disableProviderPing: t.disableProviderPing, relayUrl: t.relayUrl, storage: t.storage, storageOptions: t.storageOptions, customStoragePrefix: t.customStoragePrefix, telemetryEnabled: t.telemetryEnabled, logger: t.logger }), this.registerEventListeners(), await this.loadPersistedSession(), this.rpc.showQrModal) {
      let s2;
      try {
        const { WalletConnectModal: i3 } = await import("./dist-OKNALID5.js");
        s2 = i3;
      } catch {
        throw new Error("To use QR modal, please install @walletconnect/modal package");
      }
      if (s2)
        try {
          this.modal = new s2(g3({ projectId: this.rpc.projectId }, this.rpc.qrModalOptions));
        } catch (i3) {
          throw this.signer.logger.error(i3), new Error("Could not generate WalletConnectModal Instance");
        }
    }
  }
  loadConnectOpts(t) {
    if (!t)
      return;
    const { chains: s2, optionalChains: i3, rpcMap: e } = t;
    s2 && $e(s2) && (this.rpc.chains = s2.map((n3) => this.formatChainId(n3)), s2.forEach((n3) => {
      this.rpc.rpcMap[n3] = (e == null ? void 0 : e[n3]) || this.getRpcUrl(n3);
    })), i3 && $e(i3) && (this.rpc.optionalChains = [], this.rpc.optionalChains = i3 == null ? void 0 : i3.map((n3) => this.formatChainId(n3)), i3.forEach((n3) => {
      this.rpc.rpcMap[n3] = (e == null ? void 0 : e[n3]) || this.getRpcUrl(n3);
    }));
  }
  getRpcUrl(t, s2) {
    var i3;
    return ((i3 = this.rpc.rpcMap) == null ? void 0 : i3[t]) || `${q4}?chainId=eip155:${t}&projectId=${s2 || this.rpc.projectId}`;
  }
  async loadPersistedSession() {
    if (this.session)
      try {
        const t = await this.signer.client.core.storage.getItem(`${this.STORAGE_KEY}/chainId`), s2 = this.session.namespaces[`${this.namespace}:${t}`] ? this.session.namespaces[`${this.namespace}:${t}`] : this.session.namespaces[this.namespace];
        this.setChainIds(t ? [this.formatChainId(t)] : s2 == null ? void 0 : s2.accounts), this.setAccounts(s2 == null ? void 0 : s2.accounts);
      } catch (t) {
        this.signer.logger.error("Failed to load persisted session, clearing state..."), this.signer.logger.error(t), await this.disconnect().catch((s2) => this.signer.logger.warn(s2));
      }
  }
  reset() {
    this.chainId = 1, this.accounts = [];
  }
  persist() {
    this.session && this.signer.client.core.storage.setItem(`${this.STORAGE_KEY}/chainId`, this.chainId);
  }
  parseAccounts(t) {
    return typeof t == "string" || t instanceof String ? [this.parseAccount(t)] : t.map((s2) => this.parseAccount(s2));
  }
};
var z5 = w3;
export {
  z5 as EthereumProvider,
  O4 as OPTIONAL_EVENTS,
  M5 as OPTIONAL_METHODS,
  m2 as REQUIRED_EVENTS,
  u2 as REQUIRED_METHODS,
  w3 as default
};
/*! Bundled license information:

@noble/curves/esm/abstract/utils.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@walletconnect/utils/dist/index.es.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
//# sourceMappingURL=@walletconnect_ethereum-provider.js.map
