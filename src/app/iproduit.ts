export interface IProduit {
    id_biere:string | number;
    nom:string;
    brasserie: string;
    description?:string;
    image?:string;
    date_ajout?:string;
    date_modif?:string;
    note_moyenne?:number;
    note_nombre?:number;
}
