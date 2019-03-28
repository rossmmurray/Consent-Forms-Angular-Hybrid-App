import {form} from "./form";

export class Study {
  id: number;
  name: string;
  forms: [form];

  constructor(id: number, name: string, forms: [form]) {
    this.id = id;
    this.name = name;
    this.forms = forms;
  }
}

