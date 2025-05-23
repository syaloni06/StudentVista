# StudentVista
The Student Management Dashboard is a modern, responsive web application built with React that allows users to manage a list of students efficiently. It integrates Firebase Authentication for secure access control and simulates real-world API behavior using mock data. Users can view, filter, and if logged in then able to add student records through a simple, clean interface. This application is ideal for small institutions, educators, or admin tools where basic student management is needed without a full backend setup.
## Features
1. **Firebase Auth:** Secure login via Email/Password or Google to unlock protected actions.
2. **Mock API Integration:** Simulates real API calls for smooth data fetching using Axios or timeout.
3. **Add Student:** Authenticated users can add students via a validated form.
4. **Filter by Course:** Instantly filter students based on their enrolled course.
5. **Responsive Design:** Seamlessly adapts across mobile, tablet, and desktop using Tailwind or CSS Modules.
## Setup and Installation
1. `Clone` the Repository
``` bash
git clone https://github.com/syaloni06/StudentVista.git
cd StudentVista
```
2. Install Dependencies
- Ensure you have `Node.js` and `npm` installed.
``` bash
npm install
```
3. Start the development server
- This will open the application in your default browser at http://localhost:5173/
``` bash
npm run dev
```
## Usage
1. **Landing Page:** Student list is fetched from mock API on load.
2. **Filter:** Users can filter students by course from a dropdown.
3. **Login:** Click "Login" to sign in via Firebase if not authenticated.
4. **Add Student:** Only visible if logged in. Submits a form with validation.
5. **View Details:** Clicking a student to shows more info, gated behind login.
## Project Demo
### Deployed Link - https://studentvista.netlify.app/
![Preview](https://github.com/user-attachments/assets/3939373e-7595-40c9-b844-930ae939d13e)