/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";
var stdDBName = "STUDENT-TABLE";
var stdRelationName = "SCHOOL-DB";
var connectionToken = "90932303|-31949270926515152|90954119";


function validateAndGetFormData() {
    var stdRollNoVar = $("#stdRollNo").val();
    var stdNameVar = $("#stdName").val();
    var stdClassVar = $("#stdClass").val();
    var stdDOBVar = $("#stdDOB").val();
    var stdAddVar = $("#stdAdd").val();
    var stdEnrollDateVar = $("#stdEnrollDate").val();

    if (stdRollNoVar === "") {
        alert("Student Roll Number is Required");
        $("#stdRollNo").focus();
        return "";
    }
    if (stdNameVar === "") {
        alert("Student Name is Required");
        $("#stdName").focus();
        return "";
    }
    if (stdClassVar === "") {
        alert("Student Class is Required");
        $("#stdClass").focus();
        return "";
    }
    if (stdDOBVar === "") {
        alert("Student Data Of Birth is Required");
        $("#stdDOB").focus();
        return "";
    }
    if (stdAddVar === "") {
        alert("Student Address is Required");
        $("#stdAdd").focus();
        return "";
    }
    if (stdEnrollDateVar === "") {
        alert("Student Enrollment Date is Required");
        $("#stdEnrollDate").focus();
        return "";
    }

    var jsonStrObj = {
        stdRollNo: stdRollNoVar,
        stdName: stdNameVar,
        stdClass: stdClassVar,
        stdDOB: stdDOBVar,
        stdAdd: stdAddVar,
        stdEnrollDate: stdEnrollDateVar

    };
    return JSON.stringify(jsonStrObj);
}

function saveData() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    //alert(jsonStr);
    var putReqStr = createPUTRequest(connectionToken, jsonStr, stdDBName, stdRelationName);
    //alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
   // alert(JSON.stringify(resultObj));
    resetForm();
    $("#stdRollNo").focus();
}

function resetForm() {
    $("#stdRollNo").val("");
    $("#stdName").val("").prop(":disabled", true);
    $("#stdClass").val("").prop(":disabled", true);
    $("#stdDOB").val("").prop(":disabled", true);
    $("#stdAdd").val("").prop(":disabled", true);
    $("#stdEnrollDate").val("").prop(":disabled", true);

    $("#stdRollNo").prop("disabled", false);
    $("#stdSave").prop("disabled", true);
    $("#stdUpdate").prop("disabled", true);
    $("#stdReset").prop("disabled", true);
    $("#stdRollNo").focus();
}

function stdActiv() {

    var stdRollNoObj = getStdRollNo();
    //alert(stdRollNoObj);
    var getRequest = createGET_BY_KEYRequest(connectionToken, stdDBName, stdRelationName, stdRollNoObj);
    //alert(getRequest);

    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    //alert(JSON.stringify(resultObj));

    //alert(resultObj.status);

    if (resultObj.status === 200) {
       // alert("pass");
        saveRecNo2LS(resultObj);
        $("#stdRollNo").prop("disabled", true);
        fillData(resultObj);
        $("#stdSave").prop("disabled", true);
        $("#stdUpdate").prop("disabled", false);
        $("#stdReset").prop("disabled", false);

        $("#empName").focus();
    }
    if (resultObj.status === 400) {
        $("#stdSave").prop("disabled", false);
        $("#stdUpdate").prop("disabled", true);
        $("#stdReset").prop("disabled", false);
        $("#stdName").focus();
    }

}

function getStdRollNo() {
    var stdRollNoVar = $("#stdRollNo").val();
    //alert(stdRollNoVar);
    var jsonStrObj = {
        stdRollNo: stdRollNoVar
    };
    //alert(JSON.stringify(jsonStrObj));
    return JSON.stringify(jsonStrObj);

}

function saveRecNo2LS(jsonObj) {
    //alert("save rec");
    //alert(JSON.stringify(jsonObj));
    var lvData = JSON.parse(jsonObj.data);
    //alert(lvData);
    //alert(JSON.stringify(lvData));
    localStorage.setItem('recno', lvData.rec_no);
}

function fillData(jsonObj) {
    var record = JSON.parse(jsonObj.data).record;
    //alert("infill data");
    $("#stdName").val(record.stdName);
    $("#stdClass").val(record.stdClass);
    $("#stdDOB").val(record.stdDOB);
    $("#stdAdd").val(record.stdAdd);
    $("#stdEnrollDate").val(record.stdEnrollDate);
}

function updateData() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    //alert("changeData");
    //alert(jsonStr);
    //alert(localStorage.getItem("recno"));
    var updateReqStr = createUPDATERecordRequest(connectionToken, jsonStr, stdDBName, stdRelationName, localStorage.getItem("recno"));
    //alert(updateReqStr);

    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(updateReqStr, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    //alert(JSON.stringify(resultObj));
    //console.log(resJsonObj);
    resetForm();
}