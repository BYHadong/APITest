//p
const list = document.getElementById("list");
const insertData = document.getElementById("insertData");
const updateData = document.getElementById("updateData");

//input
const name = document.getElementById("name");
const ps = document.getElementById("passwd");
const inputUpdateData = document.getElementById("inputUpdateData");

//Button
const button = document.getElementById("button");
const addButton = document.getElementById("add");
const deleteButton = document.getElementById("delete");
const createButton = document.getElementById("create");
const updateButton = document.getElementById("update");

//select
const selectData = document.getElementById("optionSelect");

const rootUrl = "http://apitest.com/";

button.onclick = () => {
    const data = fetch(rootUrl + "users", {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return res.json();
        })
        .then((myjson) => {
            console.log(myjson);
            const jData = JSON.stringify(myjson);
            list.innerHTML = userDataSelectFromDataFormat(jData);
        }).catch((error) => {
            console.log(error);
        });
};

addButton.onclick = () => {
    const nameData = name.value;
    const passwdData = ps.value;
    if (nameData != "" && passwdData != "") {
        const userData = { nickName: nameData, passwd: passwdData };
        const data = fetch(rootUrl + "users/insert", {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then((res) => {
                return res.json();
            }).then((myjson) => {
                const jData = JSON.stringify(myjson);
                insertData.innerHTML = jData;
            }).catch((error) => {
                insertData.innerHTML = error;
            });
    } else {
        alert(`input Data nameData, passwdData`);
    }
};

deleteButton.onclick = () => {
    const nameData = name.value;
    const passwdData = ps.value;
    if (nameData != "" && passwdData != "") {
        const userData = { nickName: nameData, passwd: passwdData };
        const data = fetch(rootUrl + "users/remove", {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then((res) => {
                return res.json();
            }).then((myjson) => {
                fetch(rootUrl + "users", {
                    method: 'GET',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((myjson) => {
                        console.log(myjson);
                        const jData = JSON.stringify(myjson);
                        list.innerHTML = userDataSelectFromDataFormat(jData);
                    }).catch((error) => {
                        console.log(error);
                    });
                insertData.innerHTML = JSON.stringify(userData) + "<br>Delete OK";
            }).catch((error) => {
                insertData.innerHTML = error;
            });
    } else {
        alert(`input Data nameData, passwdData`);
    }
};

createButton.onclick = () => {
    const data = fetch(rootUrl + "users/create", {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return res.json();
        }).then((myjson) => {
            const jData = JSON.stringify(myjson);
            list.innerHTML = jData;
        }).catch((error) => {
            list.innerHTML = error;
        });
};

updateButton.onclick = () => {
    const target = selectData.value;
    const inputUpdateDataValues = inputUpdateData.value;
    const nameData = name.value;
    const passwdData = passwd.value;
    let bodyData = {};
    if (target == "nickName") {
        bodyData = {
            options: target,
            prevNickNameData: nameData,
            nickName: inputUpdateDataValues
        }
        console.log("Body Data");
        console.log(bodyData);
    }
    else if (target == "passwd") {
        bodyData = {
            options: target,
            prevPasswdDataData: passwdData,
            passwd: inputUpdateDataValues
        }
        console.log("Body Data");
        console.log(bodyData);
    }
    else {
        alert("어떤 값을 업데이트 할지 선택해 주세요.");
        return;
    }
    const data = fetch(rootUrl + "users/update", {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    })
        .then((res) => {
            return res.json();
        }).then((myjson) => {
            const jData = JSON.stringify(myjson);
            updateData.innerHTML = jData;
        }).catch((error) => {
            updateData.innerHTML = error;
        });
};

function userDataSelectFromDataFormat(jsonData) {
    return jsonData.replace(/},/g, '},<br>');
}
