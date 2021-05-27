const express = require('express');
const app = express();
const RouterOSClient = require("routeros-client").RouterOSClient;
const cors = require('cors')
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json()

//Koneksi Mikrotik
const data =[];

const api = new RouterOSClient({
    host: "192.168.43.212",
    user: "admin",
    password: ""
})

//Login Mikrotik
app.route('/login').post((req, res) => {
    const ipaddress = req.body.ipaddress;
    const username = req.body.username;
    const password = req.body.password;

    data[0] = ipaddress;
    data[1] = username;
    data[2] = password;

    if(api.isConnected) {
        console.log("connect");
    }
});

app.use(cors())


//Read Ether
// api.connect().then((client) => {
//     const addressMenu = client.menu("/interface");

//     addressMenu.get().then((addresses) => {
//         console.log(addresses);
//         app.get('/', function(req, res){
//             res.json(addresses);
//         });
//         api.close()
//     }).catch((err) => {
//         console.log(err);
//     });

// }).catch((err) => {
//     console.log(err);
// });


//Add PPP Profile
app.post('/ppp-profile', jsonParser, (req, res) => {
    api.connect().then((client) => {
        const addressMenu = client.menu("/ppp profile");

        addressMenu.add({
            name: req.body.name,
            localAddress: req.body.localAddress,
            remoteAddress: req.body.remoteAddress,
            bridge: req.body.bridge,
            rateLimit: req.body.rateLimit

        }).then((value) => {

            console.log(value);
                res.json(value);
            api.close();
        }).catch((err) => {
            console.log(err);
        });

    }).catch((err) => {
        console.log(err);
    });
})


//Add PPP Secret
// api.connect().then((client) => {
//     const addressMenu = client.menu("/ppp secret");

//     addressMenu.add({
//         name: "cobainsert1",
//         password: "cobainsert1"
//     }).then((addresses) => {

//         console.log(addresses);
//         app.get('/', function(req, res) {
//             res.json(addresses);
//         });
//         api.close();
//     }).catch((err) => {
//         console.log(err);
//     });

// }).catch((err) => {
//     console.log(err);
// });


//Add User Hotspot
// api.connect().then((client) => {
//     const addressMenu = client.menu("/ip hotspot user");

//     addressMenu.add({
//         name: "firman123",
//         password: "firman123"
//     }).then((addresses) => {

//         console.log(addresses);
//         app.get('/', function(req, res) {
//             res.json(addresses);
//         });
//         api.close();
//     }).catch((err) => {
//         console.log(err);
//     });

// }).catch((err) => {
//     console.log(err);
// });


//Update PPP Profile
app.put('/ppp-profile/:id', jsonParser, (req, res) => {
    api.connect().then((client) => {
        const addressMenu = client.menu("/ppp profile");

        addressMenu.where(".id", req.params.id).update({
            name: req.body.name,
            localAddress: req.body.localAddress,
            remoteAddress: req.body.remoteAddress,
            bridge: req.body.bridge,
            rateLimit: req.body.rateLimit

        }).then((value) => {

            console.log(value);
                res.json(value);
            api.close();
        }).catch((err) => {
            console.log(err);
        });

    }).catch((err) => {
        console.log(err);
    });
})


//Delete PPP Profile
app.delete('/ppp-profile/:id', (req, res) => {
    api.connect().then((client) => {
        const addressMenu = client.menu("/ppp profile");

        addressMenu.where("id", req.params.id).remove().then((value) => {

            console.log("sukses delete");
                res.send("sukses delete");
            api.close();
        }).catch((err) => {
            console.log(err);
        });

    }).catch((err) => {
        console.log(err);
    });
})


//Read All Hotspot User
// api.connect().then((client) => {
//     const addressMenu = client.menu("/ip hotspot user/print");

//     addressMenu.get().then((addresses) => {
//         console.log(addresses);
//         app.get('/', function(req, res){
//             res.json(addresses);
//         });
//         api.close()
//     }).catch((err) => {
//         console.log(err);
//     });

// }).catch((err) => {
//     console.log(err);
// });


//Read All PPP Profile
app.get('/ppp-profile', (req, res) => {
    api.connect().then((client) => {
        const addressMenu = client.menu("/ppp profile/print");

        addressMenu.get().then((value) => {
            console.log(value);
            res.json(value);
            api.close()
        }).catch((err) => {
            console.log(err);
        });

    }).catch((err) => {
        console.log(err);
    });
})


//Read All System User
// app.get('/system-user', (req, res) => {
//     api.connect().then((client) => {
//         const addressMenu = client.menu("/user/print");

//         addressMenu.get().then((value) => {
//             console.log(value);
//             res.json(value);
//             api.close()
//         }).catch((err) => {
//             console.log(err);
//         });

//     }).catch((err) => {
//         console.log(err);
//     });
// })


//Read All Bridge
app.get('/interface-bridge', (req, res) => {
    api.connect().then((client) => {
        const addressMenu = client.menu("/interface bridge");

        addressMenu.get().then((value) => {
            console.log(value);
                res.json(value);
            api.close();
            api.connect();
        }).catch((err) => {
            console.log(err);
        });

    }).catch((err) => {
        console.log(err);
    });
})


app.listen(3000);