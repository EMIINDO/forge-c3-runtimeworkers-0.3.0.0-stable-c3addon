function forge() {
    return function(e) {
        function t(a) {
            if (r[a]) return r[a].exports;
            var n = r[a] = {
                i: a,
                l: !1,
                exports: {}
            };
            return e[a].call(n.exports, n, n.exports, t), n.l = !0, n.exports
        }
        var r = {};
        return t.m = e, t.c = r, t.d = function(e, r, a) {
            t.o(e, r) || Object.defineProperty(e, r, {
                configurable: !1,
                enumerable: !0,
                get: a
            })
        }, t.n = function(e) {
            var r = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return t.d(r, "a", r), r
        }, t.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "", t(t.s = 34)
    }([function(e, t) {
        e.exports = {
            options: {
                usePureJavaScript: !1
            }
        }
    }, function(e, t, r) {
        (function(t) {
            function a(e) {
                if (8 !== e && 16 !== e && 24 !== e && 32 !== e) throw new Error("Only 8, 16, 24, or 32 bits supported: " + e)
            }

            function n(e) {
                if (this.data = "", this.read = 0, "string" == typeof e) this.data = e;
                else if (c.isArrayBuffer(e) || c.isArrayBufferView(e))
                    if ("undefined" != typeof Buffer && e instanceof Buffer) this.data = e.toString("binary");
                    else {
                        var t = new Uint8Array(e);
                        try {
                            this.data = String.fromCharCode.apply(null, t)
                        } catch (e) {
                            for (var r = 0; r < t.length; ++r) this.putByte(t[r])
                        }
                    } else(e instanceof n || "object" == typeof e && "string" == typeof e.data && "number" == typeof e.read) && (this.data = e.data, this.read = e.read);
                this._constructedStringLength = 0
            }

            function i(e, t) {
                t = t || {}, this.read = t.readOffset || 0, this.growSize = t.growSize || 1024;
                var r = c.isArrayBuffer(e),
                    a = c.isArrayBufferView(e);
                if (r || a) return this.data = r ? new DataView(e) : new DataView(e.buffer, e.byteOffset, e.byteLength), void(this.write = "writeOffset" in t ? t.writeOffset : this.data.byteLength);
                this.data = new DataView(new ArrayBuffer(0)), this.write = 0, null !== e && void 0 !== e && this.putBytes(e), "writeOffset" in t && (this.write = t.writeOffset)
            }
            var s = r(0),
                o = r(37),
                c = e.exports = s.util = s.util || {};
            ! function() {
                function e(e) {
                    if (e.source === window && e.data === t) {
                        e.stopPropagation();
                        var a = r.slice();
                        r.length = 0, a.forEach(function(e) {
                            e()
                        })
                    }
                }
                if ("undefined" != typeof process && process.nextTick && !process.browser) return c.nextTick = process.nextTick, void("function" == typeof setImmediate ? c.setImmediate = setImmediate : c.setImmediate = c.nextTick);
                if ("function" == typeof setImmediate) return c.setImmediate = function() {
                    return setImmediate.apply(void 0, arguments)
                }, void(c.nextTick = function(e) {
                    return setImmediate(e)
                });
                if (c.setImmediate = function(e) {
                        setTimeout(e, 0)
                    }, "undefined" != typeof window && "function" == typeof window.postMessage) {
                    var t = "forge.setImmediate",
                        r = [];
                    c.setImmediate = function(e) {
                        r.push(e), 1 === r.length && window.postMessage(t, "*")
                    }, window.addEventListener("message", e, !0)
                }
                if ("undefined" != typeof MutationObserver) {
                    var a = Date.now(),
                        n = !0,
                        i = document.createElement("div"),
                        r = [];
                    new MutationObserver(function() {
                        var e = r.slice();
                        r.length = 0, e.forEach(function(e) {
                            e()
                        })
                    }).observe(i, {
                        attributes: !0
                    });
                    var s = c.setImmediate;
                    c.setImmediate = function(e) {
                        Date.now() - a > 15 ? (a = Date.now(), s(e)) : (r.push(e), 1 === r.length && i.setAttribute("a", n = !n))
                    }
                }
                c.nextTick = c.setImmediate
            }(), c.isNodejs = "undefined" != typeof process && process.versions && process.versions.node, c.globalScope = function() {
                return c.isNodejs ? t : "undefined" == typeof self ? window : self
            }(), c.isArray = Array.isArray || function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }, c.isArrayBuffer = function(e) {
                return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer
            }, c.isArrayBufferView = function(e) {
                return e && c.isArrayBuffer(e.buffer) && void 0 !== e.byteLength
            }, c.ByteBuffer = n, c.ByteStringBuffer = n;
            c.ByteStringBuffer.prototype._optimizeConstructedString = function(e) {
                this._constructedStringLength += e, this._constructedStringLength > 4096 && (this.data.substr(0, 1), this._constructedStringLength = 0)
            }, c.ByteStringBuffer.prototype.length = function() {
                return this.data.length - this.read
            }, c.ByteStringBuffer.prototype.isEmpty = function() {
                return this.length() <= 0
            }, c.ByteStringBuffer.prototype.putByte = function(e) {
                return this.putBytes(String.fromCharCode(e))
            }, c.ByteStringBuffer.prototype.fillWithByte = function(e, t) {
                e = String.fromCharCode(e);
                for (var r = this.data; t > 0;) 1 & t && (r += e), (t >>>= 1) > 0 && (e += e);
                return this.data = r, this._optimizeConstructedString(t), this
            }, c.ByteStringBuffer.prototype.putBytes = function(e) {
                return this.data += e, this._optimizeConstructedString(e.length), this
            }, c.ByteStringBuffer.prototype.putString = function(e) {
                return this.putBytes(c.encodeUtf8(e))
            }, c.ByteStringBuffer.prototype.putInt16 = function(e) {
                return this.putBytes(String.fromCharCode(e >> 8 & 255) + String.fromCharCode(255 & e))
            }, c.ByteStringBuffer.prototype.putInt24 = function(e) {
                return this.putBytes(String.fromCharCode(e >> 16 & 255) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(255 & e))
            }, c.ByteStringBuffer.prototype.putInt32 = function(e) {
                return this.putBytes(String.fromCharCode(e >> 24 & 255) + String.fromCharCode(e >> 16 & 255) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(255 & e))
            }, c.ByteStringBuffer.prototype.putInt16Le = function(e) {
                return this.putBytes(String.fromCharCode(255 & e) + String.fromCharCode(e >> 8 & 255))
            }, c.ByteStringBuffer.prototype.putInt24Le = function(e) {
                return this.putBytes(String.fromCharCode(255 & e) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(e >> 16 & 255))
            }, c.ByteStringBuffer.prototype.putInt32Le = function(e) {
                return this.putBytes(String.fromCharCode(255 & e) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(e >> 16 & 255) + String.fromCharCode(e >> 24 & 255))
            }, c.ByteStringBuffer.prototype.putInt = function(e, t) {
                a(t);
                var r = "";
                do {
                    t -= 8, r += String.fromCharCode(e >> t & 255)
                } while (t > 0);
                return this.putBytes(r)
            }, c.ByteStringBuffer.prototype.putSignedInt = function(e, t) {
                return e < 0 && (e += 2 << t - 1), this.putInt(e, t)
            }, c.ByteStringBuffer.prototype.putBuffer = function(e) {
                return this.putBytes(e.getBytes())
            }, c.ByteStringBuffer.prototype.getByte = function() {
                return this.data.charCodeAt(this.read++)
            }, c.ByteStringBuffer.prototype.getInt16 = function() {
                var e = this.data.charCodeAt(this.read) << 8 ^ this.data.charCodeAt(this.read + 1);
                return this.read += 2, e
            }, c.ByteStringBuffer.prototype.getInt24 = function() {
                var e = this.data.charCodeAt(this.read) << 16 ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2);
                return this.read += 3, e
            }, c.ByteStringBuffer.prototype.getInt32 = function() {
                var e = this.data.charCodeAt(this.read) << 24 ^ this.data.charCodeAt(this.read + 1) << 16 ^ this.data.charCodeAt(this.read + 2) << 8 ^ this.data.charCodeAt(this.read + 3);
                return this.read += 4, e
            }, c.ByteStringBuffer.prototype.getInt16Le = function() {
                var e = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8;
                return this.read += 2, e
            }, c.ByteStringBuffer.prototype.getInt24Le = function() {
                var e = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16;
                return this.read += 3, e
            }, c.ByteStringBuffer.prototype.getInt32Le = function() {
                var e = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16 ^ this.data.charCodeAt(this.read + 3) << 24;
                return this.read += 4, e
            }, c.ByteStringBuffer.prototype.getInt = function(e) {
                a(e);
                var t = 0;
                do {
                    t = (t << 8) + this.data.charCodeAt(this.read++), e -= 8
                } while (e > 0);
                return t
            }, c.ByteStringBuffer.prototype.getSignedInt = function(e) {
                var t = this.getInt(e),
                    r = 2 << e - 2;
                return t >= r && (t -= r << 1), t
            }, c.ByteStringBuffer.prototype.getBytes = function(e) {
                var t;
                return e ? (e = Math.min(this.length(), e), t = this.data.slice(this.read, this.read + e), this.read += e) : 0 === e ? t = "" : (t = 0 === this.read ? this.data : this.data.slice(this.read), this.clear()), t
            }, c.ByteStringBuffer.prototype.bytes = function(e) {
                return void 0 === e ? this.data.slice(this.read) : this.data.slice(this.read, this.read + e)
            }, c.ByteStringBuffer.prototype.at = function(e) {
                return this.data.charCodeAt(this.read + e)
            }, c.ByteStringBuffer.prototype.setAt = function(e, t) {
                return this.data = this.data.substr(0, this.read + e) + String.fromCharCode(t) + this.data.substr(this.read + e + 1), this
            }, c.ByteStringBuffer.prototype.last = function() {
                return this.data.charCodeAt(this.data.length - 1)
            }, c.ByteStringBuffer.prototype.copy = function() {
                var e = c.createBuffer(this.data);
                return e.read = this.read, e
            }, c.ByteStringBuffer.prototype.compact = function() {
                return this.read > 0 && (this.data = this.data.slice(this.read), this.read = 0), this
            }, c.ByteStringBuffer.prototype.clear = function() {
                return this.data = "", this.read = 0, this
            }, c.ByteStringBuffer.prototype.truncate = function(e) {
                var t = Math.max(0, this.length() - e);
                return this.data = this.data.substr(this.read, t), this.read = 0, this
            }, c.ByteStringBuffer.prototype.toHex = function() {
                for (var e = "", t = this.read; t < this.data.length; ++t) {
                    var r = this.data.charCodeAt(t);
                    r < 16 && (e += "0"), e += r.toString(16)
                }
                return e
            }, c.ByteStringBuffer.prototype.toString = function() {
                return c.decodeUtf8(this.bytes())
            }, c.DataBuffer = i, c.DataBuffer.prototype.length = function() {
                return this.write - this.read
            }, c.DataBuffer.prototype.isEmpty = function() {
                return this.length() <= 0
            }, c.DataBuffer.prototype.accommodate = function(e, t) {
                if (this.length() >= e) return this;
                t = Math.max(t || this.growSize, e);
                var r = new Uint8Array(this.data.buffer, this.data.byteOffset, this.data.byteLength),
                    a = new Uint8Array(this.length() + t);
                return a.set(r), this.data = new DataView(a.buffer), this
            }, c.DataBuffer.prototype.putByte = function(e) {
                return this.accommodate(1), this.data.setUint8(this.write++, e), this
            }, c.DataBuffer.prototype.fillWithByte = function(e, t) {
                this.accommodate(t);
                for (var r = 0; r < t; ++r) this.data.setUint8(e);
                return this
            }, c.DataBuffer.prototype.putBytes = function(e, t) {
                if (c.isArrayBufferView(e)) {
                    var r = new Uint8Array(e.buffer, e.byteOffset, e.byteLength),
                        a = r.byteLength - r.byteOffset;
                    this.accommodate(a);
                    var n = new Uint8Array(this.data.buffer, this.write);
                    return n.set(r), this.write += a, this
                }
                if (c.isArrayBuffer(e)) {
                    var r = new Uint8Array(e);
                    this.accommodate(r.byteLength);
                    var n = new Uint8Array(this.data.buffer);
                    return n.set(r, this.write), this.write += r.byteLength, this
                }
                if (e instanceof c.DataBuffer || "object" == typeof e && "number" == typeof e.read && "number" == typeof e.write && c.isArrayBufferView(e.data)) {
                    var r = new Uint8Array(e.data.byteLength, e.read, e.length());
                    this.accommodate(r.byteLength);
                    var n = new Uint8Array(e.data.byteLength, this.write);
                    return n.set(r), this.write += r.byteLength, this
                }
                if (e instanceof c.ByteStringBuffer && (e = e.data, t = "binary"), t = t || "binary", "string" == typeof e) {
                    var i;
                    if ("hex" === t) return this.accommodate(Math.ceil(e.length / 2)), i = new Uint8Array(this.data.buffer, this.write), this.write += c.binary.hex.decode(e, i, this.write), this;
                    if ("base64" === t) return this.accommodate(3 * Math.ceil(e.length / 4)), i = new Uint8Array(this.data.buffer, this.write), this.write += c.binary.base64.decode(e, i, this.write), this;
                    if ("utf8" === t && (e = c.encodeUtf8(e), t = "binary"), "binary" === t || "raw" === t) return this.accommodate(e.length), i = new Uint8Array(this.data.buffer, this.write), this.write += c.binary.raw.decode(i), this;
                    if ("utf16" === t) return this.accommodate(2 * e.length), i = new Uint16Array(this.data.buffer, this.write), this.write += c.text.utf16.encode(i), this;
                    throw new Error("Invalid encoding: " + t)
                }
                throw Error("Invalid parameter: " + e)
            }, c.DataBuffer.prototype.putBuffer = function(e) {
                return this.putBytes(e), e.clear(), this
            }, c.DataBuffer.prototype.putString = function(e) {
                return this.putBytes(e, "utf16")
            }, c.DataBuffer.prototype.putInt16 = function(e) {
                return this.accommodate(2), this.data.setInt16(this.write, e), this.write += 2, this
            }, c.DataBuffer.prototype.putInt24 = function(e) {
                return this.accommodate(3), this.data.setInt16(this.write, e >> 8 & 65535), this.data.setInt8(this.write, e >> 16 & 255), this.write += 3, this
            }, c.DataBuffer.prototype.putInt32 = function(e) {
                return this.accommodate(4), this.data.setInt32(this.write, e), this.write += 4, this
            }, c.DataBuffer.prototype.putInt16Le = function(e) {
                return this.accommodate(2), this.data.setInt16(this.write, e, !0), this.write += 2, this
            }, c.DataBuffer.prototype.putInt24Le = function(e) {
                return this.accommodate(3), this.data.setInt8(this.write, e >> 16 & 255), this.data.setInt16(this.write, e >> 8 & 65535, !0), this.write += 3, this
            }, c.DataBuffer.prototype.putInt32Le = function(e) {
                return this.accommodate(4), this.data.setInt32(this.write, e, !0), this.write += 4, this
            }, c.DataBuffer.prototype.putInt = function(e, t) {
                a(t), this.accommodate(t / 8);
                do {
                    t -= 8, this.data.setInt8(this.write++, e >> t & 255)
                } while (t > 0);
                return this
            }, c.DataBuffer.prototype.putSignedInt = function(e, t) {
                return a(t), this.accommodate(t / 8), e < 0 && (e += 2 << t - 1), this.putInt(e, t)
            }, c.DataBuffer.prototype.getByte = function() {
                return this.data.getInt8(this.read++)
            }, c.DataBuffer.prototype.getInt16 = function() {
                var e = this.data.getInt16(this.read);
                return this.read += 2, e
            }, c.DataBuffer.prototype.getInt24 = function() {
                var e = this.data.getInt16(this.read) << 8 ^ this.data.getInt8(this.read + 2);
                return this.read += 3, e
            }, c.DataBuffer.prototype.getInt32 = function() {
                var e = this.data.getInt32(this.read);
                return this.read += 4, e
            }, c.DataBuffer.prototype.getInt16Le = function() {
                var e = this.data.getInt16(this.read, !0);
                return this.read += 2, e
            }, c.DataBuffer.prototype.getInt24Le = function() {
                var e = this.data.getInt8(this.read) ^ this.data.getInt16(this.read + 1, !0) << 8;
                return this.read += 3, e
            }, c.DataBuffer.prototype.getInt32Le = function() {
                var e = this.data.getInt32(this.read, !0);
                return this.read += 4, e
            }, c.DataBuffer.prototype.getInt = function(e) {
                a(e);
                var t = 0;
                do {
                    t = (t << 8) + this.data.getInt8(this.read++), e -= 8
                } while (e > 0);
                return t
            }, c.DataBuffer.prototype.getSignedInt = function(e) {
                var t = this.getInt(e),
                    r = 2 << e - 2;
                return t >= r && (t -= r << 1), t
            }, c.DataBuffer.prototype.getBytes = function(e) {
                var t;
                return e ? (e = Math.min(this.length(), e), t = this.data.slice(this.read, this.read + e), this.read += e) : 0 === e ? t = "" : (t = 0 === this.read ? this.data : this.data.slice(this.read), this.clear()), t
            }, c.DataBuffer.prototype.bytes = function(e) {
                return void 0 === e ? this.data.slice(this.read) : this.data.slice(this.read, this.read + e)
            }, c.DataBuffer.prototype.at = function(e) {
                return this.data.getUint8(this.read + e)
            }, c.DataBuffer.prototype.setAt = function(e, t) {
                return this.data.setUint8(e, t), this
            }, c.DataBuffer.prototype.last = function() {
                return this.data.getUint8(this.write - 1)
            }, c.DataBuffer.prototype.copy = function() {
                return new c.DataBuffer(this)
            }, c.DataBuffer.prototype.compact = function() {
                if (this.read > 0) {
                    var e = new Uint8Array(this.data.buffer, this.read),
                        t = new Uint8Array(e.byteLength);
                    t.set(e), this.data = new DataView(t), this.write -= this.read, this.read = 0
                }
                return this
            }, c.DataBuffer.prototype.clear = function() {
                return this.data = new DataView(new ArrayBuffer(0)), this.read = this.write = 0, this
            }, c.DataBuffer.prototype.truncate = function(e) {
                return this.write = Math.max(0, this.length() - e), this.read = Math.min(this.read, this.write), this
            }, c.DataBuffer.prototype.toHex = function() {
                for (var e = "", t = this.read; t < this.data.byteLength; ++t) {
                    var r = this.data.getUint8(t);
                    r < 16 && (e += "0"), e += r.toString(16)
                }
                return e
            }, c.DataBuffer.prototype.toString = function(e) {
                var t = new Uint8Array(this.data, this.read, this.length());
                if ("binary" === (e = e || "utf8") || "raw" === e) return c.binary.raw.encode(t);
                if ("hex" === e) return c.binary.hex.encode(t);
                if ("base64" === e) return c.binary.base64.encode(t);
                if ("utf8" === e) return c.text.utf8.decode(t);
                if ("utf16" === e) return c.text.utf16.decode(t);
                throw new Error("Invalid encoding: " + e)
            }, c.createBuffer = function(e, t) {
                return t = t || "raw", void 0 !== e && "utf8" === t && (e = c.encodeUtf8(e)), new c.ByteBuffer(e)
            }, c.fillString = function(e, t) {
                for (var r = ""; t > 0;) 1 & t && (r += e), (t >>>= 1) > 0 && (e += e);
                return r
            }, c.xorBytes = function(e, t, r) {
                for (var a = "", n = "", i = "", s = 0, o = 0; r > 0; --r, ++s) n = e.charCodeAt(s) ^ t.charCodeAt(s), o >= 10 && (a += i, i = "", o = 0), i += String.fromCharCode(n), ++o;
                return a += i
            }, c.hexToBytes = function(e) {
                var t = "",
                    r = 0;
                for (!0 & e.length && (r = 1, t += String.fromCharCode(parseInt(e[0], 16))); r < e.length; r += 2) t += String.fromCharCode(parseInt(e.substr(r, 2), 16));
                return t
            }, c.bytesToHex = function(e) {
                return c.createBuffer(e).toHex()
            }, c.int32ToBytes = function(e) {
                return String.fromCharCode(e >> 24 & 255) + String.fromCharCode(e >> 16 & 255) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(255 & e)
            };
            var u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                l = [62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 64, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
                p = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
            c.encode64 = function(e, t) {
                for (var r, a, n, i = "", s = "", o = 0; o < e.length;) r = e.charCodeAt(o++), a = e.charCodeAt(o++), n = e.charCodeAt(o++), i += u.charAt(r >> 2), i += u.charAt((3 & r) << 4 | a >> 4), isNaN(a) ? i += "==" : (i += u.charAt((15 & a) << 2 | n >> 6), i += isNaN(n) ? "=" : u.charAt(63 & n)), t && i.length > t && (s += i.substr(0, t) + "\r\n", i = i.substr(t));
                return s += i
            }, c.decode64 = function(e) {
                e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                for (var t, r, a, n, i = "", s = 0; s < e.length;) t = l[e.charCodeAt(s++) - 43], r = l[e.charCodeAt(s++) - 43], a = l[e.charCodeAt(s++) - 43], n = l[e.charCodeAt(s++) - 43], i += String.fromCharCode(t << 2 | r >> 4), 64 !== a && (i += String.fromCharCode((15 & r) << 4 | a >> 2), 64 !== n && (i += String.fromCharCode((3 & a) << 6 | n)));
                return i
            }, c.encodeUtf8 = function(e) {
                return unescape(encodeURIComponent(e))
            }, c.decodeUtf8 = function(e) {
                return decodeURIComponent(escape(e))
            }, c.binary = {
                raw: {},
                hex: {},
                base64: {},
                base58: {},
                baseN: {
                    encode: o.encode,
                    decode: o.decode
                }
            }, c.binary.raw.encode = function(e) {
                return String.fromCharCode.apply(null, e)
            }, c.binary.raw.decode = function(e, t, r) {
                var a = t;
                a || (a = new Uint8Array(e.length)), r = r || 0;
                for (var n = r, i = 0; i < e.length; ++i) a[n++] = e.charCodeAt(i);
                return t ? n - r : a
            }, c.binary.hex.encode = c.bytesToHex, c.binary.hex.decode = function(e, t, r) {
                var a = t;
                a || (a = new Uint8Array(Math.ceil(e.length / 2))), r = r || 0;
                var n = 0,
                    i = r;
                for (1 & e.length && (n = 1, a[i++] = parseInt(e[0], 16)); n < e.length; n += 2) a[i++] = parseInt(e.substr(n, 2), 16);
                return t ? i - r : a
            }, c.binary.base64.encode = function(e, t) {
                for (var r, a, n, i = "", s = "", o = 0; o < e.byteLength;) r = e[o++], a = e[o++], n = e[o++], i += u.charAt(r >> 2), i += u.charAt((3 & r) << 4 | a >> 4), isNaN(a) ? i += "==" : (i += u.charAt((15 & a) << 2 | n >> 6), i += isNaN(n) ? "=" : u.charAt(63 & n)), t && i.length > t && (s += i.substr(0, t) + "\r\n", i = i.substr(t));
                return s += i
            }, c.binary.base64.decode = function(e, t, r) {
                var a = t;
                a || (a = new Uint8Array(3 * Math.ceil(e.length / 4))), e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""), r = r || 0;
                for (var n, i, s, o, c = 0, u = r; c < e.length;) n = l[e.charCodeAt(c++) - 43], i = l[e.charCodeAt(c++) - 43], s = l[e.charCodeAt(c++) - 43], o = l[e.charCodeAt(c++) - 43], a[u++] = n << 2 | i >> 4, 64 !== s && (a[u++] = (15 & i) << 4 | s >> 2, 64 !== o && (a[u++] = (3 & s) << 6 | o));
                return t ? u - r : a.subarray(0, u)
            }, c.binary.base58.encode = function(e, t) {
                return c.binary.baseN.encode(e, p, t)
            }, c.binary.base58.decode = function(e, t) {
                return c.binary.baseN.decode(e, p, t)
            }, c.text = {
                utf8: {},
                utf16: {}
            }, c.text.utf8.encode = function(e, t, r) {
                e = c.encodeUtf8(e);
                var a = t;
                a || (a = new Uint8Array(e.length)), r = r || 0;
                for (var n = r, i = 0; i < e.length; ++i) a[n++] = e.charCodeAt(i);
                return t ? n - r : a
            }, c.text.utf8.decode = function(e) {
                return c.decodeUtf8(String.fromCharCode.apply(null, e))
            }, c.text.utf16.encode = function(e, t, r) {
                var a = t;
                a || (a = new Uint8Array(2 * e.length));
                var n = new Uint16Array(a.buffer);
                r = r || 0;
                for (var i = r, s = r, o = 0; o < e.length; ++o) n[s++] = e.charCodeAt(o), i += 2;
                return t ? i - r : a
            }, c.text.utf16.decode = function(e) {
                return String.fromCharCode.apply(null, new Uint16Array(e.buffer))
            }, c.deflate = function(e, t, r) {
                if (t = c.decode64(e.deflate(c.encode64(t)).rval), r) {
                    var a = 2;
                    32 & t.charCodeAt(1) && (a = 6), t = t.substring(a, t.length - 4)
                }
                return t
            }, c.inflate = function(e, t, r) {
                var a = e.inflate(c.encode64(t)).rval;
                return null === a ? null : c.decode64(a)
            };
            var f = function(e, t, r) {
                    if (!e) throw new Error("WebStorage not available.");
                    var a;
                    if (null === r ? a = e.removeItem(t) : (r = c.encode64(JSON.stringify(r)), a = e.setItem(t, r)), void 0 !== a && !0 !== a.rval) {
                        var n = new Error(a.error.message);
                        throw n.id = a.error.id, n.name = a.error.name, n
                    }
                },
                h = function(e, t) {
                    if (!e) throw new Error("WebStorage not available.");
                    var r = e.getItem(t);
                    if (e.init)
                        if (null === r.rval) {
                            if (r.error) {
                                var a = new Error(r.error.message);
                                throw a.id = r.error.id, a.name = r.error.name, a
                            }
                            r = null
                        } else r = r.rval;
                    return null !== r && (r = JSON.parse(c.decode64(r))), r
                },
                d = function(e, t, r, a) {
                    var n = h(e, t);
                    null === n && (n = {}), n[r] = a, f(e, t, n)
                },
                y = function(e, t, r) {
                    var a = h(e, t);
                    return null !== a && (a = r in a ? a[r] : null), a
                },
                g = function(e, t, r) {
                    var a = h(e, t);
                    if (null !== a && r in a) {
                        delete a[r];
                        var n = !0;
                        for (var i in a) {
                            n = !1;
                            break
                        }
                        n && (a = null), f(e, t, a)
                    }
                },
                v = function(e, t) {
                    f(e, t, null)
                },
                m = function(e, t, r) {
                    var a = null;
                    void 0 === r && (r = ["web", "flash"]);
                    var n, i = !1,
                        s = null;
                    for (var o in r) {
                        n = r[o];
                        try {
                            if ("flash" === n || "both" === n) {
                                if (null === t[0]) throw new Error("Flash local storage not available.");
                                a = e.apply(this, t), i = "flash" === n
                            }
                            "web" !== n && "both" !== n || (t[0] = localStorage, a = e.apply(this, t), i = !0)
                        } catch (e) {
                            s = e
                        }
                        if (i) break
                    }
                    if (!i) throw s;
                    return a
                };
            c.setItem = function(e, t, r, a, n) {
                m(d, arguments, n)
            }, c.getItem = function(e, t, r, a) {
                return m(y, arguments, a)
            }, c.removeItem = function(e, t, r, a) {
                m(g, arguments, a)
            }, c.clearItems = function(e, t, r) {
                m(v, arguments, r)
            }, c.parseUrl = function(e) {
                var t = /^(https?):\/\/([^:&^\/]*):?(\d*)(.*)$/g;
                t.lastIndex = 0;
                var r = t.exec(e),
                    a = null === r ? null : {
                        full: e,
                        scheme: r[1],
                        host: r[2],
                        port: r[3],
                        path: r[4]
                    };
                return a && (a.fullHost = a.host, a.port ? 80 !== a.port && "http" === a.scheme ? a.fullHost += ":" + a.port : 443 !== a.port && "https" === a.scheme && (a.fullHost += ":" + a.port) : "http" === a.scheme ? a.port = 80 : "https" === a.scheme && (a.port = 443), a.full = a.scheme + "://" + a.fullHost), a
            };
            var C = null;
            c.getQueryVariables = function(e) {
                var t, r = function(e) {
                    for (var t = {}, r = e.split("&"), a = 0; a < r.length; a++) {
                        var n, i, s = r[a].indexOf("=");
                        s > 0 ? (n = r[a].substring(0, s), i = r[a].substring(s + 1)) : (n = r[a], i = null), n in t || (t[n] = []), n in Object.prototype || null === i || t[n].push(unescape(i))
                    }
                    return t
                };
                return void 0 === e ? (null === C && (C = "undefined" != typeof window && window.location && window.location.search ? r(window.location.search.substring(1)) : {}), t = C) : t = r(e), t
            }, c.parseFragment = function(e) {
                var t = e,
                    r = "",
                    a = e.indexOf("?");
                a > 0 && (t = e.substring(0, a), r = e.substring(a + 1));
                var n = t.split("/");
                return n.length > 0 && "" === n[0] && n.shift(), {
                    pathString: t,
                    queryString: r,
                    path: n,
                    query: "" === r ? {} : c.getQueryVariables(r)
                }
            }, c.makeRequest = function(e) {
                var t = c.parseFragment(e),
                    r = {
                        path: t.pathString,
                        query: t.queryString,
                        getPath: function(e) {
                            return void 0 === e ? t.path : t.path[e]
                        },
                        getQuery: function(e, r) {
                            var a;
                            return void 0 === e ? a = t.query : (a = t.query[e]) && void 0 !== r && (a = a[r]), a
                        },
                        getQueryLast: function(e, t) {
                            var a = r.getQuery(e);
                            return a ? a[a.length - 1] : t
                        }
                    };
                return r
            }, c.makeLink = function(e, t, r) {
                e = jQuery.isArray(e) ? e.join("/") : e;
                var a = jQuery.param(t || {});
                return r = r || "", e + (a.length > 0 ? "?" + a : "") + (r.length > 0 ? "#" + r : "")
            }, c.setPath = function(e, t, r) {
                if ("object" == typeof e && null !== e)
                    for (var a = 0, n = t.length; a < n;) {
                        var i = t[a++];
                        if (a == n) e[i] = r;
                        else {
                            var s = i in e;
                            (!s || s && "object" != typeof e[i] || s && null === e[i]) && (e[i] = {}), e = e[i]
                        }
                    }
            }, c.getPath = function(e, t, r) {
                for (var a = 0, n = t.length, i = !0; i && a < n && "object" == typeof e && null !== e;) {
                    var s = t[a++];
                    i = s in e, i && (e = e[s])
                }
                return i ? e : r
            }, c.deletePath = function(e, t) {
                if ("object" == typeof e && null !== e)
                    for (var r = 0, a = t.length; r < a;) {
                        var n = t[r++];
                        if (r == a) delete e[n];
                        else {
                            if (!(n in e) || "object" != typeof e[n] || null === e[n]) break;
                            e = e[n]
                        }
                    }
            }, c.isEmpty = function(e) {
                for (var t in e)
                    if (e.hasOwnProperty(t)) return !1;
                return !0
            }, c.format = function(e) {
                for (var t, r, a = /%./g, n = 0, i = [], s = 0; t = a.exec(e);) {
                    r = e.substring(s, a.lastIndex - 2), r.length > 0 && i.push(r), s = a.lastIndex;
                    var o = t[0][1];
                    switch (o) {
                        case "s":
                        case "o":
                            n < arguments.length ? i.push(arguments[1 + n++]) : i.push("<?>");
                            break;
                        case "%":
                            i.push("%");
                            break;
                        default:
                            i.push("<%" + o + "?>")
                    }
                }
                return i.push(e.substring(s)), i.join("")
            }, c.formatNumber = function(e, t, r, a) {
                var n = e,
                    i = isNaN(t = Math.abs(t)) ? 2 : t,
                    s = void 0 === r ? "," : r,
                    o = void 0 === a ? "." : a,
                    c = n < 0 ? "-" : "",
                    u = parseInt(n = Math.abs(+n || 0).toFixed(i), 10) + "",
                    l = u.length > 3 ? u.length % 3 : 0;
                return c + (l ? u.substr(0, l) + o : "") + u.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + o) + (i ? s + Math.abs(n - u).toFixed(i).slice(2) : "")
            }, c.formatSize = function(e) {
                return e = e >= 1073741824 ? c.formatNumber(e / 1073741824, 2, ".", "") + " GiB" : e >= 1048576 ? c.formatNumber(e / 1048576, 2, ".", "") + " MiB" : e >= 1024 ? c.formatNumber(e / 1024, 0) + " KiB" : c.formatNumber(e, 0) + " bytes"
            }, c.bytesFromIP = function(e) {
                return -1 !== e.indexOf(".") ? c.bytesFromIPv4(e) : -1 !== e.indexOf(":") ? c.bytesFromIPv6(e) : null
            }, c.bytesFromIPv4 = function(e) {
                if (e = e.split("."), 4 !== e.length) return null;
                for (var t = c.createBuffer(), r = 0; r < e.length; ++r) {
                    var a = parseInt(e[r], 10);
                    if (isNaN(a)) return null;
                    t.putByte(a)
                }
                return t.getBytes()
            }, c.bytesFromIPv6 = function(e) {
                var t = 0;
                e = e.split(":").filter(function(e) {
                    return 0 === e.length && ++t, !0
                });
                for (var r = 2 * (8 - e.length + t), a = c.createBuffer(), n = 0; n < 8; ++n)
                    if (e[n] && 0 !== e[n].length) {
                        var i = c.hexToBytes(e[n]);
                        i.length < 2 && a.putByte(0), a.putBytes(i)
                    } else a.fillWithByte(0, r), r = 0;
                return a.getBytes()
            }, c.bytesToIP = function(e) {
                return 4 === e.length ? c.bytesToIPv4(e) : 16 === e.length ? c.bytesToIPv6(e) : null
            }, c.bytesToIPv4 = function(e) {
                if (4 !== e.length) return null;
                for (var t = [], r = 0; r < e.length; ++r) t.push(e.charCodeAt(r));
                return t.join(".")
            }, c.bytesToIPv6 = function(e) {
                if (16 !== e.length) return null;
                for (var t = [], r = [], a = 0, n = 0; n < e.length; n += 2) {
                    for (var i = c.bytesToHex(e[n] + e[n + 1]);
                        "0" === i[0] && "0" !== i;) i = i.substr(1);
                    if ("0" === i) {
                        var s = r[r.length - 1],
                            o = t.length;
                        s && o === s.end + 1 ? (s.end = o, s.end - s.start > r[a].end - r[a].start && (a = r.length - 1)) : r.push({
                            start: o,
                            end: o
                        })
                    }
                    t.push(i)
                }
                if (r.length > 0) {
                    var u = r[a];
                    u.end - u.start > 0 && (t.splice(u.start, u.end - u.start + 1, ""), 0 === u.start && t.unshift(""), 7 === u.end && t.push(""))
                }
                return t.join(":")
            }, c.estimateCores = function(e, t) {
                function r(e, s, o) {
                    if (0 === s) {
                        var u = Math.floor(e.reduce(function(e, t) {
                            return e + t
                        }, 0) / e.length);
                        return c.cores = Math.max(1, u), URL.revokeObjectURL(i), t(null, c.cores)
                    }
                    a(o, function(t, a) {
                        e.push(n(o, a)), r(e, s - 1, o)
                    })
                }

                function a(e, t) {
                    for (var r = [], a = [], n = 0; n < e; ++n) {
                        var s = new Worker(i);
                        s.addEventListener("message", function(n) {
                            if (a.push(n.data), a.length === e) {
                                for (var i = 0; i < e; ++i) r[i].terminate();
                                t(null, a)
                            }
                        }), r.push(s)
                    }
                    for (var n = 0; n < e; ++n) r[n].postMessage(n)
                }

                function n(e, t) {
                    for (var r = [], a = 0; a < e; ++a)
                        for (var n = t[a], i = r[a] = [], s = 0; s < e; ++s)
                            if (a !== s) {
                                var o = t[s];
                                (n.st > o.st && n.st < o.et || o.st > n.st && o.st < n.et) && i.push(s)
                            }
                    return r.reduce(function(e, t) {
                        return Math.max(e, t.length)
                    }, 0)
                }
                if ("function" == typeof e && (t = e, e = {}), e = e || {}, "cores" in c && !e.update) return t(null, c.cores);
                if ("undefined" != typeof navigator && "hardwareConcurrency" in navigator && navigator.hardwareConcurrency > 0) return c.cores = navigator.hardwareConcurrency, t(null, c.cores);
                if ("undefined" == typeof Worker) return c.cores = 1, t(null, c.cores);
                if ("undefined" == typeof Blob) return c.cores = 2, t(null, c.cores);
                var i = URL.createObjectURL(new Blob(["(", function() {
                    self.addEventListener("message", function(e) {
                        for (var t = Date.now(), r = t + 4; Date.now() < r;);
                        self.postMessage({
                            st: t,
                            et: r
                        })
                    })
                }.toString(), ")()"], {
                    type: "application/javascript"
                }));
                r([], 5, 16)
            }
        }).call(t, r(36))
    }, function(e, t, r) {
        var a = r(0);
        r(5), r(23), r(24), r(1),
            function() {
                if (a.random && a.random.getBytes) return void(e.exports = a.random);
                ! function(t) {
                    function r() {
                        var e = a.prng.create(n);
                        return e.getBytes = function(t, r) {
                            return e.generate(t, r)
                        }, e.getBytesSync = function(t) {
                            return e.generate(t)
                        }, e
                    }
                    var n = {},
                        i = new Array(4),
                        s = a.util.createBuffer();
                    n.formatKey = function(e) {
                        var t = a.util.createBuffer(e);
                        return e = new Array(4), e[0] = t.getInt32(), e[1] = t.getInt32(), e[2] = t.getInt32(), e[3] = t.getInt32(), a.aes._expandKey(e, !1)
                    }, n.formatSeed = function(e) {
                        var t = a.util.createBuffer(e);
                        return e = new Array(4), e[0] = t.getInt32(), e[1] = t.getInt32(), e[2] = t.getInt32(), e[3] = t.getInt32(), e
                    }, n.cipher = function(e, t) {
                        return a.aes._updateBlock(e, t, i, !1), s.putInt32(i[0]), s.putInt32(i[1]), s.putInt32(i[2]), s.putInt32(i[3]), s.getBytes()
                    }, n.increment = function(e) {
                        return ++e[3], e
                    }, n.md = a.md.sha256;
                    var o = r(),
                        c = null,
                        u = a.util.globalScope,
                        l = u.crypto || u.msCrypto;
                    if (l && l.getRandomValues && (c = function(e) {
                            return l.getRandomValues(e)
                        }), a.options.usePureJavaScript || !a.util.isNodejs && !c) {
                        if ("undefined" == typeof window || window.document, o.collectInt(+new Date, 32), "undefined" != typeof navigator) {
                            var p = "";
                            for (var f in navigator) try {
                                "string" == typeof navigator[f] && (p += navigator[f])
                            } catch (e) {}
                            o.collect(p), p = null
                        }
                        t && (t().mousemove(function(e) {
                            o.collectInt(e.clientX, 16), o.collectInt(e.clientY, 16)
                        }), t().keypress(function(e) {
                            o.collectInt(e.charCode, 8)
                        }))
                    }
                    if (a.random)
                        for (var f in o) a.random[f] = o[f];
                    else a.random = o;
                    a.random.createInstance = r, e.exports = a.random
                }("undefined" != typeof jQuery ? jQuery : null)
            }()
    }, function(e, t, r) {
        function a(e, t, r) {
            if (r > t) {
                var a = new Error("Too few bytes to parse DER.");
                throw a.available = e.length(), a.remaining = t, a.requested = r, a
            }
        }

        function n(e, t, r, i) {
            var c;
            a(e, t, 2);
            var u = e.getByte();
            t--;
            var l = 192 & u,
                p = 31 & u;
            c = e.length();
            var f = o(e, t);
            if (t -= c - e.length(), void 0 !== f && f > t) {
                if (i.strict) {
                    var h = new Error("Too few bytes to read ASN.1 value.");
                    throw h.available = e.length(), h.remaining = t, h.requested = f, h
                }
                f = t
            }
            var d, y, g = 32 == (32 & u);
            if (g)
                if (d = [], void 0 === f)
                    for (;;) {
                        if (a(e, t, 2), e.bytes(2) === String.fromCharCode(0, 0)) {
                            e.getBytes(2), t -= 2;
                            break
                        }
                        c = e.length(), d.push(n(e, t, r + 1, i)), t -= c - e.length()
                    } else
                        for (; f > 0;) c = e.length(), d.push(n(e, f, r + 1, i)), t -= c - e.length(), f -= c - e.length();
            if (void 0 === d && l === s.Class.UNIVERSAL && p === s.Type.BITSTRING && (y = e.bytes(f)), void 0 === d && i.decodeBitStrings && l === s.Class.UNIVERSAL && p === s.Type.BITSTRING && f > 1) {
                var v = e.read,
                    m = t,
                    C = 0;
                if (p === s.Type.BITSTRING && (a(e, t, 1), C = e.getByte(), t--), 0 === C) try {
                    c = e.length();
                    var E = {
                            verbose: i.verbose,
                            strict: !0,
                            decodeBitStrings: !0
                        },
                        S = n(e, t, r + 1, E),
                        T = c - e.length();
                    t -= T, p == s.Type.BITSTRING && T++;
                    var I = S.tagClass;
                    T !== f || I !== s.Class.UNIVERSAL && I !== s.Class.CONTEXT_SPECIFIC || (d = [S])
                } catch (e) {}
                void 0 === d && (e.read = v, t = m)
            }
            if (void 0 === d) {
                if (void 0 === f) {
                    if (i.strict) throw new Error("Non-constructed ASN.1 object of indefinite length.");
                    f = t
                }
                if (p === s.Type.BMPSTRING)
                    for (d = ""; f > 0; f -= 2) a(e, t, 2), d += String.fromCharCode(e.getInt16()), t -= 2;
                else d = e.getBytes(f)
            }
            var b = void 0 === y ? null : {
                bitStringContents: y
            };
            return s.create(l, p, g, d, b)
        }
        var i = r(0);
        r(1), r(6);
        var s = e.exports = i.asn1 = i.asn1 || {};
        s.Class = {
            UNIVERSAL: 0,
            APPLICATION: 64,
            CONTEXT_SPECIFIC: 128,
            PRIVATE: 192
        }, s.Type = {
            NONE: 0,
            BOOLEAN: 1,
            INTEGER: 2,
            BITSTRING: 3,
            OCTETSTRING: 4,
            NULL: 5,
            OID: 6,
            ODESC: 7,
            EXTERNAL: 8,
            REAL: 9,
            ENUMERATED: 10,
            EMBEDDED: 11,
            UTF8: 12,
            ROID: 13,
            SEQUENCE: 16,
            SET: 17,
            PRINTABLESTRING: 19,
            IA5STRING: 22,
            UTCTIME: 23,
            GENERALIZEDTIME: 24,
            BMPSTRING: 30
        }, s.create = function(e, t, r, a, n) {
            if (i.util.isArray(a)) {
                for (var o = [], c = 0; c < a.length; ++c) void 0 !== a[c] && o.push(a[c]);
                a = o
            }
            var u = {
                tagClass: e,
                type: t,
                constructed: r,
                composed: r || i.util.isArray(a),
                value: a
            };
            return n && "bitStringContents" in n && (u.bitStringContents = n.bitStringContents, u.original = s.copy(u)), u
        }, s.copy = function(e, t) {
            var r;
            if (i.util.isArray(e)) {
                r = [];
                for (var a = 0; a < e.length; ++a) r.push(s.copy(e[a], t));
                return r
            }
            return "string" == typeof e ? e : (r = {
                tagClass: e.tagClass,
                type: e.type,
                constructed: e.constructed,
                composed: e.composed,
                value: s.copy(e.value, t)
            }, t && !t.excludeBitStringContents && (r.bitStringContents = e.bitStringContents), r)
        }, s.equals = function(e, t, r) {
            if (i.util.isArray(e)) {
                if (!i.util.isArray(t)) return !1;
                if (e.length !== t.length) return !1;
                for (var a = 0; a < e.length; ++a)
                    if (!s.equals(e[a], t[a])) return !1;
                return !0
            }
            if (typeof e != typeof t) return !1;
            if ("string" == typeof e) return e === t;
            var n = e.tagClass === t.tagClass && e.type === t.type && e.constructed === t.constructed && e.composed === t.composed && s.equals(e.value, t.value);
            return r && r.includeBitStringContents && (n = n && e.bitStringContents === t.bitStringContents), n
        }, s.getBerValueLength = function(e) {
            var t = e.getByte();
            if (128 !== t) {
                return 128 & t ? e.getInt((127 & t) << 3) : t
            }
        };
        var o = function(e, t) {
            var r = e.getByte();
            if (t--, 128 !== r) {
                var n;
                if (128 & r) {
                    var i = 127 & r;
                    a(e, t, i), n = e.getInt(i << 3)
                } else n = r;
                if (n < 0) throw new Error("Negative length: " + n);
                return n
            }
        };
        s.fromDer = function(e, t) {
            return void 0 === t && (t = {
                strict: !0,
                decodeBitStrings: !0
            }), "boolean" == typeof t && (t = {
                strict: t,
                decodeBitStrings: !0
            }), "strict" in t || (t.strict = !0), "decodeBitStrings" in t || (t.decodeBitStrings = !0), "string" == typeof e && (e = i.util.createBuffer(e)), n(e, e.length(), 0, t)
        }, s.toDer = function(e) {
            var t = i.util.createBuffer(),
                r = e.tagClass | e.type,
                a = i.util.createBuffer(),
                n = !1;
            if ("bitStringContents" in e && (n = !0, e.original && (n = s.equals(e, e.original))), n) a.putBytes(e.bitStringContents);
            else if (e.composed) {
                e.constructed ? r |= 32 : a.putByte(0);
                for (var o = 0; o < e.value.length; ++o) void 0 !== e.value[o] && a.putBuffer(s.toDer(e.value[o]))
            } else if (e.type === s.Type.BMPSTRING)
                for (var o = 0; o < e.value.length; ++o) a.putInt16(e.value.charCodeAt(o));
            else e.type === s.Type.INTEGER && e.value.length > 1 && (0 === e.value.charCodeAt(0) && 0 == (128 & e.value.charCodeAt(1)) || 255 === e.value.charCodeAt(0) && 128 == (128 & e.value.charCodeAt(1))) ? a.putBytes(e.value.substr(1)) : a.putBytes(e.value);
            if (t.putByte(r), a.length() <= 127) t.putByte(127 & a.length());
            else {
                var c = a.length(),
                    u = "";
                do {
                    u += String.fromCharCode(255 & c), c >>>= 8
                } while (c > 0);
                t.putByte(128 | u.length);
                for (var o = u.length - 1; o >= 0; --o) t.putByte(u.charCodeAt(o))
            }
            return t.putBuffer(a), t
        }, s.oidToDer = function(e) {
            var t = e.split("."),
                r = i.util.createBuffer();
            r.putByte(40 * parseInt(t[0], 10) + parseInt(t[1], 10));
            for (var a, n, s, o, c = 2; c < t.length; ++c) {
                a = !0, n = [], s = parseInt(t[c], 10);
                do {
                    o = 127 & s, s >>>= 7, a || (o |= 128), n.push(o), a = !1
                } while (s > 0);
                for (var u = n.length - 1; u >= 0; --u) r.putByte(n[u])
            }
            return r
        }, s.derToOid = function(e) {
            var t;
            "string" == typeof e && (e = i.util.createBuffer(e));
            var r = e.getByte();
            t = Math.floor(r / 40) + "." + r % 40;
            for (var a = 0; e.length() > 0;) r = e.getByte(), a <<= 7, 128 & r ? a += 127 & r : (t += "." + (a + r), a = 0);
            return t
        }, s.utcTimeToDate = function(e) {
            var t = new Date,
                r = parseInt(e.substr(0, 2), 10);
            r = r >= 50 ? 1900 + r : 2e3 + r;
            var a = parseInt(e.substr(2, 2), 10) - 1,
                n = parseInt(e.substr(4, 2), 10),
                i = parseInt(e.substr(6, 2), 10),
                s = parseInt(e.substr(8, 2), 10),
                o = 0;
            if (e.length > 11) {
                var c = e.charAt(10),
                    u = 10;
                "+" !== c && "-" !== c && (o = parseInt(e.substr(10, 2), 10), u += 2)
            }
            if (t.setUTCFullYear(r, a, n), t.setUTCHours(i, s, o, 0), u && ("+" === (c = e.charAt(u)) || "-" === c)) {
                var l = parseInt(e.substr(u + 1, 2), 10),
                    p = parseInt(e.substr(u + 4, 2), 10),
                    f = 60 * l + p;
                f *= 6e4, "+" === c ? t.setTime(+t - f) : t.setTime(+t + f)
            }
            return t
        }, s.generalizedTimeToDate = function(e) {
            var t = new Date,
                r = parseInt(e.substr(0, 4), 10),
                a = parseInt(e.substr(4, 2), 10) - 1,
                n = parseInt(e.substr(6, 2), 10),
                i = parseInt(e.substr(8, 2), 10),
                s = parseInt(e.substr(10, 2), 10),
                o = parseInt(e.substr(12, 2), 10),
                c = 0,
                u = 0,
                l = !1;
            "Z" === e.charAt(e.length - 1) && (l = !0);
            var p = e.length - 5,
                f = e.charAt(p);
            if ("+" === f || "-" === f) {
                u = 60 * parseInt(e.substr(p + 1, 2), 10) + parseInt(e.substr(p + 4, 2), 10), u *= 6e4, "+" === f && (u *= -1), l = !0
            }
            return "." === e.charAt(14) && (c = 1e3 * parseFloat(e.substr(14), 10)), l ? (t.setUTCFullYear(r, a, n), t.setUTCHours(i, s, o, c), t.setTime(+t + u)) : (t.setFullYear(r, a, n), t.setHours(i, s, o, c)), t
        }, s.dateToUtcTime = function(e) {
            if ("string" == typeof e) return e;
            var t = "",
                r = [];
            r.push(("" + e.getUTCFullYear()).substr(2)), r.push("" + (e.getUTCMonth() + 1)), r.push("" + e.getUTCDate()), r.push("" + e.getUTCHours()), r.push("" + e.getUTCMinutes()), r.push("" + e.getUTCSeconds());
            for (var a = 0; a < r.length; ++a) r[a].length < 2 && (t += "0"), t += r[a];
            return t += "Z"
        }, s.dateToGeneralizedTime = function(e) {
            if ("string" == typeof e) return e;
            var t = "",
                r = [];
            r.push("" + e.getUTCFullYear()), r.push("" + (e.getUTCMonth() + 1)), r.push("" + e.getUTCDate()), r.push("" + e.getUTCHours()), r.push("" + e.getUTCMinutes()), r.push("" + e.getUTCSeconds());
            for (var a = 0; a < r.length; ++a) r[a].length < 2 && (t += "0"), t += r[a];
            return t += "Z"
        }, s.integerToDer = function(e) {
            var t = i.util.createBuffer();
            if (e >= -128 && e < 128) return t.putSignedInt(e, 8);
            if (e >= -32768 && e < 32768) return t.putSignedInt(e, 16);
            if (e >= -8388608 && e < 8388608) return t.putSignedInt(e, 24);
            if (e >= -2147483648 && e < 2147483648) return t.putSignedInt(e, 32);
            var r = new Error("Integer too large; max is 32-bits.");
            throw r.integer = e, r
        }, s.derToInteger = function(e) {
            "string" == typeof e && (e = i.util.createBuffer(e));
            var t = 8 * e.length();
            if (t > 32) throw new Error("Integer too large; max is 32-bits.");
            return e.getSignedInt(t)
        }, s.validate = function(e, t, r, a) {
            var n = !1;
            if (e.tagClass !== t.tagClass && void 0 !== t.tagClass || e.type !== t.type && void 0 !== t.type) a && (e.tagClass !== t.tagClass && a.push("[" + t.name + '] Expected tag class "' + t.tagClass + '", got "' + e.tagClass + '"'), e.type !== t.type && a.push("[" + t.name + '] Expected type "' + t.type + '", got "' + e.type + '"'));
            else if (e.constructed === t.constructed || void 0 === t.constructed) {
                if (n = !0, t.value && i.util.isArray(t.value))
                    for (var o = 0, c = 0; n && c < t.value.length; ++c) n = t.value[c].optional || !1, e.value[o] && (n = s.validate(e.value[o], t.value[c], r, a), n ? ++o : t.value[c].optional && (n = !0)), !n && a && a.push("[" + t.name + '] Tag class "' + t.tagClass + '", type "' + t.type + '" expected value length "' + t.value.length + '", got "' + e.value.length + '"');
                if (n && r && (t.capture && (r[t.capture] = e.value), t.captureAsn1 && (r[t.captureAsn1] = e), t.captureBitStringContents && "bitStringContents" in e && (r[t.captureBitStringContents] = e.bitStringContents), t.captureBitStringValue && "bitStringContents" in e)) {
                    if (e.bitStringContents.length < 2) r[t.captureBitStringValue] = "";
                    else {
                        var u = e.bitStringContents.charCodeAt(0);
                        if (0 !== u) throw new Error("captureBitStringValue only supported for zero unused bits");
                        r[t.captureBitStringValue] = e.bitStringContents.slice(1)
                    }
                }
            } else a && a.push("[" + t.name + '] Expected constructed "' + t.constructed + '", got "' + e.constructed + '"');
            return n
        };
        var c = /[^\\u0000-\\u00ff]/;
        s.prettyPrint = function(e, t, r) {
            var a = "";
            t = t || 0, r = r || 2, t > 0 && (a += "\n");
            for (var n = "", o = 0; o < t * r; ++o) n += " ";
            switch (a += n + "Tag: ", e.tagClass) {
                case s.Class.UNIVERSAL:
                    a += "Universal:";
                    break;
                case s.Class.APPLICATION:
                    a += "Application:";
                    break;
                case s.Class.CONTEXT_SPECIFIC:
                    a += "Context-Specific:";
                    break;
                case s.Class.PRIVATE:
                    a += "Private:"
            }
            if (e.tagClass === s.Class.UNIVERSAL) switch (a += e.type, e.type) {
                case s.Type.NONE:
                    a += " (None)";
                    break;
                case s.Type.BOOLEAN:
                    a += " (Boolean)";
                    break;
                case s.Type.INTEGER:
                    a += " (Integer)";
                    break;
                case s.Type.BITSTRING:
                    a += " (Bit string)";
                    break;
                case s.Type.OCTETSTRING:
                    a += " (Octet string)";
                    break;
                case s.Type.NULL:
                    a += " (Null)";
                    break;
                case s.Type.OID:
                    a += " (Object Identifier)";
                    break;
                case s.Type.ODESC:
                    a += " (Object Descriptor)";
                    break;
                case s.Type.EXTERNAL:
                    a += " (External or Instance of)";
                    break;
                case s.Type.REAL:
                    a += " (Real)";
                    break;
                case s.Type.ENUMERATED:
                    a += " (Enumerated)";
                    break;
                case s.Type.EMBEDDED:
                    a += " (Embedded PDV)";
                    break;
                case s.Type.UTF8:
                    a += " (UTF8)";
                    break;
                case s.Type.ROID:
                    a += " (Relative Object Identifier)";
                    break;
                case s.Type.SEQUENCE:
                    a += " (Sequence)";
                    break;
                case s.Type.SET:
                    a += " (Set)";
                    break;
                case s.Type.PRINTABLESTRING:
                    a += " (Printable String)";
                    break;
                case s.Type.IA5String:
                    a += " (IA5String (ASCII))";
                    break;
                case s.Type.UTCTIME:
                    a += " (UTC time)";
                    break;
                case s.Type.GENERALIZEDTIME:
                    a += " (Generalized time)";
                    break;
                case s.Type.BMPSTRING:
                    a += " (BMP String)"
            } else a += e.type;
            if (a += "\n", a += n + "Constructed: " + e.constructed + "\n", e.composed) {
                for (var u = 0, l = "", o = 0; o < e.value.length; ++o) void 0 !== e.value[o] && (u += 1, l += s.prettyPrint(e.value[o], t + 1, r), o + 1 < e.value.length && (l += ","));
                a += n + "Sub values: " + u + l
            } else {
                if (a += n + "Value: ", e.type === s.Type.OID) {
                    var p = s.derToOid(e.value);
                    a += p, i.pki && i.pki.oids && p in i.pki.oids && (a += " (" + i.pki.oids[p] + ") ")
                }
                if (e.type === s.Type.INTEGER) try {
                    a += s.derToInteger(e.value)
                } catch (t) {
                    a += "0x" + i.util.bytesToHex(e.value)
                } else if (e.type === s.Type.BITSTRING) {
                    if (e.value.length > 1 ? a += "0x" + i.util.bytesToHex(e.value.slice(1)) : a += "(none)", e.value.length > 0) {
                        var f = e.value.charCodeAt(0);
                        1 == f ? a += " (1 unused bit shown)" : f > 1 && (a += " (" + f + " unused bits shown)")
                    }
                } else e.type === s.Type.OCTETSTRING ? (c.test(e.value) || (a += "(" + e.value + ") "), a += "0x" + i.util.bytesToHex(e.value)) : e.type === s.Type.UTF8 ? a += i.util.decodeUtf8(e.value) : e.type === s.Type.PRINTABLESTRING || e.type === s.Type.IA5String ? a += e.value : c.test(e.value) ? a += "0x" + i.util.bytesToHex(e.value) : 0 === e.value.length ? a += "[null]" : a += e.value
            }
            return a
        }
    }, function(e, t, r) {
        var a = r(0);
        e.exports = a.md = a.md || {}, a.md.algorithms = a.md.algorithms || {}
    }, function(e, t, r) {
        function a(e, t) {
            var r = function() {
                return new c.aes.Algorithm(e, t)
            };
            c.cipher.registerAlgorithm(e, r)
        }

        function n() {
            d = !0, p = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
            for (var e = new Array(256), t = 0; t < 128; ++t) e[t] = t << 1, e[t + 128] = t + 128 << 1 ^ 283;
            u = new Array(256), l = new Array(256), f = new Array(4), h = new Array(4);
            for (var t = 0; t < 4; ++t) f[t] = new Array(256), h[t] = new Array(256);
            for (var r, a, n, i, s, o, c, y = 0, g = 0, t = 0; t < 256; ++t) {
                i = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4, i = i >> 8 ^ 255 & i ^ 99, u[y] = i, l[i] = y, s = e[i], r = e[y], a = e[r], n = e[a], o = s << 24 ^ i << 16 ^ i << 8 ^ i ^ s, c = (r ^ a ^ n) << 24 ^ (y ^ n) << 16 ^ (y ^ a ^ n) << 8 ^ y ^ r ^ n;
                for (var v = 0; v < 4; ++v) f[v][y] = o, h[v][i] = c, o = o << 24 | o >>> 8, c = c << 24 | c >>> 8;
                0 === y ? y = g = 1 : (y = r ^ e[e[e[r ^ n]]], g ^= e[e[g]])
            }
        }

        function i(e, t) {
            for (var r, a = e.slice(0), n = 1, i = a.length, s = i + 6 + 1, o = y * s, c = i; c < o; ++c) r = a[c - 1], c % i == 0 ? (r = u[r >>> 16 & 255] << 24 ^ u[r >>> 8 & 255] << 16 ^ u[255 & r] << 8 ^ u[r >>> 24] ^ p[n] << 24, n++) : i > 6 && c % i == 4 && (r = u[r >>> 24] << 24 ^ u[r >>> 16 & 255] << 16 ^ u[r >>> 8 & 255] << 8 ^ u[255 & r]), a[c] = a[c - i] ^ r;
            if (t) {
                var l, f = h[0],
                    d = h[1],
                    g = h[2],
                    v = h[3],
                    m = a.slice(0);
                o = a.length;
                for (var c = 0, C = o - y; c < o; c += y, C -= y)
                    if (0 === c || c === o - y) m[c] = a[C], m[c + 1] = a[C + 3], m[c + 2] = a[C + 2], m[c + 3] = a[C + 1];
                    else
                        for (var E = 0; E < y; ++E) l = a[C + E], m[c + (3 & -E)] = f[u[l >>> 24]] ^ d[u[l >>> 16 & 255]] ^ g[u[l >>> 8 & 255]] ^ v[u[255 & l]];
                a = m
            }
            return a
        }

        function s(e, t, r, a) {
            var n, i, s, o, c, p = e.length / 4 - 1;
            a ? (n = h[0], i = h[1], s = h[2], o = h[3], c = l) : (n = f[0], i = f[1], s = f[2], o = f[3], c = u);
            var d, y, g, v, m, C, E;
            d = t[0] ^ e[0], y = t[a ? 3 : 1] ^ e[1], g = t[2] ^ e[2], v = t[a ? 1 : 3] ^ e[3];
            for (var S = 3, T = 1; T < p; ++T) m = n[d >>> 24] ^ i[y >>> 16 & 255] ^ s[g >>> 8 & 255] ^ o[255 & v] ^ e[++S], C = n[y >>> 24] ^ i[g >>> 16 & 255] ^ s[v >>> 8 & 255] ^ o[255 & d] ^ e[++S], E = n[g >>> 24] ^ i[v >>> 16 & 255] ^ s[d >>> 8 & 255] ^ o[255 & y] ^ e[++S], v = n[v >>> 24] ^ i[d >>> 16 & 255] ^ s[y >>> 8 & 255] ^ o[255 & g] ^ e[++S], d = m, y = C, g = E;
            r[0] = c[d >>> 24] << 24 ^ c[y >>> 16 & 255] << 16 ^ c[g >>> 8 & 255] << 8 ^ c[255 & v] ^ e[++S], r[a ? 3 : 1] = c[y >>> 24] << 24 ^ c[g >>> 16 & 255] << 16 ^ c[v >>> 8 & 255] << 8 ^ c[255 & d] ^ e[++S], r[2] = c[g >>> 24] << 24 ^ c[v >>> 16 & 255] << 16 ^ c[d >>> 8 & 255] << 8 ^ c[255 & y] ^ e[++S], r[a ? 1 : 3] = c[v >>> 24] << 24 ^ c[d >>> 16 & 255] << 16 ^ c[y >>> 8 & 255] << 8 ^ c[255 & g] ^ e[++S]
        }

        function o(e) {
            e = e || {};
            var t, r = (e.mode || "CBC").toUpperCase(),
                a = "AES-" + r;
            t = e.decrypt ? c.cipher.createDecipher(a, e.key) : c.cipher.createCipher(a, e.key);
            var n = t.start;
            return t.start = function(e, r) {
                var a = null;
                r instanceof c.util.ByteBuffer && (a = r, r = {}), r = r || {}, r.output = a, r.iv = e, n.call(t, r)
            }, t
        }
        var c = r(0);
        r(13), r(19), r(1), e.exports = c.aes = c.aes || {}, c.aes.startEncrypting = function(e, t, r, a) {
            var n = o({
                key: e,
                output: r,
                decrypt: !1,
                mode: a
            });
            return n.start(t), n
        }, c.aes.createEncryptionCipher = function(e, t) {
            return o({
                key: e,
                output: null,
                decrypt: !1,
                mode: t
            })
        }, c.aes.startDecrypting = function(e, t, r, a) {
            var n = o({
                key: e,
                output: r,
                decrypt: !0,
                mode: a
            });
            return n.start(t), n
        }, c.aes.createDecryptionCipher = function(e, t) {
            return o({
                key: e,
                output: null,
                decrypt: !0,
                mode: t
            })
        }, c.aes.Algorithm = function(e, t) {
            d || n();
            var r = this;
            r.name = e, r.mode = new t({
                blockSize: 16,
                cipher: {
                    encrypt: function(e, t) {
                        return s(r._w, e, t, !1)
                    },
                    decrypt: function(e, t) {
                        return s(r._w, e, t, !0)
                    }
                }
            }), r._init = !1
        }, c.aes.Algorithm.prototype.initialize = function(e) {
            if (!this._init) {
                var t, r = e.key;
                if ("string" != typeof r || 16 !== r.length && 24 !== r.length && 32 !== r.length) {
                    if (c.util.isArray(r) && (16 === r.length || 24 === r.length || 32 === r.length)) {
                        t = r, r = c.util.createBuffer();
                        for (var a = 0; a < t.length; ++a) r.putByte(t[a])
                    }
                } else r = c.util.createBuffer(r);
                if (!c.util.isArray(r)) {
                    t = r, r = [];
                    var n = t.length();
                    if (16 === n || 24 === n || 32 === n) {
                        n >>>= 2;
                        for (var a = 0; a < n; ++a) r.push(t.getInt32())
                    }
                }
                if (!c.util.isArray(r) || 4 !== r.length && 6 !== r.length && 8 !== r.length) throw new Error("Invalid key parameter.");
                var s = this.mode.name,
                    o = -1 !== ["CFB", "OFB", "CTR", "GCM"].indexOf(s);
                this._w = i(r, e.decrypt && !o), this._init = !0
            }
        }, c.aes._expandKey = function(e, t) {
            return d || n(), i(e, t)
        }, c.aes._updateBlock = s, a("AES-ECB", c.cipher.modes.ecb), a("AES-CBC", c.cipher.modes.cbc), a("AES-CFB", c.cipher.modes.cfb), a("AES-OFB", c.cipher.modes.ofb), a("AES-CTR", c.cipher.modes.ctr), a("AES-GCM", c.cipher.modes.gcm);
        var u, l, p, f, h, d = !1,
            y = 4
    }, function(e, t, r) {
        function a(e, t) {
            s[e] = t, s[t] = e
        }

        function n(e, t) {
            s[e] = t
        }
        var i = r(0);
        i.pki = i.pki || {};
        var s = e.exports = i.pki.oids = i.oids = i.oids || {};
        a("1.2.840.113549.1.1.1", "rsaEncryption"), a("1.2.840.113549.1.1.4", "md5WithRSAEncryption"), a("1.2.840.113549.1.1.5", "sha1WithRSAEncryption"), a("1.2.840.113549.1.1.7", "RSAES-OAEP"), a("1.2.840.113549.1.1.8", "mgf1"), a("1.2.840.113549.1.1.9", "pSpecified"), a("1.2.840.113549.1.1.10", "RSASSA-PSS"), a("1.2.840.113549.1.1.11", "sha256WithRSAEncryption"), a("1.2.840.113549.1.1.12", "sha384WithRSAEncryption"), a("1.2.840.113549.1.1.13", "sha512WithRSAEncryption"), a("1.2.840.10040.4.3", "dsa-with-sha1"), a("1.3.14.3.2.7", "desCBC"), a("1.3.14.3.2.26", "sha1"), a("2.16.840.1.101.3.4.2.1", "sha256"), a("2.16.840.1.101.3.4.2.2", "sha384"), a("2.16.840.1.101.3.4.2.3", "sha512"), a("1.2.840.113549.2.5", "md5"), a("1.2.840.113549.1.7.1", "data"), a("1.2.840.113549.1.7.2", "signedData"), a("1.2.840.113549.1.7.3", "envelopedData"), a("1.2.840.113549.1.7.4", "signedAndEnvelopedData"), a("1.2.840.113549.1.7.5", "digestedData"), a("1.2.840.113549.1.7.6", "encryptedData"), a("1.2.840.113549.1.9.1", "emailAddress"), a("1.2.840.113549.1.9.2", "unstructuredName"), a("1.2.840.113549.1.9.3", "contentType"), a("1.2.840.113549.1.9.4", "messageDigest"), a("1.2.840.113549.1.9.5", "signingTime"), a("1.2.840.113549.1.9.6", "counterSignature"), a("1.2.840.113549.1.9.7", "challengePassword"), a("1.2.840.113549.1.9.8", "unstructuredAddress"), a("1.2.840.113549.1.9.14", "extensionRequest"), a("1.2.840.113549.1.9.20", "friendlyName"), a("1.2.840.113549.1.9.21", "localKeyId"), a("1.2.840.113549.1.9.22.1", "x509Certificate"), a("1.2.840.113549.1.12.10.1.1", "keyBag"), a("1.2.840.113549.1.12.10.1.2", "pkcs8ShroudedKeyBag"), a("1.2.840.113549.1.12.10.1.3", "certBag"), a("1.2.840.113549.1.12.10.1.4", "crlBag"), a("1.2.840.113549.1.12.10.1.5", "secretBag"), a("1.2.840.113549.1.12.10.1.6", "safeContentsBag"), a("1.2.840.113549.1.5.13", "pkcs5PBES2"), a("1.2.840.113549.1.5.12", "pkcs5PBKDF2"), a("1.2.840.113549.1.12.1.1", "pbeWithSHAAnd128BitRC4"), a("1.2.840.113549.1.12.1.2", "pbeWithSHAAnd40BitRC4"), a("1.2.840.113549.1.12.1.3", "pbeWithSHAAnd3-KeyTripleDES-CBC"), a("1.2.840.113549.1.12.1.4", "pbeWithSHAAnd2-KeyTripleDES-CBC"), a("1.2.840.113549.1.12.1.5", "pbeWithSHAAnd128BitRC2-CBC"), a("1.2.840.113549.1.12.1.6", "pbewithSHAAnd40BitRC2-CBC"), a("1.2.840.113549.2.7", "hmacWithSHA1"), a("1.2.840.113549.2.8", "hmacWithSHA224"), a("1.2.840.113549.2.9", "hmacWithSHA256"), a("1.2.840.113549.2.10", "hmacWithSHA384"), a("1.2.840.113549.2.11", "hmacWithSHA512"), a("1.2.840.113549.3.7", "des-EDE3-CBC"), a("2.16.840.1.101.3.4.1.2", "aes128-CBC"), a("2.16.840.1.101.3.4.1.22", "aes192-CBC"), a("2.16.840.1.101.3.4.1.42", "aes256-CBC"), a("2.5.4.3", "commonName"), a("2.5.4.5", "serialName"), a("2.5.4.6", "countryName"), a("2.5.4.7", "localityName"), a("2.5.4.8", "stateOrProvinceName"), a("2.5.4.10", "organizationName"), a("2.5.4.11", "organizationalUnitName"), a("2.5.4.13", "description"), a("2.16.840.1.113730.1.1", "nsCertType"), a("2.16.840.1.113730.1.13", "nsComment"), n("2.5.29.1", "authorityKeyIdentifier"), n("2.5.29.2", "keyAttributes"), n("2.5.29.3", "certificatePolicies"), n("2.5.29.4", "keyUsageRestriction"), n("2.5.29.5", "policyMapping"), n("2.5.29.6", "subtreesConstraint"), n("2.5.29.7", "subjectAltName"), n("2.5.29.8", "issuerAltName"), n("2.5.29.9", "subjectDirectoryAttributes"), n("2.5.29.10", "basicConstraints"), n("2.5.29.11", "nameConstraints"), n("2.5.29.12", "policyConstraints"), n("2.5.29.13", "basicConstraints"), a("2.5.29.14", "subjectKeyIdentifier"), a("2.5.29.15", "keyUsage"), n("2.5.29.16", "privateKeyUsagePeriod"), a("2.5.29.17", "subjectAltName"), a("2.5.29.18", "issuerAltName"), a("2.5.29.19", "basicConstraints"), n("2.5.29.20", "cRLNumber"), n("2.5.29.21", "cRLReason"), n("2.5.29.22", "expirationDate"), n("2.5.29.23", "instructionCode"), n("2.5.29.24", "invalidityDate"), n("2.5.29.25", "cRLDistributionPoints"), n("2.5.29.26", "issuingDistributionPoint"), n("2.5.29.27", "deltaCRLIndicator"), n("2.5.29.28", "issuingDistributionPoint"), n("2.5.29.29", "certificateIssuer"), n("2.5.29.30", "nameConstraints"), a("2.5.29.31", "cRLDistributionPoints"), a("2.5.29.32", "certificatePolicies"), n("2.5.29.33", "policyMappings"), n("2.5.29.34", "policyConstraints"), a("2.5.29.35", "authorityKeyIdentifier"), n("2.5.29.36", "policyConstraints"), a("2.5.29.37", "extKeyUsage"), n("2.5.29.46", "freshestCRL"), n("2.5.29.54", "inhibitAnyPolicy"), a("1.3.6.1.4.1.11129.2.4.2", "timestampList"), a("1.3.6.1.5.5.7.1.1", "authorityInfoAccess"), a("1.3.6.1.5.5.7.3.1", "serverAuth"), a("1.3.6.1.5.5.7.3.2", "clientAuth"), a("1.3.6.1.5.5.7.3.3", "codeSigning"), a("1.3.6.1.5.5.7.3.4", "emailProtection"), a("1.3.6.1.5.5.7.3.8", "timeStamping")
    }, function(e, t, r) {
        function a(e) {
            for (var t = e.name + ": ", r = [], a = function(e, t) {
                    return " " + t
                }, n = 0; n < e.values.length; ++n) r.push(e.values[n].replace(/^(\S+\r\n)/, a));
            t += r.join(",") + "\r\n";
            for (var i = 0, s = -1, n = 0; n < t.length; ++n, ++i)
                if (i > 65 && -1 !== s) {
                    var o = t[s];
                    "," === o ? (++s, t = t.substr(0, s) + "\r\n " + t.substr(s)) : t = t.substr(0, s) + "\r\n" + o + t.substr(s + 1), i = n - s - 1, s = -1, ++n
                } else " " !== t[n] && "\t" !== t[n] && "," !== t[n] || (s = n);
            return t
        }

        function n(e) {
            return e.replace(/^\s+/, "")
        }
        var i = r(0);
        r(1);
        var s = e.exports = i.pem = i.pem || {};
        s.encode = function(e, t) {
            t = t || {};
            var r, n = "-----BEGIN " + e.type + "-----\r\n";
            if (e.procType && (r = {
                    name: "Proc-Type",
                    values: [String(e.procType.version), e.procType.type]
                }, n += a(r)), e.contentDomain && (r = {
                    name: "Content-Domain",
                    values: [e.contentDomain]
                }, n += a(r)), e.dekInfo && (r = {
                    name: "DEK-Info",
                    values: [e.dekInfo.algorithm]
                }, e.dekInfo.parameters && r.values.push(e.dekInfo.parameters), n += a(r)), e.headers)
                for (var s = 0; s < e.headers.length; ++s) n += a(e.headers[s]);
            return e.procType && (n += "\r\n"), n += i.util.encode64(e.body, t.maxline || 64) + "\r\n", n += "-----END " + e.type + "-----\r\n"
        }, s.decode = function(e) {
            for (var t, r = [], a = /\s*-----BEGIN ([A-Z0-9- ]+)-----\r?\n?([\x21-\x7e\s]+?(?:\r?\n\r?\n))?([:A-Za-z0-9+\/=\s]+?)-----END \1-----/g, s = /([\x21-\x7e]+):\s*([\x21-\x7e\s^:]+)/, o = /\r?\n/;;) {
                if (!(t = a.exec(e))) break;
                var c = {
                    type: t[1],
                    procType: null,
                    contentDomain: null,
                    dekInfo: null,
                    headers: [],
                    body: i.util.decode64(t[3])
                };
                if (r.push(c), t[2]) {
                    for (var u = t[2].split(o), l = 0; t && l < u.length;) {
                        for (var p = u[l].replace(/\s+$/, ""), f = l + 1; f < u.length; ++f) {
                            var h = u[f];
                            if (!/\s/.test(h[0])) break;
                            p += h, l = f
                        }
                        if (t = p.match(s)) {
                            for (var d = {
                                    name: t[1],
                                    values: []
                                }, y = t[2].split(","), g = 0; g < y.length; ++g) d.values.push(n(y[g]));
                            if (c.procType)
                                if (c.contentDomain || "Content-Domain" !== d.name)
                                    if (c.dekInfo || "DEK-Info" !== d.name) c.headers.push(d);
                                    else {
                                        if (0 === d.values.length) throw new Error('Invalid PEM formatted message. The "DEK-Info" header must have at least one subfield.');
                                        c.dekInfo = {
                                            algorithm: y[0],
                                            parameters: y[1] || null
                                        }
                                    } else c.contentDomain = y[0] || "";
                            else {
                                if ("Proc-Type" !== d.name) throw new Error('Invalid PEM formatted message. The first encapsulated header must be "Proc-Type".');
                                if (2 !== d.values.length) throw new Error('Invalid PEM formatted message. The "Proc-Type" header must have two subfields.');
                                c.procType = {
                                    version: y[0],
                                    type: y[1]
                                }
                            }
                        }++l
                    }
                    if ("ENCRYPTED" === c.procType && !c.dekInfo) throw new Error('Invalid PEM formatted message. The "DEK-Info" header must be present if "Proc-Type" is "ENCRYPTED".')
                }
            }
            if (0 === r.length) throw new Error("Invalid PEM formatted message.");
            return r
        }
    }, function(e, t, r) {
        var a = r(0);
        r(4), r(1), (e.exports = a.hmac = a.hmac || {}).create = function() {
            var e = null,
                t = null,
                r = null,
                n = null,
                i = {};
            return i.start = function(i, s) {
                if (null !== i)
                    if ("string" == typeof i) {
                        if (!((i = i.toLowerCase()) in a.md.algorithms)) throw new Error('Unknown hash algorithm "' + i + '"');
                        t = a.md.algorithms[i].create()
                    } else t = i;
                if (null === s) s = e;
                else {
                    if ("string" == typeof s) s = a.util.createBuffer(s);
                    else if (a.util.isArray(s)) {
                        var o = s;
                        s = a.util.createBuffer();
                        for (var c = 0; c < o.length; ++c) s.putByte(o[c])
                    }
                    var u = s.length();
                    u > t.blockLength && (t.start(), t.update(s.bytes()), s = t.digest()), r = a.util.createBuffer(), n = a.util.createBuffer(), u = s.length();
                    for (var c = 0; c < u; ++c) {
                        var o = s.at(c);
                        r.putByte(54 ^ o), n.putByte(92 ^ o)
                    }
                    if (u < t.blockLength)
                        for (var o = t.blockLength - u, c = 0; c < o; ++c) r.putByte(54), n.putByte(92);
                    e = s, r = r.bytes(), n = n.bytes()
                }
                t.start(), t.update(r)
            }, i.update = function(e) {
                t.update(e)
            }, i.getMac = function() {
                var e = t.digest().bytes();
                return t.start(), t.update(n), t.update(e), t.digest()
            }, i.digest = i.getMac, i
        }
    }, function(e, t, r) {
        function a() {
            o = String.fromCharCode(128), o += i.util.fillString(String.fromCharCode(0), 64), c = !0
        }

        function n(e, t, r) {
            for (var a, n, i, s, o, c, u, l, p = r.length(); p >= 64;) {
                for (n = e.h0, i = e.h1, s = e.h2, o = e.h3, c = e.h4, l = 0; l < 16; ++l) a = r.getInt32(), t[l] = a, u = o ^ i & (s ^ o), a = (n << 5 | n >>> 27) + u + c + 1518500249 + a, c = o, o = s, s = (i << 30 | i >>> 2) >>> 0, i = n, n = a;
                for (; l < 20; ++l) a = t[l - 3] ^ t[l - 8] ^ t[l - 14] ^ t[l - 16], a = a << 1 | a >>> 31, t[l] = a, u = o ^ i & (s ^ o), a = (n << 5 | n >>> 27) + u + c + 1518500249 + a, c = o, o = s, s = (i << 30 | i >>> 2) >>> 0, i = n, n = a;
                for (; l < 32; ++l) a = t[l - 3] ^ t[l - 8] ^ t[l - 14] ^ t[l - 16], a = a << 1 | a >>> 31, t[l] = a, u = i ^ s ^ o, a = (n << 5 | n >>> 27) + u + c + 1859775393 + a, c = o, o = s, s = (i << 30 | i >>> 2) >>> 0, i = n, n = a;
                for (; l < 40; ++l) a = t[l - 6] ^ t[l - 16] ^ t[l - 28] ^ t[l - 32], a = a << 2 | a >>> 30, t[l] = a, u = i ^ s ^ o, a = (n << 5 | n >>> 27) + u + c + 1859775393 + a, c = o, o = s, s = (i << 30 | i >>> 2) >>> 0, i = n, n = a;
                for (; l < 60; ++l) a = t[l - 6] ^ t[l - 16] ^ t[l - 28] ^ t[l - 32], a = a << 2 | a >>> 30, t[l] = a, u = i & s | o & (i ^ s), a = (n << 5 | n >>> 27) + u + c + 2400959708 + a, c = o, o = s, s = (i << 30 | i >>> 2) >>> 0, i = n, n = a;
                for (; l < 80; ++l) a = t[l - 6] ^ t[l - 16] ^ t[l - 28] ^ t[l - 32], a = a << 2 | a >>> 30, t[l] = a, u = i ^ s ^ o, a = (n << 5 | n >>> 27) + u + c + 3395469782 + a, c = o, o = s, s = (i << 30 | i >>> 2) >>> 0, i = n, n = a;
                e.h0 = e.h0 + n | 0, e.h1 = e.h1 + i | 0, e.h2 = e.h2 + s | 0, e.h3 = e.h3 + o | 0, e.h4 = e.h4 + c | 0, p -= 64
            }
        }
        var i = r(0);
        r(4), r(1);
        var s = e.exports = i.sha1 = i.sha1 || {};
        i.md.sha1 = i.md.algorithms.sha1 = s, s.create = function() {
            c || a();
            var e = null,
                t = i.util.createBuffer(),
                r = new Array(80),
                s = {
                    algorithm: "sha1",
                    blockLength: 64,
                    digestLength: 20,
                    messageLength: 0,
                    fullMessageLength: null,
                    messageLengthSize: 8
                };
            return s.start = function() {
                s.messageLength = 0, s.fullMessageLength = s.messageLength64 = [];
                for (var r = s.messageLengthSize / 4, a = 0; a < r; ++a) s.fullMessageLength.push(0);
                return t = i.util.createBuffer(), e = {
                    h0: 1732584193,
                    h1: 4023233417,
                    h2: 2562383102,
                    h3: 271733878,
                    h4: 3285377520
                }, s
            }, s.start(), s.update = function(a, o) {
                "utf8" === o && (a = i.util.encodeUtf8(a));
                var c = a.length;
                s.messageLength += c, c = [c / 4294967296 >>> 0, c >>> 0];
                for (var u = s.fullMessageLength.length - 1; u >= 0; --u) s.fullMessageLength[u] += c[1], c[1] = c[0] + (s.fullMessageLength[u] / 4294967296 >>> 0), s.fullMessageLength[u] = s.fullMessageLength[u] >>> 0, c[0] = c[1] / 4294967296 >>> 0;
                return t.putBytes(a), n(e, r, t), (t.read > 2048 || 0 === t.length()) && t.compact(), s
            }, s.digest = function() {
                var a = i.util.createBuffer();
                a.putBytes(t.bytes());
                var c = s.fullMessageLength[s.fullMessageLength.length - 1] + s.messageLengthSize,
                    u = c & s.blockLength - 1;
                a.putBytes(o.substr(0, s.blockLength - u));
                for (var l, p, f = 8 * s.fullMessageLength[0], h = 0; h < s.fullMessageLength.length - 1; ++h) l = 8 * s.fullMessageLength[h + 1], p = l / 4294967296 >>> 0, f += p, a.putInt32(f >>> 0), f = l >>> 0;
                a.putInt32(f);
                var d = {
                    h0: e.h0,
                    h1: e.h1,
                    h2: e.h2,
                    h3: e.h3,
                    h4: e.h4
                };
                n(d, r, a);
                var y = i.util.createBuffer();
                return y.putInt32(d.h0), y.putInt32(d.h1), y.putInt32(d.h2), y.putInt32(d.h3), y.putInt32(d.h4), y
            }, s
        };
        var o = null,
            c = !1
    }, function(e, t, r) {
        function a(e, t) {
            var r = function() {
                return new o.des.Algorithm(e, t)
            };
            o.cipher.registerAlgorithm(e, r)
        }

        function n(e) {
            for (var t, r = [0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964], a = [0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697], n = [0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272], i = [0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144], s = [0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256], o = [0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488], c = [0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746], u = [0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568], l = [0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578], p = [0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488], f = [0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800], h = [0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744], d = [0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128], y = [0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261], g = e.length() > 8 ? 3 : 1, v = [], m = [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0], C = 0, E = 0; E < g; E++) {
                var S = e.getInt32(),
                    T = e.getInt32();
                t = 252645135 & (S >>> 4 ^ T), T ^= t, S ^= t << 4, t = 65535 & (T >>> -16 ^ S), S ^= t, T ^= t << -16, t = 858993459 & (S >>> 2 ^ T), T ^= t, S ^= t << 2, t = 65535 & (T >>> -16 ^ S), S ^= t, T ^= t << -16, t = 1431655765 & (S >>> 1 ^ T), T ^= t, S ^= t << 1, t = 16711935 & (T >>> 8 ^ S), S ^= t, T ^= t << 8, t = 1431655765 & (S >>> 1 ^ T), T ^= t, S ^= t << 1, t = S << 8 | T >>> 20 & 240, S = T << 24 | T << 8 & 16711680 | T >>> 8 & 65280 | T >>> 24 & 240, T = t;
                for (var I = 0; I < m.length; ++I) {
                    m[I] ? (S = S << 2 | S >>> 26, T = T << 2 | T >>> 26) : (S = S << 1 | S >>> 27, T = T << 1 | T >>> 27), S &= -15, T &= -15;
                    var b = r[S >>> 28] | a[S >>> 24 & 15] | n[S >>> 20 & 15] | i[S >>> 16 & 15] | s[S >>> 12 & 15] | o[S >>> 8 & 15] | c[S >>> 4 & 15],
                        A = u[T >>> 28] | l[T >>> 24 & 15] | p[T >>> 20 & 15] | f[T >>> 16 & 15] | h[T >>> 12 & 15] | d[T >>> 8 & 15] | y[T >>> 4 & 15];
                    t = 65535 & (A >>> 16 ^ b), v[C++] = b ^ t, v[C++] = A ^ t << 16
                }
            }
            return v
        }

        function i(e, t, r, a) {
            var n, i = 32 === e.length ? 3 : 9;
            n = 3 === i ? a ? [30, -2, -2] : [0, 32, 2] : a ? [94, 62, -2, 32, 64, 2, 30, -2, -2] : [0, 32, 2, 62, 30, -2, 64, 96, 2];
            var s, o = t[0],
                g = t[1];
            s = 252645135 & (o >>> 4 ^ g), g ^= s, o ^= s << 4, s = 65535 & (o >>> 16 ^ g), g ^= s, o ^= s << 16, s = 858993459 & (g >>> 2 ^ o), o ^= s, g ^= s << 2, s = 16711935 & (g >>> 8 ^ o), o ^= s, g ^= s << 8, s = 1431655765 & (o >>> 1 ^ g), g ^= s, o ^= s << 1, o = o << 1 | o >>> 31, g = g << 1 | g >>> 31;
            for (var v = 0; v < i; v += 3) {
                for (var m = n[v + 1], C = n[v + 2], E = n[v]; E != m; E += C) {
                    var S = g ^ e[E],
                        T = (g >>> 4 | g << 28) ^ e[E + 1];
                    s = o, o = g, g = s ^ (u[S >>> 24 & 63] | p[S >>> 16 & 63] | h[S >>> 8 & 63] | y[63 & S] | c[T >>> 24 & 63] | l[T >>> 16 & 63] | f[T >>> 8 & 63] | d[63 & T])
                }
                s = o, o = g, g = s
            }
            o = o >>> 1 | o << 31, g = g >>> 1 | g << 31, s = 1431655765 & (o >>> 1 ^ g), g ^= s, o ^= s << 1, s = 16711935 & (g >>> 8 ^ o), o ^= s, g ^= s << 8, s = 858993459 & (g >>> 2 ^ o), o ^= s, g ^= s << 2, s = 65535 & (o >>> 16 ^ g), g ^= s, o ^= s << 16, s = 252645135 & (o >>> 4 ^ g), g ^= s, o ^= s << 4, r[0] = o, r[1] = g
        }

        function s(e) {
            e = e || {};
            var t, r = (e.mode || "CBC").toUpperCase(),
                a = "DES-" + r;
            t = e.decrypt ? o.cipher.createDecipher(a, e.key) : o.cipher.createCipher(a, e.key);
            var n = t.start;
            return t.start = function(e, r) {
                var a = null;
                r instanceof o.util.ByteBuffer && (a = r, r = {}), r = r || {}, r.output = a, r.iv = e, n.call(t, r)
            }, t
        }
        var o = r(0);
        r(13), r(19), r(1), e.exports = o.des = o.des || {}, o.des.startEncrypting = function(e, t, r, a) {
            var n = s({
                key: e,
                output: r,
                decrypt: !1,
                mode: a || (null === t ? "ECB" : "CBC")
            });
            return n.start(t), n
        }, o.des.createEncryptionCipher = function(e, t) {
            return s({
                key: e,
                output: null,
                decrypt: !1,
                mode: t
            })
        }, o.des.startDecrypting = function(e, t, r, a) {
            var n = s({
                key: e,
                output: r,
                decrypt: !0,
                mode: a || (null === t ? "ECB" : "CBC")
            });
            return n.start(t), n
        }, o.des.createDecryptionCipher = function(e, t) {
            return s({
                key: e,
                output: null,
                decrypt: !0,
                mode: t
            })
        }, o.des.Algorithm = function(e, t) {
            var r = this;
            r.name = e, r.mode = new t({
                blockSize: 8,
                cipher: {
                    encrypt: function(e, t) {
                        return i(r._keys, e, t, !1)
                    },
                    decrypt: function(e, t) {
                        return i(r._keys, e, t, !0)
                    }
                }
            }), r._init = !1
        }, o.des.Algorithm.prototype.initialize = function(e) {
            if (!this._init) {
                var t = o.util.createBuffer(e.key);
                if (0 === this.name.indexOf("3DES") && 24 !== t.length()) throw new Error("Invalid Triple-DES key size: " + 8 * t.length());
                this._keys = n(t), this._init = !0
            }
        }, a("DES-ECB", o.cipher.modes.ecb), a("DES-CBC", o.cipher.modes.cbc), a("DES-CFB", o.cipher.modes.cfb), a("DES-OFB", o.cipher.modes.ofb), a("DES-CTR", o.cipher.modes.ctr), a("3DES-ECB", o.cipher.modes.ecb), a("3DES-CBC", o.cipher.modes.cbc), a("3DES-CFB", o.cipher.modes.cfb), a("3DES-OFB", o.cipher.modes.ofb), a("3DES-CTR", o.cipher.modes.ctr);
        var c = [16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756],
            u = [-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344],
            l = [520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584],
            p = [8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928],
            f = [256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080],
            h = [536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312],
            d = [2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154],
            y = [268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696]
    }, function(e, t, r) {
        function a(e, t, r) {
            var a = f.util.createBuffer(),
                n = Math.ceil(t.n.bitLength() / 8);
            if (e.length > n - 11) {
                var i = new Error("Message is too long for PKCS#1 v1.5 padding.");
                throw i.length = e.length, i.max = n - 11, i
            }
            a.putByte(0), a.putByte(r);
            var s, o = n - 3 - e.length;
            if (0 === r || 1 === r) {
                s = 0 === r ? 0 : 255;
                for (var c = 0; c < o; ++c) a.putByte(s)
            } else
                for (; o > 0;) {
                    for (var u = 0, l = f.random.getBytes(o), c = 0; c < o; ++c) s = l.charCodeAt(c), 0 === s ? ++u : a.putByte(s);
                    o = u
                }
            return a.putByte(0), a.putBytes(e), a
        }

        function n(e, t, r, a) {
            var n = Math.ceil(t.n.bitLength() / 8),
                i = f.util.createBuffer(e),
                s = i.getByte(),
                o = i.getByte();
            if (0 !== s || r && 0 !== o && 1 !== o || !r && 2 != o || r && 0 === o && void 0 === a) throw new Error("Encryption block is invalid.");
            var c = 0;
            if (0 === o) {
                c = n - 3 - a;
                for (var u = 0; u < c; ++u)
                    if (0 !== i.getByte()) throw new Error("Encryption block is invalid.")
            } else if (1 === o)
                for (c = 0; i.length() > 1;) {
                    if (255 !== i.getByte()) {
                        --i.read;
                        break
                    }++c
                } else if (2 === o)
                    for (c = 0; i.length() > 1;) {
                        if (0 === i.getByte()) {
                            --i.read;
                            break
                        }++c
                    }
                if (0 !== i.getByte() || c !== n - 3 - i.length()) throw new Error("Encryption block is invalid.");
            return i.getBytes()
        }

        function i(e, t, r) {
            function a() {
                n(e.pBits, function(t, a) {
                    return t ? r(t) : (e.p = a, null !== e.q ? i(t, e.q) : void n(e.qBits, i))
                })
            }

            function n(e, t) {
                f.prime.generateProbablePrime(e, s, t)
            }

            function i(t, s) {
                if (t) return r(t);
                if (e.q = s, e.p.compareTo(e.q) < 0) {
                    var o = e.p;
                    e.p = e.q, e.q = o
                }
                if (0 !== e.p.subtract(h.ONE).gcd(e.e).compareTo(h.ONE)) return e.p = null, void a();
                if (0 !== e.q.subtract(h.ONE).gcd(e.e).compareTo(h.ONE)) return e.q = null, void n(e.qBits, i);
                if (e.p1 = e.p.subtract(h.ONE), e.q1 = e.q.subtract(h.ONE), e.phi = e.p1.multiply(e.q1), 0 !== e.phi.gcd(e.e).compareTo(h.ONE)) return e.p = e.q = null, void a();
                if (e.n = e.p.multiply(e.q), e.n.bitLength() !== e.bits) return e.q = null, void n(e.qBits, i);
                var c = e.e.modInverse(e.phi);
                e.keys = {
                    privateKey: v.rsa.setPrivateKey(e.n, e.e, c, e.p, e.q, c.mod(e.p1), c.mod(e.q1), e.q.modInverse(e.p)),
                    publicKey: v.rsa.setPublicKey(e.n, e.e)
                }, r(null, e.keys)
            }
            "function" == typeof t && (r = t, t = {}), t = t || {};
            var s = {
                algorithm: {
                    name: t.algorithm || "PRIMEINC",
                    options: {
                        workers: t.workers || 2,
                        workLoad: t.workLoad || 100,
                        workerScript: t.workerScript
                    }
                }
            };
            "prng" in t && (s.prng = t.prng), a()
        }

        function s(e) {
            var t = e.toString(16);
            t[0] >= "8" && (t = "00" + t);
            var r = f.util.hexToBytes(t);
            return r.length > 1 && (0 === r.charCodeAt(0) && 0 == (128 & r.charCodeAt(1)) || 255 === r.charCodeAt(0) && 128 == (128 & r.charCodeAt(1))) ? r.substr(1) : r
        }

        function o(e) {
            return e <= 100 ? 27 : e <= 150 ? 18 : e <= 200 ? 15 : e <= 250 ? 12 : e <= 300 ? 9 : e <= 350 ? 8 : e <= 400 ? 7 : e <= 500 ? 6 : e <= 600 ? 5 : e <= 800 ? 4 : e <= 1250 ? 3 : 2
        }

        function c(e) {
            return f.util.isNodejs && "function" == typeof d[e]
        }

        function u(e) {
            return void 0 !== g.globalScope && "object" == typeof g.globalScope.crypto && "object" == typeof g.globalScope.crypto.subtle && "function" == typeof g.globalScope.crypto.subtle[e]
        }

        function l(e) {
            return void 0 !== g.globalScope && "object" == typeof g.globalScope.msCrypto && "object" == typeof g.globalScope.msCrypto.subtle && "function" == typeof g.globalScope.msCrypto.subtle[e]
        }

        function p(e) {
            for (var t = f.util.hexToBytes(e.toString(16)), r = new Uint8Array(t.length), a = 0; a < t.length; ++a) r[a] = t.charCodeAt(a);
            return r
        }
        var f = r(0);
        if (r(3), r(12), r(6), r(26), r(27), r(2), r(1), void 0 === h) var h = f.jsbn.BigInteger;
        var d = f.util.isNodejs ? r(16) : null,
            y = f.asn1,
            g = f.util;
        f.pki = f.pki || {}, e.exports = f.pki.rsa = f.rsa = f.rsa || {};
        var v = f.pki,
            m = [6, 4, 2, 4, 2, 4, 6, 2],
            C = {
                name: "PrivateKeyInfo",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "PrivateKeyInfo.version",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.INTEGER,
                    constructed: !1,
                    capture: "privateKeyVersion"
                }, {
                    name: "PrivateKeyInfo.privateKeyAlgorithm",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "AlgorithmIdentifier.algorithm",
                        tagClass: y.Class.UNIVERSAL,
                        type: y.Type.OID,
                        constructed: !1,
                        capture: "privateKeyOid"
                    }]
                }, {
                    name: "PrivateKeyInfo",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.OCTETSTRING,
                    constructed: !1,
                    capture: "privateKey"
                }]
            },
            E = {
                name: "RSAPrivateKey",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "RSAPrivateKey.version",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.INTEGER,
                    constructed: !1,
                    capture: "privateKeyVersion"
                }, {
                    name: "RSAPrivateKey.modulus",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.INTEGER,
                    constructed: !1,
                    capture: "privateKeyModulus"
                }, {
                    name: "RSAPrivateKey.publicExponent",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.INTEGER,
                    constructed: !1,
                    capture: "privateKeyPublicExponent"
                }, {
                    name: "RSAPrivateKey.privateExponent",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.INTEGER,
                    constructed: !1,
                    capture: "privateKeyPrivateExponent"
                }, {
                    name: "RSAPrivateKey.prime1",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.INTEGER,
                    constructed: !1,
                    capture: "privateKeyPrime1"
                }, {
                    name: "RSAPrivateKey.prime2",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.INTEGER,
                    constructed: !1,
                    capture: "privateKeyPrime2"
                }, {
                    name: "RSAPrivateKey.exponent1",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.INTEGER,
                    constructed: !1,
                    capture: "privateKeyExponent1"
                }, {
                    name: "RSAPrivateKey.exponent2",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.INTEGER,
                    constructed: !1,
                    capture: "privateKeyExponent2"
                }, {
                    name: "RSAPrivateKey.coefficient",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.INTEGER,
                    constructed: !1,
                    capture: "privateKeyCoefficient"
                }]
            },
            S = {
                name: "RSAPublicKey",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "RSAPublicKey.modulus",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.INTEGER,
                    constructed: !1,
                    capture: "publicKeyModulus"
                }, {
                    name: "RSAPublicKey.exponent",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.INTEGER,
                    constructed: !1,
                    capture: "publicKeyExponent"
                }]
            },
            T = f.pki.rsa.publicKeyValidator = {
                name: "SubjectPublicKeyInfo",
                tagClass: y.Class.UNIVERSAL,
                type: y.Type.SEQUENCE,
                constructed: !0,
                captureAsn1: "subjectPublicKeyInfo",
                value: [{
                    name: "SubjectPublicKeyInfo.AlgorithmIdentifier",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "AlgorithmIdentifier.algorithm",
                        tagClass: y.Class.UNIVERSAL,
                        type: y.Type.OID,
                        constructed: !1,
                        capture: "publicKeyOid"
                    }]
                }, {
                    name: "SubjectPublicKeyInfo.subjectPublicKey",
                    tagClass: y.Class.UNIVERSAL,
                    type: y.Type.BITSTRING,
                    constructed: !1,
                    value: [{
                        name: "SubjectPublicKeyInfo.subjectPublicKey.RSAPublicKey",
                        tagClass: y.Class.UNIVERSAL,
                        type: y.Type.SEQUENCE,
                        constructed: !0,
                        optional: !0,
                        captureAsn1: "rsaPublicKey"
                    }]
                }]
            },
            I = function(e) {
                var t;
                if (!(e.algorithm in v.oids)) {
                    var r = new Error("Unknown message digest algorithm.");
                    throw r.algorithm = e.algorithm, r
                }
                t = v.oids[e.algorithm];
                var a = y.oidToDer(t).getBytes(),
                    n = y.create(y.Class.UNIVERSAL, y.Type.SEQUENCE, !0, []),
                    i = y.create(y.Class.UNIVERSAL, y.Type.SEQUENCE, !0, []);
                i.value.push(y.create(y.Class.UNIVERSAL, y.Type.OID, !1, a)), i.value.push(y.create(y.Class.UNIVERSAL, y.Type.NULL, !1, ""));
                var s = y.create(y.Class.UNIVERSAL, y.Type.OCTETSTRING, !1, e.digest().getBytes());
                return n.value.push(i), n.value.push(s), y.toDer(n).getBytes()
            },
            b = function(e, t, r) {
                if (r) return e.modPow(t.e, t.n);
                if (!t.p || !t.q) return e.modPow(t.d, t.n);
                t.dP || (t.dP = t.d.mod(t.p.subtract(h.ONE))), t.dQ || (t.dQ = t.d.mod(t.q.subtract(h.ONE))), t.qInv || (t.qInv = t.q.modInverse(t.p));
                var a;
                do {
                    a = new h(f.util.bytesToHex(f.random.getBytes(t.n.bitLength() / 8)), 16)
                } while (a.compareTo(t.n) >= 0 || !a.gcd(t.n).equals(h.ONE));
                e = e.multiply(a.modPow(t.e, t.n)).mod(t.n);
                for (var n = e.mod(t.p).modPow(t.dP, t.p), i = e.mod(t.q).modPow(t.dQ, t.q); n.compareTo(i) < 0;) n = n.add(t.p);
                var s = n.subtract(i).multiply(t.qInv).mod(t.p).multiply(t.q).add(i);
                return s = s.multiply(a.modInverse(t.n)).mod(t.n)
            };
        v.rsa.encrypt = function(e, t, r) {
            var n, i = r,
                s = Math.ceil(t.n.bitLength() / 8);
            !1 !== r && !0 !== r ? (i = 2 === r, n = a(e, t, r)) : (n = f.util.createBuffer(), n.putBytes(e));
            for (var o = new h(n.toHex(), 16), c = b(o, t, i), u = c.toString(16), l = f.util.createBuffer(), p = s - Math.ceil(u.length / 2); p > 0;) l.putByte(0), --p;
            return l.putBytes(f.util.hexToBytes(u)), l.getBytes()
        }, v.rsa.decrypt = function(e, t, r, a) {
            var i = Math.ceil(t.n.bitLength() / 8);
            if (e.length !== i) {
                var s = new Error("Encrypted message length is invalid.");
                throw s.length = e.length, s.expected = i, s
            }
            var o = new h(f.util.createBuffer(e).toHex(), 16);
            if (o.compareTo(t.n) >= 0) throw new Error("Encrypted message is invalid.");
            for (var c = b(o, t, r), u = c.toString(16), l = f.util.createBuffer(), p = i - Math.ceil(u.length / 2); p > 0;) l.putByte(0), --p;
            return l.putBytes(f.util.hexToBytes(u)), !1 !== a ? n(l.getBytes(), t, r) : l.getBytes()
        }, v.rsa.createKeyPairGenerationState = function(e, t, r) {
            "string" == typeof e && (e = parseInt(e, 10)), e = e || 2048, r = r || {};
            var a, n = r.prng || f.random,
                i = {
                    nextBytes: function(e) {
                        for (var t = n.getBytesSync(e.length), r = 0; r < e.length; ++r) e[r] = t.charCodeAt(r)
                    }
                },
                s = r.algorithm || "PRIMEINC";
            if ("PRIMEINC" !== s) throw new Error("Invalid key generation algorithm: " + s);
            return a = {
                algorithm: s,
                state: 0,
                bits: e,
                rng: i,
                eInt: t || 65537,
                e: new h(null),
                p: null,
                q: null,
                qBits: e >> 1,
                pBits: e - (e >> 1),
                pqState: 0,
                num: null,
                keys: null
            }, a.e.fromInt(a.eInt), a
        }, v.rsa.stepKeyPairGenerationState = function(e, t) {
            "algorithm" in e || (e.algorithm = "PRIMEINC");
            var r = new h(null);
            r.fromInt(30);
            for (var a, n = 0, i = function(e, t) {
                    return e | t
                }, s = +new Date, c = 0; null === e.keys && (t <= 0 || c < t);) {
                if (0 === e.state) {
                    var u = null === e.p ? e.pBits : e.qBits,
                        l = u - 1;
                    0 === e.pqState ? (e.num = new h(u, e.rng), e.num.testBit(l) || e.num.bitwiseTo(h.ONE.shiftLeft(l), i, e.num), e.num.dAddOffset(31 - e.num.mod(r).byteValue(), 0), n = 0, ++e.pqState) : 1 === e.pqState ? e.num.bitLength() > u ? e.pqState = 0 : e.num.isProbablePrime(o(e.num.bitLength())) ? ++e.pqState : e.num.dAddOffset(m[n++ % 8], 0) : 2 === e.pqState ? e.pqState = 0 === e.num.subtract(h.ONE).gcd(e.e).compareTo(h.ONE) ? 3 : 0 : 3 === e.pqState && (e.pqState = 0, null === e.p ? e.p = e.num : e.q = e.num, null !== e.p && null !== e.q && ++e.state, e.num = null)
                } else if (1 === e.state) e.p.compareTo(e.q) < 0 && (e.num = e.p, e.p = e.q, e.q = e.num), ++e.state;
                else if (2 === e.state) e.p1 = e.p.subtract(h.ONE), e.q1 = e.q.subtract(h.ONE), e.phi = e.p1.multiply(e.q1), ++e.state;
                else if (3 === e.state) 0 === e.phi.gcd(e.e).compareTo(h.ONE) ? ++e.state : (e.p = null, e.q = null, e.state = 0);
                else if (4 === e.state) e.n = e.p.multiply(e.q), e.n.bitLength() === e.bits ? ++e.state : (e.q = null, e.state = 0);
                else if (5 === e.state) {
                    var p = e.e.modInverse(e.phi);
                    e.keys = {
                        privateKey: v.rsa.setPrivateKey(e.n, e.e, p, e.p, e.q, p.mod(e.p1), p.mod(e.q1), e.q.modInverse(e.p)),
                        publicKey: v.rsa.setPublicKey(e.n, e.e)
                    }
                }
                a = +new Date, c += a - s, s = a
            }
            return null !== e.keys
        }, v.rsa.generateKeyPair = function(e, t, r, a) {
            if (1 === arguments.length ? "object" == typeof e ? (r = e, e = void 0) : "function" == typeof e && (a = e, e = void 0) : 2 === arguments.length ? "number" == typeof e ? "function" == typeof t ? (a = t, t = void 0) : "number" != typeof t && (r = t, t = void 0) : (r = e, a = t, e = void 0, t = void 0) : 3 === arguments.length && ("number" == typeof t ? "function" == typeof r && (a = r, r = void 0) : (a = r, r = t, t = void 0)), r = r || {}, void 0 === e && (e = r.bits || 2048), void 0 === t && (t = r.e || 65537), !f.options.usePureJavaScript && !r.prng && e >= 256 && e <= 16384 && (65537 === t || 3 === t))
                if (a) {
                    if (c("generateKeyPair")) return d.generateKeyPair("rsa", {
                        modulusLength: e,
                        publicExponent: t,
                        publicKeyEncoding: {
                            type: "spki",
                            format: "pem"
                        },
                        privateKeyEncoding: {
                            type: "pkcs8",
                            format: "pem"
                        }
                    }, function(e, t, r) {
                        if (e) return a(e);
                        a(null, {
                            privateKey: v.privateKeyFromPem(r),
                            publicKey: v.publicKeyFromPem(t)
                        })
                    });
                    if (u("generateKey") && u("exportKey")) return g.globalScope.crypto.subtle.generateKey({
                        name: "RSASSA-PKCS1-v1_5",
                        modulusLength: e,
                        publicExponent: p(t),
                        hash: {
                            name: "SHA-256"
                        }
                    }, !0, ["sign", "verify"]).then(function(e) {
                        return g.globalScope.crypto.subtle.exportKey("pkcs8", e.privateKey)
                    }).then(void 0, function(e) {
                        a(e)
                    }).then(function(e) {
                        if (e) {
                            var t = v.privateKeyFromAsn1(y.fromDer(f.util.createBuffer(e)));
                            a(null, {
                                privateKey: t,
                                publicKey: v.setRsaPublicKey(t.n, t.e)
                            })
                        }
                    });
                    if (l("generateKey") && l("exportKey")) {
                        var n = g.globalScope.msCrypto.subtle.generateKey({
                            name: "RSASSA-PKCS1-v1_5",
                            modulusLength: e,
                            publicExponent: p(t),
                            hash: {
                                name: "SHA-256"
                            }
                        }, !0, ["sign", "verify"]);
                        return n.oncomplete = function(e) {
                            var t = e.target.result,
                                r = g.globalScope.msCrypto.subtle.exportKey("pkcs8", t.privateKey);
                            r.oncomplete = function(e) {
                                var t = e.target.result,
                                    r = v.privateKeyFromAsn1(y.fromDer(f.util.createBuffer(t)));
                                a(null, {
                                    privateKey: r,
                                    publicKey: v.setRsaPublicKey(r.n, r.e)
                                })
                            }, r.onerror = function(e) {
                                a(e)
                            }
                        }, void(n.onerror = function(e) {
                            a(e)
                        })
                    }
                } else if (c("generateKeyPairSync")) {
                var s = d.generateKeyPairSync("rsa", {
                    modulusLength: e,
                    publicExponent: t,
                    publicKeyEncoding: {
                        type: "spki",
                        format: "pem"
                    },
                    privateKeyEncoding: {
                        type: "pkcs8",
                        format: "pem"
                    }
                });
                return {
                    privateKey: v.privateKeyFromPem(s.privateKey),
                    publicKey: v.publicKeyFromPem(s.publicKey)
                }
            }
            var o = v.rsa.createKeyPairGenerationState(e, t, r);
            if (!a) return v.rsa.stepKeyPairGenerationState(o, 0), o.keys;
            i(o, r, a)
        }, v.setRsaPublicKey = v.rsa.setPublicKey = function(e, t) {
            var r = {
                n: e,
                e: t
            };
            return r.encrypt = function(e, t, n) {
                if ("string" == typeof t ? t = t.toUpperCase() : void 0 === t && (t = "RSAES-PKCS1-V1_5"), "RSAES-PKCS1-V1_5" === t) t = {
                    encode: function(e, t, r) {
                        return a(e, t, 2).getBytes()
                    }
                };
                else if ("RSA-OAEP" === t || "RSAES-OAEP" === t) t = {
                    encode: function(e, t) {
                        return f.pkcs1.encode_rsa_oaep(t, e, n)
                    }
                };
                else if (-1 !== ["RAW", "NONE", "NULL", null].indexOf(t)) t = {
                    encode: function(e) {
                        return e
                    }
                };
                else if ("string" == typeof t) throw new Error('Unsupported encryption scheme: "' + t + '".');
                var i = t.encode(e, r, !0);
                return v.rsa.encrypt(i, r, !0)
            }, r.verify = function(e, t, a) {
                "string" == typeof a ? a = a.toUpperCase() : void 0 === a && (a = "RSASSA-PKCS1-V1_5"), "RSASSA-PKCS1-V1_5" === a ? a = {
                    verify: function(e, t) {
                        return t = n(t, r, !0), e === y.fromDer(t).value[1].value
                    }
                } : "NONE" !== a && "NULL" !== a && null !== a || (a = {
                    verify: function(e, t) {
                        return t = n(t, r, !0), e === t
                    }
                });
                var i = v.rsa.decrypt(t, r, !0, !1);
                return a.verify(e, i, r.n.bitLength())
            }, r
        }, v.setRsaPrivateKey = v.rsa.setPrivateKey = function(e, t, r, a, i, s, o, c) {
            var u = {
                n: e,
                e: t,
                d: r,
                p: a,
                q: i,
                dP: s,
                dQ: o,
                qInv: c
            };
            return u.decrypt = function(e, t, r) {
                "string" == typeof t ? t = t.toUpperCase() : void 0 === t && (t = "RSAES-PKCS1-V1_5");
                var a = v.rsa.decrypt(e, u, !1, !1);
                if ("RSAES-PKCS1-V1_5" === t) t = {
                    decode: n
                };
                else if ("RSA-OAEP" === t || "RSAES-OAEP" === t) t = {
                    decode: function(e, t) {
                        return f.pkcs1.decode_rsa_oaep(t, e, r)
                    }
                };
                else {
                    if (-1 === ["RAW", "NONE", "NULL", null].indexOf(t)) throw new Error('Unsupported encryption scheme: "' + t + '".');
                    t = {
                        decode: function(e) {
                            return e
                        }
                    }
                }
                return t.decode(a, u, !1)
            }, u.sign = function(e, t) {
                var r = !1;
                "string" == typeof t && (t = t.toUpperCase()), void 0 === t || "RSASSA-PKCS1-V1_5" === t ? (t = {
                    encode: I
                }, r = 1) : "NONE" !== t && "NULL" !== t && null !== t || (t = {
                    encode: function() {
                        return e
                    }
                }, r = 1);
                var a = t.encode(e, u.n.bitLength());
                return v.rsa.encrypt(a, u, r)
            }, u
        }, v.wrapRsaPrivateKey = function(e) {
            return y.create(y.Class.UNIVERSAL, y.Type.SEQUENCE, !0, [y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, y.integerToDer(0).getBytes()), y.create(y.Class.UNIVERSAL, y.Type.SEQUENCE, !0, [y.create(y.Class.UNIVERSAL, y.Type.OID, !1, y.oidToDer(v.oids.rsaEncryption).getBytes()), y.create(y.Class.UNIVERSAL, y.Type.NULL, !1, "")]), y.create(y.Class.UNIVERSAL, y.Type.OCTETSTRING, !1, y.toDer(e).getBytes())])
        }, v.privateKeyFromAsn1 = function(e) {
            var t = {},
                r = [];
            if (y.validate(e, C, t, r) && (e = y.fromDer(f.util.createBuffer(t.privateKey))), t = {}, r = [], !y.validate(e, E, t, r)) {
                var a = new Error("Cannot read private key. ASN.1 object does not contain an RSAPrivateKey.");
                throw a.errors = r, a
            }
            var n, i, s, o, c, u, l, p;
            return n = f.util.createBuffer(t.privateKeyModulus).toHex(), i = f.util.createBuffer(t.privateKeyPublicExponent).toHex(), s = f.util.createBuffer(t.privateKeyPrivateExponent).toHex(), o = f.util.createBuffer(t.privateKeyPrime1).toHex(), c = f.util.createBuffer(t.privateKeyPrime2).toHex(), u = f.util.createBuffer(t.privateKeyExponent1).toHex(), l = f.util.createBuffer(t.privateKeyExponent2).toHex(), p = f.util.createBuffer(t.privateKeyCoefficient).toHex(), v.setRsaPrivateKey(new h(n, 16), new h(i, 16), new h(s, 16), new h(o, 16), new h(c, 16), new h(u, 16), new h(l, 16), new h(p, 16))
        }, v.privateKeyToAsn1 = v.privateKeyToRSAPrivateKey = function(e) {
            return y.create(y.Class.UNIVERSAL, y.Type.SEQUENCE, !0, [y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, y.integerToDer(0).getBytes()), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(e.n)), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(e.e)), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(e.d)), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(e.p)), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(e.q)), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(e.dP)), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(e.dQ)), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(e.qInv))])
        }, v.publicKeyFromAsn1 = function(e) {
            var t = {},
                r = [];
            if (y.validate(e, T, t, r)) {
                var a = y.derToOid(t.publicKeyOid);
                if (a !== v.oids.rsaEncryption) {
                    var n = new Error("Cannot read public key. Unknown OID.");
                    throw n.oid = a, n
                }
                e = t.rsaPublicKey
            }
            if (r = [], !y.validate(e, S, t, r)) {
                var n = new Error("Cannot read public key. ASN.1 object does not contain an RSAPublicKey.");
                throw n.errors = r, n
            }
            var i = f.util.createBuffer(t.publicKeyModulus).toHex(),
                s = f.util.createBuffer(t.publicKeyExponent).toHex();
            return v.setRsaPublicKey(new h(i, 16), new h(s, 16))
        }, v.publicKeyToAsn1 = v.publicKeyToSubjectPublicKeyInfo = function(e) {
            return y.create(y.Class.UNIVERSAL, y.Type.SEQUENCE, !0, [y.create(y.Class.UNIVERSAL, y.Type.SEQUENCE, !0, [y.create(y.Class.UNIVERSAL, y.Type.OID, !1, y.oidToDer(v.oids.rsaEncryption).getBytes()), y.create(y.Class.UNIVERSAL, y.Type.NULL, !1, "")]), y.create(y.Class.UNIVERSAL, y.Type.BITSTRING, !1, [v.publicKeyToRSAPublicKey(e)])])
        }, v.publicKeyToRSAPublicKey = function(e) {
            return y.create(y.Class.UNIVERSAL, y.Type.SEQUENCE, !0, [y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(e.n)), y.create(y.Class.UNIVERSAL, y.Type.INTEGER, !1, s(e.e))])
        }
    }, function(e, t, r) {
        function a(e, t, r) {
            this.data = [], null != e && ("number" == typeof e ? this.fromNumber(e, t, r) : null == t && "string" != typeof e ? this.fromString(e, 256) : this.fromString(e, t))
        }

        function n() {
            return new a(null)
        }

        function i(e, t, r, a, n, i) {
            for (; --i >= 0;) {
                var s = t * this.data[e++] + r.data[a] + n;
                n = Math.floor(s / 67108864), r.data[a++] = 67108863 & s
            }
            return n
        }

        function s(e, t, r, a, n, i) {
            for (var s = 32767 & t, o = t >> 15; --i >= 0;) {
                var c = 32767 & this.data[e],
                    u = this.data[e++] >> 15,
                    l = o * c + u * s;
                c = s * c + ((32767 & l) << 15) + r.data[a] + (1073741823 & n), n = (c >>> 30) + (l >>> 15) + o * u + (n >>> 30), r.data[a++] = 1073741823 & c
            }
            return n
        }

        function o(e, t, r, a, n, i) {
            for (var s = 16383 & t, o = t >> 14; --i >= 0;) {
                var c = 16383 & this.data[e],
                    u = this.data[e++] >> 14,
                    l = o * c + u * s;
                c = s * c + ((16383 & l) << 14) + r.data[a] + n, n = (c >> 28) + (l >> 14) + o * u, r.data[a++] = 268435455 & c
            }
            return n
        }

        function c(e) {
            return it.charAt(e)
        }

        function u(e, t) {
            var r = st[e.charCodeAt(t)];
            return null == r ? -1 : r
        }

        function l(e) {
            for (var t = this.t - 1; t >= 0; --t) e.data[t] = this.data[t];
            e.t = this.t, e.s = this.s
        }

        function p(e) {
            this.t = 1, this.s = e < 0 ? -1 : 0, e > 0 ? this.data[0] = e : e < -1 ? this.data[0] = e + this.DV : this.t = 0
        }

        function f(e) {
            var t = n();
            return t.fromInt(e), t
        }

        function h(e, t) {
            var r;
            if (16 == t) r = 4;
            else if (8 == t) r = 3;
            else if (256 == t) r = 8;
            else if (2 == t) r = 1;
            else if (32 == t) r = 5;
            else {
                if (4 != t) return void this.fromRadix(e, t);
                r = 2
            }
            this.t = 0, this.s = 0;
            for (var n = e.length, i = !1, s = 0; --n >= 0;) {
                var o = 8 == r ? 255 & e[n] : u(e, n);
                o < 0 ? "-" == e.charAt(n) && (i = !0) : (i = !1, 0 == s ? this.data[this.t++] = o : s + r > this.DB ? (this.data[this.t - 1] |= (o & (1 << this.DB - s) - 1) << s, this.data[this.t++] = o >> this.DB - s) : this.data[this.t - 1] |= o << s, (s += r) >= this.DB && (s -= this.DB))
            }
            8 == r && 0 != (128 & e[0]) && (this.s = -1, s > 0 && (this.data[this.t - 1] |= (1 << this.DB - s) - 1 << s)), this.clamp(), i && a.ZERO.subTo(this, this)
        }

        function d() {
            for (var e = this.s & this.DM; this.t > 0 && this.data[this.t - 1] == e;) --this.t
        }

        function y(e) {
            if (this.s < 0) return "-" + this.negate().toString(e);
            var t;
            if (16 == e) t = 4;
            else if (8 == e) t = 3;
            else if (2 == e) t = 1;
            else if (32 == e) t = 5;
            else {
                if (4 != e) return this.toRadix(e);
                t = 2
            }
            var r, a = (1 << t) - 1,
                n = !1,
                i = "",
                s = this.t,
                o = this.DB - s * this.DB % t;
            if (s-- > 0)
                for (o < this.DB && (r = this.data[s] >> o) > 0 && (n = !0, i = c(r)); s >= 0;) o < t ? (r = (this.data[s] & (1 << o) - 1) << t - o, r |= this.data[--s] >> (o += this.DB - t)) : (r = this.data[s] >> (o -= t) & a, o <= 0 && (o += this.DB, --s)), r > 0 && (n = !0), n && (i += c(r));
            return n ? i : "0"
        }

        function g() {
            var e = n();
            return a.ZERO.subTo(this, e), e
        }

        function v() {
            return this.s < 0 ? this.negate() : this
        }

        function m(e) {
            var t = this.s - e.s;
            if (0 != t) return t;
            var r = this.t;
            if (0 != (t = r - e.t)) return this.s < 0 ? -t : t;
            for (; --r >= 0;)
                if (0 != (t = this.data[r] - e.data[r])) return t;
            return 0
        }

        function C(e) {
            var t, r = 1;
            return 0 != (t = e >>> 16) && (e = t, r += 16), 0 != (t = e >> 8) && (e = t, r += 8), 0 != (t = e >> 4) && (e = t, r += 4), 0 != (t = e >> 2) && (e = t, r += 2), 0 != (t = e >> 1) && (e = t, r += 1), r
        }

        function E() {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + C(this.data[this.t - 1] ^ this.s & this.DM)
        }

        function S(e, t) {
            var r;
            for (r = this.t - 1; r >= 0; --r) t.data[r + e] = this.data[r];
            for (r = e - 1; r >= 0; --r) t.data[r] = 0;
            t.t = this.t + e, t.s = this.s
        }

        function T(e, t) {
            for (var r = e; r < this.t; ++r) t.data[r - e] = this.data[r];
            t.t = Math.max(this.t - e, 0), t.s = this.s
        }

        function I(e, t) {
            var r, a = e % this.DB,
                n = this.DB - a,
                i = (1 << n) - 1,
                s = Math.floor(e / this.DB),
                o = this.s << a & this.DM;
            for (r = this.t - 1; r >= 0; --r) t.data[r + s + 1] = this.data[r] >> n | o, o = (this.data[r] & i) << a;
            for (r = s - 1; r >= 0; --r) t.data[r] = 0;
            t.data[s] = o, t.t = this.t + s + 1, t.s = this.s, t.clamp()
        }

        function b(e, t) {
            t.s = this.s;
            var r = Math.floor(e / this.DB);
            if (r >= this.t) return void(t.t = 0);
            var a = e % this.DB,
                n = this.DB - a,
                i = (1 << a) - 1;
            t.data[0] = this.data[r] >> a;
            for (var s = r + 1; s < this.t; ++s) t.data[s - r - 1] |= (this.data[s] & i) << n, t.data[s - r] = this.data[s] >> a;
            a > 0 && (t.data[this.t - r - 1] |= (this.s & i) << n), t.t = this.t - r, t.clamp()
        }

        function A(e, t) {
            for (var r = 0, a = 0, n = Math.min(e.t, this.t); r < n;) a += this.data[r] - e.data[r], t.data[r++] = a & this.DM, a >>= this.DB;
            if (e.t < this.t) {
                for (a -= e.s; r < this.t;) a += this.data[r], t.data[r++] = a & this.DM, a >>= this.DB;
                a += this.s
            } else {
                for (a += this.s; r < e.t;) a -= e.data[r], t.data[r++] = a & this.DM, a >>= this.DB;
                a -= e.s
            }
            t.s = a < 0 ? -1 : 0, a < -1 ? t.data[r++] = this.DV + a : a > 0 && (t.data[r++] = a), t.t = r, t.clamp()
        }

        function B(e, t) {
            var r = this.abs(),
                n = e.abs(),
                i = r.t;
            for (t.t = i + n.t; --i >= 0;) t.data[i] = 0;
            for (i = 0; i < n.t; ++i) t.data[i + r.t] = r.am(0, n.data[i], t, i, 0, r.t);
            t.s = 0, t.clamp(), this.s != e.s && a.ZERO.subTo(t, t)
        }

        function N(e) {
            for (var t = this.abs(), r = e.t = 2 * t.t; --r >= 0;) e.data[r] = 0;
            for (r = 0; r < t.t - 1; ++r) {
                var a = t.am(r, t.data[r], e, 2 * r, 0, 1);
                (e.data[r + t.t] += t.am(r + 1, 2 * t.data[r], e, 2 * r + 1, a, t.t - r - 1)) >= t.DV && (e.data[r + t.t] -= t.DV, e.data[r + t.t + 1] = 1)
            }
            e.t > 0 && (e.data[e.t - 1] += t.am(r, t.data[r], e, 2 * r, 0, 1)), e.s = 0, e.clamp()
        }

        function k(e, t, r) {
            var i = e.abs();
            if (!(i.t <= 0)) {
                var s = this.abs();
                if (s.t < i.t) return null != t && t.fromInt(0), void(null != r && this.copyTo(r));
                null == r && (r = n());
                var o = n(),
                    c = this.s,
                    u = e.s,
                    l = this.DB - C(i.data[i.t - 1]);
                l > 0 ? (i.lShiftTo(l, o), s.lShiftTo(l, r)) : (i.copyTo(o), s.copyTo(r));
                var p = o.t,
                    f = o.data[p - 1];
                if (0 != f) {
                    var h = f * (1 << this.F1) + (p > 1 ? o.data[p - 2] >> this.F2 : 0),
                        d = this.FV / h,
                        y = (1 << this.F1) / h,
                        g = 1 << this.F2,
                        v = r.t,
                        m = v - p,
                        E = null == t ? n() : t;
                    for (o.dlShiftTo(m, E), r.compareTo(E) >= 0 && (r.data[r.t++] = 1, r.subTo(E, r)), a.ONE.dlShiftTo(p, E), E.subTo(o, o); o.t < p;) o.data[o.t++] = 0;
                    for (; --m >= 0;) {
                        var S = r.data[--v] == f ? this.DM : Math.floor(r.data[v] * d + (r.data[v - 1] + g) * y);
                        if ((r.data[v] += o.am(0, S, r, m, 0, p)) < S)
                            for (o.dlShiftTo(m, E), r.subTo(E, r); r.data[v] < --S;) r.subTo(E, r)
                    }
                    null != t && (r.drShiftTo(p, t), c != u && a.ZERO.subTo(t, t)), r.t = p, r.clamp(), l > 0 && r.rShiftTo(l, r), c < 0 && a.ZERO.subTo(r, r)
                }
            }
        }

        function w(e) {
            var t = n();
            return this.abs().divRemTo(e, null, t), this.s < 0 && t.compareTo(a.ZERO) > 0 && e.subTo(t, t), t
        }

        function R(e) {
            this.m = e
        }

        function _(e) {
            return e.s < 0 || e.compareTo(this.m) >= 0 ? e.mod(this.m) : e
        }

        function L(e) {
            return e
        }

        function U(e) {
            e.divRemTo(this.m, null, e)
        }

        function D(e, t, r) {
            e.multiplyTo(t, r), this.reduce(r)
        }

        function P(e, t) {
            e.squareTo(t), this.reduce(t)
        }

        function V() {
            if (this.t < 1) return 0;
            var e = this.data[0];
            if (0 == (1 & e)) return 0;
            var t = 3 & e;
            return t = t * (2 - (15 & e) * t) & 15, t = t * (2 - (255 & e) * t) & 255, t = t * (2 - ((65535 & e) * t & 65535)) & 65535, t = t * (2 - e * t % this.DV) % this.DV, t > 0 ? this.DV - t : -t
        }

        function O(e) {
            this.m = e, this.mp = e.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << e.DB - 15) - 1, this.mt2 = 2 * e.t
        }

        function K(e) {
            var t = n();
            return e.abs().dlShiftTo(this.m.t, t), t.divRemTo(this.m, null, t), e.s < 0 && t.compareTo(a.ZERO) > 0 && this.m.subTo(t, t), t
        }

        function x(e) {
            var t = n();
            return e.copyTo(t), this.reduce(t), t
        }

        function M(e) {
            for (; e.t <= this.mt2;) e.data[e.t++] = 0;
            for (var t = 0; t < this.m.t; ++t) {
                var r = 32767 & e.data[t],
                    a = r * this.mpl + ((r * this.mph + (e.data[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
                for (r = t + this.m.t, e.data[r] += this.m.am(0, a, e, t, 0, this.m.t); e.data[r] >= e.DV;) e.data[r] -= e.DV, e.data[++r]++
            }
            e.clamp(), e.drShiftTo(this.m.t, e), e.compareTo(this.m) >= 0 && e.subTo(this.m, e)
        }

        function F(e, t) {
            e.squareTo(t), this.reduce(t)
        }

        function q(e, t, r) {
            e.multiplyTo(t, r), this.reduce(r)
        }

        function j() {
            return 0 == (this.t > 0 ? 1 & this.data[0] : this.s)
        }

        function G(e, t) {
            if (e > 4294967295 || e < 1) return a.ONE;
            var r = n(),
                i = n(),
                s = t.convert(this),
                o = C(e) - 1;
            for (s.copyTo(r); --o >= 0;)
                if (t.sqrTo(r, i), (e & 1 << o) > 0) t.mulTo(i, s, r);
                else {
                    var c = r;
                    r = i, i = c
                }
            return t.revert(r)
        }

        function H(e, t) {
            var r;
            return r = e < 256 || t.isEven() ? new R(t) : new O(t), this.exp(e, r)
        }

        function Q() {
            var e = n();
            return this.copyTo(e), e
        }

        function z() {
            if (this.s < 0) {
                if (1 == this.t) return this.data[0] - this.DV;
                if (0 == this.t) return -1
            } else {
                if (1 == this.t) return this.data[0];
                if (0 == this.t) return 0
            }
            return (this.data[1] & (1 << 32 - this.DB) - 1) << this.DB | this.data[0]
        }

        function W() {
            return 0 == this.t ? this.s : this.data[0] << 24 >> 24
        }

        function Y() {
            return 0 == this.t ? this.s : this.data[0] << 16 >> 16
        }

        function X(e) {
            return Math.floor(Math.LN2 * this.DB / Math.log(e))
        }

        function Z() {
            return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this.data[0] <= 0 ? 0 : 1
        }

        function J(e) {
            if (null == e && (e = 10), 0 == this.signum() || e < 2 || e > 36) return "0";
            var t = this.chunkSize(e),
                r = Math.pow(e, t),
                a = f(r),
                i = n(),
                s = n(),
                o = "";
            for (this.divRemTo(a, i, s); i.signum() > 0;) o = (r + s.intValue()).toString(e).substr(1) + o, i.divRemTo(a, i, s);
            return s.intValue().toString(e) + o
        }

        function $(e, t) {
            this.fromInt(0), null == t && (t = 10);
            for (var r = this.chunkSize(t), n = Math.pow(t, r), i = !1, s = 0, o = 0, c = 0; c < e.length; ++c) {
                var l = u(e, c);
                l < 0 ? "-" == e.charAt(c) && 0 == this.signum() && (i = !0) : (o = t * o + l, ++s >= r && (this.dMultiply(n), this.dAddOffset(o, 0), s = 0, o = 0))
            }
            s > 0 && (this.dMultiply(Math.pow(t, s)), this.dAddOffset(o, 0)), i && a.ZERO.subTo(this, this)
        }

        function ee(e, t, r) {
            if ("number" == typeof t)
                if (e < 2) this.fromInt(1);
                else
                    for (this.fromNumber(e, r), this.testBit(e - 1) || this.bitwiseTo(a.ONE.shiftLeft(e - 1), ce, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(t);) this.dAddOffset(2, 0), this.bitLength() > e && this.subTo(a.ONE.shiftLeft(e - 1), this);
            else {
                var n = new Array,
                    i = 7 & e;
                n.length = 1 + (e >> 3), t.nextBytes(n), i > 0 ? n[0] &= (1 << i) - 1 : n[0] = 0, this.fromString(n, 256)
            }
        }

        function te() {
            var e = this.t,
                t = new Array;
            t[0] = this.s;
            var r, a = this.DB - e * this.DB % 8,
                n = 0;
            if (e-- > 0)
                for (a < this.DB && (r = this.data[e] >> a) != (this.s & this.DM) >> a && (t[n++] = r | this.s << this.DB - a); e >= 0;) a < 8 ? (r = (this.data[e] & (1 << a) - 1) << 8 - a, r |= this.data[--e] >> (a += this.DB - 8)) : (r = this.data[e] >> (a -= 8) & 255, a <= 0 && (a += this.DB, --e)), 0 != (128 & r) && (r |= -256), 0 == n && (128 & this.s) != (128 & r) && ++n, (n > 0 || r != this.s) && (t[n++] = r);
            return t
        }

        function re(e) {
            return 0 == this.compareTo(e)
        }

        function ae(e) {
            return this.compareTo(e) < 0 ? this : e
        }

        function ne(e) {
            return this.compareTo(e) > 0 ? this : e
        }

        function ie(e, t, r) {
            var a, n, i = Math.min(e.t, this.t);
            for (a = 0; a < i; ++a) r.data[a] = t(this.data[a], e.data[a]);
            if (e.t < this.t) {
                for (n = e.s & this.DM, a = i; a < this.t; ++a) r.data[a] = t(this.data[a], n);
                r.t = this.t
            } else {
                for (n = this.s & this.DM, a = i; a < e.t; ++a) r.data[a] = t(n, e.data[a]);
                r.t = e.t
            }
            r.s = t(this.s, e.s), r.clamp()
        }

        function se(e, t) {
            return e & t
        }

        function oe(e) {
            var t = n();
            return this.bitwiseTo(e, se, t), t
        }

        function ce(e, t) {
            return e | t
        }

        function ue(e) {
            var t = n();
            return this.bitwiseTo(e, ce, t), t
        }

        function le(e, t) {
            return e ^ t
        }

        function pe(e) {
            var t = n();
            return this.bitwiseTo(e, le, t), t
        }

        function fe(e, t) {
            return e & ~t
        }

        function he(e) {
            var t = n();
            return this.bitwiseTo(e, fe, t), t
        }

        function de() {
            for (var e = n(), t = 0; t < this.t; ++t) e.data[t] = this.DM & ~this.data[t];
            return e.t = this.t, e.s = ~this.s, e
        }

        function ye(e) {
            var t = n();
            return e < 0 ? this.rShiftTo(-e, t) : this.lShiftTo(e, t), t
        }

        function ge(e) {
            var t = n();
            return e < 0 ? this.lShiftTo(-e, t) : this.rShiftTo(e, t), t
        }

        function ve(e) {
            if (0 == e) return -1;
            var t = 0;
            return 0 == (65535 & e) && (e >>= 16, t += 16), 0 == (255 & e) && (e >>= 8, t += 8), 0 == (15 & e) && (e >>= 4, t += 4), 0 == (3 & e) && (e >>= 2, t += 2), 0 == (1 & e) && ++t, t
        }

        function me() {
            for (var e = 0; e < this.t; ++e)
                if (0 != this.data[e]) return e * this.DB + ve(this.data[e]);
            return this.s < 0 ? this.t * this.DB : -1
        }

        function Ce(e) {
            for (var t = 0; 0 != e;) e &= e - 1, ++t;
            return t
        }

        function Ee() {
            for (var e = 0, t = this.s & this.DM, r = 0; r < this.t; ++r) e += Ce(this.data[r] ^ t);
            return e
        }

        function Se(e) {
            var t = Math.floor(e / this.DB);
            return t >= this.t ? 0 != this.s : 0 != (this.data[t] & 1 << e % this.DB)
        }

        function Te(e, t) {
            var r = a.ONE.shiftLeft(e);
            return this.bitwiseTo(r, t, r), r
        }

        function Ie(e) {
            return this.changeBit(e, ce)
        }

        function be(e) {
            return this.changeBit(e, fe)
        }

        function Ae(e) {
            return this.changeBit(e, le)
        }

        function Be(e, t) {
            for (var r = 0, a = 0, n = Math.min(e.t, this.t); r < n;) a += this.data[r] + e.data[r], t.data[r++] = a & this.DM, a >>= this.DB;
            if (e.t < this.t) {
                for (a += e.s; r < this.t;) a += this.data[r], t.data[r++] = a & this.DM, a >>= this.DB;
                a += this.s
            } else {
                for (a += this.s; r < e.t;) a += e.data[r], t.data[r++] = a & this.DM, a >>= this.DB;
                a += e.s
            }
            t.s = a < 0 ? -1 : 0, a > 0 ? t.data[r++] = a : a < -1 && (t.data[r++] = this.DV + a), t.t = r, t.clamp()
        }

        function Ne(e) {
            var t = n();
            return this.addTo(e, t), t
        }

        function ke(e) {
            var t = n();
            return this.subTo(e, t), t
        }

        function we(e) {
            var t = n();
            return this.multiplyTo(e, t), t
        }

        function Re(e) {
            var t = n();
            return this.divRemTo(e, t, null), t
        }

        function _e(e) {
            var t = n();
            return this.divRemTo(e, null, t), t
        }

        function Le(e) {
            var t = n(),
                r = n();
            return this.divRemTo(e, t, r), new Array(t, r)
        }

        function Ue(e) {
            this.data[this.t] = this.am(0, e - 1, this, 0, 0, this.t), ++this.t, this.clamp()
        }

        function De(e, t) {
            if (0 != e) {
                for (; this.t <= t;) this.data[this.t++] = 0;
                for (this.data[t] += e; this.data[t] >= this.DV;) this.data[t] -= this.DV, ++t >= this.t && (this.data[this.t++] = 0), ++this.data[t]
            }
        }

        function Pe() {}

        function Ve(e) {
            return e
        }

        function Oe(e, t, r) {
            e.multiplyTo(t, r)
        }

        function Ke(e, t) {
            e.squareTo(t)
        }

        function xe(e) {
            return this.exp(e, new Pe)
        }

        function Me(e, t, r) {
            var a = Math.min(this.t + e.t, t);
            for (r.s = 0, r.t = a; a > 0;) r.data[--a] = 0;
            var n;
            for (n = r.t - this.t; a < n; ++a) r.data[a + this.t] = this.am(0, e.data[a], r, a, 0, this.t);
            for (n = Math.min(e.t, t); a < n; ++a) this.am(0, e.data[a], r, a, 0, t - a);
            r.clamp()
        }

        function Fe(e, t, r) {
            --t;
            var a = r.t = this.t + e.t - t;
            for (r.s = 0; --a >= 0;) r.data[a] = 0;
            for (a = Math.max(t - this.t, 0); a < e.t; ++a) r.data[this.t + a - t] = this.am(t - a, e.data[a], r, 0, 0, this.t + a - t);
            r.clamp(), r.drShiftTo(1, r)
        }

        function qe(e) {
            this.r2 = n(), this.q3 = n(), a.ONE.dlShiftTo(2 * e.t, this.r2), this.mu = this.r2.divide(e), this.m = e
        }

        function je(e) {
            if (e.s < 0 || e.t > 2 * this.m.t) return e.mod(this.m);
            if (e.compareTo(this.m) < 0) return e;
            var t = n();
            return e.copyTo(t), this.reduce(t), t
        }

        function Ge(e) {
            return e
        }

        function He(e) {
            for (e.drShiftTo(this.m.t - 1, this.r2), e.t > this.m.t + 1 && (e.t = this.m.t + 1, e.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); e.compareTo(this.r2) < 0;) e.dAddOffset(1, this.m.t + 1);
            for (e.subTo(this.r2, e); e.compareTo(this.m) >= 0;) e.subTo(this.m, e)
        }

        function Qe(e, t) {
            e.squareTo(t), this.reduce(t)
        }

        function ze(e, t, r) {
            e.multiplyTo(t, r), this.reduce(r)
        }

        function We(e, t) {
            var r, a, i = e.bitLength(),
                s = f(1);
            if (i <= 0) return s;
            r = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6, a = i < 8 ? new R(t) : t.isEven() ? new qe(t) : new O(t);
            var o = new Array,
                c = 3,
                u = r - 1,
                l = (1 << r) - 1;
            if (o[1] = a.convert(this), r > 1) {
                var p = n();
                for (a.sqrTo(o[1], p); c <= l;) o[c] = n(), a.mulTo(p, o[c - 2], o[c]), c += 2
            }
            var h, d, y = e.t - 1,
                g = !0,
                v = n();
            for (i = C(e.data[y]) - 1; y >= 0;) {
                for (i >= u ? h = e.data[y] >> i - u & l : (h = (e.data[y] & (1 << i + 1) - 1) << u - i, y > 0 && (h |= e.data[y - 1] >> this.DB + i - u)), c = r; 0 == (1 & h);) h >>= 1, --c;
                if ((i -= c) < 0 && (i += this.DB, --y), g) o[h].copyTo(s), g = !1;
                else {
                    for (; c > 1;) a.sqrTo(s, v), a.sqrTo(v, s), c -= 2;
                    c > 0 ? a.sqrTo(s, v) : (d = s, s = v, v = d), a.mulTo(v, o[h], s)
                }
                for (; y >= 0 && 0 == (e.data[y] & 1 << i);) a.sqrTo(s, v), d = s, s = v, v = d, --i < 0 && (i = this.DB - 1, --y)
            }
            return a.revert(s)
        }

        function Ye(e) {
            var t = this.s < 0 ? this.negate() : this.clone(),
                r = e.s < 0 ? e.negate() : e.clone();
            if (t.compareTo(r) < 0) {
                var a = t;
                t = r, r = a
            }
            var n = t.getLowestSetBit(),
                i = r.getLowestSetBit();
            if (i < 0) return t;
            for (n < i && (i = n), i > 0 && (t.rShiftTo(i, t), r.rShiftTo(i, r)); t.signum() > 0;)(n = t.getLowestSetBit()) > 0 && t.rShiftTo(n, t), (n = r.getLowestSetBit()) > 0 && r.rShiftTo(n, r), t.compareTo(r) >= 0 ? (t.subTo(r, t), t.rShiftTo(1, t)) : (r.subTo(t, r), r.rShiftTo(1, r));
            return i > 0 && r.lShiftTo(i, r), r
        }

        function Xe(e) {
            if (e <= 0) return 0;
            var t = this.DV % e,
                r = this.s < 0 ? e - 1 : 0;
            if (this.t > 0)
                if (0 == t) r = this.data[0] % e;
                else
                    for (var a = this.t - 1; a >= 0; --a) r = (t * r + this.data[a]) % e;
            return r
        }

        function Ze(e) {
            var t = e.isEven();
            if (this.isEven() && t || 0 == e.signum()) return a.ZERO;
            for (var r = e.clone(), n = this.clone(), i = f(1), s = f(0), o = f(0), c = f(1); 0 != r.signum();) {
                for (; r.isEven();) r.rShiftTo(1, r), t ? (i.isEven() && s.isEven() || (i.addTo(this, i), s.subTo(e, s)), i.rShiftTo(1, i)) : s.isEven() || s.subTo(e, s), s.rShiftTo(1, s);
                for (; n.isEven();) n.rShiftTo(1, n), t ? (o.isEven() && c.isEven() || (o.addTo(this, o), c.subTo(e, c)), o.rShiftTo(1, o)) : c.isEven() || c.subTo(e, c), c.rShiftTo(1, c);
                r.compareTo(n) >= 0 ? (r.subTo(n, r), t && i.subTo(o, i), s.subTo(c, s)) : (n.subTo(r, n), t && o.subTo(i, o), c.subTo(s, c))
            }
            return 0 != n.compareTo(a.ONE) ? a.ZERO : c.compareTo(e) >= 0 ? c.subtract(e) : c.signum() < 0 ? (c.addTo(e, c), c.signum() < 0 ? c.add(e) : c) : c
        }

        function Je(e) {
            var t, r = this.abs();
            if (1 == r.t && r.data[0] <= ot[ot.length - 1]) {
                for (t = 0; t < ot.length; ++t)
                    if (r.data[0] == ot[t]) return !0;
                return !1
            }
            if (r.isEven()) return !1;
            for (t = 1; t < ot.length;) {
                for (var a = ot[t], n = t + 1; n < ot.length && a < ct;) a *= ot[n++];
                for (a = r.modInt(a); t < n;)
                    if (a % ot[t++] == 0) return !1
            }
            return r.millerRabin(e)
        }

        function $e(e) {
            var t = this.subtract(a.ONE),
                r = t.getLowestSetBit();
            if (r <= 0) return !1;
            for (var n, i = t.shiftRight(r), s = et(), o = 0; o < e; ++o) {
                do {
                    n = new a(this.bitLength(), s)
                } while (n.compareTo(a.ONE) <= 0 || n.compareTo(t) >= 0);
                var c = n.modPow(i, this);
                if (0 != c.compareTo(a.ONE) && 0 != c.compareTo(t)) {
                    for (var u = 1; u++ < r && 0 != c.compareTo(t);)
                        if (c = c.modPowInt(2, this), 0 == c.compareTo(a.ONE)) return !1;
                    if (0 != c.compareTo(t)) return !1
                }
            }
            return !0
        }

        function et() {
            return {
                nextBytes: function(e) {
                    for (var t = 0; t < e.length; ++t) e[t] = Math.floor(256 * Math.random())
                }
            }
        }
        var tt = r(0);
        e.exports = tt.jsbn = tt.jsbn || {};
        var rt;
        tt.jsbn.BigInteger = a, "undefined" == typeof navigator ? (a.prototype.am = o, rt = 28) : "Microsoft Internet Explorer" == navigator.appName ? (a.prototype.am = s, rt = 30) : "Netscape" != navigator.appName ? (a.prototype.am = i, rt = 26) : (a.prototype.am = o, rt = 28), a.prototype.DB = rt, a.prototype.DM = (1 << rt) - 1, a.prototype.DV = 1 << rt;
        a.prototype.FV = Math.pow(2, 52), a.prototype.F1 = 52 - rt, a.prototype.F2 = 2 * rt - 52;
        var at, nt, it = "0123456789abcdefghijklmnopqrstuvwxyz",
            st = new Array;
        for (at = "0".charCodeAt(0), nt = 0; nt <= 9; ++nt) st[at++] = nt;
        for (at = "a".charCodeAt(0), nt = 10; nt < 36; ++nt) st[at++] = nt;
        for (at = "A".charCodeAt(0), nt = 10; nt < 36; ++nt) st[at++] = nt;
        R.prototype.convert = _, R.prototype.revert = L, R.prototype.reduce = U, R.prototype.mulTo = D, R.prototype.sqrTo = P, O.prototype.convert = K, O.prototype.revert = x, O.prototype.reduce = M, O.prototype.mulTo = q, O.prototype.sqrTo = F, a.prototype.copyTo = l, a.prototype.fromInt = p, a.prototype.fromString = h, a.prototype.clamp = d, a.prototype.dlShiftTo = S, a.prototype.drShiftTo = T, a.prototype.lShiftTo = I, a.prototype.rShiftTo = b, a.prototype.subTo = A, a.prototype.multiplyTo = B, a.prototype.squareTo = N, a.prototype.divRemTo = k, a.prototype.invDigit = V, a.prototype.isEven = j, a.prototype.exp = G, a.prototype.toString = y, a.prototype.negate = g, a.prototype.abs = v, a.prototype.compareTo = m, a.prototype.bitLength = E, a.prototype.mod = w, a.prototype.modPowInt = H, a.ZERO = f(0), a.ONE = f(1), Pe.prototype.convert = Ve, Pe.prototype.revert = Ve, Pe.prototype.mulTo = Oe, Pe.prototype.sqrTo = Ke, qe.prototype.convert = je, qe.prototype.revert = Ge, qe.prototype.reduce = He, qe.prototype.mulTo = ze, qe.prototype.sqrTo = Qe;
        var ot = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509],
            ct = (1 << 26) / ot[ot.length - 1];
        a.prototype.chunkSize = X, a.prototype.toRadix = J, a.prototype.fromRadix = $, a.prototype.fromNumber = ee, a.prototype.bitwiseTo = ie, a.prototype.changeBit = Te, a.prototype.addTo = Be, a.prototype.dMultiply = Ue, a.prototype.dAddOffset = De, a.prototype.multiplyLowerTo = Me, a.prototype.multiplyUpperTo = Fe, a.prototype.modInt = Xe, a.prototype.millerRabin = $e, a.prototype.clone = Q, a.prototype.intValue = z, a.prototype.byteValue = W, a.prototype.shortValue = Y, a.prototype.signum = Z, a.prototype.toByteArray = te, a.prototype.equals = re, a.prototype.min = ae, a.prototype.max = ne, a.prototype.and = oe, a.prototype.or = ue, a.prototype.xor = pe, a.prototype.andNot = he, a.prototype.not = de, a.prototype.shiftLeft = ye, a.prototype.shiftRight = ge, a.prototype.getLowestSetBit = me, a.prototype.bitCount = Ee, a.prototype.testBit = Se, a.prototype.setBit = Ie, a.prototype.clearBit = be, a.prototype.flipBit = Ae, a.prototype.add = Ne, a.prototype.subtract = ke, a.prototype.multiply = we, a.prototype.divide = Re, a.prototype.remainder = _e, a.prototype.divideAndRemainder = Le, a.prototype.modPow = We, a.prototype.modInverse = Ze, a.prototype.pow = xe, a.prototype.gcd = Ye, a.prototype.isProbablePrime = Je
    }, function(e, t, r) {
        var a = r(0);
        r(1), e.exports = a.cipher = a.cipher || {}, a.cipher.algorithms = a.cipher.algorithms || {}, a.cipher.createCipher = function(e, t) {
            var r = e;
            if ("string" == typeof r && (r = a.cipher.getAlgorithm(r)) && (r = r()), !r) throw new Error("Unsupported algorithm: " + e);
            return new a.cipher.BlockCipher({
                algorithm: r,
                key: t,
                decrypt: !1
            })
        }, a.cipher.createDecipher = function(e, t) {
            var r = e;
            if ("string" == typeof r && (r = a.cipher.getAlgorithm(r)) && (r = r()), !r) throw new Error("Unsupported algorithm: " + e);
            return new a.cipher.BlockCipher({
                algorithm: r,
                key: t,
                decrypt: !0
            })
        }, a.cipher.registerAlgorithm = function(e, t) {
            e = e.toUpperCase(), a.cipher.algorithms[e] = t
        }, a.cipher.getAlgorithm = function(e) {
            return e = e.toUpperCase(), e in a.cipher.algorithms ? a.cipher.algorithms[e] : null
        };
        var n = a.cipher.BlockCipher = function(e) {
            this.algorithm = e.algorithm, this.mode = this.algorithm.mode, this.blockSize = this.mode.blockSize, this._finish = !1, this._input = null, this.output = null, this._op = e.decrypt ? this.mode.decrypt : this.mode.encrypt, this._decrypt = e.decrypt, this.algorithm.initialize(e)
        };
        n.prototype.start = function(e) {
            e = e || {};
            var t = {};
            for (var r in e) t[r] = e[r];
            t.decrypt = this._decrypt, this._finish = !1, this._input = a.util.createBuffer(), this.output = e.output || a.util.createBuffer(), this.mode.start(t)
        }, n.prototype.update = function(e) {
            for (e && this._input.putBuffer(e); !this._op.call(this.mode, this._input, this.output, this._finish) && !this._finish;);
            this._input.compact()
        }, n.prototype.finish = function(e) {
            !e || "ECB" !== this.mode.name && "CBC" !== this.mode.name || (this.mode.pad = function(t) {
                return e(this.blockSize, t, !1)
            }, this.mode.unpad = function(t) {
                return e(this.blockSize, t, !0)
            });
            var t = {};
            return t.decrypt = this._decrypt, t.overflow = this._input.length() % this.blockSize, !(!this._decrypt && this.mode.pad && !this.mode.pad(this._input, t)) && (this._finish = !0, this.update(), !(this._decrypt && this.mode.unpad && !this.mode.unpad(this.output, t)) && !(this.mode.afterFinish && !this.mode.afterFinish(this.output, t)))
        }
    }, function(e, t, r) {
        function a() {
            o = String.fromCharCode(128), o += i.util.fillString(String.fromCharCode(0), 64), c = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 6, 11, 0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12, 5, 8, 11, 14, 1, 4, 7, 10, 13, 0, 3, 6, 9, 12, 15, 2, 0, 7, 14, 5, 12, 3, 10, 1, 8, 15, 6, 13, 4, 11, 2, 9], u = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21], l = new Array(64);
            for (var e = 0; e < 64; ++e) l[e] = Math.floor(4294967296 * Math.abs(Math.sin(e + 1)));
            p = !0
        }

        function n(e, t, r) {
            for (var a, n, i, s, o, p, f, h, d = r.length(); d >= 64;) {
                for (n = e.h0, i = e.h1, s = e.h2, o = e.h3, h = 0; h < 16; ++h) t[h] = r.getInt32Le(), p = o ^ i & (s ^ o), a = n + p + l[h] + t[h], f = u[h], n = o, o = s, s = i, i += a << f | a >>> 32 - f;
                for (; h < 32; ++h) p = s ^ o & (i ^ s), a = n + p + l[h] + t[c[h]], f = u[h], n = o, o = s, s = i, i += a << f | a >>> 32 - f;
                for (; h < 48; ++h) p = i ^ s ^ o, a = n + p + l[h] + t[c[h]], f = u[h], n = o, o = s, s = i, i += a << f | a >>> 32 - f;
                for (; h < 64; ++h) p = s ^ (i | ~o), a = n + p + l[h] + t[c[h]], f = u[h], n = o, o = s, s = i, i += a << f | a >>> 32 - f;
                e.h0 = e.h0 + n | 0, e.h1 = e.h1 + i | 0, e.h2 = e.h2 + s | 0, e.h3 = e.h3 + o | 0, d -= 64
            }
        }
        var i = r(0);
        r(4), r(1);
        var s = e.exports = i.md5 = i.md5 || {};
        i.md.md5 = i.md.algorithms.md5 = s, s.create = function() {
            p || a();
            var e = null,
                t = i.util.createBuffer(),
                r = new Array(16),
                s = {
                    algorithm: "md5",
                    blockLength: 64,
                    digestLength: 16,
                    messageLength: 0,
                    fullMessageLength: null,
                    messageLengthSize: 8
                };
            return s.start = function() {
                s.messageLength = 0, s.fullMessageLength = s.messageLength64 = [];
                for (var r = s.messageLengthSize / 4, a = 0; a < r; ++a) s.fullMessageLength.push(0);
                return t = i.util.createBuffer(), e = {
                    h0: 1732584193,
                    h1: 4023233417,
                    h2: 2562383102,
                    h3: 271733878
                }, s
            }, s.start(), s.update = function(a, o) {
                "utf8" === o && (a = i.util.encodeUtf8(a));
                var c = a.length;
                s.messageLength += c, c = [c / 4294967296 >>> 0, c >>> 0];
                for (var u = s.fullMessageLength.length - 1; u >= 0; --u) s.fullMessageLength[u] += c[1], c[1] = c[0] + (s.fullMessageLength[u] / 4294967296 >>> 0), s.fullMessageLength[u] = s.fullMessageLength[u] >>> 0, c[0] = c[1] / 4294967296 >>> 0;
                return t.putBytes(a), n(e, r, t), (t.read > 2048 || 0 === t.length()) && t.compact(), s
            }, s.digest = function() {
                var a = i.util.createBuffer();
                a.putBytes(t.bytes());
                var c = s.fullMessageLength[s.fullMessageLength.length - 1] + s.messageLengthSize,
                    u = c & s.blockLength - 1;
                a.putBytes(o.substr(0, s.blockLength - u));
                for (var l, p = 0, f = s.fullMessageLength.length - 1; f >= 0; --f) l = 8 * s.fullMessageLength[f] + p, p = l / 4294967296 >>> 0, a.putInt32Le(l >>> 0);
                var h = {
                    h0: e.h0,
                    h1: e.h1,
                    h2: e.h2,
                    h3: e.h3
                };
                n(h, r, a);
                var d = i.util.createBuffer();
                return d.putInt32Le(h.h0), d.putInt32Le(h.h1), d.putInt32Le(h.h2), d.putInt32Le(h.h3), d
            }, s
        };
        var o = null,
            c = null,
            u = null,
            l = null,
            p = !1
    }, function(e, t, r) {
        var a = r(0);
        r(8), r(4), r(1);
        var n, i = a.pkcs5 = a.pkcs5 || {};
        a.util.isNodejs && !a.options.usePureJavaScript && (n = r(16)), e.exports = a.pbkdf2 = i.pbkdf2 = function(e, t, r, i, s, o) {
            function c() {
                if (C > f) return o(null, m);
                d.start(null, null), d.update(t), d.update(a.util.int32ToBytes(C)), y = v = d.digest().getBytes(), E = 2, u()
            }

            function u() {
                if (E <= r) return d.start(null, null), d.update(v), g = d.digest().getBytes(), y = a.util.xorBytes(y, g, l), v = g, ++E, a.util.setImmediate(u);
                m += C < f ? y : y.substr(0, h), ++C, c()
            }
            if ("function" == typeof s && (o = s, s = null), a.util.isNodejs && !a.options.usePureJavaScript && n.pbkdf2 && (null === s || "object" != typeof s) && (n.pbkdf2Sync.length > 4 || !s || "sha1" === s)) return "string" != typeof s && (s = "sha1"), e = new Buffer(e, "binary"), t = new Buffer(t, "binary"), o ? 4 === n.pbkdf2Sync.length ? n.pbkdf2(e, t, r, i, function(e, t) {
                if (e) return o(e);
                o(null, t.toString("binary"))
            }) : n.pbkdf2(e, t, r, i, s, function(e, t) {
                if (e) return o(e);
                o(null, t.toString("binary"))
            }) : 4 === n.pbkdf2Sync.length ? n.pbkdf2Sync(e, t, r, i).toString("binary") : n.pbkdf2Sync(e, t, r, i, s).toString("binary");
            if (void 0 !== s && null !== s || (s = "sha1"), "string" == typeof s) {
                if (!(s in a.md.algorithms)) throw new Error("Unknown hash algorithm: " + s);
                s = a.md[s].create()
            }
            var l = s.digestLength;
            if (i > 4294967295 * l) {
                var p = new Error("Derived key is too long.");
                if (o) return o(p);
                throw p
            }
            var f = Math.ceil(i / l),
                h = i - (f - 1) * l,
                d = a.hmac.create();
            d.start(s, e);
            var y, g, v, m = "";
            if (!o) {
                for (var C = 1; C <= f; ++C) {
                    d.start(null, null), d.update(t), d.update(a.util.int32ToBytes(C)), y = v = d.digest().getBytes();
                    for (var E = 2; E <= r; ++E) d.start(null, null), d.update(v), g = d.digest().getBytes(), y = a.util.xorBytes(y, g, l), v = g;
                    m += C < f ? y : y.substr(0, h)
                }
                return m
            }
            var E, C = 1;
            c()
        }
    }, function(e, t) {}, function(e, t, r) {
        function a(e, t) {
            "string" == typeof t && (t = {
                shortName: t
            });
            for (var r, a = null, n = 0; null === a && n < e.attributes.length; ++n) r = e.attributes[n], t.type && t.type === r.type ? a = r : t.name && t.name === r.name ? a = r : t.shortName && t.shortName === r.shortName && (a = r);
            return a
        }

        function n(e) {
            for (var t, r, a = p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, []), n = e.attributes, i = 0; i < n.length; ++i) {
                t = n[i];
                var s = t.value,
                    o = p.Type.PRINTABLESTRING;
                "valueTagClass" in t && (o = t.valueTagClass) === p.Type.UTF8 && (s = l.util.encodeUtf8(s)), r = p.create(p.Class.UNIVERSAL, p.Type.SET, !0, [p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, [p.create(p.Class.UNIVERSAL, p.Type.OID, !1, p.oidToDer(t.type).getBytes()), p.create(p.Class.UNIVERSAL, o, !1, s)])]), a.value.push(r)
            }
            return a
        }

        function i(e) {
            for (var t, r = 0; r < e.length; ++r) {
                if (t = e[r], void 0 === t.name && (t.type && t.type in f.oids ? t.name = f.oids[t.type] : t.shortName && t.shortName in d && (t.name = f.oids[d[t.shortName]])), void 0 === t.type) {
                    if (!(t.name && t.name in f.oids)) {
                        var a = new Error("Attribute type not specified.");
                        throw a.attribute = t, a
                    }
                    t.type = f.oids[t.name]
                }
                if (void 0 === t.shortName && t.name && t.name in d && (t.shortName = d[t.name]), t.type === h.extensionRequest && (t.valueConstructed = !0, t.valueTagClass = p.Type.SEQUENCE, !t.value && t.extensions)) {
                    t.value = [];
                    for (var n = 0; n < t.extensions.length; ++n) t.value.push(f.certificateExtensionToAsn1(s(t.extensions[n])))
                }
                if (void 0 === t.value) {
                    var a = new Error("Attribute value not specified.");
                    throw a.attribute = t, a
                }
            }
        }

        function s(e, t) {
            if (t = t || {}, void 0 === e.name && e.id && e.id in f.oids && (e.name = f.oids[e.id]), void 0 === e.id) {
                if (!(e.name && e.name in f.oids)) {
                    var r = new Error("Extension ID not specified.");
                    throw r.extension = e, r
                }
                e.id = f.oids[e.name]
            }
            if (void 0 !== e.value) return e;
            if ("keyUsage" === e.name) {
                var a = 0,
                    i = 0,
                    s = 0;
                e.digitalSignature && (i |= 128, a = 7), e.nonRepudiation && (i |= 64, a = 6), e.keyEncipherment && (i |= 32, a = 5), e.dataEncipherment && (i |= 16, a = 4), e.keyAgreement && (i |= 8, a = 3), e.keyCertSign && (i |= 4, a = 2), e.cRLSign && (i |= 2, a = 1), e.encipherOnly && (i |= 1, a = 0), e.decipherOnly && (s |= 128, a = 7);
                var o = String.fromCharCode(a);
                0 !== s ? o += String.fromCharCode(i) + String.fromCharCode(s) : 0 !== i && (o += String.fromCharCode(i)), e.value = p.create(p.Class.UNIVERSAL, p.Type.BITSTRING, !1, o)
            } else if ("basicConstraints" === e.name) e.value = p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, []), e.cA && e.value.value.push(p.create(p.Class.UNIVERSAL, p.Type.BOOLEAN, !1, String.fromCharCode(255))), "pathLenConstraint" in e && e.value.value.push(p.create(p.Class.UNIVERSAL, p.Type.INTEGER, !1, p.integerToDer(e.pathLenConstraint).getBytes()));
            else if ("extKeyUsage" === e.name) {
                e.value = p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, []);
                var c = e.value.value;
                for (var u in e) !0 === e[u] && (u in h ? c.push(p.create(p.Class.UNIVERSAL, p.Type.OID, !1, p.oidToDer(h[u]).getBytes())) : -1 !== u.indexOf(".") && c.push(p.create(p.Class.UNIVERSAL, p.Type.OID, !1, p.oidToDer(u).getBytes())))
            } else if ("nsCertType" === e.name) {
                var a = 0,
                    i = 0;
                e.client && (i |= 128, a = 7), e.server && (i |= 64, a = 6), e.email && (i |= 32, a = 5), e.objsign && (i |= 16, a = 4), e.reserved && (i |= 8, a = 3), e.sslCA && (i |= 4, a = 2), e.emailCA && (i |= 2, a = 1), e.objCA && (i |= 1, a = 0);
                var o = String.fromCharCode(a);
                0 !== i && (o += String.fromCharCode(i)), e.value = p.create(p.Class.UNIVERSAL, p.Type.BITSTRING, !1, o)
            } else if ("subjectAltName" === e.name || "issuerAltName" === e.name) {
                e.value = p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, []);
                for (var d, y = 0; y < e.altNames.length; ++y) {
                    d = e.altNames[y];
                    var o = d.value;
                    if (7 === d.type && d.ip) {
                        if (null === (o = l.util.bytesFromIP(d.ip))) {
                            var r = new Error('Extension "ip" value is not a valid IPv4 or IPv6 address.');
                            throw r.extension = e, r
                        }
                    } else 8 === d.type && (o = d.oid ? p.oidToDer(p.oidToDer(d.oid)) : p.oidToDer(o));
                    e.value.value.push(p.create(p.Class.CONTEXT_SPECIFIC, d.type, !1, o))
                }
            } else if ("nsComment" === e.name && t.cert) {
                if (!/^[\x00-\x7F]*$/.test(e.comment) || e.comment.length < 1 || e.comment.length > 128) throw new Error('Invalid "nsComment" content.');
                e.value = p.create(p.Class.UNIVERSAL, p.Type.IA5STRING, !1, e.comment)
            } else if ("subjectKeyIdentifier" === e.name && t.cert) {
                var g = t.cert.generateSubjectKeyIdentifier();
                e.subjectKeyIdentifier = g.toHex(), e.value = p.create(p.Class.UNIVERSAL, p.Type.OCTETSTRING, !1, g.getBytes())
            } else if ("authorityKeyIdentifier" === e.name && t.cert) {
                e.value = p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, []);
                var c = e.value.value;
                if (e.keyIdentifier) {
                    var v = !0 === e.keyIdentifier ? t.cert.generateSubjectKeyIdentifier().getBytes() : e.keyIdentifier;
                    c.push(p.create(p.Class.CONTEXT_SPECIFIC, 0, !1, v))
                }
                if (e.authorityCertIssuer) {
                    var m = [p.create(p.Class.CONTEXT_SPECIFIC, 4, !0, [n(!0 === e.authorityCertIssuer ? t.cert.issuer : e.authorityCertIssuer)])];
                    c.push(p.create(p.Class.CONTEXT_SPECIFIC, 1, !0, m))
                }
                if (e.serialNumber) {
                    var C = l.util.hexToBytes(!0 === e.serialNumber ? t.cert.serialNumber : e.serialNumber);
                    c.push(p.create(p.Class.CONTEXT_SPECIFIC, 2, !1, C))
                }
            } else if ("cRLDistributionPoints" === e.name) {
                e.value = p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, []);
                for (var d, c = e.value.value, E = p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, []), S = p.create(p.Class.CONTEXT_SPECIFIC, 0, !0, []), y = 0; y < e.altNames.length; ++y) {
                    d = e.altNames[y];
                    var o = d.value;
                    if (7 === d.type && d.ip) {
                        if (null === (o = l.util.bytesFromIP(d.ip))) {
                            var r = new Error('Extension "ip" value is not a valid IPv4 or IPv6 address.');
                            throw r.extension = e, r
                        }
                    } else 8 === d.type && (o = d.oid ? p.oidToDer(p.oidToDer(d.oid)) : p.oidToDer(o));
                    S.value.push(p.create(p.Class.CONTEXT_SPECIFIC, d.type, !1, o))
                }
                E.value.push(p.create(p.Class.CONTEXT_SPECIFIC, 0, !0, [S])), c.push(E)
            }
            if (void 0 === e.value) {
                var r = new Error("Extension value not specified.");
                throw r.extension = e, r
            }
            return e
        }

        function o(e, t) {
            switch (e) {
                case h["RSASSA-PSS"]:
                    var r = [];
                    return void 0 !== t.hash.algorithmOid && r.push(p.create(p.Class.CONTEXT_SPECIFIC, 0, !0, [p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, [p.create(p.Class.UNIVERSAL, p.Type.OID, !1, p.oidToDer(t.hash.algorithmOid).getBytes()), p.create(p.Class.UNIVERSAL, p.Type.NULL, !1, "")])])), void 0 !== t.mgf.algorithmOid && r.push(p.create(p.Class.CONTEXT_SPECIFIC, 1, !0, [p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, [p.create(p.Class.UNIVERSAL, p.Type.OID, !1, p.oidToDer(t.mgf.algorithmOid).getBytes()), p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, [p.create(p.Class.UNIVERSAL, p.Type.OID, !1, p.oidToDer(t.mgf.hash.algorithmOid).getBytes()), p.create(p.Class.UNIVERSAL, p.Type.NULL, !1, "")])])])), void 0 !== t.saltLength && r.push(p.create(p.Class.CONTEXT_SPECIFIC, 2, !0, [p.create(p.Class.UNIVERSAL, p.Type.INTEGER, !1, p.integerToDer(t.saltLength).getBytes())])), p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, r);
                default:
                    return p.create(p.Class.UNIVERSAL, p.Type.NULL, !1, "")
            }
        }

        function c(e) {
            var t = p.create(p.Class.CONTEXT_SPECIFIC, 0, !0, []);
            if (0 === e.attributes.length) return t;
            for (var r = e.attributes, a = 0; a < r.length; ++a) {
                var n = r[a],
                    i = n.value,
                    s = p.Type.UTF8;
                "valueTagClass" in n && (s = n.valueTagClass), s === p.Type.UTF8 && (i = l.util.encodeUtf8(i));
                var o = !1;
                "valueConstructed" in n && (o = n.valueConstructed);
                var c = p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, [p.create(p.Class.UNIVERSAL, p.Type.OID, !1, p.oidToDer(n.type).getBytes()), p.create(p.Class.UNIVERSAL, p.Type.SET, !0, [p.create(p.Class.UNIVERSAL, s, o, i)])]);
                t.value.push(c)
            }
            return t
        }

        function u(e) {
            return e >= S && e < T ? p.create(p.Class.UNIVERSAL, p.Type.UTCTIME, !1, p.dateToUtcTime(e)) : p.create(p.Class.UNIVERSAL, p.Type.GENERALIZEDTIME, !1, p.dateToGeneralizedTime(e))
        }
        var l = r(0);
        r(5), r(3), r(10), r(4), r(39), r(6), r(7), r(18), r(11), r(1);
        var p = l.asn1,
            f = e.exports = l.pki = l.pki || {},
            h = f.oids,
            d = {};
        d.CN = h.commonName, d.commonName = "CN", d.C = h.countryName, d.countryName = "C", d.L = h.localityName, d.localityName = "L", d.ST = h.stateOrProvinceName, d.stateOrProvinceName = "ST", d.O = h.organizationName, d.organizationName = "O", d.OU = h.organizationalUnitName, d.organizationalUnitName = "OU", d.E = h.emailAddress, d.emailAddress = "E";
        var y = l.pki.rsa.publicKeyValidator,
            g = {
                name: "Certificate",
                tagClass: p.Class.UNIVERSAL,
                type: p.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "Certificate.TBSCertificate",
                    tagClass: p.Class.UNIVERSAL,
                    type: p.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "tbsCertificate",
                    value: [{
                        name: "Certificate.TBSCertificate.version",
                        tagClass: p.Class.CONTEXT_SPECIFIC,
                        type: 0,
                        constructed: !0,
                        optional: !0,
                        value: [{
                            name: "Certificate.TBSCertificate.version.integer",
                            tagClass: p.Class.UNIVERSAL,
                            type: p.Type.INTEGER,
                            constructed: !1,
                            capture: "certVersion"
                        }]
                    }, {
                        name: "Certificate.TBSCertificate.serialNumber",
                        tagClass: p.Class.UNIVERSAL,
                        type: p.Type.INTEGER,
                        constructed: !1,
                        capture: "certSerialNumber"
                    }, {
                        name: "Certificate.TBSCertificate.signature",
                        tagClass: p.Class.UNIVERSAL,
                        type: p.Type.SEQUENCE,
                        constructed: !0,
                        value: [{
                            name: "Certificate.TBSCertificate.signature.algorithm",
                            tagClass: p.Class.UNIVERSAL,
                            type: p.Type.OID,
                            constructed: !1,
                            capture: "certinfoSignatureOid"
                        }, {
                            name: "Certificate.TBSCertificate.signature.parameters",
                            tagClass: p.Class.UNIVERSAL,
                            optional: !0,
                            captureAsn1: "certinfoSignatureParams"
                        }]
                    }, {
                        name: "Certificate.TBSCertificate.issuer",
                        tagClass: p.Class.UNIVERSAL,
                        type: p.Type.SEQUENCE,
                        constructed: !0,
                        captureAsn1: "certIssuer"
                    }, {
                        name: "Certificate.TBSCertificate.validity",
                        tagClass: p.Class.UNIVERSAL,
                        type: p.Type.SEQUENCE,
                        constructed: !0,
                        value: [{
                            name: "Certificate.TBSCertificate.validity.notBefore (utc)",
                            tagClass: p.Class.UNIVERSAL,
                            type: p.Type.UTCTIME,
                            constructed: !1,
                            optional: !0,
                            capture: "certValidity1UTCTime"
                        }, {
                            name: "Certificate.TBSCertificate.validity.notBefore (generalized)",
                            tagClass: p.Class.UNIVERSAL,
                            type: p.Type.GENERALIZEDTIME,
                            constructed: !1,
                            optional: !0,
                            capture: "certValidity2GeneralizedTime"
                        }, {
                            name: "Certificate.TBSCertificate.validity.notAfter (utc)",
                            tagClass: p.Class.UNIVERSAL,
                            type: p.Type.UTCTIME,
                            constructed: !1,
                            optional: !0,
                            capture: "certValidity3UTCTime"
                        }, {
                            name: "Certificate.TBSCertificate.validity.notAfter (generalized)",
                            tagClass: p.Class.UNIVERSAL,
                            type: p.Type.GENERALIZEDTIME,
                            constructed: !1,
                            optional: !0,
                            capture: "certValidity4GeneralizedTime"
                        }]
                    }, {
                        name: "Certificate.TBSCertificate.subject",
                        tagClass: p.Class.UNIVERSAL,
                        type: p.Type.SEQUENCE,
                        constructed: !0,
                        captureAsn1: "certSubject"
                    }, y, {
                        name: "Certificate.TBSCertificate.issuerUniqueID",
                        tagClass: p.Class.CONTEXT_SPECIFIC,
                        type: 1,
                        constructed: !0,
                        optional: !0,
                        value: [{
                            name: "Certificate.TBSCertificate.issuerUniqueID.id",
                            tagClass: p.Class.UNIVERSAL,
                            type: p.Type.BITSTRING,
                            constructed: !1,
                            captureBitStringValue: "certIssuerUniqueId"
                        }]
                    }, {
                        name: "Certificate.TBSCertificate.subjectUniqueID",
                        tagClass: p.Class.CONTEXT_SPECIFIC,
                        type: 2,
                        constructed: !0,
                        optional: !0,
                        value: [{
                            name: "Certificate.TBSCertificate.subjectUniqueID.id",
                            tagClass: p.Class.UNIVERSAL,
                            type: p.Type.BITSTRING,
                            constructed: !1,
                            captureBitStringValue: "certSubjectUniqueId"
                        }]
                    }, {
                        name: "Certificate.TBSCertificate.extensions",
                        tagClass: p.Class.CONTEXT_SPECIFIC,
                        type: 3,
                        constructed: !0,
                        captureAsn1: "certExtensions",
                        optional: !0
                    }]
                }, {
                    name: "Certificate.signatureAlgorithm",
                    tagClass: p.Class.UNIVERSAL,
                    type: p.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "Certificate.signatureAlgorithm.algorithm",
                        tagClass: p.Class.UNIVERSAL,
                        type: p.Type.OID,
                        constructed: !1,
                        capture: "certSignatureOid"
                    }, {
                        name: "Certificate.TBSCertificate.signature.parameters",
                        tagClass: p.Class.UNIVERSAL,
                        optional: !0,
                        captureAsn1: "certSignatureParams"
                    }]
                }, {
                    name: "Certificate.signatureValue",
                    tagClass: p.Class.UNIVERSAL,
                    type: p.Type.BITSTRING,
                    constructed: !1,
                    captureBitStringValue: "certSignature"
                }]
            },
            v = {
                name: "rsapss",
                tagClass: p.Class.UNIVERSAL,
                type: p.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "rsapss.hashAlgorithm",
                    tagClass: p.Class.CONTEXT_SPECIFIC,
                    type: 0,
                    constructed: !0,
                    value: [{
                        name: "rsapss.hashAlgorithm.AlgorithmIdentifier",
                        tagClass: p.Class.UNIVERSAL,
                        type: p.Class.SEQUENCE,
                        constructed: !0,
                        optional: !0,
                        value: [{
                            name: "rsapss.hashAlgorithm.AlgorithmIdentifier.algorithm",
                            tagClass: p.Class.UNIVERSAL,
                            type: p.Type.OID,
                            constructed: !1,
                            capture: "hashOid"
                        }]
                    }]
                }, {
                    name: "rsapss.maskGenAlgorithm",
                    tagClass: p.Class.CONTEXT_SPECIFIC,
                    type: 1,
                    constructed: !0,
                    value: [{
                        name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier",
                        tagClass: p.Class.UNIVERSAL,
                        type: p.Class.SEQUENCE,
                        constructed: !0,
                        optional: !0,
                        value: [{
                            name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.algorithm",
                            tagClass: p.Class.UNIVERSAL,
                            type: p.Type.OID,
                            constructed: !1,
                            capture: "maskGenOid"
                        }, {
                            name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.params",
                            tagClass: p.Class.UNIVERSAL,
                            type: p.Type.SEQUENCE,
                            constructed: !0,
                            value: [{
                                name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.params.algorithm",
                                tagClass: p.Class.UNIVERSAL,
                                type: p.Type.OID,
                                constructed: !1,
                                capture: "maskGenHashOid"
                            }]
                        }]
                    }]
                }, {
                    name: "rsapss.saltLength",
                    tagClass: p.Class.CONTEXT_SPECIFIC,
                    type: 2,
                    optional: !0,
                    value: [{
                        name: "rsapss.saltLength.saltLength",
                        tagClass: p.Class.UNIVERSAL,
                        type: p.Class.INTEGER,
                        constructed: !1,
                        capture: "saltLength"
                    }]
                }, {
                    name: "rsapss.trailerField",
                    tagClass: p.Class.CONTEXT_SPECIFIC,
                    type: 3,
                    optional: !0,
                    value: [{
                        name: "rsapss.trailer.trailer",
                        tagClass: p.Class.UNIVERSAL,
                        type: p.Class.INTEGER,
                        constructed: !1,
                        capture: "trailer"
                    }]
                }]
            },
            m = {
                name: "CertificationRequestInfo",
                tagClass: p.Class.UNIVERSAL,
                type: p.Type.SEQUENCE,
                constructed: !0,
                captureAsn1: "certificationRequestInfo",
                value: [{
                    name: "CertificationRequestInfo.integer",
                    tagClass: p.Class.UNIVERSAL,
                    type: p.Type.INTEGER,
                    constructed: !1,
                    capture: "certificationRequestInfoVersion"
                }, {
                    name: "CertificationRequestInfo.subject",
                    tagClass: p.Class.UNIVERSAL,
                    type: p.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "certificationRequestInfoSubject"
                }, y, {
                    name: "CertificationRequestInfo.attributes",
                    tagClass: p.Class.CONTEXT_SPECIFIC,
                    type: 0,
                    constructed: !0,
                    optional: !0,
                    capture: "certificationRequestInfoAttributes",
                    value: [{
                        name: "CertificationRequestInfo.attributes",
                        tagClass: p.Class.UNIVERSAL,
                        type: p.Type.SEQUENCE,
                        constructed: !0,
                        value: [{
                            name: "CertificationRequestInfo.attributes.type",
                            tagClass: p.Class.UNIVERSAL,
                            type: p.Type.OID,
                            constructed: !1
                        }, {
                            name: "CertificationRequestInfo.attributes.value",
                            tagClass: p.Class.UNIVERSAL,
                            type: p.Type.SET,
                            constructed: !0
                        }]
                    }]
                }]
            },
            C = {
                name: "CertificationRequest",
                tagClass: p.Class.UNIVERSAL,
                type: p.Type.SEQUENCE,
                constructed: !0,
                captureAsn1: "csr",
                value: [m, {
                    name: "CertificationRequest.signatureAlgorithm",
                    tagClass: p.Class.UNIVERSAL,
                    type: p.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "CertificationRequest.signatureAlgorithm.algorithm",
                        tagClass: p.Class.UNIVERSAL,
                        type: p.Type.OID,
                        constructed: !1,
                        capture: "csrSignatureOid"
                    }, {
                        name: "CertificationRequest.signatureAlgorithm.parameters",
                        tagClass: p.Class.UNIVERSAL,
                        optional: !0,
                        captureAsn1: "csrSignatureParams"
                    }]
                }, {
                    name: "CertificationRequest.signature",
                    tagClass: p.Class.UNIVERSAL,
                    type: p.Type.BITSTRING,
                    constructed: !1,
                    captureBitStringValue: "csrSignature"
                }]
            };
        f.RDNAttributesAsArray = function(e, t) {
            for (var r, a, n, i = [], s = 0; s < e.value.length; ++s) {
                r = e.value[s];
                for (var o = 0; o < r.value.length; ++o) n = {}, a = r.value[o], n.type = p.derToOid(a.value[0].value), n.value = a.value[1].value, n.valueTagClass = a.value[1].type, n.type in h && (n.name = h[n.type], n.name in d && (n.shortName = d[n.name])), t && (t.update(n.type), t.update(n.value)), i.push(n)
            }
            return i
        }, f.CRIAttributesAsArray = function(e) {
            for (var t = [], r = 0; r < e.length; ++r)
                for (var a = e[r], n = p.derToOid(a.value[0].value), i = a.value[1].value, s = 0; s < i.length; ++s) {
                    var o = {};
                    if (o.type = n, o.value = i[s].value, o.valueTagClass = i[s].type, o.type in h && (o.name = h[o.type], o.name in d && (o.shortName = d[o.name])), o.type === h.extensionRequest) {
                        o.extensions = [];
                        for (var c = 0; c < o.value.length; ++c) o.extensions.push(f.certificateExtensionFromAsn1(o.value[c]))
                    }
                    t.push(o)
                }
            return t
        };
        var E = function(e, t, r) {
            var a = {};
            if (e !== h["RSASSA-PSS"]) return a;
            r && (a = {
                hash: {
                    algorithmOid: h.sha1
                },
                mgf: {
                    algorithmOid: h.mgf1,
                    hash: {
                        algorithmOid: h.sha1
                    }
                },
                saltLength: 20
            });
            var n = {},
                i = [];
            if (!p.validate(t, v, n, i)) {
                var s = new Error("Cannot read RSASSA-PSS parameter block.");
                throw s.errors = i, s
            }
            return void 0 !== n.hashOid && (a.hash = a.hash || {}, a.hash.algorithmOid = p.derToOid(n.hashOid)), void 0 !== n.maskGenOid && (a.mgf = a.mgf || {}, a.mgf.algorithmOid = p.derToOid(n.maskGenOid), a.mgf.hash = a.mgf.hash || {}, a.mgf.hash.algorithmOid = p.derToOid(n.maskGenHashOid)), void 0 !== n.saltLength && (a.saltLength = n.saltLength.charCodeAt(0)), a
        };
        f.certificateFromPem = function(e, t, r) {
            var a = l.pem.decode(e)[0];
            if ("CERTIFICATE" !== a.type && "X509 CERTIFICATE" !== a.type && "TRUSTED CERTIFICATE" !== a.type) {
                var n = new Error('Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".');
                throw n.headerType = a.type, n
            }
            if (a.procType && "ENCRYPTED" === a.procType.type) throw new Error("Could not convert certificate from PEM; PEM is encrypted.");
            var i = p.fromDer(a.body, r);
            return f.certificateFromAsn1(i, t)
        }, f.certificateToPem = function(e, t) {
            var r = {
                type: "CERTIFICATE",
                body: p.toDer(f.certificateToAsn1(e)).getBytes()
            };
            return l.pem.encode(r, {
                maxline: t
            })
        }, f.publicKeyFromPem = function(e) {
            var t = l.pem.decode(e)[0];
            if ("PUBLIC KEY" !== t.type && "RSA PUBLIC KEY" !== t.type) {
                var r = new Error('Could not convert public key from PEM; PEM header type is not "PUBLIC KEY" or "RSA PUBLIC KEY".');
                throw r.headerType = t.type, r
            }
            if (t.procType && "ENCRYPTED" === t.procType.type) throw new Error("Could not convert public key from PEM; PEM is encrypted.");
            var a = p.fromDer(t.body);
            return f.publicKeyFromAsn1(a)
        }, f.publicKeyToPem = function(e, t) {
            var r = {
                type: "PUBLIC KEY",
                body: p.toDer(f.publicKeyToAsn1(e)).getBytes()
            };
            return l.pem.encode(r, {
                maxline: t
            })
        }, f.publicKeyToRSAPublicKeyPem = function(e, t) {
            var r = {
                type: "RSA PUBLIC KEY",
                body: p.toDer(f.publicKeyToRSAPublicKey(e)).getBytes()
            };
            return l.pem.encode(r, {
                maxline: t
            })
        }, f.getPublicKeyFingerprint = function(e, t) {
            t = t || {};
            var r, a = t.md || l.md.sha1.create(),
                n = t.type || "RSAPublicKey";
            switch (n) {
                case "RSAPublicKey":
                    r = p.toDer(f.publicKeyToRSAPublicKey(e)).getBytes();
                    break;
                case "SubjectPublicKeyInfo":
                    r = p.toDer(f.publicKeyToAsn1(e)).getBytes();
                    break;
                default:
                    throw new Error('Unknown fingerprint type "' + t.type + '".')
            }
            a.start(), a.update(r);
            var i = a.digest();
            if ("hex" === t.encoding) {
                var s = i.toHex();
                return t.delimiter ? s.match(/.{2}/g).join(t.delimiter) : s
            }
            if ("binary" === t.encoding) return i.getBytes();
            if (t.encoding) throw new Error('Unknown encoding "' + t.encoding + '".');
            return i
        }, f.certificationRequestFromPem = function(e, t, r) {
            var a = l.pem.decode(e)[0];
            if ("CERTIFICATE REQUEST" !== a.type) {
                var n = new Error('Could not convert certification request from PEM; PEM header type is not "CERTIFICATE REQUEST".');
                throw n.headerType = a.type, n
            }
            if (a.procType && "ENCRYPTED" === a.procType.type) throw new Error("Could not convert certification request from PEM; PEM is encrypted.");
            var i = p.fromDer(a.body, r);
            return f.certificationRequestFromAsn1(i, t)
        }, f.certificationRequestToPem = function(e, t) {
            var r = {
                type: "CERTIFICATE REQUEST",
                body: p.toDer(f.certificationRequestToAsn1(e)).getBytes()
            };
            return l.pem.encode(r, {
                maxline: t
            })
        }, f.createCertificate = function() {
            var e = {};
            return e.version = 2, e.serialNumber = "00", e.signatureOid = null, e.signature = null, e.siginfo = {}, e.siginfo.algorithmOid = null, e.validity = {}, e.validity.notBefore = new Date, e.validity.notAfter = new Date, e.issuer = {}, e.issuer.getField = function(t) {
                return a(e.issuer, t)
            }, e.issuer.addField = function(t) {
                i([t]), e.issuer.attributes.push(t)
            }, e.issuer.attributes = [], e.issuer.hash = null, e.subject = {}, e.subject.getField = function(t) {
                return a(e.subject, t)
            }, e.subject.addField = function(t) {
                i([t]), e.subject.attributes.push(t)
            }, e.subject.attributes = [], e.subject.hash = null, e.extensions = [], e.publicKey = null, e.md = null, e.setSubject = function(t, r) {
                i(t), e.subject.attributes = t, delete e.subject.uniqueId, r && (e.subject.uniqueId = r), e.subject.hash = null
            }, e.setIssuer = function(t, r) {
                i(t), e.issuer.attributes = t, delete e.issuer.uniqueId, r && (e.issuer.uniqueId = r), e.issuer.hash = null
            }, e.setExtensions = function(t) {
                for (var r = 0; r < t.length; ++r) s(t[r], {
                    cert: e
                });
                e.extensions = t
            }, e.getExtension = function(t) {
                "string" == typeof t && (t = {
                    name: t
                });
                for (var r, a = null, n = 0; null === a && n < e.extensions.length; ++n) r = e.extensions[n], t.id && r.id === t.id ? a = r : t.name && r.name === t.name && (a = r);
                return a
            }, e.sign = function(t, r) {
                e.md = r || l.md.sha1.create();
                var a = h[e.md.algorithm + "WithRSAEncryption"];
                if (!a) {
                    var n = new Error("Could not compute certificate digest. Unknown message digest algorithm OID.");
                    throw n.algorithm = e.md.algorithm, n
                }
                e.signatureOid = e.siginfo.algorithmOid = a, e.tbsCertificate = f.getTBSCertificate(e);
                var i = p.toDer(e.tbsCertificate);
                e.md.update(i.getBytes()), e.signature = t.sign(e.md)
            }, e.verify = function(t) {
                var r = !1;
                if (!e.issued(t)) {
                    var a = t.issuer,
                        n = e.subject,
                        i = new Error("The parent certificate did not issue the given child certificate; the child certificate's issuer does not match the parent's subject.");
                    throw i.expectedIssuer = a.attributes, i.actualIssuer = n.attributes, i
                }
                var s = t.md;
                if (null === s) {
                    if (t.signatureOid in h) {
                        switch (h[t.signatureOid]) {
                            case "sha1WithRSAEncryption":
                                s = l.md.sha1.create();
                                break;
                            case "md5WithRSAEncryption":
                                s = l.md.md5.create();
                                break;
                            case "sha256WithRSAEncryption":
                                s = l.md.sha256.create();
                                break;
                            case "sha384WithRSAEncryption":
                                s = l.md.sha384.create();
                                break;
                            case "sha512WithRSAEncryption":
                                s = l.md.sha512.create();
                                break;
                            case "RSASSA-PSS":
                                s = l.md.sha256.create()
                        }
                    }
                    if (null === s) {
                        var i = new Error("Could not compute certificate digest. Unknown signature OID.");
                        throw i.signatureOid = t.signatureOid, i
                    }
                    var o = t.tbsCertificate || f.getTBSCertificate(t),
                        c = p.toDer(o);
                    s.update(c.getBytes())
                }
                if (null !== s) {
                    var u;
                    switch (t.signatureOid) {
                        case h.sha1WithRSAEncryption:
                            u = void 0;
                            break;
                        case h["RSASSA-PSS"]:
                            var d, y;
                            if (void 0 === (d = h[t.signatureParameters.mgf.hash.algorithmOid]) || void 0 === l.md[d]) {
                                var i = new Error("Unsupported MGF hash function.");
                                throw i.oid = t.signatureParameters.mgf.hash.algorithmOid, i.name = d, i
                            }
                            if (void 0 === (y = h[t.signatureParameters.mgf.algorithmOid]) || void 0 === l.mgf[y]) {
                                var i = new Error("Unsupported MGF function.");
                                throw i.oid = t.signatureParameters.mgf.algorithmOid, i.name = y, i
                            }
                            if (y = l.mgf[y].create(l.md[d].create()), void 0 === (d = h[t.signatureParameters.hash.algorithmOid]) || void 0 === l.md[d]) throw {
                                message: "Unsupported RSASSA-PSS hash function.",
                                oid: t.signatureParameters.hash.algorithmOid,
                                name: d
                            };
                            u = l.pss.create(l.md[d].create(), y, t.signatureParameters.saltLength)
                    }
                    r = e.publicKey.verify(s.digest().getBytes(), t.signature, u)
                }
                return r
            }, e.isIssuer = function(t) {
                var r = !1,
                    a = e.issuer,
                    n = t.subject;
                if (a.hash && n.hash) r = a.hash === n.hash;
                else if (a.attributes.length === n.attributes.length) {
                    r = !0;
                    for (var i, s, o = 0; r && o < a.attributes.length; ++o) i = a.attributes[o], s = n.attributes[o], i.type === s.type && i.value === s.value || (r = !1)
                }
                return r
            }, e.issued = function(t) {
                return t.isIssuer(e)
            }, e.generateSubjectKeyIdentifier = function() {
                return f.getPublicKeyFingerprint(e.publicKey, {
                    type: "RSAPublicKey"
                })
            }, e.verifySubjectKeyIdentifier = function() {
                for (var t = h.subjectKeyIdentifier, r = 0; r < e.extensions.length; ++r) {
                    var a = e.extensions[r];
                    if (a.id === t) {
                        var n = e.generateSubjectKeyIdentifier().getBytes();
                        return l.util.hexToBytes(a.subjectKeyIdentifier) === n
                    }
                }
                return !1
            }, e
        }, f.certificateFromAsn1 = function(e, t) {
            var r = {},
                n = [];
            if (!p.validate(e, g, r, n)) {
                var s = new Error("Cannot read X.509 certificate. ASN.1 object is not an X509v3 Certificate.");
                throw s.errors = n, s
            }
            var o = p.derToOid(r.publicKeyOid);
            if (o !== f.oids.rsaEncryption) throw new Error("Cannot read public key. OID is not RSA.");
            var c = f.createCertificate();
            c.version = r.certVersion ? r.certVersion.charCodeAt(0) : 0;
            var u = l.util.createBuffer(r.certSerialNumber);
            c.serialNumber = u.toHex(), c.signatureOid = l.asn1.derToOid(r.certSignatureOid), c.signatureParameters = E(c.signatureOid, r.certSignatureParams, !0), c.siginfo.algorithmOid = l.asn1.derToOid(r.certinfoSignatureOid), c.siginfo.parameters = E(c.siginfo.algorithmOid, r.certinfoSignatureParams, !1), c.signature = r.certSignature;
            var d = [];
            if (void 0 !== r.certValidity1UTCTime && d.push(p.utcTimeToDate(r.certValidity1UTCTime)), void 0 !== r.certValidity2GeneralizedTime && d.push(p.generalizedTimeToDate(r.certValidity2GeneralizedTime)), void 0 !== r.certValidity3UTCTime && d.push(p.utcTimeToDate(r.certValidity3UTCTime)), void 0 !== r.certValidity4GeneralizedTime && d.push(p.generalizedTimeToDate(r.certValidity4GeneralizedTime)), d.length > 2) throw new Error("Cannot read notBefore/notAfter validity times; more than two times were provided in the certificate.");
            if (d.length < 2) throw new Error("Cannot read notBefore/notAfter validity times; they were not provided as either UTCTime or GeneralizedTime.");
            if (c.validity.notBefore = d[0], c.validity.notAfter = d[1], c.tbsCertificate = r.tbsCertificate, t) {
                if (c.md = null, c.signatureOid in h) {
                    var o = h[c.signatureOid];
                    switch (o) {
                        case "sha1WithRSAEncryption":
                            c.md = l.md.sha1.create();
                            break;
                        case "md5WithRSAEncryption":
                            c.md = l.md.md5.create();
                            break;
                        case "sha256WithRSAEncryption":
                            c.md = l.md.sha256.create();
                            break;
                        case "sha384WithRSAEncryption":
                            c.md = l.md.sha384.create();
                            break;
                        case "sha512WithRSAEncryption":
                            c.md = l.md.sha512.create();
                            break;
                        case "RSASSA-PSS":
                            c.md = l.md.sha256.create()
                    }
                }
                if (null === c.md) {
                    var s = new Error("Could not compute certificate digest. Unknown signature OID.");
                    throw s.signatureOid = c.signatureOid, s
                }
                var y = p.toDer(c.tbsCertificate);
                c.md.update(y.getBytes())
            }
            var v = l.md.sha1.create();
            c.issuer.getField = function(e) {
                return a(c.issuer, e)
            }, c.issuer.addField = function(e) {
                i([e]), c.issuer.attributes.push(e)
            }, c.issuer.attributes = f.RDNAttributesAsArray(r.certIssuer, v), r.certIssuerUniqueId && (c.issuer.uniqueId = r.certIssuerUniqueId), c.issuer.hash = v.digest().toHex();
            var m = l.md.sha1.create();
            return c.subject.getField = function(e) {
                return a(c.subject, e)
            }, c.subject.addField = function(e) {
                i([e]), c.subject.attributes.push(e)
            }, c.subject.attributes = f.RDNAttributesAsArray(r.certSubject, m), r.certSubjectUniqueId && (c.subject.uniqueId = r.certSubjectUniqueId), c.subject.hash = m.digest().toHex(), r.certExtensions ? c.extensions = f.certificateExtensionsFromAsn1(r.certExtensions) : c.extensions = [], c.publicKey = f.publicKeyFromAsn1(r.subjectPublicKeyInfo), c
        }, f.certificateExtensionsFromAsn1 = function(e) {
            for (var t = [], r = 0; r < e.value.length; ++r)
                for (var a = e.value[r], n = 0; n < a.value.length; ++n) t.push(f.certificateExtensionFromAsn1(a.value[n]));
            return t
        }, f.certificateExtensionFromAsn1 = function(e) {
            var t = {};
            if (t.id = p.derToOid(e.value[0].value), t.critical = !1, e.value[1].type === p.Type.BOOLEAN ? (t.critical = 0 !== e.value[1].value.charCodeAt(0), t.value = e.value[2].value) : t.value = e.value[1].value, t.id in h)
                if (t.name = h[t.id], "keyUsage" === t.name) {
                    var r = p.fromDer(t.value),
                        a = 0,
                        n = 0;
                    r.value.length > 1 && (a = r.value.charCodeAt(1), n = r.value.length > 2 ? r.value.charCodeAt(2) : 0), t.digitalSignature = 128 == (128 & a), t.nonRepudiation = 64 == (64 & a), t.keyEncipherment = 32 == (32 & a), t.dataEncipherment = 16 == (16 & a), t.keyAgreement = 8 == (8 & a), t.keyCertSign = 4 == (4 & a), t.cRLSign = 2 == (2 & a), t.encipherOnly = 1 == (1 & a), t.decipherOnly = 128 == (128 & n)
                } else if ("basicConstraints" === t.name) {
                var r = p.fromDer(t.value);
                r.value.length > 0 && r.value[0].type === p.Type.BOOLEAN ? t.cA = 0 !== r.value[0].value.charCodeAt(0) : t.cA = !1;
                var i = null;
                r.value.length > 0 && r.value[0].type === p.Type.INTEGER ? i = r.value[0].value : r.value.length > 1 && (i = r.value[1].value), null !== i && (t.pathLenConstraint = p.derToInteger(i))
            } else if ("extKeyUsage" === t.name)
                for (var r = p.fromDer(t.value), s = 0; s < r.value.length; ++s) {
                    var o = p.derToOid(r.value[s].value);
                    o in h ? t[h[o]] = !0 : t[o] = !0
                } else if ("nsCertType" === t.name) {
                    var r = p.fromDer(t.value),
                        a = 0;
                    r.value.length > 1 && (a = r.value.charCodeAt(1)), t.client = 128 == (128 & a), t.server = 64 == (64 & a), t.email = 32 == (32 & a), t.objsign = 16 == (16 & a), t.reserved = 8 == (8 & a), t.sslCA = 4 == (4 & a), t.emailCA = 2 == (2 & a), t.objCA = 1 == (1 & a)
                } else if ("subjectAltName" === t.name || "issuerAltName" === t.name) {
                t.altNames = [];
                for (var c, r = p.fromDer(t.value), u = 0; u < r.value.length; ++u) {
                    c = r.value[u];
                    var f = {
                        type: c.type,
                        value: c.value
                    };
                    switch (t.altNames.push(f), c.type) {
                        case 1:
                        case 2:
                        case 6:
                            break;
                        case 7:
                            f.ip = l.util.bytesToIP(c.value);
                            break;
                        case 8:
                            f.oid = p.derToOid(c.value)
                    }
                }
            } else if ("subjectKeyIdentifier" === t.name) {
                var r = p.fromDer(t.value);
                t.subjectKeyIdentifier = l.util.bytesToHex(r.value)
            }
            return t
        }, f.certificationRequestFromAsn1 = function(e, t) {
            var r = {},
                n = [];
            if (!p.validate(e, C, r, n)) {
                var s = new Error("Cannot read PKCS#10 certificate request. ASN.1 object is not a PKCS#10 CertificationRequest.");
                throw s.errors = n, s
            }
            var o = p.derToOid(r.publicKeyOid);
            if (o !== f.oids.rsaEncryption) throw new Error("Cannot read public key. OID is not RSA.");
            var c = f.createCertificationRequest();
            if (c.version = r.csrVersion ? r.csrVersion.charCodeAt(0) : 0, c.signatureOid = l.asn1.derToOid(r.csrSignatureOid), c.signatureParameters = E(c.signatureOid, r.csrSignatureParams, !0), c.siginfo.algorithmOid = l.asn1.derToOid(r.csrSignatureOid), c.siginfo.parameters = E(c.siginfo.algorithmOid, r.csrSignatureParams, !1), c.signature = r.csrSignature, c.certificationRequestInfo = r.certificationRequestInfo, t) {
                if (c.md = null, c.signatureOid in h) {
                    var o = h[c.signatureOid];
                    switch (o) {
                        case "sha1WithRSAEncryption":
                            c.md = l.md.sha1.create();
                            break;
                        case "md5WithRSAEncryption":
                            c.md = l.md.md5.create();
                            break;
                        case "sha256WithRSAEncryption":
                            c.md = l.md.sha256.create();
                            break;
                        case "sha384WithRSAEncryption":
                            c.md = l.md.sha384.create();
                            break;
                        case "sha512WithRSAEncryption":
                            c.md = l.md.sha512.create();
                            break;
                        case "RSASSA-PSS":
                            c.md = l.md.sha256.create()
                    }
                }
                if (null === c.md) {
                    var s = new Error("Could not compute certification request digest. Unknown signature OID.");
                    throw s.signatureOid = c.signatureOid, s
                }
                var u = p.toDer(c.certificationRequestInfo);
                c.md.update(u.getBytes())
            }
            var d = l.md.sha1.create();
            return c.subject.getField = function(e) {
                return a(c.subject, e)
            }, c.subject.addField = function(e) {
                i([e]), c.subject.attributes.push(e)
            }, c.subject.attributes = f.RDNAttributesAsArray(r.certificationRequestInfoSubject, d), c.subject.hash = d.digest().toHex(), c.publicKey = f.publicKeyFromAsn1(r.subjectPublicKeyInfo), c.getAttribute = function(e) {
                return a(c, e)
            }, c.addAttribute = function(e) {
                i([e]), c.attributes.push(e)
            }, c.attributes = f.CRIAttributesAsArray(r.certificationRequestInfoAttributes || []), c
        }, f.createCertificationRequest = function() {
            var e = {};
            return e.version = 0, e.signatureOid = null, e.signature = null, e.siginfo = {}, e.siginfo.algorithmOid = null, e.subject = {}, e.subject.getField = function(t) {
                return a(e.subject, t)
            }, e.subject.addField = function(t) {
                i([t]), e.subject.attributes.push(t)
            }, e.subject.attributes = [], e.subject.hash = null, e.publicKey = null, e.attributes = [], e.getAttribute = function(t) {
                return a(e, t)
            }, e.addAttribute = function(t) {
                i([t]), e.attributes.push(t)
            }, e.md = null, e.setSubject = function(t) {
                i(t), e.subject.attributes = t, e.subject.hash = null
            }, e.setAttributes = function(t) {
                i(t), e.attributes = t
            }, e.sign = function(t, r) {
                e.md = r || l.md.sha1.create();
                var a = h[e.md.algorithm + "WithRSAEncryption"];
                if (!a) {
                    var n = new Error("Could not compute certification request digest. Unknown message digest algorithm OID.");
                    throw n.algorithm = e.md.algorithm, n
                }
                e.signatureOid = e.siginfo.algorithmOid = a, e.certificationRequestInfo = f.getCertificationRequestInfo(e);
                var i = p.toDer(e.certificationRequestInfo);
                e.md.update(i.getBytes()), e.signature = t.sign(e.md)
            }, e.verify = function() {
                var t = !1,
                    r = e.md;
                if (null === r) {
                    if (e.signatureOid in h) {
                        switch (h[e.signatureOid]) {
                            case "sha1WithRSAEncryption":
                                r = l.md.sha1.create();
                                break;
                            case "md5WithRSAEncryption":
                                r = l.md.md5.create();
                                break;
                            case "sha256WithRSAEncryption":
                                r = l.md.sha256.create();
                                break;
                            case "sha384WithRSAEncryption":
                                r = l.md.sha384.create();
                                break;
                            case "sha512WithRSAEncryption":
                                r = l.md.sha512.create();
                                break;
                            case "RSASSA-PSS":
                                r = l.md.sha256.create()
                        }
                    }
                    if (null === r) {
                        var a = new Error("Could not compute certification request digest. Unknown signature OID.");
                        throw a.signatureOid = e.signatureOid, a
                    }
                    var n = e.certificationRequestInfo || f.getCertificationRequestInfo(e),
                        i = p.toDer(n);
                    r.update(i.getBytes())
                }
                if (null !== r) {
                    var s;
                    switch (e.signatureOid) {
                        case h.sha1WithRSAEncryption:
                            break;
                        case h["RSASSA-PSS"]:
                            var o, c;
                            if (void 0 === (o = h[e.signatureParameters.mgf.hash.algorithmOid]) || void 0 === l.md[o]) {
                                var a = new Error("Unsupported MGF hash function.");
                                throw a.oid = e.signatureParameters.mgf.hash.algorithmOid, a.name = o, a
                            }
                            if (void 0 === (c = h[e.signatureParameters.mgf.algorithmOid]) || void 0 === l.mgf[c]) {
                                var a = new Error("Unsupported MGF function.");
                                throw a.oid = e.signatureParameters.mgf.algorithmOid, a.name = c, a
                            }
                            if (c = l.mgf[c].create(l.md[o].create()), void 0 === (o = h[e.signatureParameters.hash.algorithmOid]) || void 0 === l.md[o]) {
                                var a = new Error("Unsupported RSASSA-PSS hash function.");
                                throw a.oid = e.signatureParameters.hash.algorithmOid, a.name = o, a
                            }
                            s = l.pss.create(l.md[o].create(), c, e.signatureParameters.saltLength)
                    }
                    t = e.publicKey.verify(r.digest().getBytes(), e.signature, s)
                }
                return t
            }, e
        };
        const S = new Date("1950-01-01T00:00:00Z"),
            T = new Date("2050-01-01T00:00:00Z");
        f.getTBSCertificate = function(e) {
            var t = u(e.validity.notBefore),
                r = u(e.validity.notAfter),
                a = p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, [p.create(p.Class.CONTEXT_SPECIFIC, 0, !0, [p.create(p.Class.UNIVERSAL, p.Type.INTEGER, !1, p.integerToDer(e.version).getBytes())]), p.create(p.Class.UNIVERSAL, p.Type.INTEGER, !1, l.util.hexToBytes(e.serialNumber)), p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, [p.create(p.Class.UNIVERSAL, p.Type.OID, !1, p.oidToDer(e.siginfo.algorithmOid).getBytes()), o(e.siginfo.algorithmOid, e.siginfo.parameters)]), n(e.issuer), p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, [t, r]), n(e.subject), f.publicKeyToAsn1(e.publicKey)]);
            return e.issuer.uniqueId && a.value.push(p.create(p.Class.CONTEXT_SPECIFIC, 1, !0, [p.create(p.Class.UNIVERSAL, p.Type.BITSTRING, !1, String.fromCharCode(0) + e.issuer.uniqueId)])), e.subject.uniqueId && a.value.push(p.create(p.Class.CONTEXT_SPECIFIC, 2, !0, [p.create(p.Class.UNIVERSAL, p.Type.BITSTRING, !1, String.fromCharCode(0) + e.subject.uniqueId)])), e.extensions.length > 0 && a.value.push(f.certificateExtensionsToAsn1(e.extensions)), a
        }, f.getCertificationRequestInfo = function(e) {
            return p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, [p.create(p.Class.UNIVERSAL, p.Type.INTEGER, !1, p.integerToDer(e.version).getBytes()), n(e.subject), f.publicKeyToAsn1(e.publicKey), c(e)])
        }, f.distinguishedNameToAsn1 = function(e) {
            return n(e)
        }, f.certificateToAsn1 = function(e) {
            var t = e.tbsCertificate || f.getTBSCertificate(e);
            return p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, [t, p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, [p.create(p.Class.UNIVERSAL, p.Type.OID, !1, p.oidToDer(e.signatureOid).getBytes()), o(e.signatureOid, e.signatureParameters)]), p.create(p.Class.UNIVERSAL, p.Type.BITSTRING, !1, String.fromCharCode(0) + e.signature)])
        }, f.certificateExtensionsToAsn1 = function(e) {
            var t = p.create(p.Class.CONTEXT_SPECIFIC, 3, !0, []),
                r = p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, []);
            t.value.push(r);
            for (var a = 0; a < e.length; ++a) r.value.push(f.certificateExtensionToAsn1(e[a]));
            return t
        }, f.certificateExtensionToAsn1 = function(e) {
            var t = p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, []);
            t.value.push(p.create(p.Class.UNIVERSAL, p.Type.OID, !1, p.oidToDer(e.id).getBytes())), e.critical && t.value.push(p.create(p.Class.UNIVERSAL, p.Type.BOOLEAN, !1, String.fromCharCode(255)));
            var r = e.value;
            return "string" != typeof e.value && (r = p.toDer(r).getBytes()), t.value.push(p.create(p.Class.UNIVERSAL, p.Type.OCTETSTRING, !1, r)), t
        }, f.certificationRequestToAsn1 = function(e) {
            var t = e.certificationRequestInfo || f.getCertificationRequestInfo(e);
            return p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, [t, p.create(p.Class.UNIVERSAL, p.Type.SEQUENCE, !0, [p.create(p.Class.UNIVERSAL, p.Type.OID, !1, p.oidToDer(e.signatureOid).getBytes()), o(e.signatureOid, e.signatureParameters)]), p.create(p.Class.UNIVERSAL, p.Type.BITSTRING, !1, String.fromCharCode(0) + e.signature)])
        }, f.createCaStore = function(e) {
            function t(e) {
                return r(e), a.certs[e.hash] || null
            }

            function r(e) {
                if (!e.hash) {
                    var t = l.md.sha1.create();
                    e.attributes = f.RDNAttributesAsArray(n(e), t), e.hash = t.digest().toHex()
                }
            }
            var a = {
                certs: {}
            };
            if (a.getIssuer = function(e) {
                    return t(e.issuer)
                }, a.addCertificate = function(e) {
                    if ("string" == typeof e && (e = l.pki.certificateFromPem(e)), r(e.subject), !a.hasCertificate(e))
                        if (e.subject.hash in a.certs) {
                            var t = a.certs[e.subject.hash];
                            l.util.isArray(t) || (t = [t]), t.push(e), a.certs[e.subject.hash] = t
                        } else a.certs[e.subject.hash] = e
                }, a.hasCertificate = function(e) {
                    "string" == typeof e && (e = l.pki.certificateFromPem(e));
                    var r = t(e.subject);
                    if (!r) return !1;
                    l.util.isArray(r) || (r = [r]);
                    for (var a = p.toDer(f.certificateToAsn1(e)).getBytes(), n = 0; n < r.length; ++n) {
                        if (a === p.toDer(f.certificateToAsn1(r[n])).getBytes()) return !0
                    }
                    return !1
                }, a.listAllCertificates = function() {
                    var e = [];
                    for (var t in a.certs)
                        if (a.certs.hasOwnProperty(t)) {
                            var r = a.certs[t];
                            if (l.util.isArray(r))
                                for (var n = 0; n < r.length; ++n) e.push(r[n]);
                            else e.push(r)
                        }
                    return e
                }, a.removeCertificate = function(e) {
                    var n;
                    if ("string" == typeof e && (e = l.pki.certificateFromPem(e)), r(e.subject), !a.hasCertificate(e)) return null;
                    var i = t(e.subject);
                    if (!l.util.isArray(i)) return n = a.certs[e.subject.hash], delete a.certs[e.subject.hash], n;
                    for (var s = p.toDer(f.certificateToAsn1(e)).getBytes(), o = 0; o < i.length; ++o) {
                        s === p.toDer(f.certificateToAsn1(i[o])).getBytes() && (n = i[o], i.splice(o, 1))
                    }
                    return 0 === i.length && delete a.certs[e.subject.hash], n
                }, e)
                for (var i = 0; i < e.length; ++i) {
                    var s = e[i];
                    a.addCertificate(s)
                }
            return a
        }, f.certificateError = {
            bad_certificate: "forge.pki.BadCertificate",
            unsupported_certificate: "forge.pki.UnsupportedCertificate",
            certificate_revoked: "forge.pki.CertificateRevoked",
            certificate_expired: "forge.pki.CertificateExpired",
            certificate_unknown: "forge.pki.CertificateUnknown",
            unknown_ca: "forge.pki.UnknownCertificateAuthority"
        }, f.verifyCertificateChain = function(e, t, r) {
            "function" == typeof r && (r = {
                verify: r
            }), r = r || {}, t = t.slice(0);
            var a = t.slice(0),
                n = r.validityCheckDate;
            void 0 === n && (n = new Date);
            var i = !0,
                s = null,
                o = 0;
            do {
                var c = t.shift(),
                    u = null,
                    p = !1;
                if (n && (n < c.validity.notBefore || n > c.validity.notAfter) && (s = {
                        message: "Certificate is not valid yet or has expired.",
                        error: f.certificateError.certificate_expired,
                        notBefore: c.validity.notBefore,
                        notAfter: c.validity.notAfter,
                        now: n
                    }), null === s) {
                    if (u = t[0] || e.getIssuer(c), null === u && c.isIssuer(c) && (p = !0, u = c), u) {
                        var h = u;
                        l.util.isArray(h) || (h = [h]);
                        for (var d = !1; !d && h.length > 0;) {
                            u = h.shift();
                            try {
                                d = u.verify(c)
                            } catch (e) {}
                        }
                        d || (s = {
                            message: "Certificate signature is invalid.",
                            error: f.certificateError.bad_certificate
                        })
                    }
                    null !== s || u && !p || e.hasCertificate(c) || (s = {
                        message: "Certificate is not trusted.",
                        error: f.certificateError.unknown_ca
                    })
                }
                if (null === s && u && !c.isIssuer(u) && (s = {
                        message: "Certificate issuer is invalid.",
                        error: f.certificateError.bad_certificate
                    }), null === s)
                    for (var y = {
                            keyUsage: !0,
                            basicConstraints: !0
                        }, g = 0; null === s && g < c.extensions.length; ++g) {
                        var v = c.extensions[g];
                        !v.critical || v.name in y || (s = {
                            message: "Certificate has an unsupported critical extension.",
                            error: f.certificateError.unsupported_certificate
                        })
                    }
                if (null === s && (!i || 0 === t.length && (!u || p))) {
                    var m = c.getExtension("basicConstraints"),
                        C = c.getExtension("keyUsage");
                    if (null !== C && (C.keyCertSign && null !== m || (s = {
                            message: "Certificate keyUsage or basicConstraints conflict or indicate that the certificate is not a CA. If the certificate is the only one in the chain or isn't the first then the certificate must be a valid CA.",
                            error: f.certificateError.bad_certificate
                        })), null !== s || null === m || m.cA || (s = {
                            message: "Certificate basicConstraints indicates the certificate is not a CA.",
                            error: f.certificateError.bad_certificate
                        }), null === s && null !== C && "pathLenConstraint" in m) {
                        o - 1 > m.pathLenConstraint && (s = {
                            message: "Certificate basicConstraints pathLenConstraint violated.",
                            error: f.certificateError.bad_certificate
                        })
                    }
                }
                var E = null === s || s.error,
                    S = r.verify ? r.verify(E, o, a) : E;
                if (!0 !== S) throw !0 === E && (s = {
                    message: "The application rejected the certificate.",
                    error: f.certificateError.bad_certificate
                }), (S || 0 === S) && ("object" != typeof S || l.util.isArray(S) ? "string" == typeof S && (s.error = S) : (S.message && (s.message = S.message), S.error && (s.error = S.error))), s;
                s = null, i = !1, ++o
            } while (t.length > 0);
            return !0
        }
    }, function(e, t, r) {
        var a = r(0);
        r(2), r(1), (e.exports = a.pss = a.pss || {}).create = function(e) {
            3 === arguments.length && (e = {
                md: arguments[0],
                mgf: arguments[1],
                saltLength: arguments[2]
            });
            var t = e.md,
                r = e.mgf,
                n = t.digestLength,
                i = e.salt || null;
            "string" == typeof i && (i = a.util.createBuffer(i));
            var s;
            if ("saltLength" in e) s = e.saltLength;
            else {
                if (null === i) throw new Error("Salt length not specified or specific salt not given.");
                s = i.length()
            }
            if (null !== i && i.length() !== s) throw new Error("Given salt length does not match length of given salt.");
            var o = e.prng || a.random,
                c = {};
            return c.encode = function(e, c) {
                var u, l = c - 1,
                    p = Math.ceil(l / 8),
                    f = e.digest().getBytes();
                if (p < n + s + 2) throw new Error("Message is too long to encrypt.");
                var h;
                h = null === i ? o.getBytesSync(s) : i.bytes();
                var d = new a.util.ByteBuffer;
                d.fillWithByte(0, 8), d.putBytes(f), d.putBytes(h), t.start(), t.update(d.getBytes());
                var y = t.digest().getBytes(),
                    g = new a.util.ByteBuffer;
                g.fillWithByte(0, p - s - n - 2), g.putByte(1), g.putBytes(h);
                var v = g.getBytes(),
                    m = p - n - 1,
                    C = r.generate(y, m),
                    E = "";
                for (u = 0; u < m; u++) E += String.fromCharCode(v.charCodeAt(u) ^ C.charCodeAt(u));
                var S = 65280 >> 8 * p - l & 255;
                return (E = String.fromCharCode(E.charCodeAt(0) & ~S) + E.substr(1)) + y + String.fromCharCode(188)
            }, c.verify = function(e, i, o) {
                var c, u = o - 1,
                    l = Math.ceil(u / 8);
                if (i = i.substr(-l), l < n + s + 2) throw new Error("Inconsistent parameters to PSS signature verification.");
                if (188 !== i.charCodeAt(l - 1)) throw new Error("Encoded message does not end in 0xBC.");
                var p = l - n - 1,
                    f = i.substr(0, p),
                    h = i.substr(p, n),
                    d = 65280 >> 8 * l - u & 255;
                if (0 != (f.charCodeAt(0) & d)) throw new Error("Bits beyond keysize not zero as expected.");
                var y = r.generate(h, p),
                    g = "";
                for (c = 0; c < p; c++) g += String.fromCharCode(f.charCodeAt(c) ^ y.charCodeAt(c));
                g = String.fromCharCode(g.charCodeAt(0) & ~d) + g.substr(1);
                var v = l - n - s - 2;
                for (c = 0; c < v; c++)
                    if (0 !== g.charCodeAt(c)) throw new Error("Leftmost octets not zero as expected");
                if (1 !== g.charCodeAt(v)) throw new Error("Inconsistent PSS signature, 0x01 marker not found");
                var m = g.substr(-s),
                    C = new a.util.ByteBuffer;
                return C.fillWithByte(0, 8), C.putBytes(e), C.putBytes(m), t.start(), t.update(C.getBytes()), h === t.digest().getBytes()
            }, c
        }
    }, function(e, t, r) {
        function a(e) {
            if ("string" == typeof e && (e = s.util.createBuffer(e)), s.util.isArray(e) && e.length > 4) {
                var t = e;
                e = s.util.createBuffer();
                for (var r = 0; r < t.length; ++r) e.putByte(t[r])
            }
            return s.util.isArray(e) || (e = [e.getInt32(), e.getInt32(), e.getInt32(), e.getInt32()]), e
        }

        function n(e) {
            e[e.length - 1] = e[e.length - 1] + 1 & 4294967295
        }

        function i(e) {
            return [e / 4294967296 | 0, 4294967295 & e]
        }
        var s = r(0);
        r(1), s.cipher = s.cipher || {};
        var o = e.exports = s.cipher.modes = s.cipher.modes || {};
        o.ecb = function(e) {
            e = e || {}, this.name = "ECB", this.cipher = e.cipher, this.blockSize = e.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = new Array(this._ints), this._outBlock = new Array(this._ints)
        }, o.ecb.prototype.start = function(e) {}, o.ecb.prototype.encrypt = function(e, t, r) {
            if (e.length() < this.blockSize && !(r && e.length() > 0)) return !0;
            for (var a = 0; a < this._ints; ++a) this._inBlock[a] = e.getInt32();
            this.cipher.encrypt(this._inBlock, this._outBlock);
            for (var a = 0; a < this._ints; ++a) t.putInt32(this._outBlock[a])
        }, o.ecb.prototype.decrypt = function(e, t, r) {
            if (e.length() < this.blockSize && !(r && e.length() > 0)) return !0;
            for (var a = 0; a < this._ints; ++a) this._inBlock[a] = e.getInt32();
            this.cipher.decrypt(this._inBlock, this._outBlock);
            for (var a = 0; a < this._ints; ++a) t.putInt32(this._outBlock[a])
        }, o.ecb.prototype.pad = function(e, t) {
            var r = e.length() === this.blockSize ? this.blockSize : this.blockSize - e.length();
            return e.fillWithByte(r, r), !0
        }, o.ecb.prototype.unpad = function(e, t) {
            if (t.overflow > 0) return !1;
            var r = e.length(),
                a = e.at(r - 1);
            return !(a > this.blockSize << 2) && (e.truncate(a), !0)
        }, o.cbc = function(e) {
            e = e || {}, this.name = "CBC", this.cipher = e.cipher, this.blockSize = e.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = new Array(this._ints), this._outBlock = new Array(this._ints)
        }, o.cbc.prototype.start = function(e) {
            if (null === e.iv) {
                if (!this._prev) throw new Error("Invalid IV parameter.");
                this._iv = this._prev.slice(0)
            } else {
                if (!("iv" in e)) throw new Error("Invalid IV parameter.");
                this._iv = a(e.iv), this._prev = this._iv.slice(0)
            }
        }, o.cbc.prototype.encrypt = function(e, t, r) {
            if (e.length() < this.blockSize && !(r && e.length() > 0)) return !0;
            for (var a = 0; a < this._ints; ++a) this._inBlock[a] = this._prev[a] ^ e.getInt32();
            this.cipher.encrypt(this._inBlock, this._outBlock);
            for (var a = 0; a < this._ints; ++a) t.putInt32(this._outBlock[a]);
            this._prev = this._outBlock
        }, o.cbc.prototype.decrypt = function(e, t, r) {
            if (e.length() < this.blockSize && !(r && e.length() > 0)) return !0;
            for (var a = 0; a < this._ints; ++a) this._inBlock[a] = e.getInt32();
            this.cipher.decrypt(this._inBlock, this._outBlock);
            for (var a = 0; a < this._ints; ++a) t.putInt32(this._prev[a] ^ this._outBlock[a]);
            this._prev = this._inBlock.slice(0)
        }, o.cbc.prototype.pad = function(e, t) {
            var r = e.length() === this.blockSize ? this.blockSize : this.blockSize - e.length();
            return e.fillWithByte(r, r), !0
        }, o.cbc.prototype.unpad = function(e, t) {
            if (t.overflow > 0) return !1;
            var r = e.length(),
                a = e.at(r - 1);
            return !(a > this.blockSize << 2) && (e.truncate(a), !0)
        }, o.cfb = function(e) {
            e = e || {}, this.name = "CFB", this.cipher = e.cipher, this.blockSize = e.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = null, this._outBlock = new Array(this._ints), this._partialBlock = new Array(this._ints), this._partialOutput = s.util.createBuffer(), this._partialBytes = 0
        }, o.cfb.prototype.start = function(e) {
            if (!("iv" in e)) throw new Error("Invalid IV parameter.");
            this._iv = a(e.iv), this._inBlock = this._iv.slice(0), this._partialBytes = 0
        }, o.cfb.prototype.encrypt = function(e, t, r) {
            var a = e.length();
            if (0 === a) return !0;
            if (this.cipher.encrypt(this._inBlock, this._outBlock), 0 === this._partialBytes && a >= this.blockSize)
                for (var n = 0; n < this._ints; ++n) this._inBlock[n] = e.getInt32() ^ this._outBlock[n], t.putInt32(this._inBlock[n]);
            else {
                var i = (this.blockSize - a) % this.blockSize;
                i > 0 && (i = this.blockSize - i), this._partialOutput.clear();
                for (var n = 0; n < this._ints; ++n) this._partialBlock[n] = e.getInt32() ^ this._outBlock[n], this._partialOutput.putInt32(this._partialBlock[n]);
                if (i > 0) e.read -= this.blockSize;
                else
                    for (var n = 0; n < this._ints; ++n) this._inBlock[n] = this._partialBlock[n];
                if (this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes), i > 0 && !r) return t.putBytes(this._partialOutput.getBytes(i - this._partialBytes)), this._partialBytes = i, !0;
                t.putBytes(this._partialOutput.getBytes(a - this._partialBytes)), this._partialBytes = 0
            }
        }, o.cfb.prototype.decrypt = function(e, t, r) {
            var a = e.length();
            if (0 === a) return !0;
            if (this.cipher.encrypt(this._inBlock, this._outBlock), 0 === this._partialBytes && a >= this.blockSize)
                for (var n = 0; n < this._ints; ++n) this._inBlock[n] = e.getInt32(), t.putInt32(this._inBlock[n] ^ this._outBlock[n]);
            else {
                var i = (this.blockSize - a) % this.blockSize;
                i > 0 && (i = this.blockSize - i), this._partialOutput.clear();
                for (var n = 0; n < this._ints; ++n) this._partialBlock[n] = e.getInt32(), this._partialOutput.putInt32(this._partialBlock[n] ^ this._outBlock[n]);
                if (i > 0) e.read -= this.blockSize;
                else
                    for (var n = 0; n < this._ints; ++n) this._inBlock[n] = this._partialBlock[n];
                if (this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes), i > 0 && !r) return t.putBytes(this._partialOutput.getBytes(i - this._partialBytes)), this._partialBytes = i, !0;
                t.putBytes(this._partialOutput.getBytes(a - this._partialBytes)), this._partialBytes = 0
            }
        }, o.ofb = function(e) {
            e = e || {}, this.name = "OFB", this.cipher = e.cipher, this.blockSize = e.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = null, this._outBlock = new Array(this._ints), this._partialOutput = s.util.createBuffer(), this._partialBytes = 0
        }, o.ofb.prototype.start = function(e) {
            if (!("iv" in e)) throw new Error("Invalid IV parameter.");
            this._iv = a(e.iv), this._inBlock = this._iv.slice(0), this._partialBytes = 0
        }, o.ofb.prototype.encrypt = function(e, t, r) {
            var a = e.length();
            if (0 === e.length()) return !0;
            if (this.cipher.encrypt(this._inBlock, this._outBlock), 0 === this._partialBytes && a >= this.blockSize)
                for (var n = 0; n < this._ints; ++n) t.putInt32(e.getInt32() ^ this._outBlock[n]), this._inBlock[n] = this._outBlock[n];
            else {
                var i = (this.blockSize - a) % this.blockSize;
                i > 0 && (i = this.blockSize - i), this._partialOutput.clear();
                for (var n = 0; n < this._ints; ++n) this._partialOutput.putInt32(e.getInt32() ^ this._outBlock[n]);
                if (i > 0) e.read -= this.blockSize;
                else
                    for (var n = 0; n < this._ints; ++n) this._inBlock[n] = this._outBlock[n];
                if (this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes), i > 0 && !r) return t.putBytes(this._partialOutput.getBytes(i - this._partialBytes)), this._partialBytes = i, !0;
                t.putBytes(this._partialOutput.getBytes(a - this._partialBytes)), this._partialBytes = 0
            }
        }, o.ofb.prototype.decrypt = o.ofb.prototype.encrypt, o.ctr = function(e) {
            e = e || {}, this.name = "CTR", this.cipher = e.cipher, this.blockSize = e.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = null, this._outBlock = new Array(this._ints), this._partialOutput = s.util.createBuffer(), this._partialBytes = 0
        }, o.ctr.prototype.start = function(e) {
            if (!("iv" in e)) throw new Error("Invalid IV parameter.");
            this._iv = a(e.iv), this._inBlock = this._iv.slice(0), this._partialBytes = 0
        }, o.ctr.prototype.encrypt = function(e, t, r) {
            var a = e.length();
            if (0 === a) return !0;
            if (this.cipher.encrypt(this._inBlock, this._outBlock), 0 === this._partialBytes && a >= this.blockSize)
                for (var i = 0; i < this._ints; ++i) t.putInt32(e.getInt32() ^ this._outBlock[i]);
            else {
                var s = (this.blockSize - a) % this.blockSize;
                s > 0 && (s = this.blockSize - s), this._partialOutput.clear();
                for (var i = 0; i < this._ints; ++i) this._partialOutput.putInt32(e.getInt32() ^ this._outBlock[i]);
                if (s > 0 && (e.read -= this.blockSize), this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes), s > 0 && !r) return t.putBytes(this._partialOutput.getBytes(s - this._partialBytes)), this._partialBytes = s, !0;
                t.putBytes(this._partialOutput.getBytes(a - this._partialBytes)), this._partialBytes = 0
            }
            n(this._inBlock)
        }, o.ctr.prototype.decrypt = o.ctr.prototype.encrypt, o.gcm = function(e) {
            e = e || {}, this.name = "GCM", this.cipher = e.cipher, this.blockSize = e.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = new Array(this._ints), this._outBlock = new Array(this._ints), this._partialOutput = s.util.createBuffer(), this._partialBytes = 0, this._R = 3774873600
        }, o.gcm.prototype.start = function(e) {
            if (!("iv" in e)) throw new Error("Invalid IV parameter.");
            var t = s.util.createBuffer(e.iv);
            this._cipherLength = 0;
            var r;
            if (r = "additionalData" in e ? s.util.createBuffer(e.additionalData) : s.util.createBuffer(), this._tagLength = "tagLength" in e ? e.tagLength : 128, this._tag = null, e.decrypt && (this._tag = s.util.createBuffer(e.tag).getBytes(), this._tag.length !== this._tagLength / 8)) throw new Error("Authentication tag does not match tag length.");
            this._hashBlock = new Array(this._ints), this.tag = null, this._hashSubkey = new Array(this._ints), this.cipher.encrypt([0, 0, 0, 0], this._hashSubkey), this.componentBits = 4, this._m = this.generateHashTable(this._hashSubkey, this.componentBits);
            var a = t.length();
            if (12 === a) this._j0 = [t.getInt32(), t.getInt32(), t.getInt32(), 1];
            else {
                for (this._j0 = [0, 0, 0, 0]; t.length() > 0;) this._j0 = this.ghash(this._hashSubkey, this._j0, [t.getInt32(), t.getInt32(), t.getInt32(), t.getInt32()]);
                this._j0 = this.ghash(this._hashSubkey, this._j0, [0, 0].concat(i(8 * a)))
            }
            this._inBlock = this._j0.slice(0), n(this._inBlock), this._partialBytes = 0, r = s.util.createBuffer(r), this._aDataLength = i(8 * r.length());
            var o = r.length() % this.blockSize;
            for (o && r.fillWithByte(0, this.blockSize - o), this._s = [0, 0, 0, 0]; r.length() > 0;) this._s = this.ghash(this._hashSubkey, this._s, [r.getInt32(), r.getInt32(), r.getInt32(), r.getInt32()])
        }, o.gcm.prototype.encrypt = function(e, t, r) {
            var a = e.length();
            if (0 === a) return !0;
            if (this.cipher.encrypt(this._inBlock, this._outBlock), 0 === this._partialBytes && a >= this.blockSize) {
                for (var i = 0; i < this._ints; ++i) t.putInt32(this._outBlock[i] ^= e.getInt32());
                this._cipherLength += this.blockSize
            } else {
                var s = (this.blockSize - a) % this.blockSize;
                s > 0 && (s = this.blockSize - s), this._partialOutput.clear();
                for (var i = 0; i < this._ints; ++i) this._partialOutput.putInt32(e.getInt32() ^ this._outBlock[i]);
                if (s <= 0 || r) {
                    if (r) {
                        var o = a % this.blockSize;
                        this._cipherLength += o, this._partialOutput.truncate(this.blockSize - o)
                    } else this._cipherLength += this.blockSize;
                    for (var i = 0; i < this._ints; ++i) this._outBlock[i] = this._partialOutput.getInt32();
                    this._partialOutput.read -= this.blockSize
                }
                if (this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes), s > 0 && !r) return e.read -= this.blockSize, t.putBytes(this._partialOutput.getBytes(s - this._partialBytes)), this._partialBytes = s, !0;
                t.putBytes(this._partialOutput.getBytes(a - this._partialBytes)), this._partialBytes = 0
            }
            this._s = this.ghash(this._hashSubkey, this._s, this._outBlock), n(this._inBlock)
        }, o.gcm.prototype.decrypt = function(e, t, r) {
            var a = e.length();
            if (a < this.blockSize && !(r && a > 0)) return !0;
            this.cipher.encrypt(this._inBlock, this._outBlock), n(this._inBlock), this._hashBlock[0] = e.getInt32(), this._hashBlock[1] = e.getInt32(), this._hashBlock[2] = e.getInt32(), this._hashBlock[3] = e.getInt32(), this._s = this.ghash(this._hashSubkey, this._s, this._hashBlock);
            for (var i = 0; i < this._ints; ++i) t.putInt32(this._outBlock[i] ^ this._hashBlock[i]);
            a < this.blockSize ? this._cipherLength += a % this.blockSize : this._cipherLength += this.blockSize
        }, o.gcm.prototype.afterFinish = function(e, t) {
            var r = !0;
            t.decrypt && t.overflow && e.truncate(this.blockSize - t.overflow), this.tag = s.util.createBuffer();
            var a = this._aDataLength.concat(i(8 * this._cipherLength));
            this._s = this.ghash(this._hashSubkey, this._s, a);
            var n = [];
            this.cipher.encrypt(this._j0, n);
            for (var o = 0; o < this._ints; ++o) this.tag.putInt32(this._s[o] ^ n[o]);
            return this.tag.truncate(this.tag.length() % (this._tagLength / 8)), t.decrypt && this.tag.bytes() !== this._tag && (r = !1), r
        }, o.gcm.prototype.multiply = function(e, t) {
            for (var r = [0, 0, 0, 0], a = t.slice(0), n = 0; n < 128; ++n) {
                e[n / 32 | 0] & 1 << 31 - n % 32 && (r[0] ^= a[0], r[1] ^= a[1], r[2] ^= a[2], r[3] ^= a[3]), this.pow(a, a)
            }
            return r
        }, o.gcm.prototype.pow = function(e, t) {
            for (var r = 1 & e[3], a = 3; a > 0; --a) t[a] = e[a] >>> 1 | (1 & e[a - 1]) << 31;
            t[0] = e[0] >>> 1, r && (t[0] ^= this._R)
        }, o.gcm.prototype.tableMultiply = function(e) {
            for (var t = [0, 0, 0, 0], r = 0; r < 32; ++r) {
                var a = r / 8 | 0,
                    n = e[a] >>> 4 * (7 - r % 8) & 15,
                    i = this._m[r][n];
                t[0] ^= i[0], t[1] ^= i[1], t[2] ^= i[2], t[3] ^= i[3]
            }
            return t
        }, o.gcm.prototype.ghash = function(e, t, r) {
            return t[0] ^= r[0], t[1] ^= r[1], t[2] ^= r[2], t[3] ^= r[3], this.tableMultiply(t)
        }, o.gcm.prototype.generateHashTable = function(e, t) {
            for (var r = 8 / t, a = 4 * r, n = 16 * r, i = new Array(n), s = 0; s < n; ++s) {
                var o = [0, 0, 0, 0],
                    c = s / a | 0,
                    u = (a - 1 - s % a) * t;
                o[c] = 1 << t - 1 << u, i[s] = this.generateSubHashTable(this.multiply(o, e), t)
            }
            return i
        }, o.gcm.prototype.generateSubHashTable = function(e, t) {
            var r = 1 << t,
                a = r >>> 1,
                n = new Array(r);
            n[a] = e.slice(0);
            for (var i = a >>> 1; i > 0;) this.pow(n[2 * i], n[i] = []), i >>= 1;
            for (i = 2; i < a;) {
                for (var s = 1; s < i; ++s) {
                    var o = n[i],
                        c = n[s];
                    n[i + s] = [o[0] ^ c[0], o[1] ^ c[1], o[2] ^ c[2], o[3] ^ c[3]]
                }
                i *= 2
            }
            for (n[0] = [0, 0, 0, 0], i = a + 1; i < r; ++i) {
                var u = n[i ^ a];
                n[i] = [e[0] ^ u[0], e[1] ^ u[1], e[2] ^ u[2], e[3] ^ u[3]]
            }
            return n
        }
    }, function(e, t, r) {
        var a = r(0);
        r(3), r(8), r(14), r(7), r(21), r(2), r(9), r(1);
        var n = function(e, t, r, n) {
                var i = a.util.createBuffer(),
                    s = e.length >> 1,
                    o = s + (1 & e.length),
                    c = e.substr(0, o),
                    u = e.substr(s, o),
                    l = a.util.createBuffer(),
                    p = a.hmac.create();
                r = t + r;
                var f = Math.ceil(n / 16),
                    h = Math.ceil(n / 20);
                p.start("MD5", c);
                var d = a.util.createBuffer();
                l.putBytes(r);
                for (var y = 0; y < f; ++y) p.start(null, null), p.update(l.getBytes()), l.putBuffer(p.digest()), p.start(null, null), p.update(l.bytes() + r), d.putBuffer(p.digest());
                p.start("SHA1", u);
                var g = a.util.createBuffer();
                l.clear(), l.putBytes(r);
                for (var y = 0; y < h; ++y) p.start(null, null), p.update(l.getBytes()), l.putBuffer(p.digest()), p.start(null, null), p.update(l.bytes() + r), g.putBuffer(p.digest());
                return i.putBytes(a.util.xorBytes(d.getBytes(), g.getBytes(), n)), i
            },
            i = function(e, t, r) {
                var n = a.hmac.create();
                n.start("SHA1", e);
                var i = a.util.createBuffer();
                return i.putInt32(t[0]), i.putInt32(t[1]), i.putByte(r.type), i.putByte(r.version.major), i.putByte(r.version.minor), i.putInt16(r.length), i.putBytes(r.fragment.bytes()), n.update(i.getBytes()), n.digest().getBytes()
            },
            s = function(e, t, r) {
                var n = !1;
                try {
                    var i = e.deflate(t.fragment.getBytes());
                    t.fragment = a.util.createBuffer(i), t.length = i.length, n = !0
                } catch (e) {}
                return n
            },
            o = function(e, t, r) {
                var n = !1;
                try {
                    var i = e.inflate(t.fragment.getBytes());
                    t.fragment = a.util.createBuffer(i), t.length = i.length, n = !0
                } catch (e) {}
                return n
            },
            c = function(e, t) {
                var r = 0;
                switch (t) {
                    case 1:
                        r = e.getByte();
                        break;
                    case 2:
                        r = e.getInt16();
                        break;
                    case 3:
                        r = e.getInt24();
                        break;
                    case 4:
                        r = e.getInt32()
                }
                return a.util.createBuffer(e.getBytes(r))
            },
            u = function(e, t, r) {
                e.putInt(r.length(), t << 3), e.putBuffer(r)
            },
            l = {};
        l.Versions = {
            TLS_1_0: {
                major: 3,
                minor: 1
            },
            TLS_1_1: {
                major: 3,
                minor: 2
            },
            TLS_1_2: {
                major: 3,
                minor: 3
            }
        }, l.SupportedVersions = [l.Versions.TLS_1_1, l.Versions.TLS_1_0], l.Version = l.SupportedVersions[0], l.MaxFragment = 15360, l.ConnectionEnd = {
            server: 0,
            client: 1
        }, l.PRFAlgorithm = {
            tls_prf_sha256: 0
        }, l.BulkCipherAlgorithm = {
            none: null,
            rc4: 0,
            des3: 1,
            aes: 2
        }, l.CipherType = {
            stream: 0,
            block: 1,
            aead: 2
        }, l.MACAlgorithm = {
            none: null,
            hmac_md5: 0,
            hmac_sha1: 1,
            hmac_sha256: 2,
            hmac_sha384: 3,
            hmac_sha512: 4
        }, l.CompressionMethod = {
            none: 0,
            deflate: 1
        }, l.ContentType = {
            change_cipher_spec: 20,
            alert: 21,
            handshake: 22,
            application_data: 23,
            heartbeat: 24
        }, l.HandshakeType = {
            hello_request: 0,
            client_hello: 1,
            server_hello: 2,
            certificate: 11,
            server_key_exchange: 12,
            certificate_request: 13,
            server_hello_done: 14,
            certificate_verify: 15,
            client_key_exchange: 16,
            finished: 20
        }, l.Alert = {}, l.Alert.Level = {
            warning: 1,
            fatal: 2
        }, l.Alert.Description = {
            close_notify: 0,
            unexpected_message: 10,
            bad_record_mac: 20,
            decryption_failed: 21,
            record_overflow: 22,
            decompression_failure: 30,
            handshake_failure: 40,
            bad_certificate: 42,
            unsupported_certificate: 43,
            certificate_revoked: 44,
            certificate_expired: 45,
            certificate_unknown: 46,
            illegal_parameter: 47,
            unknown_ca: 48,
            access_denied: 49,
            decode_error: 50,
            decrypt_error: 51,
            export_restriction: 60,
            protocol_version: 70,
            insufficient_security: 71,
            internal_error: 80,
            user_canceled: 90,
            no_renegotiation: 100
        }, l.HeartbeatMessageType = {
            heartbeat_request: 1,
            heartbeat_response: 2
        }, l.CipherSuites = {}, l.getCipherSuite = function(e) {
            var t = null;
            for (var r in l.CipherSuites) {
                var a = l.CipherSuites[r];
                if (a.id[0] === e.charCodeAt(0) && a.id[1] === e.charCodeAt(1)) {
                    t = a;
                    break
                }
            }
            return t
        }, l.handleUnexpected = function(e, t) {
            !e.open && e.entity === l.ConnectionEnd.client || e.error(e, {
                message: "Unexpected message. Received TLS record out of order.",
                send: !0,
                alert: {
                    level: l.Alert.Level.fatal,
                    description: l.Alert.Description.unexpected_message
                }
            })
        }, l.handleHelloRequest = function(e, t, r) {
            !e.handshaking && e.handshakes > 0 && (l.queue(e, l.createAlert(e, {
                level: l.Alert.Level.warning,
                description: l.Alert.Description.no_renegotiation
            })), l.flush(e)), e.process()
        }, l.parseHelloMessage = function(e, t, r) {
            var n = null,
                i = e.entity === l.ConnectionEnd.client;
            if (r < 38) e.error(e, {
                message: i ? "Invalid ServerHello message. Message too short." : "Invalid ClientHello message. Message too short.",
                send: !0,
                alert: {
                    level: l.Alert.Level.fatal,
                    description: l.Alert.Description.illegal_parameter
                }
            });
            else {
                var s = t.fragment,
                    o = s.length();
                if (n = {
                        version: {
                            major: s.getByte(),
                            minor: s.getByte()
                        },
                        random: a.util.createBuffer(s.getBytes(32)),
                        session_id: c(s, 1),
                        extensions: []
                    }, i ? (n.cipher_suite = s.getBytes(2), n.compression_method = s.getByte()) : (n.cipher_suites = c(s, 2), n.compression_methods = c(s, 1)), (o = r - (o - s.length())) > 0) {
                    for (var u = c(s, 2); u.length() > 0;) n.extensions.push({
                        type: [u.getByte(), u.getByte()],
                        data: c(u, 2)
                    });
                    if (!i)
                        for (var p = 0; p < n.extensions.length; ++p) {
                            var f = n.extensions[p];
                            if (0 === f.type[0] && 0 === f.type[1])
                                for (var h = c(f.data, 2); h.length() > 0;) {
                                    var d = h.getByte();
                                    if (0 !== d) break;
                                    e.session.extensions.server_name.serverNameList.push(c(h, 2).getBytes())
                                }
                        }
                }
                if (e.session.version && (n.version.major !== e.session.version.major || n.version.minor !== e.session.version.minor)) return e.error(e, {
                    message: "TLS version change is disallowed during renegotiation.",
                    send: !0,
                    alert: {
                        level: l.Alert.Level.fatal,
                        description: l.Alert.Description.protocol_version
                    }
                });
                if (i) e.session.cipherSuite = l.getCipherSuite(n.cipher_suite);
                else
                    for (var y = a.util.createBuffer(n.cipher_suites.bytes()); y.length() > 0 && (e.session.cipherSuite = l.getCipherSuite(y.getBytes(2)), null === e.session.cipherSuite););
                if (null === e.session.cipherSuite) return e.error(e, {
                    message: "No cipher suites in common.",
                    send: !0,
                    alert: {
                        level: l.Alert.Level.fatal,
                        description: l.Alert.Description.handshake_failure
                    },
                    cipherSuite: a.util.bytesToHex(n.cipher_suite)
                });
                e.session.compressionMethod = i ? n.compression_method : l.CompressionMethod.none
            }
            return n
        }, l.createSecurityParameters = function(e, t) {
            var r = e.entity === l.ConnectionEnd.client,
                a = t.random.bytes(),
                n = r ? e.session.sp.client_random : a,
                i = r ? a : l.createRandom().getBytes();
            e.session.sp = {
                entity: e.entity,
                prf_algorithm: l.PRFAlgorithm.tls_prf_sha256,
                bulk_cipher_algorithm: null,
                cipher_type: null,
                enc_key_length: null,
                block_length: null,
                fixed_iv_length: null,
                record_iv_length: null,
                mac_algorithm: null,
                mac_length: null,
                mac_key_length: null,
                compression_algorithm: e.session.compressionMethod,
                pre_master_secret: null,
                master_secret: null,
                client_random: n,
                server_random: i
            }
        }, l.handleServerHello = function(e, t, r) {
            var a = l.parseHelloMessage(e, t, r);
            if (!e.fail) {
                if (!(a.version.minor <= e.version.minor)) return e.error(e, {
                    message: "Incompatible TLS version.",
                    send: !0,
                    alert: {
                        level: l.Alert.Level.fatal,
                        description: l.Alert.Description.protocol_version
                    }
                });
                e.version.minor = a.version.minor, e.session.version = e.version;
                var n = a.session_id.bytes();
                n.length > 0 && n === e.session.id ? (e.expect = y, e.session.resuming = !0, e.session.sp.server_random = a.random.bytes()) : (e.expect = p, e.session.resuming = !1, l.createSecurityParameters(e, a)), e.session.id = n, e.process()
            }
        }, l.handleClientHello = function(e, t, r) {
            var n = l.parseHelloMessage(e, t, r);
            if (!e.fail) {
                var i = n.session_id.bytes(),
                    s = null;
                if (e.sessionCache && (s = e.sessionCache.getSession(i), null === s ? i = "" : (s.version.major !== n.version.major || s.version.minor > n.version.minor) && (s = null, i = "")), 0 === i.length && (i = a.random.getBytes(32)), e.session.id = i, e.session.clientHelloVersion = n.version, e.session.sp = {}, s) e.version = e.session.version = s.version, e.session.sp = s.sp;
                else {
                    for (var o, c = 1; c < l.SupportedVersions.length && (o = l.SupportedVersions[c], !(o.minor <= n.version.minor)); ++c);
                    e.version = {
                        major: o.major,
                        minor: o.minor
                    }, e.session.version = e.version
                }
                null !== s ? (e.expect = T, e.session.resuming = !0, e.session.sp.client_random = n.random.bytes()) : (e.expect = !1 !== e.verifyClient ? C : E, e.session.resuming = !1, l.createSecurityParameters(e, n)), e.open = !0, l.queue(e, l.createRecord(e, {
                    type: l.ContentType.handshake,
                    data: l.createServerHello(e)
                })), e.session.resuming ? (l.queue(e, l.createRecord(e, {
                    type: l.ContentType.change_cipher_spec,
                    data: l.createChangeCipherSpec()
                })), e.state.pending = l.createConnectionState(e), e.state.current.write = e.state.pending.write, l.queue(e, l.createRecord(e, {
                    type: l.ContentType.handshake,
                    data: l.createFinished(e)
                }))) : (l.queue(e, l.createRecord(e, {
                    type: l.ContentType.handshake,
                    data: l.createCertificate(e)
                })), e.fail || (l.queue(e, l.createRecord(e, {
                    type: l.ContentType.handshake,
                    data: l.createServerKeyExchange(e)
                })), !1 !== e.verifyClient && l.queue(e, l.createRecord(e, {
                    type: l.ContentType.handshake,
                    data: l.createCertificateRequest(e)
                })), l.queue(e, l.createRecord(e, {
                    type: l.ContentType.handshake,
                    data: l.createServerHelloDone(e)
                })))), l.flush(e), e.process()
            }
        }, l.handleCertificate = function(e, t, r) {
            if (r < 3) return e.error(e, {
                message: "Invalid Certificate message. Message too short.",
                send: !0,
                alert: {
                    level: l.Alert.Level.fatal,
                    description: l.Alert.Description.illegal_parameter
                }
            });
            var n, i, s = t.fragment,
                o = {
                    certificate_list: c(s, 3)
                },
                u = [];
            try {
                for (; o.certificate_list.length() > 0;) n = c(o.certificate_list, 3), i = a.asn1.fromDer(n), n = a.pki.certificateFromAsn1(i, !0), u.push(n)
            } catch (t) {
                return e.error(e, {
                    message: "Could not parse certificate list.",
                    cause: t,
                    send: !0,
                    alert: {
                        level: l.Alert.Level.fatal,
                        description: l.Alert.Description.bad_certificate
                    }
                })
            }
            var p = e.entity === l.ConnectionEnd.client;
            !p && !0 !== e.verifyClient || 0 !== u.length ? 0 === u.length ? e.expect = p ? f : E : (p ? e.session.serverCertificate = u[0] : e.session.clientCertificate = u[0], l.verifyCertificateChain(e, u) && (e.expect = p ? f : E)) : e.error(e, {
                message: p ? "No server certificate provided." : "No client certificate provided.",
                send: !0,
                alert: {
                    level: l.Alert.Level.fatal,
                    description: l.Alert.Description.illegal_parameter
                }
            }), e.process()
        }, l.handleServerKeyExchange = function(e, t, r) {
            if (r > 0) return e.error(e, {
                message: "Invalid key parameters. Only RSA is supported.",
                send: !0,
                alert: {
                    level: l.Alert.Level.fatal,
                    description: l.Alert.Description.unsupported_certificate
                }
            });
            e.expect = h, e.process()
        }, l.handleClientKeyExchange = function(e, t, r) {
            if (r < 48) return e.error(e, {
                message: "Invalid key parameters. Only RSA is supported.",
                send: !0,
                alert: {
                    level: l.Alert.Level.fatal,
                    description: l.Alert.Description.unsupported_certificate
                }
            });
            var n = t.fragment,
                i = {
                    enc_pre_master_secret: c(n, 2).getBytes()
                },
                s = null;
            if (e.getPrivateKey) try {
                s = e.getPrivateKey(e, e.session.serverCertificate), s = a.pki.privateKeyFromPem(s)
            } catch (t) {
                e.error(e, {
                    message: "Could not get private key.",
                    cause: t,
                    send: !0,
                    alert: {
                        level: l.Alert.Level.fatal,
                        description: l.Alert.Description.internal_error
                    }
                })
            }
            if (null === s) return e.error(e, {
                message: "No private key set.",
                send: !0,
                alert: {
                    level: l.Alert.Level.fatal,
                    description: l.Alert.Description.internal_error
                }
            });
            try {
                var o = e.session.sp;
                o.pre_master_secret = s.decrypt(i.enc_pre_master_secret);
                var u = e.session.clientHelloVersion;
                if (u.major !== o.pre_master_secret.charCodeAt(0) || u.minor !== o.pre_master_secret.charCodeAt(1)) throw new Error("TLS version rollback attack detected.")
            } catch (e) {
                o.pre_master_secret = a.random.getBytes(48)
            }
            e.expect = T, null !== e.session.clientCertificate && (e.expect = S), e.process()
        }, l.handleCertificateRequest = function(e, t, r) {
            if (r < 3) return e.error(e, {
                message: "Invalid CertificateRequest. Message too short.",
                send: !0,
                alert: {
                    level: l.Alert.Level.fatal,
                    description: l.Alert.Description.illegal_parameter
                }
            });
            var a = t.fragment,
                n = {
                    certificate_types: c(a, 1),
                    certificate_authorities: c(a, 2)
                };
            e.session.certificateRequest = n, e.expect = d, e.process()
        }, l.handleCertificateVerify = function(e, t, r) {
            if (r < 2) return e.error(e, {
                message: "Invalid CertificateVerify. Message too short.",
                send: !0,
                alert: {
                    level: l.Alert.Level.fatal,
                    description: l.Alert.Description.illegal_parameter
                }
            });
            var n = t.fragment;
            n.read -= 4;
            var i = n.bytes();
            n.read += 4;
            var s = {
                    signature: c(n, 2).getBytes()
                },
                o = a.util.createBuffer();
            o.putBuffer(e.session.md5.digest()), o.putBuffer(e.session.sha1.digest()), o = o.getBytes();
            try {
                if (!e.session.clientCertificate.publicKey.verify(o, s.signature, "NONE")) throw new Error("CertificateVerify signature does not match.");
                e.session.md5.update(i), e.session.sha1.update(i)
            } catch (t) {
                return e.error(e, {
                    message: "Bad signature in CertificateVerify.",
                    send: !0,
                    alert: {
                        level: l.Alert.Level.fatal,
                        description: l.Alert.Description.handshake_failure
                    }
                })
            }
            e.expect = T, e.process()
        }, l.handleServerHelloDone = function(e, t, r) {
            if (r > 0) return e.error(e, {
                message: "Invalid ServerHelloDone message. Invalid length.",
                send: !0,
                alert: {
                    level: l.Alert.Level.fatal,
                    description: l.Alert.Description.record_overflow
                }
            });
            if (null === e.serverCertificate) {
                var n = {
                        message: "No server certificate provided. Not enough security.",
                        send: !0,
                        alert: {
                            level: l.Alert.Level.fatal,
                            description: l.Alert.Description.insufficient_security
                        }
                    },
                    i = e.verify(e, n.alert.description, 0, []);
                if (!0 !== i) return (i || 0 === i) && ("object" != typeof i || a.util.isArray(i) ? "number" == typeof i && (n.alert.description = i) : (i.message && (n.message = i.message), i.alert && (n.alert.description = i.alert))), e.error(e, n)
            }
            null !== e.session.certificateRequest && (t = l.createRecord(e, {
                type: l.ContentType.handshake,
                data: l.createCertificate(e)
            }), l.queue(e, t)), t = l.createRecord(e, {
                type: l.ContentType.handshake,
                data: l.createClientKeyExchange(e)
            }), l.queue(e, t), e.expect = m;
            var s = function(e, t) {
                null !== e.session.certificateRequest && null !== e.session.clientCertificate && l.queue(e, l.createRecord(e, {
                    type: l.ContentType.handshake,
                    data: l.createCertificateVerify(e, t)
                })), l.queue(e, l.createRecord(e, {
                    type: l.ContentType.change_cipher_spec,
                    data: l.createChangeCipherSpec()
                })), e.state.pending = l.createConnectionState(e), e.state.current.write = e.state.pending.write, l.queue(e, l.createRecord(e, {
                    type: l.ContentType.handshake,
                    data: l.createFinished(e)
                })), e.expect = y, l.flush(e), e.process()
            };
            if (null === e.session.certificateRequest || null === e.session.clientCertificate) return s(e, null);
            l.getClientSignature(e, s)
        }, l.handleChangeCipherSpec = function(e, t) {
            if (1 !== t.fragment.getByte()) return e.error(e, {
                message: "Invalid ChangeCipherSpec message received.",
                send: !0,
                alert: {
                    level: l.Alert.Level.fatal,
                    description: l.Alert.Description.illegal_parameter
                }
            });
            var r = e.entity === l.ConnectionEnd.client;
            (e.session.resuming && r || !e.session.resuming && !r) && (e.state.pending = l.createConnectionState(e)), e.state.current.read = e.state.pending.read, (!e.session.resuming && r || e.session.resuming && !r) && (e.state.pending = null), e.expect = r ? g : I, e.process()
        }, l.handleFinished = function(e, t, r) {
            var i = t.fragment;
            i.read -= 4;
            var s = i.bytes();
            i.read += 4;
            var o = t.fragment.getBytes();
            i = a.util.createBuffer(), i.putBuffer(e.session.md5.digest()), i.putBuffer(e.session.sha1.digest());
            var c = e.entity === l.ConnectionEnd.client,
                u = c ? "server finished" : "client finished",
                p = e.session.sp;
            if (i = n(p.master_secret, u, i.getBytes(), 12), i.getBytes() !== o) return e.error(e, {
                message: "Invalid verify_data in Finished message.",
                send: !0,
                alert: {
                    level: l.Alert.Level.fatal,
                    description: l.Alert.Description.decrypt_error
                }
            });
            e.session.md5.update(s), e.session.sha1.update(s), (e.session.resuming && c || !e.session.resuming && !c) && (l.queue(e, l.createRecord(e, {
                type: l.ContentType.change_cipher_spec,
                data: l.createChangeCipherSpec()
            })), e.state.current.write = e.state.pending.write, e.state.pending = null, l.queue(e, l.createRecord(e, {
                type: l.ContentType.handshake,
                data: l.createFinished(e)
            }))), e.expect = c ? v : b, e.handshaking = !1, ++e.handshakes, e.peerCertificate = c ? e.session.serverCertificate : e.session.clientCertificate, l.flush(e), e.isConnected = !0, e.connected(e), e.process()
        }, l.handleAlert = function(e, t) {
            var r, a = t.fragment,
                n = {
                    level: a.getByte(),
                    description: a.getByte()
                };
            switch (n.description) {
                case l.Alert.Description.close_notify:
                    r = "Connection closed.";
                    break;
                case l.Alert.Description.unexpected_message:
                    r = "Unexpected message.";
                    break;
                case l.Alert.Description.bad_record_mac:
                    r = "Bad record MAC.";
                    break;
                case l.Alert.Description.decryption_failed:
                    r = "Decryption failed.";
                    break;
                case l.Alert.Description.record_overflow:
                    r = "Record overflow.";
                    break;
                case l.Alert.Description.decompression_failure:
                    r = "Decompression failed.";
                    break;
                case l.Alert.Description.handshake_failure:
                    r = "Handshake failure.";
                    break;
                case l.Alert.Description.bad_certificate:
                    r = "Bad certificate.";
                    break;
                case l.Alert.Description.unsupported_certificate:
                    r = "Unsupported certificate.";
                    break;
                case l.Alert.Description.certificate_revoked:
                    r = "Certificate revoked.";
                    break;
                case l.Alert.Description.certificate_expired:
                    r = "Certificate expired.";
                    break;
                case l.Alert.Description.certificate_unknown:
                    r = "Certificate unknown.";
                    break;
                case l.Alert.Description.illegal_parameter:
                    r = "Illegal parameter.";
                    break;
                case l.Alert.Description.unknown_ca:
                    r = "Unknown certificate authority.";
                    break;
                case l.Alert.Description.access_denied:
                    r = "Access denied.";
                    break;
                case l.Alert.Description.decode_error:
                    r = "Decode error.";
                    break;
                case l.Alert.Description.decrypt_error:
                    r = "Decrypt error.";
                    break;
                case l.Alert.Description.export_restriction:
                    r = "Export restriction.";
                    break;
                case l.Alert.Description.protocol_version:
                    r = "Unsupported protocol version.";
                    break;
                case l.Alert.Description.insufficient_security:
                    r = "Insufficient security.";
                    break;
                case l.Alert.Description.internal_error:
                    r = "Internal error.";
                    break;
                case l.Alert.Description.user_canceled:
                    r = "User canceled.";
                    break;
                case l.Alert.Description.no_renegotiation:
                    r = "Renegotiation not supported.";
                    break;
                default:
                    r = "Unknown error."
            }
            if (n.description === l.Alert.Description.close_notify) return e.close();
            e.error(e, {
                message: r,
                send: !1,
                origin: e.entity === l.ConnectionEnd.client ? "server" : "client",
                alert: n
            }), e.process()
        }, l.handleHandshake = function(e, t) {
            var r = t.fragment,
                n = r.getByte(),
                i = r.getInt24();
            if (i > r.length()) return e.fragmented = t, t.fragment = a.util.createBuffer(), r.read -= 4, e.process();
            e.fragmented = null, r.read -= 4;
            var s = r.bytes(i + 4);
            r.read += 4, n in x[e.entity][e.expect] ? (e.entity !== l.ConnectionEnd.server || e.open || e.fail || (e.handshaking = !0, e.session = {
                version: null,
                extensions: {
                    server_name: {
                        serverNameList: []
                    }
                },
                cipherSuite: null,
                compressionMethod: null,
                serverCertificate: null,
                clientCertificate: null,
                md5: a.md.md5.create(),
                sha1: a.md.sha1.create()
            }), n !== l.HandshakeType.hello_request && n !== l.HandshakeType.certificate_verify && n !== l.HandshakeType.finished && (e.session.md5.update(s), e.session.sha1.update(s)), x[e.entity][e.expect][n](e, t, i)) : l.handleUnexpected(e, t)
        }, l.handleApplicationData = function(e, t) {
            e.data.putBuffer(t.fragment), e.dataReady(e), e.process()
        }, l.handleHeartbeat = function(e, t) {
            var r = t.fragment,
                n = r.getByte(),
                i = r.getInt16(),
                s = r.getBytes(i);
            if (n === l.HeartbeatMessageType.heartbeat_request) {
                if (e.handshaking || i > s.length) return e.process();
                l.queue(e, l.createRecord(e, {
                    type: l.ContentType.heartbeat,
                    data: l.createHeartbeat(l.HeartbeatMessageType.heartbeat_response, s)
                })), l.flush(e)
            } else if (n === l.HeartbeatMessageType.heartbeat_response) {
                if (s !== e.expectedHeartbeatPayload) return e.process();
                e.heartbeatReceived && e.heartbeatReceived(e, a.util.createBuffer(s))
            }
            e.process()
        };
        var p = 1,
            f = 2,
            h = 3,
            d = 4,
            y = 5,
            g = 6,
            v = 7,
            m = 8,
            C = 1,
            E = 2,
            S = 3,
            T = 4,
            I = 5,
            b = 6,
            A = l.handleUnexpected,
            B = l.handleChangeCipherSpec,
            N = l.handleAlert,
            k = l.handleHandshake,
            w = l.handleApplicationData,
            R = l.handleHeartbeat,
            _ = [];
        _[l.ConnectionEnd.client] = [
            [A, N, k, A, R],
            [A, N, k, A, R],
            [A, N, k, A, R],
            [A, N, k, A, R],
            [A, N, k, A, R],
            [B, N, A, A, R],
            [A, N, k, A, R],
            [A, N, k, w, R],
            [A, N, k, A, R]
        ], _[l.ConnectionEnd.server] = [
            [A, N, k, A, R],
            [A, N, k, A, R],
            [A, N, k, A, R],
            [A, N, k, A, R],
            [B, N, A, A, R],
            [A, N, k, A, R],
            [A, N, k, w, R],
            [A, N, k, A, R]
        ];
        var L = l.handleHelloRequest,
            U = l.handleServerHello,
            D = l.handleCertificate,
            P = l.handleServerKeyExchange,
            V = l.handleCertificateRequest,
            O = l.handleServerHelloDone,
            K = l.handleFinished,
            x = [];
        x[l.ConnectionEnd.client] = [
            [A, A, U, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A],
            [L, A, A, A, A, A, A, A, A, A, A, D, P, V, O, A, A, A, A, A, A],
            [L, A, A, A, A, A, A, A, A, A, A, A, P, V, O, A, A, A, A, A, A],
            [L, A, A, A, A, A, A, A, A, A, A, A, A, V, O, A, A, A, A, A, A],
            [L, A, A, A, A, A, A, A, A, A, A, A, A, A, O, A, A, A, A, A, A],
            [L, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A],
            [L, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, K],
            [L, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A],
            [L, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A]
        ];
        var M = l.handleClientHello,
            F = l.handleClientKeyExchange,
            q = l.handleCertificateVerify;
        x[l.ConnectionEnd.server] = [
            [A, M, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A],
            [A, A, A, A, A, A, A, A, A, A, A, D, A, A, A, A, A, A, A, A, A],
            [A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, F, A, A, A, A],
            [A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, q, A, A, A, A, A],
            [A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A],
            [A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, K],
            [A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A],
            [A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A, A]
        ], l.generateKeys = function(e, t) {
            var r = n,
                a = t.client_random + t.server_random;
            e.session.resuming || (t.master_secret = r(t.pre_master_secret, "master secret", a, 48).bytes(), t.pre_master_secret = null), a = t.server_random + t.client_random;
            var i = 2 * t.mac_key_length + 2 * t.enc_key_length,
                s = e.version.major === l.Versions.TLS_1_0.major && e.version.minor === l.Versions.TLS_1_0.minor;
            s && (i += 2 * t.fixed_iv_length);
            var o = r(t.master_secret, "key expansion", a, i),
                c = {
                    client_write_MAC_key: o.getBytes(t.mac_key_length),
                    server_write_MAC_key: o.getBytes(t.mac_key_length),
                    client_write_key: o.getBytes(t.enc_key_length),
                    server_write_key: o.getBytes(t.enc_key_length)
                };
            return s && (c.client_write_IV = o.getBytes(t.fixed_iv_length), c.server_write_IV = o.getBytes(t.fixed_iv_length)), c
        }, l.createConnectionState = function(e) {
            var t = e.entity === l.ConnectionEnd.client,
                r = function() {
                    var e = {
                        sequenceNumber: [0, 0],
                        macKey: null,
                        macLength: 0,
                        macFunction: null,
                        cipherState: null,
                        cipherFunction: function(e) {
                            return !0
                        },
                        compressionState: null,
                        compressFunction: function(e) {
                            return !0
                        },
                        updateSequenceNumber: function() {
                            4294967295 === e.sequenceNumber[1] ? (e.sequenceNumber[1] = 0, ++e.sequenceNumber[0]) : ++e.sequenceNumber[1]
                        }
                    };
                    return e
                },
                a = {
                    read: r(),
                    write: r()
                };
            if (a.read.update = function(e, t) {
                    return a.read.cipherFunction(t, a.read) ? a.read.compressFunction(e, t, a.read) || e.error(e, {
                        message: "Could not decompress record.",
                        send: !0,
                        alert: {
                            level: l.Alert.Level.fatal,
                            description: l.Alert.Description.decompression_failure
                        }
                    }) : e.error(e, {
                        message: "Could not decrypt record or bad MAC.",
                        send: !0,
                        alert: {
                            level: l.Alert.Level.fatal,
                            description: l.Alert.Description.bad_record_mac
                        }
                    }), !e.fail
                }, a.write.update = function(e, t) {
                    return a.write.compressFunction(e, t, a.write) ? a.write.cipherFunction(t, a.write) || e.error(e, {
                        message: "Could not encrypt record.",
                        send: !1,
                        alert: {
                            level: l.Alert.Level.fatal,
                            description: l.Alert.Description.internal_error
                        }
                    }) : e.error(e, {
                        message: "Could not compress record.",
                        send: !1,
                        alert: {
                            level: l.Alert.Level.fatal,
                            description: l.Alert.Description.internal_error
                        }
                    }), !e.fail
                }, e.session) {
                var n = e.session.sp;
                switch (e.session.cipherSuite.initSecurityParameters(n), n.keys = l.generateKeys(e, n), a.read.macKey = t ? n.keys.server_write_MAC_key : n.keys.client_write_MAC_key, a.write.macKey = t ? n.keys.client_write_MAC_key : n.keys.server_write_MAC_key, e.session.cipherSuite.initConnectionState(a, e, n), n.compression_algorithm) {
                    case l.CompressionMethod.none:
                        break;
                    case l.CompressionMethod.deflate:
                        a.read.compressFunction = o, a.write.compressFunction = s;
                        break;
                    default:
                        throw new Error("Unsupported compression algorithm.")
                }
            }
            return a
        }, l.createRandom = function() {
            var e = new Date,
                t = +e + 6e4 * e.getTimezoneOffset(),
                r = a.util.createBuffer();
            return r.putInt32(t), r.putBytes(a.random.getBytes(28)), r
        }, l.createRecord = function(e, t) {
            return t.data ? {
                type: t.type,
                version: {
                    major: e.version.major,
                    minor: e.version.minor
                },
                length: t.data.length(),
                fragment: t.data
            } : null
        }, l.createAlert = function(e, t) {
            var r = a.util.createBuffer();
            return r.putByte(t.level), r.putByte(t.description), l.createRecord(e, {
                type: l.ContentType.alert,
                data: r
            })
        }, l.createClientHello = function(e) {
            e.session.clientHelloVersion = {
                major: e.version.major,
                minor: e.version.minor
            };
            for (var t = a.util.createBuffer(), r = 0; r < e.cipherSuites.length; ++r) {
                var n = e.cipherSuites[r];
                t.putByte(n.id[0]), t.putByte(n.id[1])
            }
            var i = t.length(),
                s = a.util.createBuffer();
            s.putByte(l.CompressionMethod.none);
            var o = s.length(),
                c = a.util.createBuffer();
            if (e.virtualHost) {
                var p = a.util.createBuffer();
                p.putByte(0), p.putByte(0);
                var f = a.util.createBuffer();
                f.putByte(0), u(f, 2, a.util.createBuffer(e.virtualHost));
                var h = a.util.createBuffer();
                u(h, 2, f), u(p, 2, h), c.putBuffer(p)
            }
            var d = c.length();
            d > 0 && (d += 2);
            var y = e.session.id,
                g = y.length + 1 + 2 + 4 + 28 + 2 + i + 1 + o + d,
                v = a.util.createBuffer();
            return v.putByte(l.HandshakeType.client_hello), v.putInt24(g), v.putByte(e.version.major), v.putByte(e.version.minor), v.putBytes(e.session.sp.client_random), u(v, 1, a.util.createBuffer(y)), u(v, 2, t), u(v, 1, s), d > 0 && u(v, 2, c), v
        }, l.createServerHello = function(e) {
            var t = e.session.id,
                r = t.length + 1 + 2 + 4 + 28 + 2 + 1,
                n = a.util.createBuffer();
            return n.putByte(l.HandshakeType.server_hello), n.putInt24(r), n.putByte(e.version.major), n.putByte(e.version.minor), n.putBytes(e.session.sp.server_random), u(n, 1, a.util.createBuffer(t)), n.putByte(e.session.cipherSuite.id[0]), n.putByte(e.session.cipherSuite.id[1]), n.putByte(e.session.compressionMethod), n
        }, l.createCertificate = function(e) {
            var t = e.entity === l.ConnectionEnd.client,
                r = null;
            if (e.getCertificate) {
                var n;
                n = t ? e.session.certificateRequest : e.session.extensions.server_name.serverNameList, r = e.getCertificate(e, n)
            }
            var i = a.util.createBuffer();
            if (null !== r) try {
                a.util.isArray(r) || (r = [r]);
                for (var s = null, o = 0; o < r.length; ++o) {
                    var c = a.pem.decode(r[o])[0];
                    if ("CERTIFICATE" !== c.type && "X509 CERTIFICATE" !== c.type && "TRUSTED CERTIFICATE" !== c.type) {
                        var p = new Error('Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".');
                        throw p.headerType = c.type, p
                    }
                    if (c.procType && "ENCRYPTED" === c.procType.type) throw new Error("Could not convert certificate from PEM; PEM is encrypted.");
                    var f = a.util.createBuffer(c.body);
                    null === s && (s = a.asn1.fromDer(f.bytes(), !1));
                    var h = a.util.createBuffer();
                    u(h, 3, f), i.putBuffer(h)
                }
                r = a.pki.certificateFromAsn1(s), t ? e.session.clientCertificate = r : e.session.serverCertificate = r
            } catch (t) {
                return e.error(e, {
                    message: "Could not send certificate list.",
                    cause: t,
                    send: !0,
                    alert: {
                        level: l.Alert.Level.fatal,
                        description: l.Alert.Description.bad_certificate
                    }
                })
            }
            var d = 3 + i.length(),
                y = a.util.createBuffer();
            return y.putByte(l.HandshakeType.certificate), y.putInt24(d), u(y, 3, i), y
        }, l.createClientKeyExchange = function(e) {
            var t = a.util.createBuffer();
            t.putByte(e.session.clientHelloVersion.major), t.putByte(e.session.clientHelloVersion.minor), t.putBytes(a.random.getBytes(46));
            var r = e.session.sp;
            r.pre_master_secret = t.getBytes(), t = e.session.serverCertificate.publicKey.encrypt(r.pre_master_secret);
            var n = t.length + 2,
                i = a.util.createBuffer();
            return i.putByte(l.HandshakeType.client_key_exchange), i.putInt24(n), i.putInt16(t.length), i.putBytes(t), i
        }, l.createServerKeyExchange = function(e) {
            var t = a.util.createBuffer();
            return t
        }, l.getClientSignature = function(e, t) {
            var r = a.util.createBuffer();
            r.putBuffer(e.session.md5.digest()), r.putBuffer(e.session.sha1.digest()), r = r.getBytes(), e.getSignature = e.getSignature || function(e, t, r) {
                var n = null;
                if (e.getPrivateKey) try {
                    n = e.getPrivateKey(e, e.session.clientCertificate), n = a.pki.privateKeyFromPem(n)
                } catch (t) {
                    e.error(e, {
                        message: "Could not get private key.",
                        cause: t,
                        send: !0,
                        alert: {
                            level: l.Alert.Level.fatal,
                            description: l.Alert.Description.internal_error
                        }
                    })
                }
                null === n ? e.error(e, {
                    message: "No private key set.",
                    send: !0,
                    alert: {
                        level: l.Alert.Level.fatal,
                        description: l.Alert.Description.internal_error
                    }
                }) : t = n.sign(t, null), r(e, t)
            }, e.getSignature(e, r, t)
        }, l.createCertificateVerify = function(e, t) {
            var r = t.length + 2,
                n = a.util.createBuffer();
            return n.putByte(l.HandshakeType.certificate_verify), n.putInt24(r), n.putInt16(t.length), n.putBytes(t), n
        }, l.createCertificateRequest = function(e) {
            var t = a.util.createBuffer();
            t.putByte(1);
            var r = a.util.createBuffer();
            for (var n in e.caStore.certs) {
                var i = e.caStore.certs[n],
                    s = a.pki.distinguishedNameToAsn1(i.subject),
                    o = a.asn1.toDer(s);
                r.putInt16(o.length()), r.putBuffer(o)
            }
            var c = 1 + t.length() + 2 + r.length(),
                p = a.util.createBuffer();
            return p.putByte(l.HandshakeType.certificate_request), p.putInt24(c), u(p, 1, t), u(p, 2, r), p
        }, l.createServerHelloDone = function(e) {
            var t = a.util.createBuffer();
            return t.putByte(l.HandshakeType.server_hello_done), t.putInt24(0), t
        }, l.createChangeCipherSpec = function() {
            var e = a.util.createBuffer();
            return e.putByte(1), e
        }, l.createFinished = function(e) {
            var t = a.util.createBuffer();
            t.putBuffer(e.session.md5.digest()), t.putBuffer(e.session.sha1.digest());
            var r = e.entity === l.ConnectionEnd.client,
                i = e.session.sp,
                s = n,
                o = r ? "client finished" : "server finished";
            t = s(i.master_secret, o, t.getBytes(), 12);
            var c = a.util.createBuffer();
            return c.putByte(l.HandshakeType.finished), c.putInt24(t.length()), c.putBuffer(t), c
        }, l.createHeartbeat = function(e, t, r) {
            void 0 === r && (r = t.length);
            var n = a.util.createBuffer();
            n.putByte(e), n.putInt16(r), n.putBytes(t);
            var i = n.length(),
                s = Math.max(16, i - r - 3);
            return n.putBytes(a.random.getBytes(s)), n
        }, l.queue = function(e, t) {
            if (t && (0 !== t.fragment.length() || t.type !== l.ContentType.handshake && t.type !== l.ContentType.alert && t.type !== l.ContentType.change_cipher_spec)) {
                if (t.type === l.ContentType.handshake) {
                    var r = t.fragment.bytes();
                    e.session.md5.update(r), e.session.sha1.update(r), r = null
                }
                var n;
                if (t.fragment.length() <= l.MaxFragment) n = [t];
                else {
                    n = [];
                    for (var i = t.fragment.bytes(); i.length > l.MaxFragment;) n.push(l.createRecord(e, {
                        type: t.type,
                        data: a.util.createBuffer(i.slice(0, l.MaxFragment))
                    })), i = i.slice(l.MaxFragment);
                    i.length > 0 && n.push(l.createRecord(e, {
                        type: t.type,
                        data: a.util.createBuffer(i)
                    }))
                }
                for (var s = 0; s < n.length && !e.fail; ++s) {
                    var o = n[s];
                    e.state.current.write.update(e, o) && e.records.push(o)
                }
            }
        }, l.flush = function(e) {
            for (var t = 0; t < e.records.length; ++t) {
                var r = e.records[t];
                e.tlsData.putByte(r.type), e.tlsData.putByte(r.version.major), e.tlsData.putByte(r.version.minor), e.tlsData.putInt16(r.fragment.length()), e.tlsData.putBuffer(e.records[t].fragment)
            }
            return e.records = [], e.tlsDataReady(e)
        };
        var j = function(e) {
                switch (e) {
                    case !0:
                        return !0;
                    case a.pki.certificateError.bad_certificate:
                        return l.Alert.Description.bad_certificate;
                    case a.pki.certificateError.unsupported_certificate:
                        return l.Alert.Description.unsupported_certificate;
                    case a.pki.certificateError.certificate_revoked:
                        return l.Alert.Description.certificate_revoked;
                    case a.pki.certificateError.certificate_expired:
                        return l.Alert.Description.certificate_expired;
                    case a.pki.certificateError.certificate_unknown:
                        return l.Alert.Description.certificate_unknown;
                    case a.pki.certificateError.unknown_ca:
                        return l.Alert.Description.unknown_ca;
                    default:
                        return l.Alert.Description.bad_certificate
                }
            },
            G = function(e) {
                switch (e) {
                    case !0:
                        return !0;
                    case l.Alert.Description.bad_certificate:
                        return a.pki.certificateError.bad_certificate;
                    case l.Alert.Description.unsupported_certificate:
                        return a.pki.certificateError.unsupported_certificate;
                    case l.Alert.Description.certificate_revoked:
                        return a.pki.certificateError.certificate_revoked;
                    case l.Alert.Description.certificate_expired:
                        return a.pki.certificateError.certificate_expired;
                    case l.Alert.Description.certificate_unknown:
                        return a.pki.certificateError.certificate_unknown;
                    case l.Alert.Description.unknown_ca:
                        return a.pki.certificateError.unknown_ca;
                    default:
                        return a.pki.certificateError.bad_certificate
                }
            };
        l.verifyCertificateChain = function(e, t) {
            try {
                var r = {};
                for (var n in e.verifyOptions) r[n] = e.verifyOptions[n];
                r.verify = function(t, r, n) {
                    var i = (j(t), e.verify(e, t, r, n));
                    if (!0 !== i) {
                        if ("object" == typeof i && !a.util.isArray(i)) {
                            var s = new Error("The application rejected the certificate.");
                            throw s.send = !0, s.alert = {
                                level: l.Alert.Level.fatal,
                                description: l.Alert.Description.bad_certificate
                            }, i.message && (s.message = i.message), i.alert && (s.alert.description = i.alert), s
                        }
                        i !== t && (i = G(i))
                    }
                    return i
                }, a.pki.verifyCertificateChain(e.caStore, t, r)
            } catch (t) {
                var i = t;
                ("object" != typeof i || a.util.isArray(i)) && (i = {
                    send: !0,
                    alert: {
                        level: l.Alert.Level.fatal,
                        description: j(t)
                    }
                }), "send" in i || (i.send = !0), "alert" in i || (i.alert = {
                    level: l.Alert.Level.fatal,
                    description: j(i.error)
                }), e.error(e, i)
            }
            return !e.fail
        }, l.createSessionCache = function(e, t) {
            var r = null;
            if (e && e.getSession && e.setSession && e.order) r = e;
            else {
                r = {}, r.cache = e || {}, r.capacity = Math.max(t || 100, 1), r.order = [];
                for (var n in e) r.order.length <= t ? r.order.push(n) : delete e[n];
                r.getSession = function(e) {
                    var t = null,
                        n = null;
                    if (e ? n = a.util.bytesToHex(e) : r.order.length > 0 && (n = r.order[0]), null !== n && n in r.cache) {
                        t = r.cache[n], delete r.cache[n];
                        for (var i in r.order)
                            if (r.order[i] === n) {
                                r.order.splice(i, 1);
                                break
                            }
                    }
                    return t
                }, r.setSession = function(e, t) {
                    if (r.order.length === r.capacity) {
                        var n = r.order.shift();
                        delete r.cache[n]
                    }
                    var n = a.util.bytesToHex(e);
                    r.order.push(n), r.cache[n] = t
                }
            }
            return r
        }, l.createConnection = function(e) {
            var t = null;
            t = e.caStore ? a.util.isArray(e.caStore) ? a.pki.createCaStore(e.caStore) : e.caStore : a.pki.createCaStore();
            var r = e.cipherSuites || null;
            if (null === r) {
                r = [];
                for (var n in l.CipherSuites) r.push(l.CipherSuites[n])
            }
            var i = e.server ? l.ConnectionEnd.server : l.ConnectionEnd.client,
                s = e.sessionCache ? l.createSessionCache(e.sessionCache) : null,
                o = {
                    version: {
                        major: l.Version.major,
                        minor: l.Version.minor
                    },
                    entity: i,
                    sessionId: e.sessionId,
                    caStore: t,
                    sessionCache: s,
                    cipherSuites: r,
                    connected: e.connected,
                    virtualHost: e.virtualHost || null,
                    verifyClient: e.verifyClient || !1,
                    verify: e.verify || function(e, t, r, a) {
                        return t
                    },
                    verifyOptions: e.verifyOptions || {},
                    getCertificate: e.getCertificate || null,
                    getPrivateKey: e.getPrivateKey || null,
                    getSignature: e.getSignature || null,
                    input: a.util.createBuffer(),
                    tlsData: a.util.createBuffer(),
                    data: a.util.createBuffer(),
                    tlsDataReady: e.tlsDataReady,
                    dataReady: e.dataReady,
                    heartbeatReceived: e.heartbeatReceived,
                    closed: e.closed,
                    error: function(t, r) {
                        r.origin = r.origin || (t.entity === l.ConnectionEnd.client ? "client" : "server"), r.send && (l.queue(t, l.createAlert(t, r.alert)), l.flush(t));
                        var a = !1 !== r.fatal;
                        a && (t.fail = !0), e.error(t, r), a && t.close(!1)
                    },
                    deflate: e.deflate || null,
                    inflate: e.inflate || null
                };
            o.reset = function(e) {
                o.version = {
                    major: l.Version.major,
                    minor: l.Version.minor
                }, o.record = null, o.session = null, o.peerCertificate = null, o.state = {
                    pending: null,
                    current: null
                }, o.expect = (o.entity, l.ConnectionEnd.client, 0), o.fragmented = null, o.records = [], o.open = !1, o.handshakes = 0, o.handshaking = !1, o.isConnected = !1, o.fail = !(e || void 0 === e), o.input.clear(), o.tlsData.clear(), o.data.clear(), o.state.current = l.createConnectionState(o)
            }, o.reset();
            var c = function(e, t) {
                    var r = t.type - l.ContentType.change_cipher_spec,
                        a = _[e.entity][e.expect];
                    r in a ? a[r](e, t) : l.handleUnexpected(e, t)
                },
                u = function(e) {
                    var t = 0,
                        r = e.input,
                        n = r.length();
                    if (n < 5) t = 5 - n;
                    else {
                        e.record = {
                            type: r.getByte(),
                            version: {
                                major: r.getByte(),
                                minor: r.getByte()
                            },
                            length: r.getInt16(),
                            fragment: a.util.createBuffer(),
                            ready: !1
                        };
                        var i = e.record.version.major === e.version.major;
                        i && e.session && e.session.version && (i = e.record.version.minor === e.version.minor), i || e.error(e, {
                            message: "Incompatible TLS version.",
                            send: !0,
                            alert: {
                                level: l.Alert.Level.fatal,
                                description: l.Alert.Description.protocol_version
                            }
                        })
                    }
                    return t
                },
                p = function(e) {
                    var t = 0,
                        r = e.input,
                        a = r.length();
                    if (a < e.record.length) t = e.record.length - a;
                    else {
                        e.record.fragment.putBytes(r.getBytes(e.record.length)), r.compact();
                        e.state.current.read.update(e, e.record) && (null !== e.fragmented && (e.fragmented.type === e.record.type ? (e.fragmented.fragment.putBuffer(e.record.fragment), e.record = e.fragmented) : e.error(e, {
                            message: "Invalid fragmented record.",
                            send: !0,
                            alert: {
                                level: l.Alert.Level.fatal,
                                description: l.Alert.Description.unexpected_message
                            }
                        })), e.record.ready = !0)
                    }
                    return t
                };
            return o.handshake = function(e) {
                if (o.entity !== l.ConnectionEnd.client) o.error(o, {
                    message: "Cannot initiate handshake as a server.",
                    fatal: !1
                });
                else if (o.handshaking) o.error(o, {
                    message: "Handshake already in progress.",
                    fatal: !1
                });
                else {
                    o.fail && !o.open && 0 === o.handshakes && (o.fail = !1), o.handshaking = !0, e = e || "";
                    var t = null;
                    e.length > 0 && (o.sessionCache && (t = o.sessionCache.getSession(e)), null === t && (e = "")), 0 === e.length && o.sessionCache && null !== (t = o.sessionCache.getSession()) && (e = t.id), o.session = {
                        id: e,
                        version: null,
                        cipherSuite: null,
                        compressionMethod: null,
                        serverCertificate: null,
                        certificateRequest: null,
                        clientCertificate: null,
                        sp: {},
                        md5: a.md.md5.create(),
                        sha1: a.md.sha1.create()
                    }, t && (o.version = t.version, o.session.sp = t.sp), o.session.sp.client_random = l.createRandom().getBytes(), o.open = !0, l.queue(o, l.createRecord(o, {
                        type: l.ContentType.handshake,
                        data: l.createClientHello(o)
                    })), l.flush(o)
                }
            }, o.process = function(e) {
                var t = 0;
                return e && o.input.putBytes(e), o.fail || (null !== o.record && o.record.ready && o.record.fragment.isEmpty() && (o.record = null), null === o.record && (t = u(o)), o.fail || null === o.record || o.record.ready || (t = p(o)), !o.fail && null !== o.record && o.record.ready && c(o, o.record)), t
            }, o.prepare = function(e) {
                return l.queue(o, l.createRecord(o, {
                    type: l.ContentType.application_data,
                    data: a.util.createBuffer(e)
                })), l.flush(o)
            }, o.prepareHeartbeatRequest = function(e, t) {
                return e instanceof a.util.ByteBuffer && (e = e.bytes()), void 0 === t && (t = e.length), o.expectedHeartbeatPayload = e, l.queue(o, l.createRecord(o, {
                    type: l.ContentType.heartbeat,
                    data: l.createHeartbeat(l.HeartbeatMessageType.heartbeat_request, e, t)
                })), l.flush(o)
            }, o.close = function(e) {
                if (!o.fail && o.sessionCache && o.session) {
                    var t = {
                        id: o.session.id,
                        version: o.session.version,
                        sp: o.session.sp
                    };
                    t.sp.keys = null, o.sessionCache.setSession(t.id, t)
                }
                o.open && (o.open = !1, o.input.clear(), (o.isConnected || o.handshaking) && (o.isConnected = o.handshaking = !1, l.queue(o, l.createAlert(o, {
                    level: l.Alert.Level.warning,
                    description: l.Alert.Description.close_notify
                })), l.flush(o)), o.closed(o)), o.reset(e)
            }, o
        }, e.exports = a.tls = a.tls || {};
        for (var H in l) "function" != typeof l[H] && (a.tls[H] = l[H]);
        a.tls.prf_tls1 = n, a.tls.hmac_sha1 = i, a.tls.createSessionCache = l.createSessionCache, a.tls.createConnection = l.createConnection
    }, function(e, t, r) {
        var a = r(0);
        r(3), r(6), r(22), r(7), r(15), r(28), r(18), r(11), r(1), r(17);
        var n = a.asn1,
            i = e.exports = a.pki = a.pki || {};
        i.pemToDer = function(e) {
            var t = a.pem.decode(e)[0];
            if (t.procType && "ENCRYPTED" === t.procType.type) throw new Error("Could not convert PEM to DER; PEM is encrypted.");
            return a.util.createBuffer(t.body)
        }, i.privateKeyFromPem = function(e) {
            var t = a.pem.decode(e)[0];
            if ("PRIVATE KEY" !== t.type && "RSA PRIVATE KEY" !== t.type) {
                var r = new Error('Could not convert private key from PEM; PEM header type is not "PRIVATE KEY" or "RSA PRIVATE KEY".');
                throw r.headerType = t.type, r
            }
            if (t.procType && "ENCRYPTED" === t.procType.type) throw new Error("Could not convert private key from PEM; PEM is encrypted.");
            var s = n.fromDer(t.body);
            return i.privateKeyFromAsn1(s)
        }, i.privateKeyToPem = function(e, t) {
            var r = {
                type: "RSA PRIVATE KEY",
                body: n.toDer(i.privateKeyToAsn1(e)).getBytes()
            };
            return a.pem.encode(r, {
                maxline: t
            })
        }, i.privateKeyInfoToPem = function(e, t) {
            var r = {
                type: "PRIVATE KEY",
                body: n.toDer(e).getBytes()
            };
            return a.pem.encode(r, {
                maxline: t
            })
        }
    }, function(e, t, r) {
        function a(e, t) {
            return e.start().update(t).digest().getBytes()
        }

        function n(e) {
            var t;
            if (e) {
                if (!(t = l.oids[u.derToOid(e)])) {
                    var r = new Error("Unsupported PRF OID.");
                    throw r.oid = e, r.supported = ["hmacWithSHA1", "hmacWithSHA224", "hmacWithSHA256", "hmacWithSHA384", "hmacWithSHA512"], r
                }
            } else t = "hmacWithSHA1";
            return i(t)
        }

        function i(e) {
            var t = o.md;
            switch (e) {
                case "hmacWithSHA224":
                    t = o.md.sha512;
                case "hmacWithSHA1":
                case "hmacWithSHA256":
                case "hmacWithSHA384":
                case "hmacWithSHA512":
                    e = e.substr(8).toLowerCase();
                    break;
                default:
                    var r = new Error("Unsupported PRF algorithm.");
                    throw r.algorithm = e, r.supported = ["hmacWithSHA1", "hmacWithSHA224", "hmacWithSHA256", "hmacWithSHA384", "hmacWithSHA512"], r
            }
            if (!(t && e in t)) throw new Error("Unknown hash algorithm: " + e);
            return t[e].create()
        }

        function s(e, t, r, a) {
            var n = u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, [u.create(u.Class.UNIVERSAL, u.Type.OCTETSTRING, !1, e), u.create(u.Class.UNIVERSAL, u.Type.INTEGER, !1, t.getBytes())]);
            return "hmacWithSHA1" !== a && n.value.push(u.create(u.Class.UNIVERSAL, u.Type.INTEGER, !1, o.util.hexToBytes(r.toString(16))), u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, [u.create(u.Class.UNIVERSAL, u.Type.OID, !1, u.oidToDer(l.oids[a]).getBytes()), u.create(u.Class.UNIVERSAL, u.Type.NULL, !1, "")])), n
        }
        var o = r(0);
        if (r(5), r(3), r(10), r(4), r(6), r(15), r(7), r(2), r(25), r(11), r(1), void 0 === c) var c = o.jsbn.BigInteger;
        var u = o.asn1,
            l = o.pki = o.pki || {};
        e.exports = l.pbe = o.pbe = o.pbe || {};
        var p = l.oids,
            f = {
                name: "EncryptedPrivateKeyInfo",
                tagClass: u.Class.UNIVERSAL,
                type: u.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "EncryptedPrivateKeyInfo.encryptionAlgorithm",
                    tagClass: u.Class.UNIVERSAL,
                    type: u.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "AlgorithmIdentifier.algorithm",
                        tagClass: u.Class.UNIVERSAL,
                        type: u.Type.OID,
                        constructed: !1,
                        capture: "encryptionOid"
                    }, {
                        name: "AlgorithmIdentifier.parameters",
                        tagClass: u.Class.UNIVERSAL,
                        type: u.Type.SEQUENCE,
                        constructed: !0,
                        captureAsn1: "encryptionParams"
                    }]
                }, {
                    name: "EncryptedPrivateKeyInfo.encryptedData",
                    tagClass: u.Class.UNIVERSAL,
                    type: u.Type.OCTETSTRING,
                    constructed: !1,
                    capture: "encryptedData"
                }]
            },
            h = {
                name: "PBES2Algorithms",
                tagClass: u.Class.UNIVERSAL,
                type: u.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "PBES2Algorithms.keyDerivationFunc",
                    tagClass: u.Class.UNIVERSAL,
                    type: u.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "PBES2Algorithms.keyDerivationFunc.oid",
                        tagClass: u.Class.UNIVERSAL,
                        type: u.Type.OID,
                        constructed: !1,
                        capture: "kdfOid"
                    }, {
                        name: "PBES2Algorithms.params",
                        tagClass: u.Class.UNIVERSAL,
                        type: u.Type.SEQUENCE,
                        constructed: !0,
                        value: [{
                            name: "PBES2Algorithms.params.salt",
                            tagClass: u.Class.UNIVERSAL,
                            type: u.Type.OCTETSTRING,
                            constructed: !1,
                            capture: "kdfSalt"
                        }, {
                            name: "PBES2Algorithms.params.iterationCount",
                            tagClass: u.Class.UNIVERSAL,
                            type: u.Type.INTEGER,
                            constructed: !1,
                            capture: "kdfIterationCount"
                        }, {
                            name: "PBES2Algorithms.params.keyLength",
                            tagClass: u.Class.UNIVERSAL,
                            type: u.Type.INTEGER,
                            constructed: !1,
                            optional: !0,
                            capture: "keyLength"
                        }, {
                            name: "PBES2Algorithms.params.prf",
                            tagClass: u.Class.UNIVERSAL,
                            type: u.Type.SEQUENCE,
                            constructed: !0,
                            optional: !0,
                            value: [{
                                name: "PBES2Algorithms.params.prf.algorithm",
                                tagClass: u.Class.UNIVERSAL,
                                type: u.Type.OID,
                                constructed: !1,
                                capture: "prfOid"
                            }]
                        }]
                    }]
                }, {
                    name: "PBES2Algorithms.encryptionScheme",
                    tagClass: u.Class.UNIVERSAL,
                    type: u.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "PBES2Algorithms.encryptionScheme.oid",
                        tagClass: u.Class.UNIVERSAL,
                        type: u.Type.OID,
                        constructed: !1,
                        capture: "encOid"
                    }, {
                        name: "PBES2Algorithms.encryptionScheme.iv",
                        tagClass: u.Class.UNIVERSAL,
                        type: u.Type.OCTETSTRING,
                        constructed: !1,
                        capture: "encIv"
                    }]
                }]
            },
            d = {
                name: "pkcs-12PbeParams",
                tagClass: u.Class.UNIVERSAL,
                type: u.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "pkcs-12PbeParams.salt",
                    tagClass: u.Class.UNIVERSAL,
                    type: u.Type.OCTETSTRING,
                    constructed: !1,
                    capture: "salt"
                }, {
                    name: "pkcs-12PbeParams.iterations",
                    tagClass: u.Class.UNIVERSAL,
                    type: u.Type.INTEGER,
                    constructed: !1,
                    capture: "iterations"
                }]
            };
        l.encryptPrivateKeyInfo = function(e, t, r) {
            r = r || {}, r.saltSize = r.saltSize || 8, r.count = r.count || 2048, r.algorithm = r.algorithm || "aes128", r.prfAlgorithm = r.prfAlgorithm || "sha1";
            var a, n, c, f = o.random.getBytesSync(r.saltSize),
                h = r.count,
                d = u.integerToDer(h);
            if (0 === r.algorithm.indexOf("aes") || "des" === r.algorithm) {
                var y, g, v;
                switch (r.algorithm) {
                    case "aes128":
                        a = 16, y = 16, g = p["aes128-CBC"], v = o.aes.createEncryptionCipher;
                        break;
                    case "aes192":
                        a = 24, y = 16, g = p["aes192-CBC"], v = o.aes.createEncryptionCipher;
                        break;
                    case "aes256":
                        a = 32, y = 16, g = p["aes256-CBC"], v = o.aes.createEncryptionCipher;
                        break;
                    case "des":
                        a = 8, y = 8, g = p.desCBC, v = o.des.createEncryptionCipher;
                        break;
                    default:
                        var m = new Error("Cannot encrypt private key. Unknown encryption algorithm.");
                        throw m.algorithm = r.algorithm, m
                }
                var C = "hmacWith" + r.prfAlgorithm.toUpperCase(),
                    E = i(C),
                    S = o.pkcs5.pbkdf2(t, f, h, a, E),
                    T = o.random.getBytesSync(y),
                    I = v(S);
                I.start(T), I.update(u.toDer(e)), I.finish(), c = I.output.getBytes();
                var b = s(f, d, a, C);
                n = u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, [u.create(u.Class.UNIVERSAL, u.Type.OID, !1, u.oidToDer(p.pkcs5PBES2).getBytes()), u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, [u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, [u.create(u.Class.UNIVERSAL, u.Type.OID, !1, u.oidToDer(p.pkcs5PBKDF2).getBytes()), b]), u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, [u.create(u.Class.UNIVERSAL, u.Type.OID, !1, u.oidToDer(g).getBytes()), u.create(u.Class.UNIVERSAL, u.Type.OCTETSTRING, !1, T)])])])
            } else {
                if ("3des" !== r.algorithm) {
                    var m = new Error("Cannot encrypt private key. Unknown encryption algorithm.");
                    throw m.algorithm = r.algorithm, m
                }
                a = 24;
                var A = new o.util.ByteBuffer(f),
                    S = l.pbe.generatePkcs12Key(t, A, 1, h, a),
                    T = l.pbe.generatePkcs12Key(t, A, 2, h, a),
                    I = o.des.createEncryptionCipher(S);
                I.start(T), I.update(u.toDer(e)), I.finish(), c = I.output.getBytes(), n = u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, [u.create(u.Class.UNIVERSAL, u.Type.OID, !1, u.oidToDer(p["pbeWithSHAAnd3-KeyTripleDES-CBC"]).getBytes()), u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, [u.create(u.Class.UNIVERSAL, u.Type.OCTETSTRING, !1, f), u.create(u.Class.UNIVERSAL, u.Type.INTEGER, !1, d.getBytes())])])
            }
            return u.create(u.Class.UNIVERSAL, u.Type.SEQUENCE, !0, [n, u.create(u.Class.UNIVERSAL, u.Type.OCTETSTRING, !1, c)])
        }, l.decryptPrivateKeyInfo = function(e, t) {
            var r = null,
                a = {},
                n = [];
            if (!u.validate(e, f, a, n)) {
                var i = new Error("Cannot read encrypted private key. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
                throw i.errors = n, i
            }
            var s = u.derToOid(a.encryptionOid),
                c = l.pbe.getCipher(s, a.encryptionParams, t),
                p = o.util.createBuffer(a.encryptedData);
            return c.update(p), c.finish() && (r = u.fromDer(c.output)), r
        }, l.encryptedPrivateKeyToPem = function(e, t) {
            var r = {
                type: "ENCRYPTED PRIVATE KEY",
                body: u.toDer(e).getBytes()
            };
            return o.pem.encode(r, {
                maxline: t
            })
        }, l.encryptedPrivateKeyFromPem = function(e) {
            var t = o.pem.decode(e)[0];
            if ("ENCRYPTED PRIVATE KEY" !== t.type) {
                var r = new Error('Could not convert encrypted private key from PEM; PEM header type is "ENCRYPTED PRIVATE KEY".');
                throw r.headerType = t.type, r
            }
            if (t.procType && "ENCRYPTED" === t.procType.type) throw new Error("Could not convert encrypted private key from PEM; PEM is encrypted.");
            return u.fromDer(t.body)
        }, l.encryptRsaPrivateKey = function(e, t, r) {
            if (r = r || {}, !r.legacy) {
                var a = l.wrapRsaPrivateKey(l.privateKeyToAsn1(e));
                return a = l.encryptPrivateKeyInfo(a, t, r), l.encryptedPrivateKeyToPem(a)
            }
            var n, i, s, c;
            switch (r.algorithm) {
                case "aes128":
                    n = "AES-128-CBC", s = 16, i = o.random.getBytesSync(16), c = o.aes.createEncryptionCipher;
                    break;
                case "aes192":
                    n = "AES-192-CBC", s = 24, i = o.random.getBytesSync(16), c = o.aes.createEncryptionCipher;
                    break;
                case "aes256":
                    n = "AES-256-CBC", s = 32, i = o.random.getBytesSync(16), c = o.aes.createEncryptionCipher;
                    break;
                case "3des":
                    n = "DES-EDE3-CBC", s = 24, i = o.random.getBytesSync(8), c = o.des.createEncryptionCipher;
                    break;
                case "des":
                    n = "DES-CBC", s = 8, i = o.random.getBytesSync(8), c = o.des.createEncryptionCipher;
                    break;
                default:
                    var p = new Error('Could not encrypt RSA private key; unsupported encryption algorithm "' + r.algorithm + '".');
                    throw p.algorithm = r.algorithm, p
            }
            var f = o.pbe.opensslDeriveBytes(t, i.substr(0, 8), s),
                h = c(f);
            h.start(i), h.update(u.toDer(l.privateKeyToAsn1(e))), h.finish();
            var d = {
                type: "RSA PRIVATE KEY",
                procType: {
                    version: "4",
                    type: "ENCRYPTED"
                },
                dekInfo: {
                    algorithm: n,
                    parameters: o.util.bytesToHex(i).toUpperCase()
                },
                body: h.output.getBytes()
            };
            return o.pem.encode(d)
        }, l.decryptRsaPrivateKey = function(e, t) {
            var r = null,
                a = o.pem.decode(e)[0];
            if ("ENCRYPTED PRIVATE KEY" !== a.type && "PRIVATE KEY" !== a.type && "RSA PRIVATE KEY" !== a.type) {
                var n = new Error('Could not convert private key from PEM; PEM header type is not "ENCRYPTED PRIVATE KEY", "PRIVATE KEY", or "RSA PRIVATE KEY".');
                throw n.headerType = n, n
            }
            if (a.procType && "ENCRYPTED" === a.procType.type) {
                var i, s;
                switch (a.dekInfo.algorithm) {
                    case "DES-CBC":
                        i = 8, s = o.des.createDecryptionCipher;
                        break;
                    case "DES-EDE3-CBC":
                        i = 24, s = o.des.createDecryptionCipher;
                        break;
                    case "AES-128-CBC":
                        i = 16, s = o.aes.createDecryptionCipher;
                        break;
                    case "AES-192-CBC":
                        i = 24, s = o.aes.createDecryptionCipher;
                        break;
                    case "AES-256-CBC":
                        i = 32, s = o.aes.createDecryptionCipher;
                        break;
                    case "RC2-40-CBC":
                        i = 5, s = function(e) {
                            return o.rc2.createDecryptionCipher(e, 40)
                        };
                        break;
                    case "RC2-64-CBC":
                        i = 8, s = function(e) {
                            return o.rc2.createDecryptionCipher(e, 64)
                        };
                        break;
                    case "RC2-128-CBC":
                        i = 16, s = function(e) {
                            return o.rc2.createDecryptionCipher(e, 128)
                        };
                        break;
                    default:
                        var n = new Error('Could not decrypt private key; unsupported encryption algorithm "' + a.dekInfo.algorithm + '".');
                        throw n.algorithm = a.dekInfo.algorithm, n
                }
                var c = o.util.hexToBytes(a.dekInfo.parameters),
                    p = o.pbe.opensslDeriveBytes(t, c.substr(0, 8), i),
                    f = s(p);
                if (f.start(c), f.update(o.util.createBuffer(a.body)), !f.finish()) return r;
                r = f.output.getBytes()
            } else r = a.body;
            return r = "ENCRYPTED PRIVATE KEY" === a.type ? l.decryptPrivateKeyInfo(u.fromDer(r), t) : u.fromDer(r), null !== r && (r = l.privateKeyFromAsn1(r)), r
        }, l.pbe.generatePkcs12Key = function(e, t, r, a, n, i) {
            var s, c;
            if (void 0 === i || null === i) {
                if (!("sha1" in o.md)) throw new Error('"sha1" hash algorithm unavailable.');
                i = o.md.sha1.create()
            }
            var u = i.digestLength,
                l = i.blockLength,
                p = new o.util.ByteBuffer,
                f = new o.util.ByteBuffer;
            if (null !== e && void 0 !== e) {
                for (c = 0; c < e.length; c++) f.putInt16(e.charCodeAt(c));
                f.putInt16(0)
            }
            var h = f.length(),
                d = t.length(),
                y = new o.util.ByteBuffer;
            y.fillWithByte(r, l);
            var g = l * Math.ceil(d / l),
                v = new o.util.ByteBuffer;
            for (c = 0; c < g; c++) v.putByte(t.at(c % d));
            var m = l * Math.ceil(h / l),
                C = new o.util.ByteBuffer;
            for (c = 0; c < m; c++) C.putByte(f.at(c % h));
            var E = v;
            E.putBuffer(C);
            for (var S = Math.ceil(n / u), T = 1; T <= S; T++) {
                var I = new o.util.ByteBuffer;
                I.putBytes(y.bytes()), I.putBytes(E.bytes());
                for (var b = 0; b < a; b++) i.start(), i.update(I.getBytes()), I = i.digest();
                var A = new o.util.ByteBuffer;
                for (c = 0; c < l; c++) A.putByte(I.at(c % u));
                var B = Math.ceil(d / l) + Math.ceil(h / l),
                    N = new o.util.ByteBuffer;
                for (s = 0; s < B; s++) {
                    var k = new o.util.ByteBuffer(E.getBytes(l)),
                        w = 511;
                    for (c = A.length() - 1; c >= 0; c--) w >>= 8, w += A.at(c) + k.at(c), k.setAt(c, 255 & w);
                    N.putBuffer(k)
                }
                E = N, p.putBuffer(I)
            }
            return p.truncate(p.length() - n), p
        }, l.pbe.getCipher = function(e, t, r) {
            switch (e) {
                case l.oids.pkcs5PBES2:
                    return l.pbe.getCipherForPBES2(e, t, r);
                case l.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
                case l.oids["pbewithSHAAnd40BitRC2-CBC"]:
                    return l.pbe.getCipherForPKCS12PBE(e, t, r);
                default:
                    var a = new Error("Cannot read encrypted PBE data block. Unsupported OID.");
                    throw a.oid = e, a.supportedOids = ["pkcs5PBES2", "pbeWithSHAAnd3-KeyTripleDES-CBC", "pbewithSHAAnd40BitRC2-CBC"], a
            }
        }, l.pbe.getCipherForPBES2 = function(e, t, r) {
            var a = {},
                i = [];
            if (!u.validate(t, h, a, i)) {
                var s = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
                throw s.errors = i, s
            }
            if ((e = u.derToOid(a.kdfOid)) !== l.oids.pkcs5PBKDF2) {
                var s = new Error("Cannot read encrypted private key. Unsupported key derivation function OID.");
                throw s.oid = e, s.supportedOids = ["pkcs5PBKDF2"], s
            }
            if ((e = u.derToOid(a.encOid)) !== l.oids["aes128-CBC"] && e !== l.oids["aes192-CBC"] && e !== l.oids["aes256-CBC"] && e !== l.oids["des-EDE3-CBC"] && e !== l.oids.desCBC) {
                var s = new Error("Cannot read encrypted private key. Unsupported encryption scheme OID.");
                throw s.oid = e, s.supportedOids = ["aes128-CBC", "aes192-CBC", "aes256-CBC", "des-EDE3-CBC", "desCBC"], s
            }
            var c = a.kdfSalt,
                p = o.util.createBuffer(a.kdfIterationCount);
            p = p.getInt(p.length() << 3);
            var f, d;
            switch (l.oids[e]) {
                case "aes128-CBC":
                    f = 16, d = o.aes.createDecryptionCipher;
                    break;
                case "aes192-CBC":
                    f = 24, d = o.aes.createDecryptionCipher;
                    break;
                case "aes256-CBC":
                    f = 32, d = o.aes.createDecryptionCipher;
                    break;
                case "des-EDE3-CBC":
                    f = 24, d = o.des.createDecryptionCipher;
                    break;
                case "desCBC":
                    f = 8, d = o.des.createDecryptionCipher
            }
            var y = n(a.prfOid),
                g = o.pkcs5.pbkdf2(r, c, p, f, y),
                v = a.encIv,
                m = d(g);
            return m.start(v), m
        }, l.pbe.getCipherForPKCS12PBE = function(e, t, r) {
            var a = {},
                i = [];
            if (!u.validate(t, d, a, i)) {
                var s = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
                throw s.errors = i, s
            }
            var c = o.util.createBuffer(a.salt),
                p = o.util.createBuffer(a.iterations);
            p = p.getInt(p.length() << 3);
            var f, h, y;
            switch (e) {
                case l.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
                    f = 24, h = 8, y = o.des.startDecrypting;
                    break;
                case l.oids["pbewithSHAAnd40BitRC2-CBC"]:
                    f = 5, h = 8, y = function(e, t) {
                        var r = o.rc2.createDecryptionCipher(e, 40);
                        return r.start(t, null), r
                    };
                    break;
                default:
                    var s = new Error("Cannot read PKCS #12 PBE data block. Unsupported OID.");
                    throw s.oid = e, s
            }
            var g = n(a.prfOid),
                v = l.pbe.generatePkcs12Key(r, c, 1, p, f, g);
            return g.start(), y(v, l.pbe.generatePkcs12Key(r, c, 2, p, h, g))
        }, l.pbe.opensslDeriveBytes = function(e, t, r, n) {
            if (void 0 === n || null === n) {
                if (!("md5" in o.md)) throw new Error('"md5" hash algorithm unavailable.');
                n = o.md.md5.create()
            }
            null === t && (t = "");
            for (var i = [a(n, e + t)], s = 16, c = 1; s < r; ++c, s += 16) i.push(a(n, i[c - 1] + e + t));
            return i.join("").substr(0, r)
        }
    }, function(e, t, r) {
        function a() {
            o = String.fromCharCode(128), o += i.util.fillString(String.fromCharCode(0), 64), u = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], c = !0
        }

        function n(e, t, r) {
            for (var a, n, i, s, o, c, l, p, f, h, d, y, g, v, m, C = r.length(); C >= 64;) {
                for (l = 0; l < 16; ++l) t[l] = r.getInt32();
                for (; l < 64; ++l) a = t[l - 2], a = (a >>> 17 | a << 15) ^ (a >>> 19 | a << 13) ^ a >>> 10, n = t[l - 15], n = (n >>> 7 | n << 25) ^ (n >>> 18 | n << 14) ^ n >>> 3, t[l] = a + t[l - 7] + n + t[l - 16] | 0;
                for (p = e.h0, f = e.h1, h = e.h2, d = e.h3, y = e.h4, g = e.h5, v = e.h6, m = e.h7, l = 0; l < 64; ++l) s = (y >>> 6 | y << 26) ^ (y >>> 11 | y << 21) ^ (y >>> 25 | y << 7), o = v ^ y & (g ^ v), i = (p >>> 2 | p << 30) ^ (p >>> 13 | p << 19) ^ (p >>> 22 | p << 10), c = p & f | h & (p ^ f), a = m + s + o + u[l] + t[l], n = i + c, m = v, v = g, g = y, y = d + a >>> 0, d = h, h = f, f = p, p = a + n >>> 0;
                e.h0 = e.h0 + p | 0, e.h1 = e.h1 + f | 0, e.h2 = e.h2 + h | 0, e.h3 = e.h3 + d | 0, e.h4 = e.h4 + y | 0, e.h5 = e.h5 + g | 0, e.h6 = e.h6 + v | 0, e.h7 = e.h7 + m | 0, C -= 64
            }
        }
        var i = r(0);
        r(4), r(1);
        var s = e.exports = i.sha256 = i.sha256 || {};
        i.md.sha256 = i.md.algorithms.sha256 = s, s.create = function() {
            c || a();
            var e = null,
                t = i.util.createBuffer(),
                r = new Array(64),
                s = {
                    algorithm: "sha256",
                    blockLength: 64,
                    digestLength: 32,
                    messageLength: 0,
                    fullMessageLength: null,
                    messageLengthSize: 8
                };
            return s.start = function() {
                s.messageLength = 0, s.fullMessageLength = s.messageLength64 = [];
                for (var r = s.messageLengthSize / 4, a = 0; a < r; ++a) s.fullMessageLength.push(0);
                return t = i.util.createBuffer(), e = {
                    h0: 1779033703,
                    h1: 3144134277,
                    h2: 1013904242,
                    h3: 2773480762,
                    h4: 1359893119,
                    h5: 2600822924,
                    h6: 528734635,
                    h7: 1541459225
                }, s
            }, s.start(), s.update = function(a, o) {
                "utf8" === o && (a = i.util.encodeUtf8(a));
                var c = a.length;
                s.messageLength += c, c = [c / 4294967296 >>> 0, c >>> 0];
                for (var u = s.fullMessageLength.length - 1; u >= 0; --u) s.fullMessageLength[u] += c[1], c[1] = c[0] + (s.fullMessageLength[u] / 4294967296 >>> 0), s.fullMessageLength[u] = s.fullMessageLength[u] >>> 0, c[0] = c[1] / 4294967296 >>> 0;
                return t.putBytes(a), n(e, r, t), (t.read > 2048 || 0 === t.length()) && t.compact(), s
            }, s.digest = function() {
                var a = i.util.createBuffer();
                a.putBytes(t.bytes());
                var c = s.fullMessageLength[s.fullMessageLength.length - 1] + s.messageLengthSize,
                    u = c & s.blockLength - 1;
                a.putBytes(o.substr(0, s.blockLength - u));
                for (var l, p, f = 8 * s.fullMessageLength[0], h = 0; h < s.fullMessageLength.length - 1; ++h) l = 8 * s.fullMessageLength[h + 1], p = l / 4294967296 >>> 0, f += p, a.putInt32(f >>> 0), f = l >>> 0;
                a.putInt32(f);
                var d = {
                    h0: e.h0,
                    h1: e.h1,
                    h2: e.h2,
                    h3: e.h3,
                    h4: e.h4,
                    h5: e.h5,
                    h6: e.h6,
                    h7: e.h7
                };
                n(d, r, a);
                var y = i.util.createBuffer();
                return y.putInt32(d.h0), y.putInt32(d.h1), y.putInt32(d.h2), y.putInt32(d.h3), y.putInt32(d.h4), y.putInt32(d.h5), y.putInt32(d.h6), y.putInt32(d.h7), y
            }, s
        };
        var o = null,
            c = !1,
            u = null
    }, function(e, t, r) {
        var a = r(0);
        r(1);
        var n = null;
        !a.util.isNodejs || a.options.usePureJavaScript || process.versions["node-webkit"] || (n = r(16)), (e.exports = a.prng = a.prng || {}).create = function(e) {
            function t(e) {
                if (o.pools[0].messageLength >= 32) return i(), e();
                var t = 32 - o.pools[0].messageLength << 5;
                o.seedFile(t, function(t, r) {
                    if (t) return e(t);
                    o.collect(r), i(), e()
                })
            }

            function r() {
                if (o.pools[0].messageLength >= 32) return i();
                var e = 32 - o.pools[0].messageLength << 5;
                o.collect(o.seedFileSync(e)), i()
            }

            function i() {
                o.reseeds = 4294967295 === o.reseeds ? 0 : o.reseeds + 1;
                var e = o.plugin.md.create();
                e.update(o.keyBytes);
                for (var t = 1, r = 0; r < 32; ++r) o.reseeds % t == 0 && (e.update(o.pools[r].digest().getBytes()), o.pools[r].start()), t <<= 1;
                o.keyBytes = e.digest().getBytes(), e.start(), e.update(o.keyBytes);
                var a = e.digest().getBytes();
                o.key = o.plugin.formatKey(o.keyBytes), o.seed = o.plugin.formatSeed(a), o.generated = 0
            }

            function s(e) {
                var t = null,
                    r = a.util.globalScope,
                    n = r.crypto || r.msCrypto;
                n && n.getRandomValues && (t = function(e) {
                    return n.getRandomValues(e)
                });
                var i = a.util.createBuffer();
                if (t)
                    for (; i.length() < e;) {
                        var s = Math.max(1, Math.min(e - i.length(), 65536) / 4),
                            o = new Uint32Array(Math.floor(s));
                        try {
                            t(o);
                            for (var c = 0; c < o.length; ++c) i.putInt32(o[c])
                        } catch (e) {
                            if (!("undefined" != typeof QuotaExceededError && e instanceof QuotaExceededError)) throw e
                        }
                    }
                if (i.length() < e)
                    for (var u, l, p, f = Math.floor(65536 * Math.random()); i.length() < e;) {
                        l = 16807 * (65535 & f), u = 16807 * (f >> 16), l += (32767 & u) << 16, l += u >> 15, l = (2147483647 & l) + (l >> 31), f = 4294967295 & l;
                        for (var c = 0; c < 3; ++c) p = f >>> (c << 3), p ^= Math.floor(256 * Math.random()), i.putByte(String.fromCharCode(255 & p))
                    }
                return i.getBytes(e)
            }
            for (var o = {
                    plugin: e,
                    key: null,
                    seed: null,
                    time: null,
                    reseeds: 0,
                    generated: 0,
                    keyBytes: ""
                }, c = e.md, u = new Array(32), l = 0; l < 32; ++l) u[l] = c.create();
            return o.pools = u, o.pool = 0, o.generate = function(e, r) {
                function n(p) {
                    if (p) return r(p);
                    if (l.length() >= e) return r(null, l.getBytes(e));
                    if (o.generated > 1048575 && (o.key = null), null === o.key) return a.util.nextTick(function() {
                        t(n)
                    });
                    var f = i(o.key, o.seed);
                    o.generated += f.length, l.putBytes(f), o.key = c(i(o.key, s(o.seed))), o.seed = u(i(o.key, o.seed)), a.util.setImmediate(n)
                }
                if (!r) return o.generateSync(e);
                var i = o.plugin.cipher,
                    s = o.plugin.increment,
                    c = o.plugin.formatKey,
                    u = o.plugin.formatSeed,
                    l = a.util.createBuffer();
                o.key = null, n()
            }, o.generateSync = function(e) {
                var t = o.plugin.cipher,
                    n = o.plugin.increment,
                    i = o.plugin.formatKey,
                    s = o.plugin.formatSeed;
                o.key = null;
                for (var c = a.util.createBuffer(); c.length() < e;) {
                    o.generated > 1048575 && (o.key = null), null === o.key && r();
                    var u = t(o.key, o.seed);
                    o.generated += u.length, c.putBytes(u), o.key = i(t(o.key, n(o.seed))), o.seed = s(t(o.key, o.seed))
                }
                return c.getBytes(e)
            }, n ? (o.seedFile = function(e, t) {
                n.randomBytes(e, function(e, r) {
                    if (e) return t(e);
                    t(null, r.toString())
                })
            }, o.seedFileSync = function(e) {
                return n.randomBytes(e).toString()
            }) : (o.seedFile = function(e, t) {
                try {
                    t(null, s(e))
                } catch (e) {
                    t(e)
                }
            }, o.seedFileSync = s), o.collect = function(e) {
                for (var t = e.length, r = 0; r < t; ++r) o.pools[o.pool].update(e.substr(r, 1)), o.pool = 31 === o.pool ? 0 : o.pool + 1
            }, o.collectInt = function(e, t) {
                for (var r = "", a = 0; a < t; a += 8) r += String.fromCharCode(e >> a & 255);
                o.collect(r)
            }, o.registerWorker = function(e) {
                if (e === self) o.seedFile = function(e, t) {
                    function r(e) {
                        var a = e.data;
                        a.forge && a.forge.prng && (self.removeEventListener("message", r), t(a.forge.prng.err, a.forge.prng.bytes))
                    }
                    self.addEventListener("message", r), self.postMessage({
                        forge: {
                            prng: {
                                needed: e
                            }
                        }
                    })
                };
                else {
                    var t = function(t) {
                        var r = t.data;
                        r.forge && r.forge.prng && o.seedFile(r.forge.prng.needed, function(t, r) {
                            e.postMessage({
                                forge: {
                                    prng: {
                                        err: t,
                                        bytes: r
                                    }
                                }
                            })
                        })
                    };
                    e.addEventListener("message", t)
                }
            }, o
        }
    }, function(e, t, r) {
        var a = r(0);
        r(1);
        var n = [217, 120, 249, 196, 25, 221, 181, 237, 40, 233, 253, 121, 74, 160, 216, 157, 198, 126, 55, 131, 43, 118, 83, 142, 98, 76, 100, 136, 68, 139, 251, 162, 23, 154, 89, 245, 135, 179, 79, 19, 97, 69, 109, 141, 9, 129, 125, 50, 189, 143, 64, 235, 134, 183, 123, 11, 240, 149, 33, 34, 92, 107, 78, 130, 84, 214, 101, 147, 206, 96, 178, 28, 115, 86, 192, 20, 167, 140, 241, 220, 18, 117, 202, 31, 59, 190, 228, 209, 66, 61, 212, 48, 163, 60, 182, 38, 111, 191, 14, 218, 70, 105, 7, 87, 39, 242, 29, 155, 188, 148, 67, 3, 248, 17, 199, 246, 144, 239, 62, 231, 6, 195, 213, 47, 200, 102, 30, 215, 8, 232, 234, 222, 128, 82, 238, 247, 132, 170, 114, 172, 53, 77, 106, 42, 150, 26, 210, 113, 90, 21, 73, 116, 75, 159, 208, 94, 4, 24, 164, 236, 194, 224, 65, 110, 15, 81, 203, 204, 36, 145, 175, 80, 161, 244, 112, 57, 153, 124, 58, 133, 35, 184, 180, 122, 252, 2, 54, 91, 37, 85, 151, 49, 45, 93, 250, 152, 227, 138, 146, 174, 5, 223, 41, 16, 103, 108, 186, 201, 211, 0, 230, 207, 225, 158, 168, 44, 99, 22, 1, 63, 88, 226, 137, 169, 13, 56, 52, 27, 171, 51, 255, 176, 187, 72, 12, 95, 185, 177, 205, 46, 197, 243, 219, 71, 229, 165, 156, 119, 10, 166, 32, 104, 254, 127, 193, 173],
            i = [1, 2, 3, 5],
            s = function(e, t) {
                return e << t & 65535 | (65535 & e) >> 16 - t
            },
            o = function(e, t) {
                return (65535 & e) >> t | e << 16 - t & 65535
            };
        e.exports = a.rc2 = a.rc2 || {}, a.rc2.expandKey = function(e, t) {
            "string" == typeof e && (e = a.util.createBuffer(e)), t = t || 128;
            var r, i = e,
                s = e.length(),
                o = t,
                c = Math.ceil(o / 8),
                u = 255 >> (7 & o);
            for (r = s; r < 128; r++) i.putByte(n[i.at(r - 1) + i.at(r - s) & 255]);
            for (i.setAt(128 - c, n[i.at(128 - c) & u]), r = 127 - c; r >= 0; r--) i.setAt(r, n[i.at(r + 1) ^ i.at(r + c)]);
            return i
        };
        var c = function(e, t, r) {
            var n, c, u, l, p = !1,
                f = null,
                h = null,
                d = null,
                y = [];
            for (e = a.rc2.expandKey(e, t), u = 0; u < 64; u++) y.push(e.getInt16Le());
            r ? (n = function(e) {
                for (u = 0; u < 4; u++) e[u] += y[l] + (e[(u + 3) % 4] & e[(u + 2) % 4]) + (~e[(u + 3) % 4] & e[(u + 1) % 4]), e[u] = s(e[u], i[u]), l++
            }, c = function(e) {
                for (u = 0; u < 4; u++) e[u] += y[63 & e[(u + 3) % 4]]
            }) : (n = function(e) {
                for (u = 3; u >= 0; u--) e[u] = o(e[u], i[u]), e[u] -= y[l] + (e[(u + 3) % 4] & e[(u + 2) % 4]) + (~e[(u + 3) % 4] & e[(u + 1) % 4]), l--
            }, c = function(e) {
                for (u = 3; u >= 0; u--) e[u] -= y[63 & e[(u + 3) % 4]]
            });
            var g = function(e) {
                    var t = [];
                    for (u = 0; u < 4; u++) {
                        var a = f.getInt16Le();
                        null !== d && (r ? a ^= d.getInt16Le() : d.putInt16Le(a)), t.push(65535 & a)
                    }
                    l = r ? 0 : 63;
                    for (var n = 0; n < e.length; n++)
                        for (var i = 0; i < e[n][0]; i++) e[n][1](t);
                    for (u = 0; u < 4; u++) null !== d && (r ? d.putInt16Le(t[u]) : t[u] ^= d.getInt16Le()), h.putInt16Le(t[u])
                },
                v = null;
            return v = {
                start: function(e, t) {
                    e && "string" == typeof e && (e = a.util.createBuffer(e)), p = !1, f = a.util.createBuffer(), h = t || new a.util.createBuffer, d = e, v.output = h
                },
                update: function(e) {
                    for (p || f.putBuffer(e); f.length() >= 8;) g([
                        [5, n],
                        [1, c],
                        [6, n],
                        [1, c],
                        [5, n]
                    ])
                },
                finish: function(e) {
                    var t = !0;
                    if (r)
                        if (e) t = e(8, f, !r);
                        else {
                            var a = 8 === f.length() ? 8 : 8 - f.length();
                            f.fillWithByte(a, a)
                        }
                    if (t && (p = !0, v.update()), !r && (t = 0 === f.length()))
                        if (e) t = e(8, h, !r);
                        else {
                            var n = h.length(),
                                i = h.at(n - 1);
                            i > n ? t = !1 : h.truncate(i)
                        }
                    return t
                }
            }
        };
        a.rc2.startEncrypting = function(e, t, r) {
            var n = a.rc2.createEncryptionCipher(e, 128);
            return n.start(t, r), n
        }, a.rc2.createEncryptionCipher = function(e, t) {
            return c(e, t, !0)
        }, a.rc2.startDecrypting = function(e, t, r) {
            var n = a.rc2.createDecryptionCipher(e, 128);
            return n.start(t, r), n
        }, a.rc2.createDecryptionCipher = function(e, t) {
            return c(e, t, !1)
        }
    }, function(e, t, r) {
        function a(e, t, r) {
            r || (r = n.md.sha1.create());
            for (var a = "", i = Math.ceil(t / r.digestLength), s = 0; s < i; ++s) {
                var o = String.fromCharCode(s >> 24 & 255, s >> 16 & 255, s >> 8 & 255, 255 & s);
                r.start(), r.update(e + o), a += r.digest().getBytes()
            }
            return a.substring(0, t)
        }
        var n = r(0);
        r(1), r(2), r(9);
        var i = e.exports = n.pkcs1 = n.pkcs1 || {};
        i.encode_rsa_oaep = function(e, t, r) {
            var i, s, o, c;
            "string" == typeof r ? (i = r, s = arguments[3] || void 0, o = arguments[4] || void 0) : r && (i = r.label || void 0, s = r.seed || void 0, o = r.md || void 0, r.mgf1 && r.mgf1.md && (c = r.mgf1.md)), o ? o.start() : o = n.md.sha1.create(), c || (c = o);
            var u = Math.ceil(e.n.bitLength() / 8),
                l = u - 2 * o.digestLength - 2;
            if (t.length > l) {
                var p = new Error("RSAES-OAEP input message length is too long.");
                throw p.length = t.length, p.maxLength = l, p
            }
            i || (i = ""), o.update(i, "raw");
            for (var f = o.digest(), h = "", d = l - t.length, y = 0; y < d; y++) h += "\0";
            var g = f.getBytes() + h + "" + t;
            if (s) {
                if (s.length !== o.digestLength) {
                    var p = new Error("Invalid RSAES-OAEP seed. The seed length must match the digest length.");
                    throw p.seedLength = s.length, p.digestLength = o.digestLength, p
                }
            } else s = n.random.getBytes(o.digestLength);
            var v = a(s, u - o.digestLength - 1, c),
                m = n.util.xorBytes(g, v, g.length),
                C = a(m, o.digestLength, c);
            return "\0" + n.util.xorBytes(s, C, s.length) + m
        }, i.decode_rsa_oaep = function(e, t, r) {
            var i, s, o;
            "string" == typeof r ? (i = r, s = arguments[3] || void 0) : r && (i = r.label || void 0, s = r.md || void 0, r.mgf1 && r.mgf1.md && (o = r.mgf1.md));
            var c = Math.ceil(e.n.bitLength() / 8);
            if (t.length !== c) {
                var u = new Error("RSAES-OAEP encoded message length is invalid.");
                throw u.length = t.length, u.expectedLength = c, u
            }
            if (void 0 === s ? s = n.md.sha1.create() : s.start(), o || (o = s), c < 2 * s.digestLength + 2) throw new Error("RSAES-OAEP key is too short for the hash function.");
            i || (i = ""), s.update(i, "raw");
            for (var l = s.digest().getBytes(), p = t.charAt(0), f = t.substring(1, s.digestLength + 1), h = t.substring(1 + s.digestLength), d = a(h, s.digestLength, o), y = n.util.xorBytes(f, d, f.length), g = a(y, c - s.digestLength - 1, o), v = n.util.xorBytes(h, g, h.length), m = v.substring(0, s.digestLength), u = "\0" !== p, C = 0; C < s.digestLength; ++C) u |= l.charAt(C) !== m.charAt(C);
            for (var E = 1, S = s.digestLength, T = s.digestLength; T < v.length; T++) {
                var I = v.charCodeAt(T),
                    b = 1 & I ^ 1;
                u |= I & (E ? 65534 : 0), E &= b, S += E
            }
            if (u || 1 !== v.charCodeAt(S)) throw new Error("Invalid RSAES-OAEP padding.");
            return v.substring(S + 1)
        }
    }, function(e, t, r) {
        var a = r(0);
        r(1), r(12), r(2),
            function() {
                function t(e, t, a, n) {
                    return "workers" in a ? i(e, t, a, n) : r(e, t, a, n)
                }

                function r(e, t, r, a) {
                    var i = s(e, t),
                        c = o(i.bitLength());
                    "millerRabinTests" in r && (c = r.millerRabinTests);
                    var u = 10;
                    "maxBlockTime" in r && (u = r.maxBlockTime), n(i, e, t, 0, c, u, a)
                }

                function n(e, t, r, i, o, c, u) {
                    var p = +new Date;
                    do {
                        if (e.bitLength() > t && (e = s(t, r)), e.isProbablePrime(o)) return u(null, e);
                        e.dAddOffset(l[i++ % 8], 0)
                    } while (c < 0 || +new Date - p < c);
                    a.util.setImmediate(function() {
                        n(e, t, r, i, o, c, u)
                    })
                }

                function i(e, t, n, i) {
                    function o() {
                        function r(r) {
                            if (!d) {
                                --o;
                                var n = r.data;
                                if (n.found) {
                                    for (var l = 0; l < a.length; ++l) a[l].terminate();
                                    return d = !0, i(null, new u(n.prime, 16))
                                }
                                c.bitLength() > e && (c = s(e, t));
                                var h = c.toString(16);
                                r.target.postMessage({
                                    hex: h,
                                    workLoad: p
                                }), c.dAddOffset(f, 0)
                            }
                        }
                        l = Math.max(1, l);
                        for (var a = [], n = 0; n < l; ++n) a[n] = new Worker(h);
                        for (var o = l, n = 0; n < l; ++n) a[n].addEventListener("message", r);
                        var d = !1
                    }
                    if ("undefined" == typeof Worker) return r(e, t, n, i);
                    var c = s(e, t),
                        l = n.workers,
                        p = n.workLoad || 100,
                        f = 30 * p / 8,
                        h = n.workerScript || "forge/prime.worker.js";
                    if (-1 === l) return a.util.estimateCores(function(e, t) {
                        e && (t = 2), l = t - 1, o()
                    });
                    o()
                }

                function s(e, t) {
                    var r = new u(e, t),
                        a = e - 1;
                    return r.testBit(a) || r.bitwiseTo(u.ONE.shiftLeft(a), f, r), r.dAddOffset(31 - r.mod(p).byteValue(), 0), r
                }

                function o(e) {
                    return e <= 100 ? 27 : e <= 150 ? 18 : e <= 200 ? 15 : e <= 250 ? 12 : e <= 300 ? 9 : e <= 350 ? 8 : e <= 400 ? 7 : e <= 500 ? 6 : e <= 600 ? 5 : e <= 800 ? 4 : e <= 1250 ? 3 : 2
                }
                if (a.prime) return void(e.exports = a.prime);
                var c = e.exports = a.prime = a.prime || {},
                    u = a.jsbn.BigInteger,
                    l = [6, 4, 2, 4, 2, 4, 6, 2],
                    p = new u(null);
                p.fromInt(30);
                var f = function(e, t) {
                    return e | t
                };
                c.generateProbablePrime = function(e, r, n) {
                    "function" == typeof r && (n = r, r = {}), r = r || {};
                    var i = r.algorithm || "PRIMEINC";
                    "string" == typeof i && (i = {
                        name: i
                    }), i.options = i.options || {};
                    var s = r.prng || a.random,
                        o = {
                            nextBytes: function(e) {
                                for (var t = s.getBytesSync(e.length), r = 0; r < e.length; ++r) e[r] = t.charCodeAt(r)
                            }
                        };
                    if ("PRIMEINC" === i.name) return t(e, o, i.options, n);
                    throw new Error("Invalid prime generation algorithm: " + i.name)
                }
            }()
    }, function(e, t, r) {
        function a(e, t, r, a) {
            for (var n = [], i = 0; i < e.length; i++)
                for (var s = 0; s < e[i].safeBags.length; s++) {
                    var o = e[i].safeBags[s];
                    void 0 !== a && o.type !== a || (null !== t ? void 0 !== o.attributes[t] && o.attributes[t].indexOf(r) >= 0 && n.push(o) : n.push(o))
                }
            return n
        }

        function n(e) {
            if (e.composed || e.constructed) {
                for (var t = u.util.createBuffer(), r = 0; r < e.value.length; ++r) t.putBytes(e.value[r].value);
                e.composed = e.constructed = !1, e.value = t.getBytes()
            }
            return e
        }

        function i(e, t, r, a) {
            if (t = l.fromDer(t, r), t.tagClass !== l.Class.UNIVERSAL || t.type !== l.Type.SEQUENCE || !0 !== t.constructed) throw new Error("PKCS#12 AuthenticatedSafe expected to be a SEQUENCE OF ContentInfo");
            for (var i = 0; i < t.value.length; i++) {
                var c = t.value[i],
                    u = {},
                    f = [];
                if (!l.validate(c, h, u, f)) {
                    var d = new Error("Cannot read ContentInfo.");
                    throw d.errors = f, d
                }
                var y = {
                        encrypted: !1
                    },
                    g = null,
                    v = u.content.value[0];
                switch (l.derToOid(u.contentType)) {
                    case p.oids.data:
                        if (v.tagClass !== l.Class.UNIVERSAL || v.type !== l.Type.OCTETSTRING) throw new Error("PKCS#12 SafeContents Data is not an OCTET STRING.");
                        g = n(v).value;
                        break;
                    case p.oids.encryptedData:
                        g = s(v, a), y.encrypted = !0;
                        break;
                    default:
                        var d = new Error("Unsupported PKCS#12 contentType.");
                        throw d.contentType = l.derToOid(u.contentType), d
                }
                y.safeBags = o(g, r, a), e.safeContents.push(y)
            }
        }

        function s(e, t) {
            var r = {},
                a = [];
            if (!l.validate(e, u.pkcs7.asn1.encryptedDataValidator, r, a)) {
                var i = new Error("Cannot read EncryptedContentInfo.");
                throw i.errors = a, i
            }
            var s = l.derToOid(r.contentType);
            if (s !== p.oids.data) {
                var i = new Error("PKCS#12 EncryptedContentInfo ContentType is not Data.");
                throw i.oid = s, i
            }
            s = l.derToOid(r.encAlgorithm);
            var o = p.pbe.getCipher(s, r.encParameter, t),
                c = n(r.encryptedContentAsn1),
                f = u.util.createBuffer(c.value);
            if (o.update(f), !o.finish()) throw new Error("Failed to decrypt PKCS#12 SafeContents.");
            return o.output.getBytes()
        }

        function o(e, t, r) {
            if (!t && 0 === e.length) return [];
            if (e = l.fromDer(e, t), e.tagClass !== l.Class.UNIVERSAL || e.type !== l.Type.SEQUENCE || !0 !== e.constructed) throw new Error("PKCS#12 SafeContents expected to be a SEQUENCE OF SafeBag.");
            for (var a = [], n = 0; n < e.value.length; n++) {
                var i = e.value[n],
                    s = {},
                    o = [];
                if (!l.validate(i, y, s, o)) {
                    var u = new Error("Cannot read SafeBag.");
                    throw u.errors = o, u
                }
                var f = {
                    type: l.derToOid(s.bagId),
                    attributes: c(s.bagAttributes)
                };
                a.push(f);
                var h, d, g = s.bagValue.value[0];
                switch (f.type) {
                    case p.oids.pkcs8ShroudedKeyBag:
                        if (null === (g = p.decryptPrivateKeyInfo(g, r))) throw new Error("Unable to decrypt PKCS#8 ShroudedKeyBag, wrong password?");
                    case p.oids.keyBag:
                        try {
                            f.key = p.privateKeyFromAsn1(g)
                        } catch (e) {
                            f.key = null, f.asn1 = g
                        }
                        continue;
                    case p.oids.certBag:
                        h = v, d = function() {
                            if (l.derToOid(s.certId) !== p.oids.x509Certificate) {
                                var e = new Error("Unsupported certificate type, only X.509 supported.");
                                throw e.oid = l.derToOid(s.certId), e
                            }
                            var r = l.fromDer(s.cert, t);
                            try {
                                f.cert = p.certificateFromAsn1(r, !0)
                            } catch (e) {
                                f.cert = null, f.asn1 = r
                            }
                        };
                        break;
                    default:
                        var u = new Error("Unsupported PKCS#12 SafeBag type.");
                        throw u.oid = f.type, u
                }
                if (void 0 !== h && !l.validate(g, h, s, o)) {
                    var u = new Error("Cannot read PKCS#12 " + h.name);
                    throw u.errors = o, u
                }
                d()
            }
            return a
        }

        function c(e) {
            var t = {};
            if (void 0 !== e)
                for (var r = 0; r < e.length; ++r) {
                    var a = {},
                        n = [];
                    if (!l.validate(e[r], g, a, n)) {
                        var i = new Error("Cannot read PKCS#12 BagAttribute.");
                        throw i.errors = n, i
                    }
                    var s = l.derToOid(a.oid);
                    if (void 0 !== p.oids[s]) {
                        t[p.oids[s]] = [];
                        for (var o = 0; o < a.values.length; ++o) t[p.oids[s]].push(a.values[o].value)
                    }
                }
            return t
        }
        var u = r(0);
        r(3), r(8), r(6), r(29), r(22), r(2), r(11), r(9), r(1), r(17);
        var l = u.asn1,
            p = u.pki,
            f = e.exports = u.pkcs12 = u.pkcs12 || {},
            h = {
                name: "ContentInfo",
                tagClass: l.Class.UNIVERSAL,
                type: l.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "ContentInfo.contentType",
                    tagClass: l.Class.UNIVERSAL,
                    type: l.Type.OID,
                    constructed: !1,
                    capture: "contentType"
                }, {
                    name: "ContentInfo.content",
                    tagClass: l.Class.CONTEXT_SPECIFIC,
                    constructed: !0,
                    captureAsn1: "content"
                }]
            },
            d = {
                name: "PFX",
                tagClass: l.Class.UNIVERSAL,
                type: l.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "PFX.version",
                    tagClass: l.Class.UNIVERSAL,
                    type: l.Type.INTEGER,
                    constructed: !1,
                    capture: "version"
                }, h, {
                    name: "PFX.macData",
                    tagClass: l.Class.UNIVERSAL,
                    type: l.Type.SEQUENCE,
                    constructed: !0,
                    optional: !0,
                    captureAsn1: "mac",
                    value: [{
                        name: "PFX.macData.mac",
                        tagClass: l.Class.UNIVERSAL,
                        type: l.Type.SEQUENCE,
                        constructed: !0,
                        value: [{
                            name: "PFX.macData.mac.digestAlgorithm",
                            tagClass: l.Class.UNIVERSAL,
                            type: l.Type.SEQUENCE,
                            constructed: !0,
                            value: [{
                                name: "PFX.macData.mac.digestAlgorithm.algorithm",
                                tagClass: l.Class.UNIVERSAL,
                                type: l.Type.OID,
                                constructed: !1,
                                capture: "macAlgorithm"
                            }, {
                                name: "PFX.macData.mac.digestAlgorithm.parameters",
                                tagClass: l.Class.UNIVERSAL,
                                captureAsn1: "macAlgorithmParameters"
                            }]
                        }, {
                            name: "PFX.macData.mac.digest",
                            tagClass: l.Class.UNIVERSAL,
                            type: l.Type.OCTETSTRING,
                            constructed: !1,
                            capture: "macDigest"
                        }]
                    }, {
                        name: "PFX.macData.macSalt",
                        tagClass: l.Class.UNIVERSAL,
                        type: l.Type.OCTETSTRING,
                        constructed: !1,
                        capture: "macSalt"
                    }, {
                        name: "PFX.macData.iterations",
                        tagClass: l.Class.UNIVERSAL,
                        type: l.Type.INTEGER,
                        constructed: !1,
                        optional: !0,
                        capture: "macIterations"
                    }]
                }]
            },
            y = {
                name: "SafeBag",
                tagClass: l.Class.UNIVERSAL,
                type: l.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "SafeBag.bagId",
                    tagClass: l.Class.UNIVERSAL,
                    type: l.Type.OID,
                    constructed: !1,
                    capture: "bagId"
                }, {
                    name: "SafeBag.bagValue",
                    tagClass: l.Class.CONTEXT_SPECIFIC,
                    constructed: !0,
                    captureAsn1: "bagValue"
                }, {
                    name: "SafeBag.bagAttributes",
                    tagClass: l.Class.UNIVERSAL,
                    type: l.Type.SET,
                    constructed: !0,
                    optional: !0,
                    capture: "bagAttributes"
                }]
            },
            g = {
                name: "Attribute",
                tagClass: l.Class.UNIVERSAL,
                type: l.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "Attribute.attrId",
                    tagClass: l.Class.UNIVERSAL,
                    type: l.Type.OID,
                    constructed: !1,
                    capture: "oid"
                }, {
                    name: "Attribute.attrValues",
                    tagClass: l.Class.UNIVERSAL,
                    type: l.Type.SET,
                    constructed: !0,
                    capture: "values"
                }]
            },
            v = {
                name: "CertBag",
                tagClass: l.Class.UNIVERSAL,
                type: l.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "CertBag.certId",
                    tagClass: l.Class.UNIVERSAL,
                    type: l.Type.OID,
                    constructed: !1,
                    capture: "certId"
                }, {
                    name: "CertBag.certValue",
                    tagClass: l.Class.CONTEXT_SPECIFIC,
                    constructed: !0,
                    value: [{
                        name: "CertBag.certValue[0]",
                        tagClass: l.Class.UNIVERSAL,
                        type: l.Class.OCTETSTRING,
                        constructed: !1,
                        capture: "cert"
                    }]
                }]
            };
        f.pkcs12FromAsn1 = function(e, t, r) {
            "string" == typeof t ? (r = t, t = !0) : void 0 === t && (t = !0);
            var s = {},
                o = [];
            if (!l.validate(e, d, s, o)) {
                var c = new Error("Cannot read PKCS#12 PFX. ASN.1 object is not an PKCS#12 PFX.");
                throw c.errors = c, c
            }
            var h = {
                version: s.version.charCodeAt(0),
                safeContents: [],
                getBags: function(e) {
                    var t, r = {};
                    return "localKeyId" in e ? t = e.localKeyId : "localKeyIdHex" in e && (t = u.util.hexToBytes(e.localKeyIdHex)), void 0 === t && !("friendlyName" in e) && "bagType" in e && (r[e.bagType] = a(h.safeContents, null, null, e.bagType)), void 0 !== t && (r.localKeyId = a(h.safeContents, "localKeyId", t, e.bagType)), "friendlyName" in e && (r.friendlyName = a(h.safeContents, "friendlyName", e.friendlyName, e.bagType)), r
                },
                getBagsByFriendlyName: function(e, t) {
                    return a(h.safeContents, "friendlyName", e, t)
                },
                getBagsByLocalKeyId: function(e, t) {
                    return a(h.safeContents, "localKeyId", e, t)
                }
            };
            if (3 !== s.version.charCodeAt(0)) {
                var c = new Error("PKCS#12 PFX of version other than 3 not supported.");
                throw c.version = s.version.charCodeAt(0), c
            }
            if (l.derToOid(s.contentType) !== p.oids.data) {
                var c = new Error("Only PKCS#12 PFX in password integrity mode supported.");
                throw c.oid = l.derToOid(s.contentType), c
            }
            var y = s.content.value[0];
            if (y.tagClass !== l.Class.UNIVERSAL || y.type !== l.Type.OCTETSTRING) throw new Error("PKCS#12 authSafe content data is not an OCTET STRING.");
            if (y = n(y), s.mac) {
                var g = null,
                    v = 0,
                    m = l.derToOid(s.macAlgorithm);
                switch (m) {
                    case p.oids.sha1:
                        g = u.md.sha1.create(), v = 20;
                        break;
                    case p.oids.sha256:
                        g = u.md.sha256.create(), v = 32;
                        break;
                    case p.oids.sha384:
                        g = u.md.sha384.create(), v = 48;
                        break;
                    case p.oids.sha512:
                        g = u.md.sha512.create(), v = 64;
                        break;
                    case p.oids.md5:
                        g = u.md.md5.create(), v = 16
                }
                if (null === g) throw new Error("PKCS#12 uses unsupported MAC algorithm: " + m);
                var C = new u.util.ByteBuffer(s.macSalt),
                    E = "macIterations" in s ? parseInt(u.util.bytesToHex(s.macIterations), 16) : 1,
                    S = f.generateKey(r, C, 3, E, v, g),
                    T = u.hmac.create();
                T.start(g, S), T.update(y.value);
                if (T.getMac().getBytes() !== s.macDigest) throw new Error("PKCS#12 MAC could not be verified. Invalid password?")
            }
            return i(h, y.value, t, r), h
        }, f.toPkcs12Asn1 = function(e, t, r, a) {
            a = a || {}, a.saltSize = a.saltSize || 8, a.count = a.count || 2048, a.algorithm = a.algorithm || a.encAlgorithm || "aes128", "useMac" in a || (a.useMac = !0), "localKeyId" in a || (a.localKeyId = null), "generateLocalKeyId" in a || (a.generateLocalKeyId = !0);
            var n, i = a.localKeyId;
            if (null !== i) i = u.util.hexToBytes(i);
            else if (a.generateLocalKeyId)
                if (t) {
                    var s = u.util.isArray(t) ? t[0] : t;
                    "string" == typeof s && (s = p.certificateFromPem(s));
                    var o = u.md.sha1.create();
                    o.update(l.toDer(p.certificateToAsn1(s)).getBytes()), i = o.digest().getBytes()
                } else i = u.random.getBytes(20);
            var c = [];
            null !== i && c.push(l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(p.oids.localKeyId).getBytes()), l.create(l.Class.UNIVERSAL, l.Type.SET, !0, [l.create(l.Class.UNIVERSAL, l.Type.OCTETSTRING, !1, i)])])), "friendlyName" in a && c.push(l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(p.oids.friendlyName).getBytes()), l.create(l.Class.UNIVERSAL, l.Type.SET, !0, [l.create(l.Class.UNIVERSAL, l.Type.BMPSTRING, !1, a.friendlyName)])])), c.length > 0 && (n = l.create(l.Class.UNIVERSAL, l.Type.SET, !0, c));
            var h = [],
                d = [];
            null !== t && (d = u.util.isArray(t) ? t : [t]);
            for (var y = [], g = 0; g < d.length; ++g) {
                t = d[g], "string" == typeof t && (t = p.certificateFromPem(t));
                var v = 0 === g ? n : void 0,
                    m = p.certificateToAsn1(t),
                    C = l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(p.oids.certBag).getBytes()), l.create(l.Class.CONTEXT_SPECIFIC, 0, !0, [l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(p.oids.x509Certificate).getBytes()), l.create(l.Class.CONTEXT_SPECIFIC, 0, !0, [l.create(l.Class.UNIVERSAL, l.Type.OCTETSTRING, !1, l.toDer(m).getBytes())])])]), v]);
                y.push(C)
            }
            if (y.length > 0) {
                var E = l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, y),
                    S = l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(p.oids.data).getBytes()), l.create(l.Class.CONTEXT_SPECIFIC, 0, !0, [l.create(l.Class.UNIVERSAL, l.Type.OCTETSTRING, !1, l.toDer(E).getBytes())])]);
                h.push(S)
            }
            var T = null;
            if (null !== e) {
                var I = p.wrapRsaPrivateKey(p.privateKeyToAsn1(e));
                T = null === r ? l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(p.oids.keyBag).getBytes()), l.create(l.Class.CONTEXT_SPECIFIC, 0, !0, [I]), n]) : l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(p.oids.pkcs8ShroudedKeyBag).getBytes()), l.create(l.Class.CONTEXT_SPECIFIC, 0, !0, [p.encryptPrivateKeyInfo(I, r, a)]), n]);
                var b = l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [T]),
                    A = l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(p.oids.data).getBytes()), l.create(l.Class.CONTEXT_SPECIFIC, 0, !0, [l.create(l.Class.UNIVERSAL, l.Type.OCTETSTRING, !1, l.toDer(b).getBytes())])]);
                h.push(A)
            }
            var B, N = l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, h);
            if (a.useMac) {
                var o = u.md.sha1.create(),
                    k = new u.util.ByteBuffer(u.random.getBytes(a.saltSize)),
                    w = a.count,
                    e = f.generateKey(r, k, 3, w, 20),
                    R = u.hmac.create();
                R.start(o, e), R.update(l.toDer(N).getBytes());
                var _ = R.getMac();
                B = l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(p.oids.sha1).getBytes()), l.create(l.Class.UNIVERSAL, l.Type.NULL, !1, "")]), l.create(l.Class.UNIVERSAL, l.Type.OCTETSTRING, !1, _.getBytes())]), l.create(l.Class.UNIVERSAL, l.Type.OCTETSTRING, !1, k.getBytes()), l.create(l.Class.UNIVERSAL, l.Type.INTEGER, !1, l.integerToDer(w).getBytes())])
            }
            return l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.INTEGER, !1, l.integerToDer(3).getBytes()), l.create(l.Class.UNIVERSAL, l.Type.SEQUENCE, !0, [l.create(l.Class.UNIVERSAL, l.Type.OID, !1, l.oidToDer(p.oids.data).getBytes()), l.create(l.Class.CONTEXT_SPECIFIC, 0, !0, [l.create(l.Class.UNIVERSAL, l.Type.OCTETSTRING, !1, l.toDer(N).getBytes())])]), B])
        }, f.generateKey = u.pbe.generatePkcs12Key
    }, function(e, t, r) {
        var a = r(0);
        r(3), r(1);
        var n = a.asn1,
            i = e.exports = a.pkcs7asn1 = a.pkcs7asn1 || {};
        a.pkcs7 = a.pkcs7 || {}, a.pkcs7.asn1 = i;
        var s = {
            name: "ContentInfo",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "ContentInfo.ContentType",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.OID,
                constructed: !1,
                capture: "contentType"
            }, {
                name: "ContentInfo.content",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 0,
                constructed: !0,
                optional: !0,
                captureAsn1: "content"
            }]
        };
        i.contentInfoValidator = s;
        var o = {
            name: "EncryptedContentInfo",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "EncryptedContentInfo.contentType",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.OID,
                constructed: !1,
                capture: "contentType"
            }, {
                name: "EncryptedContentInfo.contentEncryptionAlgorithm",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "EncryptedContentInfo.contentEncryptionAlgorithm.algorithm",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.OID,
                    constructed: !1,
                    capture: "encAlgorithm"
                }, {
                    name: "EncryptedContentInfo.contentEncryptionAlgorithm.parameter",
                    tagClass: n.Class.UNIVERSAL,
                    captureAsn1: "encParameter"
                }]
            }, {
                name: "EncryptedContentInfo.encryptedContent",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 0,
                capture: "encryptedContent",
                captureAsn1: "encryptedContentAsn1"
            }]
        };
        i.envelopedDataValidator = {
            name: "EnvelopedData",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "EnvelopedData.Version",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.INTEGER,
                constructed: !1,
                capture: "version"
            }, {
                name: "EnvelopedData.RecipientInfos",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SET,
                constructed: !0,
                captureAsn1: "recipientInfos"
            }].concat(o)
        }, i.encryptedDataValidator = {
            name: "EncryptedData",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "EncryptedData.Version",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.INTEGER,
                constructed: !1,
                capture: "version"
            }].concat(o)
        };
        var c = {
            name: "SignerInfo",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "SignerInfo.version",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.INTEGER,
                constructed: !1
            }, {
                name: "SignerInfo.issuerAndSerialNumber",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "SignerInfo.issuerAndSerialNumber.issuer",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "issuer"
                }, {
                    name: "SignerInfo.issuerAndSerialNumber.serialNumber",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.INTEGER,
                    constructed: !1,
                    capture: "serial"
                }]
            }, {
                name: "SignerInfo.digestAlgorithm",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "SignerInfo.digestAlgorithm.algorithm",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.OID,
                    constructed: !1,
                    capture: "digestAlgorithm"
                }, {
                    name: "SignerInfo.digestAlgorithm.parameter",
                    tagClass: n.Class.UNIVERSAL,
                    constructed: !1,
                    captureAsn1: "digestParameter",
                    optional: !0
                }]
            }, {
                name: "SignerInfo.authenticatedAttributes",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 0,
                constructed: !0,
                optional: !0,
                capture: "authenticatedAttributes"
            }, {
                name: "SignerInfo.digestEncryptionAlgorithm",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                capture: "signatureAlgorithm"
            }, {
                name: "SignerInfo.encryptedDigest",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.OCTETSTRING,
                constructed: !1,
                capture: "signature"
            }, {
                name: "SignerInfo.unauthenticatedAttributes",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 1,
                constructed: !0,
                optional: !0,
                capture: "unauthenticatedAttributes"
            }]
        };
        i.signedDataValidator = {
            name: "SignedData",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "SignedData.Version",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.INTEGER,
                constructed: !1,
                capture: "version"
            }, {
                name: "SignedData.DigestAlgorithms",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SET,
                constructed: !0,
                captureAsn1: "digestAlgorithms"
            }, s, {
                name: "SignedData.Certificates",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 0,
                optional: !0,
                captureAsn1: "certificates"
            }, {
                name: "SignedData.CertificateRevocationLists",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 1,
                optional: !0,
                captureAsn1: "crls"
            }, {
                name: "SignedData.SignerInfos",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SET,
                capture: "signerInfos",
                optional: !0,
                value: [c]
            }]
        }, i.recipientInfoValidator = {
            name: "RecipientInfo",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "RecipientInfo.version",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.INTEGER,
                constructed: !1,
                capture: "version"
            }, {
                name: "RecipientInfo.issuerAndSerial",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "RecipientInfo.issuerAndSerial.issuer",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "issuer"
                }, {
                    name: "RecipientInfo.issuerAndSerial.serialNumber",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.INTEGER,
                    constructed: !1,
                    capture: "serial"
                }]
            }, {
                name: "RecipientInfo.keyEncryptionAlgorithm",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "RecipientInfo.keyEncryptionAlgorithm.algorithm",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.OID,
                    constructed: !1,
                    capture: "encAlgorithm"
                }, {
                    name: "RecipientInfo.keyEncryptionAlgorithm.parameter",
                    tagClass: n.Class.UNIVERSAL,
                    constructed: !1,
                    captureAsn1: "encParameter"
                }]
            }, {
                name: "RecipientInfo.encryptedKey",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.OCTETSTRING,
                constructed: !1,
                capture: "encKey"
            }]
        }
    }, function(e, t, r) {
        var a = r(0);
        r(1), a.mgf = a.mgf || {}, (e.exports = a.mgf.mgf1 = a.mgf1 = a.mgf1 || {}).create = function(e) {
            return {
                generate: function(t, r) {
                    for (var n = new a.util.ByteBuffer, i = Math.ceil(r / e.digestLength), s = 0; s < i; s++) {
                        var o = new a.util.ByteBuffer;
                        o.putInt32(s), e.start(), e.update(t + o.getBytes()), n.putBuffer(e.digest())
                    }
                    return n.truncate(n.length() - r), n.getBytes()
                }
            }
        }
    }, function(e, t, r) {
        var a = r(0);
        e.exports = a.debug = a.debug || {}, a.debug.storage = {}, a.debug.get = function(e, t) {
            var r;
            return void 0 === e ? r = a.debug.storage : e in a.debug.storage && (r = void 0 === t ? a.debug.storage[e] : a.debug.storage[e][t]), r
        }, a.debug.set = function(e, t, r) {
            e in a.debug.storage || (a.debug.storage[e] = {}), a.debug.storage[e][t] = r
        }, a.debug.clear = function(e, t) {
            void 0 === e ? a.debug.storage = {} : e in a.debug.storage && (void 0 === t ? delete a.debug.storage[e] : delete a.debug.storage[e][t])
        }
    }, function(e, t, r) {
        function a() {
            c = String.fromCharCode(128), c += i.util.fillString(String.fromCharCode(0), 128), l = [
                [1116352408, 3609767458],
                [1899447441, 602891725],
                [3049323471, 3964484399],
                [3921009573, 2173295548],
                [961987163, 4081628472],
                [1508970993, 3053834265],
                [2453635748, 2937671579],
                [2870763221, 3664609560],
                [3624381080, 2734883394],
                [310598401, 1164996542],
                [607225278, 1323610764],
                [1426881987, 3590304994],
                [1925078388, 4068182383],
                [2162078206, 991336113],
                [2614888103, 633803317],
                [3248222580, 3479774868],
                [3835390401, 2666613458],
                [4022224774, 944711139],
                [264347078, 2341262773],
                [604807628, 2007800933],
                [770255983, 1495990901],
                [1249150122, 1856431235],
                [1555081692, 3175218132],
                [1996064986, 2198950837],
                [2554220882, 3999719339],
                [2821834349, 766784016],
                [2952996808, 2566594879],
                [3210313671, 3203337956],
                [3336571891, 1034457026],
                [3584528711, 2466948901],
                [113926993, 3758326383],
                [338241895, 168717936],
                [666307205, 1188179964],
                [773529912, 1546045734],
                [1294757372, 1522805485],
                [1396182291, 2643833823],
                [1695183700, 2343527390],
                [1986661051, 1014477480],
                [2177026350, 1206759142],
                [2456956037, 344077627],
                [2730485921, 1290863460],
                [2820302411, 3158454273],
                [3259730800, 3505952657],
                [3345764771, 106217008],
                [3516065817, 3606008344],
                [3600352804, 1432725776],
                [4094571909, 1467031594],
                [275423344, 851169720],
                [430227734, 3100823752],
                [506948616, 1363258195],
                [659060556, 3750685593],
                [883997877, 3785050280],
                [958139571, 3318307427],
                [1322822218, 3812723403],
                [1537002063, 2003034995],
                [1747873779, 3602036899],
                [1955562222, 1575990012],
                [2024104815, 1125592928],
                [2227730452, 2716904306],
                [2361852424, 442776044],
                [2428436474, 593698344],
                [2756734187, 3733110249],
                [3204031479, 2999351573],
                [3329325298, 3815920427],
                [3391569614, 3928383900],
                [3515267271, 566280711],
                [3940187606, 3454069534],
                [4118630271, 4000239992],
                [116418474, 1914138554],
                [174292421, 2731055270],
                [289380356, 3203993006],
                [460393269, 320620315],
                [685471733, 587496836],
                [852142971, 1086792851],
                [1017036298, 365543100],
                [1126000580, 2618297676],
                [1288033470, 3409855158],
                [1501505948, 4234509866],
                [1607167915, 987167468],
                [1816402316, 1246189591]
            ], p = {}, p["SHA-512"] = [
                [1779033703, 4089235720],
                [3144134277, 2227873595],
                [1013904242, 4271175723],
                [2773480762, 1595750129],
                [1359893119, 2917565137],
                [2600822924, 725511199],
                [528734635, 4215389547],
                [1541459225, 327033209]
            ], p["SHA-384"] = [
                [3418070365, 3238371032],
                [1654270250, 914150663],
                [2438529370, 812702999],
                [355462360, 4144912697],
                [1731405415, 4290775857],
                [2394180231, 1750603025],
                [3675008525, 1694076839],
                [1203062813, 3204075428]
            ], p["SHA-512/256"] = [
                [573645204, 4230739756],
                [2673172387, 3360449730],
                [596883563, 1867755857],
                [2520282905, 1497426621],
                [2519219938, 2827943907],
                [3193839141, 1401305490],
                [721525244, 746961066],
                [246885852, 2177182882]
            ], p["SHA-512/224"] = [
                [2352822216, 424955298],
                [1944164710, 2312950998],
                [502970286, 855612546],
                [1738396948, 1479516111],
                [258812777, 2077511080],
                [2011393907, 79989058],
                [1067287976, 1780299464],
                [286451373, 2446758561]
            ], u = !0
        }

        function n(e, t, r) {
            for (var a, n, i, s, o, c, u, p, f, h, d, y, g, v, m, C, E, S, T, I, b, A, B, N, k, w, R, _, L, U, D, P, V, O, K, x = r.length(); x >= 128;) {
                for (L = 0; L < 16; ++L) t[L][0] = r.getInt32() >>> 0, t[L][1] = r.getInt32() >>> 0;
                for (; L < 80; ++L) P = t[L - 2], U = P[0], D = P[1], a = ((U >>> 19 | D << 13) ^ (D >>> 29 | U << 3) ^ U >>> 6) >>> 0, n = ((U << 13 | D >>> 19) ^ (D << 3 | U >>> 29) ^ (U << 26 | D >>> 6)) >>> 0, O = t[L - 15], U = O[0], D = O[1], i = ((U >>> 1 | D << 31) ^ (U >>> 8 | D << 24) ^ U >>> 7) >>> 0, s = ((U << 31 | D >>> 1) ^ (U << 24 | D >>> 8) ^ (U << 25 | D >>> 7)) >>> 0, V = t[L - 7], K = t[L - 16], D = n + V[1] + s + K[1], t[L][0] = a + V[0] + i + K[0] + (D / 4294967296 >>> 0) >>> 0, t[L][1] = D >>> 0;
                for (g = e[0][0], v = e[0][1], m = e[1][0], C = e[1][1], E = e[2][0], S = e[2][1], T = e[3][0], I = e[3][1], b = e[4][0], A = e[4][1], B = e[5][0], N = e[5][1], k = e[6][0], w = e[6][1], R = e[7][0], _ = e[7][1], L = 0; L < 80; ++L) u = ((b >>> 14 | A << 18) ^ (b >>> 18 | A << 14) ^ (A >>> 9 | b << 23)) >>> 0, p = ((b << 18 | A >>> 14) ^ (b << 14 | A >>> 18) ^ (A << 23 | b >>> 9)) >>> 0, f = (k ^ b & (B ^ k)) >>> 0, h = (w ^ A & (N ^ w)) >>> 0, o = ((g >>> 28 | v << 4) ^ (v >>> 2 | g << 30) ^ (v >>> 7 | g << 25)) >>> 0, c = ((g << 4 | v >>> 28) ^ (v << 30 | g >>> 2) ^ (v << 25 | g >>> 7)) >>> 0, d = (g & m | E & (g ^ m)) >>> 0, y = (v & C | S & (v ^ C)) >>> 0, D = _ + p + h + l[L][1] + t[L][1], a = R + u + f + l[L][0] + t[L][0] + (D / 4294967296 >>> 0) >>> 0, n = D >>> 0, D = c + y, i = o + d + (D / 4294967296 >>> 0) >>> 0, s = D >>> 0, R = k, _ = w, k = B, w = N, B = b, N = A, D = I + n, b = T + a + (D / 4294967296 >>> 0) >>> 0, A = D >>> 0, T = E, I = S, E = m, S = C, m = g, C = v, D = n + s, g = a + i + (D / 4294967296 >>> 0) >>> 0, v = D >>> 0;
                D = e[0][1] + v, e[0][0] = e[0][0] + g + (D / 4294967296 >>> 0) >>> 0, e[0][1] = D >>> 0, D = e[1][1] + C, e[1][0] = e[1][0] + m + (D / 4294967296 >>> 0) >>> 0, e[1][1] = D >>> 0, D = e[2][1] + S, e[2][0] = e[2][0] + E + (D / 4294967296 >>> 0) >>> 0, e[2][1] = D >>> 0, D = e[3][1] + I, e[3][0] = e[3][0] + T + (D / 4294967296 >>> 0) >>> 0, e[3][1] = D >>> 0, D = e[4][1] + A, e[4][0] = e[4][0] + b + (D / 4294967296 >>> 0) >>> 0, e[4][1] = D >>> 0, D = e[5][1] + N, e[5][0] = e[5][0] + B + (D / 4294967296 >>> 0) >>> 0, e[5][1] = D >>> 0, D = e[6][1] + w, e[6][0] = e[6][0] + k + (D / 4294967296 >>> 0) >>> 0, e[6][1] = D >>> 0, D = e[7][1] + _, e[7][0] = e[7][0] + R + (D / 4294967296 >>> 0) >>> 0, e[7][1] = D >>> 0, x -= 128
            }
        }
        var i = r(0);
        r(4), r(1);
        var s = e.exports = i.sha512 = i.sha512 || {};
        i.md.sha512 = i.md.algorithms.sha512 = s;
        var o = i.sha384 = i.sha512.sha384 = i.sha512.sha384 || {};
        o.create = function() {
            return s.create("SHA-384")
        }, i.md.sha384 = i.md.algorithms.sha384 = o, i.sha512.sha256 = i.sha512.sha256 || {
            create: function() {
                return s.create("SHA-512/256")
            }
        }, i.md["sha512/256"] = i.md.algorithms["sha512/256"] = i.sha512.sha256, i.sha512.sha224 = i.sha512.sha224 || {
            create: function() {
                return s.create("SHA-512/224")
            }
        }, i.md["sha512/224"] = i.md.algorithms["sha512/224"] = i.sha512.sha224, s.create = function(e) {
            if (u || a(), void 0 === e && (e = "SHA-512"), !(e in p)) throw new Error("Invalid SHA-512 algorithm: " + e);
            for (var t = p[e], r = null, s = i.util.createBuffer(), o = new Array(80), l = 0; l < 80; ++l) o[l] = new Array(2);
            var f = 64;
            switch (e) {
                case "SHA-384":
                    f = 48;
                    break;
                case "SHA-512/256":
                    f = 32;
                    break;
                case "SHA-512/224":
                    f = 28
            }
            var h = {
                algorithm: e.replace("-", "").toLowerCase(),
                blockLength: 128,
                digestLength: f,
                messageLength: 0,
                fullMessageLength: null,
                messageLengthSize: 16
            };
            return h.start = function() {
                h.messageLength = 0, h.fullMessageLength = h.messageLength128 = [];
                for (var e = h.messageLengthSize / 4, a = 0; a < e; ++a) h.fullMessageLength.push(0);
                s = i.util.createBuffer(), r = new Array(t.length);
                for (var a = 0; a < t.length; ++a) r[a] = t[a].slice(0);
                return h
            }, h.start(), h.update = function(e, t) {
                "utf8" === t && (e = i.util.encodeUtf8(e));
                var a = e.length;
                h.messageLength += a, a = [a / 4294967296 >>> 0, a >>> 0];
                for (var c = h.fullMessageLength.length - 1; c >= 0; --c) h.fullMessageLength[c] += a[1], a[1] = a[0] + (h.fullMessageLength[c] / 4294967296 >>> 0), h.fullMessageLength[c] = h.fullMessageLength[c] >>> 0, a[0] = a[1] / 4294967296 >>> 0;
                return s.putBytes(e), n(r, o, s), (s.read > 2048 || 0 === s.length()) && s.compact(), h
            }, h.digest = function() {
                var t = i.util.createBuffer();
                t.putBytes(s.bytes());
                var a = h.fullMessageLength[h.fullMessageLength.length - 1] + h.messageLengthSize,
                    u = a & h.blockLength - 1;
                t.putBytes(c.substr(0, h.blockLength - u));
                for (var l, p, f = 8 * h.fullMessageLength[0], d = 0; d < h.fullMessageLength.length - 1; ++d) l = 8 * h.fullMessageLength[d + 1], p = l / 4294967296 >>> 0, f += p, t.putInt32(f >>> 0), f = l >>> 0;
                t.putInt32(f);
                for (var y = new Array(r.length), d = 0; d < r.length; ++d) y[d] = r[d].slice(0);
                n(y, o, t);
                var g, v = i.util.createBuffer();
                g = "SHA-512" === e ? y.length : "SHA-384" === e ? y.length - 2 : y.length - 4;
                for (var d = 0; d < g; ++d) v.putInt32(y[d][0]), d === g - 1 && "SHA-512/224" === e || v.putInt32(y[d][1]);
                return v
            }, h
        };
        var c = null,
            u = !1,
            l = null,
            p = null
    }, function(e, t, r) {
        var a = r(0);
        r(1), e.exports = a.log = a.log || {}, a.log.levels = ["none", "error", "warning", "info", "debug", "verbose", "max"];
        var n = {},
            i = [],
            s = null;
        a.log.LEVEL_LOCKED = 2, a.log.NO_LEVEL_CHECK = 4, a.log.INTERPOLATE = 8;
        for (var o = 0; o < a.log.levels.length; ++o) {
            var c = a.log.levels[o];
            n[c] = {
                index: o,
                name: c.toUpperCase()
            }
        }
        a.log.logMessage = function(e) {
            for (var t = n[e.level].index, r = 0; r < i.length; ++r) {
                var s = i[r];
                if (s.flags & a.log.NO_LEVEL_CHECK) s.f(e);
                else {
                    t <= n[s.level].index && s.f(s, e)
                }
            }
        }, a.log.prepareStandard = function(e) {
            "standard" in e || (e.standard = n[e.level].name + " [" + e.category + "] " + e.message)
        }, a.log.prepareFull = function(e) {
            if (!("full" in e)) {
                var t = [e.message];
                t = t.concat([] || e.arguments), e.full = a.util.format.apply(this, t)
            }
        }, a.log.prepareStandardFull = function(e) {
            "standardFull" in e || (a.log.prepareStandard(e), e.standardFull = e.standard)
        };
        for (var u = ["error", "warning", "info", "debug", "verbose"], o = 0; o < u.length; ++o) ! function(e) {
            a.log[e] = function(t, r) {
                var n = Array.prototype.slice.call(arguments).slice(2),
                    i = {
                        timestamp: new Date,
                        level: e,
                        category: t,
                        message: r,
                        arguments: n
                    };
                a.log.logMessage(i)
            }
        }(u[o]);
        if (a.log.makeLogger = function(e) {
                var t = {
                    flags: 0,
                    f: e
                };
                return a.log.setLevel(t, "none"), t
            }, a.log.setLevel = function(e, t) {
                var r = !1;
                if (e && !(e.flags & a.log.LEVEL_LOCKED))
                    for (var n = 0; n < a.log.levels.length; ++n) {
                        var i = a.log.levels[n];
                        if (t == i) {
                            e.level = t, r = !0;
                            break
                        }
                    }
                return r
            }, a.log.lock = function(e, t) {
                void 0 === t || t ? e.flags |= a.log.LEVEL_LOCKED : e.flags &= ~a.log.LEVEL_LOCKED
            }, a.log.addLogger = function(e) {
                i.push(e)
            }, "undefined" != typeof console && "log" in console) {
            var l;
            if (console.error && console.warn && console.info && console.debug) {
                var p = {
                        error: console.error,
                        warning: console.warn,
                        info: console.info,
                        debug: console.debug,
                        verbose: console.debug
                    },
                    f = function(e, t) {
                        a.log.prepareStandard(t);
                        var r = p[t.level],
                            n = [t.standard];
                        n = n.concat(t.arguments.slice()), r.apply(console, n)
                    };
                l = a.log.makeLogger(f)
            } else {
                var f = function(e, t) {
                    a.log.prepareStandardFull(t), console.log(t.standardFull)
                };
                l = a.log.makeLogger(f)
            }
            a.log.setLevel(l, "debug"), a.log.addLogger(l), s = l
        } else console = {
            log: function() {}
        };
        if (null !== s) {
            var h = a.util.getQueryVariables();
            if ("console.level" in h && a.log.setLevel(s, h["console.level"].slice(-1)[0]), "console.lock" in h) {
                "true" == h["console.lock"].slice(-1)[0] && a.log.lock(s)
            }
        }
        a.log.consoleLogger = s
    }, function(e, t, r) {
        e.exports = r(35)
    }, function(e, t, r) {
        e.exports = r(0), r(5), r(38), r(3), r(13), r(31), r(10), r(40), r(8), r(41), r(33), r(42), r(30), r(15), r(7), r(26), r(28), r(43), r(21), r(27), r(24), r(18), r(2), r(25), r(44), r(45), r(20), r(1)
    }, function(e, t) {
        var r;
        r = function() {
            return this
        }();
        try {
            r = r || Function("return this")() || (0, eval)("this")
        } catch (e) {
            "object" == typeof window && (r = window)
        }
        e.exports = r
    }, function(e, t) {
        function r(e, t) {
            var r = 0,
                a = t.length,
                n = t.charAt(0),
                i = [0];
            for (r = 0; r < e.length(); ++r) {
                for (var s = 0, o = e.at(r); s < i.length; ++s) o += i[s] << 8, i[s] = o % a, o = o / a | 0;
                for (; o > 0;) i.push(o % a), o = o / a | 0
            }
            var c = "";
            for (r = 0; 0 === e.at(r) && r < e.length() - 1; ++r) c += n;
            for (r = i.length - 1; r >= 0; --r) c += t[i[r]];
            return c
        }
        var a = {};
        e.exports = a;
        var n = {};
        a.encode = function(e, t, a) {
            if ("string" != typeof t) throw new TypeError('"alphabet" must be a string.');
            if (void 0 !== a && "number" != typeof a) throw new TypeError('"maxline" must be a number.');
            var n = "";
            if (e instanceof Uint8Array) {
                var i = 0,
                    s = t.length,
                    o = t.charAt(0),
                    c = [0];
                for (i = 0; i < e.length; ++i) {
                    for (var u = 0, l = e[i]; u < c.length; ++u) l += c[u] << 8, c[u] = l % s, l = l / s | 0;
                    for (; l > 0;) c.push(l % s), l = l / s | 0
                }
                for (i = 0; 0 === e[i] && i < e.length - 1; ++i) n += o;
                for (i = c.length - 1; i >= 0; --i) n += t[c[i]]
            } else n = r(e, t);
            if (a) {
                var p = new RegExp(".{1," + a + "}", "g");
                n = n.match(p).join("\r\n")
            }
            return n
        }, a.decode = function(e, t) {
            if ("string" != typeof e) throw new TypeError('"input" must be a string.');
            if ("string" != typeof t) throw new TypeError('"alphabet" must be a string.');
            var r = n[t];
            if (!r) {
                r = n[t] = [];
                for (var a = 0; a < t.length; ++a) r[t.charCodeAt(a)] = a
            }
            e = e.replace(/\s/g, "");
            for (var i = t.length, s = t.charAt(0), o = [0], a = 0; a < e.length; a++) {
                var c = r[e.charCodeAt(a)];
                if (void 0 === c) return;
                for (var u = 0, l = c; u < o.length; ++u) l += o[u] * i, o[u] = 255 & l, l >>= 8;
                for (; l > 0;) o.push(255 & l), l >>= 8
            }
            for (var p = 0; e[p] === s && p < e.length - 1; ++p) o.push(0);
            return "undefined" != typeof Buffer ? Buffer.from(o.reverse()) : new Uint8Array(o.reverse())
        }
    }, function(e, t, r) {
        function a(e, t, r) {
            var a = t.entity === u.tls.ConnectionEnd.client;
            e.read.cipherState = {
                init: !1,
                cipher: u.cipher.createDecipher("AES-CBC", a ? r.keys.server_write_key : r.keys.client_write_key),
                iv: a ? r.keys.server_write_IV : r.keys.client_write_IV
            }, e.write.cipherState = {
                init: !1,
                cipher: u.cipher.createCipher("AES-CBC", a ? r.keys.client_write_key : r.keys.server_write_key),
                iv: a ? r.keys.client_write_IV : r.keys.server_write_IV
            }, e.read.cipherFunction = o, e.write.cipherFunction = n, e.read.macLength = e.write.macLength = r.mac_length, e.read.macFunction = e.write.macFunction = l.hmac_sha1
        }

        function n(e, t) {
            var r = !1,
                a = t.macFunction(t.macKey, t.sequenceNumber, e);
            e.fragment.putBytes(a), t.updateSequenceNumber();
            var n;
            n = e.version.minor === l.Versions.TLS_1_0.minor ? t.cipherState.init ? null : t.cipherState.iv : u.random.getBytesSync(16), t.cipherState.init = !0;
            var s = t.cipherState.cipher;
            return s.start({
                iv: n
            }), e.version.minor >= l.Versions.TLS_1_1.minor && s.output.putBytes(n), s.update(e.fragment), s.finish(i) && (e.fragment = s.output, e.length = e.fragment.length(), r = !0), r
        }

        function i(e, t, r) {
            if (!r) {
                var a = e - t.length() % e;
                t.fillWithByte(a - 1, a)
            }
            return !0
        }

        function s(e, t, r) {
            var a = !0;
            if (r) {
                for (var n = t.length(), i = t.last(), s = n - 1 - i; s < n - 1; ++s) a = a && t.at(s) == i;
                a && t.truncate(i + 1)
            }
            return a
        }

        function o(e, t) {
            var r, a = !1;
            r = e.version.minor === l.Versions.TLS_1_0.minor ? t.cipherState.init ? null : t.cipherState.iv : e.fragment.getBytes(16), t.cipherState.init = !0;
            var n = t.cipherState.cipher;
            n.start({
                iv: r
            }), n.update(e.fragment), a = n.finish(s);
            var i = t.macLength,
                o = u.random.getBytesSync(i),
                p = n.output.length();
            p >= i ? (e.fragment = n.output.getBytes(p - i), o = n.output.getBytes(i)) : e.fragment = n.output.getBytes(), e.fragment = u.util.createBuffer(e.fragment), e.length = e.fragment.length();
            var f = t.macFunction(t.macKey, t.sequenceNumber, e);
            return t.updateSequenceNumber(), a = c(t.macKey, o, f) && a
        }

        function c(e, t, r) {
            var a = u.hmac.create();
            return a.start("SHA1", e), a.update(t), t = a.digest().getBytes(), a.start(null, null), a.update(r), r = a.digest().getBytes(), t === r
        }
        var u = r(0);
        r(5), r(20);
        var l = e.exports = u.tls;
        l.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA = {
            id: [0, 47],
            name: "TLS_RSA_WITH_AES_128_CBC_SHA",
            initSecurityParameters: function(e) {
                e.bulk_cipher_algorithm = l.BulkCipherAlgorithm.aes, e.cipher_type = l.CipherType.block, e.enc_key_length = 16, e.block_length = 16, e.fixed_iv_length = 16, e.record_iv_length = 16, e.mac_algorithm = l.MACAlgorithm.hmac_sha1, e.mac_length = 20, e.mac_key_length = 20
            },
            initConnectionState: a
        }, l.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA = {
            id: [0, 53],
            name: "TLS_RSA_WITH_AES_256_CBC_SHA",
            initSecurityParameters: function(e) {
                e.bulk_cipher_algorithm = l.BulkCipherAlgorithm.aes, e.cipher_type = l.CipherType.block, e.enc_key_length = 32, e.block_length = 16, e.fixed_iv_length = 16, e.record_iv_length = 16, e.mac_algorithm = l.MACAlgorithm.hmac_sha1, e.mac_length = 20, e.mac_key_length = 20
            },
            initConnectionState: a
        }
    }, function(e, t, r) {
        var a = r(0);
        r(30), e.exports = a.mgf = a.mgf || {}, a.mgf.mgf1 = a.mgf1
    }, function(e, t, r) {
        function a(e) {
            var t = e.message;
            if (t instanceof Uint8Array) return t;
            var r = e.encoding;
            if (void 0 === t) {
                if (!e.md) throw new TypeError('"options.message" or "options.md" not specified.');
                t = e.md.digest().getBytes(), r = "binary"
            }
            if ("string" == typeof t && !r) throw new TypeError('"options.encoding" must be "binary" or "utf8".');
            if ("string" == typeof t) {
                if ("undefined" != typeof Buffer) return new Buffer(t, r);
                t = new D(t, r)
            } else if (!(t instanceof D)) throw new TypeError('"options.message" must be a node.js Buffer, a Uint8Array, a forge ByteBuffer, or a string with "options.encoding" specifying its encoding.');
            for (var a = new P(t.length()), n = 0; n < a.length; ++n) a[n] = t.at(n);
            return a
        }

        function n(e, t) {
            var r = L.md.sha512.create(),
                a = new D(e);
            r.update(a.getBytes(t), "binary");
            var n = r.digest().getBytes();
            if ("undefined" != typeof Buffer) return new Buffer(n, "binary");
            for (var i = new P(V.constants.HASH_BYTE_LENGTH), s = 0; s < 64; ++s) i[s] = n.charCodeAt(s);
            return i
        }

        function i(e, t) {
            var r, a = [N(), N(), N(), N()],
                i = n(t, 32);
            for (i[0] &= 248, i[31] &= 127, i[31] |= 64, T(a, i), f(e, a), r = 0; r < 32; ++r) t[r + 32] = e[r];
            return 0
        }

        function s(e, t, r, a) {
            var i, s, o = new Float64Array(64),
                l = [N(), N(), N(), N()],
                p = n(a, 32);
            p[0] &= 248, p[31] &= 127, p[31] |= 64;
            var h = r + 64;
            for (i = 0; i < r; ++i) e[64 + i] = t[i];
            for (i = 0; i < 32; ++i) e[32 + i] = p[32 + i];
            var d = n(e.subarray(32), r + 32);
            for (u(d), T(l, d), f(e, l), i = 32; i < 64; ++i) e[i] = a[i];
            var y = n(e, r + 64);
            for (u(y), i = 32; i < 64; ++i) o[i] = 0;
            for (i = 0; i < 32; ++i) o[i] = d[i];
            for (i = 0; i < 32; ++i)
                for (s = 0; s < 32; s++) o[i + s] += y[i] * p[s];
            return c(e.subarray(32), o), h
        }

        function o(e, t, r, a) {
            var i, s = new P(32),
                o = [N(), N(), N(), N()],
                c = [N(), N(), N(), N()];
            if (-1, r < 64) return -1;
            if (d(c, a)) return -1;
            for (i = 0; i < r; ++i) e[i] = t[i];
            for (i = 0; i < 32; ++i) e[i + 32] = a[i];
            var p = n(e, r);
            if (u(p), S(o, c, p), T(c, t.subarray(32)), l(o, c), f(s, o), r -= 64, m(t, 0, s, 0)) {
                for (i = 0; i < r; ++i) e[i] = 0;
                return -1
            }
            for (i = 0; i < r; ++i) e[i] = t[i + 64];
            return r
        }

        function c(e, t) {
            var r, a, n, i;
            for (a = 63; a >= 32; --a) {
                for (r = 0, n = a - 32, i = a - 12; n < i; ++n) t[n] += r - 16 * t[a] * j[n - (a - 32)], r = t[n] + 128 >> 8, t[n] -= 256 * r;
                t[n] += r, t[a] = 0
            }
            for (r = 0, n = 0; n < 32; ++n) t[n] += r - (t[31] >> 4) * j[n], r = t[n] >> 8, t[n] &= 255;
            for (n = 0; n < 32; ++n) t[n] -= r * j[n];
            for (a = 0; a < 32; ++a) t[a + 1] += t[a] >> 8, e[a] = 255 & t[a]
        }

        function u(e) {
            for (var t = new Float64Array(64), r = 0; r < 64; ++r) t[r] = e[r], e[r] = 0;
            c(e, t)
        }

        function l(e, t) {
            var r = N(),
                a = N(),
                n = N(),
                i = N(),
                s = N(),
                o = N(),
                c = N(),
                u = N(),
                l = N();
            w(r, e[1], e[0]), w(l, t[1], t[0]), _(r, r, l), k(a, e[0], e[1]), k(l, t[0], t[1]), _(a, a, l), _(n, e[3], t[3]), _(n, n, M), _(i, e[2], t[2]), k(i, i, i), w(s, a, r), w(o, i, n), k(c, i, n), k(u, a, r), _(e[0], s, o), _(e[1], u, c), _(e[2], c, o), _(e[3], s, u)
        }

        function p(e, t, r) {
            for (var a = 0; a < 4; ++a) B(e[a], t[a], r)
        }

        function f(e, t) {
            var r = N(),
                a = N(),
                n = N();
            b(n, t[2]), _(r, t[0], n), _(a, t[1], n), h(e, a), e[31] ^= E(r) << 7
        }

        function h(e, t) {
            var r, a, n, i = N(),
                s = N();
            for (r = 0; r < 16; ++r) s[r] = t[r];
            for (A(s), A(s), A(s), a = 0; a < 2; ++a) {
                for (i[0] = s[0] - 65517, r = 1; r < 15; ++r) i[r] = s[r] - 65535 - (i[r - 1] >> 16 & 1), i[r - 1] &= 65535;
                i[15] = s[15] - 32767 - (i[14] >> 16 & 1), n = i[15] >> 16 & 1, i[14] &= 65535, B(s, i, 1 - n)
            }
            for (r = 0; r < 16; r++) e[2 * r] = 255 & s[r], e[2 * r + 1] = s[r] >> 8
        }

        function d(e, t) {
            var r = N(),
                a = N(),
                n = N(),
                i = N(),
                s = N(),
                o = N(),
                c = N();
            return I(e[2], K), y(e[1], t), R(n, e[1]), _(i, n, x), w(n, n, e[2]), k(i, e[2], i), R(s, i), R(o, s), _(c, o, s), _(r, c, n), _(r, r, i), g(r, r), _(r, r, n), _(r, r, i), _(r, r, i), _(e[0], r, i), R(a, e[0]), _(a, a, i), v(a, n) && _(e[0], e[0], G), R(a, e[0]), _(a, a, i), v(a, n) ? -1 : (E(e[0]) === t[31] >> 7 && w(e[0], O, e[0]), _(e[3], e[0], e[1]), 0)
        }

        function y(e, t) {
            var r;
            for (r = 0; r < 16; ++r) e[r] = t[2 * r] + (t[2 * r + 1] << 8);
            e[15] &= 32767
        }

        function g(e, t) {
            var r, a = N();
            for (r = 0; r < 16; ++r) a[r] = t[r];
            for (r = 250; r >= 0; --r) R(a, a), 1 !== r && _(a, a, t);
            for (r = 0; r < 16; ++r) e[r] = a[r]
        }

        function v(e, t) {
            var r = new P(32),
                a = new P(32);
            return h(r, e), h(a, t), m(r, 0, a, 0)
        }

        function m(e, t, r, a) {
            return C(e, t, r, a, 32)
        }

        function C(e, t, r, a, n) {
            var i, s = 0;
            for (i = 0; i < n; ++i) s |= e[t + i] ^ r[a + i];
            return (1 & s - 1 >>> 8) - 1
        }

        function E(e) {
            var t = new P(32);
            return h(t, e), 1 & t[0]
        }

        function S(e, t, r) {
            var a, n;
            for (I(e[0], O), I(e[1], K), I(e[2], K), I(e[3], O), n = 255; n >= 0; --n) a = r[n / 8 | 0] >> (7 & n) & 1, p(e, t, a), l(t, e), l(e, e), p(e, t, a)
        }

        function T(e, t) {
            var r = [N(), N(), N(), N()];
            I(r[0], F), I(r[1], q), I(r[2], K), _(r[3], F, q), S(e, r, t)
        }

        function I(e, t) {
            var r;
            for (r = 0; r < 16; r++) e[r] = 0 | t[r]
        }

        function b(e, t) {
            var r, a = N();
            for (r = 0; r < 16; ++r) a[r] = t[r];
            for (r = 253; r >= 0; --r) R(a, a), 2 !== r && 4 !== r && _(a, a, t);
            for (r = 0; r < 16; ++r) e[r] = a[r]
        }

        function A(e) {
            var t, r, a = 1;
            for (t = 0; t < 16; ++t) r = e[t] + a + 65535, a = Math.floor(r / 65536), e[t] = r - 65536 * a;
            e[0] += a - 1 + 37 * (a - 1)
        }

        function B(e, t, r) {
            for (var a, n = ~(r - 1), i = 0; i < 16; ++i) a = n & (e[i] ^ t[i]), e[i] ^= a, t[i] ^= a
        }

        function N(e) {
            var t, r = new Float64Array(16);
            if (e)
                for (t = 0; t < e.length; ++t) r[t] = e[t];
            return r
        }

        function k(e, t, r) {
            for (var a = 0; a < 16; ++a) e[a] = t[a] + r[a]
        }

        function w(e, t, r) {
            for (var a = 0; a < 16; ++a) e[a] = t[a] - r[a]
        }

        function R(e, t) {
            _(e, t, t)
        }

        function _(e, t, r) {
            var a, n, i = 0,
                s = 0,
                o = 0,
                c = 0,
                u = 0,
                l = 0,
                p = 0,
                f = 0,
                h = 0,
                d = 0,
                y = 0,
                g = 0,
                v = 0,
                m = 0,
                C = 0,
                E = 0,
                S = 0,
                T = 0,
                I = 0,
                b = 0,
                A = 0,
                B = 0,
                N = 0,
                k = 0,
                w = 0,
                R = 0,
                _ = 0,
                L = 0,
                U = 0,
                D = 0,
                P = 0,
                V = r[0],
                O = r[1],
                K = r[2],
                x = r[3],
                M = r[4],
                F = r[5],
                q = r[6],
                j = r[7],
                G = r[8],
                H = r[9],
                Q = r[10],
                z = r[11],
                W = r[12],
                Y = r[13],
                X = r[14],
                Z = r[15];
            a = t[0], i += a * V, s += a * O, o += a * K, c += a * x, u += a * M, l += a * F, p += a * q, f += a * j, h += a * G, d += a * H, y += a * Q, g += a * z, v += a * W, m += a * Y, C += a * X, E += a * Z, a = t[1], s += a * V, o += a * O, c += a * K, u += a * x, l += a * M, p += a * F, f += a * q, h += a * j, d += a * G, y += a * H, g += a * Q, v += a * z, m += a * W, C += a * Y, E += a * X, S += a * Z, a = t[2], o += a * V, c += a * O, u += a * K, l += a * x, p += a * M, f += a * F, h += a * q, d += a * j, y += a * G, g += a * H, v += a * Q, m += a * z, C += a * W, E += a * Y, S += a * X, T += a * Z, a = t[3], c += a * V, u += a * O, l += a * K, p += a * x, f += a * M, h += a * F, d += a * q, y += a * j, g += a * G, v += a * H, m += a * Q, C += a * z, E += a * W, S += a * Y, T += a * X, I += a * Z, a = t[4], u += a * V, l += a * O, p += a * K, f += a * x, h += a * M, d += a * F, y += a * q, g += a * j, v += a * G, m += a * H, C += a * Q, E += a * z, S += a * W, T += a * Y, I += a * X, b += a * Z, a = t[5], l += a * V, p += a * O, f += a * K, h += a * x, d += a * M, y += a * F, g += a * q, v += a * j, m += a * G, C += a * H, E += a * Q, S += a * z, T += a * W, I += a * Y, b += a * X, A += a * Z, a = t[6], p += a * V, f += a * O, h += a * K, d += a * x, y += a * M, g += a * F, v += a * q, m += a * j, C += a * G, E += a * H, S += a * Q, T += a * z, I += a * W, b += a * Y, A += a * X, B += a * Z, a = t[7], f += a * V, h += a * O, d += a * K, y += a * x, g += a * M, v += a * F, m += a * q, C += a * j, E += a * G, S += a * H, T += a * Q, I += a * z, b += a * W, A += a * Y, B += a * X, N += a * Z, a = t[8], h += a * V, d += a * O, y += a * K, g += a * x, v += a * M, m += a * F, C += a * q, E += a * j, S += a * G, T += a * H, I += a * Q, b += a * z, A += a * W, B += a * Y, N += a * X, k += a * Z, a = t[9], d += a * V, y += a * O, g += a * K, v += a * x, m += a * M, C += a * F, E += a * q, S += a * j, T += a * G, I += a * H, b += a * Q, A += a * z, B += a * W, N += a * Y, k += a * X, w += a * Z, a = t[10], y += a * V, g += a * O, v += a * K, m += a * x, C += a * M, E += a * F, S += a * q, T += a * j, I += a * G, b += a * H, A += a * Q, B += a * z, N += a * W, k += a * Y, w += a * X, R += a * Z, a = t[11], g += a * V, v += a * O, m += a * K, C += a * x, E += a * M, S += a * F, T += a * q, I += a * j, b += a * G, A += a * H, B += a * Q, N += a * z;
            k += a * W, w += a * Y, R += a * X, _ += a * Z, a = t[12], v += a * V, m += a * O, C += a * K, E += a * x, S += a * M, T += a * F, I += a * q, b += a * j, A += a * G, B += a * H, N += a * Q, k += a * z, w += a * W, R += a * Y, _ += a * X, L += a * Z, a = t[13], m += a * V, C += a * O, E += a * K, S += a * x, T += a * M, I += a * F, b += a * q, A += a * j, B += a * G, N += a * H, k += a * Q, w += a * z, R += a * W, _ += a * Y, L += a * X, U += a * Z, a = t[14], C += a * V, E += a * O, S += a * K, T += a * x, I += a * M, b += a * F, A += a * q, B += a * j, N += a * G, k += a * H, w += a * Q, R += a * z, _ += a * W, L += a * Y, U += a * X, D += a * Z, a = t[15], E += a * V, S += a * O, T += a * K, I += a * x, b += a * M, A += a * F, B += a * q, N += a * j, k += a * G, w += a * H, R += a * Q, _ += a * z, L += a * W, U += a * Y, D += a * X, P += a * Z, i += 38 * S, s += 38 * T, o += 38 * I, c += 38 * b, u += 38 * A, l += 38 * B, p += 38 * N, f += 38 * k, h += 38 * w, d += 38 * R, y += 38 * _, g += 38 * L, v += 38 * U, m += 38 * D, C += 38 * P, n = 1, a = i + n + 65535, n = Math.floor(a / 65536), i = a - 65536 * n, a = s + n + 65535, n = Math.floor(a / 65536), s = a - 65536 * n, a = o + n + 65535, n = Math.floor(a / 65536), o = a - 65536 * n, a = c + n + 65535, n = Math.floor(a / 65536), c = a - 65536 * n, a = u + n + 65535, n = Math.floor(a / 65536), u = a - 65536 * n, a = l + n + 65535, n = Math.floor(a / 65536), l = a - 65536 * n, a = p + n + 65535, n = Math.floor(a / 65536), p = a - 65536 * n, a = f + n + 65535, n = Math.floor(a / 65536), f = a - 65536 * n, a = h + n + 65535, n = Math.floor(a / 65536), h = a - 65536 * n, a = d + n + 65535, n = Math.floor(a / 65536), d = a - 65536 * n, a = y + n + 65535, n = Math.floor(a / 65536), y = a - 65536 * n, a = g + n + 65535, n = Math.floor(a / 65536), g = a - 65536 * n, a = v + n + 65535, n = Math.floor(a / 65536), v = a - 65536 * n, a = m + n + 65535, n = Math.floor(a / 65536), m = a - 65536 * n, a = C + n + 65535, n = Math.floor(a / 65536), C = a - 65536 * n, a = E + n + 65535, n = Math.floor(a / 65536), E = a - 65536 * n, i += n - 1 + 37 * (n - 1), n = 1, a = i + n + 65535, n = Math.floor(a / 65536), i = a - 65536 * n, a = s + n + 65535, n = Math.floor(a / 65536), s = a - 65536 * n, a = o + n + 65535, n = Math.floor(a / 65536), o = a - 65536 * n, a = c + n + 65535, n = Math.floor(a / 65536), c = a - 65536 * n, a = u + n + 65535, n = Math.floor(a / 65536), u = a - 65536 * n, a = l + n + 65535, n = Math.floor(a / 65536), l = a - 65536 * n, a = p + n + 65535, n = Math.floor(a / 65536), p = a - 65536 * n, a = f + n + 65535, n = Math.floor(a / 65536), f = a - 65536 * n, a = h + n + 65535, n = Math.floor(a / 65536), h = a - 65536 * n, a = d + n + 65535, n = Math.floor(a / 65536), d = a - 65536 * n, a = y + n + 65535, n = Math.floor(a / 65536), y = a - 65536 * n, a = g + n + 65535, n = Math.floor(a / 65536), g = a - 65536 * n, a = v + n + 65535, n = Math.floor(a / 65536), v = a - 65536 * n, a = m + n + 65535, n = Math.floor(a / 65536), m = a - 65536 * n, a = C + n + 65535, n = Math.floor(a / 65536), C = a - 65536 * n, a = E + n + 65535, n = Math.floor(a / 65536), E = a - 65536 * n, i += n - 1 + 37 * (n - 1), e[0] = i, e[1] = s, e[2] = o, e[3] = c, e[4] = u, e[5] = l, e[6] = p, e[7] = f, e[8] = h, e[9] = d, e[10] = y, e[11] = g, e[12] = v;
            e[13] = m, e[14] = C, e[15] = E
        }
        var L = r(0);
        if (r(12), r(2), r(32), r(1), void 0 === U) var U = L.jsbn.BigInteger;
        var D = L.util.ByteBuffer,
            P = "undefined" == typeof Buffer ? Uint8Array : Buffer;
        L.pki = L.pki || {}, e.exports = L.pki.ed25519 = L.ed25519 = L.ed25519 || {};
        var V = L.ed25519;
        V.constants = {}, V.constants.PUBLIC_KEY_BYTE_LENGTH = 32, V.constants.PRIVATE_KEY_BYTE_LENGTH = 64, V.constants.SEED_BYTE_LENGTH = 32, V.constants.SIGN_BYTE_LENGTH = 64, V.constants.HASH_BYTE_LENGTH = 64, V.generateKeyPair = function(e) {
            e = e || {};
            var t = e.seed;
            if (void 0 === t) t = L.random.getBytesSync(V.constants.SEED_BYTE_LENGTH);
            else if ("string" == typeof t) {
                if (t.length !== V.constants.SEED_BYTE_LENGTH) throw new TypeError('"seed" must be ' + V.constants.SEED_BYTE_LENGTH + " bytes in length.")
            } else if (!(t instanceof Uint8Array)) throw new TypeError('"seed" must be a node.js Buffer, Uint8Array, or a binary string.');
            t = a({
                message: t,
                encoding: "binary"
            });
            for (var r = new P(V.constants.PUBLIC_KEY_BYTE_LENGTH), n = new P(V.constants.PRIVATE_KEY_BYTE_LENGTH), s = 0; s < 32; ++s) n[s] = t[s];
            return i(r, n), {
                publicKey: r,
                privateKey: n
            }
        }, V.publicKeyFromPrivateKey = function(e) {
            e = e || {};
            var t = a({
                message: e.privateKey,
                encoding: "binary"
            });
            if (t.length !== V.constants.PRIVATE_KEY_BYTE_LENGTH) throw new TypeError('"options.privateKey" must have a byte length of ' + V.constants.PRIVATE_KEY_BYTE_LENGTH);
            for (var r = new P(V.constants.PUBLIC_KEY_BYTE_LENGTH), n = 0; n < r.length; ++n) r[n] = t[32 + n];
            return r
        }, V.sign = function(e) {
            e = e || {};
            var t = a(e),
                r = a({
                    message: e.privateKey,
                    encoding: "binary"
                });
            if (r.length !== V.constants.PRIVATE_KEY_BYTE_LENGTH) throw new TypeError('"options.privateKey" must have a byte length of ' + V.constants.PRIVATE_KEY_BYTE_LENGTH);
            var n = new P(V.constants.SIGN_BYTE_LENGTH + t.length);
            s(n, t, t.length, r);
            for (var i = new P(V.constants.SIGN_BYTE_LENGTH), o = 0; o < i.length; ++o) i[o] = n[o];
            return i
        }, V.verify = function(e) {
            e = e || {};
            var t = a(e);
            if (void 0 === e.signature) throw new TypeError('"options.signature" must be a node.js Buffer, a Uint8Array, a forge ByteBuffer, or a binary string.');
            var r = a({
                message: e.signature,
                encoding: "binary"
            });
            if (r.length !== V.constants.SIGN_BYTE_LENGTH) throw new TypeError('"options.signature" must have a byte length of ' + V.constants.SIGN_BYTE_LENGTH);
            var n = a({
                message: e.publicKey,
                encoding: "binary"
            });
            if (n.length !== V.constants.PUBLIC_KEY_BYTE_LENGTH) throw new TypeError('"options.publicKey" must have a byte length of ' + V.constants.PUBLIC_KEY_BYTE_LENGTH);
            var i, s = new P(V.constants.SIGN_BYTE_LENGTH + t.length),
                c = new P(V.constants.SIGN_BYTE_LENGTH + t.length);
            for (i = 0; i < V.constants.SIGN_BYTE_LENGTH; ++i) s[i] = r[i];
            for (i = 0; i < t.length; ++i) s[i + V.constants.SIGN_BYTE_LENGTH] = t[i];
            return o(c, s, s.length, n) >= 0
        };
        var O = N(),
            K = N([1]),
            x = N([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]),
            M = N([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]),
            F = N([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]),
            q = N([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]),
            j = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]),
            G = N([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139])
    }, function(e, t, r) {
        function a(e, t, r, a) {
            e.generate = function(e, i) {
                for (var s = new n.util.ByteBuffer, o = Math.ceil(i / a) + r, c = new n.util.ByteBuffer, u = r; u < o; ++u) {
                    c.putInt32(u), t.start(), t.update(e + c.getBytes());
                    var l = t.digest();
                    s.putBytes(l.getBytes(a))
                }
                return s.truncate(s.length() - i), s.getBytes()
            }
        }
        var n = r(0);
        r(1), r(2), r(12), e.exports = n.kem = n.kem || {};
        var i = n.jsbn.BigInteger;
        n.kem.rsa = {}, n.kem.rsa.create = function(e, t) {
            t = t || {};
            var r = t.prng || n.random,
                a = {};
            return a.encrypt = function(t, a) {
                var s, o = Math.ceil(t.n.bitLength() / 8);
                do {
                    s = new i(n.util.bytesToHex(r.getBytesSync(o)), 16).mod(t.n)
                } while (s.compareTo(i.ONE) <= 0);
                s = n.util.hexToBytes(s.toString(16));
                var c = o - s.length;
                return c > 0 && (s = n.util.fillString(String.fromCharCode(0), c) + s), {
                    encapsulation: t.encrypt(s, "NONE"),
                    key: e.generate(s, a)
                }
            }, a.decrypt = function(t, r, a) {
                var n = t.decrypt(r, "NONE");
                return e.generate(n, a)
            }, a
        }, n.kem.kdf1 = function(e, t) {
            a(this, e, 0, t || e.digestLength)
        }, n.kem.kdf2 = function(e, t) {
            a(this, e, 1, t || e.digestLength)
        }
    }, function(e, t, r) {
        e.exports = r(4), r(14), r(9), r(23), r(32)
    }, function(e, t, r) {
        function a(e) {
            var t = {},
                r = [];
            if (!d.validate(e, y.asn1.recipientInfoValidator, t, r)) {
                var a = new Error("Cannot read PKCS#7 RecipientInfo. ASN.1 object is not an PKCS#7 RecipientInfo.");
                throw a.errors = r, a
            }
            return {
                version: t.version.charCodeAt(0),
                issuer: h.pki.RDNAttributesAsArray(t.issuer),
                serialNumber: h.util.createBuffer(t.serial).toHex(),
                encryptedContent: {
                    algorithm: d.derToOid(t.encAlgorithm),
                    parameter: t.encParameter.value,
                    content: t.encKey
                }
            }
        }

        function n(e) {
            return d.create(d.Class.UNIVERSAL, d.Type.SEQUENCE, !0, [d.create(d.Class.UNIVERSAL, d.Type.INTEGER, !1, d.integerToDer(e.version).getBytes()), d.create(d.Class.UNIVERSAL, d.Type.SEQUENCE, !0, [h.pki.distinguishedNameToAsn1({
                attributes: e.issuer
            }), d.create(d.Class.UNIVERSAL, d.Type.INTEGER, !1, h.util.hexToBytes(e.serialNumber))]), d.create(d.Class.UNIVERSAL, d.Type.SEQUENCE, !0, [d.create(d.Class.UNIVERSAL, d.Type.OID, !1, d.oidToDer(e.encryptedContent.algorithm).getBytes()), d.create(d.Class.UNIVERSAL, d.Type.NULL, !1, "")]), d.create(d.Class.UNIVERSAL, d.Type.OCTETSTRING, !1, e.encryptedContent.content)])
        }

        function i(e) {
            for (var t = [], r = 0; r < e.length; ++r) t.push(a(e[r]));
            return t
        }

        function s(e) {
            for (var t = [], r = 0; r < e.length; ++r) t.push(n(e[r]));
            return t
        }

        function o(e) {
            var t = d.create(d.Class.UNIVERSAL, d.Type.SEQUENCE, !0, [d.create(d.Class.UNIVERSAL, d.Type.INTEGER, !1, d.integerToDer(e.version).getBytes()), d.create(d.Class.UNIVERSAL, d.Type.SEQUENCE, !0, [h.pki.distinguishedNameToAsn1({
                attributes: e.issuer
            }), d.create(d.Class.UNIVERSAL, d.Type.INTEGER, !1, h.util.hexToBytes(e.serialNumber))]), d.create(d.Class.UNIVERSAL, d.Type.SEQUENCE, !0, [d.create(d.Class.UNIVERSAL, d.Type.OID, !1, d.oidToDer(e.digestAlgorithm).getBytes()), d.create(d.Class.UNIVERSAL, d.Type.NULL, !1, "")])]);
            if (e.authenticatedAttributesAsn1 && t.value.push(e.authenticatedAttributesAsn1), t.value.push(d.create(d.Class.UNIVERSAL, d.Type.SEQUENCE, !0, [d.create(d.Class.UNIVERSAL, d.Type.OID, !1, d.oidToDer(e.signatureAlgorithm).getBytes()), d.create(d.Class.UNIVERSAL, d.Type.NULL, !1, "")])), t.value.push(d.create(d.Class.UNIVERSAL, d.Type.OCTETSTRING, !1, e.signature)), e.unauthenticatedAttributes.length > 0) {
                for (var r = d.create(d.Class.CONTEXT_SPECIFIC, 1, !0, []), a = 0; a < e.unauthenticatedAttributes.length; ++a) {
                    var n = e.unauthenticatedAttributes[a];
                    r.values.push(u(n))
                }
                t.value.push(r)
            }
            return t
        }

        function c(e) {
            for (var t = [], r = 0; r < e.length; ++r) t.push(o(e[r]));
            return t
        }

        function u(e) {
            var t;
            if (e.type === h.pki.oids.contentType) t = d.create(d.Class.UNIVERSAL, d.Type.OID, !1, d.oidToDer(e.value).getBytes());
            else if (e.type === h.pki.oids.messageDigest) t = d.create(d.Class.UNIVERSAL, d.Type.OCTETSTRING, !1, e.value.bytes());
            else if (e.type === h.pki.oids.signingTime) {
                var r = new Date("1950-01-01T00:00:00Z"),
                    a = new Date("2050-01-01T00:00:00Z"),
                    n = e.value;
                if ("string" == typeof n) {
                    var i = Date.parse(n);
                    n = isNaN(i) ? 13 === n.length ? d.utcTimeToDate(n) : d.generalizedTimeToDate(n) : new Date(i)
                }
                t = n >= r && n < a ? d.create(d.Class.UNIVERSAL, d.Type.UTCTIME, !1, d.dateToUtcTime(n)) : d.create(d.Class.UNIVERSAL, d.Type.GENERALIZEDTIME, !1, d.dateToGeneralizedTime(n))
            }
            return d.create(d.Class.UNIVERSAL, d.Type.SEQUENCE, !0, [d.create(d.Class.UNIVERSAL, d.Type.OID, !1, d.oidToDer(e.type).getBytes()), d.create(d.Class.UNIVERSAL, d.Type.SET, !0, [t])])
        }

        function l(e) {
            return [d.create(d.Class.UNIVERSAL, d.Type.OID, !1, d.oidToDer(h.pki.oids.data).getBytes()), d.create(d.Class.UNIVERSAL, d.Type.SEQUENCE, !0, [d.create(d.Class.UNIVERSAL, d.Type.OID, !1, d.oidToDer(e.algorithm).getBytes()), d.create(d.Class.UNIVERSAL, d.Type.OCTETSTRING, !1, e.parameter.getBytes())]), d.create(d.Class.CONTEXT_SPECIFIC, 0, !0, [d.create(d.Class.UNIVERSAL, d.Type.OCTETSTRING, !1, e.content.getBytes())])]
        }

        function p(e, t, r) {
            var a = {},
                n = [];
            if (!d.validate(t, r, a, n)) {
                var i = new Error("Cannot read PKCS#7 message. ASN.1 object is not a supported PKCS#7 message.");
                throw i.errors = i, i
            }
            if (d.derToOid(a.contentType) !== h.pki.oids.data) throw new Error("Unsupported PKCS#7 message. Only wrapped ContentType Data supported.");
            if (a.encryptedContent) {
                var s = "";
                if (h.util.isArray(a.encryptedContent))
                    for (var o = 0; o < a.encryptedContent.length; ++o) {
                        if (a.encryptedContent[o].type !== d.Type.OCTETSTRING) throw new Error("Malformed PKCS#7 message, expecting encrypted content constructed of only OCTET STRING objects.");
                        s += a.encryptedContent[o].value
                    } else s = a.encryptedContent;
                e.encryptedContent = {
                    algorithm: d.derToOid(a.encAlgorithm),
                    parameter: h.util.createBuffer(a.encParameter.value),
                    content: h.util.createBuffer(s)
                }
            }
            if (a.content) {
                var s = "";
                if (h.util.isArray(a.content))
                    for (var o = 0; o < a.content.length; ++o) {
                        if (a.content[o].type !== d.Type.OCTETSTRING) throw new Error("Malformed PKCS#7 message, expecting content constructed of only OCTET STRING objects.");
                        s += a.content[o].value
                    } else s = a.content;
                e.content = h.util.createBuffer(s)
            }
            return e.version = a.version.charCodeAt(0), e.rawCapture = a, a
        }

        function f(e) {
            if (void 0 === e.encryptedContent.key) throw new Error("Symmetric key not available.");
            if (void 0 === e.content) {
                var t;
                switch (e.encryptedContent.algorithm) {
                    case h.pki.oids["aes128-CBC"]:
                    case h.pki.oids["aes192-CBC"]:
                    case h.pki.oids["aes256-CBC"]:
                        t = h.aes.createDecryptionCipher(e.encryptedContent.key);
                        break;
                    case h.pki.oids.desCBC:
                    case h.pki.oids["des-EDE3-CBC"]:
                        t = h.des.createDecryptionCipher(e.encryptedContent.key);
                        break;
                    default:
                        throw new Error("Unsupported symmetric cipher, OID " + e.encryptedContent.algorithm)
                }
                if (t.start(e.encryptedContent.parameter), t.update(e.encryptedContent.content), !t.finish()) throw new Error("Symmetric decryption failed.");
                e.content = t.output
            }
        }
        var h = r(0);
        r(5), r(3), r(10), r(6), r(7), r(29), r(2), r(1), r(17);
        var d = h.asn1,
            y = e.exports = h.pkcs7 = h.pkcs7 || {};
        y.messageFromPem = function(e) {
            var t = h.pem.decode(e)[0];
            if ("PKCS7" !== t.type) {
                var r = new Error('Could not convert PKCS#7 message from PEM; PEM header type is not "PKCS#7".');
                throw r.headerType = t.type, r
            }
            if (t.procType && "ENCRYPTED" === t.procType.type) throw new Error("Could not convert PKCS#7 message from PEM; PEM is encrypted.");
            var a = d.fromDer(t.body);
            return y.messageFromAsn1(a)
        }, y.messageToPem = function(e, t) {
            var r = {
                type: "PKCS7",
                body: d.toDer(e.toAsn1()).getBytes()
            };
            return h.pem.encode(r, {
                maxline: t
            })
        }, y.messageFromAsn1 = function(e) {
            var t = {},
                r = [];
            if (!d.validate(e, y.asn1.contentInfoValidator, t, r)) {
                var a = new Error("Cannot read PKCS#7 message. ASN.1 object is not an PKCS#7 ContentInfo.");
                throw a.errors = r, a
            }
            var n, i = d.derToOid(t.contentType);
            switch (i) {
                case h.pki.oids.envelopedData:
                    n = y.createEnvelopedData();
                    break;
                case h.pki.oids.encryptedData:
                    n = y.createEncryptedData();
                    break;
                case h.pki.oids.signedData:
                    n = y.createSignedData();
                    break;
                default:
                    throw new Error("Cannot read PKCS#7 message. ContentType with OID " + i + " is not (yet) supported.")
            }
            return n.fromAsn1(t.content.value[0]), n
        }, y.createSignedData = function() {
            function e() {
                for (var e = {}, t = 0; t < r.signers.length; ++t) {
                    var a = r.signers[t],
                        n = a.digestAlgorithm;
                    n in e || (e[n] = h.md[h.pki.oids[n]].create()), 0 === a.authenticatedAttributes.length ? a.md = e[n] : a.md = h.md[h.pki.oids[n]].create()
                }
                r.digestAlgorithmIdentifiers = [];
                for (var n in e) r.digestAlgorithmIdentifiers.push(d.create(d.Class.UNIVERSAL, d.Type.SEQUENCE, !0, [d.create(d.Class.UNIVERSAL, d.Type.OID, !1, d.oidToDer(n).getBytes()), d.create(d.Class.UNIVERSAL, d.Type.NULL, !1, "")]));
                return e
            }

            function t(e) {
                var t;
                if (r.detachedContent ? t = r.detachedContent : (t = r.contentInfo.value[1], t = t.value[0]), !t) throw new Error("Could not sign PKCS#7 message; there is no content to sign.");
                var a = d.derToOid(r.contentInfo.value[0].value),
                    n = d.toDer(t);
                n.getByte(), d.getBerValueLength(n), n = n.getBytes();
                for (var i in e) e[i].start().update(n);
                for (var s = new Date, o = 0; o < r.signers.length; ++o) {
                    var l = r.signers[o];
                    if (0 === l.authenticatedAttributes.length) {
                        if (a !== h.pki.oids.data) throw new Error("Invalid signer; authenticatedAttributes must be present when the ContentInfo content type is not PKCS#7 Data.")
                    } else {
                        l.authenticatedAttributesAsn1 = d.create(d.Class.CONTEXT_SPECIFIC, 0, !0, []);
                        for (var p = d.create(d.Class.UNIVERSAL, d.Type.SET, !0, []), f = 0; f < l.authenticatedAttributes.length; ++f) {
                            var y = l.authenticatedAttributes[f];
                            y.type === h.pki.oids.messageDigest ? y.value = e[l.digestAlgorithm].digest() : y.type === h.pki.oids.signingTime && (y.value || (y.value = s)), p.value.push(u(y)), l.authenticatedAttributesAsn1.value.push(u(y))
                        }
                        n = d.toDer(p).getBytes(), l.md.start().update(n)
                    }
                    l.signature = l.key.sign(l.md, "RSASSA-PKCS1-V1_5")
                }
                r.signerInfos = c(r.signers)
            }
            var r = null;
            return r = {
                type: h.pki.oids.signedData,
                version: 1,
                certificates: [],
                crls: [],
                signers: [],
                digestAlgorithmIdentifiers: [],
                contentInfo: null,
                signerInfos: [],
                fromAsn1: function(e) {
                    if (p(r, e, y.asn1.signedDataValidator), r.certificates = [], r.crls = [], r.digestAlgorithmIdentifiers = [], r.contentInfo = null, r.signerInfos = [], r.rawCapture.certificates)
                        for (var t = r.rawCapture.certificates.value, a = 0; a < t.length; ++a) r.certificates.push(h.pki.certificateFromAsn1(t[a]))
                },
                toAsn1: function() {
                    r.contentInfo || r.sign();
                    for (var e = [], t = 0; t < r.certificates.length; ++t) e.push(h.pki.certificateToAsn1(r.certificates[t]));
                    var a = [],
                        n = d.create(d.Class.CONTEXT_SPECIFIC, 0, !0, [d.create(d.Class.UNIVERSAL, d.Type.SEQUENCE, !0, [d.create(d.Class.UNIVERSAL, d.Type.INTEGER, !1, d.integerToDer(r.version).getBytes()), d.create(d.Class.UNIVERSAL, d.Type.SET, !0, r.digestAlgorithmIdentifiers), r.contentInfo])]);
                    return e.length > 0 && n.value[0].value.push(d.create(d.Class.CONTEXT_SPECIFIC, 0, !0, e)), a.length > 0 && n.value[0].value.push(d.create(d.Class.CONTEXT_SPECIFIC, 1, !0, a)), n.value[0].value.push(d.create(d.Class.UNIVERSAL, d.Type.SET, !0, r.signerInfos)), d.create(d.Class.UNIVERSAL, d.Type.SEQUENCE, !0, [d.create(d.Class.UNIVERSAL, d.Type.OID, !1, d.oidToDer(r.type).getBytes()), n])
                },
                addSigner: function(e) {
                    var t = e.issuer,
                        a = e.serialNumber;
                    if (e.certificate) {
                        var n = e.certificate;
                        "string" == typeof n && (n = h.pki.certificateFromPem(n)), t = n.issuer.attributes, a = n.serialNumber
                    }
                    var i = e.key;
                    if (!i) throw new Error("Could not add PKCS#7 signer; no private key specified.");
                    "string" == typeof i && (i = h.pki.privateKeyFromPem(i));
                    var s = e.digestAlgorithm || h.pki.oids.sha1;
                    switch (s) {
                        case h.pki.oids.sha1:
                        case h.pki.oids.sha256:
                        case h.pki.oids.sha384:
                        case h.pki.oids.sha512:
                        case h.pki.oids.md5:
                            break;
                        default:
                            throw new Error("Could not add PKCS#7 signer; unknown message digest algorithm: " + s)
                    }
                    var o = e.authenticatedAttributes || [];
                    if (o.length > 0) {
                        for (var c = !1, u = !1, l = 0; l < o.length; ++l) {
                            var p = o[l];
                            if (c || p.type !== h.pki.oids.contentType) {
                                if (u || p.type !== h.pki.oids.messageDigest);
                                else if (u = !0, c) break
                            } else if (c = !0, u) break
                        }
                        if (!c || !u) throw new Error("Invalid signer.authenticatedAttributes. If signer.authenticatedAttributes is specified, then it must contain at least two attributes, PKCS #9 content-type and PKCS #9 message-digest.")
                    }
                    r.signers.push({
                        key: i,
                        version: 1,
                        issuer: t,
                        serialNumber: a,
                        digestAlgorithm: s,
                        signatureAlgorithm: h.pki.oids.rsaEncryption,
                        signature: null,
                        authenticatedAttributes: o,
                        unauthenticatedAttributes: []
                    })
                },
                sign: function(a) {
                    if (a = a || {}, ("object" != typeof r.content || null === r.contentInfo) && (r.contentInfo = d.create(d.Class.UNIVERSAL, d.Type.SEQUENCE, !0, [d.create(d.Class.UNIVERSAL, d.Type.OID, !1, d.oidToDer(h.pki.oids.data).getBytes())]), "content" in r)) {
                        var n;
                        r.content instanceof h.util.ByteBuffer ? n = r.content.bytes() : "string" == typeof r.content && (n = h.util.encodeUtf8(r.content)), a.detached ? r.detachedContent = d.create(d.Class.UNIVERSAL, d.Type.OCTETSTRING, !1, n) : r.contentInfo.value.push(d.create(d.Class.CONTEXT_SPECIFIC, 0, !0, [d.create(d.Class.UNIVERSAL, d.Type.OCTETSTRING, !1, n)]))
                    }
                    if (0 !== r.signers.length) {
                        t(e())
                    }
                },
                verify: function() {
                    throw new Error("PKCS#7 signature verification not yet implemented.")
                },
                addCertificate: function(e) {
                    "string" == typeof e && (e = h.pki.certificateFromPem(e)), r.certificates.push(e)
                },
                addCertificateRevokationList: function(e) {
                    throw new Error("PKCS#7 CRL support not yet implemented.")
                }
            }
        }, y.createEncryptedData = function() {
            var e = null;
            return e = {
                type: h.pki.oids.encryptedData,
                version: 0,
                encryptedContent: {
                    algorithm: h.pki.oids["aes256-CBC"]
                },
                fromAsn1: function(t) {
                    p(e, t, y.asn1.encryptedDataValidator)
                },
                decrypt: function(t) {
                    void 0 !== t && (e.encryptedContent.key = t), f(e)
                }
            }
        }, y.createEnvelopedData = function() {
            var e = null;
            return e = {
                type: h.pki.oids.envelopedData,
                version: 0,
                recipients: [],
                encryptedContent: {
                    algorithm: h.pki.oids["aes256-CBC"]
                },
                fromAsn1: function(t) {
                    var r = p(e, t, y.asn1.envelopedDataValidator);
                    e.recipients = i(r.recipientInfos.value)
                },
                toAsn1: function() {
                    return d.create(d.Class.UNIVERSAL, d.Type.SEQUENCE, !0, [d.create(d.Class.UNIVERSAL, d.Type.OID, !1, d.oidToDer(e.type).getBytes()), d.create(d.Class.CONTEXT_SPECIFIC, 0, !0, [d.create(d.Class.UNIVERSAL, d.Type.SEQUENCE, !0, [d.create(d.Class.UNIVERSAL, d.Type.INTEGER, !1, d.integerToDer(e.version).getBytes()), d.create(d.Class.UNIVERSAL, d.Type.SET, !0, s(e.recipients)), d.create(d.Class.UNIVERSAL, d.Type.SEQUENCE, !0, l(e.encryptedContent))])])])
                },
                findRecipient: function(t) {
                    for (var r = t.issuer.attributes, a = 0; a < e.recipients.length; ++a) {
                        var n = e.recipients[a],
                            i = n.issuer;
                        if (n.serialNumber === t.serialNumber && i.length === r.length) {
                            for (var s = !0, o = 0; o < r.length; ++o)
                                if (i[o].type !== r[o].type || i[o].value !== r[o].value) {
                                    s = !1;
                                    break
                                }
                            if (s) return n
                        }
                    }
                    return null
                },
                decrypt: function(t, r) {
                    if (void 0 === e.encryptedContent.key && void 0 !== t && void 0 !== r) switch (t.encryptedContent.algorithm) {
                        case h.pki.oids.rsaEncryption:
                        case h.pki.oids.desCBC:
                            var a = r.decrypt(t.encryptedContent.content);
                            e.encryptedContent.key = h.util.createBuffer(a);
                            break;
                        default:
                            throw new Error("Unsupported asymmetric cipher, OID " + t.encryptedContent.algorithm)
                    }
                    f(e)
                },
                addRecipient: function(t) {
                    e.recipients.push({
                        version: 0,
                        issuer: t.issuer.attributes,
                        serialNumber: t.serialNumber,
                        encryptedContent: {
                            algorithm: h.pki.oids.rsaEncryption,
                            key: t.publicKey
                        }
                    })
                },
                encrypt: function(t, r) {
                    if (void 0 === e.encryptedContent.content) {
                        r = r || e.encryptedContent.algorithm, t = t || e.encryptedContent.key;
                        var a, n, i;
                        switch (r) {
                            case h.pki.oids["aes128-CBC"]:
                                a = 16, n = 16, i = h.aes.createEncryptionCipher;
                                break;
                            case h.pki.oids["aes192-CBC"]:
                                a = 24, n = 16, i = h.aes.createEncryptionCipher;
                                break;
                            case h.pki.oids["aes256-CBC"]:
                                a = 32, n = 16, i = h.aes.createEncryptionCipher;
                                break;
                            case h.pki.oids["des-EDE3-CBC"]:
                                a = 24, n = 8, i = h.des.createEncryptionCipher;
                                break;
                            default:
                                throw new Error("Unsupported symmetric cipher, OID " + r)
                        }
                        if (void 0 === t) t = h.util.createBuffer(h.random.getBytes(a));
                        else if (t.length() != a) throw new Error("Symmetric key has wrong length; got " + t.length() + " bytes, expected " + a + ".");
                        e.encryptedContent.algorithm = r, e.encryptedContent.key = t, e.encryptedContent.parameter = h.util.createBuffer(h.random.getBytes(n));
                        var s = i(t);
                        if (s.start(e.encryptedContent.parameter.copy()), s.update(e.content), !s.finish()) throw new Error("Symmetric encryption failed.");
                        e.encryptedContent.content = s.output
                    }
                    for (var o = 0; o < e.recipients.length; ++o) {
                        var c = e.recipients[o];
                        if (void 0 === c.encryptedContent.content) switch (c.encryptedContent.algorithm) {
                            case h.pki.oids.rsaEncryption:
                                c.encryptedContent.content = c.encryptedContent.key.encrypt(e.encryptedContent.key.data);
                                break;
                            default:
                                throw new Error("Unsupported asymmetric cipher, OID " + c.encryptedContent.algorithm)
                        }
                    }
                }
            }
        }
    }, function(e, t, r) {
        function a(e, t) {
            var r = t.toString(16);
            r[0] >= "8" && (r = "00" + r);
            var a = s.util.hexToBytes(r);
            e.putInt32(a.length), e.putBytes(a)
        }

        function n(e, t) {
            e.putInt32(t.length), e.putString(t)
        }

        function i() {
            for (var e = s.md.sha1.create(), t = arguments.length, r = 0; r < t; ++r) e.update(arguments[r]);
            return e.digest()
        }
        var s = r(0);
        r(5), r(8), r(14), r(9), r(1);
        var o = e.exports = s.ssh = s.ssh || {};
        o.privateKeyToPutty = function(e, t, r) {
            r = r || "", t = t || "";
            var o = "" === t ? "none" : "aes256-cbc",
                c = "PuTTY-User-Key-File-2: ssh-rsa\r\n";
            c += "Encryption: " + o + "\r\n", c += "Comment: " + r + "\r\n";
            var u = s.util.createBuffer();
            n(u, "ssh-rsa"), a(u, e.e), a(u, e.n);
            var l = s.util.encode64(u.bytes(), 64),
                p = Math.floor(l.length / 66) + 1;
            c += "Public-Lines: " + p + "\r\n", c += l;
            var f = s.util.createBuffer();
            a(f, e.d), a(f, e.p), a(f, e.q), a(f, e.qInv);
            var h;
            if (t) {
                var d = f.length() + 16 - 1;
                d -= d % 16;
                var y = i(f.bytes());
                y.truncate(y.length() - d + f.length()), f.putBuffer(y);
                var g = s.util.createBuffer();
                g.putBuffer(i("\0\0\0\0", t)), g.putBuffer(i("\0\0\0", t));
                var v = s.aes.createEncryptionCipher(g.truncate(8), "CBC");
                v.start(s.util.createBuffer().fillWithByte(0, 16)), v.update(f.copy()), v.finish();
                var m = v.output;
                m.truncate(16), h = s.util.encode64(m.bytes(), 64)
            } else h = s.util.encode64(f.bytes(), 64);
            p = Math.floor(h.length / 66) + 1, c += "\r\nPrivate-Lines: " + p + "\r\n", c += h;
            var C = i("putty-private-key-file-mac-key", t),
                E = s.util.createBuffer();
            n(E, "ssh-rsa"), n(E, o), n(E, r), E.putInt32(u.length()), E.putBuffer(u), E.putInt32(f.length()), E.putBuffer(f);
            var S = s.hmac.create();
            return S.start("sha1", C), S.update(E.bytes()), c += "\r\nPrivate-MAC: " + S.digest().toHex() + "\r\n"
        }, o.publicKeyToOpenSSH = function(e, t) {
            t = t || "";
            var r = s.util.createBuffer();
            return n(r, "ssh-rsa"), a(r, e.e), a(r, e.n), "ssh-rsa " + s.util.encode64(r.bytes()) + " " + t
        }, o.privateKeyToOpenSSH = function(e, t) {
            return t ? s.pki.encryptRsaPrivateKey(e, t, {
                legacy: !0,
                algorithm: "aes128"
            }) : s.pki.privateKeyToPem(e)
        }, o.getPublicKeyFingerprint = function(e, t) {
            t = t || {};
            var r = t.md || s.md.md5.create(),
                i = s.util.createBuffer();
            n(i, "ssh-rsa"), a(i, e.e), a(i, e.n), r.start(), r.update(i.getBytes());
            var o = r.digest();
            if ("hex" === t.encoding) {
                var c = o.toHex();
                return t.delimiter ? c.match(/.{2}/g).join(t.delimiter) : c
            }
            if ("binary" === t.encoding) return o.getBytes();
            if (t.encoding) throw new Error('Unknown encoding "' + t.encoding + '".');
            return o
        }
    }, function(e, t, r) {
        var a = r(0);
        r(31), r(33), r(1);
        var n = "forge.task",
            i = {},
            s = 0;
        a.debug.set(n, "tasks", i);
        var o = {};
        a.debug.set(n, "queues", o);
        var c = "ready",
            u = "running",
            l = "blocked",
            p = "sleeping",
            f = "done",
            h = "error",
            d = "stop",
            y = "start",
            g = {};
        g[c] = {}, g[c][d] = c, g[c][y] = u, g[c].cancel = f, g[c].fail = h, g[u] = {}, g[u][d] = c, g[u][y] = u, g[u].block = l, g[u].unblock = u, g[u].sleep = p, g[u].wakeup = u, g[u].cancel = f, g[u].fail = h, g[l] = {}, g[l][d] = l, g[l][y] = l, g[l].block = l, g[l].unblock = l, g[l].sleep = l, g[l].wakeup = l, g[l].cancel = f, g[l].fail = h, g[p] = {}, g[p][d] = p, g[p][y] = p, g[p].block = p, g[p].unblock = p, g[p].sleep = p, g[p].wakeup = p, g[p].cancel = f, g[p].fail = h, g[f] = {}, g[f][d] = f, g[f][y] = f, g[f].block = f, g[f].unblock = f, g[f].sleep = f, g[f].wakeup = f, g[f].cancel = f, g[f].fail = h, g[h] = {}, g[h][d] = h, g[h][y] = h, g[h].block = h, g[h].unblock = h, g[h].sleep = h, g[h].wakeup = h, g[h].cancel = h, g[h].fail = h;
        var v = function(e) {
            this.id = -1, this.name = e.name || "?", this.parent = e.parent || null, this.run = e.run, this.subtasks = [], this.error = !1, this.state = c, this.blocks = 0, this.timeoutId = null, this.swapTime = null, this.userData = null, this.id = s++, i[this.id] = this
        };
        v.prototype.debug = function(e) {
            e = e || "", a.log.debug(n, e, "[%s][%s] task:", this.id, this.name, this, "subtasks:", this.subtasks.length, "queue:", o)
        }, v.prototype.next = function(e, t) {
            "function" == typeof e && (t = e, e = this.name);
            var r = new v({
                run: t,
                name: e,
                parent: this
            });
            return r.state = u, r.type = this.type, r.successCallback = this.successCallback || null, r.failureCallback = this.failureCallback || null, this.subtasks.push(r), this
        }, v.prototype.parallel = function(e, t) {
            return a.util.isArray(e) && (t = e, e = this.name), this.next(e, function(r) {
                var n = r;
                n.block(t.length);
                for (var i = 0; i < t.length; i++) {
                    var s = e + "__parallel-" + r.id + "-" + i,
                        o = i;
                    ! function(e, r) {
                        a.task.start({
                            type: e,
                            run: function(e) {
                                t[r](e)
                            },
                            success: function(e) {
                                n.unblock()
                            },
                            failure: function(e) {
                                n.unblock()
                            }
                        })
                    }(s, o)
                }
            })
        }, v.prototype.stop = function() {
            this.state = g[this.state][d]
        }, v.prototype.start = function() {
            this.error = !1, this.state = g[this.state][y], this.state === u && (this.start = new Date, this.run(this), C(this, 0))
        }, v.prototype.block = function(e) {
            e = void 0 === e ? 1 : e, this.blocks += e, this.blocks > 0 && (this.state = g[this.state].block)
        }, v.prototype.unblock = function(e) {
            return e = void 0 === e ? 1 : e, this.blocks -= e, 0 === this.blocks && this.state !== f && (this.state = u, C(this, 0)), this.blocks
        }, v.prototype.sleep = function(e) {
            e = void 0 === e ? 0 : e, this.state = g[this.state].sleep;
            var t = this;
            this.timeoutId = setTimeout(function() {
                t.timeoutId = null, t.state = u, C(t, 0)
            }, e)
        }, v.prototype.wait = function(e) {
            e.wait(this)
        }, v.prototype.wakeup = function() {
            this.state === p && (cancelTimeout(this.timeoutId), this.timeoutId = null, this.state = u, C(this, 0))
        }, v.prototype.cancel = function() {
            this.state = g[this.state].cancel, this.permitsNeeded = 0, null !== this.timeoutId && (cancelTimeout(this.timeoutId), this.timeoutId = null), this.subtasks = []
        }, v.prototype.fail = function(e) {
            if (this.error = !0, E(this, !0), e) e.error = this.error, e.swapTime = this.swapTime, e.userData = this.userData, C(e, 0);
            else {
                if (null !== this.parent) {
                    for (var t = this.parent; null !== t.parent;) t.error = this.error, t.swapTime = this.swapTime, t.userData = this.userData, t = t.parent;
                    E(t, !0)
                }
                this.failureCallback && this.failureCallback(this)
            }
        };
        var m = function(e) {
                e.error = !1, e.state = g[e.state][y], setTimeout(function() {
                    e.state === u && (e.swapTime = +new Date, e.run(e), C(e, 0))
                }, 0)
            },
            C = function(e, t) {
                var r = t > 30 || +new Date - e.swapTime > 20,
                    a = function(t) {
                        if (t++, e.state === u)
                            if (r && (e.swapTime = +new Date), e.subtasks.length > 0) {
                                var a = e.subtasks.shift();
                                a.error = e.error, a.swapTime = e.swapTime, a.userData = e.userData, a.run(a), a.error || C(a, t)
                            } else E(e), e.error || null !== e.parent && (e.parent.error = e.error, e.parent.swapTime = e.swapTime, e.parent.userData = e.userData, C(e.parent, t))
                    };
                r ? setTimeout(a, 0) : a(t)
            },
            E = function(e, t) {
                e.state = f, delete i[e.id], null === e.parent && (e.type in o ? 0 === o[e.type].length ? a.log.error(n, "[%s][%s] task queue empty [%s]", e.id, e.name, e.type) : o[e.type][0] !== e ? a.log.error(n, "[%s][%s] task not first in queue [%s]", e.id, e.name, e.type) : (o[e.type].shift(), 0 === o[e.type].length ? delete o[e.type] : o[e.type][0].start()) : a.log.error(n, "[%s][%s] task queue missing [%s]", e.id, e.name, e.type), t || (e.error && e.failureCallback ? e.failureCallback(e) : !e.error && e.successCallback && e.successCallback(e)))
            };
        e.exports = a.task = a.task || {}, a.task.start = function(e) {
            var t = new v({
                run: e.run,
                name: e.name || "?"
            });
            t.type = e.type, t.successCallback = e.success || null, t.failureCallback = e.failure || null, t.type in o ? o[e.type].push(t) : (o[t.type] = [t], m(t))
        }, a.task.cancel = function(e) {
            e in o && (o[e] = [o[e][0]])
        }, a.task.createCondition = function() {
            var e = {
                tasks: {}
            };
            return e.wait = function(t) {
                t.id in e.tasks || (t.block(), e.tasks[t.id] = t)
            }, e.notify = function() {
                var t = e.tasks;
                e.tasks = {};
                for (var r in t) t[r].unblock()
            }, e
        }
    }])
};
