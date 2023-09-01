<!-- Mobile Tests
![branches](__badges__/badge-branches.svg)
![functions](__badges__/badge-functions.svg)
![lines](__badges__/badge-lines.svg)
![statements](__badges__/badge-statements.svg) -->

# Ignite Gym

[Layout](<https://www.figma.com/file/D2z6xRIJq6NcLuhW6F31pd/Ignite-Gym-(Community)?node-id=37%3A266&mode=dev>)

# Working in Progress

# API

[Docs](http://localhost:3333/api-docs)

# Scripts

## WorkSpace

Run the server:

```bash
npm run start:server
```

Run the mobile app development

```bash
npm run start:mobile
```

Run the backend and mobile app in different terminal tabs, to be able to trigger metro-blunder actions.

## Workarounds

native-base ssr warnings, it's a open issue in the current version, one way to fix is removing the Component `SSRProvider` from `node_modules/native-base/src/core/NativeBaseProvider.tsx`
