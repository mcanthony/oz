class VideoPlayer extends AbstractScene

    className     : 'videoPlayer'
    videoElement  : null
    controller    : null
    videoPaused   : true

    changeView : =>
        null

    init : =>
        @videoElement = $('<video/>')

        # TODO localised videos 

        @videoElement.attr
            'src' : @getLocalisedVideo()

        @addChild @videoElement

        @addChild $('<img src="/img/home/pix.gif" style="position:absolute;top:0;left:0;width:100%;height:100%;"/>')

        @controller = new Controller
        @controller.on 'toggleVideo', @toggleVideo
        @addChild @controller

        #console.log @controller.$el.find(".playPauseButton")
        @controller.$el.find(".playPauseButton").css
            "-webkit-transform" : "scale(0.6,0.6)"

        @$el.css {opacity: 0}

        @addCloseButton()
        @closeBtn.$el.bind "click", @onClose
        null

    getLocalisedVideo : =>
        return '/videos/bubbles_en.webm'

        ###
        locale = (navigator.language || navigator.userLanguage).toLowerCase()

        country = geoip_country_code().toLowerCase()

        switch(country)
            when 'gb'
                locale = 'gb'

            when 'au', 'nz'
                locale = 'au'

            when 'es'
                locale = 'us'


        switch(locale)
            
            when 'pt'
                return '/videos/bubbles_pt.webm'

            when 'es'
                return '/videos/bubbles_es.webm'

            when 'de'
                return '/videos/bubbles_de.webm'

            when 'dk'
                return '/videos/bubbles_dk.webm'

            when 'fr'
                return '/videos/bubbles_fr.webm'

            when 'it'
                return '/videos/bubbles_it.webm'

            when 'nl'
                return '/videos/bubbles_nl.webm'

            when 'no'
                return '/videos/bubbles_no.webm'

            when 'gb'
                return '/videos/bubbles_en-gb.webm'

            when 'au'
                return '/videos/bubbles_au.webm'

            else 
                return '/videos/bubbles_en.webm'
        ###


    toggleVideo : =>
        if @videoPaused
            @videoPaused = false
            @videoElement[0].play()
        else     
            @videoPaused = true
            @videoElement[0].pause()

        null

    pause : =>

        @videoElement[0].removeEventListener "ended", @videoEnded, false

        @videoPaused = true
        @videoElement[0].pause()
        @controller.playState()
        super()

        null

    resume : =>
        @videoPaused = false
        @videoElement[0].play()
        @controller.pauseState()

        @videoElement[0].addEventListener "ended", @videoEnded, false

        super()

        null

    videoEnded : (e) =>

        @videoElement[0].src = ""
        @onClose()

        null

    show : (anim = false, callback = null, time = 400, ease = "linear") =>

        @$el.css {display: "block"}

        super(anim, callback, time, ease)

        @resume()

        null

    onEnterFrame : =>

        @controller.progress @videoElement[0].currentTime / @videoElement[0].duration
        null

    onClose: =>

        SoundController.send "trailer_end"

        @oz().appView.area.content.$el.css { display : "inline" }
        @oz().appView.area.content.show true

        # Show footer elements
        @oz().appView.logo.showGoogleLogos()
        @oz().appView.footer.mainMenu.show true
        @oz().appView.footer.showShare()

        @pause()
        @hide true, =>
            @oz().appView.wrapper.remove @

        null

    dispose: =>

        @closeBtn.$el.unbind "click", @onClose
        @controller.off 'toggleVideo', @toggleVideo

        null

