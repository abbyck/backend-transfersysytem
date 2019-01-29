const router = require('express').Router();
const User = require('../../models/user');
const moment = require('moment');
const Station = require('../../models/stations');

// Auth
const CheckAuth = require('../../middleware/check-auth');

router.get('/', CheckAuth, (req, res) => {
    Station.find({}, 'statCode name -_id', function(err, stations) {
        return stations;
    }).then(stations => {
        var stationMap = {};
        stations.forEach(function(station) {
            stationMap[station.statCode] = station;
        });
        console.log(stationMap['123'].name);
        console.log(stationMap);
        User.findOne({ penno: req.user.penno }, function(err, result) {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (result) {
                var date = new Date('' + result.lastTransferDate);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var dt = date.getDate();

                if (dt < 10) {
                    dt = '0' + dt;
                }
                if (month < 10) {
                    month = '0' + month;
                }

                var a = moment(year + '-' + month + '-' + dt);
                var b = moment();

                var years = b.diff(a, 'year');

                var genstats = false;
                if (years >= 3) {
                    genstats = true;
                }
                return res.status(200).json({
                    penno: result.penno,
                    name: result.name,
                    designation: result.designation,
                    joinDate: result.joinDate,
                    currentStation: stationMap[result.currentStation].name,
                    prevStation: {
                        first: stationMap[result.prevStation.first].name,
                        second: stationMap[result.prevStation.second].name,
                        Third: stationMap[result.prevStation.Third].name,
                    },
                    lastTransferDate: result.lastTransferDate,
                    reqTransfer: {
                        op1: stationMap[result.reqTransfer.op1].name,
                        op2: stationMap[result.reqTransfer.op2].name,
                        op3: stationMap[result.reqTransfer.op3].name,
                    },
                    genTransfer: {
                        op1: stationMap[result.genTransfer.op1].name,
                        op2: stationMap[result.genTransfer.op2].name,
                        op3: stationMap[result.genTransfer.op3].name,
                    },
                    genTransStatus: genstats,
                });
            }
            res.status(404).json({
                error: {
                    message: "Profile couldn't be fetched",
                },
            });
        }); //end user
    });
});

module.exports = router;
