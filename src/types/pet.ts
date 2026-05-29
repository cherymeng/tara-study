export type PetMood =
    | "happy"
    | "normal"
    | "excited";

export interface Pet {
    id: string;

    name: string;

    level: number;

    mood: PetMood;
}
