const Sequelize = require('sequelize');
const database = require('./db');

const User = database.define(
    'Users',
    {
        user_id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        nickname: {
            type: Sequelize.TEXT
        },
        passwd: {
            type: Sequelize.TEXT
        }
    },
    { 
        timestamps: true,
    }
);

User.readAll = async (req, res) => {
    try{
        const users = await User.findAll()
        .catch((err) => {
            console.log(err);
        });
        res.send(users);
    } catch(error) {
        res.send(error);
    }
};

User.insertData = async (req, res) => {
    try {
        const nickNameData = req.body.nickName;
        const passwdData = req.body.passwd;
        const insertdata = await User.create({
            nickname: nickNameData, 
            passwd: passwdData
        });
        res.send(insertdata);
    } catch(error){
        console.log(error);
        res.send(error);
    }
};

User.deleteData = async (req, res) => {
    try{
        const nickNameData = req.body.nickName;
        const passwdData = req.body.passwd;
        const idData = req.body.id;
        const deleteData = await User.destroy({
            where : {
                user_id: idData,
                nickname: nickNameData,
                passwd: passwdData
        }});        
        const sequenceRestart = await database.sequelize.query(`ALTER SEQUENCE "Users_user_id_seq" RESTART WITH ${Number(idData) + 1}`);
        res.send({
            restart: JSON.stringify(sequenceRestart),
            data: JSON.stringify(deleteData)
        });
    } catch(error){
        console.log(error);
        res.send(error);
    }
};

User.updateData = async (req, res) => {
    try{
        const options = req.body.options;
        if(options == "nickName"){
            const prevNickNameData = req.body.prevNickNameData;
            const nickNameData = req.body.nickName;
            const updateData = await User.update({
                nickname: nickNameData
            }, {
                where: {
                    nickname: prevNickNameData
                },
                returning: true
            });
            res.send(updateData);
        }else if(options == "passwd"){
            const prevPasswdDataData = req.body.prevPasswdDataData;
            const passwdData = req.body.passwd;
            const updateData = await User.update({
                passwd: passwdData
            }, {
                where: {
                    passwd: prevPasswdDataData
                },
                returning: true
            });
            res.send(updateData);
        }
    } catch(error){
        console.log(error);
        res.send(error);
    }
};

module.exports = User;