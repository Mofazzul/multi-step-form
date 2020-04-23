jQuery(document).ready(function($) {
    $("select").selectric();
    $("input.selectric-input").remove();
  
    $(".open-popup").click(function(){
      $("#proposalPopUp").addClass("showPopUp");
    });
  
    $(".closeProposal").click(function(){
      $("#proposalPopUp").removeClass("showPopUp");
    })
  
    $("div#proposalPopUp").click(function(event) {
      //if you click on anything except the modal itself or the "open modal" link, close the modal
      if (!$(event.target).closest(".form-wrap").length) {
        $("#proposalPopUp").removeClass("showPopUp");
      }
    });
  
    
  });
  
  
  var currentTab = 0; // Current tab is set to be the first tab (0)
  showTab(currentTab); // Display the current tab
  
  function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
  
    if (n == (x.length - 1)) {
      document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
      
    }
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
  }
  
  function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
  
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form...
    if (currentTab >= x.length) {
      // ... the form gets submitted:
      document.getElementById("regForm").submit();
      return false;
  
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
  }
  
  function validateForm() {
  
    var x, y, i, valid = true;
  
    x = document.getElementsByClassName("tab");
  
    y = x[currentTab].getElementsByTagName("input");
  
    
    var field = document.getElementById('with_select');
  
  
    var selectedBoxes = document.getElementById("step1_dropdown_goals");
    var fieldSelect = document.getElementById("select_verify");
    if(selectedBoxes.selectedIndex == 0) {
      fieldSelect.value = '';
      field.className += " invalid";
      
    }else{
      fieldSelect.value = '1';
    }
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      
      // If a field is empty...
      if (y[i].value == "") {
        
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false
        valid = false;
      }
    }
    if (valid) {
      document.getElementsByClassName("progress-planet")[currentTab].className += "active-planetish finish";
     
    }
    return valid; // return the valid status
  }
  
  function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("progress-planet");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace("active-planetish currentlyActiveStep", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active-planetish currentlyActiveStep";
  }