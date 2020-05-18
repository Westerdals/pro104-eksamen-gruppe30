//Velgere
const memberInput = document.querySelector('.memberInput');
const memberButton = document.querySelector('.memberButton');
const memberList = document.querySelector('.memberList');

//Eventlyttere
document.addEventListener('DOMContentLoaded', getMembers);
memberButton.addEventListener('click', addMember);

//Funksjoner
function addMember(event){
    //Gjør at siden ikke refresher
    event.preventDefault();
    //member div
    const memberDiv = document.createElement('div');
    memberDiv.classList.add('member');
    //Lake li elementer
    const newMember = document.createElement('li');
    newMember.innerText = memberInput.value
    newMember.classList.add('memberItem');
    memberDiv.appendChild(newMember);
    //Legg til member til localstorage
    saveLocalMembers(memberInput.value);
    //Append til listen
    memberList.appendChild(memberDiv);
    //Slett member input value
    memberInput.value = "";
}

function saveLocalMembers(member){
    //sjekk om den er fylt
    let members;
    if(localStorage.getItem("members") === null){
        members = [];
    } else {
        members = JSON.parse(localStorage.getItem("members"));
    }

    members.push(member);
    localStorage.setItem("members", JSON.stringify(members));
}

function getMembers(){
    let members;
    if(localStorage.getItem("members") === null){
        members = [];
    } else {
        members = JSON.parse(localStorage.getItem("members"));
    }
    members.forEach(function(member){
    //Member div
    const memberDiv = document.createElement('div');
    memberDiv.classList.add('member');
    //Lage li elementer
    const newMember = document.createElement('li');
    newMember.innerText = member;
    newMember.classList.add('memberItem');
    memberDiv.appendChild(newMember);
    //Append til listen
    memberList.appendChild(memberDiv);
    })
}
function removeLocalMembers(member){

    let members;
    if(localStorage.getItem("members") === null){
        members = [];
    } else {
        members = JSON.parse(localStorage.getItem("members"));
    }
    const memberIndex = member.children[0].innerText;
    members.splice(members.indexOf(memberIndex), 1);
    localStorage.setItem('members', JSON.stringify(members));
}
