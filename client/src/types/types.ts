export interface IcurrentUser {
  email: string;
  name: string;
}

export interface Idata {
  email: string;
  password: string;
}

export interface Iparam {
  currentUser: IcurrentUser | string | null;
  // eslint-disable-next-line no-unused-vars
  login: (data: Idata) => Promise<void>;
  logout: () => void;
  token: string | null;
}

export interface Ierr {
  response: {
    data: {
      error: string;
    };
  };
}
