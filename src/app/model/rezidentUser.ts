export interface RezidentUser {
  USubtype: number;
  UVoen: string;
  UCustname: string;
  UPersonname: string;
  UPersonsurname: string;
  UPhone: string;
  UEmail: string;
  UPassword: string;
  UTerms: boolean;
  UType:number;
  FIN: string;
  FileResponseDto?: FileResponseDto;
}

export interface FileResponseDto {
  BankRekFile: string;
  ReyesterFile: string;
  EtibarFile: string;
}
