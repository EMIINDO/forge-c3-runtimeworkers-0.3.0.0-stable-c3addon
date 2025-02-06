"use strict";

{
	globalThis.C3.Plugins.Massive_Cube_Forge.Exps =
	{	
		getresult()	{ return this.result; },
		getSHA1(data) { return this.sha1(data,this); },
		getSHA256(data) { return this.sha256(data,this); },
		getSHA384(data) { return this.sha384(data,this); },
		getSHA512(data) { return this.sha512(data,this); },
		MD5(data) { return this.md5(data,this); },
		getrandomvalues(lng){return this.psrand(lng);},
		encodeb64(str) {return this.encb64(str); },
		decodeb64(str) {return this.decb64(str); }
	};
}