export default interface HelpRequestBody {
  emailSubject: string,
  emailType: EmailTypes[],
  complainType:number;
  emailText: string
};

export interface EmailTypes {
  id: number;
  text: string;
}
