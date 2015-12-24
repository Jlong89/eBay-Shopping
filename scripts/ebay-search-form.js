
$(document).ready(function(){

	var pages=0;
	var cur_page=1;
	var pageBlockStart=1;
	var pageBlockFinish=0;
	var results_per_page = "";

	
	var pagination_text="";
	$("#errspan_keywords").css("display", "none");
	$("#errspan_keywords_br").css("display", "none");
	$("#errspan_minprice").css("display", "none");
	$("#errspan_minprice_br").css("display", "none");
	$("#errspan_maxprice").css("display", "none");
	$("#errspan_maxprice_br").css("display", "none");
	$("#errspan_maxhandling").css("display", "none");
	$("#errspan_maxhandling_br").css("display", "none");
	//$("#paginationArea").hide();
	
	var winWidth=0;
	winWidth= $(window).width();
	if(winWidth>447){
		$("#clear").attr("class", "btn btn-default pull-right controls");
		$("#search").attr("class", "btn btn-primary pull-right controls");
		$("#search").css("margin-left", "3px");
		$("#search").css("margin-right", "0px");
	}
	else{
		//$("#condition_acceptable_sm").show();
		//$("#condition_acceptable_lg").hide();
		//$("#max_handling_time").css("margin-top","-1em");
		$("#clear").attr("class", "btn btn-default pull-left controls");
		$("#search").attr("class", "btn btn-primary pull-left controls");
		$("#search").css("margin-left", "0px");
		$("#search").css("margin-right", "3px");
	}
	if(winWidth<768){
		$("#ebay_logo").css("margin-left", "1em");
	}
	else{
		$("#ebay_logo").css("margin-left", "10em");
	}

	if((winWidth>=344&&winWidth<448) || (winWidth <275)){
		$("#condition_acceptable_label").css("position", "relative");
		$("#condition_acceptable_label").css("left", "-9px");
	}else{
		$("#condition_acceptable_label").removeAttr("style");
	}

	if( winWidth>=275&&winWidth<344){
		$("#condition_good_label").css("position", "relative");
		$("#condition_good_label").css("left", "-9px");
	}else{
		$("#condition_good_label").removeAttr("style");
	}

	if(winWidth<275){
		$("#condition_verygood_label").css("position", "relative");
		$("#condition_verygood_label").css("left", "-9px");
	}else{
		$("#condition_verygood_label").removeAttr("style");
	}

	if(winWidth<354){
		$("#buying_format_classified_ads").css("position", "relative");
		$("#buying_format_classified_ads").css("left", "-9px");
	}else{
		$("#buying_format_classified_ads").removeAttr("style");
	}

	if(winWidth<322){
		$("#shipping_exp_shipping_label").css("position", "relative");
		$("#shipping_exp_shipping_label").css("left", "-9px");
	}else{
		$("#shipping_exp_shipping_label").removeAttr("style");
	}			

	$(window).resize(function(){
		winWidth= $(window).width();
			if(winWidth>447){
				
				$("#clear").attr("class", "btn btn-default pull-right controls");
				$("#search").attr("class", "btn btn-primary pull-right controls");
				$("#search").css("margin-left", "3px");
				$("#search").css("margin-right", "0px");
			}
			else{
				
				$("#search").attr("class", "btn btn-primary pull-left controls");
				$("#clear").attr("class", "btn btn-default pull-left controls");
				$("#search").css("margin-left", "0px");
				$("#search").css("margin-right", "3px");
				
			}

			if(winWidth<768){
				$("#ebay_logo").css("margin-left", "1em");
			}
			else{
				$("#ebay_logo").css("margin-left", "10em");
			}

			if((winWidth>=344&&winWidth<448) || (winWidth <275)){
				$("#condition_acceptable_label").css("position", "relative");
				$("#condition_acceptable_label").css("left", "-9px");
			}else{
				$("#condition_acceptable_label").removeAttr("style");
			}

			if( winWidth>=275&&winWidth<344){
				$("#condition_good_label").css("position", "relative");
				$("#condition_good_label").css("left", "-9px");
			}else{
				$("#condition_good_label").removeAttr("style");
			}

			if(winWidth<275){
				$("#condition_verygood_label").css("position", "relative");
				$("#condition_verygood_label").css("left", "-9px");
			}else{
				$("#condition_verygood_label").removeAttr("style");
			}

			if(winWidth<354){
				$("#buying_format_classified_ads").css("position", "relative");
				$("#buying_format_classified_ads").css("left", "-9px");
			}else{
				$("#buying_format_classified_ads").removeAttr("style");
			}

			if(winWidth<322){
				$("#shipping_exp_shipping_label").css("position", "relative");
				$("#shipping_exp_shipping_label").css("left", "-9px");
			}else{
				$("#shipping_exp_shipping_label").removeAttr("style");
			}

		} );

	var keys_written=false;
	var validKeywords=false;
	var validMinPrice=true;
	var validMaxPrice=true;
	var validMaxHandling=true;


	$("#form_keywords").keyup(function(){
		//keylength=$(#"form_keywords").val().length();

		if(keys_written==true){
			if($("#form_keywords").val()==''){
				$("#errspan_keywords").css("display", "inline");
				$("#errspan_keywords_br").css("display", "inline");
				$("#form_keywords").css("border-color", "#a1240e");
				//$("#form_keywords").attr("class", "form_control has_error");
				validKeywords=false;
			}else{
				//$("#form_keywords").css("border-color", "#66afe9");
				$("#form_keywords").removeAttr('style');
				$("#errspan_keywords").css("display", "none");
				$("#errspan_keywords_br").css("display", "none");
				validKeywords=true;
			}
		}
		if(keys_written==false) keys_written=true;
		
	});


	var priceRegEx = /^-?\d+(\.\d+)?$/;
	var minprice=$("#min_price").val();
	var maxprice=$("#max_price").val();

	$("#min_price").focusout(function(){

		if($("#min_price").val()!=''){
			minprice=$("#min_price").val();
			if(!$.isNumeric($("#min_price").val())){
				$("#errspan_minprice").html("Price should be a valid decimal number");
				$("#errspan_minprice").css("display", "inline");
				$("#errspan_minprice_br").css("display", "inline");
				$("#min_price").css("border-color", "#a1240e");
				validMinPrice=false;
			}else if(!priceRegEx.test(minprice)){
				$("#errspan_minprice").html("Price should be a valid decimal number");
				$("#errspan_minprice").css("display", "inline");
				$("#errspan_minprice_br").css("display", "inline");
				$("#min_price").css("border-color", "#a1240e");
				validMinPrice=false;
			}
			else if(parseFloat($("#min_price").val())<0){
				$("#errspan_minprice").html("Minimum price cannot be below 0");
				$("#errspan_minprice").css("display", "inline");
				$("#errspan_minprice_br").css("display", "inline");
				$("#min_price").css("border-color", "#a1240e");
				validMinPrice=false;
			}else{
				$("#errspan_minprice").css("display", "none");
				$("#errspan_minprice_br").css("display", "none");
				$("#min_price").removeAttr('style');
				validMinPrice=true;
			}
			if($("#max_price").val()!=''){
				if(parseFloat(maxprice)<parseFloat(minprice)){
					$("#max_price").css("border-color", "#a1240e");
					$("#errspan_maxprice").html("Maximum price cannot be less than minimum price or below 0");
					$("#errspan_maxprice").css("display", "inline");
					$("#errspan_maxprice_br").css("display", "inline");
					validMaxPrice=false;
				}
			}
		}else{
			$("#min_price").removeAttr('style');
			$("#errspan_minprice").css("display", "none");
			$("#errspan_minprice_br").css("display", "none");
			validMinPrice=true;
			if($("#max_price").val()!=''){
			maxprice=$("#max_price").val();
				if(!$.isNumeric($("#max_price").val())){
					$("#errspan_maxprice").html("Price should be a valid decimal number");
					$("#errspan_maxprice").css("display", "inline");
					$("#errspan_maxprice_br").css("display", "inline");
					$("#max_price").css("border-color", "#a1240e");
					validMaxPrice=false;
				}else if(!priceRegEx.test(maxprice)){
					$("#errspan_maxprice").html("Price should be a valid decimal number");
					$("#errspan_maxprice").css("display", "inline");
					$("#errspan_maxprice_br").css("display", "inline");
					$("#max_price").css("border-color", "#a1240e");
					validMaxPrice=false;
				}
				else if(parseFloat($("#max_price").val())<0){
					$("#errspan_maxprice").html("Maximum price cannot be less than minimum price or below 0");
					$("#errspan_maxprice").css("display", "inline");
					$("#errspan_maxprice_br").css("display", "inline");
					$("#max_price").css("border-color", "#a1240e");
					validMaxPrice=false;
				}else{
					$("#errspan_maxprice").css("display", "none");
					$("#errspan_maxprice_br").css("display", "none");
					$("#max_price").removeAttr('style');
					validMaxPrice=true;
				}
				if($("#min_price").val()!=''){
					if(parseFloat(maxprice)<parseFloat(minprice)){
						$("#max_price").css("border-color", "#a1240e");
						$("#errspan_maxprice").html("Maximum price cannot be less than minimum price or below 0");
						$("#errspan_maxprice").css("display", "inline");
						$("#errspan_maxprice_br").css("display", "inline");
						validMaxPrice=false;
					}
				}
			}else{
				$("#max_price").removeAttr('style');
				$("#errspan_maxprice").css("display", "none");
				$("#errspan_maxprice_br").css("display", "none");
				validMaxPrice=true;
			}

		}
	});

	$("#max_price").focusout(function(){

		if($("#max_price").val()!=''){
			maxprice=$("#max_price").val();
			if(!$.isNumeric($("#max_price").val())){
				$("#errspan_maxprice").html("Price should be a valid decimal number");
				$("#errspan_maxprice").css("display", "inline");
				$("#errspan_maxprice_br").css("display", "inline");
				$("#max_price").css("border-color", "#a1240e");
				validMaxPrice=false;
			}else if(!priceRegEx.test(maxprice)){
				$("#errspan_maxprice").html("Price should be a valid decimal number");
				$("#errspan_maxprice").css("display", "inline");
				$("#errspan_maxprice_br").css("display", "inline");
				$("#max_price").css("border-color", "#a1240e");
				validMaxPrice=false;
			}
			else if(parseFloat($("#max_price").val())<0){
				$("#errspan_maxprice").html("Maximum price cannot be less than minimum price or below 0");
				$("#errspan_maxprice").css("display", "inline");
				$("#errspan_maxprice_br").css("display", "inline");
				$("#max_price").css("border-color", "#a1240e");
				validMaxPrice=false;
			}else{
				$("#errspan_maxprice").css("display", "none");
				$("#errspan_maxprice_br").css("display", "none");
				$("#max_price").removeAttr('style');
				validMaxPrice=true;
			}
			if($("#min_price").val()!=''){
				if(parseFloat(maxprice)<parseFloat(minprice)){
					$("#max_price").css("border-color", "#a1240e");
					$("#errspan_maxprice").html("Maximum price cannot be less than minimum price or below 0");
					$("#errspan_maxprice").css("display", "inline");
					$("#errspan_maxprice_br").css("display", "inline");
					validMaxPrice=false;
				}
			}
		}else{
			$("#max_price").removeAttr('style');
			$("#errspan_maxprice").css("display", "none");
			$("#errspan_maxprice_br").css("display", "none");
			validMaxPrice=true;
		}
	});


	var maxhandlingRegEx = /^-?[0-9]+$/;
	var maxhandling="";
	$("#max_handling").focusout(function(){

		if($("#max_handling").val()!=''){
			maxhandling=$("#max_handling").val();
			if(!maxhandlingRegEx.test(maxhandling)){
				$("#max_handling").css("border-color", "#a1240e");
				$("#errspan_maxhandling").html("Max handling time has to be a valid digit");
				$("#errspan_maxhandling").css("display", "inline");
				$("#errspan_maxhandling_br").css("display", "inline");
				validMaxHandling=false;
			}
			else if(maxhandling<1){
				$("#max_handling").css("border-color", "#a1240e");
				$("#errspan_maxhandling").html("Max handling time should be greater than or equal to 1");
				$("#errspan_maxhandling").css("display", "inline");
				$("#errspan_maxhandling_br").css("display", "inline");
				validMaxHandling=false;
			}else{
				$("#max_handling").removeAttr('style');
				$("#errspan_maxhandling").css("display", "none");
				$("#errspan_maxhandling_br").css("display", "none");
				validMaxHandling=true;
			}
		}else{
			$("#max_handling").removeAttr('style');
			$("#errspan_maxhandling").css("display", "none");
			$("#errspan_maxhandlin_br").css("display", "none");
			validMaxHandling=true;
		}
	});

	
	var topRatedImgLink = "http://cs-server.usc.edu:45678/hw/hw8/itemTopRated.jpg";
	var fbimg = "http://cs-server.usc.edu:45678/hw/hw8/fb.png";
	var url="";	
	$("#search").click(function(){
		$("#pagination_list").html("");
		pages=0;
		pageBlockStart=1;
		makeCall("1");

	});



function makeCall(pageNum){
	cur_page=pageNum;

	if($("#form_keywords").val()!="") validKeywords=true;
		if(!validKeywords){
			
			$("#errspan_keywords").css("display", "inline");
			$("#errspan_keywords_br").css("display", "inline");
			$("#form_keywords").css("border-color", "#a1240e");
			return;
		}
		if(!validMaxPrice||!validMinPrice||!validMaxHandling){
			return;
		}

		var keywords = $("#form_keywords").val();
		keywords = encodeURI(keywords);
		minprice = $("#min_price").val();
		maxprice = $("#max_price").val();


		var conditionNew ="false";
		var conditionUsed="false";
		var conditionVeryGood="false";
		var conditionGood="false";
		var conditionAcceptable="false";
		var buyItNow="false";
		var Auction="false";
		var classifiedAds="false";
		var Seller="false";
		var freeShipping="false";
		var expShipping="false";
		var sortBy="";
		results_per_page = "";

		if($("#condition_new").prop("checked")) conditionNew="true";
		if($("#condition_used").prop("checked")) conditionUsed="true";
		if($("#condition_verygood").prop("checked"))  conditionVeryGood="true";
		if($("#condition_good").prop("checked"))  conditionGood="true";
		if($("#condition_acceptable").prop("checked")) conditionAcceptable="true";
		if($("#buying_format_buy_it_now").prop("checked"))  buyItNow="true";
		if($("#buying_format_auction").prop("checked"))  Auction="true";
		if($("#buying_format_classified_ads").prop("checked"))  classifiedAds="true";
		if($("#seller_seller").prop("checked"))  Seller="true";
		if($("#shipping_free_shipping").prop("checked"))  freeShipping="true";
		if($("#shipping_exp_shipping").prop("checked"))  expShipping="true";
		maxhandling=$("#max_handling").val();
		sort_by = $("#sort_by").val();

		results_per_page = $("#results_per_page").val();


		$.ajax({
			url:"ebay_shopping.php",
			type: "GET",
			dataType: "JSON",
			scriptCharset: "UTF-8",
			data:{
				keywords: keywords,
				min_price: minprice,
				max_price: maxprice,
				condition_new: conditionNew,
				condition_used: conditionUsed,
				condition_verygood: conditionVeryGood,
				condition_good: conditionGood,
				condition_acceptable: conditionAcceptable,
				buy_it_now: buyItNow,
				auction: Auction,
				classified_ads: classifiedAds,
				seller: Seller,
				free_shipping: freeShipping,
				exp_shipping: expShipping,
				max_handling_time: maxhandling,
				sortby: sort_by,
				results_per_page: results_per_page,
				pageNum: cur_page
			},

			success:function(result){
				displayRes(result);
			}
		});
}

function displayRes(result){

	$("#results").html("");
	$("#modals").html("");
	var html_text ="";
	var modals_text="";
	var totalEntries = result[1].resultCount;

	var pageNum = result[2].pageNumber;
	var itemCount=result[3].itemCount;
	pages = Math.ceil(totalEntries/itemCount);
	pagination_text="";
	var galleryURL="";
	var bigPic = "";
	var title="";
	var viewItemURL="";
	var price ="";
	var shippingCost="";
	var shippingText ="";
	var location="";
	var basicInfoTabText="";
	var sellerTabText="";
	var shippingTabText="";
	var categoryName="";
	var condition ="";
	var buyingFormat="";
	var userName="";
	var feedbackScore="";
	var posFeedback="";
	var feedbackRating="";
	var topRated="";
	var storeName="";
	var storeURL="";
	var topRatedIcon="";
	var storeText="";

	var shippingType ="";
	var handlingTime="";
	var shippingLocations="";
	var expShipping="";
	var oneDayShipping="";
	var returnsAccepted="";

	var topListing="";
	var endItem = "";
	var description="";

	if(totalEntries!=0){
	endItem = (cur_page*itemCount<totalEntries) ? cur_page*itemCount : totalEntries;
	html_text+="<h3> "+(cur_page*itemCount-itemCount+1)+"-"+endItem+" items out of "+totalEntries+"</h3>";

	
		for(var i=4; i<result.length; i++){
			var itemObj = result[i];

			$.each(itemObj, function(item, info){
				galleryURL=info.basicInfo.galleryURL;
				bigPic=info.basicInfo.pictureURLSuperSize;
				if(bigPic==""){
					bigPic = galleryURL;
				}
				title = info.basicInfo.Title;
				title = title.replace(/'/g, "");
				viewItemURL = info.basicInfo.viewItemURL;
				price = info.basicInfo.convertedCurrentPrice;
				shippingCost = info.basicInfo.shippingServiceCost;
				shippingText = (parseFloat(shippingCost)==0.0 || shippingCost=="")?" (Free Shipping)": " (Shipping: $"+shippingCost+")";
				location = "   <i>Location: "+info.basicInfo.shipLocation + "</i>";
				categoryName = info.basicInfo.categoryName;
				condition = info.basicInfo.conditionDisplayName;
				buyingFormat = info.basicInfo.listingType;
				if(info.basicInfo.topRatedListing=="true") topListing="<img src='"+topRatedImgLink+"' width='35px' height='25px' class='center_img'>";
				description="Price: "+"$"+price+shippingText+", Location: "+location;
				userName=info.sellerInfo.sellerUserName;
				feedbackScore=info.sellerInfo.feedbackScore;
				posFeedback=info.sellerInfo.positiveFeedbackPercent;
				feedbackRating=info.sellerInfo.feebackRatingStar;
				if(feedbackRating=="") feedbackRating="None";
				topRated=info.sellerInfo.topRatedSeller;
				topRatedIcon=(topRated=="true") ? "<span class='glyphicon glyphicon-ok' style='color:green'> </span>":"<span class='glyphicon glyphicon-remove' style='color:red'> </span>";
				storeName=info.sellerInfo.sellerStoreName;
				storeURL=info.sellerInfo.sellerStoreURL;
				storeText=(storeName=="") ? "N/A":"<a href='"+storeURL+"'>"+storeName+"</a>";

				shippingType = info.shippingInfo.shippingType;
				handlingTime=info.shippingInfo.handlingTime+" day(s)";
				shippingLocations=info.shippingInfo.shipToLocations;
				expShipping=info.shippingInfo.expeditedShipping;
				if(expShipping=="true"){
					expShipping="<span class='glyphicon glyphicon-ok' style='color:green'> </span>";
				}else{
					expShipping="<span class='glyphicon glyphicon-remove' style='color:red'> </span>";
				}
				oneDayShipping=info.shippingInfo.oneDayShippingAvailable;
				if(oneDayShipping=="true"){
					oneDayShipping="<span class='glyphicon glyphicon-ok' style='color:green'> </span>";
				}else{
					oneDayShipping="<span class='glyphicon glyphicon-remove' style='color:red'> </span>";
				}
				returnsAccepted=info.shippingInfo.returnsAccepted;
				if(returnsAccepted=="true"){
					returnsAccepted="<span class='glyphicon glyphicon-ok' style='color:green'> </span>";
				}else{
					returnsAccepted="<span class='glyphicon glyphicon-remove' style='color:red'> </span>";
				}

				html_text+="<div class='media'>   <div class='media-left'><a href='#'>"; 
				html_text+="<img id='share_img"+i+"' class='media-object thumbs' src='"+galleryURL+"' alt='no image' data-toggle='modal' data-target='#modal"+i+"''>";

				html_text+="</a> </div>";
				html_text+="	<div class='media-body'>";
				
				html_text+="<h4 class='media-heading'> <a href='"+viewItemURL+"'> <span  class='mediaHeading' id='share_title"+i+"'>"+title+" </span></a> </h4>"; 
				html_text+="<span id='share_link"+i+"' class='hidden'>"+viewItemURL+" </span>"
				html_text+=" <p><span id='share_desc"+i+"'><b>Price: $"+ price +"</b>" +shippingText+location+" </span>"+topListing +"  <a data-toggle='collapse' href='#details"+i+"'aria-controls='details"+i+"'>View Details</a>";
				//title=encodeURI(title);
				html_text+=" <img class ='fbshare' id='fb_img"+i+"' src='"+fbimg+"' width='15px' height='15px'></p>"; 
				

				html_text+="<div class='collapse' id='details"+i+"'>";

				html_text+="<div role='tabpanel'>";
				html_text+="<ul class='nav nav-tabs' role='tablist'>";
				basicInfoTabText="basicInfoTab"+i;
				sellerTabText="sellerTab"+i;
				shippingTabText="shippingTabText"+i;
				html_text+="<li role='presentation' class='active'><a href='#"+basicInfoTabText+"' aria-controls='"+basicInfoTabText+"' role='tab' data-toggle='tab'>Basic Info</a></li>";
				html_text+=" <li role='presentation'><a href='#"+sellerTabText+"' aria-controls='"+sellerTabText+"' role='tab' data-toggle='tab'>Seller Info</a></li>";
				html_text+="<li role='presentation'><a href='#"+shippingTabText+"' aria-controls='"+shippingTabText+"' role='tab' data-toggle='tab'>Shipping Info</a></li></ul>";
				html_text+="</div>";

				html_text+="<div class='tab-content'>";
				html_text+="<div role='tabpanel' class='tab-pane active' id='"+basicInfoTabText+"'>";
				html_text+="<div class='container'>";
				html_text+="<div class='col-sm-8'>";
				html_text+= "<div class='row rowCell'><div class='col-sm-3 res_cell'><b>Category name</b></div><div class='col-sm-5 res_cell'>"+categoryName+" </div></div>";
				html_text+= "<div class='row rowCell'><div class='col-sm-3 res_cell'><b>Condition</b></div><div class='col-sm-5 res_cell'>"+condition+"</div></div>";
				html_text+="<div class='row rowCell'><div class='col-sm-3 res_cell'><b>Category name</b></div> <div class='col-sm-5  res_cell'>"+buyingFormat+"</div></div>";
				html_text+="</div></div></div>";

				html_text+="<div role='tabpanel' class='tab-pane' id='"+sellerTabText+"'>";
				html_text+="<div class='container'>";
				html_text+="<div class='col-sm-9 col-md-8'>";
				html_text+= "<div class='row rowCell'><div class='col-sm-4 col-md-3 res_cell'><b>User name</b></div><div class='col-sm-5 col-md-5 res_cell'>"+userName+"</div></div>";
				html_text+= "<div class='row rowCell'><div class='col-sm-4 col-md-3 res_cell'><b>Feedback score</b></div><div class='col-sm-5 col-md-5 res_cell'>"+feedbackScore+"</div></div>";
				html_text+="<div class='row rowCell'><div class='col-sm-4 col-md-3 res_cell'><b>Positive feedback</b></div><div class='col-sm-5 col-md-5 res_cell'>"+posFeedback+"</div></div>";
				html_text+="<div class='row rowCell'><div class='col-sm-4 col-md-3 res_cell'><b>Feedback rating</b></div><div class='col-sm-5 col-md-5 res_cell'>"+feedbackRating+"</div></div>";
				html_text+="<div class='row rowCell'><div class='col-sm-4 col-md-3 res_cell'><b>Top rated</b></div><div class='col-sm-5 col-md-5 res_cell'>"+topRatedIcon+"</div></div>";
				html_text+="<div class='row rowCell'><div class='col-sm-4 col-md-3 res_cell'><b>Store</b></div><div class='col-sm-5 col-md-5 res_cell'>"+storeText+"</div></div>";
				html_text+="</div> </div> </div>";

				html_text+="<div role='tabpanel' class='tab-pane' id='"+shippingTabText+"'>";
				html_text+="<div class='container'>";
				html_text+="<div class='col-sm-9 col-md-8'>";
				html_text+="<div class='row rowCell'><div class='col-sm-4 col-md-3 res_cell'><b>Shipping type</b></div> <div class='col-sm-5 col-md-5 res_cell'>"+shippingType+"</div></div>";
				html_text+="<div class='row rowCell'><div class='col-sm-4 col-md-3 res_cell'><b>Handling time</b></div> <div class='col-sm-5 col-md-5 res_cell'>"+handlingTime+"</div></div>";
				html_text+="<div class='row rowCell'><div class='col-sm-4 col-md-3 res_cell'><b>Shipping Locations</b></div> <div class='col-sm-5 col-md-5 res_cell'><span class='shiplocs'>"+shippingLocations+"</span></div></div>";
				html_text+="<div class='row rowCell'><div class='col-sm-4 col-md-3 res_cell'><b>Expedited shipping</b></div> <div class='col-sm-5 col-md-5 res_cell'>"+expShipping+"</div></div>";
				html_text+="<div class='row rowCell'><div class='col-sm-4 col-md-3 res_cell'><b>One day shipping</b></div> <div class='col-sm-5 col-md-5 res_cell'>"+oneDayShipping+"</div></div>";
				html_text+="<div class='row rowCell'><div class='col-sm-4 col-md-3 res_cell'><b>Returns accepted</b></div> <div class='col-sm-5 col-md-5 res_cell'>"+returnsAccepted+"</div></div>";
				html_text+="</div> </div> </div>";

				html_text+="</div>";

				html_text+="</div>";
				html_text+="</div></div></div>";

				modals_text+="<div class='modal fade' id='modal"+i+"' class='myModal'>";
				modals_text+=	"<div class='modal-dialog'>";
				modals_text+=	"<div class='modal-content'>";
				modals_text+=	"<div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>";						
				modals_text+=	 "<h4 class='modal-title'>"+title+"</h4>";
				modals_text+=	 " </div>";
				modals_text+=	  "<div class='modal-body'>";
				modals_text+=     "<div>";
				modals_text+=	  "<img class='img-responsive' src='"+bigPic+"' alt='"+galleryURL+"'> ";
				modals_text+=     "</div>";
				modals_text+=	  "</div>";
				modals_text+=	"</div>";
				modals_text+=	"</div>";
				modals_text+="</div>";

			});
		}
	}else{
		html_text+="<h4>No results found </h4>";
	}

	$("#results").html(html_text);
	$("#modals").html(modals_text);




	if(totalEntries!=0){
		var pageButton="";
		var selector="";
		pageBlockFinish=(pageBlockStart+4<pages)?pageBlockStart+4 : pages;

		if(pageBlockStart>1){
			pagination_text+="<li> <a href='javascript:;' id='pageButton"+(pageBlockStart-1)+"'>&laquo;</a></li>";
		}
		for(var k=pageBlockStart; k<=pageBlockFinish; k++){
			if(k==cur_page){
				pageButton="pageButton"+k;
				pagination_text+="<li class='active'> <a href='javascript:;' id='"+pageButton+"'>"+k+"</a></li>";
			}else{
				pageButton="pageButton"+k;
				pagination_text+="<li> <a href='javascript:;' id='"+pageButton+"'>"+k+"</a></li>";	
			}
			//$("#pagination_list").html(pagination_text);			
		}
		if(pageBlockFinish<pages){
			pagination_text+="<li> <a href='javascript:;' id='pageButton"+(pageBlockFinish+1)+"'>&raquo;</a></li>";		
		}
		$("#pagination_list").html(pagination_text);
		if(pageBlockStart>1){
			selector="#pageButton"+(pageBlockStart-1);
			$(selector).bind("click", function(){
				pageBlockStart=pageBlockStart-5;
				var id=$(this).attr("id");
				var pageNum = id.substring(10, id.length);
				makeCall(pageNum);
			});
		}

		for(var k=pageBlockStart; k<=pageBlockFinish; k++){
			selector="#pageButton"+k;
			$(selector).bind("click", function(){
				var id=$(this).attr("id");
				var pageNum = id.substring(10, id.length);
				makeCall(pageNum);
			});
		}

		if(pageBlockFinish<pages){
			selector="#pageButton"+(pageBlockFinish+1);
			$(selector).bind("click", function(){
				pageBlockStart=pageBlockStart+5;
				var id=$(this).attr("id");
				var pageNum = id.substring(10, id.length);
				makeCall(pageNum);
			});
		}

		$(".fbshare").bind("click", function(){
			var id=$(this).attr("id");
			var shareNo=id.substring(6, id.length);
			
			var title = $("#share_title"+shareNo).text();
			var pic = $("#share_img"+shareNo).attr('src');
			var desc = $("#share_desc"+shareNo).text();
			var link = $("#share_link"+shareNo).text();
			fbshare(title, link, pic, desc);
		});
	}
}


});


function fbshare(title, url, img, description){
	FB.ui({
		method: 'feed',
		name: title,
		link: url,
		caption: 'Search Information from eBay.com',
		description: description,
		picture: img

	},
	function(response){
		if(response && !response.error_code){
			alert("Posted Successfully");
		}
		else{
			alert("Not Posted");
		}
	}
	);
}

function clearForm(form){
	var blank ="";
	$("#results").html("");
	$("#pagination_list").html("");
	$("#modals").html("");
	$("#errspan_minprice").css("display", "none");
	$("#errspan_minprice_br").css("display", "none");
	$("#min_price").removeAttr('style');
	validMinPrice=true;
	$("#max_handling").removeAttr('style');
	$("#errspan_maxhandling").css("display", "none");
	$("#errspan_maxhandling_br").css("display", "none");
	validMaxHandling=true;
	$("#max_price").removeAttr('style');
	$("#errspan_maxprice").css("display", "none");
	$("#errspan_maxprice_br").css("display", "none");
	validMaxPrice=true;

	form.form_keywords.value=blank;
	form.max_price.value=blank;
	form.min_price.value=blank;
	form.max_handling.value=blank;
	form.condition_new.checked=false;
	form.condition_used.checked=false;
	form.condition_verygood.checked=false;
	form.condition_good.checked=false;
	form.condition_acceptable.checked=false;
	form.buying_format_buy_it_now.checked=false;
	form.buying_format_auction.checked=false;
	form.buying_format_classified_ads.checked=false;
	form.seller_seller.checked=false;
	form.shipping_free_shipping.checked=false;
	form.shipping_exp_shipping.checked=false;
	form.sort_by.value="Best Match";
	form.results_per_page.value="5";
	return;
}

