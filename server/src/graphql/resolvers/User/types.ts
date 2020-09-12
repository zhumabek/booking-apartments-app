export interface SignInArgs {
  input: { email: string, password: string};
}

export interface SignUpArgs {
  input: { email: string, password: string, firstName: string, lastName: string };
}


