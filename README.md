# FrontiersMarket Replica and Chat Widget

This project is a recreation of the [frontiersmarket.com](https://frontiersmarket.com/) homepage as a static website. It also includes a chat widget overlaying the website, displaying ongoing conversations with one or many real persons. Firestore Realtime Database is used to store the conversations, and the chat UI was developed by me. Additionally, a sign-in functionality is implemented, allowing users to sign in with their Google account through Firebase Authentication, or with their email and password.

## Technologies Used

- **Create React App:** Bootstrapped the project using Create React App for quick setup and development.
- **Firebase Auth:** Integrated Firebase Authentication for user authentication.
- **Firebase Realtime Database:** Used Firestore to store and manage ongoing conversations in real-time.
- **Tailwind CSS:** Employed Tailwind CSS for a utility-first approach to styling.
- **React Toastify:** Implemented React Toastify for displaying user-friendly notifications.
- **React Router DOM:** Used React Router DOM for handling navigation within the application.
- **Typescript:** The entire codebase is written in TypeScript for static typing.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/solnoguera/frontiersmarket-challenge.git

cd frontiersmarket-challenge
```

2. Install dependencies:
```bash
npm install
```

3. Run the application:
```bash
npm run start
```

_Note: In a real project, I would __not__ upload the .env file, but in this case, this way it is easier for you to run it locally._

Visit http://localhost:3000 to see the application in action.

## Features
- Homepage replica of frontiersmarket.com.
- Overlay chat widget with ongoing conversations.
- Firestore integration for real-time conversation storage.
- Sign-in functionality with Google account through Firebase Authentication.
## Chat Widget Design
The chat widget is designed to complement the overall look and feel of the frontiersmarket.com homepage. It provides a seamless and user-friendly experience, displaying ongoing conversations clearly.

## Repository Structure
The project repository is organized as follows:

- __src__: Contains the source code of the React application.
- __components__: Reusable React components.
- __error__: Error Boundary HOC.
- __hooks__: Custom hooks useFirebase to store logic.
- __icon__: Icon components.
- __models__: Typescripts models for the app.
- __screens__: React components for different screens (e.g., landing, login, register).
- __utils__: util constants or functions.


## Extra Activity (Optional)
__Google Sign-In:__ Implemented Google Sign-In functionality through Firebase Authentication.
Deadline
The deadline for this project is Monday, EOD (End of Day).

## Created by:
### Sol Noguera
---


Feel free to reach out if you have any questions or need further clarification.

Happy coding! 🚀
