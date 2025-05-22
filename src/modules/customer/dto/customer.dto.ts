
export class CreateCustomerDto {
  name: string;
  addres: string;
  city: string;
  state: string;
}

export class UpdateCustomerDto {
  name?: string;
  addres?: string;
  city?: string;
  state?: string;
}
