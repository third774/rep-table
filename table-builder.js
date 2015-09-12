var HTML_tablerow = '<tr class="state-row"></tr>';

var HTML_state = '<td data-title="State">%data%</td>';
var HTML_name = '<td data-title="Name">%data%</td>';
var HTML_status = '<td data-title="Position">%data%</td>';
var HTML_email = '<td data-title="Email">%data%</td>';
var HTML_phone = '<td data-title="Phone">%data%</td>';

var HTML_state_red = '<td data-title="State" class="red-row">%data%</td>';
var HTML_name_red = '<td data-title="Name" class="red-row">%data%</td>';
var HTML_status_red = '<td data-title="Position" class="red-row">%data%</td>';
var HTML_email_red = '<td data-title="Email" class="red-row"><a href="mailto:%data%">%data%</a></td>';
var HTML_phone_red = '<td data-title="Phone" class="red-row"><a href="tel:%data%">%data%</a></td>';

var HTML_state_green = '<td data-title="State" class="green-row">%data%</td>';
var HTML_name_green = '<td data-title="Name" class="green-row">%data%</td>';
var HTML_status_green = '<td data-title="Position" class="green-row">%data%</td>';
var HTML_email_green = '<td data-title="Email" class="green-row"><a href="mailto:%data%">%data%</a></td>';
var HTML_phone_green = '<td data-title="Phone" class="green-row"><a href="tel:%data%">%data%</a></td>';

var HTML_state_yellow = '<td data-title="State" class="yellow-row">%data%</td>';
var HTML_name_yellow = '<td data-title="Name" class="yellow-row">%data%</td>';
var HTML_status_yellow = '<td data-title="Position" class="yellow-row">%data%</td>';
var HTML_email_yellow = '<td data-title="Email" class="yellow-row"><a href="mailto:%data%">%data%</a></td>';
var HTML_phone_yellow = '<td data-title="Phone" class="yellow-row"><a href="tel:%data%">%data%</a></td>';

$.getJSON("https://spreadsheets.google.com/feeds/list/1RXbKQ2IrscVPnNztVqW4FIpKFVzANzAZWkfQd9jxhKU/1/public/basic?hl=en_US&alt=json", function(json) {

	var rep_info = [];

	for (each in json.feed.entry) {
		var entry = json.feed.entry[each];

		var this_rep = {};
		// console.log(entry.content);
		// console.log(entry.content.$t);
		try {
			this_rep.unparsed = entry.content.$t.toString().split(",");
			this_rep.parsed = [];

			for (item in this_rep.unparsed) {
				var temp = this_rep.unparsed[item].toString().split(": ");
				temp[0] = temp[0].replace(" ", "");
				this_rep.unparsed[item]
				this_rep.parsed.push(temp);
			}

			this_rep.state = entry.title.$t;
			this_rep.name = this_rep.parsed[0][1];
			this_rep.email = this_rep.parsed[1][1];
			this_rep.phone = this_rep.parsed[2][1];
			this_rep.status = this_rep.parsed[3][1];

			rep_info.push({
				"state" : this_rep.state,
				"name" : this_rep.name,
				"email" : this_rep.email,
				"phone" : this_rep.phone,
				"status" : this_rep.status
			});
		}
		catch(err) {
			console.log("error");
		}
	}

	var display_Rows = function() {
		for (each in rep_info) {
			if ( typeof rep_info[each].state === "undefined") {
			} else {
				$("#rep-table").append(HTML_tablerow);
				var state = $(".state-row:last");

				if ( rep_info[each].status == "Opposes" ) {
					var formatted_state = HTML_state_red.replace('%data%', rep_info[each].state);
					var formatted_name = HTML_name_red.replace('%data%', rep_info[each].name);
					var formatted_status = HTML_status_red.replace('%data%', rep_info[each].status);
					var formatted_email = HTML_email_red.replace(/%data%/g, rep_info[each].email);
					var formatted_phone = HTML_phone_red.replace(/%data%/g, rep_info[each].phone);
				} else if ( rep_info[each].status == "Supports" ) {
					var formatted_state = HTML_state_green.replace('%data%', rep_info[each].state);
					var formatted_name = HTML_name_green.replace('%data%', rep_info[each].name);
					var formatted_status = HTML_status_green.replace('%data%', rep_info[each].status);
					var formatted_email = HTML_email_green.replace(/%data%/g, rep_info[each].email);
					var formatted_phone = HTML_phone_green.replace(/%data%/g, rep_info[each].phone);
				} else {
					var formatted_state = HTML_state_yellow.replace('%data%', rep_info[each].state);
					var formatted_name = HTML_name_yellow.replace('%data%', rep_info[each].name);
					var formatted_status = HTML_status_yellow.replace('%data%', rep_info[each].status);
					var formatted_email = HTML_email_yellow.replace(/%data%/g, rep_info[each].email);
					var formatted_phone = HTML_phone_yellow.replace(/%data%/g, rep_info[each].phone);
				};

				state.append(formatted_state);
				state.append(formatted_name);
				state.append(formatted_status);
				state.append(formatted_email);
				state.append(formatted_phone);
			};
		}
	}

	display_Rows();

});



