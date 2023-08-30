export class Task {
    title: string;
    description: string;
    userid: number;
    
    constructor(title: string, description: string, userid: number) {
        this.title = title;
        this.description = description;
        this.userid = userid;
    }

    taskIsValid(): { valid: boolean; error?: string } {
        if (!this.title || !this.description) {
          return { valid: false, error: 'Empty or invalid title or description' };
        }
    
        if (this.userid <= 0) {
          return { valid: false, error: 'Invalid userid' };
        }
    
        return { valid: true };
      }
}
