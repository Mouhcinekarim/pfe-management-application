
import{GroupPfe} from './GroupPfe'
import{Group} from './groupe'
export interface User extends GroupPfe,Group{
    id: number;
    username: string;
    nom_prof:string;
	prenom_prof:string;
}
