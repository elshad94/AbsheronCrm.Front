export interface RezidentUser {
  UType: number;
  USubtype: number;
  UVoen: string;
  UCustname: string;
  UPersonname: string;
  UPersonsurname: string;
  UPhone: string;
  UEmail: string;
  UPassword: string;
  UConfirmcode: string;
  UTerms: boolean;
  UStatus: number;
  FIN: string;
  FileResponseDto: FileResponseDto;
}

export interface FileResponseDto {
  BankRekFile: string;
  ReyesterFile: string;
  EtibarFile: string;
}
