// import {FormDisplay} from "./form-display";

export class Consent {
  formData: string;
  pid: number;
  studyId: number;
  userId: number;

  constructor(formData: string, pid: number, studyId: number, userId: number) {
    this.formData = formData;
    this.pid = pid;
    this.studyId = studyId;
    this.userId = userId;
  }
}
