class ExpressErr extends Error{
    constructor(name,status,message){
        super();
        this.name = name||"Error";
        this.status = status;
        this.message = message;
    }
}
export default ExpressErr;
       