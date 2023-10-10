import { c as create_ssr_component, d as add_attribute, f as each, e as escape, v as validate_component } from "../../chunks/ssr.js";
import Enumerable from "linq";
const DataTable_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "table.svelte-x8dvsi{width:100%;border-collapse:collapse;background:var(--color-background-alt);box-shadow:var(--elevation-1)}tr.svelte-x8dvsi{border-bottom:var(--line)}th.svelte-x8dvsi{cursor:pointer;background:var(--color-background-alt2)}th.svelte-x8dvsi,td.svelte-x8dvsi{text-align:left;padding:var(--space-inset-squish-m)}.number.svelte-x8dvsi{text-align:right}",
  map: null
};
const DataTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let sortedData;
  let { data = [] } = $$props;
  let { columns = [] } = $$props;
  let { showHeadings = true } = $$props;
  let sortKey;
  let { style = "" } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.columns === void 0 && $$bindings.columns && columns !== void 0)
    $$bindings.columns(columns);
  if ($$props.showHeadings === void 0 && $$bindings.showHeadings && showHeadings !== void 0)
    $$bindings.showHeadings(showHeadings);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  $$result.css.add(css$2);
  sortedData = Enumerable.from(data).orderBy((x) => x[sortKey]).toArray();
  return `<table${add_attribute("style", style, 0)} class="svelte-x8dvsi">${showHeadings ? `<thead><tr class="svelte-x8dvsi">${each(columns, (column) => {
    return `<th class="svelte-x8dvsi">${escape(column.heading)} </th>`;
  })}</tr></thead>` : ``} <tbody>${each(sortedData, (entry) => {
    return `<tr class="svelte-x8dvsi">${each(columns, (column) => {
      let value = entry[column.value], href = column.href ? entry[column.href] : "", lines = value.split("\n");
      return `   <td class="${["svelte-x8dvsi", column.type === "number" ? "number" : ""].join(" ").trim()}">${!column.type || column.type === "string" ? `${escape(value)}` : `${column.type === "number" ? `${escape(value)}` : `${column.type === "link" ? `<a${add_attribute("href", href, 0)}>${escape(value)}</a>` : `${column.type === "boolean" ? `${escape(value ? "Yes" : "No")}` : `${column.type === "lines" ? `${each(lines, (line) => {
        return `<div>${escape(line)}</div>`;
      })}` : ``}`}`}`}`} </td>`;
    })} </tr>`;
  })}</tbody> </table>`;
});
const Flex_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".flex.svelte-1vdhyvs{display:flex}",
  map: null
};
const Flex = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { justifyContent = "flex-start" } = $$props;
  let { alignItems = "stretch" } = $$props;
  let { gap = "1rem" } = $$props;
  let style = `justify-content: ${justifyContent};align-items: ${alignItems}; gap: ${gap}`;
  if ($$props.justifyContent === void 0 && $$bindings.justifyContent && justifyContent !== void 0)
    $$bindings.justifyContent(justifyContent);
  if ($$props.alignItems === void 0 && $$bindings.alignItems && alignItems !== void 0)
    $$bindings.alignItems(alignItems);
  if ($$props.gap === void 0 && $$bindings.gap && gap !== void 0)
    $$bindings.gap(gap);
  $$result.css.add(css$1);
  return `<div class="flex svelte-1vdhyvs"${add_attribute("style", style, 0)}>${slots.default ? slots.default({}) : ``} </div>`;
});
const ParseTimeheet_svelte_svelte_type_style_lang = "";
const css = {
  code: "textarea.svelte-xsqlcm{width:100%;height:300px}",
  map: null
};
const ParseTimeheet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let entrires;
  let value = "";
  let timeEntries = [];
  const reset = () => {
    value = "";
    timeEntries = [];
  };
  if ($$props.reset === void 0 && $$bindings.reset && reset !== void 0)
    $$bindings.reset(reset);
  $$result.css.add(css);
  entrires = timeEntries.sort((a, b) => (
    // sort by date asc
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )).map((entry) => ({
    ...entry,
    workItems: entry.workItems.join("\n")
  }));
  return `<textarea class="svelte-xsqlcm">${escape(value || "")}</textarea> ${validate_component(Flex, "Flex").$$render($$result, { alignItems: "center" }, {}, {
    default: () => {
      return `<button data-svelte-h="svelte-1ummnyo">Parse Timesheet Data</button> <button data-svelte-h="svelte-jn3jzs">Reset</button>`;
    }
  })} ${timeEntries.length > 0 ? `${validate_component(DataTable, "DataTable").$$render(
    $$result,
    {
      data: entrires,
      columns: [
        {
          value: "date",
          heading: "Date",
          type: "string"
        },
        { value: "startTime", heading: "Start" },
        { value: "endTime", heading: "End" },
        { value: "totalTime", heading: "Hours" },
        {
          value: "workItems",
          type: "lines",
          heading: "Description"
        }
      ]
    },
    {},
    {}
  )}` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1 data-svelte-h="svelte-13qphlk">Timehseet Geneerator</h1> ${validate_component(ParseTimeheet, "ParseTimeheet").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
