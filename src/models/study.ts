import {Form} from "./form";

export class Study {
  id: number;
  name: string;
  forms: Form[];

  constructor(id: number, name: string, forms: Form[]) {
    this.id = +id;
    this.name = name;
    this.forms = forms;
  }
}

