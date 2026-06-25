const form = document.getElementById("expense_form");
const ul = document.getElementById("ul");

const expense_get=JSON.parse(localStorage.getItem("expense"))||[];

form.addEventListener("submit",function(event){
    event.preventDefault();

    const amt=document.getElementById("expense_amt").value.trim();
    const des=document.getElementById("description").value.trim();
    const cat=document.getElementById("category").value.trim();

    const expense_obj={
        amount:amt,
        descrip:des,
        categ:cat
    }
    expense_get.push(expense_obj);

    localStorage.setItem("expense",JSON.stringify(expense_get));
    display();
    form.reset();
})

function display(){
    ul.innerHTML="";
    expense_get.forEach(function(item,index){
        const li=document.createElement('li');
        li.textContent=`${item.amount}-${item.descrip}-${item.categ}`
        ul.appendChild(li);
        //delte
        const del=document.createElement("button");
        del.innerText="Delete";
        del.className="del_class";
        li.appendChild(del);
        ul.append(li);

        del.addEventListener("click",function(event){
            expense_get.splice(index,1);
            localStorage.setItem("expense",JSON.stringify(expense_get));
            display();
        })

        //edit
        const edit=document.createElement("button");
        edit.innerText="Edit";
        edit.className="edit_class";
        li.appendChild(edit);
        ul.append(li);

        edit.addEventListener("click", function(){
            document.getElementById("expense_amt").value = item.amount;
            document.getElementById("description").value = item.descrip;
            document.getElementById("category").value = item.categ;

            expense_get.splice(index, 1);

            localStorage.setItem("expense", JSON.stringify(expense_get));
            display();
        })

    })
}
display();