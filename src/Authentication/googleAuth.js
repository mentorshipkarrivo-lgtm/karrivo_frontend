import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth}  from "../../firebase"

const provider = new GoogleAuthProvider();

export const googleLogin = async () => {
  const result = await signInWithPopup(auth, provider);

  const user = result.user;

  // 🔥 Get token (IMPORTANT for backend)
  const token = await user.getIdToken();

  return { user, token };
};