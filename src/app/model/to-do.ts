export class ToDo {

    id: number;
    userID: number;
    title: string;
    description: string;

    constructor(id, userID, title, description) {
        this.id= id;
        this.userID = userID;
        this.title= title;
        this.description= description;
    }
    
}
