//get reference for both the form 
const Signup = document.getElementById('Signup');
const login = document.getElementById('login');


//event listener for signup 
Signup.addEventListener('submit',(e)=>{e.preventDefault();
const UserName1 = document.getElementById('SignupUserName').value;
const Password1 = document.getElementById('loginPasswoed').value;
//   store the information in indexed

SaveDataToIndexesDB(UserName1,Password1);
});

// event listener for login 
login.addEventListener('submit',(e)=>{e.preventDefault();
    const UserName2 = document.getElementById('SignupUserName').value;
    const Password2 = document.getElementById('loginPasswoed').value;

    //READ the information from indexesBD
    CheckDateInIndexedDB(UserName2,Password2);});

    //function to store Data in indexedDB

    function SaveDataToIndexesDB(UserName,Password)
    {
        const User = {username: UserName, password:Password};
        const request = window.indexedDB.open('UserDB',1);
        request.onerror=(event)=>
        {console.error('sorry. error creating indexedDB Database');};
        request.onsuccess =(event)=>
        {
            const db = event.target.result;
            const transaction =db.transaction(['Users'],'readwrite');
            const objectstore = transaction.objectStore('Users');
            const addUserRequest = objectstore.add(User,UserName);
            addUserRequest.onsuccess =()=>
            {console.log('User Data Saved Successfully');};
            transaction.onsuccess =()=>{db.close();};

        };
        request.onupgradeneeded=(event)=>
        {
            const db = event.target.result;
            db.createObjectStore('Users',{keypath:'username'});
        };

    }

    //function to check user data in the indexedDB
    function CheckDateInIndexedDB(UserName , Password)
    {
        const request = window.indexedDB.open('UserDB',1);
        request.onerror = (event)=>{console.error('Erroe while Reading!');};
        request.onsuccess=(event)=>
        {
            const db= event.target.result;
            const transaction = db.transaction(['Users'],'readonly');
            const objectstore = transaction.objectStore('Users');
            const getUserRequest = objectstore.get(UserName);
            getUserRequest.onsuccess =()=>
            {
                const User = getUserRequest.result;
                if(User && User.password === Password)
                {console.log('login Successful!');}
                else{console.log('UserName or Password Incorrect');}  
            };
            transaction.oncomplete=()=>{db.close();};
        };
        request.onupgradeneeded=(event)=>
        {
            const db =event.target.result;
            db.createObjectStore('Users',{keypath:'UserName'});
        };
    }