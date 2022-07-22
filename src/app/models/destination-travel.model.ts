import { v4 as uuid} from 'uuid';

export class DestinationTravel {
    private selected: boolean;
    public service: string[];
    id = uuid();

    constructor(public name:string, public url:string, public votes: number = 0){ 
        this.service = ["pileta", "desayuno"];
    }

    isSelected(): boolean {
        return this.selected;
    }

    setSelected(s: boolean) {
       this.selected = true; 
    }

    voteUp(): any {
        this.votes++;
    }

    voteDown(): any {
        this.votes--;
    }
}