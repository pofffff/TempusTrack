import { SignInScreen, SignUpScreen } from '../screens';

import { ScreenLayout } from './_common';
import { useState } from 'react';

export const AuthSceneView: React.FC = () => {
  const [signUp, setSignUp] = useState<boolean>(false);

  return (
    <ScreenLayout>
      {signUp ? (
        <SignUpScreen setSignUp={setSignUp} />
      ) : (
        <SignInScreen setSignUp={setSignUp} />
      )}
    </ScreenLayout>
  );
};
