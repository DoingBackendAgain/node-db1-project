const express =require("express")
const db = require("./data/dbConfig")

const router = express.Router()

router.get("/", async (req, res, next)=> {
    try{
        const accounts = await db.select("*")
        .from("accounts")
        res.json(accounts)

    }
    catch(err){
        next(err)
    }
});

router.get("/:id", async (req, res, next)=> {
    try{
    const account = await await db
        .select("*")
        .from("accounts")
        .where("id", req.params.id)
        .limit(1)

        res.json(account)
    }
    catch(err){
        next(err)
    }
})

router.post("/", async (req, res, next)=> {
    try{
        newAccount= {
            name: req.body.name,
            budget: req.body.budget
        }

        if(!newAccount.name || !newAccount.budget){
            return res.status(404).json({
                message: "name and budget are required"
            })
        }

        const [id] = await db
            .insert(newAccount)
            .into("accounts")
        const account = await db
            .select("*")
            .from("accounts")
            .where("id", id)

        res.status(201).json(account)

    }
    catch(err){
        next(err)
    }
})

router.put("/:id", async (req, res, next)=> {
    try{
        const change = {
            name: req.body.name,
            budget: req.body.budget
        }
        if(!change.name || !change.budget){
            return res.status(404).json({
                message: "Need a name and a budget"
            })
        }

        await db("accounts")
            .where("id", req.params.id)
            .update(change)

        const changed = await db
            .select("*")
            .from("accounts")
            .where("id", req.params.id)
        
        res.json(changed)

    }
    catch(err){
        next(err)
    }
})

router.delete("/:id", async (req, res, next)=> {
    try{
        await db("accounts")
            .where("id", req.params.id)
            .del()
        res.status(204).end()
    }
    catch(err){
        next(err)
    }
})

module.exports = router;

