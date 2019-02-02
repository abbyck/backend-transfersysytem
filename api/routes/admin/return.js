const router = require('express').Router();

const Station = require('../../models/stations');

router.get('/', (req, res) => {
    Promise.all([
        Station.findOne({ _id: req.query.current }),
        Station.findOne({ _id: req.query.code1 }),
        Station.findOne({ _id: req.query.code2 }),
        Station.findOne({ _id: req.query.code3 }),
    ]).then(([curr, stat1, stat2, stat3]) => {
        var out = {
            current: {
                id: curr._id,
                name: curr.name,
                statCode: curr.statCode,
                vacancy: curr[req.query.designation],
            },
            first: {
                id: curr._id,
                name: stat1.name,
                statCode: stat1.statCode,
                vacancy: stat1[req.query.designation],
            },
            second: {
                id: curr._id,
                name: stat2.name,
                statCode: stat2.statCode,
                vacancy: stat2[req.query.designation],
            },
            third: {
                id: curr._id,
                name: stat3.name,
                statCode: stat3.statCode,
                vacancy: stat3[req.query.designation],
            },
        };
        console.log(out);
        res.status(200).json(out);
    });
});

module.exports = router;
