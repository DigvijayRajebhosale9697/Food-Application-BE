import express from 'express';
const router = express.Router();

router.post('/FoodData', (req, res) => {
    try {
        console.log(globalThis.Fooditems)
        res.send([globalThis.Fooditems,globalThis.FoodCategory])
    } catch (error) {
        console.log(error.message)
        res.send("SERVER ERROR")
    }
})

export default router;