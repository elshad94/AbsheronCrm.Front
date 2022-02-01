export interface RezidentUser {
  UVoen: string;
  UCustname: string;
  UPersonname: string;
  UPersonsurname: string;
  UPhone: string;
  UEmail: string;
  UPassword: string;
  UTerms: boolean;
  FIN: string;
  FileResponseDto?: FileResponseDto;
}

export interface FileResponseDto {
  BankRekFile: string;
  ReyesterFile: string;
  EtibarFile: string;
}
