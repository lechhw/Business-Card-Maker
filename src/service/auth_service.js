import { firebaseAuth, gitHubProvider, googleProvider } from './firebase';

class AuthService {
  login(providerName) {
    const provider = this.getProvider(providerName);
    return firebaseAuth.signInWithPopup(provider);
  }

  logout() {
    firebaseAuth.signOut();
  }

  loginAnonymously() {
    return firebaseAuth.signInAnonymously();
  }

  onAuthChange(onUserChange) {
    firebaseAuth.onAuthStateChanged((user) => {
      onUserChange(user);
    });
  }

  getProvider(providerName) {
    switch (providerName) {
      case 'Google':
        return googleProvider;
      case 'Github':
        return gitHubProvider;
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}

export default AuthService;
