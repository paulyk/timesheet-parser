

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.b61a5579.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.bc372fe1.js"];
export const stylesheets = ["_app/immutable/assets/0.1d0762a2.css"];
export const fonts = [];
