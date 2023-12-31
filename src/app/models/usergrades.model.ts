export class UserGrades {
    id: number = 0;
    username: string = "";
    password?: string ="";
    role: string="";
    passwordHash: string="";
    lastScorePseudocod?: number = 0;
    maxScorePseudocod?: number = 0;
    pseudocodPassed?: boolean = false;
    lastScoreCpp?: number = 0;
    maxScoreCpp?: number = 0;
    cppPassed?: boolean = false;
    lastScoreBD?: number = 0;
    maxScoreBD?: number = 0;
    bdPassed?: boolean = false;
    lastScoreAE?: number = 0;
    maxScoreAE?: number = 0;
    aePassed?: boolean = false;
    lastScoreTB?: number = 0;
    maxScoreTB?: number = 0;
    tbPassed?: boolean = false;
    lastScoreTU?: number = 0;
    maxScoreTU?: number = 0;
    tuPassed?: boolean = false;
    lastScoreSC?: number = 0;
    maxScoreSC?: number = 0;
    scPassed?: boolean= false;
    lastScoreRec?: number = 0;
    maxScoreRec?: number = 0;
    recPassed?: boolean = false;
}