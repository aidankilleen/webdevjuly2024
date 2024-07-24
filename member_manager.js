let url = "https://my-json-server.typicode.com/aidankilleen/jsonrestdb2/members";

function onClickDelete(evt) {
    console.log(evt);
    let id = evt.target.id.split("_")[1];
    if (confirm(`Delete user ${ id } are you sure?`)) {
        // make an ajax call to delete
        $.ajax({
            url:`${url}/${id}`, 
            method:"DELETE", 
            success: () => {
                //      alert("ok");
                $(`#tr_${ id }`).remove();
            }, 
            error: (err) => {
                alert(err);
            }
        });
    }
}

function configureButtons(id, editMode) {
    if (editMode) {
        
        $(`#btnUpdate_${ id }`).removeAttr("disabled");
        $(`#btnCancel_${ id }`).removeAttr("disabled");
        $(`#btnEdit_${ id }`).attr("disabled", "disabled");
    } else {
        $(`#btnUpdate_${ id }`).attr("disabled", "disabled");
        $(`#btnCancel_${ id }`).attr("disabled", "disabled");
        $(`#btnEdit_${ id }`).removeAttr("disabled", "disabled");

    }

}
function onClickEdit(id) {

    let name = $(`#tr_${ id } td:nth-child(2)`).html();
    $(`#tr_${ id } td:nth-child(2)`).html(
        `<input 
            id="txtName_${ id }" 
            value="${ name }"
            data-original-value="${ name }"
        >`);

    let email = $(`#tr_${ id } td:nth-child(3)`).html();
    $(`#tr_${ id } td:nth-child(3)`).html(
        `<input 
            id="txtEmail_${ id }" 
            value="${ email }"
            data-original-value="${ email }"
        >`);

    let active = $(`#tr_${ id } td:nth-child(4)`).html() == "Active";
    $(`#tr_${ id } td:nth-child(4)`).html(
        `<input 
            id="chkActive_${ id }" 
            type="checkbox" 
            data-original-value=${ active }
            ${ active ? "checked" : "" }
        >`);
    
    configureButtons(id, true); 

}
function onClickUpdate(id) {
    let name = $(`#txtName_${ id }`).val();
    let email = $(`#txtEmail_${ id }`).val();
    let active = $(`#chkActive_${ id }`).prop("checked");

    let memberToUpdate = {
        id, 
        name, 
        email, 
        active
    };

    $.ajax({
        url:`${ url }/${ id }`, 
        method: "PUT", 

        data: JSON.stringify(memberToUpdate), 
        contentType: "application/json", 

        success: (updatedMember) => {
            $(`#tr_${ id } td:nth-child(2)`).html(updatedMember.name);
            $(`#tr_${ id } td:nth-child(3)`).html(updatedMember.email);
            $(`#tr_${ id } td:nth-child(4)`).html(updatedMember.active ? "Active" : "Inactive");

            configureButtons(id, false);
            
        }, 
        error: () => {
            alert("error");
        }

    });
}
function onClickCancel(id) {

    let originalName = $(`#txtName_${ id }`).attr("data-original-value");
    $(`#tr_${ id } td:nth-child(2)`).html(originalName);

    let originalEmail = $(`#txtEmail_${ id }`).attr("data-original-value");
    $(`#tr_${ id } td:nth-child(3)`).html(originalEmail);
    
    let originalActive = $(`#chkActive_${ id }`).attr("data-original-value") == "true";
    $(`#tr_${ id } td:nth-child(4)`).html(originalActive ? "Active" : "Inactive");

    configureButtons(id, false);

}
function addMemberToTable(member) {

    let html = `<tr id="tr_${ member.id }">
                <td>${ member.id }</td>
                <td>${ member.name }</td>
                <td>${ member.email }</td>
                <td>${ member.active ? "Active" : "Inactive" }</td>
                <td>
                    <button id="btnDelete_${ member.id }" onclick="onClickDelete(event)">Delete</button>
                    <button id="btnEdit_${ member.id }" onclick="onClickEdit(${ member.id })">Edit</button>    
                    <button id="btnUpdate_${ member.id }" onclick="onClickUpdate(${ member.id })" disabled>Update</button>    
                    <button id="btnCancel_${ member.id }" onclick="onClickCancel(${ member.id })" disabled>Cancel</button>    
                </td>
            </tr>`;
    $('#tblMembers tbody').append(html);                    
    
}

$(document).ready(()=>{

    $.getJSON(url, members => {
        
        members.forEach(member => addMemberToTable(member));
    });


    $('#btnAdd').on("click", () => {
        // clear controls in the dialog
        $('#txtName').val("");
        $('#txtEmail').val("");
        $('#chkActive').prop("checked", false);

        $('#dlgAdd').css("display", "block");
    });

    $('#btnSave').on("click", () => {

        let name = $('#txtName').val();
        let email = $('#txtEmail').val();
        let active = $('#chkActive').prop('checked');

        let member = {
            name, 
            email, 
            active
        };

        $.ajax({
            url: url, 
            method: "POST", 
            data: JSON.stringify(member), 
            contentType: "application/json",

            success: (addedMember) => {
                addMemberToTable(addedMember)
            },
            error: () => {
                alert("error");
            }
        });
        $('#dlgAdd').css("display", "none");
    });

    $('#btnCancel').on("click", () => {
        $('#dlgAdd').css("display", "none");
    });
    
    // hide the dialog if the user clicks on the background
    $('#dlgAdd').on("click", (evt) => {
        // only hide if the event was a click on dlgAdd itself
        // i.e. ignore events that are bubbling up from the controls
        // in the dialog.
        if (evt.target.id == "dlgAdd") {
            $('#dlgAdd').css("display", "none");
        }
    });
    
});