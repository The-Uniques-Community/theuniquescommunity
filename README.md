# Guide for Working in This Project

## import rule 
1. You do not need to import a component located in other folder in src like this
```
   import component from '../../../view/component'
 ```
you should import it like the following  by using '@/' this will target the src folder then you can navigate similarly using '/'
```
import component from '@/view/component'
```
3. The import of the components in routes folder should be done in the following way , you import how ever you want in the view but in th routes where you are writing route for specific please use the following way

```
const component= Loadar(lazy(()=>import("@/view/uniques/coordinator)))
```
P.S import Loader and lazy first in traditional way , it should be already ther if not contact me 😅

## Folder Structure

```
src
└── assets
└── layout
└── redux
└── routes
└── theme
└── utils
└── views
```

### Assets

This folder contains all the images used across the project. Ensure all image assets are organized logically and named descriptively to improve maintainability.

### Layout

The `layout` folder is divided into three sections:

- **Community:** Contains layouts specific to community users.
- **Admin:** Houses layouts meant for admin users.
- **Uniques:** Contains subfolders for layouts specific to **Coordinator** and **Member** roles.

### Layout Explanation

#### Dynamic Navigation

In the layout file, we use a `STUDENT_NAVIGATION` object to dynamically generate navigation links. This is a modular approach, where the navigation object is used to define the items in the sidebar. Each role (e.g., student, admin, coordinator) can have its own specific navigation object by modifying this part of the layout.

Here's an example of the `STUDENT_NAVIGATION` object:

````javascript
const STUDENT_NAVIGATION = [
  { segment: "", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "JobPosting", title: "Post Job", icon: <PublishIcon /> },
  { segment: "profile", title: "Profile", icon: <AccountCircleIcon /> },
  { segment: "applicants", title: "Applicants", icon: <GroupIcon /> },
  {
    segment: "joboffers",
    title: "Manage Offers",
    icon: <AssignmentTurnedInIcon />,
  },
];
```

### Routes

Individual routes have been segregated into separate files to simplify management. These are then combined into a single configuration file for easy access.

**Example:**

```javascript
// File: routes/adminRoutes.js
export const adminRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/users", component: UserManagement },
];

// File: routes/index.js
import { adminRoutes } from "./adminRoutes";

export const allRoutes = [
  ...adminRoutes,
  // Add other route imports here
];
```
# Theme Palette Configuration

This project provides two predefined palettes for light and dark themes, designed to enhance UI consistency and visual appeal. Each palette includes carefully selected colors for primary elements, backgrounds, text, dividers, and actions.

## Light Palette Configuration

### Explanation of Light Palette Colors

- **Primary Colors**
  - **`primary.main` (`#ca0019`)**: Use this bold red color for prominent elements like headings, active tabs, and selected buttons.
  - **`primary.light` (`#fefefe`)**: A lighter white for hover highlights and subtle background effects on interactive elements.
  - **`primary.dark` (`#0d0d0d`)**: A royal shiny black ideal for sidebars, navigation bars, and component containers.

- **Background Colors**
  - **`background.default` (`#ffffff`)**: Set this white as the primary background color for the main application body.
  - **`background.paper` (`#f4f4f4`)**: Use this off-white color for card components, modals, or sections needing separation.
  - **`background.drawer` (`#0d0d0d`)**: Apply this dark color to side navigation drawers or similar components.

- **Text Colors**
  - **`text.primary` (`#000000`)**: Standard black for primary text to ensure high readability.
  - **`text.secondary` (`#555555`)**: Slightly lighter black for subtitles, secondary information, or less emphasized text.
  - **`text.subtext` (`#888888`)**: Medium gray for placeholder text, hints, or descriptions.
  - **`text.disabled` (`#aaaaaa`)**: A light gray for disabled text, such as inactive buttons or inputs.
  - **`text.link` (`#ca0019`)**: Bold red for clickable links and underlined text to grab attention.

- **Action Colors**
  - **`action.hover` (`#f4f4f4`)**: Use this for hover effects on interactive items, like buttons or list items.
  - **`action.selected` (`#f5f5f5`)**: Apply this subtle background to indicate selected states in menus or lists.
  - **`action.disabled` (`#d3d3d3`)**: Use this for disabled buttons or interactive elements to visually differentiate inactive states.
  - **`action.focus` (`#ffebee`)**: A soft highlight for focused elements such as form fields.

