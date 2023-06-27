export interface ContactModel {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
}

export const INIT_CONTACT_VALUES: ContactModel = {
  id: '',
  name: '',
  email: '',
  phone: '',
};
