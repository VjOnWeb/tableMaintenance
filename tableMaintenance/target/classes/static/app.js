$(document).ready(function() {
	loadCustomers();

	// Handle add/update form submission
	$("#CustomerForm").submit(function(event) {
		event.preventDefault();
		var form = $(this);
		console.log("addcustomer")
		var customer = {
			customerID: form.find("#customerId").val(),
			firstName: form.find("#firstName").val(),
			lastName: form.find("#lastName").val(),
			email: form.find("#email").val(),
			phone: form.find("#phone").val()
		};

		var submitButton = form.find("#submitButton");
		if (submitButton.text() === "Add Customer") {
			addCustomer(customer);
		} else if (submitButton.text() === "Update") {
			updateCustomer(customer);
		}
	});


	// Handle search input changes
	$("#searchInput").on("input", function() {
		var searchText = $(this).val().toLowerCase();

		$("#customerList tr:not(:first-child)").each(function() {
			var customerRow = $(this);
			var customerName = customerRow.children()[0].innerText.toLowerCase();
			var email = customerRow.children()[1].innerText.toLowerCase();
			var mobile = customerRow.children()[2].innerText.toLowerCase();

			// Check if the customer name contains the search text
			if (customerName.includes(searchText)) {
				customerRow.show();
				customerRow.addClass("highlight");
			}
			else if (email.includes(searchText)) {
				customerRow.show();
				customerRow.addClass("highlight");
			}
			else if (mobile.includes(searchText)) {
				customerRow.show();
				customerRow.addClass("highlight");

			} else {
				customerRow.hide();
			}
		});
	});
	// Add scroll listener to adjust opacity
	$(window).scroll(function() {
		if ($(this).scrollTop() > 0) {
			$(".pageheader").addClass("scroll-opacity");
		} else {
			$(".pageheader").removeClass("scroll-opacity");
		}
	});

	
});

// Handle update button click
function handleUpdateClick(customer) {
	$("#customerTitle").text("Update Customer");
	$("#submitButton").text("Update");

	// Fill the form fields with customer data
	$("#customerId").val(customer.customerID);
	$("#firstName").val(customer.firstName);
	$("#lastName").val(customer.lastName);
	$("#email").val(customer.email);
	$("#phone").val(customer.phone);

	// Change the form ID for update
	//        $("#CustomerForm").attr("id", "CustomerFormUpd");
	$("#CustomerForm").show();

}

/*load and delete*/



function loadCustomers() {
	$.ajax({
		type: "GET",
		url: "/customers",
		success: function(customers) {
			var customerList = $("#customerList");
			customerList.empty();
			var tHead = $("<thead>");
			tHead.append("<th>" + "Customer Name" + "</th>");
			tHead.append("<th>" + "Email" + "</th>");
			tHead.append("<th>" + "Phone" + "</th>");
			tHead.append("<th>" + "Actions" + "</th>")

			customerList.append(tHead);
			$.each(customers, function(index, customer) {
				var newRow = $("<tr>");
				newRow.append("<td>" + customer.firstName + " " + customer.lastName + "</td");
				newRow.append("<td>" + customer.email + "</td");
				newRow.append("<td>" + customer.phone + "</td");

				console.log("idx-" + index)
				var updateButton = $("<button>");
				updateButton.text("Update");
				updateButton.attr("class", "update-btn updBtn-" + index);
				updateButton.click(function() {
					var Confirmed = confirm("Are you sure you want to update customer: " + customer.firstName + " " + customer.lastName + "?");
					if (Confirmed)
						handleUpdateClick(customer);
				});

				var deleteButton = $("<button>");
				deleteButton.text("Delete");
				deleteButton.attr("class", "delete-btn  delBtn-" + index);
				deleteButton.click(function() {
					var Confirmed = confirm("Are you sure you want to delete customer: " + customer.firstName + " " + customer.lastName + "?");
					if (Confirmed)
						deleteCustomer(customer.customerID);
				});

				newRow.append(updateButton);
				newRow.append(deleteButton);
				//				customerList.append(tBody);

				customerList.append(newRow);
			});
		}
	});

}

function deleteCustomer(customerID) {
	$.ajax({
		type: "DELETE",
		url: "/customers/" + customerID,
		success: function() {
			loadCustomers();
			$("#searchInput").val("");
		}
	});
}


// Add customer
function addCustomer(customer) {
	$.ajax({
		type: "POST",
		url: "/customers",
		contentType: "application/json",
		data: JSON.stringify(customer),
		success: function() {
			loadCustomers();
			resetForm();
			$("#CustomerForm").hide();
		}
	});
}

// Update customer
function updateCustomer(customer) {
	$.ajax({
		type: "PUT",
		url: "/customers/" + customer.customerID,
		contentType: "application/json",
		data: JSON.stringify(customer),
		success: function() {
			loadCustomers();
			resetForm();
		}
	});
}

// Reset form
function resetForm() {
	$("#CustomerForm").show();
	$("#customerTitle").text("Add Customer");
	$("#submitButton").text("Add Customer");
	//           $("#CustomerFormUpd").attr("id", "CustomerForm");

	$("#customerId").val("");
	$("#firstName").val("");
	$("#lastName").val("");
	$("#email").val("");
	$("#phone").val("");
}

function toggleForm() {
	$("#CustomerForm").toggle();

};
