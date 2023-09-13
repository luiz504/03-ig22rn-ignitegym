| Mobile tests | ![branches](/apps/mobile/__badges__/badge-branches.svg) | ![functions](/apps/mobile/__badges__/badge-functions.svg) | ![lines](/apps/mobile/__badges__/badge-lines.svg) | ![statements](/apps/mobile/__badges__/badge-statements.svg) |
| ------------ | ------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------- |

# Ignite Gym

This project was created as part of my studies following the lessons from the React Native bootcamp Ignite UI 2022 by Rocketseat. It serves as both a learning project and a portfolio piece.

## Project Overview

Ignite Gym provides a mobile application and an API with the following features:

following features:

- User Registration
- User Login
- Refresh Token
- List Exercises by Group
- View Exercise Details and track its execution
- List exercise history by day
- Update User Avatar
- Update User name and password

The app is divided into two parts:

- **Authenticated**: Uses Tabs Navigation with 4 screens (Home, Exercise Details, History, and Profile).
- **Unauthenticated**: Uses Stack Navigation with 2 screens (Sign Up and Sign In).

## Personal touches

I've added some personal touches to enhance the project:

- **Monorepo with Turborepo**: Managing multiple packages in a single repository.
- **Husky with ESLint/Prettier**: Enforcing code quality and formatting.
- **Tests with Jest & React Native Testing Library (RNTL)**: Ensuring code reliability.
- **Docker Compose Script**: Run the backend in a container for easier setup.
- **React-Query**: Used for caching and handling data states/effects.
- **Splashscreen**: A polished UI touch.
- **Code Splitting**: To facilitate unit testing and adhere to SOLID principles.
- **Usage of Zod**: Replaced Yup for validation.

#

## Root Directory Scripts

To get started, you can use the following commands:

### Start Mobile Expo Go Server

```bash
npm run start:mobile
```

<small>**Note**: _Run this command in a separate terminal to interact with Expo actions._</small>

#### Mobile Envs

To configure the mobile app properly, you'll need to set the following environment variable:

- `EXPO_PUBLIC_API_BASE_URL`

To set up this variable, follow these steps:

1. Create a file named .env in the project's /apps/mobile directory.
2. In the .env file, specify the `EXPO_PUBLIC_API_BASE_URL` with the appropriate server port information. Please note that it does not support the "localhost" syntax; instead, use the format provided in the .env.example file as a reference.

By configuring the environment variables correctly, you ensure that the mobile app connects to the API server seamlessly.

#

### Start Backend Server Locally

```bash
npm run start:server

```

#### Start Backend Server in Docker

```bash
docker compose up
```

Running the backend and mobile app in different terminal tabs allows you to trigger Metro bundler actions seamlessly.

#

## Links

[Layout](<https://www.figma.com/file/D2z6xRIJq6NcLuhW6F31pd/Ignite-Gym-(Community)?node-id=37%3A266&mode=dev>) - The project's Figma layout for reference.

[API Docs](http://localhost:3333/api-docs) - Access the API documentation (requires the server to be running).

## Workarounds

One issue you might encounter is native-base SSR warnings. To address this issue, you can remove the Component SSRProvider from `node_modules/native-base/src/core/NativeBaseProvider.tsx`.

## Personal Notes

<details>
  <summary><strong>Tests</strong></summary>
During the development of this project, I utilized the concepts learned from the bootcamp to practice a test-driven mindset. Here are some key insights and experiences gained:

## Isolating Coverage

It's essential to pay attention to test coverage isolation when creating functions, classes, or components. Running npm test --watch --coverage with the target instantiated in previous test screens or larger components can pollute the actual unit test coverage. To overcome this, I used the VSCode extension called "jest runner" to run tests by file separately, along with their coverage.

## Challenges with Axios API Interceptors

Testing Axios api instance interceptors presented some challenges. To effectively mock the expected behaviors, I had to split certain functions. This allowed me to gain better control over the testing process and ensure the accuracy of the tests.

## Balancing Unit and Integration Tests

This project provided a deeper understanding of when and where to use mocks and spies. Balancing unit tests with integration tests is crucial for maintaining a robust test suite. Unit tests focus on individual components or functions, while integration tests validate the interactions between various parts of the application.
These testing insights have been invaluable in ensuring the reliability and stability of the Ignite Gym project.

</details>
