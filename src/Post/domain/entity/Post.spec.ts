import { Post } from "./Post";
describe("Post Entity", () =>{

    let category: string;
    let content: string;
    let userid: string;
    let userName: string;

    const init = ()=>{
        return new Post({
            category,
            content,
            userid,
            userName,
        });
    }

    beforeEach( ()=> {
        category = "rental";
        content = "Looking for a room for a family";
        userid = "111";
        userName = "Dummy";
    })



    it("should create valid post", () =>{       
        const post = init();    
        expect(post.isValidObject()).toMatchObject({valid: true});
    })

    
    it("should detect empty content", () =>{
        content="";
        const post = init();
        expect(post.isValidObject()).toMatchObject({valid: false});
        //Altrenative way to test
        //expect(post.isValidObject()).toHaveProperty("valid", false);
    })

    it("should detect empty category", () =>{
        category="";
        const post = init();
        expect(post.isValidObject()).toMatchObject({valid: false});
    })
    
    it("should detect Invalid User ID", () =>{
        userid="";
        const post = init();
        expect(post.isValidObject()).toMatchObject({valid: false});
    })

});