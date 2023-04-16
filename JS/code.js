window.addEventListener("load", allStorage);

document.querySelector("#btn").addEventListener("click", addDeal);
document.querySelector("#srt").addEventListener("click", sortDate);
document.querySelector("#sea").addEventListener("click", searchDate);

function searchDate()
{  
    let date = document.querySelector("#dl").value;   
    
    if (!date)
    {
        document.querySelector("#dl").placeholder = "enter date for search";
        return;
    }
    document.querySelector("#list").innerHTML = "";

    let keys = getKeys(false);
    for (let i=0; i<keys.length; i++)
    {
        if(keys[i] == date)
        {
            let found = JSON.parse(localStorage.getItem(keys[i], "[]"));  
            for(let j=0; j<found.length; j++)
            {
                let minsName = found[j].split('→');        
                createLI(minsName[1], keys[i], minsName[0]);
            }
            break;
        }
    }
}

function sortDate()
{
    document.querySelector("#list").innerHTML = "";
    allStorage(true);
}

function getKeys(isSort)
{
    let keys = Object.keys(localStorage);
    if(isSort) keys.sort();
    return keys;
}

function allStorage(isSort = false) 
{  
    //localStorage.clear();
    //localStorage.removeItem("2023-04-18");

    let keys = getKeys(isSort);
    //keys.reverse();

    for (let i=0; i<keys.length; i++)
    {
        let task = JSON.parse(localStorage.getItem(keys[i], "[]"));        
        for(let j=0; j<task.length; j++)
        {
            let minsName = task[j].split('→');        
            createLI(minsName[1], keys[i], minsName[0]);
        }
    }
}

function addDeal()
{
    let deal =  document.querySelector("#dl").value;
    let d = document.querySelector("#d").value;
    let t = document.querySelector("#t").value;

    if (deal && d && t)
    {  
        //localStorage.clear();
        addStorageItem(`${t}→${deal}`, d);

        createLI(deal, d, t);
        clearInput(); 
    }
}

function createLI(deal, date, time)
{
    let li = document.createElement("LI");
    li.appendChild(document.createTextNode(`${deal}`));
    li.appendChild(document.createElement('br'));
    li.appendChild(document.createElement('br'));
    li.appendChild(document.createTextNode(`${date}`));
    li.appendChild(document.createElement('br'));
    li.appendChild(document.createTextNode(`${time}`));  
        let p = document.createElement("P");
        p.appendChild(document.createTextNode("X")); 
    li.appendChild(p);  

    document.querySelector("#list").appendChild(li);
        
    p.addEventListener("click", ()=>
    {
        //document.querySelector("#list").removeChild(li);
        delStorageItem(deal, date, time);        
        clearInput();
        document.querySelector("#list").innerHTML = "";
        allStorage(false);
    }); 
}

function clearInput()
{
    document.querySelector("#dl").value = "";
    document.querySelector("#d").value = "";
    document.querySelector("#t").value = "";
}

function addStorageItem (item, list) 
{
    let arr = JSON.parse(localStorage.getItem(list, "[]"));

    if(!!arr)  arr.push(item);
    else arr = [item];

    localStorage.setItem(list, JSON.stringify(arr));
}

function delStorageItem (deal, date, time) 
{
    let arr = JSON.parse(localStorage.getItem(date, "[]"));

    for(let j=0; j<arr.length; j++)
    {
        let minsName = arr[j].split('→');
        if(time == minsName[0]  &&  deal == minsName[1])
        {
            arr.splice(j, 1);
        }
    }
    if(arr.length != 0) localStorage.setItem(date, JSON.stringify(arr));
    else localStorage.removeItem(date);
}

