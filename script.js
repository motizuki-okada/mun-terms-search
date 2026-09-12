$(window).on('load', function(){
    //".l-empty"の高さ調整----------------------------------------------------------------------------
    const headerHeight = $('.l-header').height();
    $('.l-empty').css({
        'height': headerHeight + 10 + 'px'
    });

    //chat機能----------------------------------------------------------------------------
    /*DB読み込み*/
    $.ajax({url: 'https://script.google.com/macros/s/AKfycbwV7xJaaMhPlPDSVZ2iGdbWSTbscjhj9GBNpZOSIZiRLNJcafp5KQtFne8XuMDAoioo/exec', dataType: 'json'}).done(function(data){
        let munTerms = {};
        munTerms = data;
        console.log("データベース読み込み完了");

        /*button機能活性化*/
        $('.header_inputButton').prop('disabled', false)

        /*enterキーによる挙動*/
        $('.header_inputText').on('keypress',
            function(e) {
                if (e.which === 13) { 
                    $('.header_inputButton').click();
                }
            }
        );

        /*検索ボタンクリック後の挙動*/
        let messageCount = 0;
        $('.header_inputButton').click(
            function response(){

                /*入力情報の取得*/
                const userInput = $('.header_inputText').val();

                /*入力欄の空欄化・フォーカス処理*/
                $('.header_inputText').val("").focus();

                /*処理回数の記録*/
                messageCount++

                if(userInput === ""){
                    return
                }else{
                    /*自動スクロール機能*/ 
                    const doc = $(document);
                    const win = $(window);
                    const len = $(doc).height() - $(win).height();
                    $('html, body').animate({ scrollTop: len }, 400);

                    /*".chat-unit"の生成*/ 
                    $('<div>', {
                        class: `chat_unit chat_unit__${messageCount}`, 
                    }).appendTo('.chat_content');

                        /*".chat_dialogue__user"の生成*/
                        $('<div>', {
                            class: `chat_dialogue chat_dialogue__user chat_dialogue__user__${messageCount}`, 
                        }).appendTo(`.chat_unit__${messageCount}`);

                            /*".chat_dialogueText__user"の生成*/
                            $('<p>', {
                                class: `chat_dialogueText chat_dialogueText__user chat_dialogueText__user__${messageCount}`, 
                            }).appendTo(`.chat_dialogue__user__${messageCount}`);


                        /*".chat_dialogue__answer"の生成*/
                        $('<div>', {
                            class: `chat_dialogue chat_dialogue__answer chat_dialogue__answer__${messageCount}`, 
                        }).appendTo(`.chat_unit__${messageCount}`);

                            /*".chat_dialogueText__answer"の生成*/
                            $('<p>', {
                                class: `chat_dialogueText chat_dialogueText__answer chat_dialogueText__answer__${messageCount}`, 
                            }).appendTo(`.chat_dialogue__answer__${messageCount}`);


                    /*入力情報表示と回答生成*/ 
                    $(`.chat_dialogueText__user__${messageCount}`).html(userInput);

                    /*入力情報処理*/
                    const userInput__processed = userInput.toLowerCase().replace(/\s+/g, "").trim();
                    const answer = data[userInput__processed];

                    setTimeout(()=>{
                        if(answer){
                            /*".chat_answerInfo"の生成*/
                            $('<div>', {
                                class: `chat_answerInfo chat_answerInfo__${messageCount}`, 
                            }).appendTo(`.chat_dialogue__answer__${messageCount}`);

                               /*".chat_answerCategory"の生成*/
                               $('<div>', {
                                    class: `chat_answerCategory chat_answerCategory__${messageCount}`, 
                                }).appendTo(`.chat_answerInfo__${messageCount}`);

                                    /*".chat_answerCateTextの生成"*/
                                    $('<p>', {
                                        class: `chat_answerCateText chat_answerCateText__${messageCount}`, 
                                    }).appendTo(`.chat_answerCategory__${messageCount}`);

                                /*".chat_answerLv"の生成*/
                                $('<div>', {
                                    class: `chat_answerLv chat_answerLv__${messageCount}`, 
                                }).appendTo(`.chat_answerInfo__${messageCount}`);

                            /*jsonファイルの情報を取得*/
                            const answer_desc = answer.description;
                            const answer_cate = answer.category;
                            const answer_lv = answer.level;

                            $(`.chat_dialogueText__answer__${messageCount}`).html(answer_desc);
                            $(`.chat_answerCateText__${messageCount}`).html(answer_cate);

                            /*".chat_answerLvImg"の生成*/
                            for (let i = 0; i < answer_lv; i++) {
                                $('<img>', {
                                    class: `chat_answerLvImg chat_answerLvImg__${messageCount}`,
                                    src: `img/star-shape.png`,
                                    alt: `星型の画像`, 
                                }).appendTo(`.chat_answerLv__${messageCount}`);
                            }
                            
                        }else{
                            $(`.chat_dialogueText__answer__${messageCount}`).html('わからん。');
                        }

                        /*".chat_dialogue__answer"の表示*/
                        $(`.chat_dialogue__answer__${messageCount}`).addClass(`chat_dialogue__answer__${messageCount}__is-open`);
                        $(`.chat_dialogue__answer__${messageCount}__is-open`).css({
                            'opacity': '1',
                            'transform': 'translateY(0)', 
                            'transition': 'opacity 1s, transform 1s'
                        })
                    },200);
                }
            }
        )
    })
})
