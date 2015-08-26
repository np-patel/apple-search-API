$(document).ready(function(){
	//listen to button
	$('#do-search').click(function(){

		//get seach query value
		var query = $('#query').val();

		//Make sure there is a value
		if ($.trim(query) == ''){

			//dispaly error
			console.log('blank query error');
			return;
		}

		//get the media type
		var mediaType = $('#media-type').val();


		//ajax
		$.ajax({

			type:'get',
			url:'app/apple-search.php',
			data: {
			searchQuery: query,
			media: mediaType
			},
			beforeSend:function(){

			},
			success: function(dataFromServer){
				console.log(dataFromServer);

				$('#search-results').html('');//clear result

				//loop over each item in the result set
				$(dataFromServer.results).each(function(i){

					//make life easier
					var product = dataFromServer.results[i]; 	
					//console.log(dataFromServer.results[i].artworkUrl100);

					// $('#search-results').append('<img src="'+dataFromServer.results[i].artworkUrl100+'">');

					//create di
					var div = $('<div class="large-4 columns">');

					// add the priview image to the div
					var image = $('<img src="'+product.artworkUrl100+'">');

					//console.log(image);

					$(div).append(image);

					//Create a preview element suitable for the priview file format
					switch(product.kind){

						case 'song':
						case 'audiobook':
						case 'music':

							var preview = $('<audio controls preload="none" src="'+product.previewUrl+'">');

						break;

						case 'music-video':
						case 'feature-movie':

							var preview = $('<video controls preload="none" type="video/m4p" src="'+product.previewUrl+'">');
							// var preview = $('<video controls preload="none"><source src="'+product.previewUrl+'"type="video/m4p">');

						break;

					}

					//add the priview to the div
					$(div).append(preview);

					//add new product div to the page
					$('#search-results').append(div);

				});

			},

			error: function(){
				console.log('sorry cannot connect to apple search api....');
			}

		});


	});
});