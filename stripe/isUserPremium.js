export default async function isUserPremium(user) {
  if (user) {
    await user.getIdToken(true);
    const decodedToken = await user.getIdTokenResult();
    const stripeRole = decodedToken.claims.stripeRole;
    return Boolean(stripeRole);
  } else {
    return false;
  }
}
