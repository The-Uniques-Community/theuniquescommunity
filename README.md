# Guide for Working in This Project

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


### Redux

A centralized store is already set up in the `redux` folder. Use this for managing global state instead of creating independent state management solutions.

**Example:**

```javascript
// Importing and using Redux store
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/userSlice';

const ExampleComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const updateUserDetails = () => {
    dispatch(updateUser({ name: 'John Doe', age: 30 }));
  };

  return (
    <div>
      <h1>Hello, {user.name}</h1>
      <button onClick={updateUserDetails}>Update User</button>
    </div>
  );
};
````

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

This project provides two predefined palettes for light and dark themes, designed to enhance UI consistency and visual appeal. Each palette contains carefully chosen colors for primary elements, backgrounds, text, dividers, and actions.

## Light Palette

The light palette is intended for a bright, clean design and focuses on using vibrant colors with subtle contrasts.

```javascript
export const lightPalette = {
  mode: "light",
  primary: {
    main: "#ca0019", // Red for headings
    light: "#fefefe", // Lighter white for hover highlights
    dark: "#0d0d0d", // Royal shiny black for sidebar and components
  },
  background: {
    default: "#ffffff", // White body background
    paper: "#f4f4f4", // Off-white for cards
    appBar: "#ffffff", // Match body for app bars
    drawer: "#0d0d0d", // Royal shiny black for the sidebar
  },
  text: {
    primary: "#000000", // Black for simple text
    secondary: "#555555", // Slightly lighter black for subtext
    subtext: "#888888", // Gray for hints or less emphasis
    disabled: "#aaaaaa", // Disabled text
    link: "#ca0019", // Red for links
  },
  divider: "#e0e0e0", // Divider lines
  action: {
    hover: "#f4f4f4", // Off-white background with black text on hover
    selected: "#f5f5f5", // Selected item background
    disabled: "#d3d3d3", // Disabled component background
    focus: "#ffebee", // Focused element highlight
  },
};
```

### Highlights:

- **Primary Color:** A bold red (#ca0019) for headings and links to emphasize important elements.
- **Backgrounds:** Use a clean white (#ffffff) for the main body and a subtle off-white (#f4f4f4) for cards.
- **Text:** High contrast black for primary text with lighter variations for secondary, subtext, and disabled states.
- **Actions:** Subtle hover and focus effects for interactivity.

## Dark Palette

The dark palette is optimized for low-light environments, offering softer tones and reduced eye strain.

```javascript
export const darkPalette = {
  mode: "dark",
  primary: {
    main: "#cccccc", // Light gray for headings
    light: "#fefefe", // Lighter gray for hover or highlights
    dark: "#fefefe", // Medium gray for other elements
  },
  background: {
    default: "#121212", // Black body background
    paper: "#1a1a1a", // Dark gray for cards
    appBar: "#1a1a1a", // Match body for app bars
    drawer: "#1a1a1a", // Darker gray for the sidebar
  },
  text: {
    primary: "#d3d3d3", // Light gray for simple text
    secondary: "#888888", // Medium gray for subtext
    subtext: "#aaaaaa", // Slightly lighter gray for hints or less emphasis
    disabled: "#555555", // Disabled text
    link: "#ff5252", // Bright red for links
  },
  divider: "#333333", // Divider lines
  action: {
    hover: "#444444", // Darker background with lighter text on hover
    selected: "#555555", // Selected item background
    disabled: "#2e2e2e", // Disabled component background
    focus: "#661111", // Focused component highlight
  },
};
```

### Highlights:

- **Primary Color:** A soft light gray (#cccccc) for headings with a vibrant red (#ff5252) for links.
- **Backgrounds:** Deep blacks and grays provide a sleek, modern feel.
- **Text:** Light gray tones maintain readability without excessive brightness.
- **Actions:** Subtle hover and focus effects ensure usability while maintaining the dark aesthetic.

## Usage

To use these palettes, import them into your project's theme configuration and apply them using a theme provider or similar mechanism.

```javascript
import { lightPalette, darkPalette } from "./path-to-palettes";

const theme = createTheme({
  palette: lightPalette, // Switch to darkPalette for dark mode
});

<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>;
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
