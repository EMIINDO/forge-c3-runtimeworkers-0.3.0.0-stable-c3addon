"use strict";

{
	globalThis.C3.Plugins.Massive_Cube_Forge.Instance = class ForgeInstance extends globalThis.ISDKInstanceBase
	{
		constructor()
		{
			super( inst );
			this.ky = undefined;
			this.iv = undefined;

			this.kyIsLongEnough = false;
			this.IVIsLongEnough = false;

			this.result = "";

			if (properties)	{	}

			this.cipher = undefined;
			this.decipher = undefined;

			this.forg = new globalThis["forge"];

			this.encb64 = function(str) {
				return this.forg.util.encode64(str);
			}

			this.decb64 = function(str) {
				return this.forg.util.decode64(str);
			}

			this.psrand = function(lng) {
				var bytes = this.forg.random.getBytesSync(lng);
				return this.forg.util.bytesToHex(bytes);
			}

			this.sha1 = function(data,_this) {
				var md = _this.forg.md.sha1.create();
				md.update(data);
				return md.digest().toHex();
			}

			this.sha256 = function(data,_this) {
				var md = _this.forg.md.sha256.create();
				md.update(data);
				return md.digest().toHex();
			}

			this.sha384 = function(data,_this) {
				var md = _this.forg.md.sha384.create();
				md.update(data);
				return md.digest().toHex();
			}

			this.sha512 = function(data,_this) {
				var md = _this.forg.md.sha512.create();
				md.update(data);
				return md.digest().toHex();
			}

			this.md5 = function(data,_this) {
				var md = _this.forg.md.md5.create();
				md.update(data);
				return md.digest().toHex();
			}

			this.clKAiV = function(_this) {
				_this.ky = "";
				_this.iv = "";
			}

			this.getTypeIDStr = function(id) {
				switch(id) {
					case 0: return "AES-ECB"; break;
					case 1: return "AES-CBC"; break;
					case 2: return "AES-CFB"; break;
					case 3: return "AES-OFB"; break;
					case 4: return "AES-GCM"; break;
					case 5: return "3DES-ECB"; break;
					case 6: return "3DES-CBC"; break;
					case 7: return "DES-ECB"; break;
					case 8: return "DES-CBC"; break;
					default: return "AES-ECB";
				}
			}

			this.encr = function(type,_this,text) {
				var plaintext = text.toString();  
				var ky = _this.ky;

				var objiv = {};
				objiv["iv"] = _this.iv;

				var cipher = _this.forg.cipher.createCipher(_this.getTypeIDStr(type), ky);
				cipher.start(objiv);
				cipher.update(_this.forg.util.createBuffer(plaintext));
				cipher.finish();
				var encrypted = cipher.output;
				_this.result = _this.forg.util.encode64(encrypted.data);
			}

			this.decr = function(type, _this, text) {
				var plaintext = text.toString();  
				var ky = _this.ky;

				var objiv = {};
				objiv["iv"] = _this.iv;

				var decodedB64 = _this.forg.util.decode64(plaintext);
				var input = _this.forg.util.createBuffer(decodedB64, 'binary');
				input.getBytes(decodedB64);

				var decipher = _this.forg.cipher.createDecipher(_this.getTypeIDStr(type), ky);
				decipher.start(objiv);
				decipher.update(input);
				var result = decipher.finish(); 
				_this.result = decipher.output.data;
			}

			this.setky = function( ky, _this ) {
				if((ky.length==16)||(ky.length==24)||(ky.length==32)) {
					_this.ky = ky;
					_this.kyIsLongEnough = true;
				} else {
					_this.kyIsLongEnough = false;
					console.warn("ky is not 16, 24 or 32 chars long!");
				}
			}

			this.setIV = function( iv, _this ) {
				if(iv.length>0) {
					_this.iv = iv;
					_this.IVIsLongEnough = true;
				} else {
					_this.IVIsLongEnough = false;
					_this.iv = "";
					console.warn("iv is not long enough!");
				}
			}

		}
		
		_release() {	super._release();	}
		_saveToJson() {	return {	};	}
		_loadFromJson(o)	{	}
	};
}