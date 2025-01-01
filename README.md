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

```javascript
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
  { path: '/dashboard', component: Dashboard },
  { path: '/users', component: UserManagement },
];

// File: routes/index.js
import { adminRoutes } from './adminRoutes';

export const allRoutes = [
  ...adminRoutes,
  // Add other route imports here
];
```

### Theme

The primary theme of the application, including color codes and typography, is defined in the `theme` folder. Both **dark** and **light** modes are supported. You can toggle themes by leveraging `isDarkMode`.

To use the theme, follow this example:

**Example:**

```javascript
import { useTheme } from '@mui/material/styles';

const ExampleComponent = () => {
  const theme = useTheme();

  return (
    <div style={{ color: theme.palette.primary.main }}>
      This text uses the primary theme color.
    </div>
  );
};
```

### Utils

The `utils` folder contains reusable components shared across the entire application (e.g., buttons, inputs, etc.). Before adding any code here, create an appropriate folder and ensure the component is designed for reusability.

**Example:**

```javascript
// File: utils/Button/Button.js
import React from 'react';
import PropTypes from 'prop-types';

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

