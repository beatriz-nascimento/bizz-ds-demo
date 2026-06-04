# bizz-ds-demo

Cross-framework showcase for [bizz-components](https://www.npmjs.com/package/bizz-components), a framework-agnostic web component library built with Lit.

Demonstrates the same components running in three stacks:

| App | Stack | Port | Description |
|---|---|---|---|
| `vanilla` | HTML + CSS + JS | 4200 | Full interactive showcase with live token editor |
| `react-demo` | React 18 + Vite | 4201 | React integration patterns, JSX types, hooks |
| `angular-demo` | Angular 19 | 4202 | Angular standalone, CUSTOM_ELEMENTS_SCHEMA |

## Getting started

```bash
npm install

# Serve each app
npm run serve:vanilla
npm run serve:react
npm run serve:angular

# Build all
npm run build
```

## Workspace

Built with [Nx](https://nx.dev) monorepo tooling with build caching and task orchestration.

```
apps/
├── vanilla/       ← no framework, imports from CDN
├── react-demo/    ← Vite + React
└── angular-demo/  ← Angular standalone
```

## Library

`bizz-components` is published separately at:
- **npm:** `npm install bizz-components`
- **Source:** [bizz-design-system](../bizz-design-system)
- **CDN:** `https://unpkg.com/bizz-components@latest/web/index.js`

## License

MIT © Beatriz Nascimento
