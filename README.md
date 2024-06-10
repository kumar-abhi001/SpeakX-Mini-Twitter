Follow these steps to set up and run the project locally:

Clone the Repository:
git clone https://github.com/your-username/SpeakX-Mini-Twitter.git
cd SpeakX-Mini-Twitter

Environment Variables: Create a .env file in the root directory with the following content:
MONGODB_URI=your_mongoDB_URI
PORT=3000
ACCESS_TOKEN_SECRET=VnkUVNK56HaNF0rswnFLV
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=sxye8342825034FLend
REFRESH_TOKEN_EXPIRY=10d
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

Backend Setup:
Change the CORS origin policy in the backend to allow requests from your frontend (e.g., http://localhost:3000).
Install dependencies and start the server:
npm install
npm start

Frontend Setup:
Update the backend URL in the constants.js file in your frontend code.
Install frontend dependencies and start the development server:
cd frontend
npm install
npm run dev

Usage:
Implement a user registration and authentication system.
2. Users should be able to register with a unique username and password.
3. Users should be able to log in and log out.
4. Implement authentication using JWT (JSON Web Tokens).
5. Design and implement the database schema using MongoDB to store user data, tweets
and follower information.
6. Create, edit, and delete tweets.
7. View the timeline, which displays tweets from followed users in chronological order.
