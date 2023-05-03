interface Data {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

export interface State {
  loading: boolean;
  data: Data[];
  error: string | null;
}
