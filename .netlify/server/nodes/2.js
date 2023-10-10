

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.30a763a8.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.bc372fe1.js"];
export const stylesheets = ["_app/immutable/assets/2.5b205da6.css"];
export const fonts = [];
