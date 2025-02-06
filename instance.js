"use strict";

{
	const SDK = globalThis.SDK;
    const PLUGIN_CLASS = SDK.Plugins.Massive_Cube_Forge;
	
	PLUGIN_CLASS.Instance = class ForgeInstance extends SDK.IInstanceBase
	{
		constructor(sdkType, inst)
		{
			super(sdkType, inst);
		}
		
		Release()
		{
		}
		
		OnCreate()
		{
		}
		
		OnPropertyChanged(id, value)
		{
		}
		
		LoadC2Property(name, valueString)
		{
			return false;		// not handled
		}
	};
}