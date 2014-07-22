//social counters
    if( $('.social').length > 0 ){

        getFacebookShareCount( $('.fb-counter') );
        getTweetCount(  $('.tweet-counter') );

        $('.twitter').on('click', function(){
            text = ( $('h1.headline').length > 0 ) ? $('h1.headline').text() : $('title').text();
        window.open(
                '//twitter.com/share?via=rtesoccer&text='+ text +'&url='+encodeURIComponent(location.href),
                'twitter-share-dialog',
                'width=626,height=436');
            return false;
        });

        $('.fb').on('click', function(){
            window.open(
                    'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href),
                    'facebook-share-dialog',
                    'width=626,height=436');
                return false;
        });

        $('.plus').on('click', function(){
        window.open(
            '//plus.google.com/share?url='+encodeURIComponent(location.href),
            'google-share-dialog',
            'width=626,height=436');
        return false;
    });
    }