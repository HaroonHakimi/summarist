import { getAuth, getIdToken, getIdTokenResult, User } from 'firebase/auth';

export default async function isUserPremium(): Promise<boolean> {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  if (user) {
    await getIdToken(user, true);
    const decodedToken = await getIdTokenResult(user);

    return decodedToken?.claims?.stripeRole ? true : false;
  } else {
    // Handle the case where there is no authenticated user.
    return false;
  }
}