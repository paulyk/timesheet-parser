

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.3198d85c.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.bc372fe1.js","_app/immutable/chunks/singletons.cc2bee1e.js"];
export const stylesheets = [];
export const fonts = [];
