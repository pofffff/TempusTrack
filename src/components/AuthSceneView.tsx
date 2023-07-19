import { useState } from 'react'
import { SignInScreen, SignUpScreen } from '../screens'

export const AuthSceneView: React.FC = () => {
  const [signUp, setSignUp] = useState<boolean>(false)

  return signUp ? (
    <SignUpScreen setSignUp={setSignUp} />
  ) : (
    <SignInScreen setSignUp={setSignUp} />
  )
}
