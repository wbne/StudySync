import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { increment, incrementByAmount } from './slices/counterSlice'
import { setUserId } from './slices/userSlice'
import Button from '@material-ui/core/Button';

//firebase data. do i need to move this?
const firebaseConfig = {
  apiKey: "AIzaSyBBqWSPeiobK_iQoG1Uu6xP9wo-nyZuk6Q",
  authDomain: "northern-carver-259219.firebaseapp.com",
  databaseURL: "https://northern-carver-259219-default-rtdb.firebaseio.com",
  projectId: "northern-carver-259219",
  storageBucket: "northern-carver-259219.appspot.com",
  messagingSenderId: "375236391808",
  appId: "1:375236391808:web:499d4660582744c2718765",
  measurementId: "G-RJ9DZ3CBXZ"
};

//firebase creation and authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = (new GoogleAuthProvider());
//This prevents rerendering of the sign in window
var clicked = false

/*
 * Creates a pop-up window that has the user log into their Google account.
 * If there is data associated with the Google account then the window goes straight to Jitsi
 * Otherwise it will go to the subject page
 */
function signIn(dispatch) {
	if(clicked) {
		return
	}
	clicked = true
	signInWithPopup(auth, provider)
    		.then((result) => {
    		const credential = GoogleAuthProvider.credentialFromResult(result);
   		const token = credential.accessToken;
    		const user = result.user;
		console.log(user.email)
		//TODO: Check to see if the backend has the user data and if it does not, then go to the subject page
		//	Else skip straight to the jitsi page.
		dispatch(increment())
		dispatch(setUserId(user.email))
		//dispatch(incrementByAmount(2))
    	}).catch((error) => {
   		const errorCode = error.code;
   		const errorMessage = error.message;
   		const email = error.email;
   	 	const credential = GoogleAuthProvider.credentialFromError(error);
      	 	clicked = false
  });
	
}

/*
 * Auth component returns a button that executes the signIn method
 */
export default function Auth() {
	const dispatch = useDispatch()
	return (<Button 
			variant="outlined"
			onClick={() => signIn(dispatch)}>
			Sign in with Google
		</Button>)

}
