
# react-snackify

React Snackify made easy! 🚀 Display customizable snackbar notifications in your React applications with minimal setup.

## Demo
**See it in action!** Try our interactive playground to customize and preview snackbars in real-time: [Explore the Demo](https://melodic-rolypoly-7e97b2.netlify.app/)

## Installation

Install the package via npm or yarn:

```bash
npm install react-snackify
```

or

```bash
yarn add react-snackify
```

Don't forget to import the CSS styles:

```jsx
import "react-snackify/styles/snack-bar.css";
```

## Features

- **Easy Setup**: Wrap your app with `SnackbarProvider` and use the `useSnackbar` hook to show notifications.
- **Highly Customizable**: Supports multiple animation types (fade, slide, scale, grow), style variants (default, neon-glow, holographic, bold-monochrome, vintage-paper, glassmorphism), and custom icons per variant.
- **Positions**: Place snackbars at top-left, top-right, top-center, bottom-left, bottom-right, or bottom-center.
- **Variants**: Success, error, warning, info with corresponding colors and icons.
- **Actions**: Add one or more buttons with custom labels, icons, onClick handlers, and auto-dismiss options.
- **AutoMorph**: Automatically transform the snackbar after a delay (e.g., from info to success).
- **Progress Bar**: Visual timer that pauses on hover.
- **Update & Close**: Programmatically update or close specific snackbars.
- **Priority System**: Handle overlapping notifications with priority levels.
- **Accessible**: keyboard support (Escape to close), and polite live regions.
- **Async Support**: Show loading states and update based on promises.
- **No Dependencies**: Lightweight and works with React 16+.

## Usage

### Basic Setup

Wrap your application with `SnackbarProvider` to enable snackbars globally.

```jsx
import React from "react";
import { SnackbarProvider } from "react-snackify";
import "react-snackify/styles/snack-bar.css";

function App() {
  return (
    <SnackbarProvider globalPosition="bottom-center">
      {/* Your app components */}
    </SnackbarProvider>
  );
}

export default App;
```

### Showing a Snackbar

Use the `useSnackbar` hook inside a component to show notifications.

```jsx
import React from "react";
import { useSnackbar } from "react-snackify";

function MyComponent() {
  const { showSnackbar } = useSnackbar();

  const handleClick = () => {
    showSnackbar({
      message: "This is an info message!",
      variant: "info",
      duration: 3000,
    });
  };

  return <button onClick={handleClick}>Show Snackbar</button>;
}
```

### SnackbarProvider Props

| Prop             | Type                                                                                                      | Default     | Description                                            |
| ---------------- | --------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------ |
| `children`       | `React.ReactNode`                                                                                         | -           | The content to wrap (your app).                        |
| `globalPosition` | `'top-left' \| 'top-right' \| 'top-center' \| 'bottom-left' \| 'bottom-right' \| 'bottom-center'`         | -           | Default position for all snackbars.                    |
| `animationType`  | `'fade' \| 'slide' \| 'scale' \| 'grow'`                                                                  | `'slide'`   | Animation style for entering/exiting.                  |
| `styleVariant`   | `'default' \| 'neon-glow' \| 'holographic' \| 'bold-monochrome' \| 'vintage-paper' \| 'glassmorphism'`    | `'default'` | Visual theme for snackbars.                            |
| `iconSet`        | `{ success?: ReactNode; error?: ReactNode; warning?: ReactNode; info?: ReactNode; loading?: ReactNode; default?: ReactNode; }` | -           | Custom icons for each variant (falls back to default). |
| `maxSnack`       | `number`                                                                                                  | `5`         | Maximum number of snackbars displayed simultaneously.

### showSnackbar Options

The `showSnackbar` function returns a controller with `update` and `close` methods.

| Option      | Type                                                                                              | Default                     | Description                                      |
| ----------- | ------------------------------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------ |
| `id`        | `string`                                                                                          | Auto-generated              | Unique identifier for updating/closing.          |
| `classname` | `string`                                                                                          | `''`                        | Additional CSS classes for the snackbar.         |
| `message`   | `string \| React.ReactNode`                                                                       | -                           | The content to display.                          |
| `variant`   | `'success' \| 'error' \| 'warning' \| 'info' \| 'loading'`                                        | `'info'`                    | Notification type (affects color/icon).          |
| `position`  | `'top-left' \| 'top-right' \| 'top-center' \| 'bottom-left' \| 'bottom-right' \| 'bottom-center'` | Provider's `globalPosition` | Placement on screen.                             |
| `duration`  | `number`                                                                                          | `3000`                      | Time in ms before auto-dismiss (0 for infinite). |
| `action`    | `SnackbarAction \| SnackbarAction[]`                                                              | -                           | Button(s) with label, onClick, icon, etc.        |
| `priority`  | `number`                                                                                          | `0`                         | Higher priority replaces existing with same ID.  |
| `autoMorph` | `{ to?: SnackbarShowOptions; after?: number; }`                                                   | -                           | Transform to new options after a delay.          |

#### SnackbarAction Interface

| Field         | Type              | Default | Description                 |
| ------------- | ----------------- | ------- | --------------------------- |
| `label`       | `string`          | -       | Button text.                |
| `onClick`     | `() => void`      | -       | Click handler.              |
| `autoDismiss` | `boolean`         | `true`  | Close snackbar after click. |
| `ariaLabel`   | `string`          | Label   | Accessibility label.        |
| `icon`        | `React.ReactNode` | -       | Optional icon before label. |

### Advanced Examples

#### Custom Icons and Styles

```jsx
import React from "react";
import { SnackbarProvider } from "react-snackify";

<SnackbarProvider
  globalPosition="bottom-center"
  animationType="grow"
  styleVariant="neon-glow"
  iconSet={{
    success: <img src="/success-icon.svg" alt="Success" />,
    error: <span>❌</span>,
    warning: <span>⚠️</span>,
    info: <span>ℹ️</span>,
    default: <span>🔔</span>,
  }}
>
  {/* App */}
</SnackbarProvider>;
```

#### With Actions

```jsx
import { useSnackbar } from "react-snackify";

const { showSnackbar } = useSnackbar();

showSnackbar({
  message: "Action required!",
  variant: "warning",
  action: [
    {
      label: "Undo",
      onClick: () => console.log("Undo clicked"),
      icon: <span>↩️</span>,
    },
    {
      label: "Dismiss",
      onClick: () => console.log("Dismissed"),
      autoDismiss: true,
    },
  ],
});
```

#### Async Updates

```jsx
import { useSnackbar } from "react-snackify";

const { showSnackbar } = useSnackbar();

const handleAsync = async () => {
  const snack = showSnackbar({
    message: "Uploading...",
    variant: "info",
    duration: 0, // Infinite until updated
  });
  try {
    await someApiCall();
    snack.update({
      message: "Upload complete ✅",
      variant: "success",
      duration: 3000,
    });
  } catch {
    snack.update({
      message: "Upload failed ❌",
      variant: "error",
      duration: 4000,
    });
  }
};
```

#### AutoMorph Example

```jsx
import { useSnackbar } from "react-snackify";

const { showSnackbar } = useSnackbar();

showSnackbar({
  message: "Processing...",
  variant: "info",
  autoMorph: {
    after: 3000,
    to: {
      message: "Upload complete ✅",
      variant: "success",
      duration: 3000,
    },
  },
});
```

## Contribute

If you find this useful, star the repo!  
Suggestions and PRs are welcome — check the [Contributing Guide](./CONTRIBUTING.md) for details.

## License

This project is licensed under the [MIT License](./LICENSE).