### Code Example (Light Palette)
```javascript
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const lightPalette = {
  mode: "light",
  primary: {
    main: "#ca0019",
    light: "#fefefe",
    dark: "#0d0d0d",
  },
  background: {
    default: "#ffffff",
    paper: "#f4f4f4",
    drawer: "#0d0d0d",
  },
  text: {
    primary: "#000000",
    secondary: "#555555",
    subtext: "#888888",
    disabled: "#aaaaaa",
    link: "#ca0019",
  },
  divider: "#e0e0e0",
  action: {
    hover: "#f4f4f4",
    selected: "#f5f5f5",
    disabled: "#d3d3d3",
    focus: "#ffebee",
  },
};

const theme = createTheme({
  palette: lightPalette,
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
        <h1 style={{ color: theme.palette.primary.main }}>Welcome to Light Theme</h1>
        <p style={{ color: theme.palette.text.secondary }}>This is a sample application with a light theme.</p>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

## Dark Palette Configuration

### Explanation of Dark Palette Colors

- **Primary Colors**
  - **`primary.main` (`#cccccc`)**: Use this light gray for prominent elements like headings and active tabs.
  - **`primary.light` (`#fefefe`)**: A very light gray for hover highlights and subtle effects.
  - **`primary.dark` (`#fefefe`)**: A medium gray suitable for component containers or subtle details.

- **Background Colors**
  - **`background.default` (`#121212`)**: Set this deep black as the primary background color for the main application body.
  - **`background.paper` (`#1a1a1a`)**: Use this dark gray for cards and modals.
  - **`background.drawer` (`#1a1a1a`)**: Apply this to side navigation drawers or similar dark containers.

- **Text Colors**
  - **`text.primary` (`#d3d3d3`)**: Use this light gray for primary text to ensure readability.
  - **`text.secondary` (`#888888`)**: Medium gray for subtitles or secondary information.
  - **`text.subtext` (`#aaaaaa`)**: Slightly lighter gray for placeholders, hints, or descriptions.
  - **`text.disabled` (`#555555`)**: A dark gray for disabled text, such as inactive buttons or inputs.
  - **`text.link` (`#ff5252`)**: Vibrant red for clickable links to stand out against the dark background.

- **Action Colors**
  - **`action.hover` (`#444444`)**: Darker background for hover effects on interactive items.
  - **`action.selected` (`#555555`)**: Use this subtle background to indicate selected states in menus or lists.
  - **`action.disabled` (`#2e2e2e`)**: Apply this for disabled components or buttons.
  - **`action.focus` (`#661111`)**: A focused component highlight, providing clear visual feedback.

### Code Example (Dark Palette)
```javascript
export const darkPalette = {
  mode: "dark",
  primary: {
    main: "#cccccc",
    light: "#fefefe",
    dark: "#fefefe",
  },
  background: {
    default: "#121212",
    paper: "#1a1a1a",
    drawer: "#1a1a1a",
  },
  text: {
    primary: "#d3d3d3",
    secondary: "#888888",
    subtext: "#aaaaaa",
    disabled: "#555555",
    link: "#ff5252",
  },
  divider: "#333333",
  action: {
    hover: "#444444",
    selected: "#555555",
    disabled: "#2e2e2e",
    focus: "#661111",
  },
};

const theme = createTheme({
  palette: darkPalette,
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
        <h1 style={{ color: theme.palette.primary.main }}>Welcome to Dark Theme</h1>
        <p style={{ color: theme.palette.text.secondary }}>This is a sample application with a dark theme.</p>
      </div>
    </ThemeProvider>
  );
}
  ```

## Applying Themes Dynamically

To toggle between the light and dark themes dynamically, use a state variable to manage the theme mode and pass the corresponding palette to the `ThemeProvider`.

### Example
```javascript
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightPalette, darkPalette } from "./path-to-palettes";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({ palette: darkMode ? darkPalette : lightPalette });

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
        <h1 style={{ color: theme.palette.primary.main }}>
          {darkMode ? "Dark Mode Active" : "Light Mode Active"}
        </h1>
      </div>
    </ThemeProvider>
  );
}

export default App;
```





### Utils

The `utils` folder contains reusable components shared across the entire application (e.g., buttons, inputs, etc.). Before adding any code here, create an appropriate folder and ensure the component is designed for reusability.

**Example:**

```javascript
// File: utils/Button/Button.js
import React from "react";
import PropTypes from "prop-types";

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
```

### Views

This folder houses all the pages for dashboards, landing pages, and other UI components. Separate folders have been created for each major section.

#### Feel free to ask any questions regarding folder usage or implementation!
