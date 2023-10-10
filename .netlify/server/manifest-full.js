export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.2d07d62b.js","app":"_app/immutable/entry/app.b11dac46.js","imports":["_app/immutable/entry/start.2d07d62b.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/singletons.cc2bee1e.js","_app/immutable/entry/app.b11dac46.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.bc372fe1.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
