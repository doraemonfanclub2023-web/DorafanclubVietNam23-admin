if (!localStorage.getItem("members")) {

localStorage.setItem(
"members",
JSON.stringify([
{
id:"TV001",
name:"Nguyễn Thị Thảo Nhi",
role:"BQT"
},
{
id:"TV002",
name:"Khánh Duy",
role:"ADMIN"
}
])
);

}

function getMembers(){
return JSON.parse(
localStorage.getItem("members")
);
}

function saveMembers(data){
localStorage.setItem(
"members",
JSON.stringify(data)
);
}
