"use strict";

{
	const SDK = globalThis.SDK;
const PLUGIN_CLASS = SDK.Plugins.Massive_Cube_Forge;
	
	PLUGIN_CLASS.Type = class ForgeType extends SDK.ITypeBase
	{
		constructor(sdkPlugin, iObjectType)
		{
			super(sdkPlugin, iObjectType);
		}
	};
}