
export interface Body {
  students: Student[];
}

export interface Student {
  id: Number;
  numero: number;
  speciality: Speciality;
  semestre:Semestre;
  nom: string;
  gmail:string;
  tel:string;
  prenom: string;
  gender: string;
  image:String
  dateNaissance: string;
  resultatSemestre: string;
  codeSemestre: string;
  titreSemestre: string;
  noteSemestre: number;
  modules: Module[];
  collegeYear:CollegeYear;
}

export interface Module {
  id: Number;
  code: string;
  titre: string;
  note: number;
  resultat: string;
  elements: Element[];
  specialit:Speciality;
  semestre:Semestre;
}

export interface Element {
  id: Number;
  code: string;
  titre: string;
  note: number;
  bareme: number;
  ponderation: number;
  module:Module;
  teacher:Prof;
}

export interface Speciality {
  id: Number;
  code: string;
  titre: string;
}
export interface Departement {
  id: Number;
  code: string;
  titre: string;
  specialityList:Speciality[];
  teachers:Prof[];
}
export interface User{
  id:string;
  username: string;
  email:string;
  roles:[
    {
      roleName: string
    }
  ]
}

export interface Absence{
  id: Number;
  date: Date;
  student: Student;
  element: Element;
  justified: boolean;
  justification:Justification[];
}

export interface Justification{
  id:Number;
  document: string;
  absence:Absence;

}
export interface Prof{
  cin: String;
  nom: string;
  prenom: string;

}
export interface Semestre{
  id: Number;
  code: string;
  titre: string;
  students:Student [];
  modules:Module [];
}

export interface CollegeYear {
  id: number;
  collegeYear:string;
  students:Student [];
}

export interface Etudiant {
  id: number;
  numero:string;
  nom: string;
  prenom: string;
  dateNaissance: Date;
  speciality: Speciality;
  semestre:Semestre;
  isAbscent: boolean;
  justifie:boolean;
} 