<?php

	$results = '';
	$blank = '';
		
		//Construct url
		
		$keywords = urldecode($_GET['keywords']);
		
		$results_per_page = $_GET['results_per_page'];
		$pageNum=$_GET['pageNum'];
		

		$endpoint = 'http://svcs.ebay.com/services/search/FindingService/v1';  // URL to call
		$siteID = '0';
		$appid = 'USCfd1887-9efc-4feb-8b4a-28765cea39b';
		$operation_name = 'findItemsAdvanced';
		$service_version = '1.0.0';
		$response_data_format = 'XML';
		
		$url="$endpoint?";
		$url.="siteid=$siteID";
		$url.="&OPERATION-NAME=$operation_name";
		$url.="&SECURITY-APPNAME=$appid";
		$url.="&SERVICE-VERSION=$service_version";
		$url.="&RESPONSE-DATA-FORMAT=$response_data_format";
		$url.="&keywords=".urlencode($keywords);
		$url.="&paginationInput.entriesPerPage=".$results_per_page;
		$url.="&paginationInput.pageNumber=$pageNum";
		
		$sortOrder = $_GET['sortby'];
		if($sortOrder=="Best Match") $sortOrder="BestMatch";
		else if($sortOrder=="Price: highest first") $sortOrder="CurrentPriceHighest";
		else if($sortOrder=="Price + Shipping: highest first") $sortOrder="PricePlusShippingHighest";
		else if($sortOrder=="Price + Shipping: lowest first") $sortOrder="PricePlusShippingLowest";
		$url.="&sortOrder=".$sortOrder;
		
		$blank='';
		$i=0;
		$cond=0;
		$isPrevCond=false;
		$isPrevFormat=false;
		$format=0;
		$true= "true";
		foreach($_GET as $key => $value){
			
			if($key =="min_price"&&$value!=$blank){
				$url.="&itemFilter($i).name=MinPrice";
				$url.="&itemFilter($i).value=$value";
				$i+=1;
				$isPrevCond=false;
				$isPrevFormat=false;
			}else if($key =="max_price"&&$value!=$blank){
				$url.="&itemFilter($i).name=MaxPrice";
				$url.="&itemFilter($i).value=$value";
				$i+=1;
				$isPrevCond=false;
				$isPrevFormat=false;
			}else if(($key == "condition_new"||$key == "condition_used"||$key == "condition_good"||$key == "condition_verygood"||$key == "condition_acceptable")&&$value==$true){
				if($isPrevCond==true) $i-=1;
				$url.="&itemFilter($i).name=Condition";
				if($key=="condition_new") $url.="&itemFilter($i).value($cond)=1000";
				else if($key=="condition_used") $url.="&itemFilter($i).value($cond)=3000";
				else if($key=="condition_verygood") $url.="&itemFilter($i).value($cond)=4000";
				else if($key=="condition_good") $url.="&itemFilter($i).value($cond)=5000";
				else if($key=="condition_acceptable") $url.="&itemFilter($i).value($cond)=6000";
				$isPrevCond=true;
				$isPrevFormat=false;
				$i+=1;
				$cond+=1;
			}
			else if(($key == "buy_it_now"||$key == "auction"||$key == "classified_ads")&&$value==$true){
				if($isPrevFormat==true) $i-=1;
				$url.="&itemFilter($i).name=ListingType";
				if($key=="buy_it_now") $url.="&itemFilter($i).value($format)=FixedPrice";
				else if($key=="auction") $url.="&itemFilter($i).value($format)=Auction";
				else if($key=="classified_ads") $url.="&itemFilter($i).value($format)=Classified";
				$isPrevFormat=true;
				$isPrevCond=true;
				$i+=1;
				$format+=1;
			}else if($key=="max_handling_time"&&$value!=$blank){
					$url .= "&itemFilter($i).name=MaxHandlingTime"
					."&itemFilter($i).value=".$value;
					$i+=1;
			}
			
		}
		/*
		if(isset($_GET['seller'])&&$_GET['seller']==$true){
			$url .= "&itemFilter($i).name=ReturnsAcceptedOnly"
			."&itemFilter($i).value=true";
		}else{
			$url .= "&itemFilter($i).name=ReturnsAcceptedOnly"
			."&itemFilter($i).value=false";
		}
		$i+=1;
		if(isset($_GET['free_shipping'])&&$_GET['free_shipping']==$true){
			$url .= "&itemFilter($i).name=FreeShippingOnly"
			."&itemFilter($i).value=true";
		}else{
			$url .= "&itemFilter($i).name=FreeShippingOnly"
			."&itemFilter($i).value=false";
		}
		$i+=1;
		if(isset($_GET['exp_shipping'])&&$_GET['exp_shipping']==$true){
			$url .= "&itemFilter($i).name=ExpeditedShippingType"
			."&itemFilter($i).value=Expedited";
		}
		*/
		$i=0;

		$url.="&outputSelector($i)=SellerInfo";
		$i+=1;
		$url.="&outputSelector($i)=PictureURLSuperSize";
		$i+=1;
		$url.="&outputSelector($i)=StoreInfo";



		

		//echo $url;                //for debugging
	
		//$topRatedImgLink = "http://cs-server.usc.edu:45678/hw/hw6/itemTopRated.jpg";
		
		// Load the call and capture the document returned by eBay API
		$resp = simplexml_load_file($url);
		if($resp->ack=="Success"){
			$jsonArr[] = array("ack"=>"Success");
			$totalEntries = $resp->paginationOutput->totalEntries;
			$jsonArr[] = array("resultCount"=>"$totalEntries");
			$page = $resp->paginationOutput->pageNumber;
			$jsonArr[] = array("pageNumber"=>"$page");
			$itemCount = $resp->paginationOutput->entriesPerPage;
			$jsonArr[] = array("itemCount"=>"$itemCount");

			
			$k=0;
			foreach($resp->searchResult->item as $item) {
				
				//----------------Basic Info---------------------------------------
				$galleryURL = $item->galleryURL;
				$viewItemURL  = $item->viewItemURL;
				$superPic = $item->pictureURLSuperSize;
			    $title = $item->title;
			    $itemCond = $item->condition->conditionDisplayName;		   
			    
			    $itemBuyFormat = $item->listingInfo->listingType;
			    	if($itemBuyFormat=="FixedPrice"||$itemBuyFormat=="StoreInventory"){
			    		$itemBuyFormat="Buy it Now";
			    	}
			    	else if($itemBuyFormat=="Auction"){
			    		$itemBuyFormat="Auction";	
			    	}else if($itemBuyFormat=="Classified"){
						$itemBuyFormat ="Classified Ad";		    		
			    	}
			   

			   
			    $price = $item->sellingStatus->convertedCurrentPrice;
			    $location = $item->location;
			    $categoryName = $item->primaryCategory->categoryName;

			    $topListing=$item->topRatedListing;

			    //--------------Seller Info------------------------------------------

			    $sellerUserName = $item->sellerInfo->sellerUserName;
			    $feedbackScore = $item->sellerInfo->feedbackScore;
			    $posFeedbackPercent = $item->sellerInfo->positiveFeedbackPercent;
			    $feedbackRatingStar = $item->sellerInfo->feedbackRatingStar;
			    $topRatedSeller = $item->sellerInfo->topRatedSeller;
			    $sellerStoreName = $item->storeInfo->storeName;
			    $sellerStoreURL = $item->storeInfo->storeURL;

			    $shippingType = $item->shippingInfo->shippingType;
			    $shippingType = preg_replace('/(?<!\ )[A-Z]/', ' $0', $shippingType);

			    $shipToLocations = "";

			    foreach($item->shippingInfo->shipToLocations as $loc){
			    	if($shipToLocations ==""){
			    		$shipToLocations .="$loc";
			    	}
			    	else{
			    		$shipToLocations.=","."$loc";
			    	}
			    }

			   // $freeShipping = (floatval($item->shippingInfo->shippingServiceCost)==0) ? "FREE Shipping" : "Shipping Not FREE";
			    $shippingCost = $item->shippingInfo->shippingServiceCost;
			    $expShipping = $item->shippingInfo->expeditedShipping;
			    $oneDayShipping = $item->shippingInfo->oneDayShippingAvailable;
			    $returnsAccepted = $item->returnsAccepted;
			    $handlingTime = $item->shippingInfo->handlingTime;

			    
			    $jsonArr[] = array("item$k"=>array("basicInfo"=>array("Title"=>"$title", "viewItemURL"=>"$viewItemURL", "galleryURL"=>"$galleryURL",
			    														"pictureURLSuperSize"=>"$superPic", "convertedCurrentPrice"=>"$price",
			    														"shippingServiceCost"=>"$shippingCost", "conditionDisplayName"=>"$itemCond",
			    														"listingType"=>"$itemBuyFormat", "shipLocation"=>"$location", "categoryName"=>"$categoryName", "topRatedListing"=>"$topListing"),

			    									"sellerInfo"=>array("sellerUserName"=>"$sellerUserName", "feedbackScore"=>"$feedbackScore", "positiveFeedbackPercent"=>"$posFeedbackPercent",
			    										"feebackRatingStar"=>"$feedbackRatingStar", "topRatedSeller"=>"$topRatedSeller", "sellerStoreName"=>"$sellerStoreName",
			    										"sellerStoreURL"=>"$sellerStoreURL"),


			    									"shippingInfo"=>array("shippingType"=>"$shippingType",  "shipToLocations"=>"$shipToLocations", "expeditedShipping"=>"$expShipping",
			    										"oneDayShippingAvailable"=>"$oneDayShipping", "returnsAccepted"=>"$returnsAccepted", "handlingTime"=>"$handlingTime")));


			    $k+=1;
			}

			
			$json = json_encode($jsonArr);

			echo $json;
		}else{
			$jsonArr[] = array("result"=>"Failure");
		}
		

	?>
